import { FaEye, FaBullseye } from "react-icons/fa";

export default function VisionMission() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-blue-700">
          Vision & Mission
        </h2>
        <p className="text-gray-600 mt-2 text-lg">
          Our guiding principles that shape the future of our students
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-10">
        {/* VISION BOX */}
        <div className="bg-gray-50 p-10 rounded-xl shadow hover:shadow-lg transition transform hover:-translate-y-1 animate-fadeSlideSlow">
          <div className="flex items-center justify-center mb-6">
            <FaEye className="text-blue-600 text-5xl" />
          </div>
          <h3 className="text-2xl font-bold text-blue-700 mb-4 text-center">
            Our Vision
          </h3>
          <p className="text-gray-700 text-lg leading-relaxed text-center">
            To create a learning environment that nurtures academic excellence,
            moral values, creativity, and holistic development, empowering
            students to become responsible and confident individuals.
          </p>
        </div>

        {/* MISSION BOX */}
        <div className="bg-gray-50 p-10 rounded-xl shadow hover:shadow-lg transition transform hover:-translate-y-1 animate-fadeSlideSlow">
          <div className="flex items-center justify-center mb-6">
            <FaBullseye className="text-blue-600 text-5xl" />
          </div>
          <h3 className="text-2xl font-bold text-blue-700 mb-4 text-center">
            Our Mission
          </h3>
          <p className="text-gray-700 text-lg leading-relaxed text-center">
            To provide quality education, promote discipline, encourage
            co‑curricular activities, and ensure the all‑round development of
            every student through dedicated teaching and modern learning
            practices.
          </p>
        </div>
      </div>
    </section>
  );
}
