import { currentUser, User } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { cache } from "react";
import { ADMIN_CONFIG, isAdminEmail } from "@/lib/config/admin";

// One Clerk Backend API call per request, however many actions on the page
// check admin status (e.g. /admin/surveys calls requireAdmin per survey)
const getCachedCurrentUser = cache(() => currentUser());

// The admin check must use the VERIFIED PRIMARY email. emailAddresses[0] has
// no guaranteed order and may include unverified addresses — anyone could add
// an admin's email to their own account without ever proving they own it.
function getVerifiedPrimaryEmail(user: User): string | undefined {
  const primary =
    user.primaryEmailAddress ??
    user.emailAddresses?.find(
      (email) => email.id === user.primaryEmailAddressId,
    );

  if (!primary || primary.verification?.status !== "verified") {
    return undefined;
  }

  return primary.emailAddress;
}

/**
 * Checks if the current user is authorized to access admin routes
 * Redirects unauthorized users appropriately
 */
export async function requireAdminAccess() {
  const user = await getCachedCurrentUser();

  if (!user) {
    redirect(ADMIN_CONFIG.redirectPaths.signIn);
  }

  const userEmail = getVerifiedPrimaryEmail(user);

  if (!isAdminEmail(userEmail)) {
    redirect(ADMIN_CONFIG.redirectPaths.unauthorized);
  }

  return user;
}

//Checks if the current user is an admin (without redirecting)
//Useful for conditional rendering

export async function isAdmin() {
  try {
    const user = await getCachedCurrentUser();

    if (!user) {
      return false;
    }

    return isAdminEmail(getVerifiedPrimaryEmail(user));
  } catch {
    return false;
  }
}

//Get the admin emails list

export function getAdminEmails() {
  return ADMIN_CONFIG.adminEmails;
}

// Guard for admin-only server actions. Unlike requireAdminAccess it throws
// instead of redirecting: server actions are bare POST endpoints, and page
// guards never run for them.
export async function requireAdmin() {
  if (!(await isAdmin())) {
    throw new Error("Not authorized");
  }
}
