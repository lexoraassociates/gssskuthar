import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./pages/components/Navbar";
import Footer from "./pages/components/Footer";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Gallery from "./pages/Gallery";
import StudentDashboard from "./pages/StudentDashboard";
import ProtectedRoute from "./auth/ProtectedRoute";
import Contact from "./pages/Contact";
import PaymentSuccess from "./pages/PaymentSuccess";
import AdminAdmissions from "./pages/AdminAdmissions";
import AdmissionForm from "./pages/AdmissionForm";

export default function App() {
  return (
    <BrowserRouter basename="/">
      <Navbar />

      <Routes>
        {/* HOME PAGE ROUTE */}
        <Route path="/" element={<Home />} />
        {/* GALLERY */}
        <Route path="/gallery" element={<Gallery />} />
        {/* Contact */}
        <Route path="/contact" element={<Contact />} />

        {/* LOGIN */}
        <Route path="/login" element={<Login />} />

        <Route path="/payment-success" element={<PaymentSuccess />} />

        <Route path="/admin/admissions" element={<AdminAdmissions />} />

        <Route path="/apply-now" element={<AdmissionForm />} />

        {/* DASHBOARD */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <StudentDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
