"use client";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ADMIN_CONFIG, isAdminEmail } from "@/lib/config/admin";

export function useAdminAccess() {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    if (isLoaded) {
      if (!user) {
        router.push(ADMIN_CONFIG.redirectPaths.signIn);
        return;
      }

      const userEmail = user.emailAddresses?.[0]?.emailAddress;
      if (!isAdminEmail(userEmail)) {
        router.push(ADMIN_CONFIG.redirectPaths.unauthorized);
        return;
      }

      setIsAuthorized(true);
      setIsChecking(false);
    }
  }, [user, isLoaded, router]);

  return {
    isAuthorized,
    isChecking,
    user,
    isLoaded
  };
}

export function useIsAdmin() {
  const { user, isLoaded } = useUser();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (isLoaded && user) {
      const userEmail = user.emailAddresses?.[0]?.emailAddress;
      setIsAdmin(isAdminEmail(userEmail));
    } else {
      setIsAdmin(false);
    }
  }, [user, isLoaded]);

  return {
    isAdmin,
    isLoaded,
    user
  };
}
