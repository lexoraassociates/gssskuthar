import React from "react";
import { FaClock, FaSun, FaSnowflake, FaCoffee, FaBell } from "react-icons/fa";

export default function Timings() {
  const summerTimings = [
    {
      period: "Assembly",
      time: "09:00 AM - 09:25 AM",
      icon: <FaBell className="text-yellow-500" />,
    },
    {
      period: "1st - 5th Period",
      time: "09:25 AM - 12:25 PM",
      icon: <FaClock className="text-blue-500" />,
    },
    {
      period: "Recess (Break)",
      time: "12:25 PM - 12:55 PM",
      icon: <FaCoffee className="text-green-500" />,
    },
    {
      period: "5th - 9th Period",
      time: "12:55 PM - 03:00 PM",
      icon: <FaClock className="text-blue-500" />,
    },
  ];

  const winterTimings = [
    {
      period: "Assembly",
      time: "09:00 AM - 09:25 AM",
      icon: <FaBell className="text-blue-400" />,
    },
    {
      period: "1st - 5th Period",
      time: "09:25 AM - 12:25 PM",
      icon: <FaClock className="text-indigo-500" />,
    },
    {
      period: "Recess (Break)",
      time: "12:25 PM - 12:55 PM",
      icon: <FaCoffee className="text-green-500" />,
    },
    {
      period: "5th - 9th Period",
      time: "12:55 PM - 03:00 PM",
      icon: <FaClock className="text-indigo-500" />,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-blue-800 to-indigo-900 pt-32 pb-20 px-6 text-center text-white">
        <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">
          School Timings
        </h1>
        <p className="text-blue-100 text-lg max-w-2xl mx-auto">
          GSSS Kuthar mein anushasan aur samay ki pabandi hamari pehchan hai.
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-10">
        {/* Summer Timings Card */}
        <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-yellow-900/5 border-t-8 border-yellow-400 p-8 hover:scale-[1.02] transition-transform">
          <div className="flex items-center gap-4 mb-8">
            <div className="bg-yellow-100 p-4 rounded-2xl text-yellow-600 text-2xl">
              <FaSun />
            </div>
            <div>
              <h2 className="text-2xl font-black text-gray-800">
                Summer Schedule
              </h2>
              <p className="text-gray-500 text-sm">(April to October)</p>
            </div>
          </div>
          <div className="space-y-6">
            {summerTimings.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100"
              >
                <div className="flex items-center gap-3">
                  {item.icon}
                  <span className="font-bold text-gray-700">{item.period}</span>
                </div>
                <span className="text-blue-700 font-black text-sm">
                  {item.time}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Winter Timings Card */}
        <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-blue-900/5 border-t-8 border-blue-400 p-8 hover:scale-[1.02] transition-transform">
          <div className="flex items-center gap-4 mb-8">
            <div className="bg-blue-100 p-4 rounded-2xl text-blue-600 text-2xl">
              <FaSnowflake />
            </div>
            <div>
              <h2 className="text-2xl font-black text-gray-800">
                Winter Schedule
              </h2>
              <p className="text-gray-500 text-sm">(November to March)</p>
            </div>
          </div>
          <div className="space-y-6">
            {winterTimings.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100"
              >
                <div className="flex items-center gap-3">
                  {item.icon}
                  <span className="font-bold text-gray-700">{item.period}</span>
                </div>
                <span className="text-indigo-700 font-black text-sm">
                  {item.time}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Note Section */}
      <div className="max-w-4xl mx-auto px-6 pb-20 text-center">
        <div className="bg-pink-50 border-2 border-dashed border-pink-200 p-6 rounded-3xl">
          <p className="text-pink-800 font-medium italic">
            * Note: School timings are subject to change as per the orders of
            the Department of Education, Himachal Pradesh.
          </p>
        </div>
      </div>
    </div>
  );
}
