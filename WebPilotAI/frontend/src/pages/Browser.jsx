import { useEffect, useState } from "react";
import BrowserControls from "../components/browser/BrowserControls";
import BrowserStatus from "../components/browser/BrowserStatus";
import BrowserPreview from "../components/browser/BrowserPreview";
import BrowserConsole from "../components/browser/BrowserConsole";
import {
  connectWebSocket,
  disconnectWebSocket,
} from "../api/wsClient";
import apiClient from "../api/apiClient";

const Browser = () => {
  const [status, setStatus] = useState("Idle");
  const [currentUrl, setCurrentUrl] = useState("");
  const [logs, setLogs] = useState([]);
  const [screenshot, setScreenshot] = useState(null);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    return () => {
      disconnectWebSocket();
    };
  }, []);

  const executeTask = async (prompt) => {
    if (!prompt.trim()) return;

    try {
      setRunning(true);
      setLogs([]);
      setStatus("Running");
      setCurrentUrl("");
      setScreenshot(null);

      const response = await apiClient.post("/tasks", {
        prompt,
      });

      const taskId = response.data.id;

      connectWebSocket(taskId, (message) => {
        if (message.message) {
          setLogs((prev) => [...prev, message.message]);
        }

        if (message.url) {
          setCurrentUrl(message.url);
        }

        if (message.screenshot) {
          setScreenshot(message.screenshot);
        }

        if (message.status) {
          const formatted =
            message.status.charAt(0) +
            message.status.slice(1).toLowerCase();

          setStatus(formatted);

          if (
            message.status === "COMPLETED" ||
            message.status === "FAILED"
          ) {
            setRunning(false);
          }
        }
      });
    } catch (error) {
      console.error("Task execution failed:", error);

      if (error.response) {
        console.error(error.response.data);
      }

      setStatus("Failed");
      setRunning(false);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-white">
          AI Workspace
        </h1>

        <p className="text-gray-400 mt-3">
          Tell WebPilot what you want to automate.
        </p>
      </div>

      <BrowserControls
        loading={running}
        onExecute={executeTask}
      />

      <BrowserStatus status={status} />

      <div className="grid xl:grid-cols-2 gap-8">
        <BrowserPreview
          currentUrl={currentUrl}
          screenshot={screenshot}
        />

        <BrowserConsole logs={logs} />
      </div>
    </div>
  );
};

export default Browser;