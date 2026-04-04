import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaUserLock, FaChevronDown, FaChevronUp } from "react-icons/fa";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [activitiesOpen, setActivitiesOpen] = useState(false);
  const [mobileSchoolOpen, setMobileSchoolOpen] = useState(false);
  const [mobileActivitiesOpen, setMobileActivitiesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const menuRef = useRef(null);
  const { pathname } = useLocation();

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      ref={menuRef}
      className={`backdrop-blur-xl sticky top-0 z-[100] border-b transition-all duration-300 ${
        scrolled
          ? "py-1 bg-pink-100/90 shadow-xl border-pink-200"
          : "py-3 bg-pink-50/70 border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Logo with Home Link */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="relative">
            <img
              src="/logo.png"
              alt="GSSS Kuthar Logo"
              className="h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 blur-lg bg-pink-400/20 -z-10 group-hover:bg-pink-400/40 transition-all"></div>
          </div>
          <div className="hidden sm:block">
            <h1 className="text-xl font-black text-pink-800 leading-none tracking-tight">
              GSSS कुठाड़
            </h1>
            <p className="text-[10px] font-bold text-pink-600 uppercase tracking-widest mt-1">
              Solan, Himachal Pradesh
            </p>
          </div>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden lg:flex items-center space-x-7 font-bold text-sm uppercase tracking-wide">
          {["Home", "Gallery", "Notifications", "Contact"].map((item) => {
            const path =
              item === "Home"
                ? "/"
                : `/${item.toLowerCase().replace(" ", "-")}`;
            return (
              <li key={item} className="relative group py-2">
                <Link
                  to={path}
                  className={
                    pathname === path
                      ? "text-pink-700"
                      : "text-pink-900 hover:text-pink-600 transition"
                  }
                >
                  {item}
                </Link>
                <span
                  className={`absolute left-0 bottom-0 h-0.5 bg-pink-600 transition-all duration-300 ${pathname === path ? "w-full" : "w-0 group-hover:w-full"}`}
                ></span>
              </li>
            );
          })}

          {/* SCHOOL MEGA MENU */}
          <li
            className="relative group cursor-pointer h-full flex items-center py-4"
            onMouseEnter={() => setMegaOpen(true)}
            onMouseLeave={() => setMegaOpen(false)}
          >
            <span
              className={`transition ${pathname.startsWith("/school") ? "text-pink-700" : "text-pink-900 group-hover:text-pink-600"}`}
            >
              School
            </span>
            <FaChevronDown
              className={`ml-1 text-[10px] transition-transform ${megaOpen ? "rotate-180" : ""}`}
            />

            {megaOpen && (
              <div className="absolute left-1/2 -translate-x-1/2 top-full pt-2 w-max z-50 animate-fadeSlideSlow">
                <div className="bg-white/95 backdrop-blur-2xl shadow-2xl border border-pink-100 rounded-3xl p-8 grid grid-cols-3 gap-8">
                  <div>
                    <h3 className="font-black text-blue-700 mb-4 text-[10px] tracking-[0.2em] uppercase">
                      About Us
                    </h3>
                    <ul className="space-y-3 text-sm text-gray-600 font-medium">
                      <li>
                        <Link
                          to="/school/history"
                          className="hover:text-pink-600"
                        >
                          History
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/school/vision-mission"
                          className="hover:text-pink-600"
                        >
                          Vision & Mission
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-black text-blue-700 mb-4 text-[10px] tracking-[0.2em] uppercase">
                      Academics
                    </h3>
                    <ul className="space-y-3 text-sm text-gray-600 font-medium">
                      <li>
                        <Link
                          to="/school/staff"
                          className="hover:text-pink-600"
                        >
                          Staff Details
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/school/timings"
                          className="hover:text-pink-600"
                        >
                          Timings
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-black text-blue-700 mb-4 text-[10px] tracking-[0.2em] uppercase">
                      Admissions
                    </h3>
                    <ul className="space-y-3 text-sm text-gray-600 font-medium">
                      <li>
                        <Link to="/apply-now" className="hover:text-pink-600">
                          Apply Online
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/school/prospectus"
                          className="hover:text-pink-600"
                        >
                          Prospectus
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </li>

          {/* LOGIN & APPLY */}
          <div className="flex items-center gap-4 pl-4 border-l border-pink-200">
            <Link
              to="/login"
              className="text-pink-900 hover:text-blue-600 transition flex items-center gap-2"
            >
              <FaUserLock size={18} />
              <span className="hidden xl:inline">Login</span>
            </Link>
            <Link
              to="/apply-now"
              className="bg-pink-600 text-white px-6 py-2.5 rounded-2xl shadow-lg shadow-pink-200 hover:bg-pink-700 hover:-translate-y-0.5 transition-all active:scale-95"
            >
              Apply Now
            </Link>
          </div>
        </ul>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden h-10 w-10 flex items-center justify-center rounded-xl bg-pink-200/50 text-pink-700 text-2xl transition-colors"
        >
          {isOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* MOBILE MENU */}
      <div
        className={`lg:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-2xl shadow-2xl transition-all duration-500 overflow-hidden ${isOpen ? "max-h-[90vh] opacity-100 border-t border-pink-100" : "max-h-0 opacity-0"}`}
      >
        <div className="px-6 py-8 space-y-5 font-bold text-gray-800">
          <Link to="/" className="block text-lg border-b border-gray-50 pb-2">
            Home
          </Link>

          {/* Mobile School Dropdown */}
          <div className="border-b border-gray-50 pb-2">
            <button
              onClick={() => setMobileSchoolOpen(!mobileSchoolOpen)}
              className="w-full flex justify-between items-center text-lg text-pink-900"
            >
              School{" "}
              {mobileSchoolOpen ? (
                <FaChevronUp size={14} />
              ) : (
                <FaChevronDown size={14} />
              )}
            </button>
            {mobileSchoolOpen && (
              <div className="mt-4 grid grid-cols-2 gap-6 p-4 bg-pink-50/50 rounded-2xl animate-fadeIn">
                <div className="space-y-2 text-sm">
                  <p className="text-blue-700 text-[10px] uppercase tracking-widest font-black">
                    General
                  </p>
                  <Link to="/school/history" className="block text-gray-600">
                    History
                  </Link>
                  <Link
                    to="/school/vision-mission"
                    className="block text-gray-600"
                  >
                    Vision
                  </Link>
                </div>
                <div className="space-y-2 text-sm">
                  <p className="text-blue-700 text-[10px] uppercase tracking-widest font-black">
                    Faculty
                  </p>
                  <Link to="/school/staff" className="block text-gray-600">
                    Staff
                  </Link>
                  <Link to="/school/timings" className="block text-gray-600">
                    Timings
                  </Link>
                </div>
                <div className="space-y-2 text-sm col-span-2">
                  <p className="text-blue-700 text-[10px] uppercase tracking-widest font-black">
                    Admission
                  </p>
                  <div className="flex gap-4">
                    <Link to="/apply-now" className="text-gray-600">
                      Apply Online
                    </Link>
                    <Link to="/school/prospectus" className="text-gray-600">
                      Prospectus
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>

          <Link
            to="/gallery"
            className="block text-lg border-b border-gray-50 pb-2"
          >
            Gallery
          </Link>
          <Link
            to="/contact"
            className="block text-lg border-b border-gray-50 pb-2"
          >
            Contact
          </Link>

          {/* Bottom Actions */}
          <div className="pt-6 space-y-4">
            <Link
              to="/login"
              className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl bg-gray-100 text-gray-700"
            >
              <FaUserLock /> Login to Admin
            </Link>
            <Link
              to="/apply-now"
              className="block w-full text-center bg-pink-600 text-white py-4 rounded-2xl shadow-xl shadow-pink-200"
            >
              Apply Now
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
