import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem("access_token");

  // Agar token nahi hai, toh login par redirect karo
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Agar token hai, toh jo component manga hai (children) use dikhao
  return children;
}
