// api/axios.js
import axios from "axios";

const BASE_URL = "http://127.0.0.1:8080/api/v1/campuskey"; 

// Axios instance
const API = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});


// attach token automatically
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("jwt");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default API;
