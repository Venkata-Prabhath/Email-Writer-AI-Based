import {
  Globe,
  Lock,
  RefreshCcw,
  ChevronLeft,
  ChevronRight,
  Monitor,
} from "lucide-react";

const BrowserPreview = ({ currentUrl, screenshot }) => {
  return (
    <div className="rounded-3xl border border-[#2A2A2A] bg-[#141414] overflow-hidden">
      <div className="px-6 py-4 border-b border-[#262626] flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-white">
            Live Browser
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Real-time browser session
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
        </div>
      </div>

      <div className="px-5 py-4 border-b border-[#262626] bg-[#101010]">
        <div className="flex items-center gap-3">
          <button className="w-10 h-10 rounded-xl bg-[#1B1B1B] hover:bg-[#232323] flex items-center justify-center transition">
            <ChevronLeft size={18} className="text-gray-400" />
          </button>

          <button className="w-10 h-10 rounded-xl bg-[#1B1B1B] hover:bg-[#232323] flex items-center justify-center transition">
            <ChevronRight size={18} className="text-gray-400" />
          </button>

          <button className="w-10 h-10 rounded-xl bg-[#1B1B1B] hover:bg-[#232323] flex items-center justify-center transition">
            <RefreshCcw size={17} className="text-gray-400" />
          </button>

          <div className="flex-1 rounded-xl bg-[#181818] border border-[#2A2A2A] px-4 py-3 flex items-center gap-3">
            <Lock size={16} className="text-green-400" />

            <span className="text-gray-300 text-sm truncate">
              {currentUrl || "Waiting for navigation..."}
            </span>
          </div>
        </div>
      </div>

      <div className="aspect-video bg-[#0B0B0B] flex items-center justify-center p-6">
        {screenshot ? (
          <img
            src={`data:image/png;base64,${screenshot}`}
            alt="Browser Preview"
            className="w-full h-full rounded-2xl border border-[#2A2A2A] object-cover"
          />
        ) : (
          <div className="text-center">
            <div className="mx-auto w-24 h-24 rounded-3xl bg-[#1B1B1B] flex items-center justify-center">
              <Monitor
                size={42}
                className="text-[#D4AF37]"
              />
            </div>

            <h3 className="text-white text-xl font-semibold mt-6">
              Browser Preview
            </h3>

            <p className="text-gray-500 mt-3 max-w-sm">
              Once a task starts, the live browser screenshot will appear here
              and update automatically.
            </p>
          </div>
        )}
      </div>

      <div className="border-t border-[#262626] px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2 text-gray-400">
          <Globe size={16} />
          <span className="text-sm">
            Chromium
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />

          <span className="text-sm text-gray-400">
            Connected
          </span>
        </div>
      </div>
    </div>
  );
};

export default BrowserPreview;