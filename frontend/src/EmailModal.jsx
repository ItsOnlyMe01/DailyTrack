import { useState } from "react";

export default function EmailModal({ onSubmit }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    if (!email.includes("@")) {
      alert("Enter a valid email");
      return;
    }

    setLoading(true);
    await onSubmit(email);
    setLoading(false);
  }

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 w-80 md:w-96 lg:w-[28rem] shadow-2xl border border-gray-200">
        <h2 className="text-2xl font-bold mb-2 text-center">Welcome 👋</h2>
        <p className="text-sm text-gray-600 text-center mb-6">
          Enter your email to continue
        </p>

        <input
          className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent bg-gray-50 hover:bg-white transition-all"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button
          onClick={handleSubmit}
          className="w-full mt-6 bg-yellow-600 text-white py-3 rounded-lg hover:bg-yellow-700 text-sm font-semibold transition-all hover:shadow-lg active:shadow-md"
        >
          {loading ? "Please wait..." : "Continue"}
        </button>
      </div>
    </div>
  );
}
