const { client } = require("./chroma");
const { embedText } = require("../utils/embedder");

async function searchSimilar(query, workspaceId, topK = 5) {
  const collection = await client.getOrCreateCollection({
    name: "documents",
  });

  const queryEmbedding = await embedText(query);

  const results = await collection.query({
    queryEmbeddings: [queryEmbedding], // ✅ YOU provide embeddings
    nResults: topK,
    where: { workspaceId: String(workspaceId) },
  });

  return results.documents[0] || [];
}

module.exports = { searchSimilar };
