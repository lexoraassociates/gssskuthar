import { Link, useNavigate } from "react-router-dom";

export default function Sidebar() {
  const role = localStorage.getItem("user_role");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="w-64 min-h-screen bg-gray-900 text-white flex flex-col p-4 shadow-xl">
      <div className="text-2xl font-bold text-pink-500 mb-8 px-2 border-b border-gray-700 pb-4">
        GSSS Kuthar Admin
      </div>

      <nav className="flex-1 space-y-2">
        {/* Sab ke liye Common */}
        <Link
          to="/admin-dashboard"
          className="block p-3 hover:bg-gray-800 rounded-lg transition-colors"
        >
          📊 Dashboard Overview
        </Link>

        {/* Sirf Admin ke liye - Admission Approval */}
        {(role === "admin" || role === "superuser") && (
          <Link
            to="/admin/admissions"
            className="block p-3 hover:bg-gray-800 rounded-lg transition-colors"
          >
            📝 Pending Admissions
          </Link>
        )}

        {/* Admin aur Teacher dono ke liye - Gallery & Notices */}
        {(role === "admin" || role === "superuser" || role === "teacher") && (
          <>
            <Link
              to="/management/gallery"
              className="block p-3 hover:bg-gray-800 rounded-lg transition-colors"
            >
              🖼️ Update Gallery
            </Link>
            <Link
              to="/management/notifications"
              className="block p-3 hover:bg-gray-800 rounded-lg transition-colors"
            >
              📢 Manage Notifications
            </Link>
          </>
        )}

        {/* Student ke liye (Sirf check karne ke liye) */}
        {role === "student" && (
          <Link
            to="/student-profile"
            className="block p-3 hover:bg-gray-800 rounded-lg transition-colors"
          >
            🎓 My Profile
          </Link>
        )}
      </nav>

      <button
        onClick={handleLogout}
        className="mt-auto w-full bg-red-600 hover:bg-red-700 p-3 rounded-lg font-bold transition-all"
      >
        🚪 Logout
      </button>
    </div>
  );
}
