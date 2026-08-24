import { useState } from "react";
import { playlists, songs } from "../data/products";
import PlaylistCard from "./PlaylistCard";

const Playlists = ({ onPlaylistPlay }) => {
  const [activePlaylist, setActivePlaylist] = useState(null);

  const handlePlay = (playlist) => {
    setActivePlaylist(playlist.id);
    const moodSong = songs.find((s) => s.mood === playlist.mood.toLowerCase());
    if (moodSong && onPlaylistPlay) onPlaylistPlay(moodSong);
  };

  return (
    <section className="playlists-section section" id="playlists" aria-labelledby="playlists-heading">
      <div className="container">
        <div className="section-header">
          <div className="section-badge">Curated for You</div>
          <h2 className="section-title" id="playlists-heading">
            Every Shampoo Has a <span className="text-gradient">Soundtrack.</span>
          </h2>
          <p className="section-subtitle">
            Six moods, six playlists. Find the one that matches your vibe.
          </p>
        </div>

        <div className="playlists-grid" role="list" aria-label="Playlists">
          {playlists.map((playlist) => (
            <div key={playlist.id} role="listitem">
              <PlaylistCard
                playlist={playlist}
                isActive={activePlaylist === playlist.id}
                onPlay={handlePlay}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Playlists;
