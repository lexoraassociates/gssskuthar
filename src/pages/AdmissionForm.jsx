import { useState, useEffect } from "react";
import FileUpload from "./components/fileUpload";

export default function AdmissionForm() {
  const [step, setStep] = useState(0); // 0 se shuru hoga (Instructions Screen)
  const [appNumber, setAppNumber] = useState("");
  const [fileErrors, setFileErrors] = useState({});
  const [isAgreed, setIsAgreed] = useState(false); // Checkbox ke liye
  const [submissionError, setSubmissionError] = useState(null); // Backend error ke liye

  const [formData, setFormData] = useState({
    full_name: "",
    father_name: "",
    dob: "",
    gender: "",
    address: "",
    class_applied: "",
    email: "",
    phone: "",
  });

  const [files, setFiles] = useState({
    aadhaar_card: null,
    photo: null,
    signature: null,
    marksheet: null,
    roll_number_slip: null,
  });

  const [loading, setLoading] = useState(false);

  // Pagination Logic
  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const isPhoneValid = /^\d{10}$/.test(formData.phone);
  const isEmailValid = formData.email
    ? /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    : true;
  const isStep1Valid =
    Object.values(formData).every((val) => val !== "") &&
    isPhoneValid &&
    isEmailValid;

  // Scroll to Top on Step Change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [step]);

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleFileChange(e) {
    const file = e.target.files[0];
    const name = e.target.name;
    let error = "";

    if (file) {
      const imageTypes = ["image/jpeg", "image/jpg", "image/png"];
      const documentTypes = [...imageTypes, "application/pdf"];

      if (name === "photo" || name === "signature") {
        if (!imageTypes.includes(file.type)) error = "Only JPG/PNG allowed.";
        if (file.size > 20000) error = "Max 20KB allowed";
      } else {
        if (!documentTypes.includes(file.type))
          error = "Only JPG/PNG or PDF allowed.";
        if (file.size > 200000) error = "Max 200KB allowed";
      }
    }
    setFiles({ ...files, [name]: file });
    setFileErrors({ ...fileErrors, [name]: error });
  }

  async function finalSubmit() {
    setLoading(true);
    setSubmissionError(null); // Pehle purane error saaf karein
    const data = new FormData();
    Object.keys(formData).forEach((key) => data.append(key, formData[key]));
    Object.keys(files).forEach((key) => {
      if (files[key]) data.append(key, files[key]);
    });

    try {
      const res = await fetch("https://test9.online/api/admissions/submit/", {
        method: "POST",
        body: data,
      });
      const result = await res.json();

      if (res.ok && result.success) {
        setAppNumber(result.application_number);
        setStep(5);
      } else {
        // Alert ki jagah hum state set karenge
        let errorMsg =
          result.error || "Submission Failed! Please check the details.";

        if (result.errors) {
          // Agar multiple fields mein error hai (e.g., Email, Phone)
          const fieldErrors = Object.entries(result.errors)
            .map(
              ([field, msgs]) =>
                `${field.replace("_", " ").toUpperCase()}: ${msgs[0]}`,
            )
            .join(" | ");
          errorMsg = fieldErrors;
        }
        setSubmissionError(errorMsg);
      }
    } catch (error) {
      setSubmissionError(
        "Network Connection Error: Server se sampark nahi ho paya.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-pink-50 py-6 px-4 font-sans">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* STEP 0: DETAILED INSTRUCTIONS */}
        {step === 0 && (
          <div className="p-8">
            <div className="text-center mb-8 border-b-2 border-pink-100 pb-4">
              <h1 className="text-2xl md:text-3xl font-extrabold text-pink-700 uppercase">
                GSSS Kuthar, Solan (H.P.)
              </h1>
              <p className="text-gray-600 font-semibold mt-2">
                General Instructions & Discipline Rules | सामान्य दिशा-निर्देश
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 max-h-[60vh] overflow-y-auto mb-8 text-gray-800 leading-relaxed">
              <section className="mb-6">
                <h3 className="font-bold text-pink-600 text-lg border-b mb-3">
                  1. General Discipline (सामान्य अनुशासन)
                </h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    <b>Punctuality:</b> Arrive 15 mins before Assembly.
                    (प्रार्थना सभा से 15 मिनट पूर्व पहुंचें।)
                  </li>
                  <li>
                    <b>Uniform:</b> Clean uniform and ID card is mandatory. (साफ
                    वर्दी और पहचान पत्र अनिवार्य है।)
                  </li>
                  <li>
                    <b>Cleanliness:</b> Keep campus clean. (विद्यालय परिसर को
                    साफ रखें।)
                  </li>
                  <li>
                    <b>Property:</b> Do not damage school furniture/walls.
                    (स्कूल की संपत्ति को नुकसान न पहुँचाएं।)
                  </li>
                </ul>
              </section>

              <section className="mb-6">
                <h3 className="font-bold text-pink-600 text-lg border-b mb-3">
                  2. Safety & Health (सुरक्षा और स्वास्थ्य)
                </h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    <b>Prohibited Items:</b> No mobiles, smartwatches, or extra
                    cash. (मोबाइल फोन या कीमती सामान न लाएं।)
                  </li>
                  <li>
                    <b>Food:</b> Bring healthy home-cooked food and water. (घर
                    का बना भोजन और पानी साथ लाएं।)
                  </li>
                </ul>
              </section>

              <section className="mb-6 bg-pink-50 p-4 rounded-lg border border-pink-200">
                <h3 className="font-bold text-pink-800 text-lg mb-2">
                  3. Documents Required (ज़रूरी दस्तावेज़)
                </h3>
                <div className="grid md:grid-cols-2 gap-2 text-sm">
                  <p>• Aadhaar Card (&lt;200KB)</p>
                  <p>• Student Photo (&lt;20KB)</p>
                  <p>• Signature (&lt;20KB)</p>
                  <p>• Previous Marksheet (&lt;200KB)</p>
                </div>
              </section>
            </div>

            <div className="flex flex-col items-center space-y-4">
              <label className="flex items-center gap-3 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={isAgreed}
                  onChange={(e) => setIsAgreed(e.target.checked)}
                  className="w-5 h-5 accent-pink-600"
                />
                <span className="text-gray-700 text-sm md:text-base font-medium">
                  I agree to follow all school rules. | मैं नियमों का पालन करने
                  के लिए सहमत हूँ।
                </span>
              </label>

              <button
                disabled={!isAgreed}
                onClick={nextStep}
                className="bg-pink-600 hover:bg-pink-700 disabled:bg-gray-300 text-white text-lg font-bold py-3 px-12 rounded-full transition-all shadow-lg transform hover:scale-105 active:scale-95"
              >
                Proceed to Fill Form / फॉर्म भरें
              </button>
            </div>
          </div>
        )}

        {/* PROGRESS BAR (Visible from Step 1 to 4) */}
        {step >= 1 && step <= 4 && (
          <div className="bg-pink-600 p-4 flex justify-around text-[10px] md:text-sm text-white font-bold uppercase tracking-wider">
            <span className={step >= 1 ? "opacity-100" : "opacity-40"}>
              1. Details
            </span>
            <span className={step >= 2 ? "opacity-100" : "opacity-40"}>
              2. Docs
            </span>
            <span className={step >= 3 ? "opacity-100" : "opacity-40"}>
              3. Preview
            </span>
            <span className={step >= 4 ? "opacity-100" : "opacity-40"}>
              4. Submit
            </span>
          </div>
        )}

        <div className="p-8">
          {/* STEP 1: BASIC DETAILS */}
          {step === 1 && (
            <div className="animate-fadeIn space-y-4">
              <h2 className="text-xl font-bold text-pink-600 border-b pb-2">
                Student Basic Details
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  name="full_name"
                  placeholder="Student Full Name"
                  value={formData.full_name}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-pink-500"
                />
                <input
                  name="father_name"
                  placeholder="Father's Name"
                  value={formData.father_name}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-pink-500"
                />
                <input
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg"
                />
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg"
                >
                  <option value="">Select Gender</option>
                  <option>Male</option>
                  <option>Female</option>
                </select>
                <input
                  name="class_applied"
                  placeholder="Class (e.g. 9th, 11th)"
                  value={formData.class_applied}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg"
                />
                {/* Email Input Step 1 mein dhundhein aur uske niche ye line add karein */}
                <input
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full p-3 border rounded-lg ${formData.email && !isEmailValid ? "border-red-500" : ""}`}
                />
                {/* Naya Error Message */}
                {!isEmailValid && formData.email && (
                  <p className="text-red-500 text-xs mt-1">
                    Please enter a valid email address (e.g. name@mail.com).
                  </p>
                )}
                <div className="col-span-full">
                  <input
                    name="phone"
                    placeholder="Phone (10 digits)"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`w-full p-3 border rounded-lg ${formData.phone && !isPhoneValid ? "border-red-500" : ""}`}
                  />
                  {!isPhoneValid && formData.phone && (
                    <p className="text-red-500 text-xs mt-1">
                      Please enter a valid 10-digit number.
                    </p>
                  )}
                </div>
                <textarea
                  name="address"
                  placeholder="Full Home Address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg col-span-full h-24"
                ></textarea>
              </div>
              <button
                disabled={!isStep1Valid}
                onClick={nextStep}
                className="bg-pink-600 text-white px-8 py-3 rounded-lg font-bold disabled:bg-gray-300 w-full md:w-auto"
              >
                Next Step
              </button>
            </div>
          )}

          {/* STEP 2: DOCUMENT UPLOAD */}
          {step === 2 && (
            <div className="space-y-6 animate-fadeIn">
              <h2 className="text-xl font-bold text-pink-600 border-b pb-2">
                Document Upload
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <FileUpload
                  label="Aadhaar Card (Max 200KB)"
                  name="aadhaar_card"
                  onChange={handleFileChange}
                  error={fileErrors.aadhaar_card}
                  file={files.aadhaar_card}
                />
                <FileUpload
                  label="Marksheet (Max 200KB)"
                  name="marksheet"
                  onChange={handleFileChange}
                  error={fileErrors.marksheet}
                  file={files.marksheet}
                />
                <FileUpload
                  label="Student Photo (Max 20KB)"
                  name="photo"
                  onChange={handleFileChange}
                  error={fileErrors.photo}
                  file={files.photo}
                />
                <FileUpload
                  label="Signature (Max 20KB)"
                  name="signature"
                  onChange={handleFileChange}
                  error={fileErrors.signature}
                  file={files.signature}
                />
              </div>
              <div className="flex gap-4 pt-6">
                <button
                  onClick={prevStep}
                  className="bg-gray-400 text-white px-6 py-2 rounded-lg"
                >
                  Back
                </button>
                <button
                  disabled={
                    Object.values(fileErrors).some((e) => e !== "") ||
                    !files.photo ||
                    !files.aadhaar_card
                  }
                  onClick={nextStep}
                  className="bg-pink-600 text-white px-8 py-2 rounded-lg font-bold disabled:bg-gray-300"
                >
                  Next: Preview
                </button>
              </div>
            </div>
          )}

          {/* STEP 3 & 4 (Preview & Submit) */}
          {step === 3 && (
            <div className="space-y-4 animate-fadeIn">
              <h2 className="text-xl font-bold text-pink-600">
                Review Application
              </h2>
              <div className="bg-gray-50 p-4 rounded-lg space-y-2 border">
                <p>
                  <b>Name:</b> {formData.full_name}
                </p>
                <p>
                  <b>Father:</b> {formData.father_name}
                </p>
                <p>
                  <b>Class:</b> {formData.class_applied}
                </p>
                <p>
                  <b>Phone:</b> {formData.phone}
                </p>
              </div>
              <div className="flex gap-4 mt-6">
                <button
                  onClick={prevStep}
                  className="bg-gray-400 text-white px-6 py-2 rounded-lg"
                >
                  Back
                </button>
                <button
                  onClick={nextStep}
                  className="bg-pink-600 text-white px-8 py-2 rounded-lg font-bold"
                >
                  Proceed to Submit
                </button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="text-center py-10 animate-fadeIn">
              <h2 className="text-2xl font-bold text-pink-600 mb-4">
                Ready to Submit?
              </h2>

              {/* --- NAYA USER FRIENDLY ERROR BOX --- */}
              {submissionError && (
                <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm rounded shadow-sm animate-shake">
                  <div className="flex items-center">
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="font-bold">Error:</span>
                  </div>
                  <p className="mt-1 text-left ml-7">{submissionError}</p>
                </div>
              )}

              <p className="text-gray-600 mb-8">
                Ensure all details are correct. You won't be able to edit after
                submission.
              </p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={prevStep}
                  className="bg-gray-400 text-white px-6 py-2 rounded-lg"
                >
                  Back
                </button>
                <button
                  onClick={finalSubmit}
                  disabled={loading}
                  className="bg-green-600 text-white px-10 py-2 rounded-lg font-bold shadow-lg"
                >
                  {loading ? "Submitting..." : "Confirm & Submit Now"}
                </button>
              </div>
            </div>
          )}

          {/* STEP 5: FINAL RECEIPT */}
          {step === 5 && (
            <div
              id="printable-area"
              className="border-2 border-pink-600 rounded-xl overflow-hidden shadow-2xl animate-bounceIn"
            >
              <div className="bg-pink-600 text-white p-6 text-center">
                <h2 className="text-xl md:text-2xl font-bold uppercase">
                  GSSS KUTHAR - Registration Receipt
                </h2>
                <p>Session 2026-2027</p>
              </div>
              <div className="p-8 flex flex-col md:flex-row justify-between gap-8">
                <div className="space-y-4">
                  <p className="text-2xl font-black text-pink-600">
                    No: {appNumber}
                  </p>
                  <p>
                    <b>Student:</b> {formData.full_name}
                  </p>
                  <p>
                    <b>Father:</b> {formData.father_name}
                  </p>
                  <p>
                    <b>Class:</b> {formData.class_applied}
                  </p>
                  <p>
                    <b>DOB:</b> {formData.dob}
                  </p>
                </div>
                <div className="flex flex-col items-center gap-4 bg-white p-2 border rounded shadow-sm">
                  {files.photo && (
                    <img
                      src={URL.createObjectURL(files.photo)}
                      className="w-32 h-40 object-cover border-2 border-pink-100"
                      alt="Student"
                    />
                  )}
                  {files.signature && (
                    <img
                      src={URL.createObjectURL(files.signature)}
                      className="w-32 h-10 object-contain border-b-2"
                      alt="Sign"
                    />
                  )}
                </div>
              </div>
              <div className="p-6 bg-yellow-50 text-xs italic text-gray-700 border-t">
                * Note: This is a provisional receipt. Visit school office with
                original docs and ₹10 fee.
              </div>
              <div className="p-6 flex gap-4 no-print">
                <button
                  onClick={() => window.print()}
                  className="bg-blue-600 text-white py-3 rounded-lg w-full font-bold"
                >
                  Print / Save PDF
                </button>
                <button
                  onClick={() => window.location.reload()}
                  className="bg-gray-200 py-3 rounded-lg w-full font-bold"
                >
                  New Form
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
