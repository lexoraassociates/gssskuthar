import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

export default function PaymentSuccess() {
  const [params] = useSearchParams();

  const admissionId = params.get("admission_id");
  const paymentId = params.get("razorpay_payment_id");
  const signature = params.get("razorpay_signature");

  useEffect(() => {
    async function confirmPayment() {
      await fetch("http://localhost:8000/api/admissions/payment/success/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          admission_id: admissionId,
          razorpay_payment_id: paymentId,
          razorpay_signature: signature,
        }),
      });
    }

    confirmPayment();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-pink-50">
      <div className="bg-white p-10 rounded-2xl shadow-xl text-center">
        <h1 className="text-4xl font-bold text-pink-700 mb-4">
          Payment Successful!
        </h1>
        <p className="text-gray-700 text-lg">
          Thank you for completing your admission payment.
        </p>
        <p className="text-gray-600 mt-2">
          A confirmation email with your receipt has been sent.
        </p>
      </div>
    </div>
  );
}
