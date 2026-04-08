import React, { useState, useEffect } from "react";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaIdCard,
  FaMapMarkerAlt,
  FaDownload,
  FaFileAlt,
} from "react-icons/fa";
import { fetchWithAuth } from "../../api";

export default function StudentProfile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetchWithAuth(
          "https://test9.online/api/management/my-profile/",
        );
        if (res.ok) {
          const data = await res.json();
          setProfile(data);
        }
      } catch (err) {
        console.error("Profile fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (loading)
    return (
      <div className="p-20 text-center font-black text-blue-600 animate-pulse">
        LOADING PROFILE...
      </div>
    );
  if (!profile)
    return (
      <div className="p-20 text-center text-red-500 font-bold">
        PROFILE NOT FOUND
      </div>
    );

  // Documents list for mapping
  const docList = [
    { name: "Aadhaar Card", link: profile.aadhaar_card },
    { name: "Marksheet", link: profile.marksheet },
    { name: "Roll No Slip", link: profile.roll_number_slip },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-fadeSlideIn">
      {/* Header Card */}
      <div className="relative bg-white rounded-[3rem] p-10 shadow-sm border border-gray-50 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-r from-blue-600 to-indigo-700"></div>
        <div className="relative mt-10 flex flex-col md:flex-row items-center gap-8">
          <div className="w-40 h-40 rounded-[2.5rem] border-8 border-white shadow-2xl overflow-hidden bg-white">
            {profile.photo ? (
              <img
                src={profile.photo}
                className="w-full h-full object-cover"
                alt="Student"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-200 text-6xl">
                <FaUser />
              </div>
            )}
          </div>
          <div className="text-center md:text-left">
            <h2 className="text-4xl font-black text-gray-800 tracking-tight">
              {profile.full_name}
            </h2>
            <p className="text-blue-600 font-black uppercase tracking-widest text-sm mt-2">
              Student | Class {profile.class_applied}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Info Items */}
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
          <DetailBox
            icon={<FaIdCard />}
            label="Admission No"
            value={profile.admission_number || "Pending"}
          />
          <DetailBox icon={<FaPhone />} label="Phone" value={profile.phone} />
          <DetailBox
            icon={<FaEnvelope />}
            label="Email"
            value={profile.email}
          />
          <DetailBox
            icon={<FaMapMarkerAlt />}
            label="Address"
            value={profile.address}
          />
        </div>

        {/* Documents Side Panel */}
        <div className="bg-gray-900 rounded-[2.5rem] p-8 text-white shadow-xl">
          <h3 className="font-bold mb-6 text-blue-400 flex items-center gap-2">
            <FaDownload /> My Documents
          </h3>
          <div className="space-y-4">
            {docList.map((doc, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/10 group hover:bg-white/10 transition-all"
              >
                <div className="flex items-center gap-3">
                  <FaFileAlt
                    className={doc.link ? "text-green-400" : "text-gray-600"}
                  />
                  <span className="text-xs font-bold">{doc.name}</span>
                </div>
                {doc.link && (
                  <a
                    href={doc.link}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-400 hover:text-white transition-colors"
                  >
                    <FaDownload size={14} />
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function DetailBox({ icon, label, value }) {
  return (
    <div className="bg-white p-6 rounded-[2rem] border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow">
      <div className="text-blue-500 text-xl">{icon}</div>
      <div>
        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">
          {label}
        </p>
        <p className="text-sm font-bold text-gray-700">{value}</p>
      </div>
    </div>
  );
}
