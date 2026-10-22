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
    const response = await apiClient.get<IDashboardStats | { data: IDashboardStats }>("/dashboard/stats");
    const result = response.data as { data?: IDashboardStats };
    return result?.data ?? (response.data as IDashboardStats);
  },

  /**
   * Fetch recent activity log
   * GET /dashboard/activities
   */
  getActivities: async (): Promise<IActivityItem[]> => {
    const response = await apiClient.get<IActivityItem[] | { data: IActivityItem[] }>("/dashboard/activities");
    const result = response.data as { data?: IActivityItem[] };
    return result?.data ?? (response.data as IActivityItem[]);
  },

  /**
   * Fetch user dashboard profile
   * GET /dashboard/profile
   */
  getProfile: async (): Promise<IUserProfile> => {
    const response = await apiClient.get<IUserProfile | { data: IUserProfile }>("/dashboard/profile");
    const result = response.data as { data?: IUserProfile };
    return result?.data ?? (response.data as IUserProfile);
  },
};

export default dashboardService;
