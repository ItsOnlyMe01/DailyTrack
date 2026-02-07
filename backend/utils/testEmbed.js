const { embedText } = require("./embedder");

(async () => {
  const vector = await embedText("Milk bill for Ritesh is 1200 rupees");
  console.log("Vector length:", vector.length);
})();
