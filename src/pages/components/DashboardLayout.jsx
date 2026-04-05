import { useEffect, useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  FaBars,
  FaUserCircle,
  FaSignOutAlt,
  FaCog,
  FaThLarge,
  FaChevronDown,
  FaUserCog,
} from "react-icons/fa";
import Sidebar from "./Sidebar";

export default function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false); // Dropdown state
  const dropdownRef = useRef(null); // Click outside detection ke liye

  const navigate = useNavigate();
  const token = localStorage.getItem("access_token");
  const userName = localStorage.getItem("user_name") || "User";
  const userRole = localStorage.getItem("user_role");
  const userImage = localStorage.getItem("user_image"); // Agar backend se image aa rahi ho

  // 1. Sidebar/Dropdown band karne ke liye logic jab route badle
  useEffect(() => {
    setDropdownOpen(false);
  }, [navigate]);

  // 2. Click Outside Logic: Agar menu ke bahar click ho toh band ho jaye
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  if (!token) return null;

  return (
    <div className="flex bg-gray-50 min-h-screen overflow-hidden">
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      <div className="flex-1 flex flex-col min-w-0">
        {/* --- TOP HEADER --- */}
        <header className="bg-white h-20 px-4 md:px-8 shadow-sm flex justify-between items-center z-40 border-b border-gray-100">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-pink-50 hover:text-pink-600 transition-all active:scale-90"
            >
              <FaBars size={20} />
            </button>
            <div className="hidden sm:block">
              <h1 className="text-lg font-black text-gray-800 tracking-tight leading-none">
                GSSS{" "}
                <span className="text-pink-600 font-extrabold uppercase">
                  Kuthar
                </span>
              </h1>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">
                Admin Management Portal
              </p>
            </div>
          </div>

          {/* --- USER PROFILE DROPDOWN --- */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-3 p-1.5 pr-4 rounded-2xl hover:bg-gray-50 transition-all border border-transparent hover:border-gray-100 active:scale-95"
            >
              {/* User Avatar Logic */}
              <div className="w-10 h-10 bg-gradient-to-tr from-pink-600 to-pink-500 rounded-xl flex items-center justify-center text-white font-black shadow-lg shadow-pink-200 overflow-hidden transform rotate-2 group-hover:rotate-0 transition-transform">
                {userImage ? (
                  <img
                    src={userImage}
                    alt={userName}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-lg">
                    {userName?.charAt(0).toUpperCase()}
                  </span>
                )}
              </div>

              <div className="hidden md:block text-left">
                <p className="text-xs font-black text-gray-800 leading-none">
                  {userName}
                </p>
                <p className="text-[10px] font-bold text-pink-500 uppercase tracking-tighter mt-1">
                  {userRole}
                </p>
              </div>
              <FaChevronDown
                className={`text-gray-400 text-[10px] transition-transform duration-300 ${dropdownOpen ? "rotate-180" : ""}`}
              />
            </button>

            {/* Dropdown Menu Box */}
            {dropdownOpen && (
              <div className="absolute right-0 mt-3 w-64 bg-white rounded-[2rem] shadow-2xl border border-gray-100 py-4 z-50 animate-fadeSlideIn">
                <div className="px-6 py-4 border-b border-gray-50 mb-2">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                    Personal Account
                  </p>
                  <p className="text-sm font-black text-gray-800 truncate">
                    {userName}
                  </p>
                </div>

                <div className="px-2 space-y-1">
                  <Link
                    to="/admin-dashboard"
                    className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-pink-50 hover:text-pink-600 rounded-xl transition-colors font-bold text-sm group"
                  >
                    <FaThLarge className="text-gray-400 group-hover:text-pink-500" />{" "}
                    Dashboard
                  </Link>

                  <Link
                    to="/student-profile"
                    className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-pink-50 hover:text-pink-600 rounded-xl transition-colors font-bold text-sm group"
                  >
                    <FaUserCog className="text-gray-400 group-hover:text-pink-500" />{" "}
                    My Profile
                  </Link>

                  <Link
                    to="/settings"
                    className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-pink-50 hover:text-pink-600 rounded-xl transition-colors font-bold text-sm group border-b border-gray-50 pb-4"
                  >
                    <FaCog className="text-gray-400 group-hover:text-pink-500" />{" "}
                    Account Settings
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 w-full px-4 py-4 text-red-500 hover:bg-red-50 rounded-xl transition-colors font-black text-sm group mt-2"
                  >
                    <FaSignOutAlt className="group-hover:-translate-x-1 transition-transform" />{" "}
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </header>

        {/* --- MAIN CONTENT --- */}
        <main className="p-4 md:p-8 overflow-y-auto h-[calc(100vh-5rem)] custom-scrollbar">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>

      <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeSlideIn { animation: fadeSlideIn 0.2s ease-out forwards; }
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #e5e7eb; border-radius: 10px; }
      `}</style>
    </div>
  );
}
