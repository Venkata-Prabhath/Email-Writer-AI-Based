import { useState } from "react";
import { Sparkles, ArrowRight } from "lucide-react";

const suggestions = [
  "Find cheapest OnePlus 13 under ₹55,000",
  "Compare MacBook Air prices",
  "Book a flight from Chennai to Delhi",
  "Search internships for Java Developer",
];

const BrowserControls = ({ onExecute, loading }) => {
  const [prompt, setPrompt] = useState("");

  const runTask = () => {
    if (!prompt.trim() || loading) return;
    onExecute(prompt);
  };

  return (
    <div className="rounded-3xl border border-[#2A2A2A] bg-[#141414] p-8">

      <div className="flex items-center gap-3 mb-6">

        <div className="w-12 h-12 rounded-2xl bg-[#D4AF37]/10 flex items-center justify-center">

          <Sparkles
            size={22}
            className="text-[#D4AF37]"
          />

        </div>

        <div>

          <h2 className="text-white text-2xl font-bold">
            Ask WebPilot
          </h2>

          <p className="text-gray-500">
            Describe the task in natural language.
          </p>

        </div>

      </div>

      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Example: Find the cheapest iPhone 16 Pro under ₹90,000 and compare Amazon, Flipkart and Croma."
        rows={5}
        className="w-full rounded-2xl bg-[#0E0E0E] border border-[#2A2A2A] focus:border-[#D4AF37] outline-none resize-none text-white px-5 py-4 text-[15px] transition"
      />

      <div className="flex flex-wrap gap-3 mt-5">

        {suggestions.map((item) => (

          <button
            key={item}
            onClick={() => setPrompt(item)}
            className="px-4 py-2 rounded-full border border-[#2A2A2A] bg-[#181818] hover:border-[#D4AF37] hover:text-[#D4AF37] text-gray-300 transition"
          >
            {item}
          </button>

        ))}

      </div>

      <div className="flex justify-end mt-8">

        <button
          onClick={runTask}
          disabled={loading}
          className="flex items-center gap-3 bg-[#D4AF37] hover:bg-[#E7C85A] disabled:opacity-60 text-black font-semibold rounded-xl px-8 py-4 transition"
        >

          {loading ? "Running..." : "Execute Task"}

          <ArrowRight size={20} />

        </button>

      </div>

    </div>
  );
};

export default BrowserControls;