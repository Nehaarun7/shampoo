import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/useCart";

const Wishlist = ({ isOpen, onClose }) => {
  const { wishlist, toggle } = useWishlist();
  const { dispatch } = useCart();

  const handleAddToCart = (product) => {
    dispatch({ type: "ADD_ITEM", payload: product });
  };

  return (
    <>
      <div
        className={`cart-overlay ${isOpen ? "cart-overlay--visible" : ""}`}
        onClick={onClose}
        aria-hidden="true"
      />
      <aside
        className={`cart-drawer wishlist-drawer ${isOpen ? "cart-drawer--open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Wishlist"
      >
        <div className="cart-drawer__header">
          <h2 className="cart-drawer__title">
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
            </svg>
            Wishlist
            {wishlist.length > 0 && (
              <span className="cart-drawer__count">{wishlist.length}</span>
            )}
          </h2>
          <button className="cart-drawer__close" onClick={onClose} aria-label="Close wishlist">
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="cart-drawer__body">
          {wishlist.length === 0 ? (
            <div className="cart-empty">
              <span className="cart-empty__icon" aria-hidden="true">💔</span>
              <h3>Your wishlist is empty</h3>
              <p>Heart a product to save it here!</p>
            </div>
          ) : (
            <ul className="cart-items" role="list">
              {wishlist.map((item) => (
                <li key={item.id} className="cart-item">
                  <div className="cart-item__visual" style={{ background: item.gradient || item.color }} aria-hidden="true">
                    <span className="cart-item__emoji">{item.moodEmoji}</span>
                  </div>
                  <div className="cart-item__info">
                    <div className="cart-item__name">{item.name}</div>
                    <div className="cart-item__meta" style={{ color: item.color }}>{item.moodEmoji} {item.mood}</div>
                    <div className="cart-item__price">₹{item.price}</div>
                  </div>
                  <button
                    className="btn btn--primary btn--sm"
                    onClick={() => handleAddToCart(item)}
                    aria-label={`Add ${item.name} to cart`}
                    style={{ flexShrink: 0 }}
                  >
                    Add
                  </button>
                  <button
                    className="cart-item__remove"
                    onClick={() => toggle(item)}
                    aria-label={`Remove ${item.name} from wishlist`}
                  >
                    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </aside>
    </>
  );
};

export default Wishlist;
