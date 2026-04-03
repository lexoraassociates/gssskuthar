import { useState, useEffect } from "react";
import { FaBullhorn, FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function NoticeBoard() {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isPaused, setIsPaused] = useState(false); // Hover state track karne ke liye

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const res = await fetch(
          "https://test9.online/api/management/notifications/",
        );
        if (res.ok) {
          const data = await res.json();
          const dataArray = Array.isArray(data) ? data : data.results || [];

          if (dataArray.length > 0) {
            const latestTen = dataArray.slice(0, 10);
            setNotices(latestTen);
          }
        }
      } catch (err) {
        console.error("Notice fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchNotices();
  }, []);

  return (
    <section className="py-16 bg-gradient-to-b from-white to-blue-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-black text-blue-900 tracking-tight">
            Digital Notice Board
          </h2>
          <div className="h-1.5 w-24 bg-blue-600 mx-auto mt-3 rounded-full"></div>
          <p className="text-gray-500 mt-4 text-lg font-medium">
            Stay updated with school announcements and events.
          </p>
        </div>

        <div className="bg-white border border-blue-100 rounded-3xl shadow-2xl shadow-blue-100/50 overflow-hidden max-w-4xl mx-auto">
          <div className="bg-blue-600 p-5 flex items-center justify-between text-white">
            <div className="flex items-center gap-3">
              <FaBullhorn className="text-2xl animate-pulse" />
              <h3 className="text-xl font-bold">Latest Updates</h3>
            </div>
            <Link
              to="/apply-now"
              className="hidden md:block text-xs bg-white/20 hover:bg-white/30 px-4 py-2 rounded-full font-bold transition-all"
            >
              Admissions Open 2026-27 🎓
            </Link>
          </div>

          <div className="p-4 relative">
            <div
              className="h-64 overflow-hidden relative rounded-xl"
              onMouseEnter={() => setIsPaused(true)} // Mouse aane par true
              onMouseLeave={() => setIsPaused(false)} // Mouse hatne par false
            >
              {loading ? (
                <div className="flex items-center justify-center h-full text-blue-600 font-bold">
                  Loading Notices...
                </div>
              ) : (
                <div
                  className="animate-scroll-slow space-y-4 py-2 cursor-pointer"
                  style={{
                    animationPlayState: isPaused ? "paused" : "running", // Inline style logic
                  }}
                >
                  {[...notices, ...notices].map((item, index) => (
                    <div
                      key={`${item.id}-${index}`}
                      className="bg-blue-50/50 hover:bg-blue-50 p-5 rounded-2xl border border-blue-100/50 transition-all flex flex-col md:flex-row justify-between md:items-center gap-2"
                    >
                      <div className="flex gap-3 items-start">
                        <span className="mt-1.5 h-2 w-2 rounded-full bg-blue-600 flex-shrink-0"></span>
                        <p className="text-gray-700 font-semibold leading-relaxed">
                          {item.heading}
                        </p>
                      </div>
                      <span className="text-[11px] uppercase tracking-widest text-blue-600 font-black bg-blue-100 px-3 py-1 rounded-full w-fit">
                        {new Date(item.event_date).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                  ))}

                  {notices.length === 0 && (
                    <p className="text-center text-gray-400 py-10">
                      No active notices at the moment.
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="bg-gray-50 p-4 text-center border-t border-gray-100">
            <Link
              to="/all-notifications"
              className="inline-flex items-center gap-2 text-blue-600 font-bold hover:text-blue-800 transition-colors"
            >
              View All Notifications
              <FaArrowRight className="text-sm" />
            </Link>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes scroll-slow {
          0% { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }
        .animate-scroll-slow {
          animation: scroll-slow 25s linear infinite;
        }
      `}</style>
    </section>
  );
}
