const { client } = require("./chroma");

(async () => {
  const collection = await client.getOrCreateCollection({
    name: "documents",
    embeddingFunction: null,
  });

  const count = await collection.count();
  console.log("Total vectors in collection:", count);
})();
