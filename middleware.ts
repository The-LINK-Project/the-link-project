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
    /^\/delete-account$/,
    /^\/sign-in(\/.*)?$/,
    /^\/sign-up(\/.*)?$/,
    /^\/contact$/,
    /^\/about$/,
    /^\/privacy$/,
];

const isPublicPath = (path: string) =>
    publicRoutePatterns.some((pattern) => pattern.test(path));

const isAdminPath = (path: string) =>
    path === "/admin" || path.startsWith("/admin/");

export default clerkMiddleware(async (auth, req: NextRequest) => {
    const { pathname } = req.nextUrl;

    // Skip API routes and Next.js internals. Static assets are excluded by the
    // matcher below — never short-circuit on a bare "." here, since a dot can
    // be injected into any dynamic segment (e.g. /en/learn/1./quiz).
    if (
        pathname.startsWith("/api/") ||
        pathname.startsWith("/_next/") ||
        pathname.startsWith("/_vercel/")
    ) {
        return NextResponse.next();
    }

    // Handle internationalization first
    const intlResponse = intlMiddleware(req);

    if (intlResponse && intlResponse.status >= 300 && intlResponse.status < 400) {
        // next-intl decodes the path before rebuilding it, so a crafted one
        // like /en/%09/evil.com comes back as //evil.com: a redirect off the
        // site. Only ever send people somewhere on this one
        const location = intlResponse.headers.get("location");
        if (location && new URL(location, req.url).origin !== req.nextUrl.origin) {
            return NextResponse.redirect(new URL("/", req.url));
        }
        return intlResponse;
    }

    // Guard the page that will actually be served, not the path as typed.
    // next-intl decodes the URL once more on its way to the rewrite, so
    // /sign-in/%252e%252e/admin looks like a public sign-in page here but is
    // served as /en/admin
    const rewrite = intlResponse?.headers.get("x-middleware-rewrite");
    const servedPath = rewrite ? new URL(rewrite, req.url).pathname : pathname;

    // Extract locale from the served path for auth redirects
    let locale = routing.defaultLocale;
    const segments = servedPath.split("/").filter(Boolean);

    if (segments.length > 0 && routing.locales.includes(segments[0] as any)) {
        locale = segments[0] as any;
    }

    // Strip the locale prefix for route matching
    const pathForMatching =
        segments.length > 0 && routing.locales.includes(segments[0] as any)
            ? "/" + segments.slice(1).join("/")
            : servedPath;

    const normalizedPath = pathForMatching || "/";

    // Signing in brings the learner back to the page they were opening (a
    // survey link from a workshop QR code, a lesson), not the home page. It is
    // this request's own URL, so it cannot name another site: rebuilding it
    // from the path would turn //example.net into one.
    const withReturn = (path: string) => {
        const url = new URL(path, req.url);
        url.searchParams.set("redirect_url", req.url);
        return url;
    };

    // Only protected routes pay for the auth() call — public pages
    // (landing, about, contact, sign-in/up) skip Clerk entirely
    if (isAdminPath(normalizedPath)) {
        const { userId } = await auth();
        if (!userId) {
            return NextResponse.redirect(withReturn(`/${locale}/sign-in`));
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
            return NextResponse.redirect(withReturn(redirectPath));
        }
    }

    // Return the intl response or continue
    return intlResponse || NextResponse.next();
});

export const config = {
    matcher: [
        // Skip internal paths (_next, _vercel), API routes, and real static
        // assets. Only genuine file extensions anchored at the end of the path
        // are excluded — a bare "." must not switch the auth gate off.
        "/((?!api|_next|_vercel|.*\\.(?:ico|png|jpe?g|gif|svg|webp|avif|css|js|mjs|map|txt|xml|json|webmanifest|woff2?|ttf|otf|eot|mp4|webm|mp3|wav|pdf)$).*)",
        // The speaking tutor checks the session with auth(), which only works
        // on requests Clerk's middleware has seen. The handler above passes
        // every /api/ path straight through, so nothing else changes for it.
        "/api/tutor/(.*)",
    ]
};
