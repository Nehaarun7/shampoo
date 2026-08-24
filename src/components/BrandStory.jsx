const stats = [
  { number: "6", label: "Mood Vibes", icon: "🎭" },
  { number: "50K+", label: "Happy Customers", icon: "😊" },
  { number: "6", label: "Curated Playlists", icon: "🎵" },
  { number: "4.9★", label: "Average Rating", icon: "⭐" },
];

const BrandStory = () => {
  return (
    <section className="brand-section section" id="about" aria-labelledby="brand-heading">
      <div className="brand-section__bg" aria-hidden="true">
        <div className="brand-section__wave" />
      </div>

      <div className="container">
        <div className="brand-inner">
          {/* Left: Story */}
          <div className="brand-story">
            <div className="section-badge">Our Story</div>
            <h2 className="section-title" id="brand-heading">
              More Than Shampoo.<br />
              <span className="text-gradient">It&apos;s a Mood.</span>
            </h2>
            <p className="brand-story__text">
              We believe that how you feel shapes how you start your day. So we created
              something that bridges two of life&apos;s greatest pleasures — music and personal care.
            </p>
            <p className="brand-story__text">
              Spotify Shampoo combines scientifically crafted hair formulas with carefully curated
              mood playlists. Every bottle is designed to match an emotion, a beat, and a moment.
            </p>
            <p className="brand-story__text">
              Whether you&apos;re chasing energy at 6am or winding down after a long night,
              we&apos;ve got the perfect formula — and the perfect soundtrack to go with it.
            </p>

            <div className="brand-story__quote" aria-label="Brand statement">
              <div className="brand-story__quote-bar" aria-hidden="true" />
              <p>
                &quot;Your mood has a sound. Now it has a shampoo.&quot;
              </p>
            </div>

            <button
              className="btn btn--primary btn--lg"
              onClick={() => document.getElementById("mood")?.scrollIntoView({ behavior: "smooth" })}
              aria-label="Find your vibe"
            >
              Find Your Vibe ✨
            </button>
          </div>

          {/* Right: Stats + Visual */}
          <div className="brand-visual">
            <div className="brand-stats" role="list" aria-label="Brand statistics">
              {stats.map((stat) => (
                <div key={stat.label} className="brand-stat" role="listitem">
                  <span className="brand-stat__icon" aria-hidden="true">{stat.icon}</span>
                  <span className="brand-stat__number">{stat.number}</span>
                  <span className="brand-stat__label">{stat.label}</span>
                </div>
              ))}
            </div>

            {/* Feature pillars */}
            <div className="brand-pillars" aria-label="Brand pillars">
              {[
                { icon: "🎵", title: "Music-First", desc: "Every product inspired by a genre" },
                { icon: "🌿", title: "Clean Formula", desc: "Sulfate-free, vegan ingredients" },
                { icon: "🎭", title: "Mood-Matched", desc: "Science of scent meets emotion" },
              ].map((p) => (
                <div key={p.title} className="brand-pillar">
                  <span className="brand-pillar__icon" aria-hidden="true">{p.icon}</span>
                  <div>
                    <div className="brand-pillar__title">{p.title}</div>
                    <div className="brand-pillar__desc">{p.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandStory;
