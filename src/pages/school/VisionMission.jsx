import React from "react";
import { FaEye, FaRocket, FaCheckCircle } from "react-icons/fa";

export default function VisionMission() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-blue-800 pt-32 pb-20 px-6 text-center text-white">
        <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">
          Vision & Mission
        </h1>
        <p className="text-blue-100 text-lg">
          Hamara Lakshya - Har Bacche ka Sunhera Bhavishya.
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-10">
        {/* Vision */}
        <div className="bg-white p-10 rounded-[2.5rem] shadow-xl shadow-blue-900/5 border border-blue-50 relative overflow-hidden group hover:-translate-y-2 transition-all duration-300">
          <div className="absolute -top-10 -right-10 text-[150px] text-blue-50 group-hover:text-blue-100 transition-colors opacity-50">
            <FaEye />
          </div>
          <div className="relative z-10">
            <h2 className="text-3xl font-black text-blue-900 mb-6 uppercase tracking-tighter">
              Our Vision
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed italic">
              "GSSS Kuthar ka vision ek aisa vatavaran taiyar karna hai jahan
              har student apni puri kshamta (potential) ko pehchan sake aur
              samaj ke liye ek zimmedar nagrik ban sake."
            </p>
          </div>
        </div>

        {/* Mission */}
        <div className="bg-white p-10 rounded-[2.5rem] shadow-xl shadow-pink-900/5 border border-pink-50 relative overflow-hidden group hover:-translate-y-2 transition-all duration-300">
          <div className="absolute -top-10 -right-10 text-[150px] text-pink-50 group-hover:text-pink-100 transition-colors opacity-50">
            <FaRocket />
          </div>
          <div className="relative z-10">
            <h2 className="text-3xl font-black text-pink-900 mb-6 uppercase tracking-tighter">
              Our Mission
            </h2>
            <ul className="space-y-4 text-gray-600">
              <li className="flex items-start gap-3">
                <FaCheckCircle className="text-pink-600 mt-1" />
                <span>
                  Uchh-stariya shiksha aur anushasan ko har bacche tak
                  pahunchana.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <FaCheckCircle className="text-pink-600 mt-1" />
                <span>
                  Sports aur Cultural activities ke zariye personality
                  development.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <FaCheckCircle className="text-pink-600 mt-1" />
                <span>
                  Digital literacy aur modern labs ke zariye bhavishya ke liye
                  taiyar karna.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
