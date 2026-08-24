const steps = [
  {
    number: "01",
    title: "Choose Your Mood",
    description: "Tell us how you're feeling today. Happy, chill, energetic, romantic — we've got a vibe for every mood.",
    icon: "🎭",
    color: "#1DB954",
  },
  {
    number: "02",
    title: "Get Your Match",
    description: "Our smart recommendation system finds your perfect shampoo formula, fragrance, and matching playlist in seconds.",
    icon: "✨",
    color: "#8B5CF6",
  },
  {
    number: "03",
    title: "Press Play",
    description: "Enjoy your personalized soundtrack while using your shampoo. Turn every shower into a full sensory experience.",
    icon: "▶",
    color: "#EC4899",
  },
];

const HowItWorks = () => {
  return (
    <section className="hiw-section section" id="how-it-works" aria-labelledby="hiw-heading">
      <div className="container">
        <div className="section-header">
          <div className="section-badge">Simple Process</div>
          <h2 className="section-title" id="hiw-heading">
            How It <span className="text-gradient">Works</span>
          </h2>
          <p className="section-subtitle">Three steps to your perfect vibe.</p>
        </div>

        <div className="hiw-steps" role="list">
          {steps.map((step, i) => (
            <div key={step.number} className="hiw-step" role="listitem">
              {i < steps.length - 1 && (
                <div className="hiw-step__connector" aria-hidden="true" />
              )}
              <div className="hiw-step__card">
                <div
                  className="hiw-step__icon-wrap"
                  style={{ background: `${step.color}22`, border: `2px solid ${step.color}44` }}
                  aria-hidden="true"
                >
                  <span className="hiw-step__icon">{step.icon}</span>
                  <div
                    className="hiw-step__icon-glow"
                    style={{ background: step.color }}
                    aria-hidden="true"
                  />
                </div>
                <div
                  className="hiw-step__number"
                  style={{ color: step.color }}
                  aria-label={`Step ${step.number}`}
                >
                  {step.number}
                </div>
                <h3 className="hiw-step__title">{step.title}</h3>
                <p className="hiw-step__desc">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
