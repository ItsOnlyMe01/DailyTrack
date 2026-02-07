import { useState } from "react";

export default function FileUpload({ workspaceId, onSuccess }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleUpload() {
    if (!file) {
      alert("Please select a PDF");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("workspaceId", workspaceId);

    setLoading(true);

    try {
      const res = await fetch("http://localhost:3000/documents/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        onSuccess();
      } else {
        alert(data.error || "Upload failed");
      }
    } catch (err) {
      alert("Upload error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="border border-gray-300 rounded-xl p-5 mt-4 bg-gradient-to-br from-gray-50 to-white shadow-sm hover:shadow-md transition-shadow">
      <h3 className="font-bold mb-4 text-gray-800 flex items-center gap-2">
        📄 Upload a PDF
      </h3>

      <input
        type="file"
        accept="application/pdf"
        onChange={(e) => setFile(e.target.files[0])}
        className="hidden"
        id="file-upload"
      />

      <div className="flex gap-3 flex-wrap">
        <label
          htmlFor="file-upload"
          className="bg-yellow-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-yellow-700 cursor-pointer inline-block transition-all hover:shadow-md active:shadow-sm font-semibold"
        >
          Choose File
        </label>

        <button
          onClick={handleUpload}
          disabled={loading}
          className="bg-yellow-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-yellow-700 transition-all hover:shadow-md active:shadow-sm font-semibold disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? "Indexing..." : "Upload"}
        </button>
      </div>

      <p className="text-xs text-gray-500 mt-3">
        💡 File is used once for indexing and then discarded.
      </p>
    </div>
  );
}
