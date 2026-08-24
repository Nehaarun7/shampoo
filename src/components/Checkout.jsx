import { useState } from "react";
import { useCart } from "../context/useCart";

const STEPS = ["Cart", "Shipping", "Confirm"];

const Checkout = ({ isOpen, onClose }) => {
  const { items, dispatch, totalItems, totalPrice } = useCart();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    name: "", email: "", phone: "",
    address: "", city: "", pincode: "", state: "",
  });
  const [errors, setErrors] = useState({});
  const [ordered, setOrdered] = useState(false);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    setErrors((er) => ({ ...er, [e.target.name]: "" }));
  };

  const validateShipping = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = "Name is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = "Valid email required";
    if (!/^\d{10}$/.test(form.phone.replace(/\s/g, ""))) errs.phone = "10-digit phone required";
    if (!form.address.trim()) errs.address = "Address is required";
    if (!form.city.trim()) errs.city = "City is required";
    if (!/^\d{6}$/.test(form.pincode)) errs.pincode = "6-digit pincode required";
    if (!form.state.trim()) errs.state = "State is required";
    return errs;
  };

  const handleNext = () => {
    if (step === 1) {
      const errs = validateShipping();
      if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    }
    setStep((s) => s + 1);
  };

  const handlePlaceOrder = () => {
    setOrdered(true);
    dispatch({ type: "CLEAR_CART" });
    setTimeout(() => {
      setOrdered(false);
      setStep(0);
      setForm({ name: "", email: "", phone: "", address: "", city: "", pincode: "", state: "" });
      onClose();
    }, 3500);
  };

  const handleClose = () => {
    setStep(0);
    setErrors({});
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="checkout-overlay" onClick={handleOverlayClick} role="dialog" aria-modal="true" aria-label="Checkout">
      <div className="checkout-modal">
        {/* Header */}
        <div className="checkout-header">
          <h2 className="checkout-title">
            {ordered ? "🎉 Order Placed!" : `Checkout — ${STEPS[step]}`}
          </h2>
          <button className="checkout-close" onClick={handleClose} aria-label="Close checkout">
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Step indicators */}
        {!ordered && (
          <div className="checkout-steps" aria-label="Checkout steps">
            {STEPS.map((label, i) => (
              <div key={label} className={`checkout-step ${i <= step ? "checkout-step--done" : ""} ${i === step ? "checkout-step--active" : ""}`}>
                <div className="checkout-step__dot">{i < step ? "✓" : i + 1}</div>
                <span className="checkout-step__label">{label}</span>
                {i < STEPS.length - 1 && <div className="checkout-step__line" />}
              </div>
            ))}
          </div>
        )}

        {/* Body */}
        <div className="checkout-body">
          {ordered ? (
            <OrderSuccess name={form.name} />
          ) : step === 0 ? (
            <StepCart items={items} dispatch={dispatch} totalItems={totalItems} totalPrice={totalPrice} />
          ) : step === 1 ? (
            <StepShipping form={form} errors={errors} onChange={handleChange} />
          ) : (
            <StepConfirm items={items} form={form} totalPrice={totalPrice} />
          )}
        </div>

        {/* Footer actions */}
        {!ordered && (
          <div className="checkout-footer">
            {step > 0 && (
              <button className="btn btn--outline" onClick={() => setStep((s) => s - 1)}>
                ← Back
              </button>
            )}
            <div style={{ flex: 1 }} />
            {step < 2 ? (
              <button
                className="btn btn--primary"
                onClick={handleNext}
                disabled={step === 0 && items.length === 0}
              >
                {step === 0 ? "Continue to Shipping →" : "Review Order →"}
              </button>
            ) : (
              <button className="btn btn--primary btn--lg" onClick={handlePlaceOrder}>
                🎵 Place Order — ₹{totalPrice}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

/* ── Step 0: Cart Review ── */
const StepCart = ({ items, dispatch, totalItems, totalPrice }) => (
  <div className="checkout-cart">
    {items.length === 0 ? (
      <div className="checkout-empty">
        <span>🛒</span>
        <p>Your cart is empty. Add some vibes first!</p>
      </div>
    ) : (
      <>
        <ul className="checkout-items" role="list">
          {items.map((item) => (
            <li key={item.id} className="checkout-item">
              <div className="checkout-item__swatch" style={{ background: item.gradient || item.color }}>
                <span>{item.moodEmoji}</span>
              </div>
              <div className="checkout-item__info">
                <div className="checkout-item__name">{item.name}</div>
                <div className="checkout-item__sub" style={{ color: item.color }}>{item.mood}</div>
              </div>
              <div className="checkout-item__qty">
                <button onClick={() => dispatch({ type: "DECREASE_QTY", payload: item.id })} aria-label="Decrease">−</button>
                <span>{item.qty}</span>
                <button onClick={() => dispatch({ type: "INCREASE_QTY", payload: item.id })} aria-label="Increase">+</button>
              </div>
              <div className="checkout-item__price">₹{item.price * item.qty}</div>
              <button className="checkout-item__remove" onClick={() => dispatch({ type: "REMOVE_ITEM", payload: item.id })} aria-label={`Remove ${item.name}`}>
                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12" /></svg>
              </button>
            </li>
          ))}
        </ul>
        <div className="checkout-summary">
          <div className="checkout-summary__row">
            <span>{totalItems} item{totalItems !== 1 ? "s" : ""}</span>
            <span>₹{totalPrice}</span>
          </div>
          <div className="checkout-summary__row">
            <span>Shipping</span>
            <span className="checkout-summary__free">Free 🎵</span>
          </div>
          <div className="checkout-summary__row checkout-summary__row--total">
            <span>Total</span>
            <span>₹{totalPrice}</span>
          </div>
        </div>
      </>
    )}
  </div>
);

/* ── Step 1: Shipping Details ── */
const StepShipping = ({ form, errors, onChange }) => (
  <form className="checkout-form" onSubmit={(e) => e.preventDefault()} noValidate>
    <div className="checkout-form__row">
      <Field label="Full Name" name="name" value={form.name} error={errors.name} onChange={onChange} placeholder="Neha Arun" />
      <Field label="Email" name="email" type="email" value={form.email} error={errors.email} onChange={onChange} placeholder="neha@email.com" />
    </div>
    <Field label="Phone Number" name="phone" type="tel" value={form.phone} error={errors.phone} onChange={onChange} placeholder="9876543210" />
    <Field label="Address" name="address" value={form.address} error={errors.address} onChange={onChange} placeholder="123, Main Street, Apt 4B" />
    <div className="checkout-form__row">
      <Field label="City" name="city" value={form.city} error={errors.city} onChange={onChange} placeholder="Chennai" />
      <Field label="Pincode" name="pincode" value={form.pincode} error={errors.pincode} onChange={onChange} placeholder="600001" />
    </div>
    <Field label="State" name="state" value={form.state} error={errors.state} onChange={onChange} placeholder="Tamil Nadu" />
  </form>
);

const Field = ({ label, name, type = "text", value, error, onChange, placeholder }) => (
  <div className="checkout-field">
    <label className="checkout-field__label" htmlFor={`field-${name}`}>{label}</label>
    <input
      id={`field-${name}`}
      className={`checkout-field__input ${error ? "checkout-field__input--error" : ""}`}
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      aria-describedby={error ? `${name}-error` : undefined}
      aria-invalid={!!error}
    />
    {error && <span id={`${name}-error`} className="checkout-field__error" role="alert">{error}</span>}
  </div>
);

/* ── Step 2: Confirm ── */
const StepConfirm = ({ items, form, totalPrice }) => (
  <div className="checkout-confirm">
    <div className="checkout-confirm__section">
      <h3>🛍 Order Summary</h3>
      <ul>
        {items.map((item) => (
          <li key={item.id} className="checkout-confirm__item">
            <span>{item.moodEmoji} {item.name} × {item.qty}</span>
            <span>₹{item.price * item.qty}</span>
          </li>
        ))}
        <li className="checkout-confirm__item checkout-confirm__item--total">
          <span>Total</span>
          <span>₹{totalPrice}</span>
        </li>
      </ul>
    </div>
    <div className="checkout-confirm__section">
      <h3>📦 Ship to</h3>
      <p>{form.name}</p>
      <p>{form.address}</p>
      <p>{form.city}, {form.state} — {form.pincode}</p>
      <p>{form.email} · {form.phone}</p>
    </div>
    <div className="checkout-confirm__section">
      <h3>💳 Payment</h3>
      <p className="checkout-confirm__payment">Cash on Delivery (Demo)</p>
    </div>
  </div>
);

/* ── Order Success ── */
const OrderSuccess = ({ name }) => (
  <div className="checkout-success">
    <div className="checkout-success__icon">🎵</div>
    <h3>Thank you, {name?.split(" ")[0] || "friend"}!</h3>
    <p>Your order is confirmed. Time to press play and let the vibe begin.</p>
    <div className="checkout-success__bars">
      {[1,2,3,4,5].map((i) => (
        <div key={i} className="checkout-success__bar" style={{ animationDelay: `${i * 0.12}s` }} />
      ))}
    </div>
  </div>
);

export default Checkout;
