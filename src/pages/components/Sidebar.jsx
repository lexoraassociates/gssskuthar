import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  FaChartPie,
  FaUserGraduate,
  FaImages,
  FaBullhorn,
  FaUserCircle,
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaShieldAlt,
} from "react-icons/fa";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const role = localStorage.getItem("user_role");
  const navigate = useNavigate();
  const { pathname } = useLocation();

  // Mobile par route change hote hi sidebar band ho jaye
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const navLinks = [
    {
      to: "/admin-dashboard",
      label: "Dashboard",
      icon: <FaChartPie />,
      roles: ["admin", "superuser", "teacher", "student"],
    },
    {
      to: "/admin/admissions",
      label: "Admissions",
      icon: <FaUserGraduate />,
      roles: ["admin", "superuser"],
    },
    {
      to: "/management/gallery",
      label: "Gallery",
      icon: <FaImages />,
      roles: ["admin", "superuser", "teacher"],
    },
    {
      to: "/management/notifications",
      label: "Notices",
      icon: <FaBullhorn />,
      roles: ["admin", "superuser", "teacher"],
    },
    {
      to: "/student-profile",
      label: "My Profile",
      icon: <FaUserCircle />,
      roles: ["student"],
    },
  ];

  return (
    <>
      {/* --- MOBILE TOP BAR (App-like Header) --- */}
      <div className="lg:hidden flex items-center justify-between bg-gray-900 text-white p-4 sticky top-0 z-[60] shadow-lg">
        <div className="flex items-center gap-2">
          <img src="/logo.png" alt="Logo" className="h-8 w-auto" />
          <span className="font-bold text-pink-500 text-sm">GSSS Admin</span>
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 bg-gray-800 rounded-lg text-pink-500 active:scale-90 transition-all"
        >
          {isOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
        </button>
      </div>

      {/* --- SIDEBAR DRAWER --- */}
      <div
        className={`fixed lg:static inset-y-0 left-0 z-[70] w-72 bg-gray-900 text-white flex flex-col shadow-2xl transition-transform duration-300 transform 
        ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >
        {/* Sidebar Header */}
        <div className="p-8 flex flex-col items-center border-b border-gray-800">
          <div className="relative mb-4">
            <img
              src="/logo.png"
              alt="Logo"
              className="h-16 w-auto drop-shadow-[0_0_10px_rgba(236,72,153,0.3)]"
            />
          </div>
          <h2 className="text-xl font-black text-white tracking-tight">
            GSSS कुठाड़
          </h2>
          <div className="mt-2 flex items-center gap-2 px-3 py-1 bg-pink-500/10 border border-pink-500/20 rounded-full">
            <FaShieldAlt className="text-pink-500 text-xs" />
            <span className="text-[10px] font-bold text-pink-400 uppercase tracking-widest">
              {role}
            </span>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto custom-scrollbar">
          {navLinks.map(
            (link) =>
              link.roles.includes(role) && (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`flex items-center gap-4 p-4 rounded-2xl font-bold transition-all group ${
                    pathname === link.to
                      ? "bg-pink-600 text-white shadow-lg shadow-pink-600/20"
                      : "text-gray-400 hover:bg-gray-800 hover:text-pink-400"
                  }`}
                >
                  <span
                    className={`text-xl transition-transform group-hover:scale-110 ${pathname === link.to ? "text-white" : "text-gray-500"}`}
                  >
                    {link.icon}
                  </span>
                  <span className="tracking-wide text-sm">{link.label}</span>
                </Link>
              ),
          )}
        </nav>

        {/* Logout Button */}
        <div className="p-4 border-t border-gray-800">
          <button
            onClick={handleLogout}
            className="flex items-center justify-center gap-3 w-full bg-red-600/10 border border-red-600/20 hover:bg-red-600 text-red-500 hover:text-white p-4 rounded-2xl font-black transition-all active:scale-95 group"
          >
            <FaSignOutAlt className="group-hover:-translate-x-1 transition-transform" />
            <span>LOGOUT</span>
          </button>
        </div>
      </div>

      {/* --- OVERLAY (Mobile only) --- */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[65] lg:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #374151; border-radius: 10px; }
      `}</style>
    </>
  );
}
