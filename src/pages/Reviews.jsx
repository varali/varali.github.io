import styles from "./Reviews.module.css";
import PageNav from "../components/PageNav";
import ReviewCard from "../components/ReviewCard";
import { allReviews } from "../data/reviews";

export default function Reviews() {
  return (
    <main className={styles.page}>
      <PageNav />

      <div className={styles.content}>
        <div className={styles.header}>
          <span className={styles.eyebrow}>✦ the spellbook</span>
          <h1 className={styles.heading}>
            all <em>reviews</em>
          </h1>
          <p className={styles.subheading}>
            romantasy, fairy tales, and the books that wrecked me
          </p>
        </div>

        {allReviews.length === 0 ? (
          <p className={styles.empty}>no reviews yet. check back soon.</p>
        ) : (
          <div className={styles.grid}>
            {allReviews.map((review) => (
              <ReviewCard key={review.title} review={review} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
