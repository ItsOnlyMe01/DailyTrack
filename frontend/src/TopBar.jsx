export default function TopBar({
  activeWorkspace,
  workspaces,
  onChangeWorkspace,
  onBack,
}) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3 bg-gradient-to-r from-white to-gray-50 p-4 rounded-xl border border-gray-200 shadow-sm">
      <div className="flex items-center gap-3">
        <button
          onClick={onBack}
          className="text-gray-600 hover:text-gray-800 transition-colors text-lg font-medium"
          title="Back to workspace selection"
        >
          ← Back
        </button>
        <h2 className="text-xl font-bold text-yellow-600">
          📁 {activeWorkspace.name}
        </h2>
      </div>

      <select
        value={activeWorkspace.id}
        onChange={(e) => {
          const ws = workspaces.find((w) => w.id === Number(e.target.value));
          onChangeWorkspace(ws);
        }}
        className="border border-gray-300 rounded-lg px-4 py-2 text-sm w-full sm:w-auto bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
      >
        {workspaces.map((w) => (
          <option key={w.id} value={w.id}>
            {w.name}
          </option>
        ))}
      </select>
    </div>
  );
}
