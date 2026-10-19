"use server";

/**
 * Finished lessons, copied between the browser and the database.
 *
 * The browser is where learning is recorded, and lessons work without the
 * server. This copy exists so that a learner who signs in on another device, or
 * clears their browser, does not find every lesson marked new.
 *
 * The merge never takes anything away. A lesson finished anywhere is finished,
 * and the best result stands, so two devices can write in any order and end up
 * agreeing. The browser applies the same rule (`lib/progress/model.ts`).
 */

import { auth } from "@clerk/nextjs/server";

import { connectToDatabase } from "@/lib/database";
import LearnerProgress from "@/lib/database/models/learnerProgress.model";
import { mergeProgress, type LessonRecord, type Progress, type SpeakingRecord } from "@/lib/progress/model";

const LESSON_ID = /^[a-z0-9-]{1,64}$/;
/** Far more lessons than the app will ever ship; a bound, not a target. */
const MAX_LESSONS = 500;
const MAX_COUNT = 10_000;
/** A device's clock may run fast, but not by more than this. */
const CLOCK_SKEW_MS = 24 * 60 * 60 * 1000;

function isRecord(value: unknown): value is Record<string, unknown> {
    return typeof value === "object" && value !== null && !Array.isArray(value);
}

function count(value: unknown): number | undefined {
    return typeof value === "number" && Number.isInteger(value) && value >= 0 && value <= MAX_COUNT
        ? value
        : undefined;
}

function isoDate(value: unknown, now: number): string | undefined {
    if (typeof value !== "string" || value.length > 40) return undefined;
    const time = Date.parse(value);
    if (Number.isNaN(time) || time > now + CLOCK_SKEW_MS) return undefined;
    return new Date(time).toISOString();
}

function parseSpeaking(value: unknown, now: number): SpeakingRecord | undefined | null {
    if (value === undefined) return undefined;
    if (!isRecord(value)) return null;
    const completedAt = isoDate(value.completedAt, now);
    const said = count(value.said);
    const total = count(value.total);
    if (!completedAt || said === undefined || total === undefined || said > total) return null;
    return { completedAt, said, total };
}

/**
 * Strict: a request with anything wrong in it is refused rather than
 * half-stored. Every export of this file is a public POST endpoint, so the
 * argument is whatever the caller chose to send.
 */
function parseProgress(value: unknown, now: number = Date.now()): Progress {
    if (!isRecord(value) || !isRecord(value.lessons)) throw new Error("Invalid progress");
    const entries = Object.entries(value.lessons);
    if (entries.length > MAX_LESSONS) throw new Error("Too many lessons");

    const lessons: Record<string, LessonRecord> = {};
    for (const [id, raw] of entries) {
        if (!LESSON_ID.test(id) || !isRecord(raw)) throw new Error("Invalid progress");
        const completedAt = isoDate(raw.completedAt, now);
        const runs = count(raw.runs);
        const bestFirstTry = count(raw.bestFirstTry);
        const total = count(raw.total);
        const speaking = parseSpeaking(raw.speaking, now);
        if (
            !completedAt ||
            !runs ||
            bestFirstTry === undefined ||
            total === undefined ||
            bestFirstTry > total ||
            speaking === null
        ) {
            throw new Error("Invalid progress");
        }
        lessons[id] = { completedAt, runs, bestFirstTry, total, ...(speaking ? { speaking } : {}) };
    }
    return { lessons };
}

async function signedInClerkId(): Promise<string> {
    const { userId } = await auth();
    if (!userId) throw new Error("Not authenticated");
    return userId;
}

async function readStored(clerkId: string): Promise<Progress> {
    const found = await LearnerProgress.findOne({ clerkId })
        .select("lessons")
        .lean<{ lessons?: Record<string, LessonRecord> }>();
    return { lessons: found?.lessons ?? {} };
}

/** Finished lessons, as the database has them. */
export async function getLearnerProgress(): Promise<Progress> {
    const clerkId = await signedInClerkId();
    await connectToDatabase();
    return readStored(clerkId);
}

/** Far more than two devices saving at once will ever need. */
const MAX_SAVE_TRIES = 5;

/**
 * Merge the browser's copy into the stored one and return the result.
 *
 * The write only lands on the copy it was merged from, as in the mobile API.
 * Two devices saving at once both read the same copy; the second write then
 * matches nothing, and it reads again and merges again, so neither device's
 * lesson is lost. Without this, the lesson could be recovered only by the
 * device that took it syncing again.
 */
export async function saveLearnerProgress(progress: unknown): Promise<Progress> {
    const clerkId = await signedInClerkId();
    const incoming = parseProgress(progress);
    await connectToDatabase();
    // The unique clerkId index is what turns a crossed write into a retry, so
    // it must exist before the first write. Cached by Mongoose after the first.
    await LearnerProgress.init();
    for (let tries = 0; tries < MAX_SAVE_TRIES; tries++) {
        const found = await LearnerProgress.findOne({ clerkId })
            .select("lessons version")
            .lean<{ lessons?: Record<string, LessonRecord>; version?: number }>();
        const merged = mergeProgress({ lessons: found?.lessons ?? {} }, incoming);
        const version = found?.version;
        try {
            // A copy that does not match upserts, and the unique clerkId turns
            // that into a duplicate key: someone else wrote first.
            await LearnerProgress.updateOne(
                { clerkId, version: version ?? { $exists: false } },
                { $set: { lessons: merged.lessons, version: (version ?? 0) + 1 } },
                { upsert: true },
            );
            return merged;
        } catch (error) {
            if ((error as { code?: number }).code !== 11000) throw error;
        }
    }
    throw new Error("Progress kept changing while it was being saved");
}
