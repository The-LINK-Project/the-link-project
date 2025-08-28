import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher([
    "/",
    "/sign-in(.*)",
    "/sign-up(.*)",
    "/api/webhook/clerk",
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
        // Only run middleware on paths that are NOT:
        // - api/webhook/clerk
        // - static files
        // - _next internals
        "/((?!api/webhook/clerk|_next|.*\\..*).*)",
    ],
};
