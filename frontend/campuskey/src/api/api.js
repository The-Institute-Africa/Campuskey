import axios from "axios";

const API = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api/v1/campuskey`,
  headers: {
    Accept: "application/json",
    // ❌ NEVER set Content-Type globally
  },
});

/**
 * ================================
 * REQUEST INTERCEPTOR
 * - JWT
 * - CSRF
 * - Smart Content-Type handling
 * ================================
 */
API.interceptors.request.use(
  async (config) => {
    // ---- JWT ----
    const isPublicAuthRequest = config.url?.startsWith("/auth/public/");
    const token = isPublicAuthRequest ? null : localStorage.getItem("JWT_TOKEN");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // ---- CSRF ----
    let csrfToken = localStorage.getItem("CSRF_TOKEN");
    if (!csrfToken) {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/csrf-token`
        );
        csrfToken = res.data.token;
        localStorage.setItem("CSRF_TOKEN", csrfToken);
      } catch (err) {
        console.error("Failed to fetch CSRF token", err);
      }
    }

    if (csrfToken) {
      config.headers["X-XSRF-TOKEN"] = csrfToken;
    }

    // ---- SMART CONTENT TYPE ----
    // Axios handles FormData automatically
    if (!(config.data instanceof FormData)) {
      config.headers["Content-Type"] = "application/json";
    } else {
      delete config.headers["Content-Type"];
    }

    return config;
  },
  (error) => Promise.reject(error)
);

/**
 * ================================
 * RESPONSE INTERCEPTOR
 * ================================
 */
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn("Unauthorized — token expired or invalid");
      // optional: logout / redirect
    }
    return Promise.reject(error);
  }
);

export default API;
