"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { tokenStorage } from "@/lib/api/token";
import { ShieldCheck } from "lucide-react";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { AppSidebar } from "@/components/layout/app-sidebar";

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Client-side session check for tab syncing / storage events
    const checkAuth = () => {
      if (!tokenStorage.isAuthenticated()) {
        const redirectUrl = pathname ? `/login?redirect=${encodeURIComponent(pathname)}` : "/login";
        router.replace(redirectUrl);
      }
    };

    checkAuth();
    window.addEventListener("storage", checkAuth);
    return () => window.removeEventListener("storage", checkAuth);
  }, [pathname, router]);

  return (
    <SidebarProvider defaultOpen={true}>
      <AppSidebar />
      <SidebarInset className="min-h-screen bg-background flex flex-col">
        {/* Top Sticky Header */}
        <header className="sticky top-0 z-20 flex h-14 shrink-0 items-center justify-between gap-2 border-b border-border/80 bg-background/85 px-4 sm:px-6 backdrop-blur-md">
          <div className="flex items-center gap-2.5">
            <SidebarTrigger className="-ml-1 cursor-pointer text-muted-foreground hover:text-foreground" />
            <Separator orientation="vertical" className="h-4" />
            <div className="flex items-center gap-1.5 text-sm font-medium">
              <span className="text-muted-foreground">Admin</span>
              <span className="text-muted-foreground/60">/</span>
              <span className="text-foreground capitalize">
                {pathname?.replace(/^\//, "") || "Dashboard"}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="hidden sm:inline-flex items-center gap-1.5 text-xs text-muted-foreground bg-muted/60 px-2.5 py-1 rounded-full border border-border/70">
              <ShieldCheck className="size-3.5 text-emerald-500" />
              Authenticated Session
            </span>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 w-full overflow-y-auto">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
