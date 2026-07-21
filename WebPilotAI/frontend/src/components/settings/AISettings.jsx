import { useState } from "react";
import apiClient from "../../api/apiClient";

const AISettings = () => {
  const [provider, setProvider] = useState("OpenAI");
  const [model, setModel] = useState("gpt-4o-mini");

  const saveAISettings = async () => {
    try {
      await apiClient.post("/settings/ai", { provider, model });
      alert("AI Settings saved!");
    } catch (err) {
      alert("Failed to save settings");
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
      <h2 className="text-xl font-semibold text-white mb-6">AI Settings</h2>
      <div className="space-y-5">
        <select 
          value={provider} onChange={(e) => setProvider(e.target.value)}
          className="w-full bg-slate-800 rounded-xl px-4 py-3 text-white"
        >
          <option>OpenAI</option>
        </select>
        <select 
          value={model} onChange={(e) => setModel(e.target.value)}
          className="w-full bg-slate-800 rounded-xl px-4 py-3 text-white"
        >
          <option>gpt-4o-mini</option>
          <option>gpt-4o</option>
        </select>
        <button 
          onClick={saveAISettings}
          className="bg-blue-600 hover:bg-blue-700 px-5 py-3 rounded-xl text-white"
        >
          Save Settings
        </button>
      </div>
    </div>
  );
};

export default AISettings;