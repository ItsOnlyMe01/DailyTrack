const { client } = require("./chroma");

async function storeChunks(chunks, workspaceId, documentId) {
  const collection = await client.getOrCreateCollection({
    name: "documents", // uses default embedding function
  });

  for (let i = 0; i < chunks.length; i++) {
    await collection.add({
      ids: [`${documentId}_${i}`],
      documents: [chunks[i]], // Chroma will embed automatically
      metadatas: [{ workspaceId: String(workspaceId) }],
    });
  }
}

module.exports = { storeChunks };
