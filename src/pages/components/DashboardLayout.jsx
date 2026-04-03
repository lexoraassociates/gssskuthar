import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";

export default function DashboardLayout({ children }) {
  const navigate = useNavigate();
  const token = localStorage.getItem("access_token");
  const userName = localStorage.getItem("user_name");

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  if (!token) {
    return null; // Ya phir ek loading spinner bhi dikhaya ja sakta hai
  }

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        {/* Top Header */}
        <header className="bg-white p-4 shadow-sm flex justify-between items-center">
          <h1 className="text-xl font-semibold text-gray-700">School Portal</h1>
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-gray-600">
              Welcome, <b>{userName}</b>
            </span>
            <div className="w-10 h-10 bg-pink-600 rounded-full flex items-center justify-center text-white font-bold uppercase">
              {userName?.charAt(0)}
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="p-6 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
