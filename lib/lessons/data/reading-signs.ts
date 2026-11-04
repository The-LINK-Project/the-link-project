/**
 * Lesson: "Reading signs".
 *
 * Reading was the second most asked-for skill at both workshops. These are the
 * short words on doors, floors and walls that a learner meets every day, so each
 * photo here does carry its words, unlike the rest of the lesson pictures.
 *
 * Every Bengali, Tamil and Hindi string is `reviewed: false` and must be
 * checked by a native speaker before real learners see it.
 */

import type { Lesson } from "../types";

export const readingSigns: Lesson = {
    id: "reading-signs",
    title: {
        en: "Reading signs",
        bn: "সাইন পড়া",
        ta: "அறிவிப்புகளைப் படித்தல்",
        hi: "साइन पढ़ना",
    },
    goal: {
        en: "Read the signs you see every day, and ask when you do not understand one.",
        bn: "রোজ যেসব সাইন দেখেন সেগুলো পড়া, আর না বুঝলে জিজ্ঞাসা করা।",
        ta: "தினமும் பார்க்கும் அறிவிப்புகளைப் படிப்பது, புரியாவிட்டால் கேட்பது.",
        hi: "रोज़ दिखने वाले साइन पढ़ना, और समझ न आए तो पूछना।",
    },
    icon: "sign",
    level: "beginner",
    estimatedMinutes: 5,

    notes: [
        {
            id: "note-rs-colour",
            text: {
                en: "Red signs usually mean stop or danger. Yellow means be careful. Green usually means safe, or the way out.",
                bn: "লাল সাইন সাধারণত থামুন বা বিপদ বোঝায়। হলুদ মানে সাবধান। সবুজ সাধারণত নিরাপদ বা বের হওয়ার পথ বোঝায়।",
                ta: "சிவப்பு அறிவிப்பு பொதுவாக நில் அல்லது ஆபத்து என்று பொருள். மஞ்சள் என்றால் கவனம். பச்சை பொதுவாகப் பாதுகாப்பு அல்லது வெளியேறும் வழி.",
                hi: "लाल साइन का मतलब आमतौर पर रुकें या ख़तरा है। पीला मतलब सावधान। हरा आमतौर पर सुरक्षित या बाहर का रास्ता बताता है।",
            },
            reviewed: false,
        },
        {
            id: "note-rs-smoke",
            text: {
                en: "You can be fined for smoking where it is not allowed. Many places have a yellow box that shows where you can smoke.",
                bn: "নিষিদ্ধ জায়গায় ধূমপান করলে জরিমানা হতে পারে। অনেক জায়গায় হলুদ বাক্স আঁকা থাকে, সেখানে ধূমপান করা যায়।",
                ta: "அனுமதி இல்லாத இடத்தில் புகைபிடித்தால் அபராதம் விதிக்கப்படலாம். பல இடங்களில் புகைபிடிக்கக்கூடிய இடத்தை மஞ்சள் கட்டம் காட்டும்.",
                hi: "मना की गई जगह पर धूम्रपान करने पर जुर्माना हो सकता है। कई जगहों पर पीला बॉक्स बना होता है, जहाँ धूम्रपान कर सकते हैं।",
            },
            reviewed: false,
        },
        {
            id: "note-rs-languages",
            text: {
                en: "Many signs in Singapore are in English, Chinese, Malay and Tamil. If your language is there, read it first, then look for the English word.",
                bn: "সিঙ্গাপুরের অনেক সাইন ইংরেজি, চীনা, মালয় আর তামিলে লেখা। আপনার ভাষা থাকলে আগে সেটা পড়ুন, তারপর ইংরেজি শব্দটা খুঁজুন।",
                ta: "சிங்கப்பூரில் பல அறிவிப்புகள் ஆங்கிலம், சீனம், மலாய், தமிழில் இருக்கும். உங்கள் மொழியில் இருந்தால் முதலில் அதைப் படித்துவிட்டு ஆங்கிலச் சொல்லைப் பாருங்கள்.",
                hi: "सिंगापुर में कई साइन अंग्रेज़ी, चीनी, मलय और तमिल में होते हैं। आपकी भाषा में हो तो पहले उसे पढ़ें, फिर अंग्रेज़ी शब्द देखें।",
            },
            reviewed: false,
        },
        {
            id: "note-rs-ask",
            text: {
                en: "Not sure what a sign means? Take a photo and ask someone. Do not go past a danger sign.",
                bn: "সাইনের মানে না বুঝলে ছবি তুলে কাউকে জিজ্ঞাসা করুন। বিপদের সাইন পেরিয়ে যাবেন না।",
                ta: "அறிவிப்பின் பொருள் புரியவில்லையா? படம் எடுத்து யாரிடமாவது கேளுங்கள். ஆபத்து அறிவிப்பைத் தாண்டிச் செல்லாதீர்கள்.",
                hi: "साइन का मतलब समझ न आए तो फ़ोटो लेकर किसी से पूछें। ख़तरे के साइन से आगे न जाएँ।",
            },
            reviewed: false,
        },
    ],

    vocab: [
        {
            id: "v-wet-floor",
            term: "wet floor",
            meaning: {
                en: "the floor has water; you can slip",
                bn: "মেঝে ভেজা, পিছলে যেতে পারেন",
                ta: "தரை ஈரமாக உள்ளது, வழுக்கலாம்",
                hi: "फ़र्श गीला है, फिसल सकते हैं",
            },
            picture: "wetFloor",
            reviewed: false,
        },
        {
            id: "v-no-entry",
            term: "no entry",
            meaning: {
                en: "do not go in",
                bn: "ভেতরে যাবেন না",
                ta: "உள்ளே செல்லக்கூடாது",
                hi: "अंदर न जाएँ",
            },
            picture: "noEntry",
            reviewed: false,
        },
        {
            id: "v-no-smoking",
            term: "no smoking",
            meaning: {
                en: "do not smoke here",
                bn: "এখানে ধূমপান করবেন না",
                ta: "இங்கே புகைபிடிக்கக்கூடாது",
                hi: "यहाँ धूम्रपान न करें",
            },
            picture: "noSmoking",
            reviewed: false,
        },
        {
            id: "v-closed",
            term: "closed",
            meaning: {
                en: "not open now",
                bn: "এখন বন্ধ",
                ta: "இப்போது மூடப்பட்டுள்ளது",
                hi: "अभी बंद है",
            },
            picture: "closed",
            reviewed: false,
        },
        {
            id: "v-push",
            term: "push",
            meaning: {
                en: "press the door away from you",
                bn: "দরজা সামনে ঠেলুন",
                ta: "கதவை முன்னால் தள்ளுங்கள்",
                hi: "दरवाज़ा आगे धकेलें",
            },
            picture: "push",
            reviewed: false,
        },
        {
            id: "v-pull",
            term: "pull",
            meaning: {
                en: "bring the door towards you",
                bn: "দরজা নিজের দিকে টানুন",
                ta: "கதவை உங்கள் பக்கம் இழுங்கள்",
                hi: "दरवाज़ा अपनी ओर खींचें",
            },
            picture: "pull",
            reviewed: false,
        },
        {
            id: "v-toilet",
            term: "toilet",
            meaning: {
                en: "the room with a toilet, in a public place",
                bn: "শৌচাগার",
                ta: "கழிப்பறை",
                hi: "शौचालय",
            },
            picture: "toilet",
            reviewed: false,
        },
        {
            id: "v-danger",
            term: "danger",
            meaning: {
                en: "something here can hurt you",
                bn: "এখানে বিপদ, ক্ষতি হতে পারে",
                ta: "இங்கே ஆபத்து, காயம் ஏற்படலாம்",
                hi: "यहाँ ख़तरा है, चोट लग सकती है",
            },
            picture: "danger",
            reviewed: false,
        },
    ],

    phrases: [
        {
            id: "p-rs-mean",
            text: "What does this sign mean?",
            meaning: {
                en: "Asking someone to explain a sign.",
                bn: "এই সাইনের মানে কী?",
                ta: "இந்த அறிவிப்பின் பொருள் என்ன?",
                hi: "इस साइन का मतलब क्या है?",
            },
            reviewed: false,
        },
        {
            id: "p-rs-wet",
            text: "The floor is wet.",
            meaning: {
                en: "Telling someone to be careful of the wet floor.",
                bn: "মেঝেটা ভেজা।",
                ta: "தரை ஈரமாக உள்ளது.",
                hi: "फ़र्श गीला है।",
            },
            reviewed: false,
        },
        {
            id: "p-rs-toilet",
            text: "Where is the toilet?",
            meaning: {
                en: "Asking the way to the toilet.",
                bn: "শৌচাগার কোথায়?",
                ta: "கழிப்பறை எங்கே?",
                hi: "शौचालय कहाँ है?",
            },
            reviewed: false,
        },
        {
            id: "p-rs-closed",
            text: "The shop is closed.",
            meaning: {
                en: "Saying a shop is not open.",
                bn: "দোকানটা বন্ধ।",
                ta: "கடை மூடப்பட்டுள்ளது.",
                hi: "दुकान बंद है।",
            },
            reviewed: false,
        },
        {
            id: "p-rs-cannot",
            text: "You cannot go in.",
            meaning: {
                en: "Telling someone they are not allowed to enter.",
                bn: "আপনি ভেতরে যেতে পারবেন না।",
                ta: "நீங்கள் உள்ளே போக முடியாது.",
                hi: "आप अंदर नहीं जा सकते।",
            },
            reviewed: false,
        },
    ],

    exercises: [
        {
            id: "rs-0-picture",
            type: "selectPicture",
            instruction: {
                en: "Which one is this?",
                bn: "এটি কোনটি?",
                ta: "இது எது?",
                hi: "यह कौन-सा है?",
            },
            practises: ["v-wet-floor"],
            vocabId: "v-wet-floor",
            choiceVocabIds: ["v-wet-floor", "v-closed", "v-toilet"],
            grading: { mode: "choice" },
        },
        {
            id: "rs-1-pairs",
            type: "matchPairs",
            instruction: {
                en: "Tap the pairs",
                bn: "জোড়া মেলান",
                ta: "ஜோடிகளைத் தட்டுங்கள்",
                hi: "जोड़ी मिलाएँ",
            },
            practises: ["v-no-entry", "v-no-smoking", "v-push", "v-pull"],
            vocabIds: ["v-no-entry", "v-no-smoking", "v-push", "v-pull"],
            grading: { mode: "pairs" },
        },
        {
            id: "rs-2-listen",
            type: "listenChooseMeaning",
            instruction: {
                en: "Listen. What does it mean?",
                bn: "শুনুন। এর মানে কী?",
                ta: "கேளுங்கள். இதன் பொருள் என்ன?",
                hi: "सुनिए। इसका मतलब क्या है?",
            },
            practises: ["v-danger"],
            audioText: "danger",
            choices: [
                { id: "c-correct", vocabId: "v-danger" },
                { id: "c-wrong-1", vocabId: "v-closed" },
                { id: "c-wrong-2", vocabId: "v-toilet" },
            ],
            correctChoiceId: "c-correct",
            grading: { mode: "choice" },
        },
        {
            id: "rs-3-picture-word",
            type: "pictureToWord",
            instruction: {
                en: "What is this called?",
                bn: "এটাকে কী বলে?",
                ta: "இதை என்ன என்று சொல்வார்கள்?",
                hi: "इसे क्या कहते हैं?",
            },
            practises: ["v-closed"],
            vocabId: "v-closed",
            choiceVocabIds: ["v-closed", "v-push", "v-pull"],
            grading: { mode: "choice" },
        },
        {
            id: "rs-4-arrange",
            type: "arrangeWords",
            instruction: {
                en: "Put the words in order",
                bn: "শব্দগুলো সাজান",
                ta: "சொற்களை வரிசைப்படுத்துங்கள்",
                hi: "शब्दों को क्रम में लगाएँ",
            },
            practises: ["v-danger"],
            phraseId: "p-rs-mean",
            tokens: ["What", "does", "this", "sign", "mean"],
            grading: { mode: "keywords", keywords: ["sign", "mean"] },
        },
        {
            id: "rs-5-dialogue",
            type: "dialogueChoice",
            instruction: {
                en: "What do you say?",
                bn: "আপনি কী বলবেন?",
                ta: "நீங்கள் என்ன சொல்வீர்கள்?",
                hi: "आप क्या कहेंगे?",
            },
            practises: ["v-toilet"],
            situation: {
                en: "You are new in a building and you need the toilet. You see a cleaner.",
                bn: "আপনি একটা ভবনে নতুন, শৌচাগারে যাওয়া দরকার। একজন পরিচ্ছন্নতাকর্মীকে দেখলেন।",
                ta: "நீங்கள் ஒரு கட்டடத்துக்குப் புதியவர், கழிப்பறைக்குப் போக வேண்டும். ஒரு துப்புரவுப் பணியாளரைப் பார்க்கிறீர்கள்.",
                hi: "आप एक इमारत में नए हैं और आपको शौचालय जाना है। आपको एक सफ़ाईकर्मी दिखता है।",
            },
            line: "Hello, do you need help?",
            lineMeaning: {
                en: "The cleaner asks if you need help.",
                bn: "পরিচ্ছন্নতাকর্মী জিজ্ঞাসা করছেন আপনার সাহায্য লাগবে কি না।",
                ta: "உங்களுக்கு உதவி வேண்டுமா என்று துப்புரவுப் பணியாளர் கேட்கிறார்.",
                hi: "सफ़ाईकर्मी पूछ रहा है कि क्या आपको मदद चाहिए।",
            },
            phraseId: "p-rs-toilet",
            distractors: [
                { id: "d-closed", phraseId: "p-rs-closed" },
                { id: "d-cannot", phraseId: "p-rs-cannot" },
            ],
            grading: { mode: "choice" },
        },
        {
            id: "rs-6-listen-arrange",
            type: "listenArrangeWords",
            instruction: {
                en: "Listen. Tap what you hear",
                bn: "শুনুন। যা শুনলেন তা সাজান",
                ta: "கேளுங்கள். கேட்டதைத் தட்டுங்கள்",
                hi: "सुनिए। जो सुना, उसे लगाइए",
            },
            practises: ["v-wet-floor"],
            phraseId: "p-rs-wet",
            tokens: ["The", "floor", "is", "wet", "closed", "push"],
            grading: { mode: "keywords", keywords: ["floor", "wet"] },
        },
        {
            id: "rs-7-dialogue-entry",
            type: "dialogueChoice",
            instruction: {
                en: "What do you say?",
                bn: "আপনি কী বলবেন?",
                ta: "நீங்கள் என்ன சொல்வீர்கள்?",
                hi: "आप क्या कहेंगे?",
            },
            practises: ["v-no-entry"],
            situation: {
                en: "Your friend is walking to a door with a red No Entry sign.",
                bn: "আপনার বন্ধু লাল No Entry সাইন লাগানো একটা দরজার দিকে যাচ্ছেন।",
                ta: "உங்கள் நண்பர் சிவப்பு No Entry அறிவிப்பு உள்ள கதவை நோக்கிப் போகிறார்.",
                hi: "आपका दोस्त लाल No Entry साइन वाले दरवाज़े की ओर जा रहा है।",
            },
            line: "Can I go in here?",
            lineMeaning: {
                en: "Your friend asks if they can go in.",
                bn: "আপনার বন্ধু জিজ্ঞাসা করছেন ভেতরে যাওয়া যাবে কি না।",
                ta: "உள்ளே போகலாமா என்று உங்கள் நண்பர் கேட்கிறார்.",
                hi: "आपका दोस्त पूछ रहा है कि क्या वह अंदर जा सकता है।",
            },
            phraseId: "p-rs-cannot",
            distractors: [
                { id: "d-toilet", phraseId: "p-rs-toilet" },
                { id: "d-wet", phraseId: "p-rs-wet" },
            ],
            grading: { mode: "choice" },
        },
        {
            id: "rs-8-translate",
            type: "translateWordBank",
            instruction: {
                en: "Say this in English",
                bn: "এটি ইংরেজিতে বলুন",
                ta: "இதை ஆங்கிலத்தில் சொல்லுங்கள்",
                hi: "इसे अंग्रेज़ी में कहिए",
            },
            practises: ["v-closed"],
            prompt: {
                en: "The shop is closed.",
                bn: "দোকানটা বন্ধ।",
                ta: "கடை மூடப்பட்டுள்ளது.",
                hi: "दुकान बंद है।",
            },
            phraseId: "p-rs-closed",
            tokens: ["The", "shop", "is", "closed", "toilet", "danger"],
            grading: { mode: "keywords", keywords: ["shop", "closed"] },
        },
        {
            id: "rs-9-fill",
            type: "fillBlank",
            instruction: {
                en: "Fill in the missing word",
                bn: "খালি জায়গায় শব্দ বসান",
                ta: "விடுபட்ட சொல்லை நிரப்புங்கள்",
                hi: "छूटा हुआ शब्द भरें",
            },
            practises: ["v-push"],
            sentence: ["Please", null, "the door."],
            choices: [
                { id: "f-push", label: "push" },
                { id: "f-toilet", label: "toilet" },
                { id: "f-danger", label: "danger" },
            ],
            correctChoiceId: "f-push",
            grading: { mode: "choice" },
        },
    ],

    speaking: {
        scene: "The learner is walking through a shopping mall in Singapore and does not understand some of the signs. You are a friendly cleaner who works in the mall and is happy to help someone who speaks little English.",
        names: [],
        goals: [
            { id: "say-rs-mean", phraseId: "p-rs-mean", keywords: ["sign", "mean"] },
            { id: "say-rs-toilet", phraseId: "p-rs-toilet", keywords: ["where", "toilet"] },
            { id: "say-rs-wet", phraseId: "p-rs-wet", keywords: ["floor", "wet"] },
            { id: "say-rs-closed", phraseId: "p-rs-closed", keywords: ["shop", "closed"] },
        ],
    },
};
