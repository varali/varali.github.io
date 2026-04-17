import { useParams, Link, Navigate } from "react-router-dom";
import styles from "./ReviewDetail.module.css";
import PageNav from "../components/PageNav";
import { allReviews } from "../data/reviews";
import { findReviewBySlug } from "../utils/slugUtils";

function Stars({ count }) {
  return <span className={styles.stars}>{"⭐️".repeat(count)}</span>;
}

function Spice({ count }) {
  return <span className={styles.spice}>{"🌶️".repeat(count)}</span>;
}

export default function ReviewDetail() {
  const { slug } = useParams();
  const review = findReviewBySlug(allReviews, slug);

  if (!review) return <Navigate to="/reviews" replace />;

  const formattedDate = review.date
    ? new Date(review.date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  return (
    <main className={styles.page}>
      <PageNav />

      <div className={styles.content}>
        <div className={styles.back}>
          <Link to="/reviews" className={styles.backLink}>← all reviews</Link>
        </div>

        <div className={styles.layout}>
          <aside className={styles.sidebar}>
            <div className={styles.cover}>
              {review.cover ? (
                <img
                  src={review.cover}
                  alt={review.title}
                  className={styles.coverImg}
                />
              ) : (
                <div className={styles.coverPlaceholder}>
                  <span className={styles.coverGlyph}>✦</span>
                </div>
              )}
            </div>

            <div className={styles.meta}>
              <div className={styles.ratings}>
                <Stars count={review.stars} />
                <Spice count={review.spice} />
              </div>

              {review.tropes.length > 0 && (
                <div className={styles.tropes}>
                  <span className={styles.tropesLabel}>tropes</span>
                  {review.tropes.map((t) => (
                    <span key={t} className={styles.trope}>{t}</span>
                  ))}
                </div>
              )}

              {formattedDate && (
                <p className={styles.date}>{formattedDate}</p>
              )}
            </div>
          </aside>

          <article className={styles.article}>
            {review.quote && (
              <blockquote className={styles.openingQuote}>
                {review.quote}
              </blockquote>
            )}

            <h1 className={styles.title}>{review.title}</h1>
            <p className={styles.author}>by {review.author}</p>

            <div className={styles.body}>
              {review.paragraphs.map((para, i) => (
                <div key={i}>
                  <p className={styles.paragraph}>{para}</p>
                  {i < review.paragraphs.length - 1 && (
                    <div className={styles.divider}>🤎</div>
                  )}
                </div>
              ))}
            </div>

            {review.qotd && (
              <div className={styles.qotd}>
                <span className={styles.qotdLabel}>💭❔</span>
                <p className={styles.qotdText}>{review.qotd}</p>
              </div>
            )}
          </article>
        </div>
      </div>
    </main>
  );
}
