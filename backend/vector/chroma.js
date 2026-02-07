const { ChromaClient } = require("chromadb");

const client = new ChromaClient({
  host: "localhost",
  port: 8000,
});

module.exports = { client };
