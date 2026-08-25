const axios = require("axios");
require("dotenv").config();

const SYSTEM_PROMPT = `
You extract structured READ query intent.

ONLY classify as structured READ if the question is about:
- milk bill
- ledger
- balance
- amount paid
- payments

Allowed metrics (STRICT):
- balance
- total_bill
- payments_sum

If the question is about:
- marks
- subjects
- results
- students
- exams
- policies
- people
- documents

Then RETURN ALL FIELDS AS NULL.

Rules:
- Do NOT guess
- Do NOT force metric
- Mixed Hindi / English allowed
- Respond ONLY with valid JSON

JSON format:
{
  "entity_name": string | null,
  "metric": "balance" | "total_bill" | "payments_sum" | null,
  "month": "CURRENT" | "PREVIOUS" | "<MonthName>" | null
}
`;

async function extractReadQuery(message) {
  const response = await axios.post(
    "https://api.groq.com/openai/v1/chat/completions",
    {
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
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

  const raw = response.data.choices[0].message.content;

  // strip markdown if present
  const cleaned = raw
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  return JSON.parse(cleaned);
}

module.exports = { extractReadQuery };
