// src/api.js
export const fetchWithAuth = async (url, options = {}) => {
  const token = localStorage.getItem("access_token");

  // Headers create karein
  const headers = {
    ...options.headers,
  };

  // AGAR DATA FORMDATA NAHI HAI, TOH HI JSON HEADER JODEIN
  // Files ke liye browser ko khud boundary set karne dena zaroori hai
  if (!(options.body instanceof FormData)) {
    headers["Content-Type"] = "application/json";
  }

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(url, { ...options, headers });

    if (response.status === 401) {
      localStorage.clear();
      window.location.href = "/login?message=session_expired";
      return null;
    }

    return response;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};
