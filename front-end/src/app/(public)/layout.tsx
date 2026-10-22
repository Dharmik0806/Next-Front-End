"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { tokenStorage } from "@/lib/api/token";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  useEffect(() => {
    // If authenticated user visits public auth routes, redirect to dashboard
    const checkAuth = () => {
      if (tokenStorage.isAuthenticated()) {
        router.replace("/dashboard");
      }
    };

    checkAuth();
    window.addEventListener("storage", checkAuth);
    return () => window.removeEventListener("storage", checkAuth);
  }, [router]);

  return <>{children}</>;
}
