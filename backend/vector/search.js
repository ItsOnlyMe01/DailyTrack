const { client } = require("./chroma");

async function searchSimilar(query, workspaceId, topK = 5) {
  const collection = await client.getOrCreateCollection({
    name: "documents",
  });

  const results = await collection.query({
    queryTexts: [query], // Chroma embeds query automatically
    nResults: topK,
    where: { workspaceId: String(workspaceId) },
  });

  return results.documents[0] || [];
}

module.exports = { searchSimilar };
