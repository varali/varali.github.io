#!/usr/bin/env node

// Reads a review markdown file and outputs a formatted Instagram caption
// Usage: node scripts/format-caption.js src/data/reviews/my-review.md

import { readFileSync } from "fs";
import { resolve } from "path";

const filePath = process.argv[2];
if (!filePath) {
  console.error("Usage: node scripts/format-caption.js <path-to-review.md>");
  process.exit(1);
}

const raw = readFileSync(resolve(filePath), "utf-8");

function parseFrontMatter(raw) {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return { meta: {}, body: raw };
  const meta = {};
  match[1].split("\n").forEach((line) => {
    const [key, ...rest] = line.split(":");
    if (key && rest.length) {
      meta[key.trim()] = rest.join(":").trim().replace(/^"|"$/g, "");
    }
  });
  return { meta, body: match[2].trim() };
}

function extractStars(body) {
  const match = body.match(/[⭐️]+/);
  if (!match) return "";
  return match[0];
}

function extractSpice(body) {
  // Match a line that contains only spice peppers or a red heart (no-spice indicator)
  const match = body.match(/^((?:🌶(?:️)?)+|❤️)$/m);
  if (!match) return "";
  return match[0];
}

function extractTropes(body) {
  const ratingIdx = body.search(/[⭐️]+/);
  const qotdIdx = body.search(/💭❔QOTD:/);
  if (ratingIdx === -1 || qotdIdx === -1) return [];
  const between = body.slice(ratingIdx, qotdIdx);
  return between
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l && !l.match(/[⭐️🌶️🤎]/));
}

function extractQOTD(body) {
  const match = body.match(/💭❔QOTD:\s*(.+)/);
  return match ? match[1].trim() : null;
}

function extractParagraphs(body) {
  const ratingIdx = body.search(/[⭐️]+/);
  const endIdx = ratingIdx !== -1 ? ratingIdx : body.length;
  return body
    .slice(0, endIdx)
    .split("🤎")
    .map((p) => p.trim())
    .filter((p) => p.length > 0);
}

const { meta, body } = parseFrontMatter(raw);

if (meta.publish !== "true") {
  console.error("This review does not have publish: true — skipping.");
  process.exit(0);
}

const paragraphs = extractParagraphs(body);
const stars = extractStars(body);
const spice = extractSpice(body);
const tropes = extractTropes(body);
const qotd = extractQOTD(body);

// Build caption in your exact format
const lines = [];

// Title + author
lines.push(`${meta.title} by ${meta.author}`);
lines.push("");

// Review paragraphs with 🤎 dividers
paragraphs.forEach((para, i) => {
  lines.push(para);
  if (i < paragraphs.length - 1) {
    lines.push("");
    lines.push("🤎");
    lines.push("");
  }
});

lines.push("");
lines.push("🤎");
lines.push("");

// Ratings
lines.push(stars);
lines.push(spice);
lines.push("");

// Tropes
tropes.forEach((t) => lines.push(t));

lines.push("");
lines.push("🤎");
lines.push("");

// QOTD
if (qotd) {
  lines.push(`💭❔QOTD: ${qotd}`);
}

const caption = lines.join("\n");
console.log(caption);
