// Local (this-device) copy of a survey in progress, so nobody loses answers
// when the network drops. Lives outside SurveyClient because the header also
// needs to reach it: a draft must be DELETED when the person signs out or
// another account signs in, not merely ignored the next time /survey loads.
//
// Browser-only — every function is a no-op on the server or when storage is
// unavailable (private mode, full disk).

export type LocalSurveyDraft = {
    answers: SurveyAnswers;
    lastQuestionId: string | null;
    updatedAt: string;
    /** Clerk user id of the owner; a foreign or absent id is never restored. */
    userId: string | null;
};

const DRAFT_KEY_PREFIX = "link-survey-draft-";

export const surveyDraftKey = (surveyId: string) =>
    `${DRAFT_KEY_PREFIX}${surveyId}`;

export function readSurveyDraft(surveyId: string): LocalSurveyDraft | null {
    try {
        const raw = window.localStorage.getItem(surveyDraftKey(surveyId));
        if (!raw) return null;
        const parsed = JSON.parse(raw);
        if (!parsed || typeof parsed !== "object" || !parsed.answers)
            return null;
        return parsed as LocalSurveyDraft;
    } catch {
        return null;
    }
}

export function writeSurveyDraft(surveyId: string, draft: LocalSurveyDraft) {
    try {
        window.localStorage.setItem(
            surveyDraftKey(surveyId),
            JSON.stringify(draft),
        );
    } catch {
        // A full phone must not break the survey; the server copy still works.
    }
}

export function clearSurveyDraft(surveyId: string) {
    try {
        window.localStorage.removeItem(surveyDraftKey(surveyId));
    } catch {
        // ignore
    }
}

// A draft belonging to someone else is deliberately NOT deleted, only refused
// on read: SurveyClient restores a draft solely when its embedded userId
// matches the person signed in now, which is what closes the disclosure. A
// sweep that deleted foreign drafts as well would add no protection the read
// check does not already give, and would risk destroying a real offline
// backup at exactly the wrong moment (Clerk reports "nobody signed in" when a
// token expires on a flaky connection, which is when the backup matters most).
