import {
  FaFacebook,
  FaInstagram,
  FaYoutube,
  FaPhone,
  FaBlenderPhone,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-blue-900 text-white pt-16 pb-8 mt-20">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-12">
        {/* SCHOOL INFO */}
        <div>
          <h2 className="text-2xl font-bold mb-4">GSSS कुठाड़</h2>
          <p className="text-gray-300 leading-relaxed">
            A place of learning, growth, and excellence. Dedicated to shaping
            the future of our students.
          </p>

          {/* SOCIAL ICONS */}
          <div className="flex gap-4 mt-6">
            <a
              href="#"
              className="text-white text-2xl hover:text-blue-300 transition"
            >
              <FaFacebook />
            </a>
            <a
              href="#"
              className="text-white text-2xl hover:text-blue-300 transition"
            >
              <FaInstagram />
            </a>
            <a
              href="#"
              className="text-white text-2xl hover:text-blue-300 transition"
            >
              <FaYoutube />
            </a>
          </div>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-3 text-gray-300">
            <li>
              <a href="/" className="hover:text-blue-300 transition">
                Home
              </a>
            </li>
            <li>
              <a href="/apply" className="hover:text-blue-300 transition">
                Admission
              </a>
            </li>
            <li>
              <a href="/gallery" className="hover:text-blue-300 transition">
                Gallery
              </a>
            </li>
            <li>
              <a href="/login" className="hover:text-blue-300 transition">
                Student Login
              </a>
            </li>
          </ul>
        </div>

        {/* CONTACT INFO */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Contact</h3>
          <ul className="space-y-4 text-gray-300">
            <li className="flex items-center gap-3">
              <FaPhone className="text-blue-300" /> +91‑9418470900
            </li>
            <li className="flex items-center gap-3">
              <FaBlenderPhone className="text-blue-300" /> +91‑1792- 284 608
            </li>
            <li className="flex items-center gap-3">
              <FaEnvelope className="text-blue-300" /> prikuthar@gmail.com
            </li>
          </ul>
        </div>

        {/* ADDRESS */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Address</h3>
          <p className="flex items-start gap-3 text-gray-300">
            <FaMapMarkerAlt className="text-blue-300 mt-1" />
            Government Senior Secondary School कुठाड़, District Solan, Himachal
            Pradesh
          </p>
        </div>
      </div>

      {/* COPYRIGHT */}
      <div className="text-center text-gray-400 mt-12 border-t border-gray-700 pt-6">
        © {new Date().getFullYear()} GSSS कुठाड़ — All Rights Reserved.
      </div>
    </footer>
  );
}
