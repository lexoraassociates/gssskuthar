import { useState, useEffect } from "react";
import FileUpload from "./components/fileUpload";

export default function AdmissionForm() {
  const [step, setStep] = useState(0);
  const [appNumber, setAppNumber] = useState("");
  const [fileErrors, setFileErrors] = useState({});
  const [isAgreed, setIsAgreed] = useState(false);
  const [submissionError, setSubmissionError] = useState(null);

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
  });

  const [loading, setLoading] = useState(false);

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const isPhoneValid = /^\d{10}$/.test(formData.phone);
  const isEmailValid = formData.email
    ? /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    : true;

  const isStep1Valid =
    formData.full_name &&
    formData.father_name &&
    formData.dob &&
    formData.gender &&
    formData.class_applied &&
    formData.address &&
    isPhoneValid &&
    isEmailValid;

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
    setSubmissionError(null);
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
        let errorMsg =
          result.error || "Submission Failed! Please check the details.";
        if (result.errors) {
          errorMsg = Object.entries(result.errors)
            .map(
              ([field, msgs]) =>
                `${field.replace("_", " ").toUpperCase()}: ${msgs[0]}`,
            )
            .join(" | ");
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
    <div className="min-h-screen bg-slate-50 py-10 px-4 font-sans">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
        {/* STEP 0: INSTRUCTIONS */}
        {step === 0 && (
          <div className="p-8 md:p-12">
            <div className="text-center mb-10">
              <h1 className="text-3xl md:text-4xl font-black text-pink-600 uppercase tracking-tight">
                GSSS Kuthar, Solan
              </h1>
              <div className="h-1 w-20 bg-pink-500 mx-auto mt-2 rounded-full"></div>
              <p className="text-gray-500 font-bold mt-4 text-lg">
                Admission Portal | सत्र 2026-27
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200 mb-8 overflow-y-auto max-h-96 custom-scrollbar">
              <h3 className="font-bold text-gray-800 text-xl mb-4 flex items-center gap-2">
                <span className="bg-pink-100 p-1 rounded">📋</span> Important
                Instructions
              </h3>
              <ul className="space-y-3 text-gray-600 text-sm md:text-base">
                <li className="flex gap-2">
                  <b>1.</b> Form ko dhyan se bharen, submit ke baad badlav nahi
                  hoga.
                </li>
                <li className="flex gap-2">
                  <b>2.</b> Passport size photo (Max 20KB) taiyar rakhen.
                </li>
                <li className="flex gap-2">
                  <b>3.</b> Aadhaar Card aur purani Marksheet (Max 200KB) upload
                  karni hogi.
                </li>
                <li className="flex gap-2">
                  <b>4.</b> Mobile number wahi dein jo chalu ho (Active Number).
                </li>
              </ul>
            </div>

            <div className="flex flex-col items-center gap-6">
              <label className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={isAgreed}
                  onChange={(e) => setIsAgreed(e.target.checked)}
                  className="w-6 h-6 rounded accent-pink-600 cursor-pointer"
                />
                <span className="text-gray-700 font-medium group-hover:text-pink-600 transition-colors">
                  I have read and I agree to the rules. | मैं सहमत हूँ।
                </span>
              </label>

              <button
                disabled={!isAgreed}
                onClick={nextStep}
                className="w-full md:w-auto bg-pink-600 hover:bg-pink-700 disabled:bg-gray-300 text-white text-lg font-black py-4 px-16 rounded-2xl transition-all shadow-xl shadow-pink-100 active:scale-95"
              >
                START APPLICATION 🚀
              </button>
            </div>
          </div>
        )}

        {/* PROGRESS BAR */}
        {step >= 1 && step <= 4 && (
          <div className="bg-pink-600 p-4 flex justify-between px-8 md:px-20">
            {[1, 2, 3, 4].map((s) => (
              <div
                key={s}
                className={`h-2 w-full mx-1 rounded-full ${step >= s ? "bg-white" : "bg-pink-800 opacity-50"}`}
              ></div>
            ))}
          </div>
        )}

        <div className="p-8 md:p-10">
          {/* STEP 1: STUDENT DETAILS */}
          {step === 1 && (
            <div className="animate-fadeIn space-y-8">
              <div className="border-l-4 border-pink-500 pl-4">
                <h2 className="text-2xl font-black text-gray-800">
                  Student Details
                </h2>
                <p className="text-sm text-gray-500">
                  Kripya saari jankari certificate ke anusar bharen.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Full Name */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-400 uppercase ml-1">
                    Student Full Name
                  </label>
                  <input
                    name="full_name"
                    value={formData.full_name}
                    onChange={handleChange}
                    className="w-full p-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-pink-500 outline-none bg-gray-50 font-medium"
                    placeholder="Enter full name"
                  />
                </div>

                {/* Father's Name */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-400 uppercase ml-1">
                    Father's Name
                  </label>
                  <input
                    name="father_name"
                    value={formData.father_name}
                    onChange={handleChange}
                    className="w-full p-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-pink-500 outline-none bg-gray-50 font-medium"
                    placeholder="Father's full name"
                  />
                </div>

                {/* DATE OF BIRTH (The Improved Input) */}
                <div className="space-y-1">
                  <label
                    htmlFor="dob"
                    className="text-xs font-bold text-gray-400 uppercase ml-1"
                  >
                    Date of Birth (DOB) <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-pink-500">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <input
                      id="dob"
                      type="date"
                      name="dob"
                      value={formData.dob}
                      onChange={handleChange}
                      max={new Date().toISOString().split("T")[0]}
                      className="w-full pl-12 p-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-pink-500 outline-none bg-gray-50 font-bold text-gray-700"
                    />
                  </div>
                  <p className="text-[10px] text-gray-400 ml-1 italic">
                    Click on calendar to select birth date
                  </p>
                </div>

                {/* Gender */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-400 uppercase ml-1">
                    Gender
                  </label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="w-full p-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-pink-500 bg-gray-50 font-medium cursor-pointer"
                  >
                    <option value="">Select Gender</option>
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                  </select>
                </div>

                {/* Class */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-400 uppercase ml-1">
                    Admission For Class
                  </label>
                  <input
                    name="class_applied"
                    value={formData.class_applied}
                    onChange={handleChange}
                    className="w-full p-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-pink-500 bg-gray-50 font-medium"
                    placeholder="e.g. 6th, 9th, 11th"
                  />
                </div>

                {/* Phone */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-400 uppercase ml-1">
                    Phone Number
                  </label>
                  <input
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`w-full p-4 border rounded-2xl focus:ring-2 focus:ring-pink-500 bg-gray-50 font-bold ${formData.phone && !isPhoneValid ? "border-red-500" : "border-gray-200"}`}
                    placeholder="10 digit mobile no."
                  />
                </div>

                {/* Address */}
                <div className="col-span-full space-y-1">
                  <label className="text-xs font-bold text-gray-400 uppercase ml-1">
                    Permanent Address
                  </label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    rows="3"
                    className="w-full p-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-pink-500 bg-gray-50 font-medium resize-none"
                    placeholder="Village, PO, Tehsil, District..."
                  ></textarea>
                </div>
              </div>

              <button
                disabled={!isStep1Valid}
                onClick={nextStep}
                className="w-full bg-pink-600 text-white py-4 rounded-2xl font-black text-lg shadow-lg shadow-pink-100 disabled:bg-gray-200 active:scale-95 transition-all"
              >
                NEXT: UPLOAD DOCUMENTS →
              </button>
            </div>
          )}

          {/* STEP 2: DOCUMENTS */}
          {step === 2 && (
            <div className="space-y-8 animate-fadeIn">
              <div className="border-l-4 border-pink-500 pl-4">
                <h2 className="text-2xl font-black text-gray-800">
                  Document Upload
                </h2>
                <p className="text-sm text-gray-500">
                  Scan copy upload karein (JPG/PNG/PDF).
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <FileUpload
                  label="Aadhaar Card (200KB)"
                  name="aadhaar_card"
                  onChange={handleFileChange}
                  error={fileErrors.aadhaar_card}
                  file={files.aadhaar_card}
                />
                <FileUpload
                  label="Marksheet (200KB)"
                  name="marksheet"
                  onChange={handleFileChange}
                  error={fileErrors.marksheet}
                  file={files.marksheet}
                />
                <FileUpload
                  label="Student Photo (20KB)"
                  name="photo"
                  onChange={handleFileChange}
                  error={fileErrors.photo}
                  file={files.photo}
                />
                <FileUpload
                  label="Signature (20KB)"
                  name="signature"
                  onChange={handleFileChange}
                  error={fileErrors.signature}
                  file={files.signature}
                />
              </div>

              <div className="flex gap-4 pt-6">
                <button
                  onClick={prevStep}
                  className="flex-1 py-4 bg-gray-100 text-gray-600 rounded-2xl font-bold hover:bg-gray-200 transition-colors"
                >
                  BACK
                </button>
                <button
                  disabled={
                    Object.values(fileErrors).some((e) => e !== "") ||
                    !files.photo ||
                    !files.aadhaar_card
                  }
                  onClick={nextStep}
                  className="flex-[2] py-4 bg-pink-600 text-white rounded-2xl font-black shadow-lg disabled:bg-gray-200"
                >
                  REVIEW APPLICATION
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: PREVIEW */}
          {step === 3 && (
            <div className="space-y-6 animate-fadeIn">
              <h2 className="text-2xl font-black text-gray-800 border-b pb-4">
                Application Preview
              </h2>
              <div className="bg-slate-50 p-6 rounded-3xl grid grid-cols-2 gap-4 text-sm md:text-base border border-slate-100">
                <div className="space-y-3">
                  <p>
                    <span className="text-gray-400 font-bold uppercase text-[10px] block">
                      Full Name
                    </span>{" "}
                    <span className="font-bold">{formData.full_name}</span>
                  </p>
                  <p>
                    <span className="text-gray-400 font-bold uppercase text-[10px] block">
                      Father Name
                    </span>{" "}
                    <span className="font-bold">{formData.father_name}</span>
                  </p>
                  <p>
                    <span className="text-gray-400 font-bold uppercase text-[10px] block">
                      Class
                    </span>{" "}
                    <span className="font-bold">{formData.class_applied}</span>
                  </p>
                </div>
                <div className="space-y-3">
                  <p>
                    <span className="text-gray-400 font-bold uppercase text-[10px] block">
                      DOB
                    </span>{" "}
                    <span className="font-bold">{formData.dob}</span>
                  </p>
                  <p>
                    <span className="text-gray-400 font-bold uppercase text-[10px] block">
                      Phone
                    </span>{" "}
                    <span className="font-bold">{formData.phone}</span>
                  </p>
                  <p>
                    <span className="text-gray-400 font-bold uppercase text-[10px] block">
                      Gender
                    </span>{" "}
                    <span className="font-bold">{formData.gender}</span>
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={prevStep}
                  className="flex-1 py-4 bg-gray-100 font-bold rounded-2xl text-gray-500"
                >
                  EDIT DETAILS
                </button>
                <button
                  onClick={nextStep}
                  className="flex-[2] py-4 bg-pink-600 text-white font-black rounded-2xl shadow-lg"
                >
                  FINAL SUBMISSION
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: FINAL SUBMIT */}
          {step === 4 && (
            <div className="text-center py-10 animate-fadeIn space-y-6">
              <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto text-4xl shadow-inner">
                ✓
              </div>
              <h2 className="text-3xl font-black text-gray-800">
                Ready to Submit?
              </h2>

              {submissionError && (
                <div className="p-4 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm text-left rounded-r-xl animate-shake">
                  <p className="font-bold">Error Occurred:</p>
                  <p>{submissionError}</p>
                </div>
              )}

              <p className="text-gray-500 max-w-sm mx-auto">
                By clicking confirm, your application will be sent to GSSS
                Kuthar for approval.
              </p>

              <div className="flex justify-center gap-4 pt-4">
                <button
                  onClick={prevStep}
                  className="px-8 py-4 bg-gray-100 font-bold rounded-2xl text-gray-500"
                >
                  CANCEL
                </button>
                <button
                  onClick={finalSubmit}
                  disabled={loading}
                  className="px-12 py-4 bg-green-600 text-white font-black rounded-2xl shadow-xl shadow-green-100"
                >
                  {loading ? "SUBMITTING..." : "CONFIRM & SUBMIT"}
                </button>
              </div>
            </div>
          )}

          {/* STEP 5: RECEIPT */}
          {step === 5 && (
            <div
              id="printable-area"
              className="border-4 border-dashed border-pink-200 rounded-3xl p-8 bg-white animate-bounceIn text-center space-y-6"
            >
              <div className="space-y-2">
                <h2 className="text-green-600 font-black text-4xl">SUCCESS!</h2>
                <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">
                  Application Submitted Successfully
                </p>
              </div>

              <div className="bg-pink-50 py-6 rounded-2xl">
                <p className="text-gray-500 text-sm font-bold">
                  Application Number
                </p>
                <h3 className="text-4xl font-black text-pink-600">
                  {appNumber}
                </h3>
              </div>

              <div className="text-left space-y-2 border-t pt-6">
                <p className="flex justify-between">
                  <span>Student:</span> <b>{formData.full_name}</b>
                </p>
                <p className="flex justify-between">
                  <span>Class:</span> <b>{formData.class_applied}</b>
                </p>
                <p className="flex justify-between">
                  <span>Phone:</span> <b>{formData.phone}</b>
                </p>
              </div>

              <div className="flex gap-4 no-print pt-4">
                <button
                  onClick={() => window.print()}
                  className="flex-1 py-4 bg-blue-600 text-white rounded-2xl font-black shadow-lg"
                >
                  PRINT RECEIPT
                </button>
                <button
                  onClick={() => window.location.reload()}
                  className="flex-1 py-4 bg-gray-100 text-gray-600 rounded-2xl font-bold"
                >
                  DONE
                </button>
              </div>
              <p className="text-[10px] text-gray-400 italic mt-4 no-print">
                Take a screenshot or print this for future reference.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
