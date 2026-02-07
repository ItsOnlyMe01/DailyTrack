import { useState } from "react";

export default function WorkspaceSelector({
  workspaces,
  onSelectWorkspace,
  onCreateNew,
}) {
  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
        📚 Select a workspace
      </h2>

      <div className="space-y-3">
        {workspaces.map((ws) => (
          <button
            key={ws.id}
            onClick={() => onSelectWorkspace(ws)}
            className="w-full border border-gray-300 rounded-lg px-5 py-3 text-left hover:bg-gray-100 hover:border-yellow-400 transition-all hover:shadow-md bg-white font-medium text-gray-800"
          >
            {ws.name}
          </button>
        ))}
      </div>

      <button
        className="mt-6 text-sm text-yellow-600 font-semibold hover:text-yellow-700 hover:underline transition-all flex items-center gap-1"
        onClick={onCreateNew}
      >
        ✨ Create new workspace
      </button>
    </div>
  );
}
