import axios from "axios";

export const instance = axios.create({
  // baseURL: "https://gda-authorisation.apw.ge/api/",
  baseURL: "https://test-dga-authorisation.apw.ge/api/",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
