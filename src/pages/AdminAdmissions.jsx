import { useEffect, useState } from "react";

export default function AdminAdmissions() {
  const [admissions, setAdmissions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/api/admissions/all/")
      .then((res) => res.json())
      .then((data) => setAdmissions(data));
  }, []);

  async function approveAdmission(id) {
    const res = await fetch(
      `http://localhost:8000/api/admissions/approve/${id}/`,
      {
        method: "POST",
      },
    );

    const data = await res.json();
    alert(data.message);

    // Refresh list
    setAdmissions((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: "APPROVED" } : a)),
    );
  }

  return (
    <div className="p-10 bg-pink-50 min-h-screen">
      <h1 className="text-4xl font-bold text-pink-700 mb-8">
        Admission Approval Dashboard
      </h1>

      <div className="grid md:grid-cols-2 gap-6">
        {admissions.map((adm) => (
          <div
            key={adm.id}
            className="bg-white p-6 rounded-xl shadow-lg border border-pink-200"
          >
            <h2 className="text-2xl font-semibold text-pink-700">
              {adm.full_name}
            </h2>
            <p className="text-gray-700">Class: {adm.class_applied}</p>
            <p className="text-gray-700">Email: {adm.email}</p>
            <p className="text-gray-700">Phone: {adm.phone}</p>
            <p className="text-gray-700 mt-2">
              Status: <span className="font-bold">{adm.status}</span>
            </p>

            {adm.status !== "APPROVED" && (
              <button
                onClick={() => approveAdmission(adm.id)}
                className="mt-4 bg-green-600 text-white px-6 py-2 rounded-lg shadow hover:bg-green-700"
              >
                Approve Admission
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
