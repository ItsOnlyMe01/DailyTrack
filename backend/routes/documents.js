const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const os = require("os");

const pool = require("../db/pool");
const { extractTextFromPDF } = require("../utils/pdfExtractor");
const { chunkText } = require("../utils/chunker");
const { storeChunks } = require("../vector/storeChunks");

const router = express.Router();

const storage = multer.diskStorage({
  destination: os.tmpdir(),
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});


const upload = multer({ storage });

router.post("/upload", upload.single("file"), async (req, res) => {
  const { workspaceId } = req.body;
  const file = req.file;

  if (!workspaceId || !file) {
    return res.status(400).json({ error: "workspaceId and file required" });
  }

  try {
    //  Save document metadata
    const docRes = await pool.query(
      "INSERT INTO documents (workspace_id, file_name, file_path) VALUES ($1, $2, $3) RETURNING id",
      [workspaceId, file.originalname, file.path],
    );

    const documentId = docRes.rows[0].id;

    //  Extract text
    const text = await extractTextFromPDF(file.path);

    //  Chunk text
    const chunks = chunkText(text);

    //  Store embeddings in Chroma
    await storeChunks(chunks, workspaceId, documentId);

    //  DELETE file (one-time upload policy)
    fs.unlinkSync(file.path);

    return res.json({ message: "File indexed successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to process document" });
  }
});

module.exports = router;
