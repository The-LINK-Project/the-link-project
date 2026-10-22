// MWC workshop survey, for migrant workers (22 October 2026). Served at
// /mwcsurvey, and linked from the button on the home page. Read the editing
// notes in feedbackSurvey.ts before changing anything.
//
// House style for this survey: "how much" questions are a number from 0 to 5
// with only the two ends put into words, and no em dashes anywhere in what
// people read.
//
// Questions that ask the same thing in the same way as the HOME survey keep
// its ids and exportKeys, so the two CSV exports line up column for column.
// A question that changed shape (HOME's 1 to 5 word scales are 0 to 5 numbers
// here) keeps its id but gets its own column, so the two are never averaged
// together by mistake. New questions carry on the numbering from q30.

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
            exportKey: "q5_enjoyed_0to5",
            kind: "rating",
            prompt: "How much did you enjoy today?",
            min: 0,
            max: 5,
            minLabel: "Not at all",
            maxLabel: "Very much",
        },
        {
            id: "confidence-before",
            exportKey: "q7_confidence_before_0to5",
            kind: "rating",
            prompt: "Before today, how confident were you speaking English to a new person?",
            min: 0,
            max: 5,
            minLabel: "Not at all",
            maxLabel: "Very confident",
        },
        {
            id: "balance-today",
            exportKey: "q14_balance_today_3way",
            kind: "single",
            // Three plain choices rather than a 0 to 5 number: the good
            // answer is the middle one, which a number line can't show.
            prompt: "How was the mix of games and teaching today?",
            options: [
                { value: "too-many-games", label: "Too many games" },
                { value: "good-mix", label: "A good mix" },
                { value: "too-much-teaching", label: "Too much teaching" },
            ],
        },
        {
            id: "new-phrase",
            exportKey: "q28_new_phrase",
            kind: "text",
            required: true,
            prompt: "What is one new thing you can say in English now?",
            hint: "One word or a full sentence. Anything you learned today.",
        },
        {
            id: "liked-most",
            exportKey: "q35_liked_most",
            kind: "text",
            prompt: "What did you like most about today?",
            hint: ANY_LANGUAGE_HINT,
        },
    ],
};

const THE_APP: SurveySection = {
    id: "the-app",
    title: "The app",
    questions: [
        {
            id: "signup-ease",
            exportKey: "q15_signup_ease_0to5",
            kind: "rating",
            prompt: "How easy was it to sign up and log in?",
            min: 0,
            max: 5,
            minLabel: "Very hard",
            maxLabel: "Very easy",
        },
        {
            id: "app-hard",
            exportKey: "q29_app_hard_yes_no",
            kind: "single",
            // One tap for most people; the box to write in only opens on
            // "Yes". In the HOME survey this was a written answer everyone
            // had to give.
            prompt: "Was anything in the app hard or confusing?",
            options: [
                { value: "no", label: "No, it was OK" },
                {
                    value: "yes",
                    label: "Yes, tell us what happened",
                    isOther: true,
                },
            ],
        },
        {
            id: "app-or-website",
            exportKey: "q36_app_or_website",
            kind: "single",
            prompt: "Do you want LINK as a phone app or as a website?",
            help: "A phone app comes from the Play Store or App Store. A website opens in Chrome or Safari.",
            options: [
                { value: "app", label: "A phone app I download" },
                { value: "website", label: "A website on my phone" },
                { value: "either", label: "Both are OK" },
                { value: "not-sure", label: "I'm not sure" },
            ],
        },
        {
            id: "when-use-app",
            exportKey: "q32_when_use_app",
            kind: "multi",
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
            id: "internet-where",
            exportKey: "q34_internet_where",
            kind: "multi",
            // Lessons and the voice tutor need internet, so this shows where
            // people can actually use the app, and who can't at all.
            prompt: "Where can you use the internet? Pick all that fit.",
            options: [
                { value: "home", label: "At home" },
                { value: "work", label: "At work" },
                { value: "phone-data", label: "Anywhere, with my phone data" },
                {
                    value: "free-wifi",
                    label: "On free Wi-Fi (MRT, library, shops)",
                },
                {
                    value: "none",
                    label: "I can't use the internet",
                    exclusive: true,
                },
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
            prompt: "What would you like to learn in the app? Pick up to 3.",
            options: [
                { value: "speaking-english", label: "Speaking English" },
                {
                    value: "reading-writing-english",
                    label: "Reading and writing English",
                },
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
                { value: "saving-money", label: "Saving money and budgeting" },
                {
                    value: "sending-money-home",
                    label: "Sending money home safely",
                },
                { value: "phone-apps", label: "Using my phone and apps" },
                { value: "online-scams", label: "Spotting scams online" },
                { value: "using-ai", label: "Using AI, like ChatGPT" },
                { value: "rights-at-work", label: "My rights at work" },
                { value: "other", label: "Other", isOther: true },
            ],
        },
        {
            id: "learn-more",
            exportKey: "q37_learn_more",
            kind: "text",
            prompt: "What else would you like to learn in the app?",
            hint: "Write any topic. For example: a money skill, a phone skill, or something about AI. You can write in any language.",
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

export const MWC_SURVEY: SurveyDefinition = {
    id: "mwc-2026-10",
    title: "Tell us about today",
    label: "MWC workshop · migrant workers · 22 Oct 2026",
    path: "/mwcsurvey",
    open: true,
    timeEstimate: "about 7 minutes",
    consent: {
        // The heading alone, on purpose. Lines about bosses or work permits
        // plant a worry the survey has nothing to do with.
        heading: "Your answers are anonymous",
        startLabel: "Start",
        declineLabel: "No thank you",
    },
    sections: [ABOUT_YOU, TODAY, THE_APP, NEXT],
};
