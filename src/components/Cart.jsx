import { useEffect } from "react";
import { useCart } from "../context/useCart";

const Cart = ({ isOpen, onClose }) => {
  const { items, dispatch, totalItems, totalPrice } = useCart();

  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  useEffect(() => {
    const handleKey = (e) => { if (e.key === "Escape") onClose(); };
    if (isOpen) document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  return (
    <>
      {/* Overlay */}
      <div
        className={`cart-overlay ${isOpen ? "cart-overlay--visible" : ""}`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <aside
        className={`cart-drawer ${isOpen ? "cart-drawer--open" : ""}`}
        aria-label="Shopping cart"
        aria-modal="true"
        role="dialog"
      >
        <div className="cart-drawer__header">
          <h2 className="cart-drawer__title">
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 01-8 0" />
            </svg>
            Your Cart
            {totalItems > 0 && (
              <span className="cart-drawer__count">{totalItems}</span>
            )}
          </h2>
          <button className="cart-drawer__close" onClick={onClose} aria-label="Close cart">
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Items */}
        <div className="cart-drawer__body">
          {items.length === 0 ? (
            <div className="cart-empty">
              <span className="cart-empty__icon" aria-hidden="true">🛒</span>
              <h3>Your cart is empty</h3>
              <p>Add some vibes to get started!</p>
              <button className="btn btn--primary" onClick={onClose} aria-label="Start shopping">
                Start Shopping
              </button>
            </div>
          ) : (
            <ul className="cart-items" role="list" aria-label="Cart items">
              {items.map((item) => (
                <li key={item.id} className="cart-item" role="listitem">
                  <div
                    className="cart-item__visual"
                    style={{ background: item.gradient || item.color }}
                    aria-hidden="true"
                  >
                    <span className="cart-item__emoji">{item.moodEmoji}</span>
                  </div>
                  <div className="cart-item__info">
                    <div className="cart-item__name">{item.name}</div>
                    <div className="cart-item__meta" style={{ color: item.color }}>
                      {item.moodEmoji} {item.mood}
                    </div>
                    <div className="cart-item__price">₹{item.price}</div>
                  </div>
                  <div className="cart-item__controls">
                    <button
                      className="cart-item__qty-btn"
                      onClick={() => dispatch({ type: "DECREASE_QTY", payload: item.id })}
                      aria-label={`Decrease quantity of ${item.name}`}
                    >
                      −
                    </button>
                    <span className="cart-item__qty" aria-label={`Quantity: ${item.qty}`}>{item.qty}</span>
                    <button
                      className="cart-item__qty-btn"
                      onClick={() => dispatch({ type: "INCREASE_QTY", payload: item.id })}
                      aria-label={`Increase quantity of ${item.name}`}
                    >
                      +
                    </button>
                  </div>
                  <button
                    className="cart-item__remove"
                    onClick={() => dispatch({ type: "REMOVE_ITEM", payload: item.id })}
                    aria-label={`Remove ${item.name} from cart`}
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

        {/* Footer */}
        {items.length > 0 && (
          <div className="cart-drawer__footer">
            <div className="cart-subtotal">
              <div className="cart-subtotal__row">
                <span>Subtotal</span>
                <span>₹{totalPrice}</span>
              </div>
              <div className="cart-subtotal__row">
                <span>Shipping</span>
                <span className="cart-subtotal__free">Free</span>
              </div>
              <div className="cart-subtotal__row cart-subtotal__row--total">
                <span>Total</span>
                <span>₹{totalPrice}</span>
              </div>
            </div>
            <button className="btn btn--primary btn--lg cart-checkout-btn" aria-label="Proceed to checkout (demo)">
              Proceed to Checkout
            </button>
            <button
              className="cart-clear-btn"
              onClick={() => dispatch({ type: "CLEAR_CART" })}
              aria-label="Clear all items from cart"
            >
              Clear Cart
            </button>
          </div>
        )}
      </aside>
    </>
  );
};

export default Cart;
