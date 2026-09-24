/**
 * What the tutor's Google services share: how a failed call is reported, and
 * which models are out of quota.
 */

export const VOICE = "Sulafat";
/** Google speech is 16-bit mono PCM; the rate is read from the response when present. */
export const DEFAULT_SAMPLE_RATE = 24_000;

export type Spoken = { pcm: Buffer; rate: number };

export class GoogleError extends Error {}

/**
 * Google refused a call because a quota ran out. Quotas are per model, so
 * another model may still answer.
 */
export class QuotaError extends GoogleError {
    /** How long Google says to wait before this model answers again. */
    readonly retryAfterMs: number;

    constructor(message: string, retryAfterMs: number) {
        super(message);
        this.retryAfterMs = retryAfterMs;
    }
}

/** Used when a quota error does not say how long to wait. */
const DEFAULT_RETRY_MS = 60_000;

type ErrorBody = {
    error?: { message?: string; details?: { "@type"?: string; retryDelay?: string }[] };
    error_description?: string;
};

/**
 * The error for a failed response. Google's error text names the problem (a
 * bad key, an unknown field) without echoing the request, so it is safe to log.
 */
export async function responseError(service: string, response: Response): Promise<GoogleError> {
    const body = (await response.json().catch(() => null)) as ErrorBody | null;
    const detail = body?.error?.message ?? body?.error_description ?? "";
    const message = `${service} answered ${response.status} ${detail}`.trim().slice(0, 300);
    if (response.status !== 429) return new GoogleError(message);

    const retry = body?.error?.details?.find((item) => item["@type"]?.endsWith("RetryInfo"));
    const seconds = Number.parseFloat(retry?.retryDelay ?? "");
    return new QuotaError(
        message,
        Number.isFinite(seconds) ? Math.ceil(seconds * 1000) : DEFAULT_RETRY_MS,
    );
}

/** `fetch` with a deadline, reporting a timeout or network failure as a `GoogleError`. */
export async function send(
    service: string,
    url: string,
    init: RequestInit,
    timeoutMs: number,
): Promise<Response> {
    try {
        return await fetch(url, { ...init, signal: AbortSignal.timeout(Math.max(1, timeoutMs)) });
    } catch (error) {
        const timedOut = (error as Error).name === "TimeoutError";
        throw new GoogleError(timedOut ? `${service} timed out` : `Could not reach ${service}`);
    }
}

/**
 * Which models are out of quota, and until when. For a daily quota Google's
 * error gives the time until midnight Pacific, when it resets.
 *
 * Kept in memory, so each server instance learns it for itself. That costs one
 * refused request per instance, which Google answers at once.
 */
export class QuotaTracker {
    private readonly until = new Map<string, number>();
    private readonly now: () => number;

    constructor(now: () => number = Date.now) {
        this.now = now;
    }

    hasQuota(name: string): boolean {
        return (this.until.get(name) ?? 0) <= this.now();
    }

    outOfQuota(name: string, error: QuotaError) {
        this.until.set(name, this.now() + error.retryAfterMs);
    }
}
