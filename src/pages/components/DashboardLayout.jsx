import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaBars, FaUserCircle } from "react-icons/fa"; // Icons import karein
import Sidebar from "./Sidebar";

export default function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false); // Sidebar control state
  const navigate = useNavigate();
  const token = localStorage.getItem("access_token");
  const userName = localStorage.getItem("user_name");

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  if (!token) return null;

  return (
    <div className="flex bg-gray-100 min-h-screen overflow-hidden">
      {/* Sidebar ko control karne ke liye props bheje hain */}
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="bg-white h-16 px-6 shadow-sm flex justify-between items-center z-40">
          <div className="flex items-center gap-4">
            {/* Hamburger Button - Dashboard ke Header mein */}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-pink-50 hover:text-pink-600 transition-all active:scale-90"
            >
              <FaBars size={20} />
            </button>
            <h1 className="text-lg font-bold text-gray-800 hidden md:block tracking-tight">
              School Admin <span className="text-pink-600">Portal</span>
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                Logged in as
              </p>
              <p className="text-sm font-black text-gray-700">{userName}</p>
            </div>
            <div className="w-10 h-10 bg-gradient-to-tr from-pink-600 to-pink-500 rounded-2xl flex items-center justify-center text-white font-black shadow-lg shadow-pink-200 uppercase transform rotate-3">
              {userName?.charAt(0)}
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="p-4 md:p-8 overflow-y-auto h-[calc(100vh-4rem)]">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>

      {/* Mobile Overlay - Jab Sidebar khula ho */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[55] lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
}
