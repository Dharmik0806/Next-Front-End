/**
 * Dashboard API Request & Response Types
 */

export interface IDashboardStats {
  totalUsers: number;
  activeSessions: number;
  revenue: number;
  growthRate: number;
}

export interface IActivityItem {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  type?: "info" | "success" | "warning";
}

export interface IUserProfile {
  id: string;
  name: string;
  email: string;
  role: string;
  avatarUrl?: string;
}
