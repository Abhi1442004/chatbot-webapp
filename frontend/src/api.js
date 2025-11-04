import axios from "axios";

// Set your backend URL (FastAPI on port 8000)
axios.defaults.baseURL = "http://127.0.0.1:8000";

// ✅ Automatically include JWT token with every request
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

export const signup = async (data) => {
  const response = await axios.post("/signup", data);
  return response.data;
};

export const login = async (data) => {
  const response = await axios.post("/login", data);
  return response.data;
};

export const sendMessage = async (data) => {
  const response = await axios.post("/chat", data);
  return response.data;
};

export const getSavedAnswers = async () => {
  const response = await axios.get("/saved-answers");
  return response.data;
};
