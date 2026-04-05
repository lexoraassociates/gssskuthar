import { useState, useEffect } from "react";
import { FaBullhorn, FaArrowRight, FaBolt } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function NoticeBoard() {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  // --- LOGIC: Check if notice is less than 5 days old ---
  const isNew = (dateString) => {
    const noticeDate = new Date(dateString);
    const today = new Date();
    const diffTime = Math.abs(today - noticeDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 5;
  };

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
            setNotices(dataArray.slice(0, 10));
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
        </div>

        <div className="bg-white border border-blue-100 rounded-3xl shadow-2xl overflow-hidden max-w-4xl mx-auto">
          {/* Header */}
          <div className="bg-blue-600 p-5 flex items-center justify-between text-white">
            <div className="flex items-center gap-3">
              <FaBullhorn className="text-2xl animate-pulse" />
              <h3 className="text-xl font-bold">Latest Updates</h3>
            </div>
          </div>

          <div className="p-4 relative">
            <div
              className="h-64 overflow-hidden relative rounded-xl"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              {loading ? (
                <div className="flex items-center justify-center h-full text-blue-600 font-bold">
                  Loading Notifications...
                </div>
              ) : (
                <div
                  className="animate-scroll-slow space-y-4 py-2"
                  style={{
                    animationPlayState: isPaused ? "paused" : "running",
                  }}
                >
                  {[...notices, ...notices].map((item, index) => (
                    /* Har notice row ko Link bana diya gaya hai */
                    <Link
                      key={`${item.id}-${index}`}
                      to="/all-notifications"
                      className="block group"
                    >
                      <div className="bg-blue-50/50 hover:bg-white hover:shadow-lg p-5 rounded-2xl border border-blue-100/50 transition-all flex flex-col md:flex-row justify-between md:items-center gap-3 border-l-4 border-l-transparent hover:border-l-blue-600">
                        <div className="flex gap-3 items-start">
                          {/* New Badge logic */}
                          {isNew(item.event_date) ? (
                            <span className="flex items-center gap-1 bg-red-600 text-[10px] text-white px-2 py-0.5 rounded-full font-black animate-pulse uppercase shrink-0">
                              <FaBolt className="text-[8px]" /> New
                            </span>
                          ) : (
                            <span className="mt-1.5 h-2.5 w-2.5 rounded-full bg-blue-400 group-hover:bg-blue-600 transition-colors shrink-0"></span>
                          )}

                          <p className="text-gray-700 font-semibold leading-relaxed group-hover:text-blue-700 transition-colors">
                            {item.heading}
                          </p>
                        </div>

                        <div className="flex items-center gap-4">
                          <span className="text-[11px] uppercase tracking-widest text-blue-600 font-black bg-blue-100 px-3 py-1 rounded-full w-fit whitespace-nowrap">
                            {new Date(item.event_date).toLocaleDateString(
                              "en-GB",
                              {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                              },
                            )}
                          </span>
                          {/* Chota arrow jo sirf hover par dikhega */}
                          <FaArrowRight className="text-blue-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all hidden md:block" />
                        </div>
                      </div>
                    </Link>
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
              View All Notifications <FaArrowRight className="text-sm" />
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
