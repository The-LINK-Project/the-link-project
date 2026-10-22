import { beforeEach, describe, expect, it, vi } from "vitest";

import { getLesson } from "@/lib/lessons/data";
import { initSession, sessionReducer, snapshotOf } from "@/lib/lessons/session";

// Two tabs of the same browser (lib/progress/store.ts). Each tab holds the
// learner's progress in memory and writes it to one shared localStorage entry.
// On a phone a link opened from a chat starts a new tab and leaves the old one
// behind; the old one writing its copy back must not undo what the new one did.

const storage = new Map<string, string>();
let refuseWrites = false;

vi.stubGlobal("window", {
    localStorage: {
        getItem: (key: string) => storage.get(key) ?? null,
        setItem: (key: string, value: string) => {
            if (refuseWrites) throw new Error("QuotaExceededError");
            storage.set(key, value);
        },
        removeItem: (key: string) => storage.delete(key),
    },
    addEventListener: () => {},
});
vi.stubGlobal("document", { visibilityState: "visible", addEventListener: () => {} });

type Store = typeof import("@/lib/progress/store");

/** A fresh copy of the store module: one browser tab. */
async function openTab(): Promise<Store> {
    vi.resetModules();
    const tab = await import("@/lib/progress/store");
    tab.loadProgress("user_1");
    return tab;
}

function stored() {
    return JSON.parse(storage.get("link.progress.v1.user_1") ?? "null");
}

/** A run of AI Words with one exercise answered. */
function runOf(lessonId: string) {
    const lesson = getLesson(lessonId)!;
    const exercise = lesson.exercises.find((item) => item.type === "fillBlank")!;
    let state = initSession({ ...lesson, exercises: [exercise, ...lesson.exercises] }, "en");
    state = sessionReducer(state, { type: "submit", answer: { kind: "choice", choiceId: "x" } });
    state = sessionReducer(state, { type: "next" });
    return snapshotOf(state);
}

beforeEach(() => {
    storage.clear();
    refuseWrites = false;
});

describe("two tabs on one phone", () => {
    it("does not undo a lesson finished in the other tab", async () => {
        const behind = await openTab();
        const front = await openTab();
        front.saveRun("ai-basics", runOf("ai-basics"), "/lessons/ai-basics");
        front.completeLesson("ai-basics", { firstTryCorrect: 9, total: 10 });

        // The tab left behind leaves a lesson, which clears the place to come back to.
        behind.saveRun("mrt-basics", runOf("mrt-basics"), "/lessons/mrt-basics");
        behind.setResume(null);

        expect(stored().progress.lessons["ai-basics"]).toMatchObject({ bestFirstTry: 9, total: 10 });
        expect(stored().runs["ai-basics"]).toBeUndefined();
        expect(stored().runs["mrt-basics"]).toBeDefined();
        expect(behind.getProgressData().progress.lessons["ai-basics"]).toBeDefined();
    });

    it("does not bring back a run started again in the other tab", async () => {
        const front = await openTab();
        front.saveRun("ai-basics", runOf("ai-basics"), "/lessons/ai-basics");
        const behind = await openTab();
        expect(behind.getProgressData().runs["ai-basics"]).toBeDefined();

        front.clearRun("ai-basics");
        behind.setResume("/dashboard");

        expect(stored().runs["ai-basics"]).toBeUndefined();
    });

    it("keeps what is in memory when storage refuses to write", async () => {
        const tab = await openTab();
        tab.saveRun("ai-basics", runOf("ai-basics"), "/lessons/ai-basics");
        refuseWrites = true;
        tab.completeLesson("ai-basics", { firstTryCorrect: 10, total: 10 });
        tab.setResume("/dashboard");

        // The stored copy is older than memory here, so it must not be taken up.
        expect(tab.getProgressData().progress.lessons["ai-basics"]).toBeDefined();
        expect(tab.getProgressData().runs["ai-basics"]).toBeUndefined();
    });
});
