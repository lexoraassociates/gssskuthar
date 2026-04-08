import React, { useState, useEffect } from "react";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaIdCard,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { fetchWithAuth } from "../../api";

export default function MyProfile() {
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
      <div className="p-10 text-center font-bold">Loading Your Profile...</div>
    );
  if (!profile)
    return (
      <div className="p-10 text-center text-red-500">Profile Not Found.</div>
    );

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fadeSlideIn">
      <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-50 overflow-hidden relative">
        {/* Banner Decor */}
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-r from-blue-600 to-indigo-600"></div>

        <div className="relative mt-12 flex flex-col md:flex-row items-center gap-8">
          {/* Profile Photo */}
          <div className="w-32 h-32 rounded-[2rem] border-4 border-white shadow-xl overflow-hidden bg-gray-100">
            {profile.photo ? (
              <img
                src={profile.photo}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400 text-4xl">
                <FaUser />
              </div>
            )}
          </div>

          <div className="text-center md:text-left">
            <h2 className="text-3xl font-black text-gray-800">
              {profile.full_name}
            </h2>
            <p className="text-blue-600 font-bold uppercase tracking-widest text-sm">
              Student | Class {profile.class_applied}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
          {/* Detail Cards */}
          <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl">
            <div className="text-blue-500">
              <FaIdCard />
            </div>
            <div>
              <p className="text-[10px] font-black text-gray-400 uppercase">
                Admission No
              </p>
              <p className="font-bold text-gray-700">
                {profile.admission_number || "Not Assigned"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl">
            <div className="text-blue-500">
              <FaPhone />
            </div>
            <div>
              <p className="text-[10px] font-black text-gray-400 uppercase">
                Phone Number
              </p>
              <p className="font-bold text-gray-700">{profile.phone}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl">
            <div className="text-blue-500">
              <FaEnvelope />
            </div>
            <div>
              <p className="text-[10px] font-black text-gray-400 uppercase">
                Email Address
              </p>
              <p className="font-bold text-gray-700">{profile.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl">
            <div className="text-blue-500">
              <FaMapMarkerAlt />
            </div>
            <div>
              <p className="text-[10px] font-black text-gray-400 uppercase">
                Address
              </p>
              <p className="font-bold text-gray-700">{profile.address}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
