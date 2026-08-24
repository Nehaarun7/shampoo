import { useEffect, useRef } from "react";

const Hero = ({ onFindVibe, onExplore }) => {
  const floatersRef = useRef(null);

  useEffect(() => {
    const floaters = floatersRef.current?.querySelectorAll(".hero__floater");
    if (!floaters) return;
    floaters.forEach((el, i) => {
      const speed = 2 + Math.random() * 3;
      const delay = i * 0.4;
      el.style.animation = `float ${speed}s ease-in-out ${delay}s infinite alternate`;
    });
  }, []);

  return (
    <section className="hero" id="hero" aria-label="Hero section">
      {/* Background blobs */}
      <div className="hero__blob hero__blob--1" aria-hidden="true" />
      <div className="hero__blob hero__blob--2" aria-hidden="true" />
      <div className="hero__blob hero__blob--3" aria-hidden="true" />

      <div className="hero__inner">
        {/* Text Content */}
        <div className="hero__content">
          <div className="hero__badge">
            <span className="hero__badge-dot" aria-hidden="true" />
            New Collection Drop 🎵
          </div>
          <h1 className="hero__title">
            YOUR MOOD.<br />
            <span className="hero__title-accent">YOUR MUSIC.</span><br />
            YOUR SHAMPOO.
          </h1>
          <p className="hero__subtitle">
            Meet Spotify Shampoo — hair care designed around the way you feel and the music you love.
          </p>
          <div className="hero__ctas">
            <button className="btn btn--primary btn--lg hero__cta-primary" onClick={onFindVibe}>
              <span>Find My Vibe</span>
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
            <button className="btn btn--outline btn--lg" onClick={onExplore}>
              Explore Collection
            </button>
          </div>

          {/* Stats */}
          <div className="hero__stats" aria-label="Product statistics">
            <div className="hero__stat">
              <span className="hero__stat-number">6</span>
              <span className="hero__stat-label">Mood Vibes</span>
            </div>
            <div className="hero__stat-divider" aria-hidden="true" />
            <div className="hero__stat">
              <span className="hero__stat-number">50K+</span>
              <span className="hero__stat-label">Customers</span>
            </div>
            <div className="hero__stat-divider" aria-hidden="true" />
            <div className="hero__stat">
              <span className="hero__stat-number">4.9★</span>
              <span className="hero__stat-label">Avg Rating</span>
            </div>
          </div>
        </div>

        {/* Product Visual */}
        <div className="hero__visual" aria-label="Shampoo product display">
          {/* Floating elements */}
          <div className="hero__floaters" ref={floatersRef} aria-hidden="true">
            <div className="hero__floater hero__floater--note">♪</div>
            <div className="hero__floater hero__floater--note2">♫</div>
            <div className="hero__floater hero__floater--play">▶</div>
            <div className="hero__floater hero__floater--wave">
              <MiniWave />
            </div>
            <div className="hero__floater hero__floater-card">
              <div className="hero__mini-card">
                <span>⚡</span>
                <span>Energetic</span>
              </div>
            </div>
            <div className="hero__floater hero__floater-card2">
              <div className="hero__mini-card hero__mini-card--purple">
                <span>😌</span>
                <span>Chill</span>
              </div>
            </div>
            <div className="hero__floater hero__floater-eq">
              <Equalizer />
            </div>
          </div>

          {/* Main bottle */}
          <div className="hero__bottle-wrap">
            <div className="hero__bottle-glow" aria-hidden="true" />
            <ShampooBottle />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="hero__scroll-hint" aria-hidden="true">
        <div className="hero__scroll-mouse">
          <div className="hero__scroll-wheel" />
        </div>
        <span>Scroll to explore</span>
      </div>
    </section>
  );
};

const MiniWave = () => (
  <svg width="60" height="24" viewBox="0 0 60 24" fill="none" aria-hidden="true">
    {[4, 8, 12, 16, 20, 24, 28, 32, 36, 40, 44, 48, 52, 56].map((x, i) => (
      <rect
        key={x}
        x={x - 1}
        y={12 - (i % 3 === 0 ? 10 : i % 3 === 1 ? 6 : 4)}
        width="3"
        height={i % 3 === 0 ? 20 : i % 3 === 1 ? 12 : 8}
        rx="2"
        fill="#1DB954"
        opacity="0.8"
      />
    ))}
  </svg>
);

const Equalizer = () => (
  <div className="hero__eq" aria-hidden="true">
    {[1, 2, 3, 4, 5].map((i) => (
      <div key={i} className="hero__eq-bar" style={{ animationDelay: `${i * 0.15}s` }} />
    ))}
  </div>
);

const ShampooBottle = () => (
  <div className="hero__bottle" role="img" aria-label="Spotify Shampoo bottle">
    <svg viewBox="0 0 200 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="hero__bottle-svg">
      <defs>
        <linearGradient id="bottleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1DB954" />
          <stop offset="50%" stopColor="#8B5CF6" />
          <stop offset="100%" stopColor="#EC4899" />
        </linearGradient>
        <linearGradient id="bottleShine" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.3)" />
          <stop offset="50%" stopColor="rgba(255,255,255,0.05)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur" />
          <feMerge><feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
      {/* Bottle cap */}
      <rect x="75" y="10" width="50" height="55" rx="12" fill="#1a1a2e" stroke="url(#bottleGrad)" strokeWidth="2" />
      <rect x="83" y="18" width="34" height="38" rx="8" fill="url(#bottleGrad)" opacity="0.6" />
      {/* Neck */}
      <path d="M68 65 L72 95 L128 95 L132 65 Z" fill="#0f0f23" stroke="url(#bottleGrad)" strokeWidth="1.5" />
      {/* Body */}
      <rect x="30" y="95" width="140" height="270" rx="30" fill="url(#bottleGrad)" filter="url(#glow)" />
      {/* Shine */}
      <rect x="30" y="95" width="140" height="270" rx="30" fill="url(#bottleShine)" />
      {/* Label area */}
      <rect x="45" y="130" width="110" height="160" rx="16" fill="rgba(0,0,0,0.35)" />
      {/* Logo text */}
      <text x="100" y="175" textAnchor="middle" fill="white" fontSize="11" fontWeight="700" fontFamily="system-ui" letterSpacing="2">SPOTIFY</text>
      <text x="100" y="195" textAnchor="middle" fill="white" fontSize="16" fontWeight="800" fontFamily="system-ui" letterSpacing="1">SHAMPOO</text>
      {/* Music note icon */}
      <text x="100" y="235" textAnchor="middle" fontSize="28" fill="white" opacity="0.9">🎵</text>
      {/* Mood badge */}
      <rect x="62" y="255" width="76" height="22" rx="11" fill="rgba(255,255,255,0.15)" />
      <text x="100" y="271" textAnchor="middle" fill="white" fontSize="9" fontFamily="system-ui" letterSpacing="1">YOUR MOOD VIBE</text>
      {/* Bottom highlight */}
      <ellipse cx="100" cy="355" rx="50" ry="8" fill="rgba(29,185,84,0.3)" />
    </svg>
  </div>
);

export default Hero;
