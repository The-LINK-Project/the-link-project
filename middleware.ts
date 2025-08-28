// middleware.ts
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublic = createRouteMatcher([
    "/",
    "/sign-in(.*)",
    "/sign-up(.*)",
]);

// Webhook must bypass auth/redirects
const isWebhook = createRouteMatcher(["/api/webhook/clerk"]);

export default clerkMiddleware(async (auth, req) => {
    if (isWebhook(req)) return NextResponse.next();

    const { userId } = await auth();

    if (!isPublic(req) && !userId) {
        return NextResponse.redirect(new URL("/sign-in", req.url));
    }

    return NextResponse.next();
});

// Run on everything except Next internals/static and the webhook
export const config = {
    matcher: [
        "/((?!api/webhook/clerk|_next/static|_next/image|favicon.ico).*)",
    ],
};
