import { useState, useEffect } from "react";
import { FaUserTie, FaGraduationCap, FaEnvelope } from "react-icons/fa";

export default function StaffDetails() {
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const res = await fetch("https://test9.online/api/management/staff/");
        if (res.ok) {
          const data = await res.json();
          setStaff(data);
        }
      } catch (err) {
        console.error("Staff fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStaff();
  }, []);

  const getFullImageUrl = (path) => {
    if (!path) return "";
    if (path.startsWith("http")) return path;
    return `https://test9.online${path.startsWith("/") ? "" : "/"}${path}`;
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-pulse text-blue-600 font-bold">
          Loading Faculty...
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-blue-900 pt-32 pb-20 px-6 text-center text-white">
        <h1 className="text-4xl md:text-5xl font-black mb-4">
          Our Dedicated Staff
        </h1>
        <p className="text-blue-200 max-w-2xl mx-auto text-lg">
          Meet the brilliant minds shaping the future at GSSS Kuthar.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {staff.map((member) => (
            <div
              key={member.id}
              className="bg-white rounded-[2.5rem] overflow-hidden shadow-xl shadow-blue-900/5 group hover:-translate-y-2 transition-all duration-300 border border-gray-100"
            >
              {/* Image Container */}
              <div className="h-64 overflow-hidden relative">
                <img
                  src={getFullImageUrl(member.image)}
                  alt={member.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <span className="text-white text-xs font-bold bg-blue-600 px-3 py-1 rounded-full uppercase tracking-widest">
                    View Profile
                  </span>
                </div>
              </div>

              {/* Text Details */}
              <div className="p-8 text-center">
                <h3 className="text-xl font-black text-gray-800 mb-1">
                  {member.name}
                </h3>
                <p className="text-blue-600 font-bold text-sm uppercase tracking-tighter mb-4">
                  {member.designation}
                </p>

                <div className="space-y-2 border-t border-gray-50 pt-4">
                  <div className="flex items-center justify-center gap-2 text-gray-500 text-sm font-medium">
                    <FaGraduationCap className="text-blue-400" />
                    <span>{member.qualification}</span>
                  </div>
                  {member.experience && (
                    <div className="flex items-center justify-center gap-2 text-gray-500 text-sm font-medium">
                      <FaUserTie className="text-blue-400" />
                      <span>{member.experience} Experience</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {staff.length === 0 && (
          <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-gray-200">
            <p className="text-gray-400 font-bold italic">
              No staff details found in database.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
