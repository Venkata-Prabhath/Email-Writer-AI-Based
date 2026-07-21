import {
  Globe,
  Lock,
  ArrowLeft,
  ArrowRight,
  RefreshCcw,
  House,
} from "lucide-react";

const BrowserToolbar = ({
  currentUrl,
  onNavigate,
  onRefresh,
  onBack,
  onForward,
  onHome,
}) => {
  return (
    <div className="border-b border-[#262626] bg-[#101010] px-5 py-4">

      <div className="flex items-center gap-3">

        <button
          onClick={onBack}
          className="w-10 h-10 rounded-xl bg-[#1A1A1A] hover:bg-[#232323] transition flex items-center justify-center"
        >
          <ArrowLeft size={18} className="text-gray-400" />
        </button>

        <button
          onClick={onForward}
          className="w-10 h-10 rounded-xl bg-[#1A1A1A] hover:bg-[#232323] transition flex items-center justify-center"
        >
          <ArrowRight size={18} className="text-gray-400" />
        </button>

        <button
          onClick={onRefresh}
          className="w-10 h-10 rounded-xl bg-[#1A1A1A] hover:bg-[#232323] transition flex items-center justify-center"
        >
          <RefreshCcw size={17} className="text-gray-400" />
        </button>

        <button
          onClick={onHome}
          className="w-10 h-10 rounded-xl bg-[#1A1A1A] hover:bg-[#232323] transition flex items-center justify-center"
        >
          <House size={18} className="text-gray-400" />
        </button>

        <div className="flex-1 flex items-center gap-3 rounded-xl bg-[#181818] border border-[#2A2A2A] px-4 py-3">

          <Lock
            size={16}
            className="text-green-400"
          />

          <Globe
            size={16}
            className="text-gray-500"
          />

          <input
            value={currentUrl}
            onChange={(e) => onNavigate(e.target.value)}
            placeholder="https://..."
            className="flex-1 bg-transparent outline-none text-sm text-white placeholder:text-gray-500"
          />

        </div>

      </div>

    </div>
  );
};

export default BrowserToolbar;