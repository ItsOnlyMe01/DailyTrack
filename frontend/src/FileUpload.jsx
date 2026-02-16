import { useState } from "react";
const API_BASE = import.meta.env.VITE_API_BASE_URL;

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
      const res = await fetch(`${API_BASE}/documents/upload`, {
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

      {!file ? (
        <div className="flex gap-3 flex-wrap">
          <label
            htmlFor="file-upload"
            className="bg-yellow-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-yellow-700 cursor-pointer inline-block transition-all hover:shadow-md active:shadow-sm font-semibold"
          >
            Choose File
          </label>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center gap-3 bg-blue-50 border border-blue-200 rounded-lg p-3">
            <span className="text-lg">✓</span>
            <div className="flex-1">
              <p className="text-sm text-gray-700 font-semibold">
                File Selected
              </p>
              <p className="text-xs text-gray-600 truncate">{file.name}</p>
            </div>
          </div>

          <div className="flex gap-3 flex-wrap">
            <button
              onClick={() => setFile(null)}
              className="bg-gray-400 text-white px-4 py-2 rounded-lg text-sm hover:bg-gray-500 transition-all hover:shadow-md active:shadow-sm font-semibold"
            >
              Choose Different File
            </button>

            <button
              onClick={handleUpload}
              disabled={loading}
              className="bg-green-600 text-white px-6 py-2 rounded-lg text-sm hover:bg-green-700 transition-all hover:shadow-lg active:shadow-sm font-semibold shadow-md hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Uploading..." : "Upload"}
            </button>
          </div>
        </div>
      )}

      <p className="text-xs text-gray-500 mt-3">
        💡 File is used once for indexing and then discarded.
      </p>
    </div>
  );
}
