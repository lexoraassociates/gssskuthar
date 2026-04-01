export default function AboutSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        {/* LEFT IMAGE */}
        <div className="relative animate-fadeSlideSlow">
          <img
            src={`${import.meta.env.BASE_URL}images/school/yog.jpeg`}
            alt="School Building"
            className="rounded-xl shadow-lg w-full object-cover"
          />

          {/* Decorative Shape */}
          <div className="absolute -bottom-6 -right-6 w-40 h-40 bg-blue-600 opacity-20 rounded-xl blur-xl"></div>
        </div>

        {/* RIGHT CONTENT */}
        <div className="animate-fadeSlideSlow">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-700 mb-4">
            About Our School
          </h2>

          <p className="text-gray-700 leading-relaxed text-lg">
            Government Senior Secondary School कुठाड़ is committed to providing
            quality education, holistic development, and a nurturing environment
            for every student. With experienced faculty, modern facilities, and
            a focus on academic excellence, we aim to shape confident and
            responsible citizens of tomorrow.
          </p>

          <p className="text-gray-700 leading-relaxed mt-4 text-lg">
            Our school emphasizes discipline, values, co‑curricular activities,
            and a strong academic foundation to ensure all‑round growth.
          </p>

          <a
            href="/apply"
            className="inline-block mt-8 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-lg font-semibold shadow-lg transition"
          >
            Apply for Admission
          </a>
        </div>
      </div>
    </section>
  );
}
