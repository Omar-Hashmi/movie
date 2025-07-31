import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api", // or your prod URL later
});

// Request Interceptor: Attach token if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Handle token errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login"; // Optional: Navigate user to login
    }
    return Promise.reject(error);
  }
);

export default api;
