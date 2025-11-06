// src/api.js
import axios from "axios";

// ✅ Use environment variable from .env
const BASE_URL =
  process.env.REACT_APP_API_URL || "http://127.0.0.1:8000"; // fallback for local dev

const api = axios.create({
  baseURL: BASE_URL,
});

// ✅ Automatically include JWT token with every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

// ✅ API endpoints
export const signup = async (data) => {
  const response = await api.post("/signup", data);
  return response.data;
};

export const login = async (data) => {
  const response = await api.post("/login", data);
  return response.data;
};

export const sendMessage = async (data) => {
  const response = await api.post("/chat", data);
  return response.data;
};

export const getSavedAnswers = async () => {
  const response = await api.get("/saved-answers");
  return response.data;
};

export default api;
