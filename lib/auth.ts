import { auth, currentUser, User } from "@clerk/nextjs/server";
import { notFound, redirect, unstable_rethrow } from "next/navigation";
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
 * auth() throws when Clerk's middleware hasn't seen the request. The matcher
 * only skips paths ending in a file extension (so assets in public/ load), and
 * no page has one, so such a request is for a page that doesn't exist:
 * /en/legacy/learn/1.json would otherwise be a 500.
 */
async function sessionOrNotFound() {
  let session: Awaited<ReturnType<typeof auth>> | undefined;
  try {
    session = await auth();
  } catch (error) {
    // Next's own signals (dynamic rendering, redirects) pass straight through
    unstable_rethrow(error);
    console.error("Page reached without Clerk's middleware:", error);
  }
  if (!session) notFound();
  return session;
}

/**
 * Guard for signed-in-only pages. Layout-level backstop so that middleware.ts
 * is not the single point of failure for every learner page — a matcher hole
 * (one has already been found once) must not be enough on its own to serve a
 * protected page to an anonymous visitor.
 *
 * Only the session is checked, no Clerk Backend API call: this runs on every
 * render of every protected page.
 */
export async function requireSignedIn() {
  const { userId } = await sessionOrNotFound();

  if (!userId) {
    redirect(ADMIN_CONFIG.redirectPaths.signIn);
  }

  return userId;
}

/**
 * Checks if the current user is authorized to access admin routes
 * Redirects unauthorized users appropriately
 */
export async function requireAdminAccess() {
  await sessionOrNotFound();

  // currentUser() calls Clerk's API, which can fail (an outage, rate limit,
  // or an account deleted while its session is still live). Any of those is
  // "can't confirm you're an admin", not an error page
  let user: User | null = null;
  try {
    user = await getCachedCurrentUser();
  } catch (error) {
    unstable_rethrow(error);
    console.error("Couldn't load the Clerk user for an admin check:", error);
    redirect(ADMIN_CONFIG.redirectPaths.unauthorized);
  }

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
