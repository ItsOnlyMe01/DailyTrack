const axios = require("axios");
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

async function embedText(text) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-embedding-001:embedContent?key=${GEMINI_API_KEY}`;
  const res = await axios.post(url, {
    model: "models/gemini-embedding-001",
    content: {
      parts: [{ text }],
    },
  });
  return res.data.embedding.values;
}

module.exports = { embedText };
