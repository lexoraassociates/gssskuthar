import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  FaUsers,
  FaBullhorn,
  FaImages,
  FaUserCheck,
  FaArrowRight,
  FaHourglassHalf,
  FaCalendarCheck,
} from "react-icons/fa";
// Aapka purana helper function
import { fetchWithAuth } from "../api";

export default function AdminHome() {
  const navigate = useNavigate();
  const userName = localStorage.getItem("user_name") || "Admin";

  const [stats, setStats] = useState({
    pending_admissions: 0,
    approved_admissions: 0,
    total_photos: 0,
    recent_notices: 0,
    total_notices_year: 0,
  });
  const [loading, setLoading] = useState(true);

  // --- AAPKA SAHI DATA FETCH LOGIC ---
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetchWithAuth(
          "https://test9.online/api/management/stats/",
        );
        if (res && res.ok) {
          const data = await res.json();
          setStats(data);
        }
      } catch (err) {
        console.error("Stats fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  // Design ke liye cards array
  const statCards = [
    {
      title: "New Admissions",
      value: stats.pending_admissions,
      label: "Pending Review",
      icon: <FaHourglassHalf />,
      color: "from-orange-600 to-orange-400",
      link: "/admin/admissions",
    },
    {
      title: "Total Approved",
      value: stats.approved_admissions,
      label: `Session ${new Date().getFullYear()}`,
      icon: <FaUsers />,
      color: "from-blue-600 to-blue-400",
      link: "/admin/admissions",
    },
    {
      title: "Recent Notices",
      value: stats.recent_notices,
      label: "Last 10 Days",
      icon: <FaBullhorn />,
      color: "from-pink-600 to-pink-400",
      link: "/management/notifications",
    },
    {
      title: "Gallery Photos",
      value: stats.total_photos,
      label: "Total Uploads",
      icon: <FaImages />,
      color: "from-purple-600 to-purple-400",
      link: "/management/gallery",
    },
  ];

  return (
    <div className="space-y-10 animate-fadeSlideIn">
      {/* --- WELCOME BANNER --- */}
      <div className="relative bg-gray-900 rounded-[3rem] p-8 md:p-12 overflow-hidden shadow-2xl shadow-gray-200">
        <div className="absolute top-0 right-0 w-64 h-64 bg-pink-500/10 rounded-full -mr-20 -mt-20 blur-3xl"></div>
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">
              Welcome, <span className="text-pink-500">{userName}!</span>
            </h2>
            <p className="text-gray-400 font-medium mt-2">
              Management portal is live. Overview of GSSS Kuthar activities.
            </p>
          </div>
          <button
            onClick={() => navigate("/management/notifications")}
            className="px-8 py-4 bg-white text-gray-900 rounded-2xl font-black text-sm hover:bg-pink-500 hover:text-white transition-all active:scale-95 flex items-center gap-2"
          >
            Create Notice <FaArrowRight />
          </button>
        </div>
      </div>

      {/* --- STATS GRID --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, index) => (
          <div
            key={index}
            onClick={() => navigate(card.link)}
            className="group cursor-pointer"
          >
            <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 relative overflow-hidden h-full">
              <div
                className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${card.color} text-white flex items-center justify-center text-2xl mb-6 shadow-lg`}
              >
                {card.icon}
              </div>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">
                {card.title}
              </p>
              <h3 className="text-3xl font-black text-gray-800">
                {loading ? "..." : card.value}
              </h3>
              <p className="text-[10px] font-bold text-gray-400 mt-2 italic">
                {card.label}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* --- QUICK TOOLS --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-[3rem] p-10 border border-gray-100 shadow-sm">
          <h3 className="text-xl font-black text-gray-800 mb-6">
            Quick Management Tools
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div
              onClick={() => navigate("/admin/admissions")}
              className="p-6 bg-blue-50 rounded-3xl border border-blue-100 hover:bg-blue-100 cursor-pointer transition-colors"
            >
              <p className="font-black text-blue-700 text-sm">
                Review Admissions
              </p>
              <p className="text-xs text-blue-500 mt-1">
                Manage new student applications
              </p>
            </div>
            <div
              onClick={() => navigate("/management/notifications")}
              className="p-6 bg-pink-50 rounded-3xl border border-pink-100 hover:bg-pink-100 cursor-pointer transition-colors"
            >
              <p className="font-black text-pink-700 text-sm">
                Update Notice Board
              </p>
              <p className="text-xs text-pink-500 mt-1">
                Broadcast news to everyone
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-[3rem] p-8 border border-gray-100 shadow-sm flex flex-col justify-center items-center text-center">
          <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-2xl mb-4">
            <FaCalendarCheck />
          </div>
          <h4 className="font-black text-gray-800">Total Notifications (Y)</h4>
          <p className="text-4xl font-black text-green-600 mt-2">
            {stats.total_notices_year}
          </p>
          <p className="text-[10px] text-gray-400 uppercase font-bold mt-2">
            Overall this year
          </p>
        </div>
      </div>

      <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeSlideIn { animation: fadeSlideIn 0.5s ease-out forwards; }
      `}</style>
    </div>
  );
}
