"use client";

/**
 * Copies finished lessons to the server and back.
 *
 * The browser is where learning is recorded, and lessons work without the
 * server. The server copy exists so a learner on another device, or with a
 * cleared browser, does not find every lesson marked new. So this runs in the
 * background, never blocks a page, and says nothing when it fails. The next
 * finished lesson, or the next visit, tries again.
 */

import { useEffect } from "react";

import { getLearnerProgress, saveLearnerProgress } from "@/lib/actions/learnerProgress.actions";

import { readProgress } from "./model";
import { getProgressData, mergeRemoteProgress, progressOwner, setProgressListener } from "./store";

let inFlight: Promise<void> | null = null;
let again = false;

async function syncOnce(): Promise<void> {
    // A shared phone or computer can change hands mid-sync. What the server sent
    // belongs to whoever was signed in when it was asked for, and must not be
    // folded into the next person's progress.
    const owner = progressOwner();
    const remote = readProgress(await getLearnerProgress());
    if (progressOwner() !== owner) return;
    const browserKnowsMore = mergeRemoteProgress(remote);
    if (!browserKnowsMore) return;
    const saved = await saveLearnerProgress(getProgressData().progress);
    if (progressOwner() !== owner) return;
    mergeRemoteProgress(readProgress(saved));
}

/** Safe to call at any time: calls made during a sync are folded into one more. */
export function syncProgress(): Promise<void> {
    if (inFlight) {
        again = true;
        return inFlight;
    }
    inFlight = syncOnce()
        .catch(() => undefined)
        .finally(() => {
            inFlight = null;
            if (again) {
                again = false;
                void syncProgress();
            }
        });
    return inFlight;
}

/** Syncs once progress is loaded, and after every finished lesson or talk. */
export function useProgressSync(ready: boolean) {
    useEffect(() => {
        if (!ready) return;
        setProgressListener(() => void syncProgress());
        void syncProgress();
        return () => setProgressListener(null);
    }, [ready]);
}
