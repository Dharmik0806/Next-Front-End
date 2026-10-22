import axios from "axios";
import { setupInterceptors } from "./interceptors";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

/**
 * Centralized Axios client instance configured with base URL, timeout,
 * and request/response interceptors.
 */
export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach request and response interceptors
setupInterceptors(apiClient);

export default apiClient;
