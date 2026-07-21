import { Bell, Search } from "lucide-react";
import UserMenu from "../common/UserMenu";

const Header = () => {
  return (
    <header className="h-20 border-b border-[#2A2A2A] bg-[#090909] flex items-center justify-between px-10">

      <div className="relative w-[420px]">

        <Search
          size={18}
          className="absolute left-4 top-4 text-gray-500"
        />

        <input
          placeholder="Search tasks..."
          className="w-full bg-[#151515] border border-[#2A2A2A] rounded-xl py-3 pl-11 pr-4 text-white outline-none focus:border-[#D4AF37] transition"
        />

      </div>

      <div className="flex items-center gap-6">

        <button className="text-gray-400 hover:text-[#D4AF37] transition">

          <Bell size={22} />

        </button>

        <UserMenu />

      </div>

    </header>
  );
};

export default Header;