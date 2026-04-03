import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./pages/components/Navbar";
import Footer from "./pages/components/Footer";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Gallery from "./pages/Gallery";
import DashboardLayout from "./pages/components/DashboardLayout";
import ProtectedRoute from "./pages/components/ProtectedRoute";
import AdminHome from "./pages/AdminHome";
import Contact from "./pages/Contact";
import PaymentSuccess from "./pages/PaymentSuccess";
import AdminAdmissions from "./pages/AdminAdmissions";
import AdmissionForm from "./pages/AdmissionForm";
import ManageGallery from "./pages/ManageGallery";
import ManageNotifications from "./pages/components/ManageNotifications";
import AllNotifications from "./pages/AllNotifications";

// 1. ScrollToTop ko import karein
import ScrollToTop from "./pages/components/ScrollToTop";

// Helper component to control Navbar/Footer visibility
function LayoutWrapper({ children }) {
  const location = useLocation();

  const isDashboard =
    location.pathname.startsWith("/admin") ||
    location.pathname.startsWith("/management");

  return (
    <>
      {!isDashboard && <Navbar />}
      {children}
      {!isDashboard && <Footer />}
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter basename="/">
      {/* 2. ScrollToTop yahan lagega - Ye har route change ko monitor karega */}
      <ScrollToTop />

      <LayoutWrapper>
        <Routes>
          {/* PUBLIC ROUTES */}
          <Route path="/" element={<Home />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/apply-now" element={<AdmissionForm />} />
          <Route path="/payment-success" element={<PaymentSuccess />} />
          <Route path="/all-notifications" element={<AllNotifications />} />

          {/* PROTECTED DASHBOARD ROUTES */}
          <Route
            path="/admin-dashboard"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <AdminHome />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/admissions"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <AdminAdmissions />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/management/gallery"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <ManageGallery />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/management/notifications"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <ManageNotifications />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
        </Routes>
      </LayoutWrapper>
    </BrowserRouter>
  );
}
