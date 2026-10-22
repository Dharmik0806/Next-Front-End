import axios, {
  AxiosError,
  AxiosInstance,
  InternalAxiosRequestConfig,
} from "axios";
import { toast } from "@/components/ui/sonner";
import { tokenStorage } from "./token";

// Extension to AxiosRequestConfig for custom properties
declare module "axios" {
  export interface AxiosRequestConfig {
    skipToast?: boolean;
    _retry?: boolean;
  }
}

interface FailedQueueItem {
  resolve: (token: string) => void;
  reject: (error: unknown) => void;
}

let isRefreshing = false;
let failedQueue: FailedQueueItem[] = [];

const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else if (token) {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

/**
 * Extracts a readable error message from Axios error
 */
export const extractErrorMessage = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data as { message?: string; error?: string } | undefined;
    return (
      data?.message ||
      data?.error ||
      error.message ||
      "An unexpected error occurred. Please try again."
    );
  }
  if (error instanceof Error) {
    return error.message;
  }
  return "An unexpected error occurred.";
};

export const setupInterceptors = (axiosInstance: AxiosInstance): void => {
  // ==========================================
  // Request Interceptor
  // ==========================================
  axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const token = tokenStorage.getAccessToken();

      // Automatically attach Bearer token if present
      if (token && !config.headers.Authorization) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    },
    (error: AxiosError) => {
      return Promise.reject(error);
    }
  );

  // ==========================================
  // Response Interceptor
  // ==========================================
  axiosInstance.interceptors.response.use(
    (response) => {
      // Successful responses pass through directly
      return response;
    },
    async (error: AxiosError) => {
      const originalRequest = error.config as InternalAxiosRequestConfig & {
        _retry?: boolean;
        skipToast?: boolean;
      };

      // Don't intercept if request configuration is missing
      if (!originalRequest) {
        return Promise.reject(error);
      }

      const status = error.response?.status;
      const url = originalRequest.url || "";
      const isAuthEndpoint =
        url.includes("/login") ||
        url.includes("/register") ||
        url.includes("/refresh-token");

      // ========================================================
      // 401 Unauthorized Handling & Token Refresh Queue
      // ========================================================
      if (status === 401 && !isAuthEndpoint && !originalRequest._retry) {
        const refreshToken = tokenStorage.getRefreshToken();

        if (!refreshToken) {
          // No refresh token available - clear session and redirect to login
          tokenStorage.clearAuth();
          if (typeof window !== "undefined" && !window.location.pathname.includes("/login")) {
            toast.error("Session expired. Please log in again.");
            window.location.href = "/login";
          }
          return Promise.reject(error);
        }

        // If another request is currently refreshing the token, queue this request
        if (isRefreshing) {
          return new Promise<string>((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          })
            .then((token) => {
              originalRequest.headers.Authorization = `Bearer ${token}`;
              return axiosInstance(originalRequest);
            })
            .catch((err) => Promise.reject(err));
        }

        originalRequest._retry = true;
        isRefreshing = true;

        try {
          const baseURL =
            axiosInstance.defaults.baseURL ||
            process.env.NEXT_PUBLIC_API_URL ||
            "http://localhost:5000/api";

          // Call refresh endpoint directly using a clean axios instance to avoid loops
          const { data } = await axios.post<{
            accessToken: string;
            refreshToken?: string;
          }>(`${baseURL}/refresh-token`, { refreshToken });

          const newAccessToken = data.accessToken;
          const newRefreshToken = data.refreshToken || refreshToken;

          // Save refreshed tokens
          tokenStorage.setTokens(newAccessToken, newRefreshToken);

          // Update header of current instance and original request
          axiosInstance.defaults.headers.common.Authorization = `Bearer ${newAccessToken}`;
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

          // Resolve all queued requests with the new token
          processQueue(null, newAccessToken);

          // Retry the original request
          return axiosInstance(originalRequest);
        } catch (refreshError) {
          // Refresh failed - reject all queued requests and clear auth
          processQueue(refreshError, null);
          tokenStorage.clearAuth();

          if (typeof window !== "undefined" && !window.location.pathname.includes("/login")) {
            toast.error("Your session has expired. Please log in again.");
            window.location.href = "/login";
          }

          return Promise.reject(refreshError);
        } finally {
          isRefreshing = false;
        }
      }

      // ========================================================
      // Global Error Toast Notification
      // ========================================================
      if (!originalRequest.skipToast && !axios.isCancel(error)) {
        const message = extractErrorMessage(error);
        toast.error(message);
      }

      return Promise.reject(error);
    }
  );
};
