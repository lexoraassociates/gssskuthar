import axios from "axios";

const axiosClient = axios.create({
  baseURL: "https://test9.online/api",
});

axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("access");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosClient;
