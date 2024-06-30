import axios from "axios";
import { getToken } from "./get-token";

const http = axios.create({
  baseURL: "http://localhost:8000",
  timeout: 30000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Change request data/error here
http.interceptors.request.use(
  (config: any) => {
    const token = getToken();
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token ? token : ""}`,
    };
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default http;
