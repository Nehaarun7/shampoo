const Footer = ({ onNavClick }) => {
  const year = new Date().getFullYear();

  const links = [
    { label: "About", section: "about" },
    { label: "Collection", section: "collection" },
    { label: "Find Your Vibe", section: "mood" },
    { label: "Playlists", section: "playlists" },
    { label: "Contact", href: "mailto:hello@spotifyshampoo.fake" },
  ];

  return (
    <footer className="footer" role="contentinfo">
      <div className="footer__top">
        <div className="container">
          <div className="footer__inner">
            {/* Brand */}
            <div className="footer__brand">
              <div className="footer__logo">
                <span aria-hidden="true">🎵</span>
                <span>Spotify Shampoo</span>
              </div>
              <p className="footer__tagline">
                Your mood has a sound.<br />Now it has a shampoo.
              </p>
              {/* Social icons */}
              <div className="footer__socials" aria-label="Social media links">
                <a href="#" className="footer__social" aria-label="Instagram" rel="noopener noreferrer">
                  <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
                <a href="#" className="footer__social" aria-label="YouTube" rel="noopener noreferrer">
                  <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>
                <a href="#" className="footer__social" aria-label="TikTok" rel="noopener noreferrer">
                  <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V9.83a8.27 8.27 0 004.83 1.55V7.91a4.85 4.85 0 01-1.06-.22z" />
                  </svg>
                </a>
                <a href="#" className="footer__social" aria-label="X (Twitter)" rel="noopener noreferrer">
                  <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Links */}
            <nav className="footer__nav" aria-label="Footer navigation">
              <h3 className="footer__nav-title">Navigate</h3>
              <ul className="footer__nav-list">
                {links.map((link) => (
                  <li key={link.label}>
                    {link.section ? (
                      <button className="footer__nav-link" onClick={() => onNavClick(link.section)}>
                        {link.label}
                      </button>
                    ) : (
                      <a href={link.href} className="footer__nav-link">
                        {link.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </nav>

            {/* Newsletter */}
            <div className="footer__newsletter">
              <h3 className="footer__nav-title">Stay in the Vibe</h3>
              <p className="footer__newsletter-desc">Get new drops and exclusive playlists.</p>
              <form className="footer__newsletter-form" onSubmit={(e) => e.preventDefault()}>
                <label htmlFor="footer-email" className="sr-only">Email address</label>
                <input
                  id="footer-email"
                  type="email"
                  placeholder="your@email.com"
                  className="footer__newsletter-input"
                  aria-label="Email address for newsletter"
                />
                <button type="submit" className="btn btn--primary btn--sm" aria-label="Subscribe to newsletter">
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className="footer__bottom">
        <div className="container">
          <div className="footer__bottom-inner">
            <p className="footer__copyright">
              © {year} Spotify Shampoo — All Rights Reserved
            </p>
            <p className="footer__disclaimer">
              🎓 This is a fictional student Build-A-Thon concept and is not affiliated with Spotify AB or any real brand.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
