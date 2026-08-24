const PlaylistCard = ({ playlist, onPlay, isActive }) => {
  return (
    <article
      className={`playlist-card ${isActive ? "playlist-card--active" : ""}`}
      style={{ "--playlist-color": playlist.color }}
    >
      <div className="playlist-card__cover" style={{ background: playlist.gradient }} aria-label={`${playlist.name} playlist cover`}>
        <div className="playlist-card__cover-inner">
          <span className="playlist-card__cover-emoji">{playlist.moodEmoji}</span>
        </div>
        <div className="playlist-card__cover-overlay" aria-hidden="true">
          <div className="playlist-card__eq">
            {[1,2,3,4,5].map(i => (
              <div key={i} className={`playlist-card__eq-bar ${isActive ? "playlist-card__eq-bar--active" : ""}`} style={{ animationDelay: `${i * 0.1}s` }} />
            ))}
          </div>
        </div>
      </div>

      <div className="playlist-card__body">
        <div className="playlist-card__mood" style={{ color: playlist.color }}>
          {playlist.moodEmoji} {playlist.mood}
        </div>
        <h3 className="playlist-card__name">{playlist.name}</h3>
        <p className="playlist-card__desc">{playlist.description}</p>
        <div className="playlist-card__footer">
          <span className="playlist-card__songs">{playlist.songs} songs</span>
          <button
            className={`playlist-card__play ${isActive ? "playlist-card__play--active" : ""}`}
            style={{ background: isActive ? playlist.color : "transparent", borderColor: playlist.color, color: isActive ? "#fff" : playlist.color }}
            onClick={() => onPlay(playlist)}
            aria-label={isActive ? `Now playing ${playlist.name}` : `Play ${playlist.name}`}
            aria-pressed={isActive}
          >
            {isActive ? "▶ Playing" : "▶ Play"}
          </button>
        </div>
      </div>
    </article>
  );
};

export default PlaylistCard;
