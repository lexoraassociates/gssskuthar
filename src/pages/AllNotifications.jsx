import { useState, useEffect } from "react";
import { FaBullhorn, FaCalendarAlt, FaChevronLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function AllNotifications() {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllNotices = async () => {
      try {
        // Hum wahi manage_notifications wala GET endpoint use karenge
        const res = await fetch(
          "https://test9.online/api/management/notifications/",
        );
        if (res.ok) {
          const data = await res.json();
          setNotices(data); // Saare notices set karenge
        }
      } catch (err) {
        console.error("Error fetching all notices:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAllNotices();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin h-10 w-10 border-4 border-blue-600 border-t-transparent rounded-full"></div>
        <span className="ml-3 font-bold text-gray-600">
          Loading Official Notices...
        </span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header Banner */}
      {/* Header Banner - Height Reduced */}
      <div className="bg-blue-700 pt-20 pb-12 px-6 text-center text-white relative overflow-hidden">
        {/* Background Icon - Adjusted Position */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <FaBullhorn className="text-[150px] -rotate-12 -translate-x-16 -translate-y-10" />
        </div>

        <div className="max-w-4xl mx-auto relative z-10">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-blue-100 hover:text-white mb-4 transition-colors font-medium text-sm"
          >
            <FaChevronLeft className="text-xs" /> Back to Home
          </Link>
          <h1 className="text-3xl md:text-4xl font-black mb-2 tracking-tight">
            Official Notifications
          </h1>
          <p className="text-blue-100 text-sm md:text-base max-w-xl mx-auto opacity-90">
            GSSS Kuthar ke sabhi mukhya nirdesh aur suchnayein.
          </p>
        </div>
      </div>

      {/* Notices Timeline List */}
      <div className="max-w-4xl mx-auto px-6 mt-8">
        <div className="space-y-6">
          {notices.length > 0 ? (
            notices.map((notice, index) => (
              <div
                key={notice.id}
                className="bg-white rounded-3xl shadow-xl shadow-blue-900/5 p-6 md:p-8 border border-gray-100 hover:border-blue-200 transition-all group animate-fadeIn"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex flex-col md:flex-row justify-between md:items-start gap-4">
                  <div className="space-y-3 flex-1">
                    <div className="flex items-center gap-3">
                      <span className="bg-blue-100 text-blue-700 p-2 rounded-xl">
                        <FaBullhorn />
                      </span>
                      <h3 className="text-xl md:text-2xl font-bold text-gray-800 group-hover:text-blue-700 transition-colors">
                        {notice.heading}
                      </h3>
                    </div>
                    <p className="text-gray-600 leading-relaxed text-sm md:text-base whitespace-pre-wrap">
                      {notice.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-2xl border border-gray-100 self-start">
                    <FaCalendarAlt className="text-blue-500 text-sm" />
                    <span className="text-xs md:text-sm font-black text-gray-500 uppercase tracking-tighter">
                      {new Date(notice.event_date).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white rounded-3xl p-20 text-center shadow-lg border border-dashed border-gray-200">
              <p className="text-gray-400 font-bold text-xl">
                No Notifications Found.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
