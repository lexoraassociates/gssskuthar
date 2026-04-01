import { useState, useEffect } from "react"; // useEffect yahan add karein
import FileUpload from "./components/fileUpload";

export default function AdmissionForm() {
  const [step, setStep] = useState(1);
  const [appNumber, setAppNumber] = useState("");
  const [fileErrors, setFileErrors] = useState({});
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

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const isPhoneValid = /^\d{10}$/.test(formData.phone);
  const isStep1Valid =
    Object.values(formData).every((val) => val !== "") && isPhoneValid;

  // Jab bhi 'step' badle, screen top par chali jaye
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
      // 1. Define Allowed Formats
      const imageTypes = ["image/jpeg", "image/jpg", "image/png"];
      const documentTypes = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "application/pdf",
      ];

      // 2. Conditional Check
      if (name === "photo" || name === "signature") {
        // Photo aur Signature ke liye sirf Image
        if (!imageTypes.includes(file.type)) {
          error = "Only JPG/PNG images are allowed for Photo and Signature.";
        }
        if (file.size > 20000) error = "Max 20KB allowed";
      } else {
        // Aadhaar, Marksheet, etc. ke liye Image + PDF dono
        if (!documentTypes.includes(file.type)) {
          error = "Only JPG/PNG or PDF files are allowed.";
        }
        if (file.size > 200000) error = "Max 200KB allowed";
      }
    }

    setFiles({ ...files, [name]: file });
    setFileErrors({ ...fileErrors, [name]: error });
  }

  // Final Submit function
  async function finalSubmit() {
    setLoading(true);
    const data = new FormData();

    // FormData mein text fields aur files ko add karna
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

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
        // --- YE HAI WOH ELSE BLOCK JO MAINE DIYA THA ---
        let msg = "Form Submission Not Successful!\n\n";

        if (result.errors) {
          // Har field ka error nikaal kar message mein jodna
          Object.keys(result.errors).forEach((field) => {
            msg += `• ${field.replace("_", " ").toUpperCase()}: ${result.errors[field][0]}\n`;
          });
        } else {
          msg += result.error || "An unexpected server error occurred.";
        }

        alert(msg);
        // ----------------------------------------------
      }
    } catch (error) {
      console.error("Fetch Error:", error);
      alert("Network Error: Backend se connection nahi ho paya.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-pink-50 py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow">
        {/* Progress Bar */}
        <div className="flex justify-between mb-6 text-sm font-semibold">
          <span className={step >= 1 ? "text-pink-600" : ""}>1. Details</span>
          <span className={step >= 2 ? "text-pink-600" : ""}>2. Documents</span>
          <span className={step >= 3 ? "text-pink-600" : ""}>3. Preview</span>
          <span className={step >= 4 ? "text-pink-600" : ""}>4. Submit</span>
        </div>

        {/* STEP 1 */}
        {step === 1 && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-pink-600">Basic Details</h2>
            <input
              name="full_name"
              placeholder="Full Name"
              value={formData.full_name}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
            <input
              name="father_name"
              placeholder="Father Name"
              value={formData.father_name}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            >
              <option value="">Select Gender</option>
              <option>Male</option>
              <option>Female</option>
            </select>
            <textarea
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            ></textarea>
            <input
              name="class_applied"
              placeholder="Class"
              value={formData.class_applied}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
            <input
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
            <input
              name="phone"
              placeholder="Phone (10 digits)"
              value={formData.phone}
              onChange={handleChange}
              className={`w-full p-2 border rounded ${formData.phone && !isPhoneValid ? "border-red-500" : ""}`}
            />
            {!isPhoneValid && formData.phone && (
              <p className="text-red-500 text-xs">Enter 10 digits without 0</p>
            )}
            <button
              disabled={!isStep1Valid}
              onClick={nextStep}
              className="bg-pink-600 text-white px-6 py-2 rounded disabled:bg-gray-300"
            >
              Next
            </button>
          </div>
        )}

        {/* STEP 2: DOCUMENTS (UI FIXED) */}
        {step === 2 && (
          <div className="space-y-5">
            <h2 className="text-xl font-bold text-pink-600">
              Upload Documents
            </h2>
            <FileUpload
              label="Aadhaar Card (Max 200KB)"
              name="aadhaar_card"
              onChange={handleFileChange}
              error={fileErrors.aadhaar_card}
              file={files.aadhaar_card}
            />
            <FileUpload
              label="Photo (Max 20KB)"
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
            <FileUpload
              label="Marksheet (Max 200KB)"
              name="marksheet"
              onChange={handleFileChange}
              error={fileErrors.marksheet}
              file={files.marksheet}
            />
            <FileUpload
              label="Roll Number Slip (Optional)"
              name="roll_number_slip"
              onChange={handleFileChange}
              file={files.roll_number_slip}
            />

            <div className="flex gap-4">
              <button
                onClick={prevStep}
                className="bg-gray-400 text-white px-4 py-2 rounded"
              >
                Back
              </button>
              <button
                disabled={
                  Object.values(fileErrors).some((e) => e !== "") ||
                  !files.photo
                }
                onClick={nextStep}
                className="bg-pink-600 text-white px-6 py-2 rounded disabled:bg-gray-300"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {/* STEP 3 & 4 (Preview & Submit) ... keep as per previous logic with Back buttons */}
        {step === 3 && (
          <div className="space-y-2">
            <h2 className="text-xl font-bold text-pink-600">Preview</h2>
            <p>
              <b>Name:</b> {formData.full_name}
            </p>
            <p>
              <b>Phone:</b> {formData.phone}
            </p>
            <div className="flex gap-4 mt-4">
              <button
                onClick={prevStep}
                className="bg-gray-400 text-white px-4 py-2 rounded"
              >
                Back
              </button>
              <button
                onClick={nextStep}
                className="bg-pink-600 text-white px-6 py-2 rounded"
              >
                Proceed
              </button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="text-center">
            <h2 className="text-xl font-bold text-pink-600 mb-4">
              Final Submit
            </h2>
            <p className="mb-6">Click submit to finish your application.</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={prevStep}
                className="bg-gray-400 text-white px-4 py-2 rounded"
              >
                Back
              </button>
              <button
                onClick={finalSubmit}
                disabled={loading}
                className="bg-green-600 text-white px-8 py-2 rounded"
              >
                {loading ? "Submitting..." : "Submit Now"}
              </button>
            </div>
          </div>
        )}

        {/* STEP 5: FINAL ADMIT CARD DESIGN */}
        {step === 5 && (
          <div
            id="printable-area"
            className="border-2 border-pink-600 p-0 rounded-lg overflow-hidden"
          >
            <div className="bg-pink-600 text-white p-4 text-center">
              <h2 className="text-xl font-bold uppercase">
                GSSS KUTHAR - Provisional Registration
              </h2>
              <p className="text-sm">Session 2026-2027</p>
            </div>

            <div className="p-6 flex flex-col md:flex-row justify-between gap-6">
              <div className="space-y-4 text-gray-800">
                <p className="text-xl">
                  <b>Application No:</b>{" "}
                  <span className="text-pink-600 font-bold">{appNumber}</span>
                </p>
                <p>
                  <b>Student Name:</b> {formData.full_name}
                </p>
                <p>
                  <b>Father's Name:</b> {formData.father_name}
                </p>
                <p>
                  <b>Class:</b> {formData.class_applied}
                </p>
                <p>
                  <b>DOB:</b> {formData.dob}
                </p>
              </div>

              <div className="flex flex-col items-center gap-4">
                {files.photo && (
                  <img
                    src={URL.createObjectURL(files.photo)}
                    className="w-32 h-40 border-2 border-gray-300 object-cover"
                    alt="Student"
                  />
                )}
                {files.signature && (
                  <img
                    src={URL.createObjectURL(files.signature)}
                    className="w-32 h-10 object-contain border-b border-gray-400"
                    alt="Sign"
                  />
                )}
              </div>
            </div>

            <div className="p-4 bg-gray-50 text-[12px] text-gray-600 italic border-t">
              * Note: This is a provisional registration form. Please visit GSSS
              Kuthar with original documents and ₹10 fee for final admission.
            </div>

            <div className="p-6 no-print flex gap-4">
              <button
                onClick={() => window.print()}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg w-full"
              >
                Print / Save PDF
              </button>
              <button
                onClick={() => window.location.reload()}
                className="bg-gray-200 px-6 py-2 rounded-lg w-full"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
