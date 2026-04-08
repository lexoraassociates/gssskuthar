import React from "react";
import { FaGraduationCap, FaCalendarCheck, FaBullhorn } from "react-icons/fa";

export default function StudentHome() {
  const userName = localStorage.getItem("user_name");

  return (
    <div className="space-y-6 animate-fadeSlideIn">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-10 rounded-[3rem] text-white shadow-xl">
        <h2 className="text-3xl font-black mb-2">
          Welcome Back, {userName}! 👋
        </h2>
        <p className="opacity-80 font-medium">
          Have a great day of learning at GSSS Kuthar.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          icon={<FaCalendarCheck />}
          title="Attendance"
          value="92%"
          color="text-green-500"
        />
        <StatCard
          icon={<FaGraduationCap />}
          title="Current Class"
          value="10th (Med)"
          color="text-blue-500"
        />
        <StatCard
          icon={<FaBullhorn />}
          title="Active Notices"
          value="3 New"
          color="text-pink-500"
        />
      </div>
    </div>
  );
}

function StatCard({ icon, title, value, color }) {
  return (
    <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm">
      <div className={`${color} text-2xl mb-4`}>{icon}</div>
      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
        {title}
      </p>
      <p className="text-2xl font-black text-gray-800">{value}</p>
    </div>
  );
}
