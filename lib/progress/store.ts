"use client";

/**
 * The learner's progress, kept in the browser.
 *
 * Held in memory and written through to localStorage on every change, so a
 * screen reads it synchronously and nothing is lost when a tab is closed in
 * the middle of a lesson. One entry per account: a shared computer at a
 * dormitory or community centre is common, and the next person to sign in must
 * not inherit somebody else's ticks.
 *
 * Writes are best-effort. A full or blocked storage must not stop a lesson.
 */

import { useEffect, useState, useSyncExternalStore } from "react";

import {
    emptyData,
    mergeProgress,
    readData,
    sameProgress,
    withLessonDone,
    withSpeakingDone,
    type Progress,
    type ProgressData,
    type SavedRun,
    type SavedTalk,
} from "./model";

const keyFor = (userId: string) => `link.progress.v1.${userId}`;

let owner: string | null = null;
let data: ProgressData = emptyData();
/** Handed to React before anything is loaded, and on the server. */
const EMPTY = emptyData();
const listeners = new Set<() => void>();
/** Called after finished work changes, so it can be copied to the server. */
let onProgressChanged: (() => void) | null = null;
/** The stored copy as this tab last wrote or read it, to notice another tab's writes. */
let lastSeen: string | null = null;
/** False while storage refuses writes; memory is then newer than what is stored. */
let writable = true;

function notify() {
    listeners.forEach((listener) => listener());
}

function commit(next: ProgressData) {
    data = next;
    notify();
    if (!owner) return;
    try {
        const json = JSON.stringify(next);
        window.localStorage.setItem(keyFor(owner), json);
        lastSeen = json;
        writable = true;
    } catch {
        // Private browsing or a full disk: the lesson carries on regardless.
        writable = false;
    }
}

/**
 * Take up what another tab has stored since this one last looked. Every change
 * starts from here: on a phone a link from a chat opens a new tab and the old
 * one stays behind, and the old one writing its copy back would undo a lesson
 * finished in the new one, or bring back a run that was started again.
 * Returns true when something changed.
 */
function catchUp(): boolean {
    if (!owner || !writable) return false;
    try {
        const stored = window.localStorage.getItem(keyFor(owner));
        if (stored === null || stored === lastSeen) return false;
        data = readData(JSON.parse(stored));
        lastSeen = stored;
        return true;
    } catch {
        return false;
    }
}

/** Take up another tab's writes now, telling whoever is listening if anything changed. */
export function catchUpProgress() {
    if (catchUp()) notify();
}

// Another tab's change shows here too, and a tab coming back to the front
// shows what was done elsewhere in the meantime.
if (typeof window !== "undefined") {
    window.addEventListener("storage", (event) => {
        if (owner && event.key === keyFor(owner) && catchUp()) notify();
    });
    document.addEventListener("visibilitychange", () => {
        if (document.visibilityState === "visible" && catchUp()) notify();
    });
}

export function loadProgress(userId: string) {
    if (owner === userId) return;
    owner = userId;
    data = emptyData();
    lastSeen = null;
    writable = true;
    try {
        const stored = window.localStorage.getItem(keyFor(userId));
        lastSeen = stored;
        if (stored) data = readData(JSON.parse(stored));
    } catch {
        // Unreadable storage starts the learner afresh rather than crashing.
    }
    notify();
}

/** Forget whose progress is in memory. The stored copy stays for their next sign-in. */
export function unloadProgress() {
    if (owner === null) return;
    owner = null;
    data = emptyData();
    lastSeen = null;
    notify();
}

export function getProgressData(): ProgressData {
    return data;
}

/** Whose progress is loaded, so work begun for one account can tell it is still theirs. */
export function progressOwner(): string | null {
    return owner;
}

function subscribe(listener: () => void) {
    listeners.add(listener);
    return () => {
        listeners.delete(listener);
    };
}

export function useProgressData(): ProgressData {
    return useSyncExternalStore(subscribe, getProgressData, () => EMPTY);
}

/**
 * True once this account's progress has been read. Gate a lesson screen on it,
 * or it would build its run before knowing there was one to continue.
 */
export function useProgressReady(userId: string | null | undefined): boolean {
    const [readyFor, setReadyFor] = useState<string | null>(null);
    useEffect(() => {
        if (!userId) {
            unloadProgress();
            return;
        }
        loadProgress(userId);
        setReadyFor(userId);
    }, [userId]);
    return !!userId && readyFor === userId;
}

export function setProgressListener(listener: (() => void) | null) {
    onProgressChanged = listener;
}

// --------------------------------------------------------------- a lesson run

/** `href` is the page showing this run, remembered as the place to come back to. */
export function saveRun(lessonId: string, run: Omit<SavedRun, "savedAt">, href?: string) {
    catchUp();
    const at = new Date().toISOString();
    commit({
        ...data,
        runs: { ...data.runs, [lessonId]: { ...run, savedAt: at } },
        resume: href ? { href, at } : data.resume,
    });
}

/** Forget a run the learner chose to start again, so leaving does not bring it back. */
export function clearRun(lessonId: string) {
    catchUp();
    if (!(lessonId in data.runs)) return;
    const { [lessonId]: _gone, ...runs } = data.runs;
    commit({ ...data, runs });
}

export function completeLesson(
    lessonId: string,
    result: { firstTryCorrect: number; total: number },
) {
    catchUp();
    const { [lessonId]: _gone, ...runs } = data.runs;
    commit({
        ...data,
        runs,
        resume: null,
        progress: withLessonDone(data.progress, lessonId, result),
    });
    onProgressChanged?.();
}

// ------------------------------------------------------- a talk with the tutor

export function saveTalk(lessonId: string, talk: Omit<SavedTalk, "savedAt">, href?: string) {
    catchUp();
    const at = new Date().toISOString();
    commit({
        ...data,
        talks: { ...data.talks, [lessonId]: { ...talk, savedAt: at } },
        resume: href ? { href, at } : data.resume,
    });
}

export function clearTalk(lessonId: string) {
    catchUp();
    if (!(lessonId in data.talks)) return;
    const { [lessonId]: _gone, ...talks } = data.talks;
    commit({ ...data, talks });
}

export function completeSpeaking(lessonId: string, result: { said: number; total: number }) {
    catchUp();
    const { [lessonId]: _gone, ...talks } = data.talks;
    commit({
        ...data,
        talks,
        resume: null,
        progress: withSpeakingDone(data.progress, lessonId, result),
    });
    onProgressChanged?.();
}

/** Forget the page to come back to, once the learner leaves it by choice. */
export function setResume(href: string | null) {
    catchUp();
    if (href === null && data.resume === null) return;
    commit({ ...data, resume: href ? { href, at: new Date().toISOString() } : null });
}

// ------------------------------------------------------------------ the server

/** Fold the server's copy in. Returns true when the browser knew something it did not. */
export function mergeRemoteProgress(remote: Progress): boolean {
    catchUp();
    const merged = mergeProgress(data.progress, remote);
    if (!sameProgress(merged, data.progress)) commit({ ...data, progress: merged });
    return !sameProgress(merged, remote);
}
