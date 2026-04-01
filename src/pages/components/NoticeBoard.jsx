import { FaBullhorn } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function NoticeBoard() {
  const notices = [
    {
      id: 1,
      text: "Annual Examination will start from 3rd March 2026.",
      date: "10 Feb 2026",
    },
    {
      id: 2,
      text: "PTM for all classes scheduled on 28th February.",
      date: "08 Feb 2026",
    },
    {
      id: 3,
      text: "New admission forms are now available online.",
      date: "01 Feb 2026",
    },
    {
      id: 4,
      text: "School will remain closed on 26th Jan (Republic Day).",
      date: "20 Jan 2026",
    },
    {
      id: 5,
      text: "School Annual result will be declared on 31st March 2026.",
      date: "28 March 2026",
    },
    {
      id: 6,
      text: "New Session will start from 1st April 2026. English Medium will be started from class 6th.",
      date: "28 March 2026",
    },
    {
      id: 7,
      text: "",
      date: "",
    },
    {
      id: 7,
      text: "",
      date: "",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-700">
            Notice Board
          </h2>
          <p className="text-gray-600 mt-2 text-lg">
            Latest updates and important announcements
          </p>
        </div>

        {/* Notice Board Box */}
        <div className="bg-blue-50 border-l-4 border-blue-600 rounded-lg shadow p-6 max-w-4xl mx-auto">
          {/* Icon */}
          <div className="flex items-center gap-3 mb-4">
            <FaBullhorn className="text-blue-600 text-3xl" />
            <h3 className="text-2xl font-bold text-blue-700">Latest Notices</h3>
            <Link
              to="/apply-now"
              className="ml-auto text-sm text-blue-600 font-semibold"
            >
              {" "}
              Admissions Open from class 6-12(01-04-2026 to 10-04-2026)
            </Link>
          </div>

          {/* Scrolling Notices */}
          <div className="overflow-hidden h-40 relative">
            <div className="animate-scroll space-y-4 group group-hover:[animation-play-state:paused]">
              {[...notices].reverse().map((item) => (
                <div
                  key={item.id}
                  className="bg-white p-4 rounded-lg shadow flex justify-between items-center animate-fadeSlideSlow"
                >
                  <p className="text-gray-700 font-medium">{item.text}</p>
                  <span className="text-sm text-blue-600 font-semibold">
                    {item.date}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
