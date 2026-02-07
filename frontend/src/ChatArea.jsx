import { useRef, useEffect } from "react";

export default function ChatArea({
  messages,
  loading,
  input,
  setInput,
  onSend,
}) {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (input.trim()) {
      onSend();
    }
  };

  return (
    <>
      {/* Chat */}
      <div className="border border-gray-300 rounded-xl flex-1 overflow-y-auto p-4 flex flex-col gap-3 mt-4 bg-white shadow-sm hover:shadow-md transition-shadow">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`max-w-[80%] p-3 rounded-lg text-sm message-enter ${
              msg.role === "user"
                ? "self-end bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-md rounded-tl-none"
                : "self-start bg-gray-100 border border-gray-300 rounded-bl-none"
            }`}
          >
            <pre className="whitespace-pre-wrap font-sans">
              {typeof msg.content === "string"
                ? msg.content
                : JSON.stringify(msg.content, null, 2)}
            </pre>
          </div>
        ))}
        {loading && <p className="text-xs text-gray-400 italic">Thinking...</p>}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="flex gap-3 mt-4">
        <textarea
          className="flex-1 border-2 border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-0 focus:border-yellow-500 bg-white hover:bg-gray-50 transition-all resize-none"
          placeholder="Type your message... (Shift+Enter for new line)"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
          rows={2}
        />
        <button
          onClick={handleSend}
          className="bg-yellow-600 text-white px-6 py-3 rounded-lg hover:bg-yellow-700 transition-all hover:shadow-lg active:shadow-md font-semibold"
        >
          Send
        </button>
      </div>
    </>
  );
}
