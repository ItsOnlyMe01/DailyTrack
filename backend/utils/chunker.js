function isStructuredText(text) {
  const lines = text
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean);

  if (lines.length === 0) return false;

  // average line length
  const avgLineLength =
    lines.reduce((sum, l) => sum + l.length, 0) / lines.length;

  // heuristic:
  // many short lines → structured (tables, lists, marksheets)
  return lines.length >= 5 && avgLineLength < 80;
}

function lineChunker(text) {
  return text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line.length > 0);
}

function sizeChunker(text, chunkSize = 500, overlap = 100) {
  const chunks = [];
  let start = 0;

  while (start < text.length) {
    const end = start + chunkSize;
    chunks.push(text.slice(start, end));
    start = end - overlap;
  }

  return chunks;
}

function chunkText(text) {
  if (isStructuredText(text)) {
    console.log("🧩 Using LINE-based chunking");
    return lineChunker(text);
  }

  console.log("🧩 Using SIZE-based chunking");
  return sizeChunker(text);
}

module.exports = { chunkText };
