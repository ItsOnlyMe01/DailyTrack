import { useState } from "react";

export default function CreateWorkspaceModal({ userId, onCreated, onClose }) {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleCreate() {
    if (!name.trim()) {
      alert("Workspace name required");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("http://localhost:3000/workspace/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          name: name.trim(),
        }),
      });

      const ws = await res.json();

      onCreated(ws); // send back to App.jsx
    } catch {
      alert("Failed to create workspace");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 w-80 md:w-96 lg:w-[28rem] shadow-2xl border border-gray-200">
        <h2 className="text-2xl font-bold mb-6">Create new workspace</h2>

        <input
          className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent bg-gray-50 hover:bg-white transition-all"
          placeholder="Workspace name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="text-sm px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all text-gray-700 font-medium"
          >
            Cancel
          </button>

          <button
            onClick={handleCreate}
            disabled={loading}
            className="bg-yellow-600 text-white text-sm px-6 py-2 rounded-lg hover:bg-yellow-700 transition-all hover:shadow-lg active:shadow-md font-semibold disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Creating..." : "Create"}
          </button>
        </div>
      </div>
    </div>
  );
}
