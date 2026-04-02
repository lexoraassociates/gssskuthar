import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [activitiesOpen, setActivitiesOpen] = useState(false);
  const [mobileSchoolOpen, setMobileSchoolOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const menuRef = useRef(null);
  const megaRef = useRef(null);
  const { pathname } = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menus when clicking outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target) &&
        megaRef.current &&
        !megaRef.current.contains(e.target)
      ) {
        setMegaOpen(false);
        setActivitiesOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav
      ref={menuRef}
      className={`backdrop-blur-xl bg-pink-100/60 sticky top-0 z-50 border-b border-transparent bg-gradient-to-r from-pink-200/40 to-pink-100/40 transition-all duration-300 ${
        scrolled ? "py-1 shadow-xl bg-pink-100/80" : "py-2 shadow-md"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-2 flex justify-between items-center">
        {/* Logo */}
        <h1 className="text-2xl font-bold text-pink-700 relative">
          GSSS कुठाड़
          <span className="absolute inset-0 blur-xl bg-pink-300 opacity-40 -z-10"></span>
        </h1>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center space-x-8 font-medium">
          <li
            className={`relative group cursor-pointer group-hover:-translate-y-[2px] transition-transform duration-200 ${
              pathname === "/" ? "text-pink-700 font-semibold" : "text-pink-900"
            }`}
          >
            <Link to="/">Home</Link>
            <span
              className={`absolute left-0 -bottom-1 h-[2px] bg-pink-600 rounded-full transition-all duration-300 ${
                pathname === "/" ? "w-full" : "w-0 group-hover:w-full"
              }`}
            ></span>
          </li>

          {/* SCHOOL MEGA MENU */}
          <li
            className={`relative group cursor-pointer h-full flex items-center py-4 transition-transform duration-200 ${
              pathname.startsWith("/school")
                ? "text-pink-700 font-semibold"
                : "text-pink-900"
            }`}
            onMouseEnter={() => setMegaOpen(true)}
            onMouseLeave={() => setMegaOpen(false)}
          >
            <span className="group-hover:text-pink-600 transition">School</span>

            {/* Underline */}
            <span
              className={`absolute left-0 -bottom-1 h-[2px] bg-pink-600 rounded-full transition-all duration-300 ${
                pathname.startsWith("/school")
                  ? "w-full"
                  : "w-0 group-hover:w-full"
              }`}
            ></span>

            {/* Mega Menu */}
            {megaOpen && (
              <div
                ref={megaRef}
                className="absolute left-1/2 -translate-x-1/2 top-full pt-3 w-max z-50 animate-fadeSlideSlow"
              >
                {/* your mega menu content */}
                <div className="bg-pink-100/90 shadow-2xl border rounded-lg p-8 grid grid-cols-3 gap-0">
                  {/* Column 1 */}
                  <div className="px-6 border-r border-gray-200">
                    <h3 className="font-bold text-blue-700 mb-4 uppercase text-xs">
                      About Us
                    </h3>
                    <ul className="space-y-3 text-sm text-gray-600">
                      <li className="hover:text-blue-600 whitespace-nowrap">
                        History
                      </li>
                      <li className="hover:text-blue-600 whitespace-nowrap">
                        Vision & Mission
                      </li>
                    </ul>
                  </div>

                  {/* Column 2 */}
                  <div className="px-6 border-r border-gray-200">
                    <h3 className="font-bold text-blue-700 mb-4 uppercase text-xs">
                      Academics
                    </h3>
                    <ul className="space-y-3 text-sm text-gray-600">
                      <li className="hover:text-blue-600 whitespace-nowrap">
                        Staff Details
                      </li>
                      <li className="hover:text-blue-600 whitespace-nowrap">
                        Timings
                      </li>
                    </ul>
                  </div>

                  {/* Column 3 */}
                  <div className="px-6">
                    <h3 className="font-bold text-blue-700 mb-4 uppercase text-xs">
                      Admissions
                    </h3>
                    <ul className="space-y-3 text-sm text-gray-600">
                      <li className="hover:text-blue-600 whitespace-nowrap">
                        Apply Online
                      </li>
                      <li className="hover:text-blue-600 whitespace-nowrap">
                        Prospectus
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </li>

          <li
            className={`relative group cursor-pointer group-hover:-translate-y-[2px] transition-transform duration-200 ${
              pathname === "/gallery"
                ? "text-pink-700 font-semibold"
                : "text-pink-900"
            }`}
          >
            <Link to="/gallery">Gallery</Link>
            <span
              className={`absolute left-0 -bottom-1 h-[2px] bg-pink-600 rounded-full transition-all duration-300 ${
                pathname === "/gallery" ? "w-full" : "w-0 group-hover:w-full"
              }`}
            ></span>
          </li>

          <li
            className={`relative group cursor-pointer group-hover:-translate-y-[2px] transition-transform duration-200 ${
              pathname === "/contact"
                ? "text-pink-700 font-semibold"
                : "text-pink-900"
            }`}
          >
            <Link to="/contact">Contact</Link>
            <span
              className={`absolute left-0 -bottom-1 h-[2px] bg-pink-600 rounded-full transition-all duration-300 ${
                pathname === "/contact" ? "w-full" : "w-0 group-hover:w-full"
              }`}
            ></span>
          </li>

          {/* ACTIVITIES MEGA MENU */}
          <li
            className={`relative group cursor-pointer h-full flex items-center py-4 transition-transform duration-200 ${
              pathname.startsWith("/activities")
                ? "text-pink-700 font-semibold"
                : "text-pink-900"
            }`}
            onMouseEnter={() => setActivitiesOpen(true)}
            onMouseLeave={() => setActivitiesOpen(false)}
          >
            <span className="group-hover:text-pink-600 transition">
              Activities
            </span>

            {/* Underline */}
            <span
              className={`absolute left-0 -bottom-1 h-[2px] bg-pink-600 rounded-full transition-all duration-300 ${
                pathname.startsWith("/activities")
                  ? "w-full"
                  : "w-0 group-hover:w-full"
              }`}
            ></span>

            {/* Mega Menu */}
            {activitiesOpen && (
              <div className="absolute right-0 top-full pt-3 w-max z-50 animate-fadeSlideSlow">
                <div className="bg-pink-100/90 shadow-2xl border rounded-lg p-8 grid grid-cols-3 gap-0">
                  {/* Column 1 */}
                  <div className="px-6 border-r border-gray-200">
                    <h3 className="font-bold text-blue-700 mb-4 uppercase text-xs">
                      Sports
                    </h3>
                    <ul className="space-y-3 text-sm text-gray-600">
                      <li className="hover:text-blue-600 whitespace-nowrap">
                        Cricket
                      </li>
                      <li className="hover:text-blue-600 whitespace-nowrap">
                        Athletics
                      </li>
                    </ul>
                  </div>

                  {/* Column 2 */}
                  <div className="px-6 border-r border-gray-200">
                    <h3 className="font-bold text-blue-700 mb-4 uppercase text-xs">
                      Cultural
                    </h3>
                    <ul className="space-y-3 text-sm text-gray-600">
                      <li className="hover:text-blue-600 whitespace-nowrap">
                        Dance
                      </li>
                      <li className="hover:text-blue-600 whitespace-nowrap">
                        Music
                      </li>
                    </ul>
                  </div>

                  {/* Column 3 */}
                  <div className="px-6">
                    <h3 className="font-bold text-blue-700 mb-4 uppercase text-xs">
                      Clubs
                    </h3>
                    <ul className="space-y-3 text-sm text-gray-600">
                      <li className="hover:text-blue-600 whitespace-nowrap">
                        Eco Club
                      </li>
                      <li className="hover:text-blue-600 whitespace-nowrap">
                        Science Club
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </li>

          <li>
            <Link
              to="/apply-now"
              className="bg-pink-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-pink-700 hover:shadow-lg transition"
            >
              Apply Now
            </Link>
          </li>
        </ul>

        {/* Mobile Toggle */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-3xl text-blue-700"
          >
            {isOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      <div
        className={`md:hidden absolute top-full left-0 w-full bg-pink-50/80 backdrop-blur-xl shadow-xl transition-all duration-300 overflow-hidden ${
          isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-6 py-6 space-y-4 font-medium">
          <Link
            to="/"
            className="block border-b pb-2 text-pink-900 hover:text-pink-600 transition"
          >
            Home
          </Link>

          {/* MOBILE SCHOOL DROPDOWN (3 COLUMN) */}
          <div>
            <button
              onClick={() => setMobileSchoolOpen(!mobileSchoolOpen)}
              className="w-full flex justify-between border-b pb-2 text-pink-900 hover:text-pink-600 transition"
            >
              School <span>{mobileSchoolOpen ? "−" : "+"}</span>
            </button>

            {mobileSchoolOpen && (
              <div className="grid grid-cols-3 gap-4 bg-gray-50 p-4 mt-2 rounded text-sm text-gray-700">
                <div>
                  <p className="font-bold text-blue-700">About Us</p>
                  <ul className="pl-2 space-y-1">
                    <li>History</li>
                    <li>Vision</li>
                  </ul>
                </div>

                <div>
                  <p className="font-bold text-blue-700">Academics</p>
                  <ul className="pl-2 space-y-1">
                    <li>Staff</li>
                    <li>Timings</li>
                  </ul>
                </div>

                <div>
                  <p className="font-bold text-blue-700">Admissions</p>
                  <ul className="pl-2 space-y-1">
                    <li>Apply</li>
                    <li>Prospectus</li>
                  </ul>
                </div>
              </div>
            )}
          </div>

          <Link
            to="/gallery"
            className="block border-b pb-2 text-pink-900 hover:text-pink-600 transition"
          >
            Gallery
          </Link>

          <Link
            to="/contact"
            className="block border-b pb-2 text-pink-900 hover:text-pink-600 transition"
          >
            Contact
          </Link>

          <div className="pt-4">
            <Link
              to="/apply-now"
              className="block w-full text-center bg-pink-600 text-white py-3 rounded-lg shadow-md hover:bg-pink-700 hover:shadow-lg transition"
            >
              Apply Now
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
