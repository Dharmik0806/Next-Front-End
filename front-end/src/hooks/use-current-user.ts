"use client";

import { useSyncExternalStore } from "react";
import { tokenStorage } from "@/lib/api/token";
import { IAuthUser } from "@/services/auth/auth.types";

const emptySubscribe = () => () => {};

/**
 * Hydration-safe hook to access current user data from localStorage
 * Returns null during SSR and initial hydration to prevent mismatch,
 * then resolves the authenticated user once mounted.
 */
export function useCurrentUser(): IAuthUser | null {
  const isMounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  if (!isMounted) {
    return null;
  }

  return tokenStorage.getUser<IAuthUser>();
}
