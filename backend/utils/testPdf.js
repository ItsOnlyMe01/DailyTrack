const { extractTextFromPDF } = require("./pdfExtractor");
const { chunkText } = require("./chunker");

(async () => {
  const text = await extractTextFromPDF("uploads/1769862051597-copyright.pdf");
  const chunks = chunkText(text);

  console.log("Total chunks:", chunks.length);
  console.log("First chunk preview:\n", chunks[0].slice(0, 200));
})();
