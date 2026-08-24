import { useState } from "react";
import { products } from "../data/products";
import ProductCard from "./ProductCard";

const filters = ["All", "Energetic", "Chill", "Happy", "Romantic", "Focused", "Sleepy"];

const ProductCollection = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = products.filter((p) => {
    const matchFilter = activeFilter === "All" || p.mood === activeFilter;
    const q = searchQuery.toLowerCase();
    const matchSearch =
      !q ||
      p.name.toLowerCase().includes(q) ||
      p.mood.toLowerCase().includes(q) ||
      p.fragrance.toLowerCase().includes(q) ||
      p.genre.toLowerCase().includes(q);
    return matchFilter && matchSearch;
  });

  return (
    <section className="collection-section section" id="collection" aria-labelledby="collection-heading">
      <div className="container">
        <div className="section-header">
          <div className="section-badge">The Collection</div>
          <h2 className="section-title" id="collection-heading">
            Find Your <span className="text-gradient">Signature Sound</span>
          </h2>
          <p className="section-subtitle">
            Six moods. Six fragrances. One perfect match.
          </p>
        </div>

        {/* Search & Filter */}
        <div className="collection-controls">
          <div className="collection-search">
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
            <input
              type="text"
              placeholder="Search by name, mood, fragrance, genre..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="collection-search__input"
              aria-label="Search products"
            />
            {searchQuery && (
              <button
                className="collection-search__clear"
                onClick={() => setSearchQuery("")}
                aria-label="Clear search"
              >
                ✕
              </button>
            )}
          </div>

          <div className="collection-filters" role="group" aria-label="Filter by mood">
            {filters.map((f) => (
              <button
                key={f}
                className={`filter-btn ${activeFilter === f ? "filter-btn--active" : ""}`}
                onClick={() => setActiveFilter(f)}
                aria-pressed={activeFilter === f}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        {filtered.length > 0 ? (
          <div className="product-grid" role="list" aria-label="Product collection">
            {filtered.map((product) => (
              <div key={product.id} role="listitem">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        ) : (
          <div className="collection-empty" aria-live="polite">
            <span className="collection-empty__icon" aria-hidden="true">🔍</span>
            <h3>No products found</h3>
            <p>Try a different search term or filter</p>
            <button className="btn btn--outline" onClick={() => { setSearchQuery(""); setActiveFilter("All"); }}>
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductCollection;
