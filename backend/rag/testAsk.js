require("dotenv").config();
const { askQuestion } = require("./ask");

(async () => {
  const answer = await askQuestion("Aaj Ritesh ne 10 rupay liye", 9);

  console.log("ANSWER:\n", answer);
})();
