const express = require("express");
const cors = require("cors");
require("dotenv").config();
const userRoutes = require("./routes/user");
const workspaceRoutes = require("./routes/workSpace");
const contextRoutes = require("./routes/context");
const documentRoutes = require("./routes/documents");
const askRoutes = require("./routes/ask");

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  }),
);

app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/ask", askRoutes);
app.use("/user", userRoutes);
app.use("/workspace", workspaceRoutes);
app.use("/context", contextRoutes);
app.use("/documents", documentRoutes);

if (!process.env.VERCEL) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log("Server running on port no ", PORT);
  });
}

module.exports = app;

