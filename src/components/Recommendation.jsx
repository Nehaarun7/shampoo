import { useCart } from "../context/useCart";

const Recommendation = ({ product, mood }) => {
  const { dispatch } = useCart();

  const handleAddToCart = () => {
    dispatch({ type: "ADD_ITEM", payload: product });
  };

  return (
    <div className="recommendation" aria-live="polite" aria-label={`Recommendation for ${mood.label} mood`}>
      <div className="recommendation__inner" style={{ "--product-color": product.color }}>
        {/* Left: Product Info */}
        <div className="recommendation__product">
          <div className="recommendation__bottle" style={{ background: product.gradient }} aria-hidden="true">
            <div className="recommendation__bottle-inner">
              <span className="recommendation__bottle-emoji">{mood.emoji}</span>
              <span className="recommendation__bottle-name">{product.name}</span>
              <div className="recommendation__bottle-bars">
                {[1,2,3,4,5].map(i => (
                  <div key={i} className="recommendation__bottle-bar" style={{ animationDelay: `${i * 0.1}s` }} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right: Details */}
        <div className="recommendation__details">
          <div className="recommendation__badge" style={{ background: product.color + "22", color: product.color, border: `1px solid ${product.color}44` }}>
            {mood.emoji} {mood.label} Mood
          </div>
          <h3 className="recommendation__name">{product.name}</h3>
          <p className="recommendation__desc">{product.description}</p>

          <div className="recommendation__meta">
            <div className="recommendation__meta-item">
              <span className="recommendation__meta-icon">🌸</span>
              <div>
                <span className="recommendation__meta-label">Fragrance</span>
                <span className="recommendation__meta-value">{product.fragrance}</span>
              </div>
            </div>
            <div className="recommendation__meta-item">
              <span className="recommendation__meta-icon">🎵</span>
              <div>
                <span className="recommendation__meta-label">Music Genre</span>
                <span className="recommendation__meta-value">{product.genre}</span>
              </div>
            </div>
          </div>

          {/* Energy bar */}
          <div className="recommendation__energy">
            <div className="recommendation__energy-header">
              <span>Energy Level</span>
              <span style={{ color: product.color }}>{product.energy}%</span>
            </div>
            <div className="recommendation__energy-track" role="progressbar" aria-valuenow={product.energy} aria-valuemin={0} aria-valuemax={100} aria-label={`Energy level: ${product.energy}%`}>
              <div
                className="recommendation__energy-fill"
                style={{ width: `${product.energy}%`, background: product.gradient }}
              />
            </div>
          </div>

          <div className="recommendation__price">₹{product.price}</div>

          <div className="recommendation__actions">
            <button className="btn btn--primary" onClick={handleAddToCart} aria-label={`Add ${product.name} to cart`}>
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 01-8 0" />
              </svg>
              Add to Cart
            </button>
            <button
              className="btn btn--glow"
              style={{ "--glow-color": product.color }}
              onClick={() => document.getElementById("playlists")?.scrollIntoView({ behavior: "smooth" })}
              aria-label="Play matching playlist"
            >
              ▶ Play My Vibe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recommendation;
