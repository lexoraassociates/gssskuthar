import React, { useState } from "react";
import {
  FaLock,
  FaShieldAlt,
  FaEye,
  FaEyeSlash,
  FaCheckCircle,
  FaSpinner,
} from "react-icons/fa";
import { fetchWithAuth } from "../../api"; // Path check kar lena

export default function AccountSettings() {
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: "", text: "" });

    // Client-side validation
    if (formData.newPassword !== formData.confirmPassword) {
      setMessage({ type: "error", text: "New passwords do not match!" });
      return;
    }

    setLoading(true);
    try {
      const response = await fetchWithAuth(
        "https://test9.online/api/management/change-password/",
        {
          method: "POST",
          body: JSON.stringify({
            current_password: formData.currentPassword,
            new_password: formData.newPassword,
          }),
        },
      );

      const data = await response.json();

      if (response.ok) {
        setMessage({ type: "success", text: "Password changed successfully!" });
        setFormData({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      } else {
        setMessage({
          type: "error",
          text: data.error || "Something went wrong",
        });
      }
    } catch (err) {
      setMessage({
        type: "error",
        text: "Server error. Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fadeSlideIn">
      {/* Header Section (Pehle wala same) */}
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 bg-pink-100 text-pink-600 rounded-2xl flex items-center justify-center text-xl">
          <FaShieldAlt />
        </div>
        <div>
          <h2 className="text-2xl font-black text-gray-800 tracking-tight">
            Account Security
          </h2>
          <p className="text-gray-400 text-sm">
            Update your password to keep your account safe.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-[2.5rem] p-8 md:p-10 shadow-sm border border-gray-100">
          {/* Status Messages */}
          {message.text && (
            <div
              className={`mb-6 p-4 rounded-2xl text-sm font-bold ${message.type === "success" ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"}`}
            >
              {message.text}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-2">
                Current Password
              </label>
              <input
                type={showPass ? "text" : "password"}
                className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 text-sm font-bold focus:ring-2 focus:ring-pink-200 outline-none transition-all"
                value={formData.currentPassword}
                onChange={(e) =>
                  setFormData({ ...formData, currentPassword: e.target.value })
                }
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-2">
                New Password
              </label>
              <input
                type={showPass ? "text" : "password"}
                className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 text-sm font-bold focus:ring-2 focus:ring-pink-200 outline-none transition-all"
                value={formData.newPassword}
                onChange={(e) =>
                  setFormData({ ...formData, newPassword: e.target.value })
                }
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-2">
                Confirm New Password
              </label>
              <div className="relative">
                <input
                  type={showPass ? "text" : "password"}
                  className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 text-sm font-bold focus:ring-2 focus:ring-pink-200 outline-none transition-all"
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      confirmPassword: e.target.value,
                    })
                  }
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  {showPass ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full md:w-auto px-10 py-4 bg-gray-900 text-white rounded-2xl font-black text-sm shadow-xl hover:bg-pink-600 transition-all flex items-center justify-center gap-2"
            >
              {loading ? (
                <FaSpinner className="animate-spin" />
              ) : (
                "Update Password"
              )}
            </button>
          </form>
        </div>

        {/* Security Tips (Pehle wala same) */}
        <div className="bg-gradient-to-br from-pink-600 to-pink-500 rounded-[2rem] p-8 text-white h-fit">
          <h4 className="font-black text-lg mb-4">Tips</h4>
          <ul className="space-y-3 text-xs font-bold opacity-90">
            <li className="flex gap-2">
              <FaCheckCircle /> Minimum 8 characters.
            </li>
            <li className="flex gap-2">
              <FaCheckCircle /> No birthdays or names.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
