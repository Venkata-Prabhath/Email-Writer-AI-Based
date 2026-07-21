import { Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

const DashboardHero = () => {

    const navigate = useNavigate();

    return (

        <div className="rounded-3xl overflow-hidden border border-[#2A2A2A] bg-gradient-to-r from-[#111111] to-[#1A1A1A]">

            <div className="p-10">

                <div className="inline-flex items-center gap-2 bg-[#D4AF37]/10 border border-[#D4AF37]/20 rounded-full px-4 py-2">

                    <Sparkles
                        size={18}
                        className="text-[#D4AF37]"
                    />

                    <span className="text-[#D4AF37]">

                        AI Browser Agent

                    </span>

                </div>

                <h1 className="text-5xl font-bold text-white mt-8">

                    What should WebPilot do today?

                </h1>

                <p className="text-gray-400 mt-5 text-lg max-w-3xl">

                    Automate websites, compare products, search the web,
                    fill forms, and execute browser tasks using AI.

                </p>

                <button

                    onClick={() => navigate("/browser")}

                    className="mt-10 bg-[#D4AF37] hover:bg-[#E5C158] text-black rounded-xl px-8 py-4 font-semibold transition"

                >

                    Start New Task →

                </button>

            </div>

        </div>

    );

};

export default DashboardHero;