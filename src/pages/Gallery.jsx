import { useState, useEffect, useRef } from "react";
import {
  FaExpand,
  FaTimes,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

export default function Gallery() {
  const [dbImages, setDbImages] = useState([]);
  const [displayImages, setDisplayImages] = useState([]);
  const [categories, setCategories] = useState(["All"]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  const [visibleCount, setVisibleCount] = useState(12);
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const loaderRef = useRef(null);

  // Helper function to fix Image URLs
  const getFullImageUrl = (path) => {
    if (!path) return "";
    // Agar URL already full hai (http se shuru ho raha hai) toh wahi rakho
    if (path.startsWith("http")) return path;
    // Warna domain add karo (dhyan rahe slash double na ho jaye)
    return `https://test9.online${path.startsWith("/") ? "" : "/"}${path}`;
  };

  // 1. Fetch Data from Backend
  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const res = await fetch("https://test9.online/api/management/gallery/");
        if (res.ok) {
          const data = await res.json();
          setDbImages(data);

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
        // Kam se kam 60 images dikhane ka logic
        while (finalDisplay.length < 60) {
          finalDisplay = [...finalDisplay, ...filtered];
        }
        finalDisplay = finalDisplay.slice(0, 60);
      } else {
        finalDisplay = filtered;
      }
    }

    setDisplayImages(finalDisplay);
    setVisibleCount(12);
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
    setSelectedImage(getFullImageUrl(displayImages[index].image));
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
          <h2 className="text-4xl md:text-5xl font-black text-blue-900 mb-4 tracking-tight text-shadow-sm">
            Our School Life
          </h2>
          <div className="h-1.5 w-20 bg-blue-600 mx-auto rounded-full mb-6 shadow-md"></div>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg font-medium italic">
            "Capturing the vibrant moments of GSSS Kuthar - Where memories are
            made."
          </p>
        </div>

        {/* Categories Bar */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-8 py-2.5 rounded-2xl font-bold transition-all duration-300 transform active:scale-95 shadow-sm ${
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
              key={`${img.id}-${index}`}
              onClick={() => openLightbox(index)}
              className="relative group overflow-hidden rounded-[2.5rem] bg-white border-4 border-white shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer"
            >
              <img
                src={getFullImageUrl(img.image)}
                alt={img.title}
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-2"
                loading="lazy"
              />
              {/* Hover Overlay - Beautified */}
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/90 via-blue-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                <span className="text-blue-300 text-xs font-black uppercase tracking-[0.2em] mb-2 drop-shadow-md">
                  {img.category}
                </span>
                <h4 className="text-white font-black text-2xl mb-4 tracking-tight drop-shadow-lg">
                  {img.title}
                </h4>
                <div className="h-12 w-12 bg-white/20 backdrop-blur-lg border border-white/30 rounded-full flex items-center justify-center text-white transition-transform duration-300 group-hover:scale-110">
                  <FaExpand size={18} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Scroll Sentinel */}
        {visibleCount < displayImages.length && (
          <div ref={loaderRef} className="py-20 text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent shadow-lg"></div>
            <p className="mt-4 text-blue-600 font-bold animate-pulse uppercase tracking-widest text-xs">
              Discovering More Moments
            </p>
          </div>
        )}

        {/* Modern Lightbox */}
        {selectedImage && (
          <div className="fixed inset-0 bg-blue-950/95 backdrop-blur-2xl flex items-center justify-center z-[100] p-4 transition-all duration-500">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-8 right-8 text-white/50 hover:text-white text-4xl transition-all hover:rotate-90 p-2"
            >
              <FaTimes />
            </button>

            <div className="relative max-w-5xl w-full flex items-center justify-center group/lightbox">
              <img
                src={selectedImage}
                className="max-w-full max-h-[80vh] rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] border-8 border-white/5 object-contain animate-zoomIn"
                alt="Full resolution"
              />
            </div>

            {/* Navigation Controls */}
            <div className="absolute bottom-12 flex gap-8">
              <button
                onClick={() => {
                  const idx =
                    (currentIndex - 1 + displayImages.length) %
                    displayImages.length;
                  setSelectedImage(getFullImageUrl(displayImages[idx].image));
                  setCurrentIndex(idx);
                }}
                className="h-16 w-16 rounded-2xl bg-white/5 hover:bg-blue-600 text-white flex items-center justify-center backdrop-blur-xl border border-white/10 transition-all hover:shadow-2xl hover:shadow-blue-500/20 active:scale-90"
              >
                <FaChevronLeft size={28} />
              </button>
              <button
                onClick={() => {
                  const idx = (currentIndex + 1) % displayImages.length;
                  setSelectedImage(getFullImageUrl(displayImages[idx].image));
                  setCurrentIndex(idx);
                }}
                className="h-16 w-16 rounded-2xl bg-white/5 hover:bg-blue-600 text-white flex items-center justify-center backdrop-blur-xl border border-white/10 transition-all hover:shadow-2xl hover:shadow-blue-500/20 active:scale-90"
              >
                <FaChevronRight size={28} />
              </button>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes zoomIn {
          from { opacity: 0; transform: scale(0.95) translateY(20px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        .animate-zoomIn { animation: zoomIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .text-shadow-sm { text-shadow: 0 2px 4px rgba(0,0,0,0.1); }
      `}</style>
    </section>
  );
}
