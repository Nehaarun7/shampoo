import { useState, useEffect } from "react";
import { useCart } from "../context/useCart";

const Navbar = ({ onCartOpen, onNavClick }) => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { totalItems } = useCart();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Home", section: "hero" },
    { label: "Find Your Vibe", section: "mood" },
    { label: "Collection", section: "collection" },
    { label: "Playlists", section: "playlists" },
    { label: "About", section: "about" },
  ];

  const handleNav = (section) => {
    onNavClick(section);
    setMenuOpen(false);
  };

  return (
    <nav className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}>
      <div className="navbar__inner">
        {/* Logo */}
        <div className="navbar__logo" onClick={() => handleNav("hero")} role="button" tabIndex={0} onKeyDown={(e) => e.key === "Enter" && handleNav("hero")}>
          <span className="navbar__logo-icon">🎵</span>
          <span className="navbar__logo-text">
            Spotify<span className="navbar__logo-accent"> Shampoo</span>
          </span>
        </div>

        {/* Desktop Links */}
        <ul className="navbar__links">
          {navLinks.map((link) => (
            <li key={link.section}>
              <button className="navbar__link" onClick={() => handleNav(link.section)}>
                {link.label}
              </button>
            </li>
          ))}
        </ul>

        {/* Actions */}
        <div className="navbar__actions">
          <button className="navbar__cart-btn" onClick={onCartOpen} aria-label={`Cart with ${totalItems} items`}>
            <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 01-8 0" />
            </svg>
            {totalItems > 0 && (
              <span className="navbar__cart-count" aria-label={`${totalItems} items in cart`}>{totalItems}</span>
            )}
          </button>
          <button className="btn btn--primary btn--sm" onClick={() => handleNav("collection")}>
            Shop Now
          </button>

          {/* Hamburger */}
          <button
            className={`navbar__hamburger ${menuOpen ? "navbar__hamburger--open" : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
          >
            <span /><span /><span />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`navbar__mobile ${menuOpen ? "navbar__mobile--open" : ""}`} role="navigation" aria-label="Mobile navigation">
        {navLinks.map((link) => (
          <button key={link.section} className="navbar__mobile-link" onClick={() => handleNav(link.section)}>
            {link.label}
          </button>
        ))}
        <button className="btn btn--primary" onClick={() => { handleNav("collection"); setMenuOpen(false); }}>
          Shop Now
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
