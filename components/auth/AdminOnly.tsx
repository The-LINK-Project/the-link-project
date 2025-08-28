"use client";

import { useIsAdmin } from "@/lib/hooks/useAdminAccess";

interface AdminOnlyProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export function AdminOnly({ children, fallback = null }: AdminOnlyProps) {
  const { isAdmin, isLoaded } = useIsAdmin();

  if (!isLoaded) {
    return <>{fallback}</>;
  }

  return isAdmin ? <>{children}</> : <>{fallback}</>;
}
