"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  BarChart3,
  FolderKanban,
  Users,
  CreditCard,
  Settings,
  Bell,
  LifeBuoy,
  LogOut,
  Sparkles,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { useLogout } from "@/hooks/api/use-auth";
import { useCurrentUser } from "@/hooks/use-current-user";

const MAIN_NAV_ITEMS = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Analytics",
    url: "#analytics",
    icon: BarChart3,
  },
  {
    title: "Projects",
    url: "#projects",
    icon: FolderKanban,
    badge: "12",
  },
  {
    title: "Team Members",
    url: "#team",
    icon: Users,
  },
];

const PREFERENCES_NAV_ITEMS = [
  {
    title: "Billing & Plans",
    url: "#billing",
    icon: CreditCard,
  },
  {
    title: "Notifications",
    url: "#notifications",
    icon: Bell,
    badge: "3",
  },
  {
    title: "Settings",
    url: "#settings",
    icon: Settings,
  },
  {
    title: "Help & Support",
    url: "#support",
    icon: LifeBuoy,
  },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();
  const logout = useLogout();
  const user = useCurrentUser();

  const displayName = user?.name || "Admin User";
  const displayEmail = user?.email || "admin@example.com";
  const userInitials = displayName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <Sidebar collapsible="icon" {...props} className="border-r border-border/80">
      {/* Sidebar Header with Brand Logo */}
      <SidebarHeader className="p-3">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              className="gap-3 data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground cursor-pointer"
            >
              <div className="flex aspect-square size-8 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm">
                <Sparkles className="size-4" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight group-data-[collapsible=icon]:hidden">
                <span className="truncate font-semibold tracking-tight text-foreground">
                  DevPulse Pro
                </span>
                <span className="truncate text-xs text-muted-foreground">
                  Enterprise Suite
                </span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarSeparator />

      {/* Main Navigation Content */}
      <SidebarContent>
        {/* Main Section */}
        <SidebarGroup>
          <SidebarGroupLabel className="group-data-[collapsible=icon]:hidden text-xs uppercase tracking-wider text-muted-foreground/70">
            Platform
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="gap-1">
              {MAIN_NAV_ITEMS.map((item) => {
                const isActive = pathname === item.url;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      isActive={isActive}
                      tooltip={item.title}
                      render={<Link href={item.url} />}
                      className="cursor-pointer"
                    >
                      <item.icon className="size-4 shrink-0" />
                      <span className="truncate group-data-[collapsible=icon]:hidden">
                        {item.title}
                      </span>
                    </SidebarMenuButton>
                    {item.badge && (
                      <SidebarMenuBadge className="text-[10px] bg-primary/10 text-primary">
                        {item.badge}
                      </SidebarMenuBadge>
                    )}
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        {/* Preferences Section */}
        <SidebarGroup>
          <SidebarGroupLabel className="group-data-[collapsible=icon]:hidden text-xs uppercase tracking-wider text-muted-foreground/70">
            Preferences & Support
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="gap-1">
              {PREFERENCES_NAV_ITEMS.map((item) => {
                const isActive = pathname === item.url;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      isActive={isActive}
                      tooltip={item.title}
                      render={<Link href={item.url} />}
                      className="cursor-pointer"
                    >
                      <item.icon className="size-4 shrink-0" />
                      <span className="truncate group-data-[collapsible=icon]:hidden">
                        {item.title}
                      </span>
                    </SidebarMenuButton>
                    {item.badge && (
                      <SidebarMenuBadge className="text-[10px] bg-muted text-muted-foreground">
                        {item.badge}
                      </SidebarMenuBadge>
                    )}
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarSeparator />

      {/* Footer with User Profile and Sign Out */}
      <SidebarFooter className="p-3 pb-4">
        <SidebarMenu className="gap-2">
          <SidebarMenuItem>
            <div className="flex items-center gap-2.5 p-1.5 rounded-lg bg-sidebar-accent/50 group-data-[collapsible=icon]:p-0 group-data-[collapsible=icon]:bg-transparent group-data-[collapsible=icon]:justify-center">
              <div
                suppressHydrationWarning
                className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold text-xs shadow-xs"
              >
                {userInitials}
              </div>
              <div className="grid flex-1 text-left text-xs leading-tight group-data-[collapsible=icon]:hidden overflow-hidden">
                <span suppressHydrationWarning className="truncate font-semibold text-foreground">
                  {displayName}
                </span>
                <span suppressHydrationWarning className="truncate text-[11px] text-muted-foreground">
                  {displayEmail}
                </span>
              </div>
            </div>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton
              tooltip="Sign out"
              onClick={() => logout()}
              className="text-destructive hover:bg-destructive/10 hover:text-destructive cursor-pointer group-data-[collapsible=icon]:justify-center"
            >
              <LogOut className="size-4 shrink-0" />
              <span className="group-data-[collapsible=icon]:hidden text-xs font-medium">
                Sign out
              </span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      {/* Interactive Drag / Hover Rail */}
      <SidebarRail />
    </Sidebar>
  );
}

export default AppSidebar;
