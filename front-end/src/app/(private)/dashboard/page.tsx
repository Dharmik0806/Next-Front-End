"use client";

import {
  Users,
  Activity,
  DollarSign,
  TrendingUp,
  ShieldCheck,
  ArrowUpRight,
  Sparkles,
  Zap,
} from "lucide-react";
import { useDashboardStatsQuery } from "@/hooks/api/use-dashboard";
import { useCurrentUser } from "@/hooks/use-current-user";

const Dashboard = () => {
  const currentUser = useCurrentUser();

  // Query dashboard statistics via React Query
  const { data: stats } = useDashboardStatsQuery();

  const displayName = currentUser?.name || "Admin User";
  const displayEmail = currentUser?.email || "admin@example.com";

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Top Welcome Hero Banner */}
      <div className="relative overflow-hidden rounded-2xl border border-border/80 bg-gradient-to-br from-card via-card/90 to-primary/5 p-6 sm:p-8 shadow-sm">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
              <Sparkles className="size-3.5" />
              <span>Real-time Workspace</span>
            </div>
            <h1
              suppressHydrationWarning
              className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground"
            >
              Welcome back, {displayName}
            </h1>
            <p className="text-sm text-muted-foreground">
              Here is your project overview and latest performance metrics.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border border-border/80 bg-card text-xs text-muted-foreground shadow-xs">
              <ShieldCheck className="size-4 text-emerald-500" />
              <span suppressHydrationWarning>{displayEmail}</span>
            </div>
          </div>
        </div>

        {/* Ambient background decoration */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-12 -top-12 size-64 rounded-full bg-primary/10 blur-3xl"
        />
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Card 1 */}
        <div className="group rounded-xl border border-border/80 bg-card p-5 shadow-xs transition-all hover:border-border hover:shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Total Users
            </span>
            <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
              <Users className="size-4" />
            </div>
          </div>
          <div className="mt-4">
            <div
              suppressHydrationWarning
              className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground"
            >
              {(stats?.totalUsers ?? 1248).toLocaleString()}
            </div>
            <div className="mt-1 flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400">
              <ArrowUpRight className="size-3.5" />
              <span>+12.4% from last month</span>
            </div>
          </div>
        </div>

        {/* Card 2 */}
        <div className="group rounded-xl border border-border/80 bg-card p-5 shadow-xs transition-all hover:border-border hover:shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Active Sessions
            </span>
            <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
              <Activity className="size-4" />
            </div>
          </div>
          <div className="mt-4">
            <div
              suppressHydrationWarning
              className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground"
            >
              {(stats?.activeSessions ?? 342).toLocaleString()}
            </div>
            <div className="mt-1 flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400">
              <Zap className="size-3.5" />
              <span>Live streaming active</span>
            </div>
          </div>
        </div>

        {/* Card 3 */}
        <div className="group rounded-xl border border-border/80 bg-card p-5 shadow-xs transition-all hover:border-border hover:shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Total Revenue
            </span>
            <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
              <DollarSign className="size-4" />
            </div>
          </div>
          <div className="mt-4">
            <div
              suppressHydrationWarning
              className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground"
            >
              {`$${(stats?.revenue ?? 48250).toLocaleString()}`}
            </div>
            <div className="mt-1 flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400">
              <ArrowUpRight className="size-3.5" />
              <span>+8.4% this quarter</span>
            </div>
          </div>
        </div>

        {/* Card 4 */}
        <div className="group rounded-xl border border-border/80 bg-card p-5 shadow-xs transition-all hover:border-border hover:shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Growth Rate
            </span>
            <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
              <TrendingUp className="size-4" />
            </div>
          </div>
          <div className="mt-4">
            <div
              suppressHydrationWarning
              className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground"
            >
              {`${stats?.growthRate ?? 24.8}%`}
            </div>
            <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
              <span>Target: 25.0% yearly</span>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Information Cards */}
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-border/80 bg-card p-6 shadow-xs">
          <h3 className="text-base font-semibold text-foreground">
            Collapsible Sidebar Mode
          </h3>
          <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
            Use the toggle button in the top left header (or press <kbd className="px-1.5 py-0.5 rounded bg-muted border border-border font-mono text-[10px]">Ctrl+B</kbd>) to collapse the sidebar into icon-only mode.
          </p>
        </div>

        <div className="rounded-xl border border-border/80 bg-card p-6 shadow-xs">
          <h3 className="text-base font-semibold text-foreground">
            Protected App Layout
          </h3>
          <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
            All private routes in <code className="px-1.5 py-0.5 rounded bg-muted border border-border font-mono text-[10px]">(private)</code> share this unified sidebar with automatic session guard and token synchronization.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;