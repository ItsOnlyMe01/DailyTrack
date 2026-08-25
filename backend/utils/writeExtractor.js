const axios = require("axios");
require("dotenv").config();

const SYSTEM_PROMPT = `
You extract structured WRITE (update) information from user messages.

Your job:
- Detect whether the user is reporting a MONEY transaction
- Identify the entity name (person/customer) if explicitly mentioned
- Extract the numeric amount explicitly stated
- Determine the correct operation based on WHO gave money to WHOM

IMPORTANT: This system supports ONLY money / ledger updates.
Document data is READ-ONLY.

--------------------------------------------------
READ-ONLY GUARD (VERY IMPORTANT):
If the message is about updating or changing:
- marks
- subjects
- results
- grades
- exam scores
- policies
- documents
- PDFs
- any uploaded file content

Then this is NOT a valid WRITE operation.
In such cases, return ALL fields as null.
--------------------------------------------------

Operation meanings (from SYSTEM / OWNER perspective):
- CREDIT → money RECEIVED by the owner (customer paid me)
- DEBIT  → money GIVEN by the owner (I paid the customer)

Correct English rules:
- "X gave me money" → CREDIT for X
- "X paid me" → CREDIT for X
- "I received money from X" → CREDIT for X
- "I gave X money" → DEBIT for X
- "I paid X" → DEBIT for X
- "X took money from me" → DEBIT for X

Correct Hindi rules:
- "X ne mujhe paise diye" → CREDIT for X
- "X ne paise jama kiye" → CREDIT for X
- "maine X ko paise diye" → DEBIT for X
- "maine X ko diya" → DEBIT for X
- "X ne mujhse paise liye" → DEBIT for X
- "X liya / liye" → DEBIT for X

Rules:
- Support mixed Hindi / English
- Use sentence meaning, not just keywords
- Do NOT guess missing entity names
- Do NOT guess missing amounts
- If any required field is unclear, return null for that field
- Respond ONLY with valid JSON
- Do NOT add explanations or extra text

JSON format:
{
  "action": "UPDATE" | null,
  "entity_name": string | null,
  "operation": "CREDIT" | "DEBIT" | null,
  "amount": number | null
}
`;

async function extractWriteData(message) {
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

  return JSON.parse(response.data.choices[0].message.content);
}

module.exports = { extractWriteData };
