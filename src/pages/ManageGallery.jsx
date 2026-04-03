import { useState } from "react";
import { fetchWithAuth } from "../api"; // Path: src/pages/ManageGallery.jsx se src/api.js tak

export default function ManageGallery() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("sports");
  const [images, setImages] = useState([]); // Array for multiple files
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const categories = [
    { value: "sports", label: "Sports" },
    { value: "cultural", label: "Cultural Events" },
    { value: "campus", label: "Campus Life" },
    { value: "labs", label: "Science Labs" },
  ];

  const handleUpload = async (e) => {
    e.preventDefault();
    if (images.length === 0) {
      alert("Please select at least one image!");
      return;
    }

    setLoading(true);
    setMessage("");

    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);

    // Multiple files ko 'images' key ke saath append karein
    for (let i = 0; i < images.length; i++) {
      formData.append("images", images[i]);
    }

    try {
      // DHAYAN DEIN: Yahan headers ko options se hata diya hai,
      // taaki api.js FormData detect karke boundary khud lagne de.
      const res = await fetchWithAuth(
        "https://test9.online/api/management/gallery/upload/",
        {
          method: "POST",
          body: formData,
        },
      );

      if (res && res.ok) {
        setMessage(`${images.length} Photos uploaded successfully! ✅`);
        setTitle("");
        setCategory("sports");
        setImages([]);
        // Input field ko UI par reset karne ke liye
        document.getElementById("file-input").value = "";
      } else {
        // Agar status 400 ya kuch aur hai, toh server error message dikhayenge
        const errorData = await res.json();
        console.error("Upload Error Details:", errorData);
        setMessage("Upload failed. Check file size or server logs.");
      }
    } catch (err) {
      console.error("Connection Error:", err);
      setMessage("Server Connection Error!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-3xl shadow-xl border border-pink-50/50 animate-fadeIn">
      <div className="flex items-center gap-3 mb-6 border-b pb-4">
        <span className="text-3xl">📸</span>
        <h2 className="text-2xl font-black text-gray-800">
          Bulk Gallery Upload
        </h2>
      </div>

      {message && (
        <div
          className={`mb-6 p-4 rounded-2xl text-sm font-bold shadow-sm ${
            message.includes("successfully")
              ? "bg-green-50 text-green-700 border border-green-100"
              : "bg-red-50 text-red-700 border border-red-100"
          }`}
        >
          {message}
        </div>
      )}

      <form onSubmit={handleUpload} className="space-y-6">
        {/* Base Title Input */}
        <div>
          <label
            htmlFor="base-title"
            className="block text-xs font-bold text-gray-400 uppercase ml-1 mb-1"
          >
            Base Title (System will add _1, _2...)
          </label>
          <input
            id="base-title"
            type="text"
            required
            className="w-full p-4 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-pink-500 bg-gray-50 transition-all"
            placeholder="e.g. Sports_Meet"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {/* Category Select */}
        <div>
          <label
            htmlFor="category-select"
            className="block text-xs font-bold text-gray-400 uppercase ml-1 mb-1"
          >
            Select Category
          </label>
          <select
            id="category-select"
            className="w-full p-4 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-pink-500 bg-gray-50 cursor-pointer"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>

        {/* Multiple File Input */}
        <div>
          <label
            htmlFor="file-input"
            className="block text-xs font-bold text-gray-400 uppercase ml-1 mb-1"
          >
            Select Multiple Images
          </label>
          <div className="relative border-2 border-dashed border-gray-200 rounded-2xl p-6 bg-gray-50 hover:bg-gray-100 transition-all text-center">
            <input
              id="file-input"
              type="file"
              accept="image/*"
              multiple
              required
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              onChange={(e) => setImages(Array.from(e.target.files))}
            />
            <div className="space-y-1">
              <p className="text-sm text-gray-600 font-medium">
                {images.length > 0
                  ? `Selected: ${images.length} files`
                  : "Click to select multiple photos"}
              </p>
              <p className="text-xs text-gray-400">Supports JPG, PNG, WEBP</p>
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-pink-600 hover:bg-pink-700 text-white font-black py-4 rounded-2xl shadow-lg shadow-pink-100 disabled:bg-gray-300 transition-all active:scale-95"
        >
          {loading
            ? `Uploading ${images.length} photos...`
            : "Upload All Photos"}
        </button>
      </form>
    </div>
  );
}
