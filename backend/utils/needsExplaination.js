function needsExplanation(text) {
  const keywords = [
    "why",
    "kyun",
    "policy",
    "explain",
    "according",
    "rule",
    "reason",
  ];
  const q = text.toLowerCase();
  return keywords.some((k) => q.includes(k));
}

module.exports = { needsExplanation };
