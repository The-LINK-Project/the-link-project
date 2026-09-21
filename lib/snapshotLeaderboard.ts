"use client";
import { useCallback, useEffect, useState } from "react";

// The Snapshot leaderboard lives in this browser's localStorage. The game runs
// on a single booth laptop, so there is no network or database to fail
// mid-event, and "Reset board" is a local wipe.

export interface SnapshotScore {
    id: string;
    name: string;
    score: number;
    hits: number;
    seen: number;
    recallMs: number;
    at: number;
}

const STORAGE_KEY = "link-snapshot-leaderboard-v1";
const MAX_STORED = 200;

// Higher score first; ties go to whoever finished recall faster, then to
// whoever set the score first.
export const compareScores = (a: SnapshotScore, b: SnapshotScore) =>
    b.score - a.score || a.recallMs - b.recallMs || a.at - b.at;

const read = (): SnapshotScore[] => {
    try {
        const raw = window.localStorage.getItem(STORAGE_KEY);
        const parsed = raw ? JSON.parse(raw) : [];
        return Array.isArray(parsed) ? parsed : [];
    } catch {
        return [];
    }
};

const write = (scores: SnapshotScore[]) => {
    try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(scores));
    } catch {
        // Storage full or blocked: the in-memory board still works this session.
    }
};

export function useSnapshotLeaderboard() {
    const [scores, setScores] = useState<SnapshotScore[]>([]);

    useEffect(() => {
        setScores(read().sort(compareScores));

        // Keep a second open tab (e.g. a leaderboard on a big screen) in sync.
        const onStorage = (event: StorageEvent) => {
            if (event.key === STORAGE_KEY) setScores(read().sort(compareScores));
        };
        window.addEventListener("storage", onStorage);
        return () => window.removeEventListener("storage", onStorage);
    }, []);

    const addScore = useCallback((entry: Omit<SnapshotScore, "id" | "at">) => {
        const score: SnapshotScore = {
            ...entry,
            // Not crypto.randomUUID: it only exists on https/localhost, and the
            // booth may open the app over a plain-http LAN address.
            id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
            at: Date.now(),
        };
        const next = [...read(), score].sort(compareScores).slice(0, MAX_STORED);
        write(next);
        setScores(next);
        return score;
    }, []);

    const reset = useCallback(() => {
        write([]);
        setScores([]);
    }, []);

    return { scores, addScore, reset };
}
