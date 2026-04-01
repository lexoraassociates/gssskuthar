export default function PrincipalMessage() {
  return (
    <section className="py-24 bg-gray-50 relative">
      {/* Soft Background Pattern */}
      <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>

      <div className="relative max-w-7xl mx-auto px-6 grid md:grid-cols-[40%_60%] gap-12 items-center">
        {/* LEFT IMAGE WITH PREMIUM EFFECT */}
        <div className="flex justify-center animate-fadeSlideSlow">
          <div className="relative group">
            {/* Soft Glow Behind Image */}
            <div className="absolute inset-0 bg-blue-300 blur-2xl opacity-40 group-hover:opacity-60 transition"></div>

            <img
              src={`${import.meta.env.BASE_URL}images/pri_kuthar.jpeg`}
              alt="Principal"
              className="relative w-72 h-72 object-cover rounded-xl shadow-xl border-4 border-white transform group-hover:-translate-y-2 group-hover:rotate-1 transition duration-500"
            />
          </div>
        </div>

        {/* RIGHT CONTENT */}
        <div className="animate-fadeSlideSlow">
          {/* Quote Line */}
          <p className="text-blue-600 text-lg font-semibold mb-3">
            “Education is the foundation of a bright future.”
          </p>

          <h2 className="text-3xl md:text-4xl font-bold text-blue-700 mb-4">
            Principal’s Message
          </h2>

          <p className="text-gray-700 leading-relaxed text-lg">
            At Government Senior Secondary School कुठाड़, we believe that
            education is not just about academic excellence but also about
            nurturing values, discipline, creativity, and confidence in every
            child. Our aim is to create an environment where students learn,
            grow, and discover their true potential.
          </p>

          <p className="text-gray-700 leading-relaxed text-lg mt-4">
            With the support of dedicated teachers, cooperative parents, and
            enthusiastic students, we continue to strive for excellence in all
            spheres of education. Together, we are shaping a brighter future.
          </p>

          {/* Signature */}
          <div className="mt-8">
            <h3 className="text-2xl font-[cursive] text-blue-700">
              — Principal
            </h3>
            <p className="text-gray-600 text-lg">GSSS कुठाड़</p>
          </div>
        </div>
      </div>
    </section>
  );
}
