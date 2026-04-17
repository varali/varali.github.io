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

function countEmoji(text, emoji) {
  return (text.match(new RegExp(emoji, "g")) || []).length;
}

function extractStars(body) {
  const match = body.match(/[⭐️]+/);
  if (!match) return 0;
  return (match[0].match(/⭐️/g) || []).length;
}

function extractSpice(body) {
  const match = body.match(/^((?:🌶(?:️)?)+|❤️)$/m);
  if (!match) return 0;
  if (match[0] === "❤️") return 0;
  return (match[0].match(/🌶/g) || []).length;
}

function extractTropes(body) {
  const ratingLine = body.search(/[⭐️]+/);
  const qotdLine = body.search(/💭❔QOTD:/);
  if (ratingLine === -1 || qotdLine === -1) return [];

  const between = body.slice(ratingLine, qotdLine);
  return between
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l && !l.match(/[⭐️🌶️🤎]/));
}

function extractQOTD(body) {
  const match = body.match(/💭❔QOTD:\s*(.+)/);
  return match ? match[1].trim() : null;
}

function extractFirstLine(body) {
  const lines = body
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l && !l.match(/^---/) && !l.match(/[🤎⭐️🌶️💭❔]/));
  return lines[0] || "";
}

function extractOptionalQuote(body) {
  const firstDivider = body.indexOf("🤎");
  if (firstDivider === -1) return null;

  const before = body.slice(0, firstDivider).trim();
  const afterDivider = body.slice(firstDivider + 2).trim();
  const nextDivider = afterDivider.indexOf("🤎");

  if (nextDivider === -1) return null;

  const firstSection = afterDivider.slice(0, nextDivider).trim();
  const secondSection = afterDivider.slice(nextDivider + 2).trim();

  const looksLikeQuote =
    before.startsWith('"') ||
    before.startsWith("\u201c") ||
    before.includes(" \u2014 ");

  if (looksLikeQuote) {
    return { quote: before, summary: firstSection, rest: secondSection };
  }

  return { quote: null, summary: before, rest: afterDivider };
}

function extractParagraphs(body) {
  const qotdIdx = body.search(/💭❔QOTD:/);
  const ratingIdx = body.search(/[⭐️]+/);
  const endIdx = ratingIdx !== -1 ? ratingIdx : qotdIdx !== -1 ? qotdIdx : body.length;
  const reviewSection = body.slice(0, endIdx);

  return reviewSection
    .split("🤎")
    .map((p) => p.trim())
    .filter((p) => p.length > 0);
}

export function parseReview(raw) {
  const { meta, body } = parseFrontMatter(raw);
  const stars = extractStars(body);
  const spice = extractSpice(body);
  const tropes = extractTropes(body);
  const qotd = extractQOTD(body);
  const firstLine = extractFirstLine(body);
  const paragraphs = extractParagraphs(body);
  const { quote } = extractOptionalQuote(body) || {};

  return {
    title: meta.title || "",
    author: meta.author || "",
    cover: meta.cover || null,
    date: meta.date || "",
    stars,
    spice,
    tropes,
    qotd,
    firstLine,
    paragraphs,
    quote: quote || null,
    body,
  };
}
