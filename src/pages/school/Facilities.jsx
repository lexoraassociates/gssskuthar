import React, { useState } from "react";
import {
  FaLaptopCode,
  FaMicroscope,
  FaBookReader,
  FaRunning,
  FaChalkboardTeacher,
  FaRobot,
  FaSearchPlus,
  FaTimes,
} from "react-icons/fa";

export default function Facilities() {
  // State for current selected image for pop-up
  const [selectedImage, setSelectedImage] = useState(null);

  const facilityList = [
    {
      title: "Robotic Lab",
      desc: "Hamare school ki sabse modern facility jahan bache AI aur Robotics ki basic coding seekhte hain.",
      icon: <FaRobot />,
      color: "from-purple-500 to-indigo-600",
      image: "/images/robotic-lab.jpg",
    },
    {
      title: "Computer Lab",
      desc: "Fully equipped computer lab jahan har bacche ko digital literacy pradan ki jati hai.",
      icon: <FaLaptopCode />,
      color: "from-blue-500 to-cyan-600",
      image: "/images/computer-lab.jpg",
    },
    {
      title: "Science Labs",
      desc: "Physics, Chemistry aur Biology ki separate labs experiments ke liye tayaar hain.",
      icon: <FaMicroscope />,
      color: "from-green-500 to-emerald-600",
      image: "/images/science-lab.jpg",
    },
    {
      title: "Smart Classrooms",
      desc: "Visual learning ke liye projectors aur smart boards se less kamre.",
      icon: <FaChalkboardTeacher />,
      color: "from-yellow-400 to-orange-500",
      image: "/images/smart-class.jpg",
    },
    {
      title: "Digital Library",
      desc: "Hazaron kitabon aur e-resources ka sangrah bacchon ki knowledge badhane ke liye.",
      icon: <FaBookReader />,
      color: "from-pink-500 to-rose-600",
      image: "/images/library.jpg",
    },
    {
      title: "Sports & Yoga",
      desc: "Physical fitness ke liye bada playground aur specialized sports equipment.",
      icon: <FaRunning />,
      color: "from-orange-500 to-red-600",
      image: "/images/sports.jpg",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-blue-900 pt-32 pb-24 px-6 text-center text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <FaMicroscope className="text-[200px] absolute -bottom-10 -left-10 rotate-12" />
          <FaRobot className="text-[150px] absolute -top-10 -right-10 -rotate-12" />
        </div>
        <div className="relative z-10">
          <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter">
            Infrastructure <span className="text-blue-400">&</span> Facilities
          </h1>
          <p className="text-blue-100 max-w-3xl mx-auto text-lg md:text-xl font-medium italic">
            "Providing the best environment for the bright future of GSSS Kuthar
            students."
          </p>
        </div>
      </div>

      {/* Facilities Grid */}
      <div className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {facilityList.map((item, index) => (
            <div
              key={index}
              className="group bg-white rounded-[3rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 flex flex-col"
            >
              {/* Image Container with Pop-up Trigger */}
              <div
                className="h-64 w-full overflow-hidden relative cursor-pointer"
                onClick={() => setSelectedImage(item.image)}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-20`}
                ></div>
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  onError={(e) => {
                    e.target.style.display = "none";
                  }}
                />

                {/* Hover Overlay with Zoom Icon */}
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                  <div className="bg-white/20 backdrop-blur-md p-4 rounded-full border border-white/30 transform scale-75 group-hover:scale-100 transition-transform duration-500">
                    <FaSearchPlus className="text-white text-3xl" />
                  </div>
                </div>

                {/* Floating Icon */}
                <div
                  className={`absolute bottom-4 left-6 w-14 h-14 bg-white rounded-2xl shadow-lg flex items-center justify-center text-2xl z-20`}
                >
                  <span
                    className={`bg-gradient-to-br ${item.color} bg-clip-text text-transparent`}
                  >
                    {item.icon}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-8 flex-1">
                <h3 className="text-2xl font-black text-gray-800 mb-4 group-hover:text-blue-600 transition-colors">
                  {item.title}
                </h3>
                <p className="text-gray-500 leading-relaxed font-medium text-base">
                  {item.desc}
                </p>
              </div>

              {/* Bottom Accent Line */}
              <div
                className={`h-2 w-full bg-gradient-to-r ${item.color} opacity-0 group-hover:opacity-100 transition-opacity`}
              ></div>
            </div>
          ))}
        </div>
      </div>

      {/* --- IMAGE POP-UP LIGHTBOX --- */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/95 backdrop-blur-md z-[200] flex items-center justify-center p-4 md:p-10 animate-fadeIn"
          onClick={() => setSelectedImage(null)}
        >
          {/* Close Button */}
          <button
            className="absolute top-8 right-8 text-white/50 hover:text-white text-4xl transition-all hover:rotate-90 z-[210]"
            onClick={() => setSelectedImage(null)}
          >
            <FaTimes />
          </button>

          {/* Large Image Box */}
          <div className="relative max-w-6xl w-full flex items-center justify-center animate-zoomIn">
            <img
              src={selectedImage}
              alt="Full View"
              className="max-w-full max-h-[85vh] rounded-3xl shadow-[0_20px_80px_rgba(0,0,0,0.8)] border-4 border-white/10 object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}

      {/* Animations */}
      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes zoomIn { from { opacity: 0; transform: scale(0.9); } to { opacity: 1; transform: scale(1); } }
        .animate-fadeIn { animation: fadeIn 0.3s ease-out forwards; }
        .animate-zoomIn { animation: zoomIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
      `}</style>
    </div>
  );
}
