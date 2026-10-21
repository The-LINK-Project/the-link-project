// MWC workshop survey, for migrant workers (23 October 2026). Served at
// /mwcsurvey, and linked from the button on the home page. Read the editing
// notes in feedbackSurvey.ts before changing anything.
//
// Questions that ask the same thing as the HOME survey keep its ids and
// exportKeys, so the two CSV exports line up column for column. New
// questions carry on the numbering from q30.

const ANY_LANGUAGE_HINT = "You can write in any language.";

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
            // Where work permit holders in construction, shipyards and
            // factories mostly come from, so it covers the room.
            options: [
                { value: "bangladesh", label: "Bangladesh" },
                { value: "china", label: "China" },
                { value: "india", label: "India" },
                { value: "malaysia", label: "Malaysia" },
                { value: "myanmar", label: "Myanmar" },
                { value: "philippines", label: "Philippines" },
                { value: "sri-lanka", label: "Sri Lanka" },
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
                { value: "bengali", label: "Bengali" },
                { value: "tamil", label: "Tamil" },
                { value: "hindi", label: "Hindi" },
                { value: "telugu", label: "Telugu" },
                { value: "chinese", label: "Chinese" },
                { value: "burmese", label: "Burmese" },
                { value: "thai", label: "Thai" },
                { value: "sinhala", label: "Sinhala" },
                { value: "english", label: "English" },
                { value: "other", label: "Other", isOther: true },
            ],
        },
        {
            id: "time-in-singapore",
            exportKey: "q30_time_in_singapore",
            kind: "single",
            prompt: "How long have you been in Singapore?",
            options: [
                { value: "under-1-year", label: "Less than 1 year" },
                { value: "1-2-years", label: "1 to 2 years" },
                { value: "3-5-years", label: "3 to 5 years" },
                { value: "over-5-years", label: "More than 5 years" },
            ],
        },
        {
            id: "work-type",
            exportKey: "q31_work_type",
            kind: "single",
            // The kind of work only, never the company: it decides which work
            // words the lessons teach first.
            prompt: "What kind of work do you do?",
            options: [
                { value: "construction", label: "Construction" },
                { value: "shipyard", label: "Shipyard" },
                { value: "factory", label: "Factory" },
                { value: "cleaning", label: "Cleaning" },
                { value: "other", label: "Other", isOther: true },
            ],
        },
    ],
};

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
            kind: "single",
            // One tap for most people; the box to write in only opens on
            // "Yes". In the HOME survey this was a written answer everyone
            // had to give.
            prompt: "Was anything in the app hard or confusing?",
            options: [
                { value: "no", label: "No, it was OK" },
                {
                    value: "yes",
                    label: "Yes — tell us what happened",
                    isOther: true,
                },
            ],
        },
        {
            id: "when-use-app",
            exportKey: "q32_when_use_app",
            kind: "multi",
            // Asks when, not where: for most people in this room, home is a
            // dormitory.
            prompt: "When could you use the app? Pick all that fit.",
            options: [
                { value: "after-work", label: "After work" },
                { value: "rest-day", label: "On my rest day" },
                { value: "work-break", label: "In my break at work" },
                { value: "way-to-work", label: "On the way to work" },
                {
                    value: "wont-use",
                    label: "I don't think I will",
                    exclusive: true,
                },
            ],
        },
        {
            id: "phone-internet",
            exportKey: "q33_phone_internet",
            kind: "single",
            // Lessons and the voice tutor need internet, so this shows who
            // can't use the app at all.
            prompt: "Can you use the internet on your phone most days?",
            options: [
                { value: "always", label: "Yes, always" },
                { value: "wifi-only", label: "Only with Wi-Fi" },
                { value: "sometimes", label: "Sometimes" },
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
                { value: "work-safety", label: "Safety words at work" },
                {
                    value: "talking-to-supervisor",
                    label: "Talking to my supervisor",
                },
                { value: "health", label: "Going to the doctor" },
                {
                    value: "getting-around",
                    label: "Bus, MRT and finding places",
                },
                {
                    value: "money-sending-home",
                    label: "Money and sending money home",
                },
                { value: "phone-apps", label: "Using phone apps" },
                { value: "rights-at-work", label: "My rights at work" },
                {
                    value: "reading-writing-english",
                    label: "Reading and writing English",
                },
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

export const MWC_SURVEY: SurveyDefinition = {
    id: "mwc-2026-10",
    title: "Tell us about today",
    label: "MWC workshop · migrant workers · 23 Oct 2026",
    path: "/mwcsurvey",
    open: true,
    timeEstimate: "about 6 minutes",
    consent: {
        // The heading alone, on purpose. Lines about bosses or work permits
        // plant a worry the survey has nothing to do with.
        heading: "Your answers are anonymous",
        startLabel: "Start",
        declineLabel: "No thank you",
    },
    sections: [ABOUT_YOU, TODAY, THE_APP, NEXT, YOUR_WORDS],
};
