import { Link } from "react-router-dom";
import styles from "./ReviewCard.module.css";

function Stars({ count }) {
  return (
    <span className={styles.stars}>
      {"⭐️".repeat(count)}
    </span>
  );
}

function Spice({ count }) {
  return (
    <span className={styles.spice}>
      {"🌶️".repeat(count)}
    </span>
  );
}

export default function ReviewCard({ review }) {
  const slug = review.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  return (
    <Link to={`/reviews/${slug}`} className={styles.card}>
      <div className={styles.cover}>
        {review.cover ? (
          <img src={review.cover} alt={review.title} className={styles.coverImg} />
        ) : (
          <div className={styles.coverPlaceholder}>
            <span className={styles.coverGlyph}>✦</span>
          </div>
        )}
      </div>

      <div className={styles.content}>
        <div className={styles.ratings}>
          <Stars count={review.stars} />
          <Spice count={review.spice} />
        </div>

        <h3 className={styles.title}>{review.title}</h3>
        <p className={styles.author}>{review.author}</p>

        <p className={styles.firstLine}>{review.firstLine}</p>

        {review.tropes.length > 0 && (
          <div className={styles.tropes}>
            {review.tropes.slice(0, 3).map((t) => (
              <span key={t} className={styles.trope}>{t}</span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}
