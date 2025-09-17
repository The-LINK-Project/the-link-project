import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import createMiddleware from "next-intl/middleware";
import { NextResponse } from "next/server";
import { routing } from "./i18n/routing"; // you're already using defineRouting() — keep it!

const intl = createMiddleware(routing);

const isPublicRoute = createRouteMatcher([
    "/",
    "/sign-in(.*)",
    "/sign-up(.*)",
    "/api/webhook/clerk",
    "/contact",
    "/about"
]);

const isAdminRoute = createRouteMatcher(["/admin(.*)"]);

function stripLocale(req: Request & { nextUrl: URL }) {
    const url = new URL(req.url);
    const segments = url.pathname.split("/");
    const hasLocale = routing.locales.includes(segments[1] as any);
    const locale = hasLocale ? segments[1] : routing.defaultLocale;

    if (hasLocale) {
        url.pathname = "/" + segments.slice(2).join("/");
        if (url.pathname === "//") url.pathname = "/";
    }

    return {
        locale,
        reqWithoutLocale: { ...req, nextUrl: url } as any,
    };
}

export default clerkMiddleware(async (auth, req) => {
    // 1. Run next-intl's locale logic first
    const intlResult = intl(req);
    if (intlResult && intlResult.status !== 200) return intlResult;

    // 2. Then run your route auth logic
    const { userId } = await auth();
    const { locale, reqWithoutLocale } = stripLocale(req);

    if (isAdminRoute(reqWithoutLocale)) {
        if (!userId) {
            return NextResponse.redirect(new URL(`/${locale}/sign-in`, req.url));
        }
        return NextResponse.next();
    }

    if (!isPublicRoute(reqWithoutLocale)) {
        if (!userId) {
            return NextResponse.redirect(new URL(`/${locale}/sign-in`, req.url));
        }
    }

    return NextResponse.next();
});

export const config = {
    matcher: ["/((?!api|trpc|_next|_vercel|.*\\..*).*)"]
};
