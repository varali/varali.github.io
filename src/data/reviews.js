import { parseReview } from "../utils/reviewParser";

import wretchedMageRaw from "./reviews/wretched-mage.md?raw";

const wretchedMage = parseReview(wretchedMageRaw);

export const allReviews = [
  wretchedMage,
];

export const recentReviews = allReviews
  .sort((a, b) => new Date(b.date) - new Date(a.date))
  .slice(0, 3);
