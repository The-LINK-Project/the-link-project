import { clerkMiddleware } from "@clerk/nextjs/server";
import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { routing } from "./i18n/routing";

// Create the intl middleware
const intlMiddleware = createMiddleware(routing);

// Public routes, matched against the locale-stripped pathname. Plain path
// matching (no fake request objects) — API routes never reach here, the
// matcher below excludes them.
const publicRoutePatterns = [
    /^\/$/,
    /^\/sign-in(\/.*)?$/,
    /^\/sign-up(\/.*)?$/,
    /^\/contact$/,
    /^\/about$/,
];

const isPublicPath = (path: string) =>
    publicRoutePatterns.some((pattern) => pattern.test(path));

const isAdminPath = (path: string) =>
    path === "/admin" || path.startsWith("/admin/");

export default clerkMiddleware(async (auth, req: NextRequest) => {
    const { pathname } = req.nextUrl;

    // Skip API routes, static files, and Next.js internals
    if (
        pathname.startsWith("/api/") ||
        pathname.startsWith("/_next/") ||
        pathname.startsWith("/_vercel/") ||
        (pathname.includes(".") && !pathname.endsWith("/"))
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

    // Strip the locale prefix for route matching
    const pathForMatching =
        segments.length > 0 && routing.locales.includes(segments[0] as any)
            ? "/" + segments.slice(1).join("/")
            : pathname;

    const normalizedPath = pathForMatching || "/";

    // Only protected routes pay for the auth() call — public pages
    // (landing, about, contact, sign-in/up) skip Clerk entirely
    if (isAdminPath(normalizedPath)) {
        const { userId } = await auth();
        if (!userId) {
            const signInUrl = new URL(`/${locale}/sign-in`, req.url);
            return NextResponse.redirect(signInUrl);
        }
    } else if (!isPublicPath(normalizedPath)) {
        const { userId } = await auth();
        if (!userId) {
            const isDashboardRoute =
                normalizedPath === "/dashboard" ||
                normalizedPath.startsWith("/dashboard/");
            const redirectPath = isDashboardRoute
                ? `/${locale}/sign-up`
                : `/${locale}/sign-in`;
            const redirectUrl = new URL(redirectPath, req.url);
            return NextResponse.redirect(redirectUrl);
        }
    }

    // Return the intl response or continue
    return intlResponse || NextResponse.next();
});

export const config = {
    matcher: [
        // Skip all internal paths (_next, _vercel) and API routes
        "/((?!api|_next|_vercel|.*\\..*).*)",
        // The route handler performs its own authorization, but Clerk's
        // middleware must run first so auth() has request context.
        "/api/tts",
    ]
};
