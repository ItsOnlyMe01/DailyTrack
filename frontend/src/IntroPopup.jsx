import { useEffect } from "react";

export default function IntroPopup({ onClose }) {
  useEffect(() => {
    // Prevent background scroll
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[70] p-4">
      <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden w-80 md:w-96 lg:w-[28rem]">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🤖</span>
            <div>
              <p className="font-bold text-gray-800 leading-tight">
                DailyTrack
              </p>
              <p className="text-xs text-gray-600">by Ritesh</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl transition-colors"
            aria-label="Close"
          >
            ×
          </button>
        </div>
        <div className="p-6">
          <p className="text-gray-800 text-sm leading-relaxed mb-6">
            Hey, stop! Before you think I'm another GPT — I don't eat the
            internet, I eat your data.
            <br />
            <br />
            Feed me your Excel sheets, kirana records, or milkman logs. I'll
            answer — and even update.
          </p>
          <button
            onClick={onClose}
            className="w-full bg-yellow-600 text-white py-2.5 rounded-lg hover:bg-yellow-700 transition-colors font-medium text-sm"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}
