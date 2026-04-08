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
import MyProfile from "./pages/user/MyProfile";
import AccountSettings from "./pages/user/AccountSettings";
import StudentManagement from "./pages/admin/StudentManagement";
import ManageNotifications from "./pages/components/ManageNotifications";
import AllNotifications from "./pages/AllNotifications";
import History from "./pages/school/History";
import VisionMission from "./pages/school/VisionMission";
import StaffDetails from "./pages/school/StaffDetails";
import Timings from "./pages/school/Timings";
import Prospectus from "./pages/school/Prospectus";
import Facilities from "./pages/school/Facilities";

// 1. ScrollToTop ko import karein
import ScrollToTop from "./pages/components/ScrollToTop";

// Helper component to control Navbar/Footer visibility
function LayoutWrapper({ children }) {
  const location = useLocation();

  // Dashboard routes ki list jahan Navbar/Footer nahi dikhana
  const dashboardPaths = [
    "/admin",
    "/management",
    "/student-profile",
    "/admin-dashboard",
    "/user/settings",
    "/admin/students",
  ];
  // Check karein ki kya current path inme se kisi se shuru hota hai
  const isDashboard = dashboardPaths.some((path) =>
    location.pathname.startsWith(path),
  );

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
          <Route path="/notifications" element={<AllNotifications />} />
          <Route path="/school/history" element={<History />} />
          <Route path="/school/vision-mission" element={<VisionMission />} />
          <Route path="/school/staff" element={<StaffDetails />} />
          <Route path="/school/timings" element={<Timings />} />
          <Route path="/school/prospectus" element={<Prospectus />} />
          <Route path="/school/facilities" element={<Facilities />} />

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
          <Route
            path="/student-profile"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <MyProfile />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/user/settings"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <AccountSettings />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/students"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <StudentManagement />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
        </Routes>
      </LayoutWrapper>
    </BrowserRouter>
  );
}
