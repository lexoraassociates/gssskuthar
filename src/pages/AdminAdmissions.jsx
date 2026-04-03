import { useEffect, useState } from "react";
import { fetchWithAuth } from "../api"; // Path check kar lein

export default function AdminAdmissions() {
  const [admissions, setAdmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedStudent, setSelectedStudent] = useState(null); // Modal ke liye
  const [approvalData, setApprovalData] = useState({
    admission_number: "",
    roll_number: "",
  });

  // 1. Fetch Pending Admissions
  useEffect(() => {
    fetchPending();
  }, []);

  const fetchPending = async () => {
    setLoading(true);
    try {
      const res = await fetchWithAuth("https://test9.online/api/admissions/");
      if (res && res.ok) {
        const data = await res.json();
        // Sirf wahi dikhao jo approved nahi hain
        setAdmissions(data.filter((item) => !item.is_approved));
      }
    } catch (err) {
      console.error("Fetch Pending error:", err);
    } finally {
      setLoading(false);
    }
  };

  // 2. Approve Logic
  const handleApprove = async () => {
    if (!approvalData.admission_number || !approvalData.roll_number) {
      alert("Please assign both Admission Number and Roll Number.");
      return;
    }

    try {
      const res = await fetchWithAuth(
        `https://test9.online/api/admissions/${selectedStudent.id}/`,
        {
          method: "PATCH",
          body: JSON.stringify({
            ...approvalData,
            is_approved: true,
          }),
        },
      );

      if (res && res.ok) {
        alert("Student Approved Successfully! User account created.");
        setSelectedStudent(null);
        setApprovalData({ admission_number: "", roll_number: "" }); // Reset Fields
        fetchPending(); // List refresh karein
      }
    } catch (err) {
      console.error("Approval error:", err);
      alert("Failed to approve. Please check console.");
    }
  };

  if (loading)
    return (
      <div className="p-10 text-center">
        <div className="animate-spin h-8 w-8 border-4 border-pink-500 border-t-transparent rounded-full mx-auto mb-4"></div>
        <p className="text-gray-500 font-medium">
          Fetching Pending Admissions...
        </p>
      </div>
    );

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Pending Admissions</h2>
        <span className="bg-pink-100 text-pink-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
          {admissions.length} Pending
        </span>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="p-4 font-semibold text-gray-600 text-sm">
                App No.
              </th>
              <th className="p-4 font-semibold text-gray-600 text-sm">Name</th>
              <th className="p-4 font-semibold text-gray-600 text-sm">Class</th>
              <th className="p-4 font-semibold text-gray-600 text-sm">Phone</th>
              <th className="p-4 font-semibold text-gray-600 text-sm">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {admissions.length > 0 ? (
              admissions.map((student) => (
                <tr
                  key={student.id}
                  className="border-b last:border-0 hover:bg-gray-50/50 transition-colors"
                >
                  <td className="p-4 font-mono text-xs text-gray-500">
                    {student.application_number}
                  </td>
                  <td className="p-4 font-bold text-gray-700">
                    {student.full_name}
                  </td>
                  <td className="p-4 text-gray-600">{student.class_applied}</td>
                  <td className="p-4 text-gray-600 font-medium">
                    {student.phone}
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() => setSelectedStudent(student)}
                      className="bg-pink-600 text-white px-4 py-2 rounded-xl text-sm font-bold shadow-sm hover:bg-pink-700 hover:shadow-md transition-all active:scale-95"
                    >
                      Review & Approve
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="p-10 text-center text-gray-400">
                  No pending admissions found for this session.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* MODAL FOR APPROVAL */}
      {selectedStudent && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white p-8 rounded-3xl max-w-md w-full shadow-2xl animate-scaleUp">
            <h3 className="text-2xl font-black mb-2 text-gray-800">
              Approve Admission
            </h3>
            <p className="text-sm text-gray-500 mb-6 font-medium">
              Assign identity for{" "}
              <span className="text-pink-600 font-bold">
                {selectedStudent.full_name}
              </span>
            </p>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-gray-400 uppercase ml-1">
                  Admission Number
                </label>
                <input
                  type="text"
                  placeholder="e.g. 2026/KTH/001"
                  className="w-full p-4 border rounded-2xl outline-none focus:ring-2 focus:ring-pink-500 bg-gray-50"
                  onChange={(e) =>
                    setApprovalData({
                      ...approvalData,
                      admission_number: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-400 uppercase ml-1">
                  Roll Number
                </label>
                <input
                  type="number"
                  placeholder="e.g. 01"
                  className="w-full p-4 border rounded-2xl outline-none focus:ring-2 focus:ring-pink-500 bg-gray-50"
                  onChange={(e) =>
                    setApprovalData({
                      ...approvalData,
                      roll_number: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            <div className="flex gap-4 mt-8">
              <button
                onClick={() => setSelectedStudent(null)}
                className="flex-1 py-4 border rounded-2xl hover:bg-gray-50 font-bold text-gray-600 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleApprove}
                className="flex-1 py-4 bg-green-600 text-white rounded-2xl font-bold hover:bg-green-700 shadow-lg shadow-green-100 transition-all active:scale-95"
              >
                Confirm Approval
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
