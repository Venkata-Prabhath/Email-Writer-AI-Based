import {
  Activity,
  CheckCircle2,
  Loader2,
  AlertTriangle,
  Clock3,
} from "lucide-react";

const BrowserStatus = ({ status = "Idle" }) => {

  const config = {
    Idle: {
      icon: <Clock3 size={22} />,
      color: "text-yellow-400",
      bg: "bg-yellow-500/10",
      border: "border-yellow-500/20",
      title: "Waiting",
      desc: "Ready to execute a new task.",
    },

    Running: {
      icon: <Loader2 size={22} className="animate-spin" />,
      color: "text-[#D4AF37]",
      bg: "bg-[#D4AF37]/10",
      border: "border-[#D4AF37]/20",
      title: "Executing",
      desc: "WebPilot is browsing and collecting information.",
    },

    Completed: {
      icon: <CheckCircle2 size={22} />,
      color: "text-green-400",
      bg: "bg-green-500/10",
      border: "border-green-500/20",
      title: "Completed",
      desc: "Task finished successfully.",
    },

    Failed: {
      icon: <AlertTriangle size={22} />,
      color: "text-red-400",
      bg: "bg-red-500/10",
      border: "border-red-500/20",
      title: "Failed",
      desc: "Execution stopped due to an error.",
    },
  };

  const current = config[status] || config.Idle;

  return (
    <div className="rounded-3xl border border-[#2A2A2A] bg-[#141414] p-6">

      <div className="flex items-center justify-between">

        <div className="flex items-center gap-4">

          <div
            className={`w-14 h-14 rounded-2xl flex items-center justify-center ${current.bg} ${current.border} border`}
          >
            <div className={current.color}>
              {current.icon}
            </div>
          </div>

          <div>

            <h2 className="text-xl font-semibold text-white">
              {current.title}
            </h2>

            <p className="text-gray-500 mt-1">
              {current.desc}
            </p>

          </div>

        </div>

        <div className="flex items-center gap-3 rounded-full border border-[#2A2A2A] bg-[#101010] px-4 py-2">

          <Activity
            size={18}
            className={current.color}
          />

          <span className={`font-medium ${current.color}`}>
            {status}
          </span>

        </div>

      </div>

      {status === "Running" && (

        <div className="mt-6">

          <div className="w-full h-2 rounded-full bg-[#202020] overflow-hidden">

            <div className="h-full w-1/3 rounded-full bg-[#D4AF37] animate-pulse" />

          </div>

          <p className="text-xs text-gray-500 mt-3">
            AI Agent is executing browser actions...
          </p>

        </div>

      )}

    </div>
  );
};

export default BrowserStatus;