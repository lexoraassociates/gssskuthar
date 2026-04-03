import { useState, useEffect, useRef } from "react";
import {
  FaExpand,
  FaTimes,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

export default function Gallery() {
  const [dbImages, setDbImages] = useState([]); // Database se aayi original images
  const [displayImages, setDisplayImages] = useState([]); // UI mein dikhne waali (Repeated if needed)
  const [categories, setCategories] = useState(["All"]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  const [visibleCount, setVisibleCount] = useState(12); // Initial visible
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const loaderRef = useRef(null);

  // 1. Fetch Data from Backend
  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const res = await fetch("https://test9.online/api/management/gallery/");
        if (res.ok) {
          const data = await res.json();
          setDbImages(data);

          // Unique Categories nikalna (Database se)
          const cats = ["All", ...new Set(data.map((img) => img.category))];
          setCategories(cats);
        }
      } catch (err) {
        console.error("Gallery fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchGallery();
  }, []);

  // 2. Logic: Repeat images if < 40 to make it 60
  useEffect(() => {
    let filtered =
      activeCategory === "All"
        ? dbImages
        : dbImages.filter((img) => img.category === activeCategory);

    let finalDisplay = [];

    if (filtered.length > 0) {
      if (filtered.length < 40) {
        // Agar 40 se kam hain, to repeat karke kam se kam 60 banao
        while (finalDisplay.length < 60) {
          finalDisplay = [...finalDisplay, ...filtered];
        }
        finalDisplay = finalDisplay.slice(0, 60); // Exact 60 par kaat do
      } else {
        // Agar 40 ya usse zyada hain, to repeat nahi karna
        finalDisplay = filtered;
      }
    }

    setDisplayImages(finalDisplay);
    setVisibleCount(12); // Reset scroll count
  }, [dbImages, activeCategory]);

  // 3. Infinite Scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && visibleCount < displayImages.length) {
          setTimeout(() => setVisibleCount((prev) => prev + 6), 300);
        }
      },
      { threshold: 0.1 },
    );
    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [visibleCount, displayImages]);

  const openLightbox = (index) => {
    setSelectedImage(displayImages[index].image);
    setCurrentIndex(index);
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-bounce text-blue-600 font-black text-2xl">
          Loading Gallery...
        </div>
      </div>
    );

  return (
    <section className="py-24 bg-gradient-to-b from-white to-blue-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        {/* Title Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-blue-900 mb-4 tracking-tight">
            Our School Life
          </h2>
          <div className="h-1.5 w-20 bg-blue-600 mx-auto rounded-full mb-6"></div>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg font-medium">
            Moments captured at GSSS Kuthar - From sports to academic
            excellence.
          </p>
        </div>

        {/* Categories Bar */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-8 py-2.5 rounded-2xl font-bold transition-all duration-300 transform active:scale-95 ${
                activeCategory === cat
                  ? "bg-blue-600 text-white shadow-xl shadow-blue-200 -translate-y-1"
                  : "bg-white text-gray-600 hover:bg-blue-50 border border-gray-100"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Interactive Masonry Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {displayImages.slice(0, visibleCount).map((img, index) => (
            <div
              key={index}
              onClick={() => openLightbox(index)}
              className="relative group overflow-hidden rounded-[2rem] bg-white border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 cursor-pointer"
            >
              <img
                src={img.image}
                alt={img.title}
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-1"
                loading="lazy"
              />
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                <span className="text-blue-200 text-xs font-bold uppercase tracking-widest mb-1">
                  {img.category}
                </span>
                <h4 className="text-white font-bold text-xl">{img.title}</h4>
                <div className="mt-4 h-10 w-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white">
                  <FaExpand />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Scroll Sentinel */}
        {visibleCount < displayImages.length && (
          <div ref={loaderRef} className="py-20 text-center">
            <div className="inline-block animate-spin rounded-full h-10 w-10 border-4 border-blue-600 border-t-transparent"></div>
          </div>
        )}

        {/* Modern Lightbox */}
        {selectedImage && (
          <div className="fixed inset-0 bg-blue-950/95 backdrop-blur-xl flex items-center justify-center z-[100] p-4">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-8 right-8 text-white/50 hover:text-white text-3xl transition-colors"
            >
              <FaTimes />
            </button>

            <img
              src={selectedImage}
              className="max-w-full max-h-[85vh] rounded-2xl shadow-2xl border-4 border-white/10 object-contain animate-zoomIn"
            />

            <div className="absolute bottom-10 flex gap-6">
              <button
                onClick={() => {
                  const idx =
                    (currentIndex - 1 + displayImages.length) %
                    displayImages.length;
                  setSelectedImage(displayImages[idx].image);
                  setCurrentIndex(idx);
                }}
                className="h-14 w-14 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center backdrop-blur-md transition-all"
              >
                <FaChevronLeft size={24} />
              </button>
              <button
                onClick={() => {
                  const idx = (currentIndex + 1) % displayImages.length;
                  setSelectedImage(displayImages[idx].image);
                  setCurrentIndex(idx);
                }}
                className="h-14 w-14 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center backdrop-blur-md transition-all"
              >
                <FaChevronRight size={24} />
              </button>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes zoomIn {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-zoomIn { animation: zoomIn 0.3s ease-out forwards; }
      `}</style>
    </section>
  );
}
