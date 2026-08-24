import { useState } from "react";
import { products } from "../data/products";
import { useCart } from "../context/useCart";

const rules = [
  { keywords: ["tired", "stress", "exhaust", "overwhelm", "burn", "drain", "weary", "tension"], product: products[1], vibe: "Chill 😌" },
  { keywords: ["happy", "excit", "good", "great", "amazing", "joy", "cheer", "bright", "smile"], product: products[4], vibe: "Happy 😊" },
  { keywords: ["energy", "energet", "pump", "hype", "active", "workout", "run", "gym", "alive"], product: products[0], vibe: "Energetic ⚡" },
  { keywords: ["love", "roman", "date", "heart", "passion", "tender", "kiss", "crush", "warm"], product: products[2], vibe: "Romantic ❤️" },
  { keywords: ["study", "work", "focus", "concent", "produc", "code", "exam", "think", "sharp", "mind"], product: products[3], vibe: "Focused 🧠" },
  { keywords: ["sleep", "night", "dream", "rest", "relax", "quiet", "calm", "sleepy", "bed", "tired"], product: products[5], vibe: "Sleepy 🌙" },
];

const SmartRecommendation = () => {
  const [input, setInput] = useState("");
  const [result, setResult] = useState(null);
  const [searching, setSearching] = useState(false);
  const [noMatch, setNoMatch] = useState(false);
  const { dispatch } = useCart();

  const handleFind = () => {
    if (!input.trim()) return;
    setSearching(true);
    setResult(null);
    setNoMatch(false);

    setTimeout(() => {
      const lower = input.toLowerCase();
      const match = rules.find((rule) =>
        rule.keywords.some((kw) => lower.includes(kw))
      );

      setSearching(false);
      if (match) {
        setResult(match);
      } else {
        setNoMatch(true);
      }
    }, 1200);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleFind();
  };

  const handleAddToCart = () => {
    if (result) dispatch({ type: "ADD_ITEM", payload: result.product });
  };

  return (
    <section className="smart-section section" id="smart" aria-labelledby="smart-heading">
      <div className="smart-section__bg" aria-hidden="true">
        <div className="smart-section__grid" />
      </div>

      <div className="container">
        <div className="section-header">
          <div className="section-badge">AI-Powered ✨</div>
          <h2 className="section-title" id="smart-heading">
            Tell Us How You <span className="text-gradient">Feel</span>
          </h2>
          <p className="section-subtitle">
            Describe your mood in your own words. Our smart recommendation finds your perfect match.
            <span className="smart-section__disclaimer"> (Fictional smart recommendation feature)</span>
          </p>
        </div>

        <div className="smart-input-wrap">
          <div className="smart-input-box">
            <textarea
              className="smart-input"
              placeholder="I feel tired after a long day… or I'm excited and ready to take on the world…"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              rows={3}
              aria-label="Describe your mood"
              maxLength={200}
            />
            <div className="smart-input-footer">
              <span className="smart-input-count">{input.length}/200</span>
              <button
                className="btn btn--primary"
                onClick={handleFind}
                disabled={!input.trim() || searching}
                aria-label="Find my vibe"
              >
                {searching ? (
                  <span className="smart-loading" aria-label="Analyzing...">
                    <span />
                    <span />
                    <span />
                  </span>
                ) : (
                  "Find My Vibe ✨"
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Suggestions */}
        {!result && !searching && (
          <div className="smart-suggestions">
            <span className="smart-suggestions__label">Try saying:</span>
            {["I feel tired…", "Super energetic today!", "Need to study hard", "Feeling romantic"].map((s) => (
              <button
                key={s}
                className="smart-suggestion-pill"
                onClick={() => setInput(s)}
                aria-label={`Use suggestion: ${s}`}
              >
                {s}
              </button>
            ))}
          </div>
        )}

        {/* Result */}
        {result && (
          <div className="smart-result" aria-live="polite">
            <div className="smart-result__vibe">
              Your vibe is: <strong style={{ color: result.product.color }}>{result.vibe}</strong>
            </div>

            <div
              className="smart-result__card"
              style={{ "--result-color": result.product.color, "--result-gradient": result.product.gradient }}
            >
              <div className="smart-result__bottle" style={{ background: result.product.gradient }} aria-hidden="true">
                <span className="smart-result__bottle-emoji">{result.product.moodEmoji}</span>
                <span className="smart-result__bottle-label">{result.product.name}</span>
              </div>
              <div className="smart-result__details">
                <div className="smart-result__match-label">Perfect Match Found ✓</div>
                <h3 className="smart-result__name">{result.product.name}</h3>
                <p className="smart-result__desc">{result.product.description}</p>
                <div className="smart-result__tags">
                  <span className="smart-result__tag" style={{ borderColor: result.product.color, color: result.product.color }}>
                    🌸 {result.product.fragrance}
                  </span>
                  <span className="smart-result__tag" style={{ borderColor: result.product.color, color: result.product.color }}>
                    🎵 {result.product.genre}
                  </span>
                </div>
                <div className="smart-result__price">₹{result.product.price}</div>
                <button className="btn btn--primary" onClick={handleAddToCart} aria-label={`Add ${result.product.name} to cart`}>
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        )}

        {noMatch && (
          <div className="smart-nomatch" aria-live="polite">
            <p>Hmm, we couldn&apos;t quite pin your vibe. Try describing your mood differently — or explore the full collection!</p>
            <button className="btn btn--outline" onClick={() => document.getElementById("collection")?.scrollIntoView({ behavior: "smooth" })}>
              Browse Collection
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default SmartRecommendation;
