import { existsSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import {
    DASHBOARD_SURVEY_ID,
    HOME_PAGE_SURVEY_ID,
    SURVEYS,
    getOpenSurvey,
    getSurveyQuestions,
} from "@/constants/survey/feedbackSurvey";
import { HOME_FG_SURVEY } from "@/constants/survey/homeFgSurvey";
import { MWC_SURVEY } from "@/constants/survey/mwcSurvey";

// The survey definitions are hand-edited between workshops (see the notes in
// constants/survey/feedbackSurvey.ts). A duplicate id or option value would
// silently merge two answers into one database field, so check the shape of
// every survey here rather than finding out from the CSV.

const SURVEY_PAGES = path.resolve(
    import.meta.dirname,
    "../app/[locale]/(root)/(surveys)",
);

const duplicates = (values: string[]) =>
    values.filter((value, index) => values.indexOf(value) !== index);

describe("survey definitions", () => {
    it("gives every survey its own id and page", () => {
        expect(duplicates(SURVEYS.map((survey) => survey.id))).toEqual([]);
        expect(duplicates(SURVEYS.map((survey) => survey.path))).toEqual([]);
        for (const survey of SURVEYS) {
            expect(survey.path).toMatch(/^\/[a-z0-9-]+$/);
            expect(
                existsSync(path.join(SURVEY_PAGES, survey.path, "page.tsx")),
                `${survey.path} has no page`,
            ).toBe(true);
        }
    });

    it.each(SURVEYS.map((survey) => [survey.id, survey] as const))(
        "keeps %s's questions and options distinct",
        (_id, survey) => {
            const questions = getSurveyQuestions(survey);
            expect(duplicates(questions.map((q) => q.id))).toEqual([]);
            expect(duplicates(questions.map((q) => q.exportKey))).toEqual([]);

            for (const question of questions) {
                if (question.kind === "single" || question.kind === "multi") {
                    const values = question.options.map((o) => o.value);
                    expect(duplicates(values), question.id).toEqual([]);
                }
                if (question.kind === "multi" && question.maxSelections) {
                    expect(question.maxSelections).toBeLessThan(
                        question.options.length,
                    );
                }
                if (question.kind === "scale") {
                    expect(question.labels.length, question.id).toBe(5);
                }
                if (question.kind === "rating") {
                    expect(Number.isInteger(question.min), question.id).toBe(
                        true,
                    );
                    expect(Number.isInteger(question.max), question.id).toBe(
                        true,
                    );
                    expect(question.max, question.id).toBeGreaterThan(
                        question.min,
                    );
                    expect(question.minLabel && question.maxLabel).toBeTruthy();
                }
            }
        },
    );

    // Same question asked the same way: same column, so the exports line up.
    // Asked a different way (a 1 to 5 word scale became a 0 to 5 number): a
    // column of its own, so the two are never averaged together.
    it("lines up MWC's export columns with HOME's only where they match", () => {
        const home = new Map(
            getSurveyQuestions(HOME_FG_SURVEY).map((q) => [q.id, q]),
        );
        for (const question of getSurveyQuestions(MWC_SURVEY)) {
            const twin = home.get(question.id);
            if (!twin) continue;
            if (twin.kind === question.kind) {
                expect(question.exportKey, question.id).toBe(twin.exportKey);
            } else {
                expect(question.exportKey, question.id).not.toBe(
                    twin.exportKey,
                );
            }
        }
    });

    it("keeps em dashes out of everything people read in the MWC survey", () => {
        expect(JSON.stringify(MWC_SURVEY)).not.toContain("\u2014");
    });

    it("only hands out open surveys, and only for known ids", () => {
        expect(getOpenSurvey(MWC_SURVEY.id)).toBe(MWC_SURVEY);
        for (const bad of ["", "nope", null, undefined, 42, { id: "x" }]) {
            expect(getOpenSurvey(bad)).toBeNull();
        }
        for (const survey of SURVEYS.filter((s) => !s.open)) {
            expect(getOpenSurvey(survey.id)).toBeNull();
        }
    });

    it("points the home page button and banner at real surveys", () => {
        for (const id of [HOME_PAGE_SURVEY_ID, DASHBOARD_SURVEY_ID]) {
            if (id)
                expect(SURVEYS.some((survey) => survey.id === id)).toBe(true);
        }
    });
});
