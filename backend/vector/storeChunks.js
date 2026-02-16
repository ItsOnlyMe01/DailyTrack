const { client } = require("./chroma");

async function storeChunks(chunks, workspaceId, documentId) {
  const collection = await client.getOrCreateCollection({
    name: "documents",
  });

  for (let i = 0; i < chunks.length; i++) {
    await collection.add({
      ids: [`${documentId}_${i}`],
      documents: [chunks[i]],
      metadatas: [{ workspaceId: String(workspaceId) }],
    });
  }
}

module.exports = { storeChunks };
