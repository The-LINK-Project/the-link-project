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

function notify() {
    listeners.forEach((listener) => listener());
}

function commit(next: ProgressData) {
    data = next;
    notify();
    if (!owner) return;
    try {
        window.localStorage.setItem(keyFor(owner), JSON.stringify(next));
    } catch {
        // Private browsing or a full disk: the lesson carries on regardless.
    }
}

export function loadProgress(userId: string) {
    if (owner === userId) return;
    owner = userId;
    data = emptyData();
    try {
        const stored = window.localStorage.getItem(keyFor(userId));
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
    notify();
}

export function getProgressData(): ProgressData {
    return data;
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
    const at = new Date().toISOString();
    commit({
        ...data,
        runs: { ...data.runs, [lessonId]: { ...run, savedAt: at } },
        resume: href ? { href, at } : data.resume,
    });
}

export function completeLesson(
    lessonId: string,
    result: { firstTryCorrect: number; total: number },
) {
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
    const at = new Date().toISOString();
    commit({
        ...data,
        talks: { ...data.talks, [lessonId]: { ...talk, savedAt: at } },
        resume: href ? { href, at } : data.resume,
    });
}

export function clearTalk(lessonId: string) {
    if (!(lessonId in data.talks)) return;
    const { [lessonId]: _gone, ...talks } = data.talks;
    commit({ ...data, talks });
}

export function completeSpeaking(lessonId: string, result: { said: number; total: number }) {
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
    if (href === null && data.resume === null) return;
    commit({ ...data, resume: href ? { href, at: new Date().toISOString() } : null });
}

// ------------------------------------------------------------------ the server

/** Fold the server's copy in. Returns true when the browser knew something it did not. */
export function mergeRemoteProgress(remote: Progress): boolean {
    const merged = mergeProgress(data.progress, remote);
    if (!sameProgress(merged, data.progress)) commit({ ...data, progress: merged });
    return !sameProgress(merged, remote);
}
