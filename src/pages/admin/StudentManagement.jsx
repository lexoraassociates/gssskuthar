import React, { useState, useEffect } from "react";
import {
  FaSearch,
  FaUserEdit,
  FaGraduationCap,
  FaSpinner,
  FaTimes,
} from "react-icons/fa";
import { fetchWithAuth } from "../../api";

export default function StudentManagement() {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  // Edit Modal ke liye states
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [editData, setEditData] = useState({
    roll_number: "",
    class_applied: "",
  });

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async (search = "") => {
    setLoading(true);
    try {
      // Backend URL jo aapne views.py mein banaya hai
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

  // UPDATE LOGIC (Action Button)
  const handleUpdate = async () => {
    try {
      const res = await fetchWithAuth(
        `https://test9.online/api/management/students/${selectedStudent.id}/`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(editData),
        },
      );
      if (res.ok) {
        alert("Student updated successfully!");
        setSelectedStudent(null);
        fetchStudents(); // List refresh karein
      }
    } catch (err) {
      alert("Update failed!");
    }
  };

  return (
    <div className="space-y-8 animate-fadeSlideIn">
      {/* Header Area */}
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
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
          >
            <FaSearch />
          </button>
        </form>
      </div>

      {/* Table Area */}
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
                  Class / Roll No
                </th>
                <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                <tr>
                  <td colSpan="4" className="px-8 py-20 text-center">
                    <FaSpinner className="animate-spin inline mr-2" />{" "}
                    Loading...
                  </td>
                </tr>
              ) : (
                students.map((student) => (
                  <tr
                    key={student.id}
                    className="hover:bg-blue-50/30 transition-colors group"
                  >
                    <td className="px-8 py-6">
                      {/* Yahan student_name ki jagah full_name use kiya */}
                      <p className="font-black text-gray-800 text-base">
                        {student.full_name}
                      </p>
                      <p className="text-[10px] font-bold text-blue-500 tracking-widest uppercase">
                        App No: {student.application_number}
                      </p>
                    </td>
                    <td className="px-8 py-6 text-sm font-bold text-gray-600">
                      {student.father_name}
                    </td>
                    <td className="px-8 py-6">
                      <span className="px-4 py-1.5 bg-blue-100 text-blue-600 text-[10px] font-black rounded-full uppercase">
                        {student.class_applied} | Roll: {student.roll_number}
                      </span>
                    </td>
                    <td className="px-8 py-6">
                      <button
                        onClick={() => {
                          setSelectedStudent(student);
                          setEditData({
                            roll_number: student.roll_number,
                            class_applied: student.class_applied,
                          });
                        }}
                        className="p-3 bg-gray-50 text-gray-400 rounded-xl hover:bg-blue-600 hover:text-white transition-all"
                      >
                        <FaUserEdit size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* EDIT MODAL (Functional Action Button) */}
      {selectedStudent && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-[2.5rem] p-8 max-w-md w-full shadow-2xl animate-fadeSlideIn">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-black">Edit Student Info</h3>
              <button onClick={() => setSelectedStudent(null)}>
                <FaTimes />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-[10px] font-black text-gray-400 uppercase ml-2">
                  Class
                </label>
                <input
                  className="w-full p-4 bg-gray-50 rounded-2xl border-none outline-none focus:ring-2 focus:ring-blue-500"
                  value={editData.class_applied}
                  onChange={(e) =>
                    setEditData({ ...editData, class_applied: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="text-[10px] font-black text-gray-400 uppercase ml-2">
                  Roll Number
                </label>
                <input
                  className="w-full p-4 bg-gray-50 rounded-2xl border-none outline-none focus:ring-2 focus:ring-blue-500"
                  value={editData.roll_number}
                  onChange={(e) =>
                    setEditData({ ...editData, roll_number: e.target.value })
                  }
                />
              </div>
              <button
                onClick={handleUpdate}
                className="w-full py-4 bg-blue-600 text-white rounded-2xl font-black shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
