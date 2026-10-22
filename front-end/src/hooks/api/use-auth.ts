"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { authService } from "@/services/auth/auth.service";
import {
  IAuthResponse,
  ILoginPayload,
  IRegisterPayload,
} from "@/services/auth/auth.types";
import { tokenStorage } from "@/lib/api/token";
import { toast } from "@/components/ui/sonner";

export const AUTH_QUERY_KEYS = {
  currentUser: ["auth", "currentUser"] as const,
};

/**
 * Hook for user login mutation
 */
export const useLoginMutation = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: ILoginPayload) => authService.login(payload),
    onSuccess: (data: IAuthResponse) => {
      // Robust extraction supporting standard & nested response shapes
      const accessToken =
        data.accessToken ||
        data.data?.accessToken ||
        data.token ||
        data.data?.token;

      const refreshToken =
        data.refreshToken ||
        data.data?.refreshToken;

      const user =
        data.user ||
        data.data?.user;

      // Persist session tokens to localStorage & cookies
      if (accessToken) {
        tokenStorage.setTokens(accessToken, refreshToken);
      }
      if (user) {
        tokenStorage.setUser(user);
      }

      // Invalidate current user query to trigger fresh fetch
      queryClient.invalidateQueries({ queryKey: AUTH_QUERY_KEYS.currentUser });

      const displayName = user?.name || user?.email;
      toast.success("Login successful!", {
        description: displayName
          ? `Welcome back, ${displayName}!`
          : "Welcome back!",
      });

      // Check if user was previously redirected from a private route
      let targetUrl = "/dashboard";
      if (typeof window !== "undefined") {
        const params = new URLSearchParams(window.location.search);
        const redirectParam = params.get("redirect");
        if (redirectParam && redirectParam.startsWith("/")) {
          targetUrl = redirectParam;
        }
      }

      // Smoothly navigate to dashboard / intended route
      router.replace(targetUrl);
      router.refresh();
    },
  });
};

/**
 * Hook for user registration mutation
 */
export const useRegisterMutation = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: (payload: IRegisterPayload) => authService.register(payload),
    onSuccess: (data: IAuthResponse, variables: IRegisterPayload) => {
      toast.success("Account created successfully!", {
        description: `Welcome aboard, ${variables.name}! Please sign in to continue.`,
      });

      // Redirect to login page
      router.push("/login");
    },
  });
};

/**
 * Hook to fetch the currently authenticated user profile
 */
export const useCurrentUserQuery = () => {
  return useQuery({
    queryKey: AUTH_QUERY_KEYS.currentUser,
    queryFn: () => authService.getCurrentUser(),
    enabled: typeof window !== "undefined" && tokenStorage.isAuthenticated(),
    staleTime: 5 * 60 * 1000,
  });
};

/**
 * Hook to handle user logout
 */
export const useLogout = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return async () => {
    try {
      await authService.logout();
    } finally {
      tokenStorage.clearAuth();
      queryClient.clear();
      toast.success("Logged out successfully");
      router.replace("/login");
      router.refresh();
    }
  };
};
