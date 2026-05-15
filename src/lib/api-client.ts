import axios from "axios";

// Main Backend Client
export const mainApi = axios.create({
  baseURL: "https://talent-lens-be-production.up.railway.app",
  headers: {
    "Content-Type": "application/json",
  },
});

// AI Service Client
export const aiApi = axios.create({
  baseURL: "https://talent-ai-production-1975.up.railway.app",
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor for Authentication
mainApi.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (token && token !== "undefined" && token !== "null") {
        config.headers.Authorization = `Bearer ${token}`;
      } else {
        // Explicitly remove the header if token is invalid to avoid Spring Security rejection
        delete config.headers.Authorization;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

aiApi.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (token && token !== "undefined" && token !== "null") {
        config.headers.Authorization = `Bearer ${token}`;
      } else {
        delete config.headers.Authorization;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor for Error Handling
mainApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle Unauthorized (e.g., redirect to login)
      if (typeof window !== "undefined") {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);
