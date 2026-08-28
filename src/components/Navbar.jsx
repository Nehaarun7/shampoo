import { useState, useEffect } from "react";
import { useCart } from "../context/useCart";
import { useWishlist } from "../context/WishlistContext";
import { useOrderHistory } from "../context/OrderHistoryContext";

const Navbar = ({ onCartOpen, onWishlistOpen, onOrdersOpen, onNavClick, onShopNow }) => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { totalItems } = useCart();
  const { wishlist } = useWishlist();
  const { points } = useOrderHistory();

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
          {/* Loyalty points */}
          {points > 0 && (
            <button
              className="navbar__points"
              onClick={onOrdersOpen}
              aria-label={`${points} loyalty points — view orders`}
              title="Loyalty Points"
            >
              ⭐ {points}
            </button>
          )}

          {/* Wishlist */}
          <button
            className="navbar__cart-btn"
            onClick={onWishlistOpen}
            aria-label={`Wishlist with ${wishlist.length} items`}
            title="Wishlist"
          >
            <svg width="20" height="20" fill={wishlist.length > 0 ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true" style={{ color: wishlist.length > 0 ? "#EC4899" : "currentColor" }}>
              <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
            </svg>
            {wishlist.length > 0 && (
              <span className="navbar__cart-count" style={{ background: "#EC4899" }}>{wishlist.length}</span>
            )}
          </button>

          {/* Orders */}
          <button
            className="navbar__cart-btn"
            onClick={onOrdersOpen}
            aria-label="View order history"
            title="Order History"
          >
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" />
              <rect x="9" y="3" width="6" height="4" rx="1" />
              <path d="M9 12h6M9 16h4" />
            </svg>
          </button>

          {/* Cart */}
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
          <button className="btn btn--primary btn--sm" onClick={onShopNow || (() => handleNav("collection"))}>
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
