import { reviews } from "../data/products";

const Stars = ({ count }) => (
  <div className="stars" aria-label={`${count} out of 5 stars`} role="img">
    {Array.from({ length: 5 }).map((_, i) => (
      <span
        key={i}
        className={`star ${i < count ? "star--filled" : "star--empty"}`}
        aria-hidden="true"
      >
        ★
      </span>
    ))}
  </div>
);

const Reviews = () => {
  return (
    <section className="reviews-section section" id="reviews" aria-labelledby="reviews-heading">
      <div className="container">
        <div className="section-header">
          <div className="section-badge">Social Proof</div>
          <h2 className="section-title" id="reviews-heading">
            The <span className="text-gradient">Vibe Speaks.</span>
          </h2>
          <p className="section-subtitle">
            50,000+ happy customers. Same hair care. Way better soundtrack.
          </p>
        </div>

        {/* Overall rating banner */}
        <div className="reviews-banner" aria-label="Overall rating">
          <div className="reviews-banner__score">4.9</div>
          <div>
            <Stars count={5} />
            <p className="reviews-banner__label">Average from 50,000+ reviews</p>
          </div>
        </div>

        <div className="reviews-grid" role="list" aria-label="Customer reviews">
          {reviews.map((review) => (
            <article
              key={review.id}
              className="review-card"
              style={{ "--review-color": review.color }}
              role="listitem"
            >
              <div className="review-card__top">
                <div
                  className="review-card__avatar"
                  style={{ background: review.color }}
                  aria-hidden="true"
                >
                  {review.avatar}
                </div>
                <div>
                  <div className="review-card__name">{review.name}</div>
                  <div className="review-card__product" style={{ color: review.color }}>
                    {review.product}
                  </div>
                </div>
                <Stars count={review.rating} />
              </div>
              <blockquote className="review-card__text">
                &quot;{review.text}&quot;
              </blockquote>
              <div className="review-card__glow" aria-hidden="true" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;
