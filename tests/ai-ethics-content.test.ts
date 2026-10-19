import { describe, expect, it } from "vitest";

import {
    ETHICS_MATCH_PAIRS,
    ETHICS_SORT_CARDS,
    ETHICS_WORDS,
    ethicsScore,
} from "@/constants/games/aiEthics";

// The game is played by people reading at a basic level, on a laptop, with no
// facilitator able to fix content on the day. These checks keep the bank
// balanced and short.
describe("Ethics of AI content", () => {
    it("has six sort cards, half good and half problem, with unique ids", () => {
        expect(ETHICS_SORT_CARDS).toHaveLength(6);
        const good = ETHICS_SORT_CARDS.filter((card) => card.answer === "good");
        expect(good).toHaveLength(3);
        expect(new Set(ETHICS_SORT_CARDS.map((card) => card.id)).size).toBe(6);
    });

    it("gives every problem card a tip and every card a stem sentence", () => {
        for (const card of ETHICS_SORT_CARDS) {
            expect(card.reason).toMatch(/^AI is (good|a problem) because it /);
            if (card.answer === "problem") expect(card.tip).toBeTruthy();
            else expect(card.tip).toBeUndefined();
        }
    });

    it("has six match pairs, balanced, with no situation reused from round 1", () => {
        expect(ETHICS_MATCH_PAIRS).toHaveLength(6);
        expect(ETHICS_MATCH_PAIRS.filter((pair) => pair.verdict === "good")).toHaveLength(3);
        expect(new Set(ETHICS_MATCH_PAIRS.map((pair) => pair.id)).size).toBe(6);
        const round1 = new Set(ETHICS_SORT_CARDS.map((card) => card.situation));
        for (const pair of ETHICS_MATCH_PAIRS) expect(round1.has(pair.situation)).toBe(false);
    });

    it("keeps every card short enough to read on a tile", () => {
        const texts = [
            ...ETHICS_SORT_CARDS.map((card) => card.situation),
            ...ETHICS_MATCH_PAIRS.flatMap((pair) => [pair.situation, pair.reason]),
        ];
        for (const line of texts) expect(line.split(" ").length).toBeLessThanOrEqual(12);
        expect(ETHICS_WORDS).toHaveLength(6);
    });

    it("scores like Word Match and never goes below zero", () => {
        expect(ethicsScore(0)).toBe(100);
        expect(ethicsScore(3)).toBe(70);
        expect(ethicsScore(50)).toBe(0);
    });
});
