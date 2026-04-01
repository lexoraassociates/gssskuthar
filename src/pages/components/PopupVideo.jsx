import { useEffect, useState } from "react";

export default function PopupVideo() {
  const [show, setShow] = useState(false);

  // 1. Apni YouTube Video ki ID yahan daalein
  // Agar link ye hai: https://www.youtube.com/watch?v=ABC123xyz
  // Toh ID hai: ABC123xyz
  const youtubeVideoId = "idFLKnlVFkE";

  useEffect(() => {
    // Page load hone ke 1 second baad popup dikhayega
    const timer = setTimeout(() => setShow(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[9999]">
      <div className="bg-white rounded-xl shadow-2xl p-2 w-[95%] max-w-2xl relative animate-fadeSlideSlow">
        {/* Close Button */}
        <button
          onClick={() => setShow(false)}
          className="absolute -top-4 -right-4 bg-red-600 text-white w-10 h-10 rounded-full flex items-center justify-center shadow-xl hover:bg-red-700 transition-colors z-50 border-2 border-white"
        >
          ✕
        </button>

        {/* YouTube Video Wrapper (16:9 Aspect Ratio) */}
        <div className="relative pt-[56.25%] overflow-hidden rounded-lg">
          <iframe
            className="absolute top-0 left-0 w-full h-full"
            src={`https://www.youtube.com/embed/${youtubeVideoId}?autoplay=1&rel=0`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
}
