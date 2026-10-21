// HOME focus group survey, for migrant domestic workers (July 2026). Served at
// /homefgsurvey; it lived at /survey until the MWC workshop got its own survey,
// and /survey still redirects here. Read the editing notes in feedbackSurvey.ts
// before changing anything.

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

export const HOME_FG_SURVEY: SurveyDefinition = {
    id: "workshop-2026-07b",
    title: "Tell us about today",
    label: "HOME focus group · domestic workers · July 2026",
    path: "/homefgsurvey",
    open: true,
    timeEstimate: "about 5 minutes",
    consent: {
        heading: "Your answers are anonymous",
        body: "Your employer will never see this. You can skip most questions. You can stop any time. Your answers help us make the next workshop better.",
        startLabel: "Start",
        declineLabel: "No thank you",
    },
    sections: [ABOUT_YOU, TODAY, THE_APP, NEXT, YOUR_WORDS],
};
