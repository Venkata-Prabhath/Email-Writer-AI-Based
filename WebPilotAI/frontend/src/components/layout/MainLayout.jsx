import Sidebar from "./Sidebar";
import Header from "./Header";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="flex h-screen bg-[#090909] text-white overflow-hidden">

      <Sidebar />

      <div className="flex flex-col flex-1 overflow-hidden">

        <Header />

        <main className="flex-1 overflow-y-auto p-8 bg-[#090909]">

          <div className="max-w-7xl mx-auto">

            <Outlet />

          </div>

        </main>

      </div>

    </div>
  );
};

export default MainLayout;