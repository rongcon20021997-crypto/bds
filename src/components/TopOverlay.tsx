import { Search, User } from 'lucide-react';

interface TopOverlayProps {
  onSearchClick: () => void;
}

export default function TopOverlay({ onSearchClick }: TopOverlayProps) {
  return (
    <div className="absolute top-0 left-0 right-0 z-10 pt-12 px-4 pointer-events-none">
      {/* Search Bar */}
      <div className="flex items-center gap-3 mb-4 pointer-events-auto">
        <div
          className="flex-1 flex items-center bg-white border border-gray-200 rounded-2xl px-4 py-3 text-gray-800 cursor-text shadow-md"
          onClick={onSearchClick}
        >
          <Search className="w-5 h-5 text-gray-400 mr-3" />
          <span className="text-gray-400 text-sm flex-1 truncate">Tên Quận (Huyện) hoặc Tỉnh.</span>
        </div>
        <button className="w-12 h-12 rounded-2xl bg-white border border-gray-200 flex items-center justify-center text-gray-600 shrink-0 shadow-md">
          <User className="w-6 h-6" />
        </button>
      </div>

    </div>
  );
}
