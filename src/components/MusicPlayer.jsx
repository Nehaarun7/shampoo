import { useState, useEffect, useRef, useCallback } from "react";
import { songs } from "../data/products";

// Mood-based musical scales for Web Audio tone generation
const moodScales = {
  energetic: [523, 659, 784, 880, 1047],  // C major high
  chill:     [220, 277, 330, 370, 440],    // A minor low
  romantic:  [349, 440, 523, 587, 698],    // F major mid
  happy:     [392, 494, 587, 659, 784],    // G major
  focused:   [261, 329, 392, 440, 523],    // C major mid
  sleepy:    [174, 220, 261, 294, 349],    // F major low
};

function createAudioContext() {
  try {
    return new (window.AudioContext || window.webkitAudioContext)();
  } catch {
    return null;
  }
}

const MusicPlayer = ({ activeSong: externalSong }) => {
  const [baseIndex, setBaseIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(75);
  const [liked, setLiked] = useState({});
  const intervalRef = useRef(null);
  const audioCtxRef = useRef(null);
  const nodesRef = useRef([]);

  const externalIndex = externalSong ? songs.findIndex((s) => s.id === externalSong.id) : -1;
  const currentIndex = externalIndex !== -1 ? externalIndex : baseIndex;
  const currentSong = songs[currentIndex];

  // Stop all currently playing audio nodes
  const stopAudio = useCallback(() => {
    nodesRef.current.forEach((n) => {
      try { n.stop(); } catch {}
    });
    nodesRef.current = [];
  }, []);

  // Play a looping ambient tone sequence for the current song's mood
  const startAudio = useCallback((mood, vol) => {
    stopAudio();
    const ctx = audioCtxRef.current;
    if (!ctx) return;
    if (ctx.state === "suspended") ctx.resume();

    const scale = moodScales[mood] || moodScales.happy;
    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime((vol / 100) * 0.18, ctx.currentTime);
    masterGain.connect(ctx.destination);

    // Play a gentle arpeggio loop using the mood scale
    scale.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();

      osc.type = mood === "energetic" ? "sawtooth" : mood === "focused" ? "square" : "sine";
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      // Detune slightly for a richer sound
      osc.detune.setValueAtTime((i % 2 === 0 ? 5 : -5), ctx.currentTime);

      gainNode.gain.setValueAtTime(0, ctx.currentTime);
      // Stagger each note entry
      gainNode.gain.setTargetAtTime(0.12, ctx.currentTime + i * 0.3, 0.1);

      osc.connect(gainNode);
      gainNode.connect(masterGain);
      osc.start(ctx.currentTime + i * 0.3);

      nodesRef.current.push(osc);
    });

    // Keep a reference to masterGain so we can update volume
    nodesRef.current.push(masterGain);
  }, [stopAudio]);

  // Update volume on all active gain nodes
  useEffect(() => {
    const masterGain = nodesRef.current[nodesRef.current.length - 1];
    if (masterGain && masterGain.gain) {
      masterGain.gain.setTargetAtTime((volume / 100) * 0.18, audioCtxRef.current?.currentTime || 0, 0.05);
    }
  }, [volume]);

  const handlePlay = useCallback(() => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = createAudioContext();
    }
    setPlaying((p) => {
      const next = !p;
      if (next) {
        startAudio(currentSong?.mood, volume);
      } else {
        stopAudio();
      }
      return next;
    });
  }, [currentSong, volume, startAudio, stopAudio]);

  const handleNext = useCallback(() => {
    setBaseIndex((i) => (i + 1) % songs.length);
    setProgress(0);
  }, []);

  const handlePrev = useCallback(() => {
    setBaseIndex((i) => (i - 1 + songs.length) % songs.length);
    setProgress(0);
  }, []);

  // Restart audio when song changes while playing
  useEffect(() => {
    if (playing) {
      startAudio(currentSong?.mood, volume);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex]);

  // Stop audio on unmount
  useEffect(() => {
    return () => {
      stopAudio();
      audioCtxRef.current?.close();
    };
  }, [stopAudio]);

  useEffect(() => {
    if (playing) {
      intervalRef.current = setInterval(() => {
        setProgress((p) => {
          if (p >= 100) {
            handleNext();
            return 0;
          }
          return p + 0.3;
        });
      }, 100);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [playing, currentIndex, handleNext]);

  const handleProgressClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = ((e.clientX - rect.left) / rect.width) * 100;
    setProgress(Math.min(100, Math.max(0, pct)));
  };

  const toggleLike = (id) => setLiked((prev) => ({ ...prev, [id]: !prev[id] }));

  const moodColors = {
    energetic: "#FF6B35",
    chill: "#8B5CF6",
    romantic: "#EC4899",
    happy: "#F59E0B",
    focused: "#10B981",
    sleepy: "#6366F1",
  };

  const accentColor = moodColors[currentSong?.mood] || "#1DB954";

  return (
    <section className="player-section section" id="player" aria-label="Music player">
      <div className="container">
        <div className="section-header">
          <div className="section-badge">Now Playing</div>
          <h2 className="section-title">
            Your <span className="text-gradient">Shampoo Soundtrack</span>
          </h2>
          <p className="section-subtitle">Every mood has a melody. Every shampoo has a playlist.</p>
        </div>

        <div className="player" style={{ "--accent": accentColor }} role="region" aria-label="Music player controls">
          {/* Song list (left) */}
          <div className="player__queue">
            <h3 className="player__queue-title">Up Next</h3>
            <ul className="player__queue-list" role="list">
              {songs.map((song, i) => (
                <li key={song.id}>
                  <button
                    className={`player__queue-item ${i === currentIndex ? "player__queue-item--active" : ""}`}
                    onClick={() => { setBaseIndex(i); setProgress(0); setPlaying(true); if (!audioCtxRef.current) { audioCtxRef.current = createAudioContext(); } startAudio(song.mood, volume); }}
                    aria-label={`Play ${song.title} by ${song.artist}`}
                    aria-current={i === currentIndex ? "true" : undefined}
                    style={i === currentIndex ? { "--item-color": accentColor } : {}}
                  >
                    <div className="player__queue-num">
                      {i === currentIndex && playing ? (
                        <PlayingBars color={accentColor} />
                      ) : (
                        <span>{i + 1}</span>
                      )}
                    </div>
                    <div className="player__queue-info">
                      <span className="player__queue-song">{song.title}</span>
                      <span className="player__queue-artist">{song.artist}</span>
                    </div>
                    <span className="player__queue-duration">{song.duration}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Main player (center-right) */}
          <div className="player__main">
            {/* Album art */}
            <div className="player__album" style={{ background: `conic-gradient(${accentColor}, #8B5CF6, #EC4899, ${accentColor})` }} aria-hidden="true">
              <div className="player__album-inner">
                <span className="player__album-icon">🎵</span>
              </div>
              {playing && <div className="player__album-spin" aria-hidden="true" />}
            </div>

            {/* Song info */}
            <div className="player__info">
              <h3 className="player__title">{currentSong?.title}</h3>
              <p className="player__artist">{currentSong?.artist}</p>
            </div>

            {/* Progress */}
            <div className="player__progress-wrap">
              <span className="player__time">{formatProgress(progress, currentSong?.duration)}</span>
              <div
                className="player__progress-track"
                onClick={handleProgressClick}
                role="slider"
                aria-label="Song progress"
                aria-valuenow={Math.round(progress)}
                aria-valuemin={0}
                aria-valuemax={100}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "ArrowRight") setProgress(p => Math.min(100, p + 5));
                  if (e.key === "ArrowLeft") setProgress(p => Math.max(0, p - 5));
                }}
              >
                <div className="player__progress-fill" style={{ width: `${progress}%` }}>
                  <div className="player__progress-thumb" />
                </div>
              </div>
              <span className="player__time">{currentSong?.duration}</span>
            </div>

            {/* Controls */}
            <div className="player__controls" role="group" aria-label="Playback controls">
              <button className="player__ctrl player__ctrl--sm" onClick={handlePrev} aria-label="Previous song">
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" />
                </svg>
              </button>
              <button className="player__ctrl player__ctrl--play" onClick={handlePlay} aria-label={playing ? "Pause" : "Play"}>
                {playing ? (
                  <svg width="26" height="26" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                  </svg>
                ) : (
                  <svg width="26" height="26" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                )}
              </button>
              <button className="player__ctrl player__ctrl--sm" onClick={handleNext} aria-label="Next song">
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" />
                </svg>
              </button>
            </div>

            {/* Volume */}
            <div className="player__volume" role="group" aria-label="Volume control">
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z" />
              </svg>
              <input
                type="range"
                className="player__volume-slider"
                min="0"
                max="100"
                value={volume}
                onChange={(e) => setVolume(Number(e.target.value))}
                aria-label="Volume"
                style={{ "--volume-pct": `${volume}%` }}
              />
              <button
                className={`player__like ${liked[currentSong?.id] ? "player__like--active" : ""}`}
                onClick={() => toggleLike(currentSong?.id)}
                aria-label={liked[currentSong?.id] ? "Unlike song" : "Like song"}
                aria-pressed={!!liked[currentSong?.id]}
              >
                <svg width="18" height="18" fill={liked[currentSong?.id] ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
                </svg>
              </button>
            </div>

            {/* Visualizer */}
            <div className="player__visualizer" aria-hidden="true">
              {Array.from({ length: 20 }).map((_, i) => (
                <div
                  key={i}
                  className={`player__vis-bar ${playing ? "player__vis-bar--active" : ""}`}
                  style={{ animationDelay: `${i * 0.05}s`, "--bar-color": accentColor }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const PlayingBars = ({ color }) => (
  <div className="playing-bars" aria-hidden="true">
    {[1, 2, 3].map((i) => (
      <div key={i} className="playing-bar" style={{ "--bar-color": color, animationDelay: `${i * 0.15}s` }} />
    ))}
  </div>
);

const formatProgress = (progress, duration) => {
  if (!duration) return "0:00";
  const [min, sec] = duration.split(":").map(Number);
  const total = min * 60 + sec;
  const current = Math.floor((progress / 100) * total);
  return `${Math.floor(current / 60)}:${String(current % 60).padStart(2, "0")}`;
};

export default MusicPlayer;
