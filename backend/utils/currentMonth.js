function getCurrentMonth() {
  const date = new Date();
  return date.toLocaleString("en-US", { month: "long" });
}

module.exports = { getCurrentMonth };
