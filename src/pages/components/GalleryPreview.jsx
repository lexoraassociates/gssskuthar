export default function GalleryPreview() {
  const images = [
    `${import.meta.env.BASE_URL}images/school/img1.jpeg`,
    `${import.meta.env.BASE_URL}images/school/img12.jpeg`,
    `${import.meta.env.BASE_URL}images/school/img21.jpeg`,
    `${import.meta.env.BASE_URL}images/school/img4.jpeg`,
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-blue-700">
          School Gallery
        </h2>
        <p className="text-gray-600 mt-2 text-lg">
          A glimpse of our vibrant school environment
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6">
        {images.map((img, index) => (
          <div
            key={index}
            className="overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-1 animate-fadeSlideSlow"
          >
            <img
              src={img}
              alt="School Gallery"
              className="w-full h-48 object-cover transition-transform duration-500 hover:scale-110"
            />
          </div>
        ))}
      </div>

      <div className="text-center mt-10">
        <a
          href="/gallery"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-lg font-semibold shadow-lg transition"
        >
          View Full Gallery
        </a>
      </div>
    </section>
  );
}
