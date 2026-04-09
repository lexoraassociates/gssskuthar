import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  FaChartPie,
  FaUserGraduate,
  FaImages,
  FaBullhorn,
  FaUserCircle,
  FaSignOutAlt,
  FaShieldAlt,
  FaTimes,
  FaUsers,
} from "react-icons/fa";

export default function Sidebar({ isOpen, setIsOpen }) {
  const role = localStorage.getItem("user_role");
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    navigate("/login"); // Ise jodne se cache aur states clear ho jati hain
  };

  const navLinks = [
    {
      to: "/admin-dashboard", // Yeh common rahega sabke liye
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
      to: "/admin/students",
      label: "Students List",
      icon: <FaUsers />,
      roles: ["admin", "superuser", "teacher"],
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
      to: "/profile",
      label: "My Profile",
      icon: <FaUserCircle />,
      roles: ["admin", "superuser", "teacher", "student"], // Sabke liye allow karein
    },
  ];

  return (
    <aside
      className={`fixed lg:relative inset-y-0 left-0 z-[60] bg-gray-900 text-white flex flex-col shadow-2xl transition-all duration-300 ease-in-out
      ${isOpen ? "w-72 translate-x-0" : "w-0 -translate-x-full lg:w-72 lg:translate-x-0"} 
      h-screen overflow-hidden`}
    >
      {/* Sidebar Header */}
      <div className="p-8 flex flex-col items-center border-b border-gray-800/50 min-w-[288px]">
        <img
          src="/logo.png"
          alt="Logo"
          className="h-14 w-auto mb-4 drop-shadow-xl"
        />
        <h2 className="text-xl font-black text-white tracking-tight">
          GSSS कुठाड़
        </h2>
        <div className="mt-2 flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full">
          <FaShieldAlt className="text-pink-500 text-[10px]" />
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
            {role}
          </span>
        </div>
      </div>

      {/* Nav Links */}
      <nav className="flex-1 px-4 py-8 space-y-2 overflow-y-auto min-w-[288px]">
        {navLinks.map(
          (link) =>
            link.roles.includes(role) && (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => window.innerWidth < 1024 && setIsOpen(false)}
                className={`flex items-center gap-4 p-4 rounded-2xl font-bold transition-all ${
                  pathname === link.to
                    ? "bg-pink-600 text-white shadow-lg shadow-pink-600/20"
                    : "text-gray-400 hover:bg-gray-800 hover:text-white"
                }`}
              >
                <span className="text-xl">{link.icon}</span>
                <span className="text-sm">{link.label}</span>
              </Link>
            ),
        )}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-gray-800/50 min-w-[288px]">
        <button
          onClick={handleLogout}
          className="flex items-center justify-center gap-3 w-full bg-red-500/10 text-red-500 p-4 rounded-2xl font-black hover:bg-red-600 hover:text-white transition-all"
        >
          <FaSignOutAlt />
          <span>LOGOUT</span>
        </button>
      </div>
    </aside>
  );
}
