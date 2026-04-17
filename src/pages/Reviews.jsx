import { useState, useMemo } from "react";
import styles from "./Reviews.module.css";
import PageNav from "../components/PageNav";
import ReviewCard from "../components/ReviewCard";
import { allReviews } from "../data/reviews";

const SORT_OPTIONS = [
  { value: "date-desc", label: "newest first" },
  { value: "date-asc", label: "oldest first" },
  { value: "rating-desc", label: "highest rated" },
  { value: "spice-desc", label: "spiciest first" },
  { value: "title-asc", label: "title a-z" },
];

function sortReviews(reviews, sortBy) {
  return [...reviews].sort((a, b) => {
    switch (sortBy) {
      case "date-asc":
        return new Date(a.date) - new Date(b.date);
      case "date-desc":
        return new Date(b.date) - new Date(a.date);
      case "rating-desc":
        return b.stars - a.stars;
      case "spice-desc":
        return b.spice - a.spice;
      case "title-asc":
        return a.title.localeCompare(b.title);
      default:
        return new Date(b.date) - new Date(a.date);
    }
  });
}

export default function Reviews() {
  const [panelOpen, setPanelOpen] = useState(false);
  const [sortBy, setSortBy] = useState("date-desc");
  const [selectedTropes, setSelectedTropes] = useState([]);
  const [minStars, setMinStars] = useState(0);

  const allTropes = useMemo(() => {
    const set = new Set();
    allReviews.forEach((r) => r.tropes.forEach((t) => set.add(t)));
    return [...set].sort();
  }, []);

  const filtered = useMemo(() => {
    let results = allReviews;
    if (minStars > 0) {
      results = results.filter((r) => r.stars >= minStars);
    }
    if (selectedTropes.length > 0) {
      results = results.filter((r) =>
        selectedTropes.every((t) => r.tropes.includes(t))
      );
    }
    return sortReviews(results, sortBy);
  }, [sortBy, selectedTropes, minStars]);

  function toggleTrope(trope) {
    setSelectedTropes((prev) =>
      prev.includes(trope) ? prev.filter((t) => t !== trope) : [...prev, trope]
    );
  }

  function clearFilters() {
    setSortBy("date-desc");
    setSelectedTropes([]);
    setMinStars(0);
  }

  const hasActiveFilters =
    sortBy !== "date-desc" || selectedTropes.length > 0 || minStars > 0;

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

        <div className={styles.controls}>
          <div className={styles.controlsBar}>
            <button
              className={`${styles.filterToggle} ${panelOpen ? styles.filterToggleActive : ""}`}
              onClick={() => setPanelOpen((p) => !p)}
            >
              <span>filter & sort</span>
              <span className={styles.filterArrow}>{panelOpen ? "↑" : "↓"}</span>
              {hasActiveFilters && <span className={styles.filterDot} />}
            </button>
            <span className={styles.resultCount}>
              {filtered.length} {filtered.length === 1 ? "review" : "reviews"}
            </span>
          </div>

          {panelOpen && (
            <div className={styles.panel}>
              <div className={styles.panelSection}>
                <span className={styles.panelLabel}>sort by</span>
                <div className={styles.sortOptions}>
                  {SORT_OPTIONS.map((opt) => (
                    <button
                      key={opt.value}
                      className={`${styles.sortBtn} ${sortBy === opt.value ? styles.sortBtnActive : ""}`}
                      onClick={() => setSortBy(opt.value)}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className={styles.panelSection}>
                <span className={styles.panelLabel}>minimum rating</span>
                <div className={styles.starOptions}>
                  {[0, 3, 4, 5].map((n) => (
                    <button
                      key={n}
                      className={`${styles.sortBtn} ${minStars === n ? styles.sortBtnActive : ""}`}
                      onClick={() => setMinStars(n)}
                    >
                      {n === 0 ? "any" : `${n}+ ⭐️`}
                    </button>
                  ))}
                </div>
              </div>

              {allTropes.length > 0 && (
                <div className={styles.panelSection}>
                  <span className={styles.panelLabel}>tropes</span>
                  <div className={styles.tropeOptions}>
                    {allTropes.map((trope) => (
                      <button
                        key={trope}
                        className={`${styles.tropeBtn} ${selectedTropes.includes(trope) ? styles.tropeBtnActive : ""}`}
                        onClick={() => toggleTrope(trope)}
                      >
                        {trope}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {hasActiveFilters && (
                <button className={styles.clearBtn} onClick={clearFilters}>
                  clear all filters
                </button>
              )}
            </div>
          )}
        </div>

        {filtered.length === 0 ? (
          <div className={styles.noResults}>
            <p>no reviews match these filters.</p>
            <button className={styles.clearBtn} onClick={clearFilters}>
              clear filters
            </button>
          </div>
        ) : (
          <div className={styles.grid}>
            {filtered.map((review) => (
              <ReviewCard key={review.title} review={review} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
