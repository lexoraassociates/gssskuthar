import React from "react";
import {
  FaUserEdit,
  FaEnvelope,
  FaIdCard,
  FaUserTag,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaPhoneAlt,
} from "react-icons/fa";

export default function MyProfile() {
  // Local storage se data fetch karein
  const userName = localStorage.getItem("user_name") || "User";
  const userRole = localStorage.getItem("user_role") || "Staff";
  const userImage = localStorage.getItem("user_image");

  const profileData = [
    {
      label: "Full Name",
      value: userName,
      icon: <FaUserTag />,
      color: "text-blue-600",
    },
    {
      label: "Email Address",
      value: "pravesh@gssskuthar.online",
      icon: <FaEnvelope />,
      color: "text-pink-600",
    },
    {
      label: "Designation",
      value: userRole,
      icon: <FaIdCard />,
      color: "text-purple-600",
    },
    {
      label: "Phone Number",
      value: "+91 98XXX-XXXXX",
      icon: <FaPhoneAlt />,
      color: "text-green-600",
    },
    {
      label: "Location",
      value: "Kuthar, Solan (H.P.)",
      icon: <FaMapMarkerAlt />,
      color: "text-red-600",
    },
    {
      label: "Joined Date",
      value: "March 2026",
      icon: <FaCalendarAlt />,
      color: "text-orange-600",
    },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-fadeSlideIn">
      {/* --- PROFILE HEADER --- */}
      <div className="relative bg-white rounded-[3rem] p-8 md:p-12 shadow-sm border border-gray-100 overflow-hidden">
        {/* Background Decorative Circles */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-pink-50 rounded-full -mr-32 -mt-32 opacity-50"></div>
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-blue-50 rounded-full -ml-20 -mb-20 opacity-50"></div>

        <div className="relative flex flex-col md:flex-row items-center gap-8">
          {/* Avatar Section */}
          <div className="relative group">
            <div className="w-32 h-32 md:w-40 md:h-40 bg-gradient-to-tr from-pink-600 to-pink-400 rounded-[2.5rem] flex items-center justify-center text-white text-5xl font-black shadow-2xl shadow-pink-200 overflow-hidden transform rotate-3 group-hover:rotate-0 transition-transform duration-500">
              {userImage ? (
                <img
                  src={userImage}
                  alt={userName}
                  className="w-full h-full object-cover"
                />
              ) : (
                userName?.charAt(0).toUpperCase()
              )}
            </div>
            <button className="absolute -bottom-2 -right-2 bg-white p-3 rounded-2xl shadow-xl text-pink-600 hover:bg-pink-600 hover:text-white transition-all active:scale-90 border border-pink-100">
              <FaUserEdit size={18} />
            </button>
          </div>

          {/* Name & Role Section */}
          <div className="text-center md:text-left space-y-2">
            <h2 className="text-3xl md:text-4xl font-black text-gray-800 tracking-tight">
              {userName}
            </h2>
            <div className="flex flex-wrap justify-center md:justify-start gap-3">
              <span className="px-4 py-1.5 bg-pink-100 text-pink-600 text-xs font-black uppercase tracking-widest rounded-full">
                {userRole}
              </span>
              <span className="px-4 py-1.5 bg-blue-100 text-blue-600 text-xs font-black uppercase tracking-widest rounded-full">
                Official Staff
              </span>
            </div>
            <p className="text-gray-400 font-medium text-sm pt-2 italic">
              "Dedicated to Excellence in Education at GSSS Kuthar."
            </p>
          </div>
        </div>
      </div>

      {/* --- INFORMATION CARDS GRID --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {profileData.map((item, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
          >
            <div className="flex items-center gap-4">
              <div
                className={`w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-xl ${item.color} group-hover:scale-110 transition-transform`}
              >
                {item.icon}
              </div>
              <div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">
                  {item.label}
                </p>
                <p className="text-sm font-bold text-gray-700">{item.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* --- ACCOUNT STATUS BANNER --- */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-[2.5rem] p-8 text-white flex flex-col md:flex-row justify-between items-center gap-6 shadow-2xl">
        <div>
          <h3 className="text-xl font-bold mb-1 text-pink-400">
            Account Security
          </h3>
          <p className="text-gray-400 text-sm">
            Your account is protected with end-to-end encryption.
          </p>
        </div>
        <button className="px-8 py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-2xl font-bold text-sm transition-all active:scale-95">
          Privacy Settings
        </button>
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
