const express = require("express");
const {
  getActiveWorkSpace,
  setActiveWorkSpace,
} = require("../context/activeWorkSpace");

const router = express.Router();

router.post("/set-workspace", (req, res) => {
  const { workspaceId } = req.body;

  if (!workspaceId) {
    return res.status(400).json({ error: "workspaceId required" });
  }

  setActiveWorkSpace(workspaceId);
  res.json({ activeWorkSpaceId: getActiveWorkSpace() });
});

module.exports = router;
