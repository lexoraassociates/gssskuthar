export default function Contact() {
  return (
    <section className="py-24 bg-pink-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-pink-700">Contact Us</h2>
          <p className="text-gray-600 mt-2 text-lg">
            We would love to hear from you
          </p>
        </div>

        {/* GRID */}
        <div className="grid md:grid-cols-2 gap-12">
          {/* LEFT SIDE – CONTACT DETAILS */}
          <div className="bg-white/60 backdrop-blur-xl p-8 rounded-2xl shadow-xl border border-pink-200 animate-fadeSlideSlow">
            <h3 className="text-2xl font-semibold text-pink-700 mb-6">
              Get in Touch
            </h3>

            <p className="text-gray-700 mb-4">
              <strong>Address:</strong>
              <br />
              Government Senior Secondary School Kuthar,
              <br />
              District Solan, Himachal Pradesh – 173236
            </p>

            <p className="text-gray-700 mb-4">
              <strong>Phone:</strong> +91‑94184 70900
            </p>

            <p className="text-gray-700 mb-6">
              <strong>Email:</strong> prikuthar@gmail.com
            </p>

            {/* MAP */}
            <div className="rounded-xl overflow-hidden shadow-lg border border-pink-200">
              <iframe
                title="GSSS Kuthar Map"
                src="https://www.google.com/maps?q=Government+Senior+Secondary+School+Kuthar+Solan+Himachal+Pradesh&output=embed"
                width="100%"
                height="300"
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>
          </div>

          {/* RIGHT SIDE – CONTACT FORM */}
          <div className="bg-white/60 backdrop-blur-xl p-8 rounded-2xl shadow-xl border border-pink-200 animate-fadeSlideSlow">
            <h3 className="text-2xl font-semibold text-pink-700 mb-6">
              Send a Message
            </h3>

            <form
              className="space-y-5"
              onSubmit={async (e) => {
                e.preventDefault();

                const formData = {
                  name: e.target.name.value,
                  email: e.target.email.value,
                  message: e.target.message.value,
                };

                const res = await fetch(
                  "http://localhost:8000/api/contact/submit/",
                  {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(formData),
                  },
                );

                const data = await res.json();
                alert(data.message);
              }}
            >
              <div>
                <label className="block text-gray-700 mb-1">Your Name</label>
                <input
                  name="name"
                  type="text"
                  className="w-full p-3 rounded-lg border border-pink-300 focus:ring-2 focus:ring-pink-400 outline-none"
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-1">Email</label>
                <input
                  name="email"
                  type="email"
                  className="w-full p-3 rounded-lg border border-pink-300 focus:ring-2 focus:ring-pink-400 outline-none"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-1">Message</label>
                <textarea
                  name="message"
                  rows="5"
                  className="w-full p-3 rounded-lg border border-pink-300 focus:ring-2 focus:ring-pink-400 outline-none"
                  placeholder="Write your message..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-pink-600 text-white py-3 rounded-lg shadow-md hover:bg-pink-700 hover:shadow-lg transition"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
