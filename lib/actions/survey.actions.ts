"use server";

import { connectToDatabase } from "@/lib/database";
import SurveyResponse from "@/lib/database/models/surveyResponse.model";
import { ensureUser } from "./user.actions";
import { isAdmin } from "@/lib/auth";
import {
    getActiveSurvey,
    getSurveyById,
    getSurveyQuestions,
} from "@/constants/survey/feedbackSurvey";

const MAX_TEXT_LENGTH = 2000;
const MAX_OTHER_LENGTH = 300;

// ---------------------------------------------------------------------------
// Validation. The server never trusts the client about which response is
// theirs (ownership comes from the Clerk session via ensureUser) nor about the
// shape of an answer (checked against the survey definition here).
// ---------------------------------------------------------------------------

function cleanText(value: unknown, maxLength: number): string {
    if (typeof value !== "string") return "";
    return value.trim().slice(0, maxLength);
}

/**
 * Checks a raw answer against its question definition. Returns the cleaned
 * answer to store, or null if the answer is malformed and must be rejected.
 */
function validateAnswer(
    question: SurveyQuestion,
    raw: unknown,
): SurveyAnswer | null {
    if (!raw || typeof raw !== "object") return null;
    const answer = raw as Record<string, unknown>;

    switch (question.kind) {
        case "single": {
            const option = question.options.find(
                (item) => item.value === answer.value,
            );
            if (!option) return null;
            return {
                kind: "single",
                value: option.value,
                ...(option.isOther
                    ? {
                          otherText: cleanText(
                              answer.otherText,
                              MAX_OTHER_LENGTH,
                          ),
                      }
                    : {}),
            };
        }
        case "scale": {
            const value = Number(answer.value);
            if (
                !Number.isInteger(value) ||
                value < 1 ||
                value > question.labels.length
            ) {
                return null;
            }
            return { kind: "scale", value };
        }
        case "multi": {
            if (!Array.isArray(answer.values)) return null;
            const valid = question.options.filter((option) =>
                (answer.values as unknown[]).includes(option.value),
            );
            let values = valid.map((option) => option.value);
            // An exclusive option ("Nothing, it was fine") cannot be stored
            // alongside anything else, whatever the client sent.
            const exclusive = valid.find((option) => option.exclusive);
            if (exclusive && values.length > 1) {
                values = [exclusive.value];
            }
            if (
                question.maxSelections &&
                values.length > question.maxSelections
            ) {
                values = values.slice(0, question.maxSelections);
            }
            const hasOther = valid.some(
                (option) => option.isOther && values.includes(option.value),
            );
            return {
                kind: "multi",
                values,
                ...(hasOther
                    ? {
                          otherText: cleanText(
                              answer.otherText,
                              MAX_OTHER_LENGTH,
                          ),
                      }
                    : {}),
            };
        }
        case "split": {
            const left = Number(answer.left);
            if (
                !Number.isInteger(left) ||
                left < 0 ||
                left > question.total ||
                left % question.step !== 0
            ) {
                return null;
            }
            return { kind: "split", left, right: question.total - left };
        }
        case "text": {
            const text = cleanText(
                answer.text,
                question.maxLength ?? MAX_TEXT_LENGTH,
            );
            return { kind: "text", text };
        }
    }
}

function serializeState(surveyId: string, response: any): SurveyStateForUser {
    return {
        surveyId,
        status: response
            ? response.declinedAt && response.status !== "submitted"
                ? "not_started"
                : response.status
            : "not_started",
        answers: response?.answers
            ? JSON.parse(JSON.stringify(response.answers))
            : {},
        lastQuestionId: response?.lastQuestionId ?? null,
        updatedAt: response?.updatedAt
            ? response.updatedAt.toISOString()
            : null,
    };
}

// ---------------------------------------------------------------------------
// User-facing actions
// ---------------------------------------------------------------------------

/**
 * Everything the dashboard banner needs in one round trip. Never throws — a
 * dead database must not take the dashboard down with it.
 */
export async function getSurveyBannerState(): Promise<SurveyBannerState> {
    try {
        const survey = getActiveSurvey();
        if (!survey) return { show: false };

        await connectToDatabase();
        const { _id: userId } = await ensureUser();

        const response = await SurveyResponse.findOne({
            userId,
            surveyId: survey.id,
        }).lean<any>();

        const questionCount = getSurveyQuestions(survey).length;

        if (response?.status === "submitted") {
            // Thank them once: the banner shows "thanks" for a day after
            // submitting, then disappears for good.
            const submittedAt = response.submittedAt
                ? new Date(response.submittedAt).getTime()
                : 0;
            const oneDay = 24 * 60 * 60 * 1000;
            if (Date.now() - submittedAt > oneDay) return { show: false };
            return {
                show: true,
                variant: "thanks",
                surveyId: survey.id,
                timeEstimate: survey.timeEstimate,
                answeredCount: questionCount,
                questionCount,
            };
        }

        // "No thank you" on the consent screen hides the banner for the rest
        // of that day, on every device, then it may quietly reappear.
        if (response?.declinedAt) {
            const declined = new Date(response.declinedAt).getTime();
            const oneDay = 24 * 60 * 60 * 1000;
            if (Date.now() - declined < oneDay) return { show: false };
        }

        const answeredCount = response?.answers
            ? Object.keys(response.answers).length
            : 0;

        return {
            show: true,
            variant: answeredCount > 0 ? "resume" : "invite",
            surveyId: survey.id,
            timeEstimate: survey.timeEstimate,
            answeredCount,
            questionCount,
        };
    } catch (error) {
        console.error("Error getting survey banner state:", error);
        return { show: false };
    }
}

/** The signed-in user's own draft (or submitted state) for the open survey. */
export async function getSurveyStateForUser(): Promise<SurveyStateForUser | null> {
    try {
        const survey = getActiveSurvey();
        if (!survey) return null;

        await connectToDatabase();
        const { _id: userId } = await ensureUser();

        const response = await SurveyResponse.findOne({
            userId,
            surveyId: survey.id,
        }).lean<any>();

        return serializeState(survey.id, response);
    } catch (error) {
        console.error("Error getting survey state:", error);
        return null;
    }
}

/**
 * Saves one answer (or clears it, when `answer` is null — a skip after a
 * change of mind). Also remembers where the person is so they can resume.
 * Designed to be called on every answer; failure is reported quietly in the
 * return value and must never interrupt the person mid-survey.
 */
export async function saveSurveyAnswer(
    questionId: string,
    answer: unknown,
    lastQuestionId?: string,
): Promise<SurveySaveResult> {
    try {
        const survey = getActiveSurvey();
        if (!survey) return { success: false, message: "No survey is open" };

        const question = getSurveyQuestions(survey).find(
            (item) => item.id === questionId,
        );
        if (!question) return { success: false, message: "Unknown question" };

        await connectToDatabase();
        const { _id: userId } = await ensureUser();

        const existing = await SurveyResponse.findOne({
            userId,
            surveyId: survey.id,
        });

        // Answers are frozen once submitted.
        if (existing?.status === "submitted") {
            return {
                success: false,
                alreadySubmitted: true,
                status: "submitted",
            };
        }

        const update: Record<string, unknown> = {
            status: "in_progress",
            declinedAt: null, // starting to answer supersedes an old decline
        };
        if (lastQuestionId) update.lastQuestionId = lastQuestionId;

        // The status guard closes the race with a concurrent submit: if the
        // response was submitted between the read above and this write, the
        // filter matches nothing and the upsert trips the unique index
        // instead of appending to a frozen response.
        const notSubmitted = {
            userId,
            surveyId: survey.id,
            status: { $ne: "submitted" },
        };

        if (answer === null) {
            await SurveyResponse.findOneAndUpdate(
                notSubmitted,
                { $set: update, $unset: { [`answers.${questionId}`]: "" } },
                { upsert: true },
            );
            return { success: true, status: "in_progress" };
        }

        const cleaned = validateAnswer(question, answer);
        if (!cleaned) return { success: false, message: "Invalid answer" };

        update[`answers.${questionId}`] = cleaned;
        await SurveyResponse.findOneAndUpdate(
            notSubmitted,
            { $set: update },
            {
                upsert: true,
            },
        );

        return { success: true, status: "in_progress" };
    } catch (error) {
        console.error("Error saving survey answer:", error);
        return { success: false, message: "Could not save" };
    }
}

/** "No thank you" on the consent screen. Quietens the banner for a day. */
export async function declineSurvey(): Promise<SurveySaveResult> {
    try {
        const survey = getActiveSurvey();
        if (!survey) return { success: false, message: "No survey is open" };

        await connectToDatabase();
        const { _id: userId } = await ensureUser();

        const existing = await SurveyResponse.findOne({
            userId,
            surveyId: survey.id,
        });
        if (existing?.status === "submitted") {
            return { success: true, status: "submitted" };
        }

        await SurveyResponse.findOneAndUpdate(
            { userId, surveyId: survey.id },
            { $set: { declinedAt: new Date() } },
            { upsert: true },
        );

        return { success: true, status: "not_started" };
    } catch (error) {
        console.error("Error declining survey:", error);
        return { success: false, message: "Could not save" };
    }
}

/**
 * Final submission. Server-side gate: the nationality question must be
 * answered; everything else may be blank. Idempotent — submitting twice
 * changes nothing.
 */
export async function submitSurvey(): Promise<SurveySaveResult> {
    try {
        const survey = getActiveSurvey();
        if (!survey) return { success: false, message: "No survey is open" };

        await connectToDatabase();
        const { _id: userId } = await ensureUser();

        const existing = await SurveyResponse.findOne({
            userId,
            surveyId: survey.id,
        });

        if (existing?.status === "submitted") {
            return {
                success: true,
                alreadySubmitted: true,
                status: "submitted",
            };
        }

        const required = getSurveyQuestions(survey).filter(
            (question) => question.required,
        );
        for (const question of required) {
            const answer = existing?.answers?.[question.id];
            const cleaned = answer ? validateAnswer(question, answer) : null;
            // A required answer must have actual content — an empty text or
            // an empty multi-select does not count, whatever the client sent.
            const hasContent =
                cleaned &&
                (cleaned.kind === "text"
                    ? cleaned.text.trim().length > 0
                    : cleaned.kind === "multi"
                      ? cleaned.values.length > 0
                      : true);
            if (!hasContent) {
                return {
                    success: false,
                    message:
                        "A question still needs an answer before you finish",
                };
            }
        }

        await SurveyResponse.findOneAndUpdate(
            { userId, surveyId: survey.id, status: { $ne: "submitted" } },
            { $set: { status: "submitted", submittedAt: new Date() } },
        );

        return { success: true, status: "submitted" };
    } catch (error) {
        console.error("Error submitting survey:", error);
        return { success: false, message: "Could not submit" };
    }
}

// ---------------------------------------------------------------------------
// Admin-only: aggregate stats and CSV export. Individual responses are never
// exposed to ordinary users, and the export carries no user identifiers.
// ---------------------------------------------------------------------------

async function requireAdmin() {
    if (!(await isAdmin())) {
        throw new Error("Not authorized");
    }
}

export async function getSurveyStats(
    surveyId: string,
): Promise<SurveyStats | null> {
    await requireAdmin();

    const survey = getSurveyById(surveyId);
    if (!survey) return null;

    await connectToDatabase();

    const responses = await SurveyResponse.find({ surveyId }).lean<any[]>();

    // A bare decline (no answers) is not a "start".
    const started = responses.filter(
        (response) =>
            response.status === "submitted" ||
            Object.keys(response.answers ?? {}).length > 0,
    );
    const submitted = started.filter(
        (response) => response.status === "submitted",
    );

    const questions = getSurveyQuestions(survey);

    return {
        surveyId,
        started: started.length,
        submitted: submitted.length,
        completionRate: started.length
            ? Math.round((submitted.length / started.length) * 100)
            : 0,
        questionCount: questions.length,
        questions: questions.map((question) => ({
            id: question.id,
            exportKey: question.exportKey,
            prompt: question.prompt,
            answered: submitted.filter((response) => {
                const answer = response.answers?.[question.id];
                if (!answer) return false;
                if (answer.kind === "text") return Boolean(answer.text);
                if (answer.kind === "multi") return answer.values?.length > 0;
                return true;
            }).length,
        })),
    };
}

/**
 * Every submitted response for the admin results screen, anonymized: rows
 * carry only a submission-order number, a timestamp and the answers — no
 * user identifiers of any kind leave the server.
 */
export async function getSurveyResults(
    surveyId: string,
): Promise<SurveyResults | null> {
    await requireAdmin();

    const survey = getSurveyById(surveyId);
    if (!survey) return null;

    await connectToDatabase();

    const all = await SurveyResponse.find({ surveyId }).lean<any[]>();

    // Same definitions as getSurveyStats: a bare decline is not a "start".
    const started = all.filter(
        (response) =>
            response.status === "submitted" ||
            Object.keys(response.answers ?? {}).length > 0,
    );
    const submitted = started
        .filter((response) => response.status === "submitted")
        .sort(
            (a, b) =>
                new Date(a.submittedAt ?? 0).getTime() -
                new Date(b.submittedAt ?? 0).getTime(),
        );

    return {
        surveyId,
        started: started.length,
        submitted: submitted.length,
        completionRate: started.length
            ? Math.round((submitted.length / started.length) * 100)
            : 0,
        responses: submitted.map((response, index) => ({
            number: index + 1,
            submittedAt: response.submittedAt
                ? new Date(response.submittedAt).toISOString()
                : null,
            answers: JSON.parse(JSON.stringify(response.answers ?? {})),
        })),
    };
}

function csvCell(value: string | number | null | undefined): string {
    if (value === null || value === undefined) return "";
    const text = String(value);
    // Guard against spreadsheet formula injection as well as commas/quotes.
    const guarded = /^[=+\-@\t]/.test(text) ? `'${text}` : text;
    if (/[",\n\r]/.test(guarded)) {
        return `"${guarded.replace(/"/g, '""')}"`;
    }
    return guarded;
}

/**
 * Every submitted response, one row each, in submission order. Columns use
 * each question's exportKey; scales export the numeric value 1-5, the split
 * question exports as two numeric columns, multi-selects as one 0/1 column
 * per option plus a free-text "other" column. No user identifiers anywhere.
 */
export async function getSurveyCsv(surveyId: string): Promise<string | null> {
    await requireAdmin();

    const survey = getSurveyById(surveyId);
    if (!survey) return null;

    await connectToDatabase();

    const responses = await SurveyResponse.find({
        surveyId,
        status: "submitted",
    })
        .sort({ submittedAt: 1 })
        .lean<any[]>();

    const questions = getSurveyQuestions(survey);

    type Column = {
        header: string;
        cell: (answers: SurveyAnswers) => string | number | null;
    };

    const columns: Column[] = [
        {
            header: "response_number",
            cell: () => null, // filled per-row below
        },
    ];

    for (const question of questions) {
        switch (question.kind) {
            case "single": {
                columns.push({
                    header: question.exportKey,
                    cell: (answers) => {
                        const answer = answers[question.id];
                        if (answer?.kind !== "single") return null;
                        const option = question.options.find(
                            (item) => item.value === answer.value,
                        );
                        return option?.label ?? answer.value;
                    },
                });
                if (question.options.some((option) => option.isOther)) {
                    columns.push({
                        header: `${question.exportKey}_other`,
                        cell: (answers) => {
                            const answer = answers[question.id];
                            return answer?.kind === "single"
                                ? (answer.otherText ?? null)
                                : null;
                        },
                    });
                }
                break;
            }
            case "scale": {
                columns.push({
                    header: question.exportKey,
                    cell: (answers) => {
                        const answer = answers[question.id];
                        return answer?.kind === "scale" ? answer.value : null;
                    },
                });
                break;
            }
            case "multi": {
                for (const option of question.options) {
                    columns.push({
                        header: `${question.exportKey}_${option.value.replace(/-/g, "_")}`,
                        cell: (answers) => {
                            const answer = answers[question.id];
                            if (answer?.kind !== "multi") return null;
                            return answer.values.includes(option.value) ? 1 : 0;
                        },
                    });
                }
                if (question.options.some((option) => option.isOther)) {
                    columns.push({
                        header: `${question.exportKey}_other_text`,
                        cell: (answers) => {
                            const answer = answers[question.id];
                            return answer?.kind === "multi"
                                ? (answer.otherText ?? null)
                                : null;
                        },
                    });
                }
                break;
            }
            case "split": {
                // Two separate numeric columns so each side can be averaged.
                columns.push(
                    {
                        header: `${question.exportKey}_games_minutes`,
                        cell: (answers) => {
                            const answer = answers[question.id];
                            return answer?.kind === "split"
                                ? answer.left
                                : null;
                        },
                    },
                    {
                        header: `${question.exportKey}_learning_minutes`,
                        cell: (answers) => {
                            const answer = answers[question.id];
                            return answer?.kind === "split"
                                ? answer.right
                                : null;
                        },
                    },
                );
                break;
            }
            case "text": {
                columns.push({
                    header: question.exportKey,
                    cell: (answers) => {
                        const answer = answers[question.id];
                        return answer?.kind === "text" && answer.text
                            ? answer.text
                            : null;
                    },
                });
                break;
            }
        }
    }

    const lines: string[] = [
        columns.map((column) => csvCell(column.header)).join(","),
    ];

    responses.forEach((response, index) => {
        const answers: SurveyAnswers = response.answers ?? {};
        const row = columns.map((column, columnIndex) =>
            csvCell(columnIndex === 0 ? index + 1 : column.cell(answers)),
        );
        lines.push(row.join(","));
    });

    // \r\n plus a UTF-8 BOM so Excel opens it cleanly, tildes and all.
    return "\uFEFF" + lines.join("\r\n") + "\r\n";
}
