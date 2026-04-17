#!/usr/bin/env node

// Posts a review to Instagram via the Meta Graph API
// Usage: node scripts/post-to-instagram.js src/data/reviews/my-review.md
//
// Required environment variables:
//   IG_USER_ID      — your Instagram user ID (numeric)
//   IG_ACCESS_TOKEN — your long-lived Meta access token

import { readFileSync } from "fs";
import { resolve, basename } from "path";

const filePath = process.argv[2];
if (!filePath) {
  console.error("Usage: node scripts/post-to-instagram.js <path-to-review.md>");
  process.exit(1);
}

const IG_USER_ID = process.env.IG_USER_ID;
const IG_ACCESS_TOKEN = process.env.IG_ACCESS_TOKEN;
const SITE_URL = process.env.SITE_URL || "https://varali.github.io";

if (!IG_USER_ID || !IG_ACCESS_TOKEN) {
  console.error("Missing IG_USER_ID or IG_ACCESS_TOKEN environment variables.");
  process.exit(1);
}

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
  return match ? match[0] : "";
}

function extractSpice(body) {
  const match = body.match(/^((?:🌶(?:️)?)+|❤️)$/m);
  if (!match) return "";
  return match[0];
}

function extractTropes(body) {
  const ratingIdx = body.search(/[⭐️]+/);
  const qotdIdx = body.search(/💭❔QOTD:/);
  if (ratingIdx === -1 || qotdIdx === -1) return [];
  return body
    .slice(ratingIdx, qotdIdx)
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

function buildCaption(meta, body) {
  const paragraphs = extractParagraphs(body);
  const stars = extractStars(body);
  const spice = extractSpice(body);
  const tropes = extractTropes(body);
  const qotd = extractQOTD(body);

  const lines = [];

  lines.push(`${meta.title} by ${meta.author}`);
  lines.push("");

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
  lines.push(stars);
  lines.push(spice);
  lines.push("");

  tropes.forEach((t) => lines.push(t));

  lines.push("");
  lines.push("🤎");
  lines.push("");

  if (qotd) lines.push(`💭❔QOTD: ${qotd}`);

  return lines.join("\n");
}

async function post() {
  const raw = readFileSync(resolve(filePath), "utf-8");
  const { meta, body } = parseFrontMatter(raw);

  if (meta.publish !== "true") {
    console.log("publish: true not set — skipping.");
    process.exit(0);
  }

  if (!meta.cover) {
    console.error("No cover image found in front matter.");
    process.exit(1);
  }

  // Cover image must be a publicly accessible URL
  const imageUrl = `${SITE_URL}${meta.cover}`;
  const caption = buildCaption(meta, body);

  console.log(`Posting: ${meta.title} by ${meta.author}`);
  console.log(`Image: ${imageUrl}`);

  // Step 1 — create media container
  const containerRes = await fetch(
    `https://graph.instagram.com/v21.0/${IG_USER_ID}/media`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        image_url: imageUrl,
        caption,
        access_token: IG_ACCESS_TOKEN,
      }),
    }
  );

  const container = await containerRes.json();
  if (!container.id) {
    console.error("Failed to create media container:", container);
    process.exit(1);
  }

  console.log(`Media container created: ${container.id}`);

  // Step 2 — wait for container to be ready
  await new Promise((r) => setTimeout(r, 5000));

  // Step 3 — publish the container
  const publishRes = await fetch(
    `https://graph.instagram.com/v21.0/${IG_USER_ID}/media_publish`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        creation_id: container.id,
        access_token: IG_ACCESS_TOKEN,
      }),
    }
  );

  const result = await publishRes.json();
  if (!result.id) {
    console.error("Failed to publish post:", result);
    process.exit(1);
  }

  console.log(`Successfully posted! Instagram post ID: ${result.id}`);
}

post().catch((err) => {
  console.error("Unexpected error:", err);
  process.exit(1);
});
