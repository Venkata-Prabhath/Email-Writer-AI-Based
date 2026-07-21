import {
  Terminal,
  Bot,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

const BrowserConsole = ({ logs = [] }) => {
  return (
    <div className="rounded-3xl border border-[#2A2A2A] bg-[#141414] overflow-hidden h-full flex flex-col">

      <div className="border-b border-[#262626] px-6 py-5 flex items-center justify-between">

        <div className="flex items-center gap-3">

          <div className="w-11 h-11 rounded-2xl bg-[#D4AF37]/10 flex items-center justify-center">

            <Terminal
              size={22}
              className="text-[#D4AF37]"
            />

          </div>

          <div>

            <h2 className="text-xl font-semibold text-white">
              AI Execution
            </h2>

            <p className="text-sm text-gray-500">
              Live reasoning and browser activity
            </p>

          </div>

        </div>

        <div className="px-3 py-1 rounded-full bg-[#0F0F0F] border border-[#2A2A2A] text-xs text-gray-400">
          LIVE
        </div>

      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-5">

        {logs.length === 0 ? (

          <div className="h-full flex flex-col items-center justify-center text-center">

            <div className="w-24 h-24 rounded-3xl bg-[#1B1B1B] flex items-center justify-center">

              <Bot
                size={42}
                className="text-[#D4AF37]"
              />

            </div>

            <h3 className="text-white text-xl font-semibold mt-6">
              Waiting for instructions
            </h3>

            <p className="text-gray-500 mt-3 max-w-sm">
              Browser actions, AI reasoning and execution logs will
              appear here in real time.
            </p>

          </div>

        ) : (

          logs.map((log, index) => (

            <div
              key={index}
              className="flex gap-4"
            >

              <div className="flex flex-col items-center">

                <div className="w-10 h-10 rounded-full bg-[#D4AF37]/10 flex items-center justify-center">

                  <CheckCircle2
                    size={18}
                    className="text-[#D4AF37]"
                  />

                </div>

                {index !== logs.length - 1 && (
                  <div className="w-px flex-1 bg-[#2A2A2A] mt-2" />
                )}

              </div>

              <div className="flex-1 rounded-2xl border border-[#262626] bg-[#101010] p-5">

                <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">

                  <ArrowRight size={14} />

                  <span>
                    Step {index + 1}
                  </span>

                </div>

                <p className="text-gray-200 leading-7 break-words">
                  {log}
                </p>

              </div>

            </div>

          ))

        )}

      </div>

      <div className="border-t border-[#262626] px-6 py-4 flex items-center justify-between">

        <span className="text-sm text-gray-500">
          {logs.length} action{logs.length !== 1 ? "s" : ""} executed
        </span>

        <span className="text-sm text-[#D4AF37]">
          WebPilot AI
        </span>

      </div>

    </div>
  );
};

export default BrowserConsole;