const express = require("express");
const { getOrCreateUser } = require("../db/users");

const router = express.Router();

router.post("/identify", async (req, res) => {
  const { email } = req.body;

  if (!email || !email.includes("@")) {
    return res.status(400).json({ error: "Invalid email" });
  }

  const user = await getOrCreateUser(email);
  res.json(user);
});

module.exports = router;
