import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Define routes that should be publicly accessible (not protected)
const isPublicRoute = createRouteMatcher([
  "/sign-in",
  "/sign-in(.*)",
  "/sign-up",
  "/sign-up(.*)",
  "/",
]);

// Define admin routes that require special authorization
const isAdminRoute = createRouteMatcher(["/admin(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth();

  // Handle admin routes
  if (isAdminRoute(req)) {
    if (!userId) {
      const signInUrl = new URL("/sign-in", req.url);
      return NextResponse.redirect(signInUrl);
    }

    // For admin routes, we need to check if user email is in whitelist
    // This will be done at the page level for better UX and to avoid repeated API calls
    return NextResponse.next();
  }

  // Handle other protected routes
  if (!isPublicRoute(req)) {
    if (!userId) {
      const signInUrl = new URL("/sign-in", req.url);
      return NextResponse.redirect(signInUrl);
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    // Run middleware for everything except static files and Next internals
    "/((?!_next|[^?]*\\.(?:js|css|jpg|jpeg|png|svg|ico|webp|ttf|woff2?|json|csv|html)).*)",
    // Also run for API routes
    "/api/(.*)",
  ],
};
