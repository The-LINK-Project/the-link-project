import { describe, expect, it } from "vitest";

import {
    ETHICS_BUILD_ITEMS,
    ETHICS_CONCEPT_LABEL,
    ETHICS_CONCEPT_QUESTION,
    ETHICS_DILEMMAS,
    ETHICS_MATCH_PAIRS,
    ETHICS_QUESTION_LABEL,
    ETHICS_SLIDES,
    ETHICS_SORT_CARDS,
    ETHICS_WORDS,
    ethicsScore,
} from "@/constants/games/aiEthics";

// The game is played by people reading at a basic level, on a laptop, with no
// facilitator able to fix content on the day. These checks keep the bank
// balanced and short.
describe("Ethics of AI content", () => {
    it("teaches four slides that cover the three questions, each ending in one tap", () => {
        expect(ETHICS_SLIDES).toHaveLength(4);
        const questions = new Set(ETHICS_SLIDES.map((slide) => slide.question).filter(Boolean));
        expect(questions).toEqual(new Set(Object.keys(ETHICS_QUESTION_LABEL)));
        for (const slide of ETHICS_SLIDES) {
            expect(slide.lines.length).toBeLessThanOrEqual(3);
            for (const line of [...slide.lines, slide.earlier, slide.check.prompt, slide.check.reason]) {
                expect(line.split(" ").length).toBeLessThanOrEqual(18);
            }
            expect(slide.check.options).toHaveLength(2);
            expect([0, 1]).toContain(slide.check.answer);
        }
        // Not always the same button, or the tap teaches nothing.
        expect(new Set(ETHICS_SLIDES.map((slide) => slide.check.answer)).size).toBe(2);
    });

    it("files every concept under one of the three questions", () => {
        for (const concept of Object.keys(ETHICS_CONCEPT_LABEL) as (keyof typeof ETHICS_CONCEPT_LABEL)[]) {
            expect(Object.keys(ETHICS_QUESTION_LABEL)).toContain(ETHICS_CONCEPT_QUESTION[concept]);
        }
    });

    it("has eight sort cards, half good and half problem, with unique ids", () => {
        expect(ETHICS_SORT_CARDS).toHaveLength(8);
        const good = ETHICS_SORT_CARDS.filter((card) => card.answer === "good");
        expect(good).toHaveLength(4);
        expect(new Set(ETHICS_SORT_CARDS.map((card) => card.id)).size).toBe(8);
    });

    it("gives every problem card a tip and every card a stem sentence", () => {
        for (const card of ETHICS_SORT_CARDS) {
            expect(card.reason).toMatch(/^AI is (good|a problem) because it /);
            if (card.answer === "problem") expect(card.tip).toBeTruthy();
            else expect(card.tip).toBeUndefined();
        }
    });

    it("has eight match pairs, balanced, with no situation reused from round 1", () => {
        expect(ETHICS_MATCH_PAIRS).toHaveLength(8);
        expect(ETHICS_MATCH_PAIRS.filter((pair) => pair.verdict === "good")).toHaveLength(4);
        expect(new Set(ETHICS_MATCH_PAIRS.map((pair) => pair.id)).size).toBe(8);
        const round1 = new Set(ETHICS_SORT_CARDS.map((card) => card.situation));
        for (const pair of ETHICS_MATCH_PAIRS) expect(round1.has(pair.situation)).toBe(false);
    });

    it("keeps every card short enough to read on a tile", () => {
        const texts = [
            ...ETHICS_SORT_CARDS.map((card) => card.situation),
            ...ETHICS_MATCH_PAIRS.flatMap((pair) => [pair.situation, pair.reason]),
        ];
        for (const line of texts) expect(line.split(" ").length).toBeLessThanOrEqual(16);
        expect(ETHICS_WORDS).toHaveLength(6);
    });

    it("builds six stem sentences whose decoys never appear in the answer", () => {
        expect(ETHICS_BUILD_ITEMS).toHaveLength(6);
        for (const item of ETHICS_BUILD_ITEMS) {
            expect(item.answer.join(" ")).toMatch(/^AI is (good|a problem) because it /);
            expect(item.decoys).toHaveLength(2);
            for (const decoy of item.decoys) expect(item.answer).not.toContain(decoy);
        }
    });

    it("has three dilemmas with two sides each and no verdict", () => {
        expect(ETHICS_DILEMMAS).toHaveLength(3);
        for (const item of ETHICS_DILEMMAS) {
            expect(item.sides).toHaveLength(2);
            expect(item.sides[0].label).not.toBe(item.sides[1].label);
        }
    });

    it("names a concept on every sort card and match pair, and uses each concept at least once", () => {
        const used = new Set([...ETHICS_SORT_CARDS, ...ETHICS_MATCH_PAIRS].map((item) => item.concept));
        for (const concept of Object.keys(ETHICS_CONCEPT_LABEL)) expect(used.has(concept as never)).toBe(true);
    });

    it("scores like Word Match and never goes below zero", () => {
        expect(ethicsScore(0)).toBe(100);
        expect(ethicsScore(3)).toBe(70);
        expect(ethicsScore(50)).toBe(0);
    });
});
