import { useState } from "react";
import { fetchWithAuth } from "../../api";

export default function ManageNotifications() {
  const [formData, setFormData] = useState({
    heading: "",
    description: "",
    event_date: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      // fetchWithAuth ka use kar rahe hain jo auto-logout handle karega
      const res = await fetchWithAuth(
        "https://test9.online/api/management/notifications/",
        {
          method: "POST",
          body: JSON.stringify(formData),
        },
      );

      if (res && res.ok) {
        setMessage("Notice published successfully! 📢");
        setFormData({ heading: "", description: "", event_date: "" });
      } else if (res) {
        const errorData = await res.json();
        console.error("Notice Error:", errorData);
        setMessage("Failed to publish notice. Please check all fields.");
      }
    } catch (err) {
      console.error("Submission error:", err);
      setMessage("Server Connection Error!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded-3xl shadow-xl border border-blue-50/50 animate-fadeIn">
      <div className="flex items-center gap-3 mb-6 border-b pb-4">
        <span className="text-3xl">📢</span>
        <h2 className="text-2xl font-black text-gray-800">
          Post New Notification
        </h2>
      </div>

      {message && (
        <div
          className={`mb-6 p-4 rounded-2xl text-sm font-bold flex items-center gap-2 ${
            message.includes("successfully")
              ? "bg-green-50 text-green-700 border border-green-100"
              : "bg-red-50 text-red-700 border border-red-100"
          }`}
        >
          {message.includes("successfully") ? "✨" : "⚠️"} {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-xs font-bold text-gray-400 uppercase ml-1 mb-1">
            Notice Heading
          </label>
          <input
            type="text"
            required
            className="w-full p-4 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 transition-all"
            placeholder="e.g. Annual Function on 15th April"
            value={formData.heading}
            onChange={(e) =>
              setFormData({ ...formData, heading: e.target.value })
            }
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-400 uppercase ml-1 mb-1">
            Event / Notice Date
          </label>
          <input
            type="date"
            required
            className="w-full p-4 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 transition-all"
            value={formData.event_date}
            onChange={(e) =>
              setFormData({ ...formData, event_date: e.target.value })
            }
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-400 uppercase ml-1 mb-1">
            Detailed Description
          </label>
          <textarea
            rows="5"
            required
            className="w-full p-4 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 transition-all resize-none"
            placeholder="Provide full details of the notice here..."
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-4 rounded-2xl transition-all shadow-lg shadow-blue-100 disabled:bg-gray-300 disabled:shadow-none active:scale-95"
        >
          {loading ? "Publishing Notice..." : "Post to Notice Board"}
        </button>
      </form>
    </div>
  );
}
