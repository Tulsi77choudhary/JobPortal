import axios from "axios";

export const API_BASE_URL = "http://localhost:5000/api";


const API = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json"
  }
});

// Optional: token add karna
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("jwt");
    console.log("Token:", localStorage.getItem("jwt"));
    if (token && token !== "null") {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default API;