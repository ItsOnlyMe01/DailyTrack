const { Ollama } = require("ollama");

const ollama = new Ollama({ host: "http://127.0.0.1:11434" });

async function embedText(text) {
  const response = await ollama.embed({
    model: "nomic-embed-text",
    input: text,
  });

  return response.embeddings[0];
}

module.exports = { embedText };
