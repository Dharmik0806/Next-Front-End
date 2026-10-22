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
      // Persist session tokens
      if (data.accessToken) {
        tokenStorage.setTokens(data.accessToken, data.refreshToken);
      }
      if (data.user) {
        tokenStorage.setUser(data.user);
      }

      // Invalidate current user query to trigger fresh fetch
      queryClient.invalidateQueries({ queryKey: AUTH_QUERY_KEYS.currentUser });

      toast.success("Login successful!", {
        description: data.user?.email
          ? `Welcome back, ${data.user.email}!`
          : "Welcome back!",
      });

      // Redirect to protected dashboard
      router.push("/dashboard");
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
      queryClient.clear();
      toast.success("Logged out successfully");
      router.push("/login");
    }
  };
};
