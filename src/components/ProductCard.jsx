import { useState } from "react";
import { useCart } from "../context/useCart";
import { useWishlist } from "../context/WishlistContext";

const ProductCard = ({ product }) => {
  const { dispatch } = useCart();
  const { toggle, isWishlisted } = useWishlist();
  const [added, setAdded] = useState(false);
  const [flipped, setFlipped] = useState(false);
  const wishlisted = isWishlisted(product.id);

  const handleAdd = () => {
    dispatch({ type: "ADD_ITEM", payload: product });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <article
      className={`product-card ${flipped ? "product-card--flipped" : ""}`}
      style={{ "--card-color": product.color }}
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
    >
      {/* Front */}
      <div className="product-card__front">
        {product.tag && (
          <div className="product-card__tag" style={{ background: product.color }}>{product.tag}</div>
        )}

        {/* Product visual */}
        <div className="product-card__visual" style={{ background: product.gradient }} aria-label={`${product.name} shampoo bottle`}>
          <MiniBottle gradient={product.gradient} emoji={product.moodEmoji} name={product.name} />
          <div className="product-card__visual-bars" aria-hidden="true">
            {[1,2,3,4,5].map(i => (
              <div key={i} className="product-card__vis-bar" style={{ animationDelay: `${i * 0.1}s`, "--bar-color": product.color }} />
            ))}
          </div>
        </div>

        <div className="product-card__body">
          <div className="product-card__mood">
            <span>{product.moodEmoji}</span>
            <span>{product.mood}</span>
          </div>
          <h3 className="product-card__name">{product.name}</h3>
          <div className="product-card__meta">
            <span className="product-card__fragrance">🌸 {product.fragrance}</span>
            <span className="product-card__genre">🎵 {product.genre}</span>
          </div>
          <div className="product-card__footer">
            <span className="product-card__price">₹{product.price}</span>
            <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
              <button
                className={`product-card__wish ${wishlisted ? "product-card__wish--active" : ""}`}
                onClick={(e) => { e.stopPropagation(); toggle(product); }}
                aria-label={wishlisted ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
                aria-pressed={wishlisted}
              >
                <svg width="16" height="16" fill={wishlisted ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
                </svg>
              </button>
              <button
                className={`btn btn--primary btn--sm ${added ? "btn--success" : ""}`}
                onClick={handleAdd}
                aria-label={added ? `${product.name} added to cart` : `Add ${product.name} to cart`}
              >
                {added ? "✓ Added!" : "Add to Cart"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Back (hover reveal) */}
      <div className="product-card__back" style={{ background: product.gradient }} aria-hidden={!flipped}>
        <div className="product-card__back-content">
          <span className="product-card__back-emoji">{product.moodEmoji}</span>
          <h3 className="product-card__back-name">{product.name}</h3>
          <p className="product-card__back-desc">{product.description}</p>
          <div className="product-card__back-detail">
            <span>Fragrance:</span><strong>{product.fragrance}</strong>
          </div>
          <div className="product-card__back-detail">
            <span>Genre:</span><strong>{product.genre}</strong>
          </div>
          <div className="product-card__back-price">₹{product.price}</div>
          <button
            className="btn btn--white"
            onClick={handleAdd}
            aria-label={`Add ${product.name} to cart`}
          >
            {added ? "✓ Added!" : "Add to Cart"}
          </button>
        </div>
      </div>
    </article>
  );
};

const MiniBottle = ({ _gradient, emoji, name }) => (
  <div className="mini-bottle" role="img" aria-label={`${name} bottle`}>
    <svg viewBox="0 0 100 200" fill="none" xmlns="http://www.w3.org/2000/svg" width="80" height="160">
      <defs>
        <linearGradient id={`mg-${name}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.3)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </linearGradient>
      </defs>
      <rect x="35" y="5" width="30" height="30" rx="8" fill="rgba(0,0,0,0.4)" />
      <rect x="38" y="8" width="24" height="24" rx="6" fill="rgba(255,255,255,0.15)" />
      <path d="M33 35 L36 48 L64 48 L67 35 Z" fill="rgba(0,0,0,0.3)" />
      <rect x="15" y="48" width="70" height="140" rx="18" fill="rgba(0,0,0,0.25)" />
      <rect x="15" y="48" width="70" height="140" rx="18" fill={`url(#mg-${name})`} />
      <text x="50" y="115" textAnchor="middle" fontSize="22" fill="white">{emoji}</text>
      <text x="50" y="135" textAnchor="middle" fontSize="8" fill="white" fontWeight="700" fontFamily="system-ui">{name.toUpperCase()}</text>
    </svg>
  </div>
);

export default ProductCard;
