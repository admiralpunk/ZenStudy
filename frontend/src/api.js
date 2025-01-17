import axios from "axios";

const API = axios.create({
  baseURL:
    "https://contact-manager-backend-aniket-koltes-projects.vercel.app/api",
});

// Add token to headers if available
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;
    