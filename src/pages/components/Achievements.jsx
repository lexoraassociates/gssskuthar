import { useEffect, useState } from "react";
import {
  FaUserGraduate,
  FaChalkboardTeacher,
  FaAward,
  FaSchool,
} from "react-icons/fa";

export default function Achievements() {
  const stats = [
    { id: 1, label: "Students", value: 165, icon: <FaUserGraduate /> },
    { id: 2, label: "Teachers", value: 22, icon: <FaChalkboardTeacher /> },
    { id: 3, label: "Awards", value: 18, icon: <FaAward /> },
    { id: 4, label: "Years of Excellence", value: 27, icon: <FaSchool /> },
  ];

  const [counts, setCounts] = useState(stats.map(() => 0));

  useEffect(() => {
    const interval = setInterval(() => {
      setCounts((prev) =>
        prev.map((count, i) =>
          count < stats[i].value
            ? count + Math.ceil(stats[i].value / 50)
            : stats[i].value,
        ),
      );
    }, 40);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-20 bg-blue-50">
      <div className="max-w-7xl mx-auto px-6 text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-blue-700">
          Our Achievements
        </h2>
        <p className="text-gray-600 mt-2 text-lg">
          Proud milestones that reflect our commitment to excellence
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
        {stats.map((item, index) => (
          <div
            key={item.id}
            className="bg-white p-8 rounded-xl shadow hover:shadow-lg transition transform hover:-translate-y-1 animate-fadeSlideSlow"
          >
            <div className="text-blue-600 text-5xl flex justify-center mb-4">
              {item.icon}
            </div>

            <h3 className="text-4xl font-bold text-blue-700">
              {counts[index]}
            </h3>

            <p className="text-gray-700 mt-2 font-medium">{item.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
