import React from "react";
import { FaHistory, FaLandmark, FaGraduationCap } from "react-icons/fa";

export default function History() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-pink-700 pt-32 pb-20 px-6 text-center text-white relative">
        <h1 className="text-4xl md:text-5xl font-black mb-4">
          Our Rich History
        </h1>
        <p className="text-pink-100 max-w-2xl mx-auto text-lg">
          GSSS Kuthar (Solan) - Decades of excellence in education and character
          building.
        </p>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-pink-900 mb-6 flex items-center gap-3">
              <FaLandmark className="text-pink-600" /> The Foundation
            </h2>
            <div className="space-y-4 text-gray-600 leading-relaxed text-lg">
              <p>
                GSSS Kuthar ki neev Himachal Pradesh ke Solan zile mein ek aise
                waqt mein rakhi gayi thi jab is kshetra mein gunvatta wali
                shiksha (quality education) ki bahut kami thi.
              </p>
              <p>
                Ek chhote se kamre se shuru hua ye safar aaj ek vishal building
                aur hazaron kamyab students ke saath aage badh raha hai. Hamara
                school hamesha se hi sanskar aur shiksha ka sangam raha hai.
              </p>
            </div>
          </div>
          <div className="bg-pink-50 p-8 rounded-[3rem] border-2 border-dashed border-pink-200">
            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="h-12 w-12 bg-pink-600 rounded-2xl flex items-center justify-center text-white shrink-0 shadow-lg">
                  <FaHistory />
                </div>
                <div>
                  <h4 className="font-bold text-pink-900">Established Year</h4>
                  <p className="text-gray-500">
                    Serving the community for many glorious years.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="h-12 w-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white shrink-0 shadow-lg">
                  <FaGraduationCap />
                </div>
                <div>
                  <h4 className="font-bold text-blue-900">Growth</h4>
                  <p className="text-gray-500">
                    From a primary setup to a full-fledged Senior Secondary
                    School.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
