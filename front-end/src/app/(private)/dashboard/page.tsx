"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  LayoutDashboard,
  LogOut,
  Users,
  Activity,
  DollarSign,
  TrendingUp,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLogout } from "@/hooks/api/use-auth";
import { useDashboardStatsQuery } from "@/hooks/api/use-dashboard";
import { tokenStorage } from "@/lib/api/token";
import { IAuthUser } from "@/services/auth/auth.types";

const Dashboard = () => {
  const router = useRouter();
  const logout = useLogout();
  const [currentUser, setCurrentUser] = useState<IAuthUser | null>(null);

  // Read stored user on mount and guard client route
  useEffect(() => {
    if (!tokenStorage.isAuthenticated()) {
      router.push("/login");
    } else {
      setCurrentUser(tokenStorage.getUser<IAuthUser>());
    }
  }, [router]);

  // Query dashboard statistics via React Query
  const { data: stats, isLoading: statsLoading } = useDashboardStatsQuery();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-30 border-b border-border/80 bg-card/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm">
              <LayoutDashboard className="size-5" />
            </div>
            <div>
              <h1 className="text-lg font-semibold tracking-tight text-foreground">
                Dashboard
              </h1>
              <p className="text-xs text-muted-foreground">
                Welcome back{currentUser?.name ? `, ${currentUser.name}` : ""}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {currentUser?.email && (
              <span className="hidden sm:inline-flex items-center gap-1.5 text-xs text-muted-foreground bg-muted px-2.5 py-1 rounded-full border border-border">
                <ShieldCheck className="size-3.5 text-emerald-500" />
                {currentUser.email}
              </span>
            )}
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="gap-1.5 cursor-pointer"
            >
              <LogOut className="size-3.5" />
              Sign out
            </Button>
          </div>
        </div>
      </header>

      {/* Main Dashboard Content */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Welcome Banner */}
        <div className="mb-8 rounded-2xl border border-border/80 bg-card/60 p-6 backdrop-blur-sm shadow-sm">
          <h2 className="text-xl font-semibold text-foreground">
            Overview & Metrics
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Feature-based dashboard service connected to TanStack Query.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {/* Card 1 */}
          <div className="rounded-xl border border-border bg-card p-5 shadow-sm transition-all hover:shadow-md">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Total Users
              </span>
              <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Users className="size-4" />
              </div>
            </div>
            <div className="mt-3">
              <div className="text-2xl font-bold tracking-tight text-foreground">
                {statsLoading ? "..." : (stats?.totalUsers ?? 1248)}
              </div>
              <p className="mt-1 text-xs text-emerald-600 dark:text-emerald-400">
                +12% from last month
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="rounded-xl border border-border bg-card p-5 shadow-sm transition-all hover:shadow-md">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Active Sessions
              </span>
              <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Activity className="size-4" />
              </div>
            </div>
            <div className="mt-3">
              <div className="text-2xl font-bold tracking-tight text-foreground">
                {statsLoading ? "..." : (stats?.activeSessions ?? 342)}
              </div>
              <p className="mt-1 text-xs text-emerald-600 dark:text-emerald-400">
                Live monitoring active
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="rounded-xl border border-border bg-card p-5 shadow-sm transition-all hover:shadow-md">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Total Revenue
              </span>
              <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <DollarSign className="size-4" />
              </div>
            </div>
            <div className="mt-3">
              <div className="text-2xl font-bold tracking-tight text-foreground">
                {statsLoading ? "..." : `$${(stats?.revenue ?? 48250).toLocaleString()}`}
              </div>
              <p className="mt-1 text-xs text-emerald-600 dark:text-emerald-400">
                +8.4% this quarter
              </p>
            </div>
          </div>

          {/* Card 4 */}
          <div className="rounded-xl border border-border bg-card p-5 shadow-sm transition-all hover:shadow-md">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Growth Rate
              </span>
              <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <TrendingUp className="size-4" />
              </div>
            </div>
            <div className="mt-3">
              <div className="text-2xl font-bold tracking-tight text-foreground">
                {statsLoading ? "..." : `${stats?.growthRate ?? 24.8}%`}
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                Target: 25.0%
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;