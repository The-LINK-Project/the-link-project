// Workshop feedback surveys — the list of them, and the rules for editing.
//
// Each survey's questions live in their own file (homeFgSurvey.ts,
// mwcSurvey.ts), and each is served on its own page (its `path`). Nothing else
// needs touching to change wording, options, order, or to add and remove
// questions: the runner, the review screen, the drop-off stats and the CSV
// export all read the definition.
//
// EDITING A SURVEY
// ----------------
//   - Reword a `prompt`, `label`, `help` or `hint` freely. Safe at any time.
//   - Reorder questions or whole sections freely. Safe at any time.
//   - Add a question: give it an `id` and an `exportKey` nothing else in that
//     survey uses.
//   - Remove a question: answers already collected for it stay in the database
//     but stop appearing in the export. Prefer removing before a session, not
//     during one.
//   - Do NOT change an `id`, an option `value`, or the order of a scale's
//     `labels` once people have started answering — those are what is written
//     to the database, and changing them orphans the answers already given.
//
// STARTING A NEW SESSION
// ----------------------
// Copy a survey file, give it a new `id` and `path`, add it to SURVEYS below,
// and add a page for the path in app/[locale]/(root)/(surveys)/. Responses are
// keyed on the id, so a new id gives everyone a clean, empty survey and keeps
// earlier sessions' data intact and separately exportable. Any number of
// surveys can be open at once.
//
// To close a survey, set its `open` to false. Its page then says there is
// nothing to fill in, and its results stay in /admin/surveys.
//
// LANGUAGE
// --------
// The questions are written in English on purpose, pitched at the reading level
// of the room, and are read aloud by facilitators where needed. Do not make the
// wording more formal or more polite — short and plain beats correct here.
//
// OUT OF SCOPE, DELIBERATELY
// --------------------------
// No question about employers, pay, or living conditions. Those disclosures
// need a trained responder and a referral pathway, not a form.

import { HOME_FG_SURVEY } from "./homeFgSurvey";
import { MWC_SURVEY } from "./mwcSurvey";

/**
 * Every survey we have ever run, oldest first. Old entries stay here so their
 * responses can still be exported with the right question wording.
 */
export const SURVEYS: SurveyDefinition[] = [HOME_FG_SURVEY, MWC_SURVEY];

/** The survey the home page button leads to, or null for no button. */
export const HOME_PAGE_SURVEY_ID: string | null = MWC_SURVEY.id;

/**
 * The survey the dashboard banner invites people to, or null for no banner.
 * Off: each workshop's survey is reached from the home page button or a link
 * handed out in the room, and a banner would invite every learner.
 */
export const DASHBOARD_SURVEY_ID: string | null = null;

export function getSurveyById(surveyId: string): SurveyDefinition | null {
    return SURVEYS.find((survey) => survey.id === surveyId) ?? null;
}

/**
 * The survey with this id if it is taking answers, otherwise null. The id may
 * come straight from a client, so anything that isn't a known id is null.
 */
export function getOpenSurvey(surveyId: unknown): SurveyDefinition | null {
    if (typeof surveyId !== "string") return null;
    const survey = getSurveyById(surveyId);
    return survey?.open ? survey : null;
}

/** Every survey taking answers right now, oldest first. */
export function getOpenSurveys(): SurveyDefinition[] {
    return SURVEYS.filter((survey) => survey.open);
}

/** Every question, in order, flattened out of the sections. */
export function getSurveyQuestions(survey: SurveyDefinition): SurveyQuestion[] {
    return survey.sections.flatMap((section) => section.questions);
}

/** The section a question belongs to, for the heading above it. */
export function getSectionForQuestion(
    survey: SurveyDefinition,
    questionId: string,
): SurveySection | null {
    return (
        survey.sections.find((section) =>
            section.questions.some((question) => question.id === questionId),
        ) ?? null
    );
}
