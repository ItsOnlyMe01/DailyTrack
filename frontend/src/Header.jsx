export default function Header() {
  return (
    <div className="fixed top-0 left-0 right-0 z-40 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-3 flex items-center gap-2">
        <span className="text-xl sm:text-2xl">🤖</span>
        <div className="flex flex-col">
          <p className="font-bold text-sm sm:text-base text-gray-800 leading-tight">
            DailyTrack
          </p>
          <p className="text-xs text-gray-500">by Ritesh</p>
        </div>
      </div>
    </div>
  );
}
