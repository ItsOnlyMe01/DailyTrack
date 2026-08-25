const pool = require("../db/pool");
const { embedText } = require("../utils/embedder");

async function storeChunks(chunks, workspaceId, documentId) {
  for (let i = 0; i < chunks.length; i++) {
    const embedding = await embedText(chunks[i]);
    const embeddingStr = `[${embedding.join(",")}]`;

    await pool.query(
      "INSERT INTO document_chunks (document_id, workspace_id, content, embedding) VALUES ($1, $2, $3, $4)",
      [documentId, workspaceId, chunks[i], embeddingStr],
    );
  }
}

module.exports = { storeChunks };

