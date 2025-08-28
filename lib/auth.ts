import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { ADMIN_CONFIG, isAdminEmail } from "@/lib/config/admin";

/**
 * Checks if the current user is authorized to access admin routes
 * Redirects unauthorized users appropriately
 */
export async function requireAdminAccess() {
  const user = await currentUser();

  if (!user) {
    redirect(ADMIN_CONFIG.redirectPaths.signIn);
  }

  const userEmail = user.emailAddresses?.[0]?.emailAddress;

  if (!isAdminEmail(userEmail)) {
    redirect(ADMIN_CONFIG.redirectPaths.unauthorized);
  }

  return user;
}

//Checks if the current user is an admin (without redirecting)
//Useful for conditional rendering

export async function isAdmin() {
  try {
    const user = await currentUser();

    if (!user) {
      return false;
    }

    const userEmail = user.emailAddresses?.[0]?.emailAddress;

    return isAdminEmail(userEmail);
  } catch {
    return false;
  }
}

//Get the admin emails list

export function getAdminEmails() {
  return ADMIN_CONFIG.adminEmails;
}
