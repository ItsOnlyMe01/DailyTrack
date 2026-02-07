const express = require("express");
const { getOrCreateWorkspace, getWorkspaces } = require("../db/workspaces");

const router = express.Router();

router.post("/create", async (req, res) => {
  const { userId, name } = req.body;

  if (!userId || !name) {
    return res.status(400).json({ error: "userId and name are required" });
  }

  const ws = await getOrCreateWorkspace(userId, name);
  res.json(ws);
});

router.get("/list/:userId", async (req, res) => {
  const { userId } = req.params;
  const list = await getWorkspaces(userId);
  res.json(list);
});

module.exports = router;
