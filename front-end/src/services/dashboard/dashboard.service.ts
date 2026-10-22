import { apiClient } from "@/lib/api/axios-client";
import { IDashboardStats, IActivityItem, IUserProfile } from "./dashboard.types";

/**
 * Dashboard service handling metrics, user profile, and activity feeds.
 * Extensible for all future dashboard APIs.
 */
export const dashboardService = {
  /**
   * Fetch summary statistics for the dashboard
   * GET /dashboard/stats
   */
  getStats: async (): Promise<IDashboardStats> => {
    const response = await apiClient.get<IDashboardStats>("/dashboard/stats");
    return response.data;
  },

  /**
   * Fetch recent activity log
   * GET /dashboard/activities
   */
  getActivities: async (): Promise<IActivityItem[]> => {
    const response = await apiClient.get<IActivityItem[]>("/dashboard/activities");
    return response.data;
  },

  /**
   * Fetch user dashboard profile
   * GET /dashboard/profile
   */
  getProfile: async (): Promise<IUserProfile> => {
    const response = await apiClient.get<IUserProfile>("/dashboard/profile");
    return response.data;
  },
};

export default dashboardService;
