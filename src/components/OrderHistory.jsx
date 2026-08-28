import { useOrderHistory } from "../context/OrderHistoryContext";

const OrderHistory = ({ isOpen, onClose }) => {
  const { orders, points } = useOrderHistory();

  return (
    <>
      <div
        className={`cart-overlay ${isOpen ? "cart-overlay--visible" : ""}`}
        onClick={onClose}
        aria-hidden="true"
      />
      <aside
        className={`cart-drawer ${isOpen ? "cart-drawer--open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Order history"
        style={{ maxWidth: "480px" }}
      >
        <div className="cart-drawer__header">
          <h2 className="cart-drawer__title">
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" />
              <rect x="9" y="3" width="6" height="4" rx="1" />
              <path d="M9 12h6M9 16h4" />
            </svg>
            Order History
          </h2>
          <button className="cart-drawer__close" onClick={onClose} aria-label="Close order history">
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Loyalty points banner */}
        <div className="oh-points-banner">
          <div className="oh-points-icon">⭐</div>
          <div>
            <div className="oh-points-value">{points} pts</div>
            <div className="oh-points-label">Loyalty Points earned</div>
          </div>
          <div className="oh-points-tip">1 pt per ₹10 spent</div>
        </div>

        <div className="cart-drawer__body">
          {orders.length === 0 ? (
            <div className="cart-empty">
              <span className="cart-empty__icon" aria-hidden="true">📦</span>
              <h3>No orders yet</h3>
              <p>Place your first order to see it here!</p>
            </div>
          ) : (
            <ul className="oh-orders" role="list">
              {orders.map((order) => (
                <li key={order.id} className="oh-order">
                  <div className="oh-order__header">
                    <span className="oh-order__id">#{order.id}</span>
                    <span className="oh-order__date">
                      {new Date(order.date).toLocaleDateString("en-IN", {
                        day: "numeric", month: "short", year: "numeric",
                      })}
                    </span>
                    <span className="oh-order__total">₹{order.total}</span>
                  </div>
                  <ul className="oh-order__items">
                    {order.items.map((item) => (
                      <li key={item.id} className="oh-order__item">
                        <span className="oh-order__item-swatch"
                          style={{ background: item.gradient || item.color }}
                          aria-hidden="true"
                        >
                          {item.moodEmoji}
                        </span>
                        <span className="oh-order__item-name">{item.name}</span>
                        <span className="oh-order__item-qty">× {item.qty}</span>
                        <span className="oh-order__item-price">₹{item.price * item.qty}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="oh-order__address">
                    📍 {order.buyer.city}, {order.buyer.state}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </aside>
    </>
  );
};

export default OrderHistory;
