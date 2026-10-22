"use client";

import { useQuery } from "@tanstack/react-query";
import { dashboardService } from "@/services/dashboard/dashboard.service";
import { tokenStorage } from "@/lib/api/token";

export const DASHBOARD_QUERY_KEYS = {
  stats: ["dashboard", "stats"] as const,
  activities: ["dashboard", "activities"] as const,
  profile: ["dashboard", "profile"] as const,
};

/**
 * Hook to query dashboard metrics/statistics
 */
export const useDashboardStatsQuery = () => {
  return useQuery({
    queryKey: DASHBOARD_QUERY_KEYS.stats,
    queryFn: () => dashboardService.getStats(),
    enabled: typeof window !== "undefined" && tokenStorage.isAuthenticated(),
    staleTime: 60 * 1000,
  });
};

/**
 * Hook to query recent dashboard activities
 */
export const useDashboardActivitiesQuery = () => {
  return useQuery({
    queryKey: DASHBOARD_QUERY_KEYS.activities,
    queryFn: () => dashboardService.getActivities(),
    enabled: typeof window !== "undefined" && tokenStorage.isAuthenticated(),
    staleTime: 30 * 1000,
  });
};

/**
 * Hook to query dashboard user profile
 */
export const useDashboardProfileQuery = () => {
  return useQuery({
    queryKey: DASHBOARD_QUERY_KEYS.profile,
    queryFn: () => dashboardService.getProfile(),
    enabled: typeof window !== "undefined" && tokenStorage.isAuthenticated(),
    staleTime: 5 * 60 * 1000,
  });
};
