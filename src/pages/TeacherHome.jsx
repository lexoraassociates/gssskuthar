import React, { useState, useEffect } from "react";
import {
  FaUserFriends,
  FaClipboardCheck,
  FaChalkboardTeacher,
  FaBell,
  FaArrowRight,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { fetchWithAuth } from "../api"; // Path check kar lein

export default function TeacherHome() {
  const userName = localStorage.getItem("user_name") || "Teacher";
  const [stats, setStats] = useState({
    totalStudents: 0,
    todayAttendance: "95%",
    pendingNotices: 0,
  });

  useEffect(() => {
    // Yahan aap dashboard stats fetch karne ka logic laga sakte hain
    // Filhal hum isse UI ke liye static rakhte hain
  }, []);

  return (
    <div className="space-y-8 animate-fadeSlideIn">
      {/* --- WELCOME SECTION --- */}
      <div className="bg-gradient-to-br from-indigo-600 to-blue-500 rounded-[3rem] p-8 md:p-12 text-white shadow-xl shadow-blue-100 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl"></div>
        <div className="relative z-10">
          <h2 className="text-3xl md:text-4xl font-black mb-2">
            Namaste, {userName}! 📚
          </h2>
          <p className="text-blue-100 font-medium max-w-md">
            Your classroom management tools are ready. Check today's schedule
            and student progress.
          </p>
        </div>
      </div>

      {/* --- QUICK STATS --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <TeacherStatCard
          icon={<FaUserFriends />}
          title="My Students"
          value="45"
          color="bg-blue-50 text-blue-600"
        />
        <TeacherStatCard
          icon={<FaClipboardCheck />}
          title="Attendance"
          value="95%"
          color="bg-green-50 text-green-600"
        />
        <TeacherStatCard
          icon={<FaBell />}
          title="Recent Notices"
          value="2 New"
          color="bg-pink-50 text-pink-600"
        />
      </div>

      {/* --- QUICK ACTIONS SECTION --- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Action 1: Student Management */}
        <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-md transition-all">
          <div className="flex items-start justify-between">
            <div className="space-y-4">
              <div className="w-14 h-14 bg-blue-600 text-white rounded-2xl flex items-center justify-center text-2xl">
                <FaChalkboardTeacher />
              </div>
              <h3 className="text-xl font-black text-gray-800">
                Class Directory
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                View student profiles, manage roll numbers, and update student
                information.
              </p>
              <Link
                to="/admin/students"
                className="inline-flex items-center gap-2 text-blue-600 font-bold text-sm hover:gap-3 transition-all"
              >
                Go to Students <FaArrowRight />
              </Link>
            </div>
          </div>
        </div>

        {/* Action 2: Gallery & Media */}
        <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-md transition-all">
          <div className="flex items-start justify-between">
            <div className="space-y-4">
              <div className="w-14 h-14 bg-pink-600 text-white rounded-2xl flex items-center justify-center text-2xl">
                <FaBell />
              </div>
              <h3 className="text-xl font-black text-gray-800">
                Broadcast Notice
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Update the school notice board for students and parents
                regarding events.
              </p>
              <Link
                to="/management/notifications"
                className="inline-flex items-center gap-2 text-pink-600 font-bold text-sm hover:gap-3 transition-all"
              >
                Manage Notices <FaArrowRight />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Sub-component for Stats
function TeacherStatCard({ icon, title, value, color }) {
  return (
    <div className="bg-white p-6 rounded-[2rem] border border-gray-100 flex items-center gap-5">
      <div
        className={`w-16 h-16 rounded-2xl flex items-center justify-center text-2xl ${color}`}
      >
        {icon}
      </div>
      <div>
        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
          {title}
        </p>
        <p className="text-2xl font-black text-gray-800">{value}</p>
      </div>
    </div>
  );
}
