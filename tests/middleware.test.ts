import { describe, expect, it, vi } from "vitest";
import { NextRequest } from "next/server";

// middleware.ts with the real next-intl middleware; only Clerk's session is
// faked. Paths are sent percent-encoded, exactly as a browser would.

const clerk = vi.hoisted(() => ({ signedInAs: null as string | null }));

vi.mock("@clerk/nextjs/server", () => ({
    clerkMiddleware:
        (
            handler: (
                auth: () => Promise<{ userId: string | null }>,
                req: NextRequest,
            ) => unknown,
        ) =>
        (req: NextRequest) =>
            handler(async () => ({ userId: clerk.signedInAs }), req),
}));

const { default: middleware } = await import("@/middleware");

const ORIGIN = "https://thelinkproject.org";

async function visit(path: string, signedIn = false) {
    clerk.signedInAs = signedIn ? "user_A" : null;
    const response = (await (middleware as any)(
        new NextRequest(ORIGIN + path),
    )) as Response;
    const location = response.headers.get("location");
    const rewrite = response.headers.get("x-middleware-rewrite");
    return {
        status: response.status,
        location: location ? new URL(location, ORIGIN) : null,
        served: rewrite ? new URL(rewrite, ORIGIN).pathname : null,
    };
}

const isRedirect = (status: number) => status >= 300 && status < 400;

describe("middleware redirects", () => {
    // next-intl decodes the path and drops the tab, leaving //host/...: a
    // redirect to whatever site the link names
    it.each([
        "/en/%09/example.net",
        "/en/%09%09/example.net",
        "/bn/%09/example.net/dashboard",
        "/en/about/%2e%2e/%09/example.net",
        "/en/%09/%09/example.net",
    ])("never sends anyone off the site: %s", async (path) => {
        for (const signedIn of [false, true]) {
            const { status, location } = await visit(path, signedIn);
            if (isRedirect(status)) {
                expect(location?.origin).toBe(ORIGIN);
            }
        }
    });
});

describe("middleware guard", () => {
    // Each must reach sign-in/sign-up signed out, whatever it looks like
    it.each([
        "/dashboard",
        "/en/dashboard",
        "/bn/dashboard",
        "/admin",
        "/ta/admin/users",
        "/lessons/mrt-basics",
        "/survey",
        "/legacy",
        "/EN/dashboard",
        "/en/./dashboard",
        "/en/about/../admin",
        "/en/about/%2e%2e/admin",
        // Looks like a public sign-in page, but next-intl decodes %25 and
        // serves the page after it
        "/sign-in/%252e%252e/admin",
        "/bn/sign-in/%252e%252e/dashboard",
        "/sign-up/%252e%252e/lessons/mrt-basics",
        "/about/%252e%252e/admin",
    ])("keeps signed-out visitors out of %s", async (path) => {
        // Follow on-site redirects (locale fixes) the way a browser would;
        // each hop goes through this guard again
        let current = path;
        for (let hop = 0; hop < 5; hop += 1) {
            const { status, location, served } = await visit(current);

            if (!isRedirect(status)) {
                // Not redirected: what is served must be public or a 404
                expect(served ?? "").not.toMatch(
                    /\/(dashboard|admin|lessons|survey|legacy)(\/|$)/,
                );
                return;
            }

            expect(location?.origin).toBe(ORIGIN);
            if (/\/sign-(in|up)$/.test(location!.pathname)) return;
            current = location!.pathname;
        }
        throw new Error(`Redirect loop from ${path}`);
    });

    it.each([
        "/",
        "/about",
        "/contact",
        "/privacy",
        "/sign-in",
        "/bn",
        "/bn/about",
    ])("lets anyone see %s", async (path) => {
        const { status, location } = await visit(path);
        if (isRedirect(status)) {
            expect(location?.pathname).not.toMatch(/sign-(in|up)/);
        } else {
            expect(status).toBe(200);
        }
    });

    it.each(["/dashboard", "/lessons/mrt-basics", "/bn/dashboard"])(
        "lets a signed-in learner into %s",
        async (path) => {
            const { status, location } = await visit(path, true);
            if (isRedirect(status)) {
                expect(location?.pathname).not.toMatch(/sign-(in|up)/);
            }
        },
    );
});
