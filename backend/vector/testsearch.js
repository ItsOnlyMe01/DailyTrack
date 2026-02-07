const { searchSimilar } = require("./search");

(async () => {
  const results = await searchSimilar("What is the milk bill?", 9);

  console.log(results);
})();
