import axios from "axios";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // TEMPORARY FIX: Only redirect if it's a real 401
    // and you are certain the backend JWT validation is live.
    if (error.response?.status === 401) {
      console.warn("401 Unauthorized - Check your backend security config.");
      // localStorage.removeItem("token"); // Commented out for now
      // window.location.href = "/";      // Commented out for now
    }
    return Promise.reject(error);
  }
);

export default apiClient;