const express = require("express");
require("dotenv").config();
const { askQuestion } = require("../rag/ask");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { question, workspaceId } = req.body;

    if (!question || !workspaceId) {
      return res.status(400).json({
        error: "question and workspaceId are required",
      });
    }

    const answer = await askQuestion(question, workspaceId);
    res.json(answer);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
