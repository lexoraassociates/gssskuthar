import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchWithAuth } from "../api"; // Path check kar lena agar file src mein hai

export default function AdminHome() {
  const navigate = useNavigate();
  const userName = localStorage.getItem("user_name");
  const [stats, setStats] = useState({
    pending_admissions: 0,
    approved_admissions: 0,
    total_photos: 0,
    recent_notices: 0,
    total_notices_year: 0,
  });
  const [loading, setLoading] = useState(true);

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

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Welcome Header */}
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-pink-100 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Welcome, <span className="text-pink-600">{userName}</span>! 👋
          </h1>
          <p className="text-gray-500 mt-2">
            GSSS Kuthar Management Portal: Overview of current school
            activities.
          </p>
        </div>
        <div className="text-right hidden md:block">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">
            Active Session
          </span>
          <p className="text-lg font-black text-pink-600">
            {new Date().getFullYear()}-{new Date().getFullYear() + 1}
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Admissions Card */}
        <div
          onClick={() => navigate("/admin/admissions")}
          className="bg-white p-6 rounded-2xl shadow-sm border-l-4 border-blue-500 cursor-pointer hover:scale-[1.02] transition-transform group"
        >
          <p className="text-xs text-gray-400 font-bold uppercase">
            Admissions {new Date().getFullYear()}
          </p>
          <h3 className="text-4xl font-black text-gray-800 mt-2">
            {loading ? "..." : stats.pending_admissions}
          </h3>
          <div className="flex justify-between items-center mt-4">
            <span className="text-sm text-blue-600 font-bold group-hover:underline">
              Pending Approval
            </span>
            <span className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-md font-bold">
              {stats.approved_admissions} Approved
            </span>
          </div>
        </div>

        {/* Gallery Card */}
        <div
          onClick={() => navigate("/management/gallery")}
          className="bg-white p-6 rounded-2xl shadow-sm border-l-4 border-green-500 cursor-pointer hover:scale-[1.02] transition-transform group"
        >
          <p className="text-xs text-gray-400 font-bold uppercase">
            Total Media
          </p>
          <h3 className="text-4xl font-black text-gray-800 mt-2">
            {loading ? "..." : stats.total_photos}
          </h3>
          <p className="text-sm text-green-600 font-bold mt-4 group-hover:underline">
            📸 Manage Gallery Photos
          </p>
        </div>

        {/* Notifications Card */}
        <div
          onClick={() => navigate("/management/notifications")}
          className="bg-white p-6 rounded-2xl shadow-sm border-l-4 border-purple-500 cursor-pointer hover:scale-[1.02] transition-transform group"
        >
          <p className="text-xs text-gray-400 font-bold uppercase">
            Active Notices
          </p>
          <h3 className="text-4xl font-black text-gray-800 mt-2">
            {loading ? "..." : stats.recent_notices}
          </h3>
          <div className="flex justify-between items-center mt-4">
            <span className="text-sm text-purple-600 font-bold group-hover:underline">
              Last 10 Days
            </span>
            <span className="text-xs bg-purple-50 text-purple-700 px-2 py-1 rounded-md font-bold">
              {stats.total_notices_year} Total (Y)
            </span>
          </div>
        </div>
      </div>

      {/* Quick Actions Footer */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div
          className="bg-blue-600 p-6 rounded-2xl text-white shadow-lg shadow-blue-200 cursor-pointer"
          onClick={() => navigate("/admin/admissions")}
        >
          <h4 className="font-bold text-lg">Review Admissions</h4>
          <p className="text-blue-100 text-sm">
            Check and approve new student applications.
          </p>
        </div>
        <div
          className="bg-purple-600 p-6 rounded-2xl text-white shadow-lg shadow-purple-200 cursor-pointer"
          onClick={() => navigate("/management/notifications")}
        >
          <h4 className="font-bold text-lg">Update Notice Board</h4>
          <p className="text-purple-100 text-sm">
            Publish new circulars for students & parents.
          </p>
        </div>
      </div>
    </div>
  );
}
