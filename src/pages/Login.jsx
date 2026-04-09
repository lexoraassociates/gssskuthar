import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function Login() {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Session Expire wala check yahan aayega
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    if (queryParams.get("message") === "session_expired") {
      setError("Your session has expired. Please login again.");
    }
  }, [location]);

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("https://test9.online/api/token/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });

      const data = await res.json();

      if (res.ok) {
        // Token aur User info save karein
        localStorage.setItem("access_token", data.access);
        localStorage.setItem("refresh_token", data.refresh);
        localStorage.setItem("user_role", data.role);
        localStorage.setItem("user_name", data.full_name || data.username);

        // Role ke hisaab se redirect karein
        if (data.role === "Admin" || data.role === "Superuser") {
          navigate("/admin-dashboard");
        } else if (data.role === "Teacher") {
          navigate("/admin-dashboard"); // Teacher bhi common dashboard par jayega
        } else if (data.role === "Student") {
          navigate("/admin-dashboard"); // Student bhi common dashboard par jayega
        }
      } else {
        setError("Invalid Username or Password!");
      }
    } catch (err) {
      setError("Server Connection Failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-2xl">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-pink-600">GSSS Kuthar</h2>
          <p className="text-gray-500 mt-2">Login to your account</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm font-medium border border-red-200">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700">
              Username / Application No.
            </label>
            <input
              type="text"
              name="username"
              required
              className="w-full mt-1 p-3 border rounded-xl focus:ring-2 focus:ring-pink-500 outline-none"
              placeholder="Enter username"
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              required
              className="w-full mt-1 p-3 border rounded-xl focus:ring-2 focus:ring-pink-500 outline-none"
              placeholder="••••••••"
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-pink-600 hover:bg-pink-700 text-white font-bold py-3 rounded-xl transition-all shadow-lg transform hover:scale-[1.02] active:scale-95 disabled:bg-gray-400"
          >
            {loading ? "Authenticating..." : "Login Now"}
          </button>
        </form>
      </div>
    </div>
  );
}
