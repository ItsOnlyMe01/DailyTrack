const pool = require("../db/pool");
const { embedText } = require("../utils/embedder");

async function searchSimilar(query, workspaceId, topK = 5) {
  const queryEmbedding = await embedText(query);
  const embeddingStr = `[${queryEmbedding.join(",")}]`;

  const res = await pool.query(
    "SELECT content FROM document_chunks WHERE workspace_id = $1 ORDER BY embedding <=> $2 LIMIT $3",
    [workspaceId, embeddingStr, topK],
  );

  return res.rows.map((row) => row.content);
}

module.exports = { searchSimilar };

