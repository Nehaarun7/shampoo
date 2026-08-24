import { useState, useRef } from "react";
import { useCart } from "../context/useCart";

const moodOptions = [
  { value: "happy", label: "😊 Happy", color: "#F59E0B" },
  { value: "chill", label: "😌 Chill", color: "#8B5CF6" },
  { value: "energetic", label: "⚡ Energetic", color: "#FF6B35" },
  { value: "romantic", label: "❤️ Romantic", color: "#EC4899" },
  { value: "focused", label: "🧠 Focused", color: "#10B981" },
];

const fragranceOptions = [
  { value: "citrus", label: "🍋 Citrus", note: "Fresh & Zesty" },
  { value: "lavender", label: "💜 Lavender", note: "Calm & Floral" },
  { value: "rose", label: "🌹 Rose", note: "Romantic & Soft" },
  { value: "mint", label: "🌿 Mint", note: "Sharp & Cool" },
  { value: "vanilla", label: "🍦 Vanilla", note: "Warm & Sweet" },
  { value: "tropical", label: "🌴 Tropical", note: "Fruity & Bold" },
];

const bottleOptions = [
  { value: "classic", label: "Classic", gradient: "linear-gradient(135deg, #1DB954, #191414)" },
  { value: "neon", label: "Neon", gradient: "linear-gradient(135deg, #FF6B35, #FFD700)" },
  { value: "pastel", label: "Pastel", gradient: "linear-gradient(135deg, #FDA4AF, #C4B5FD)" },
  { value: "midnight", label: "Midnight", gradient: "linear-gradient(135deg, #6366F1, #0F0F23)" },
];

const basePrices = { happy: 579, chill: 549, energetic: 499, romantic: 599, focused: 499 };
const fragrancePrices = { citrus: 0, lavender: 20, rose: 50, mint: 0, vanilla: 30, tropical: 30 };
const bottlePrices = { classic: 0, neon: 50, pastel: 30, midnight: 40 };

const Customizer = () => {
  const [mood, setMood] = useState("happy");
  const [fragrance, setFragrance] = useState("citrus");
  const [bottleStyle, setBottleStyle] = useState("classic");
  const [added, setAdded] = useState(false);
  const { dispatch } = useCart();
  const idCounter = useRef(0);

  const selectedMood = moodOptions.find((m) => m.value === mood);
  const selectedFrag = fragranceOptions.find((f) => f.value === fragrance);
  const selectedBottle = bottleOptions.find((b) => b.value === bottleStyle);

  const price =
    (basePrices[mood] || 499) +
    (fragrancePrices[fragrance] || 0) +
    (bottlePrices[bottleStyle] || 0);

  const handleAddToCart = () => {
    idCounter.current += 1;
    const customProduct = {
      id: `custom-${mood}-${fragrance}-${bottleStyle}-${idCounter.current}`,
      name: `Custom ${selectedFrag.label.split(" ")[1]} Blend`,
      mood: selectedMood.label.split(" ").slice(1).join(" "),
      moodEmoji: selectedMood.label.split(" ")[0],
      fragrance: selectedFrag.label.split(" ").slice(1).join(" "),
      genre: "Custom Mix",
      price,
      color: selectedMood.color,
      gradient: selectedBottle.gradient,
      description: `Custom ${mood} blend with ${fragrance} fragrance in ${bottleStyle} bottle.`,
    };
    dispatch({ type: "ADD_ITEM", payload: customProduct });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <section className="customizer-section section" id="customizer" aria-labelledby="customizer-heading">
      <div className="customizer-section__bg" aria-hidden="true">
        <div className="customizer-section__blob" />
      </div>

      <div className="container">
        <div className="section-header">
          <div className="section-badge">Build Your Own</div>
          <h2 className="section-title" id="customizer-heading">
            Create Your <span className="text-gradient">Own Vibe</span>
          </h2>
          <p className="section-subtitle">
            Design a shampoo that&apos;s 100% you. Choose your mood, fragrance, and style.
          </p>
        </div>

        <div className="customizer">
          {/* Controls */}
          <div className="customizer__controls">
            {/* Mood */}
            <fieldset className="customizer__group">
              <legend className="customizer__label">Choose Your Mood</legend>
              <div className="customizer__options customizer__options--mood">
                {moodOptions.map((m) => (
                  <button
                    key={m.value}
                    className={`customizer__option ${mood === m.value ? "customizer__option--active" : ""}`}
                    style={{ "--opt-color": m.color }}
                    onClick={() => setMood(m.value)}
                    aria-pressed={mood === m.value}
                  >
                    {m.label}
                  </button>
                ))}
              </div>
            </fieldset>

            {/* Fragrance */}
            <fieldset className="customizer__group">
              <legend className="customizer__label">Choose Fragrance</legend>
              <div className="customizer__options customizer__options--fragrance">
                {fragranceOptions.map((f) => (
                  <button
                    key={f.value}
                    className={`customizer__option ${fragrance === f.value ? "customizer__option--active" : ""}`}
                    style={{ "--opt-color": selectedMood?.color }}
                    onClick={() => setFragrance(f.value)}
                    aria-pressed={fragrance === f.value}
                  >
                    <span>{f.label}</span>
                    <span className="customizer__option-note">{f.note}</span>
                  </button>
                ))}
              </div>
            </fieldset>

            {/* Bottle Style */}
            <fieldset className="customizer__group">
              <legend className="customizer__label">Choose Bottle Style</legend>
              <div className="customizer__options customizer__options--bottle">
                {bottleOptions.map((b) => (
                  <button
                    key={b.value}
                    className={`customizer__option customizer__option--bottle ${bottleStyle === b.value ? "customizer__option--active" : ""}`}
                    style={{ "--opt-color": selectedMood?.color }}
                    onClick={() => setBottleStyle(b.value)}
                    aria-pressed={bottleStyle === b.value}
                  >
                    <div className="customizer__bottle-swatch" style={{ background: b.gradient }} aria-hidden="true" />
                    <span>{b.label}</span>
                    {bottlePrices[b.value] > 0 && (
                      <span className="customizer__option-price">+₹{bottlePrices[b.value]}</span>
                    )}
                  </button>
                ))}
              </div>
            </fieldset>
          </div>

          {/* Preview */}
          <div className="customizer__preview" aria-live="polite" aria-label="Custom shampoo preview">
            <div className="customizer__preview-bottle" style={{ background: selectedBottle.gradient }}>
              <div className="customizer__preview-inner">
                <span className="customizer__preview-emoji">{selectedMood.label.split(" ")[0]}</span>
                <span className="customizer__preview-title">YOUR</span>
                <span className="customizer__preview-title">CUSTOM</span>
                <span className="customizer__preview-title">SHAMPOO</span>
                <div className="customizer__preview-tag" style={{ background: "rgba(0,0,0,0.3)" }}>
                  {selectedFrag.label.split(" ")[1]}
                </div>
              </div>
            </div>

            <div className="customizer__preview-details">
              <h3 className="customizer__preview-name">Your Custom Shampoo</h3>
              <div className="customizer__preview-specs">
                <div className="customizer__spec">
                  <span className="customizer__spec-label">Mood</span>
                  <span className="customizer__spec-value" style={{ color: selectedMood.color }}>
                    {selectedMood.label}
                  </span>
                </div>
                <div className="customizer__spec">
                  <span className="customizer__spec-label">Fragrance</span>
                  <span className="customizer__spec-value">{selectedFrag.label}</span>
                </div>
                <div className="customizer__spec">
                  <span className="customizer__spec-label">Bottle Style</span>
                  <span className="customizer__spec-value">{selectedBottle.label}</span>
                </div>
                <div className="customizer__spec">
                  <span className="customizer__spec-label">Total Price</span>
                  <span className="customizer__spec-value customizer__spec-price">₹{price}</span>
                </div>
              </div>
              <button
                className={`btn btn--primary btn--lg ${added ? "btn--success" : ""}`}
                onClick={handleAddToCart}
                aria-label="Add custom shampoo to cart"
              >
                {added ? "✓ Added to Cart!" : "Add Custom Shampoo to Cart"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Customizer;
