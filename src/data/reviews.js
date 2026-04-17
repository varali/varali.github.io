import { parseReview } from "../utils/reviewParser";

import wretchedMageRaw from "./reviews/wretched-mage.md?raw";
import harriedWitchRaw from "./reviews/harried-witch.md?raw";

const wretchedMage = parseReview(wretchedMageRaw);
const harriedWitch = parseReview(harriedWitchRaw);

export const allReviews = [
  wretchedMage,
  harriedWitch,
];

export const recentReviews = allReviews
  .sort((a, b) => new Date(b.date) - new Date(a.date))
  .slice(0, 3);
