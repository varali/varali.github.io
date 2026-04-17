export function toSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function findReviewBySlug(reviews, slug) {
  return reviews.find((r) => toSlug(r.title) === slug) || null;
}
