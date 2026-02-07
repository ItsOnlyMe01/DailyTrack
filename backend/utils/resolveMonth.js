function resolveMonth(monthToken) {
  const now = new Date();

  if (monthToken === "CURRENT" || !monthToken) {
    return now.toLocaleString("en-US", { month: "long" });
  }

  if (monthToken === "PREVIOUS") {
    const prev = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    return prev.toLocaleString("en-US", { month: "long" });
  }

  // Explicit month name like "February"
  return monthToken;
}

module.exports = { resolveMonth };
