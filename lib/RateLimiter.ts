import mongoose from "mongoose";
import { headers } from "next/headers";
import { RateLimiterAbstract, RateLimiterMongo } from "rate-limiter-flexible";
import { connectToDatabase } from "@/lib/database";

// These limiters guard the project's Gemini / OpenAI bill on two dimensions:
//
//  ip    — per-network-origin, per-minute. Checked first, because it is the
//          cheapest rejection and the one an attacker cannot mint for free.
//  user  — per-account, per-minute. Weak alone (sign-up is public and
//          unlimited, so N accounts buy N times the quota) but it is what
//          stops one learner monopolising a shared connection.
//
// The counters live in MongoDB (already this app's datastore) rather than in
// process memory, so they survive serverless cold starts and are shared by
// every running instance instead of being multiplied by the instance count.
//
// NOTE: these are burst limits only. There is deliberately no daily ceiling,
// so sustained low-rate use is unbounded — one account held at the per-minute
// limit all day is ~28,800 lesson turns. Watch provider spend, and add a
// "day" spec below (e.g. { points: 300, duration: 86400 }) if that shows up.
type LimiterType = "chatbot" | "conversation";

// IP ceilings are deliberately generous. This app's learners sit in dorms,
// workshops and community centres behind shared wifi and carrier-grade NAT,
// so one egress IP is routinely a whole room of people. These are sized to
// stop a scripted single-origin flood, not to pace a classroom.
const LIMIT_SPECS = {
    "ip:chatbot": { points: 120, duration: 60 },
    "ip:conversation": { points: 240, duration: 60 },
    "user:chatbot": { points: 5, duration: 60 },
    "user:conversation": { points: 20, duration: 60 },
} as const;

type LimiterKey = keyof typeof LIMIT_SPECS;

function buildLimiters(
    make: (
        key: LimiterKey,
        spec: { points: number; duration: number },
    ) => RateLimiterAbstract,
) {
    const built = {} as Record<LimiterKey, RateLimiterAbstract>;
    for (const key of Object.keys(LIMIT_SPECS) as LimiterKey[]) {
        built[key] = make(key, LIMIT_SPECS[key]);
    }
    return built;
}

// There is deliberately no in-memory fallback for a Mongo outage. Both AI
// endpoints read from Mongo before they call a paid API, so a dead store
// means the request fails on its own before any money is spent — a fallback
// limiter would be intricate code guarding a spend that cannot happen.
let limitersPromise: Promise<Record<LimiterKey, RateLimiterAbstract>> | null =
    null;

async function getLimiters() {
    if (!limitersPromise) {
        limitersPromise = (async () => {
            await connectToDatabase();
            return buildLimiters(
                (key, spec) =>
                    new RateLimiterMongo({
                        storeClient: mongoose.connection,
                        tableName: "rateLimits",
                        keyPrefix: key,
                        ...spec,
                    }),
            );
        })();

        // A failed connect must not be cached, or the limiter stays broken
        // for the life of the process even after Mongo comes back
        limitersPromise.catch(() => {
            limitersPromise = null;
        });
    }

    return limitersPromise;
}

// Prefer the header the hosting platform sets and a client cannot forge.
// x-forwarded-for is only a fallback: behind a proxy that appends rather than
// replaces it, its first hop is caller-supplied and therefore spoofable.
async function getClientIp(): Promise<string | null> {
    try {
        const headerList = await headers();
        const candidate =
            headerList.get("x-vercel-forwarded-for") ||
            headerList.get("x-real-ip") ||
            headerList.get("x-forwarded-for")?.split(",")[0]?.trim();
        return candidate && candidate.length > 0 ? candidate : null;
    } catch {
        return null;
    }
}

const RATE_LIMIT_MESSAGE =
    "Rate limit exceeded. Please wait a minute before trying again.";

// rate-limiter-flexible rejects with a RateLimiterRes (NOT an Error) when the
// ceiling is hit, and with a real Error when the store itself failed. Only the
// former means "blocked"; the latter must not silently disable the limiter.
function isCeilingHit(error: unknown): boolean {
    return !(error instanceof Error);
}

export async function checkRateLimit(
    userId: string,
    type: LimiterType = "chatbot",
): Promise<{ success: boolean; error?: string }> {
    const limiters = await getLimiters();
    const clientIp = await getClientIp();

    const checks: { limiterKey: LimiterKey; key: string }[] = [];

    // IP first: it is the cheaper rejection and the dimension an attacker
    // cannot mint for free by signing up again
    if (clientIp) {
        checks.push({ limiterKey: `ip:${type}`, key: clientIp });
    }
    checks.push({ limiterKey: `user:${type}`, key: userId });

    for (const check of checks) {
        try {
            await limiters[check.limiterKey].consume(check.key);
        } catch (error) {
            if (isCeilingHit(error)) {
                return { success: false, error: RATE_LIMIT_MESSAGE };
            }
            // The store itself failed. Let it throw: the caller already
            // handles it, and the request was going to fail at its own
            // database read anyway, so nothing paid is reached.
            throw error;
        }
    }

    return { success: true };
}
