import { useState } from "react";
import { LogOut, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const UserMenu = () => {
  const [open, setOpen] = useState(false);

  const { logoutUser } = useAuth();

  const navigate = useNavigate();

  const logout = () => {
    logoutUser();
    navigate("/");
  };

  return (
    <div className="relative">

      <button
        onClick={() => setOpen(!open)}
        className="w-11 h-11 rounded-full bg-[#D4AF37] text-black font-bold flex items-center justify-center hover:scale-105 transition"
      >
        U
      </button>

      {open && (
        <div className="absolute right-0 mt-3 w-56 rounded-2xl bg-[#171717] border border-[#2A2A2A] shadow-2xl overflow-hidden">

          <div className="px-5 py-4 border-b border-[#2A2A2A]">

            <h2 className="text-white font-semibold">
              Account
            </h2>

          </div>

          <button
            onClick={() => {
              navigate("/settings");
              setOpen(false);
            }}
            className="w-full flex items-center gap-3 px-5 py-4 hover:bg-[#202020] text-gray-300 transition"
          >
            <Settings size={18} />
            Settings
          </button>

          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-5 py-4 hover:bg-red-600 text-gray-300 hover:text-white transition"
          >
            <LogOut size={18} />
            Logout
          </button>

        </div>
      )}
    </div>
  );
};

export default UserMenu;