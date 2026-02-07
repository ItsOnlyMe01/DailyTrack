const { client } = require("./chroma");
const { embedText } = require("../utils/embedder");

async function storeChunks(chunks, workspaceId, documentId) {
  const collection = await client.getOrCreateCollection({
    name: "documents",
    embeddingFunction: null,
  });

  for (let i = 0; i < chunks.length; i++) {
    const embedding = await embedText(chunks[i]);

    await collection.add({
      ids: [`${documentId}_${i}`],
      documents: [chunks[i]],
      embeddings: [embedding],
      metadatas: [{ workspaceId: String(workspaceId) }],
    });
  }
}

module.exports = { storeChunks };
