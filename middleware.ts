// middleware.ts
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher([
    "/",
    "/sign-in(.*)",
    "/sign-up(.*)",
]);

const isWebhookRoute = createRouteMatcher([
    "/api/webhook/clerk"
]);

export default clerkMiddleware(async (auth, req) => {
    // IMPORTANT: Skip all middleware processing for webhook routes
    if (isWebhookRoute(req)) {
        return NextResponse.next();
    }

    // Handle public routes
    if (isPublicRoute(req)) {
        return NextResponse.next();
    }

    // Protect all other routes
    const { userId } = await auth();
    if (!userId) {
        const signInUrl = new URL("/sign-in", req.url);
        return NextResponse.redirect(signInUrl);
    }

    return NextResponse.next();
});

export const config = {
    matcher: [
        // Skip Next.js internals and all static files, unless found in search params
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        // Always run for API routes
        '/(api|trpc)(.*)',
    ],
};