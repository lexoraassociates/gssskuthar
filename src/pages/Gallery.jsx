import { useState, useEffect, useRef } from "react";

export default function Gallery() {
  const allImages = [
    {
      url: `${import.meta.env.BASE_URL}images/school/img1.jpeg`,
      category: "Events",
    },
    {
      url: `${import.meta.env.BASE_URL}images/school/img2.jpeg`,
      category: "Sports",
    },
    {
      url: `${import.meta.env.BASE_URL}images/school/img3.jpeg`,
      category: "Cultural",
    },
    {
      url: `${import.meta.env.BASE_URL}images/school/img4.jpeg`,
      category: "Labs",
    },
    {
      url: `${import.meta.env.BASE_URL}images/school/img5.jpeg`,
      category: "Events",
    },
    {
      url: `${import.meta.env.BASE_URL}images/school/img6.jpeg`,
      category: "Sports",
    },
    {
      url: `${import.meta.env.BASE_URL}images/school/img7.jpeg`,
      category: "Cultural",
    },
    {
      url: `${import.meta.env.BASE_URL}images/school/img8.jpeg`,
      category: "Labs",
    },
    {
      url: `${import.meta.env.BASE_URL}images/school/img9.jpeg`,
      category: "Events",
    },
    {
      url: `${import.meta.env.BASE_URL}images/school/img10.jpeg`,
      category: "Sports",
    },
    {
      url: `${import.meta.env.BASE_URL}images/school/img11.jpeg`,
      category: "Cultural",
    },
    {
      url: `${import.meta.env.BASE_URL}images/school/img12.jpeg`,
      category: "Labs",
    },
    {
      url: `${import.meta.env.BASE_URL}images/school/img13.jpeg`,
      category: "Cultural",
    },
    {
      url: `${import.meta.env.BASE_URL}images/school/img14.jpeg`,
      category: "Labs",
    },
    {
      url: `${import.meta.env.BASE_URL}images/school/img15.jpeg`,
      category: "Events",
    },
    {
      url: `${import.meta.env.BASE_URL}images/school/img16.jpeg`,
      category: "Sports",
    },
    {
      url: `${import.meta.env.BASE_URL}images/school/img17.jpeg`,
      category: "Cultural",
    },
    {
      url: `${import.meta.env.BASE_URL}images/school/img18.jpeg`,
      category: "Labs",
    },
    {
      url: `${import.meta.env.BASE_URL}images/school/img19.jpeg`,
      category: "Events",
    },
    {
      url: `${import.meta.env.BASE_URL}images/school/img20.jpeg`,
      category: "Events",
    },
    {
      url: `${import.meta.env.BASE_URL}images/school/img21.jpeg`,
      category: "Sports",
    },
    {
      url: `${import.meta.env.BASE_URL}images/school/img22.jpeg`,
      category: "Cultural",
    },
    {
      url: `${import.meta.env.BASE_URL}images/school/img23.jpeg`,
      category: "Labs",
    },
  ];

  const categories = ["All", "Events", "Sports", "Cultural", "Labs"];
  const [activeCategory, setActiveCategory] = useState("All");
  const [filteredImages, setFilteredImages] = useState(allImages);
  const [visibleCount, setVisibleCount] = useState(6);
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const loaderRef = useRef(null);

  // Filter Logic
  useEffect(() => {
    const filtered =
      activeCategory === "All"
        ? allImages
        : allImages.filter((img) => img.category === activeCategory);

    setFilteredImages(filtered);
    setVisibleCount(6); // Reset count on category change
  }, [activeCategory]);

  const visibleImages = Array.from({ length: visibleCount }).map((_, i) => {
    return filteredImages[i % filteredImages.length];
  });

  // Infinite Scroll Logic - Fixed
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        // Yahan condition lagayi hai: 23 * 3 = 69 images tak hi chalega
        if (first.isIntersecting && visibleCount < filteredImages.length * 3) {
          setTimeout(() => {
            setVisibleCount((prev) => prev + 3);
          }, 300);
        }
      },
      {
        threshold: 0.1,
        rootMargin: "100px",
      },
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => observer.disconnect();
  }, [visibleCount, filteredImages.length]);

  const openLightbox = (index) => {
    setSelectedImage(visibleImages[index].url);
    setCurrentIndex(index);
  };

  const closeLightbox = () => setSelectedImage(null);

  const showNext = () => {
    const nextIndex = (currentIndex + 1) % visibleImages.length;
    setSelectedImage(visibleImages[nextIndex].url);
    setCurrentIndex(nextIndex);
  };

  const showPrev = () => {
    const prevIndex =
      (currentIndex - 1 + visibleImages.length) % visibleImages.length;
    setSelectedImage(visibleImages[prevIndex].url);
    setCurrentIndex(prevIndex);
  };

  // Keyboard Support
  useEffect(() => {
    const handleKey = (e) => {
      if (!selectedImage) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") showNext();
      if (e.key === "ArrowLeft") showPrev();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [selectedImage, currentIndex, visibleImages.length]);

  return (
    <section className="py-24 bg-pink-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold text-pink-700">School Gallery</h2>
          <p className="text-gray-600 mt-2 text-lg">
            Explore moments from different school activities
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2 rounded-full border transition-all duration-300 ${
                activeCategory === cat
                  ? "bg-pink-600 text-white shadow-lg"
                  : "bg-white text-pink-700 border-pink-300 hover:bg-pink-100"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Masonry Gallery */}
        <div className="columns-1 sm:columns-2 md:columns-3 gap-4 space-y-4">
          {visibleImages.map((img, index) => (
            <div
              key={index} // Yahan index use karna sahi hai kyunki images repeat ho rahi hain
              onClick={() => openLightbox(index)}
              className="overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-1 cursor-pointer break-inside-avoid animate-fadeSlideSlow"
            >
              <img
                src={img.url}
                alt={`School Gallery ${index}`}
                className="w-full object-cover transition-transform duration-500 hover:scale-110"
                loading="lazy"
              />
            </div>
          ))}
        </div>

        {/* Sentinel - Loading Spinner */}
        {visibleCount < filteredImages.length * 3 && (
          <div
            ref={loaderRef}
            className="h-24 flex items-center justify-center mt-10"
          >
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-600"></div>
            <span className="ml-3 text-pink-600 font-medium text-lg">
              Loading more photos...
            </span>
          </div>
        )}

        {/* Lightbox */}
        {selectedImage && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 text-white text-4xl"
            >
              ✕
            </button>
            <button
              onClick={showPrev}
              className="absolute left-6 text-white text-5xl hover:text-pink-300"
            >
              ❮
            </button>
            <img
              src={selectedImage}
              alt="Full View"
              className="max-w-full max-h-[85vh] rounded-lg shadow-2xl"
            />
            <button
              onClick={showNext}
              className="absolute right-6 text-white text-5xl hover:text-pink-300"
            >
              ❯
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
