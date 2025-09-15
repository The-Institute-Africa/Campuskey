// auth.js
import API from "./axios";

// Student or general login
export const login = async (email, password) => {
  try {
    const response = await API.post("/auth/login", { email, password });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Login failed" };
  }
};

// Signup
export const signup = async (name, email, password, role) => {
  try {
    const response = await API.post("/auth/signup", { name, email, password, role });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Signup failed" };
  }
};

// Extract user info from JWT
export const getUserFromToken = (token) => {
  if (!token) return null;
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return { email: payload.sub, role: payload.role?.toLowerCase() };
  } catch (e) {
    return null;
  }
};
