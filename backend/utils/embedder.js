const axios = require("axios");

const GROQ_API_KEY = process.env.GROQ_API_KEY;

async function embedText(text) {
  const res = await axios.post(
    "https://api.groq.com/openai/v1/embeddings",
    {
      model: "nomic-embed-text",
      input: text,
    },
    {
      headers: {
        Authorization: `Bearer ${GROQ_API_KEY}`,
        "Content-Type": "application/json",
      },
    },
  );

  return res.data.data[0].embedding;
}

module.exports = { embedText };
