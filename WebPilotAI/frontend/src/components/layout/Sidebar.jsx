import {
  LayoutDashboard,
  Globe,
  ListChecks,
  Settings,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const menus = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <LayoutDashboard size={20} />,
    },
    {
      name: "Workspace",
      path: "/browser",
      icon: <Globe size={20} />,
    },
    {
      name: "History",
      path: "/tasks",
      icon: <ListChecks size={20} />,
    },
    {
      name: "Settings",
      path: "/settings",
      icon: <Settings size={20} />,
    },
  ];

  return (
    <aside className="w-64 bg-[#0D0D0D] border-r border-[#2A2A2A] flex flex-col">

      <div className="px-8 py-8 border-b border-[#2A2A2A]">

        <h1 className="text-3xl font-bold text-white tracking-wide">
          WebPilot
        </h1>

        <p className="text-[#9F9F9F] text-sm mt-2">
          AI Browser Agent
        </p>

      </div>

      <nav className="flex-1 px-4 py-8 space-y-2">

        {menus.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-4 rounded-xl px-5 py-4 transition-all duration-300 ${
                isActive
                  ? "bg-[#D4AF37] text-black font-semibold"
                  : "text-gray-300 hover:bg-[#1A1A1A] hover:text-white"
              }`
            }
          >
            {item.icon}
            {item.name}
          </NavLink>
        ))}

      </nav>

      <div className="px-6 py-6 border-t border-[#2A2A2A]">

        <p className="text-xs text-gray-500">
          WebPilot AI v1.0
        </p>

      </div>

    </aside>
  );
};

export default Sidebar;