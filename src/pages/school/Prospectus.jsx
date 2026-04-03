import { Link } from "react-router-dom";
import React from "react";
import {
  FaFileDownload,
  FaBookOpen,
  FaCheckCircle,
  FaAward,
  FaUsers,
  FaLaptopCode,
} from "react-icons/fa";

export default function Prospectus() {
  const highlights = [
    {
      title: "Quality Education",
      desc: "Well-qualified staff (TGT/PGT) for all subjects.",
      icon: <FaAward className="text-yellow-500" />,
    },
    {
      title: "Digital Learning",
      desc: "Modern Computer Labs and Smart Classroom facilities.",
      icon: <FaLaptopCode className="text-blue-500" />,
    },
    {
      title: "Co-Curricular",
      desc: "Sports, Quiz, and Cultural events for overall growth.",
      icon: <FaUsers className="text-green-500" />,
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header Section */}
      <div className="bg-gradient-to-br from-pink-800 to-indigo-900 pt-32 pb-24 px-6 text-center text-white">
        <div className="inline-block p-3 bg-white/10 rounded-2xl mb-6 backdrop-blur-sm">
          <FaBookOpen className="text-4xl text-pink-300" />
        </div>
        <h1 className="text-4xl md:text-6xl font-black mb-4 tracking-tighter">
          School Prospectus
        </h1>
        <p className="text-pink-100 text-lg max-w-2xl mx-auto font-medium">
          GSSS Kuthar (Solan) ke naye shaikshik satra (Academic Session) ki puri
          jankari yahan se prapt karein.
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-6 -mt-12">
        {/* Main Content Area */}
        <div className="bg-white rounded-[3rem] shadow-2xl border border-gray-100 p-8 md:p-16">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Left side: Download Card */}
            <div className="space-y-8">
              <h2 className="text-3xl font-black text-gray-800 leading-tight">
                Admission Guidelines & <br />{" "}
                <span className="text-pink-600">School Rules</span>
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Hamara prospectus aapko school ke vision, subjects, staff
                details aur admission process ke bare mein vistar se batata hai.
                Ise download karke dhyan se padhein.
              </p>

              <div className="space-y-4">
                <div className="flex items-center gap-3 text-gray-700 font-semibold">
                  <FaCheckCircle className="text-green-500" /> Latest Session
                  2026-27
                </div>
                <div className="flex items-center gap-3 text-gray-700 font-semibold">
                  <FaCheckCircle className="text-green-500" /> Fee Structure &
                  Documents
                </div>
              </div>

              {/* DOWNLOAD BUTTON */}
              <a
                href="/prospectus.pdf"
                target="_blank"
                className="inline-flex items-center gap-4 bg-pink-600 hover:bg-pink-700 text-white px-8 py-5 rounded-2xl font-black text-lg transition-all hover:shadow-xl hover:-translate-y-1 active:scale-95 group"
              >
                <FaFileDownload className="text-2xl group-hover:animate-bounce" />
                Download Prospectus (PDF)
              </a>
            </div>

            {/* Right side: Highlights Grid */}
            <div className="grid gap-6">
              {highlights.map((item, index) => (
                <div
                  key={index}
                  className="bg-gray-50 p-6 rounded-3xl border border-gray-100 flex items-start gap-5 hover:bg-white hover:shadow-lg transition-all group"
                >
                  <div className="p-4 bg-white rounded-2xl shadow-sm group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="font-black text-gray-800 text-lg">
                      {item.title}
                    </h4>
                    <p className="text-gray-500 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Admission Note */}
        <div className="my-20 text-center bg-blue-50 rounded-[2.5rem] p-10 border-2 border-dashed border-blue-200">
          <h3 className="text-2xl font-black text-blue-900 mb-4 tracking-tight">
            Direct Admissions Open!
          </h3>
          <p className="text-blue-700 mb-8 max-w-xl mx-auto font-medium">
            Agar aapne prospectus padh liya hai aur apply karna chahte hain, toh
            hamare Online Admission Portal ka upyog karein.
          </p>
          <Link
            to="/apply-now"
            className="inline-block bg-blue-600 text-white px-10 py-4 rounded-xl font-bold hover:bg-blue-700 hover:shadow-lg transition-all transform active:scale-95"
          >
            Apply Now
          </Link>
        </div>
      </div>
    </div>
  );
}
