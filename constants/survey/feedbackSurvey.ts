// Workshop feedback survey — the whole question set lives here.
//
// EDITING THIS BETWEEN SESSIONS
// -----------------------------
// This file is the survey. Nothing else needs touching to change wording,
// options, order, or to add and remove questions: the runner, the review
// screen, the drop-off stats and the CSV export all read this definition.
//
//   - Reword a `prompt`, `label`, `help` or `hint` freely. Safe at any time.
//   - Reorder questions or whole sections freely. Safe at any time.
//   - Add a question: give it an `id` and an `exportKey` nothing else uses.
//   - Remove a question: answers already collected for it stay in the database
//     but stop appearing in the export. Prefer removing before a session, not
//     during one.
//   - Do NOT change an `id`, an option `value`, or the order of a scale's
//     `labels` once people have started answering — those are what is written
//     to the database, and changing them orphans the answers already given.
//
// STARTING A NEW SESSION
// ----------------------
// Change `ACTIVE_SURVEY_ID` (and the definition's `id` to match). Responses are
// keyed on that id, so a new id gives everyone a clean, empty survey and keeps
// the previous session's data intact and separately exportable.
//
// To close the survey with nothing open in its place, set `ACTIVE_SURVEY_ID` to
// null. The dashboard banner disappears and /survey says there is nothing to
// fill in.
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

/**
 * The survey currently open. `null` means no survey is open: no banner, and
 * /survey explains there is nothing to fill in right now.
 */
export const ACTIVE_SURVEY_ID: string | null = "workshop-2026-07b";

const ABOUT_YOU: SurveySection = {
    id: "about-you",
    title: "About you",
    questions: [
        {
            id: "country",
            exportKey: "q1_country",
            kind: "single",
            required: true,
            prompt: "Where are you from?",
            // Ministry of Manpower list of approved source countries and
            // regions for migrant domestic workers, so it covers the room.
            options: [
                { value: "bangladesh", label: "Bangladesh" },
                { value: "cambodia", label: "Cambodia" },
                { value: "hong-kong", label: "Hong Kong" },
                { value: "india", label: "India" },
                { value: "indonesia", label: "Indonesia" },
                { value: "macau", label: "Macau" },
                { value: "malaysia", label: "Malaysia" },
                { value: "myanmar", label: "Myanmar" },
                { value: "philippines", label: "Philippines" },
                { value: "south-korea", label: "South Korea" },
                { value: "sri-lanka", label: "Sri Lanka" },
                { value: "taiwan", label: "Taiwan" },
                { value: "thailand", label: "Thailand" },
                { value: "other", label: "Other", isOther: true },
            ],
        },
        {
            id: "easiest-language",
            exportKey: "q3_easiest_language",
            kind: "single",
            prompt: "Which language is easiest for you?",
            options: [
                { value: "english", label: "English" },
                { value: "tagalog", label: "Tagalog" },
                { value: "bahasa-indonesia", label: "Bahasa Indonesia" },
                { value: "burmese", label: "Burmese" },
                { value: "tamil", label: "Tamil" },
                { value: "hindi", label: "Hindi" },
                { value: "bengali", label: "Bengali" },
                { value: "sinhala", label: "Sinhala" },
                { value: "thai", label: "Thai" },
                { value: "khmer", label: "Khmer" },
                { value: "other", label: "Other", isOther: true },
            ],
        },
    ],
};

const ANY_LANGUAGE_HINT = "You can write in any language.";

const TODAY: SurveySection = {
    id: "today",
    title: "Today",
    questions: [
        {
            id: "enjoyment",
            exportKey: "q5_enjoyed",
            kind: "scale",
            prompt: "How much did you enjoy today?",
            labels: ["Not at all", "A little", "OK", "A lot", "Very much"],
        },
        {
            id: "confidence-before",
            exportKey: "q7_confidence_before",
            kind: "scale",
            prompt: "Before today, how confident were you speaking English to a new person?",
            labels: [
                "Not confident",
                "A little",
                "OK",
                "Confident",
                "Very confident",
            ],
        },
        {
            id: "confidence-now",
            exportKey: "q8_confidence_now",
            kind: "scale",
            prompt: "Right now, how confident do you feel speaking English to a new person?",
            labels: [
                "Not confident",
                "A little",
                "OK",
                "Confident",
                "Very confident",
            ],
        },
        {
            id: "balance-today",
            exportKey: "q14_balance_today",
            kind: "scale",
            // Middle answer is the good one. Nothing in the UI treats 5 as a
            // win, so this needs no special handling — just don't add any.
            prompt: "How was the mix of games and teaching today?",
            labels: [
                "Too many games",
                "A few too many games",
                "A good balance",
                "A bit too much teaching",
                "Too much teaching",
            ],
        },
        {
            id: "new-phrase",
            exportKey: "q28_new_phrase",
            kind: "text",
            required: true,
            prompt: "What is one new thing you can say in English now?",
            hint: "One word or a full sentence — anything you learned today.",
        },
    ],
};

const THE_APP: SurveySection = {
    id: "the-app",
    title: "The app",
    questions: [
        {
            id: "signup-ease",
            exportKey: "q15_signup_ease",
            kind: "scale",
            prompt: "How easy was it to sign up and log in?",
            labels: ["Very hard", "Hard", "OK", "Easy", "Very easy"],
        },
        {
            id: "app-hard",
            exportKey: "q29_app_hard",
            kind: "text",
            required: true,
            prompt: "Was anything in the app hard or confusing? Tell us what happened.",
            hint: ANY_LANGUAGE_HINT,
        },
        {
            id: "use-at-home",
            exportKey: "q18_use_at_home",
            kind: "single",
            prompt: "Will you use the app by yourself at home?",
            options: [
                { value: "yes", label: "Yes" },
                { value: "no", label: "No" },
            ],
        },
    ],
};

const NEXT: SurveySection = {
    id: "next",
    title: "Next",
    questions: [
        {
            id: "want-to-learn",
            exportKey: "q20_want_to_learn",
            kind: "multi",
            maxSelections: 3,
            prompt: "What do you want to learn most? Pick up to 3.",
            options: [
                { value: "speaking-english", label: "Speaking English" },
                {
                    value: "reading-writing-english",
                    label: "Reading and writing English",
                },
                { value: "money-saving", label: "Money and saving" },
                { value: "sending-money-home", label: "Sending money home" },
                { value: "phone-apps", label: "Using phone apps" },
                {
                    value: "health",
                    label: "Health and going to the doctor",
                },
                { value: "rights-at-work", label: "Your rights at work" },
                { value: "computer-skills", label: "Computer skills" },
                { value: "better-job", label: "Getting a better job" },
                { value: "other", label: "Other", isOther: true },
            ],
        },
        {
            id: "best-time",
            exportKey: "q22_best_time",
            kind: "single",
            prompt: "When is the best time for you?",
            options: [
                { value: "sunday-morning", label: "Sunday morning" },
                { value: "sunday-afternoon", label: "Sunday afternoon" },
                { value: "sunday-evening", label: "Sunday evening" },
                { value: "weekday-evening", label: "A weekday evening" },
                { value: "public-holiday", label: "Public holiday" },
                { value: "other", label: "Other", isOther: true },
            ],
        },
        {
            id: "would-recommend",
            exportKey: "q23_would_recommend",
            kind: "single",
            prompt: "Would you tell a friend to come to the next workshop?",
            options: [
                { value: "yes", label: "Yes" },
                { value: "no", label: "No" },
            ],
        },
    ],
};

const YOUR_WORDS: SurveySection = {
    id: "your-words",
    title: "Your words",
    questions: [
        {
            id: "change-next-time",
            exportKey: "q25_change_next_time",
            kind: "text",
            required: true,
            prompt: "What is one thing we should change next time?",
            hint: ANY_LANGUAGE_HINT,
        },
    ],
};

const WORKSHOP_2026_07: SurveyDefinition = {
    id: "workshop-2026-07b",
    title: "Tell us about today",
    timeEstimate: "about 5 minutes",
    consent: {
        heading: "Your answers are anonymous",
        body: "Your employer will never see this. You can skip most questions. You can stop any time. Your answers help us make the next workshop better.",
        startLabel: "Start",
        declineLabel: "No thank you",
    },
    sections: [ABOUT_YOU, TODAY, THE_APP, NEXT, YOUR_WORDS],
};

/**
 * Every survey we have ever run, keyed by id. Old entries stay here so their
 * responses can still be exported with the right question wording.
 */
export const SURVEYS: SurveyDefinition[] = [WORKSHOP_2026_07];

export function getSurveyById(surveyId: string): SurveyDefinition | null {
    return SURVEYS.find((survey) => survey.id === surveyId) ?? null;
}

/** The survey people can fill in right now, or null when none is open. */
export function getActiveSurvey(): SurveyDefinition | null {
    return ACTIVE_SURVEY_ID ? getSurveyById(ACTIVE_SURVEY_ID) : null;
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
