import { useState } from "react";
import { moods, moodToProduct } from "../data/products";
import Recommendation from "./Recommendation";

const MoodSelector = () => {
  const [selectedMood, setSelectedMood] = useState(null);

  return (
    <section className="mood-section section" id="mood" aria-labelledby="mood-heading">
      {/* Background decoration */}
      <div className="mood-section__bg" aria-hidden="true">
        <div className="mood-section__circle mood-section__circle--1" />
        <div className="mood-section__circle mood-section__circle--2" />
      </div>

      <div className="container">
        <div className="section-header">
          <div className="section-badge">Interactive Feature</div>
          <h2 className="section-title" id="mood-heading">
            What&apos;s Your <span className="text-gradient">Vibe Today?</span>
          </h2>
          <p className="section-subtitle">
            Tell us how you&apos;re feeling. We&apos;ll find the shampoo that perfectly matches your mood.
          </p>
        </div>

        {/* Mood Grid */}
        <div className="mood-grid" role="group" aria-label="Mood selection">
          {moods.map((mood) => (
            <button
              key={mood.id}
              className={`mood-card ${selectedMood?.id === mood.id ? "mood-card--active" : ""}`}
              style={{
                "--mood-color": mood.color,
              }}
              onClick={() => setSelectedMood(mood)}
              aria-pressed={selectedMood?.id === mood.id}
              aria-label={`Select ${mood.label} mood`}
            >
              <span className="mood-card__emoji" role="img" aria-hidden="true">{mood.emoji}</span>
              <span className="mood-card__label">{mood.label}</span>
              {selectedMood?.id === mood.id && (
                <span className="mood-card__check" aria-hidden="true">✓</span>
              )}
              <div className="mood-card__glow" aria-hidden="true" />
            </button>
          ))}
        </div>

        {/* Recommendation */}
        {selectedMood && (
          <Recommendation
            product={moodToProduct[selectedMood.id]}
            mood={selectedMood}
          />
        )}

        {!selectedMood && (
          <div className="mood-prompt" aria-live="polite">
            <div className="mood-prompt__icon" aria-hidden="true">👆</div>
            <p>Select a mood above to get your personalized shampoo match</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default MoodSelector;
