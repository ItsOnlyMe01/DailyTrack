const axios = require("axios");
require("dotenv").config();

const INTENT_SYSTEM_PROMPT = `
You are an intent classifier.

Classify the user message into one of two intents:
- READ: user is asking for information
- WRITE: user is providing information to update records

Rules:
- Questions → READ
- Statements about payments, amounts, actions → WRITE
- Mixed Hindi/English is common
- Respond ONLY in valid JSON
- Do NOT explain anything

JSON format:
{
  "intent": "READ" | "WRITE",
  "confidence": number between 0 and 1
}
`;

async function detectIntent(message) {
  const response = await axios.post(
    "https://api.groq.com/openai/v1/chat/completions",
    {
      model: "openai/gpt-oss-20b",
      messages: [
        { role: "system", content: INTENT_SYSTEM_PROMPT },
        { role: "user", content: message },
      ],
      temperature: 0,
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        "Content-Type": "application/json",
      },
    },
  );

  return JSON.parse(response.data.choices[0].message.content);
}

module.exports = { detectIntent };
