import { beforeEach, describe, expect, it, vi } from "vitest";

// Lesson progress sync (lib/actions/learnerProgress.actions.ts), against a
// real mongod (tests/setup.ts).

const clerk = vi.hoisted(() => ({ signedInAs: null as string | null }));

vi.mock("@clerk/nextjs/server", () => ({
    auth: async () => ({ userId: clerk.signedInAs }),
}));

const { saveLearnerProgress, getLearnerProgress } = await import(
    "@/lib/actions/learnerProgress.actions"
);

const DAY = 24 * 60 * 60 * 1000;

function lesson(completedAt: string) {
    return { completedAt, runs: 1, bestFirstTry: 3, total: 4 };
}

beforeEach(() => {
    clerk.signedInAs = "user_A";
});

describe("saveLearnerProgress", () => {
    it("keeps syncing for a device whose clock is days fast", async () => {
        // The old check refused the whole save, so one lesson finished on a
        // fast clock stopped this learner's progress reaching the server for good
        const future = new Date(Date.now() + 3 * DAY).toISOString();

        await saveLearnerProgress({
            lessons: { "mrt-basics": lesson(future) },
        });
        await saveLearnerProgress({
            lessons: {
                "mrt-basics": lesson(future),
                "hawker-food": lesson(new Date().toISOString()),
            },
        });

        const stored = await getLearnerProgress();
        expect(Object.keys(stored.lessons).sort()).toEqual([
            "hawker-food",
            "mrt-basics",
        ]);
        const kept = Date.parse(stored.lessons["mrt-basics"].completedAt);
        expect(kept).toBeLessThanOrEqual(Date.now());
    });

    it("keeps a date that's only a little ahead", async () => {
        const ahead = new Date(Date.now() + 60 * 60 * 1000).toISOString();

        await saveLearnerProgress({ lessons: { "mrt-basics": lesson(ahead) } });

        const stored = await getLearnerProgress();
        expect(stored.lessons["mrt-basics"].completedAt).toBe(ahead);
    });

    it("keeps one learner's progress away from another's", async () => {
        await saveLearnerProgress({
            lessons: { "mrt-basics": lesson(new Date().toISOString()) },
        });

        clerk.signedInAs = "user_B";
        expect((await getLearnerProgress()).lessons).toEqual({});
    });

    it("refuses a signed-out caller", async () => {
        clerk.signedInAs = null;
        await expect(saveLearnerProgress({ lessons: {} })).rejects.toThrow(
            "Not authenticated",
        );
    });
});
