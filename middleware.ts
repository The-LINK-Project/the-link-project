import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { routing } from "./i18n/routing";

// Create the intl middleware
const intlMiddleware = createMiddleware(routing);

// Define public routes (these should match the actual paths without locale prefixes)
const isPublicRoute = createRouteMatcher([
    "/",
    "/sign-in(.*)",
    "/sign-up(.*)",
    "/api/webhook/clerk",
    "/contact",
    "/about"
]);

// Define admin routes
const isAdminRoute = createRouteMatcher(["/admin(.*)"]);

export default clerkMiddleware(async (auth, req: NextRequest) => {
    const { pathname } = req.nextUrl;

    // Skip API routes, static files, and Next.js internals
    if (
        pathname.startsWith("/api/") ||
        pathname.startsWith("/_next/") ||
        pathname.startsWith("/_vercel/") ||
        pathname.includes(".") && !pathname.endsWith("/")
    ) {
        return NextResponse.next();
    }

    // Handle internationalization first
    const intlResponse = intlMiddleware(req);

    // If intl middleware returns a redirect, handle auth logic with the redirected URL
    if (intlResponse && intlResponse.status >= 300 && intlResponse.status < 400) {
        // Let the intl middleware handle the redirect
        return intlResponse;
    }

    // Extract locale from pathname for auth redirects
    let locale = routing.defaultLocale;
    const segments = pathname.split("/").filter(Boolean);

    if (segments.length > 0 && routing.locales.includes(segments[0] as any)) {
        locale = segments[0] as any;
    }

    // Get auth info
    const { userId } = await auth();

    // Create a request object for route matching (without locale prefix)
    const pathForMatching = segments.length > 0 && routing.locales.includes(segments[0] as any)
        ? "/" + segments.slice(1).join("/")
        : pathname;

    const matchingRequest = {
        ...req,
        nextUrl: {
            ...req.nextUrl,
            pathname: pathForMatching || "/"
        }
    } as NextRequest;

    // Check admin routes
    if (isAdminRoute(matchingRequest)) {
        if (!userId) {
            const signInUrl = new URL(`/${locale}/sign-in`, req.url);
            return NextResponse.redirect(signInUrl);
        }
    }

    // Check protected routes
    else if (!isPublicRoute(matchingRequest)) {
        if (!userId) {
            const signInUrl = new URL(`/${locale}/sign-in`, req.url);
            return NextResponse.redirect(signInUrl);
        }
    }

    // Return the intl response or continue
    return intlResponse || NextResponse.next();
});

export const config = {
    matcher: [
        // Skip all internal paths (_next, _vercel) and API routes
        "/((?!api|_next|_vercel|.*\\..*).*)",
    ]
};