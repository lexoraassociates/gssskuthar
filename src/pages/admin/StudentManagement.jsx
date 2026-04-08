import React, { useState, useEffect } from "react";
import {
  FaSearch,
  FaUserEdit,
  FaGraduationCap,
  FaFilter,
  FaSpinner,
} from "react-icons/fa";
import { fetchWithAuth } from "../../api";

export default function StudentManagement() {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async (search = "") => {
    setLoading(true);
    try {
      const url = `https://test9.online/api/management/students/${search ? `?search=${search}` : ""}`;
      const res = await fetchWithAuth(url);
      if (res.ok) {
        const data = await res.json();
        setStudents(data);
      }
    } catch (err) {
      console.error("Fetch students error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchStudents(searchTerm);
  };

  return (
    <div className="space-y-8 animate-fadeSlideIn">
      {/* Header & Search Area */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-blue-600 text-white rounded-2xl flex items-center justify-center text-2xl shadow-lg shadow-blue-200">
            <FaGraduationCap />
          </div>
          <div>
            <h2 className="text-3xl font-black text-gray-800 tracking-tight">
              Student Directory
            </h2>
            <p className="text-gray-400 text-sm font-medium">
              Manage all enrolled students of GSSS Kuthar.
            </p>
          </div>
        </div>

        <form onSubmit={handleSearch} className="relative w-full md:w-96 group">
          <input
            type="text"
            placeholder="Search by student name..."
            className="w-full bg-white border border-gray-100 rounded-[2rem] px-8 py-4 text-sm font-bold shadow-sm focus:ring-4 focus:ring-blue-50 outline-none transition-all pr-12"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            type="submit"
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-blue-600 transition-colors"
          >
            <FaSearch />
          </button>
        </form>
      </div>

      {/* Students Table */}
      <div className="bg-white rounded-[3rem] border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-50">
                <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                  Student Details
                </th>
                <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                  Father's Name
                </th>
                <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                  Class
                </th>
                <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                <tr>
                  <td
                    colSpan="4"
                    className="px-8 py-20 text-center text-blue-600 font-bold"
                  >
                    <FaSpinner className="animate-spin inline mr-2" /> Loading
                    Students...
                  </td>
                </tr>
              ) : students.length > 0 ? (
                students.map((student) => (
                  <tr
                    key={student.id}
                    className="hover:bg-blue-50/30 transition-colors group"
                  >
                    <td className="px-8 py-6">
                      <p className="font-black text-gray-800 text-base">
                        {student.student_name}
                      </p>
                      <p className="text-[10px] font-bold text-gray-400 tracking-tighter">
                        ID: #STU-00{student.id}
                      </p>
                    </td>
                    <td className="px-8 py-6 text-sm font-bold text-gray-600">
                      {student.father_name}
                    </td>
                    <td className="px-8 py-6">
                      <span className="px-4 py-1.5 bg-blue-100 text-blue-600 text-[10px] font-black rounded-full uppercase tracking-widest">
                        Class {student.admission_class}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <button className="p-3 bg-gray-50 text-gray-400 rounded-xl hover:bg-blue-600 hover:text-white transition-all active:scale-90">
                        <FaUserEdit size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    className="px-8 py-20 text-center text-gray-400 font-bold italic"
                  >
                    No students found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
