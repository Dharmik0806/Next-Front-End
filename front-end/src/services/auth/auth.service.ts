import { apiClient } from "@/lib/api/axios-client";
import { tokenStorage } from "@/lib/api/token";
import {
  IAuthResponse,
  IAuthUser,
  ILoginPayload,
  IRefreshTokenResponse,
  IRegisterPayload,
} from "./auth.types";

/**
 * Authentication service handling API requests for registration, login, token refresh, and logout.
 */
export const authService = {
  /**
   * Register a new user
   * POST /register
   */
  register: async (payload: IRegisterPayload): Promise<IAuthResponse> => {
    const response = await apiClient.post<IAuthResponse>("auth/register", payload);
    return response.data;
  },

  /**
   * Authenticate user with email and password
   * POST /login
   */
  login: async (payload: ILoginPayload): Promise<IAuthResponse> => {
    const response = await apiClient.post<IAuthResponse>("auth/login", payload);
    return response.data;
  },

  /**
   * Request a new access token using a refresh token
   * POST /refresh-token
   */
  refreshToken: async (refreshToken: string): Promise<IRefreshTokenResponse> => {
    const response = await apiClient.post<IRefreshTokenResponse>("auth/refresh-token", {
      refreshToken,
    });
    return response.data;
  },

  /**
   * Fetch current authenticated user profile
   * GET /auth/me
   */
  getCurrentUser: async (): Promise<IAuthUser> => {
    const response = await apiClient.get<IAuthUser>("auth/me");
    return response.data;
  },

  /**
   * Log out the current user and clear local session tokens
   * POST /logout
   */
  logout: async (): Promise<void> => {
    try {
      await apiClient.post("auth/logout", {}, { skipToast: true });
    } catch {
      // Ignore network/server errors during logout
    } finally {
      tokenStorage.clearAuth();
    }
  },
};

export default authService;
