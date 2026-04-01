import { Link } from "react-router-dom";
export default function Hero() {
  return (
    <section className="relative w-full h-[60vh] md:h-[65vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <img
        src={`${import.meta.env.BASE_URL}images/school/school_hero.jpeg`}
        alt="School Building"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/10"></div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-6 animate-fadeSlideFast">
        <h1 className="text-4xl md:text-6xl font-bold drop-shadow-lg">
          Welcome to GSSS कुठाड़
        </h1>

        <p className="mt-4 text-lg md:text-2xl font-light drop-shadow animate-fadeSlideFast delay-200">
          A Place of Learning, Growth & Excellence
        </p>

        <Link
          to="/apply-now"
          className="inline-block mt-8 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-lg font-semibold shadow-lg transition animate-fadeSlideFast delay-400"
        >
          Apply Now
        </Link>
      </div>
    </section>
  );
}
