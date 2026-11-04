/**
 * Lesson: "At the supermarket".
 *
 * Finding things, checking the price and the date, and getting through the
 * counter. Domestic workers often shop with someone else's money, so a note covers
 * keeping the receipt.
 *
 * Every Bengali, Tamil and Hindi string is `reviewed: false` and must be
 * checked by a native speaker before real learners see it.
 */

import type { Lesson } from "../types";

export const supermarket: Lesson = {
    id: "supermarket",
    title: {
        en: "At the supermarket",
        bn: "সুপারমার্কেটে",
        ta: "பல்பொருள் அங்காடியில்",
        hi: "सुपरमार्केट में",
    },
    goal: {
        en: "Find what you need, check the price and the date, and pay at the counter.",
        bn: "যা দরকার তা খোঁজা, দাম আর তারিখ দেখা, আর কাউন্টারে টাকা দেওয়া।",
        ta: "தேவையானதைக் கண்டுபிடிப்பது, விலையையும் தேதியையும் பார்ப்பது, கவுண்டரில் பணம் செலுத்துவது.",
        hi: "ज़रूरत का सामान ढूँढना, दाम और तारीख़ देखना, और काउंटर पर पैसे देना।",
    },
    icon: "cart",
    level: "beginner",
    estimatedMinutes: 5,

    notes: [
        {
            id: "note-sm-bag",
            text: {
                en: "Big supermarkets charge at least 5 cents for each plastic bag. Bring your own bag to save money.",
                bn: "বড় সুপারমার্কেটে প্রতিটি প্লাস্টিক ব্যাগের জন্য কমপক্ষে ৫ সেন্ট লাগে। টাকা বাঁচাতে নিজের ব্যাগ আনুন।",
                ta: "பெரிய பல்பொருள் அங்காடிகளில் ஒவ்வொரு பிளாஸ்டிக் பைக்கும் குறைந்தது 5 காசு கட்டணம் உண்டு. பணம் மிச்சமாக உங்கள் பையைக் கொண்டு வாருங்கள்.",
                hi: "बड़े सुपरमार्केट में हर प्लास्टिक बैग के कम से कम 5 सेंट लगते हैं। पैसे बचाने के लिए अपना बैग लाएँ।",
            },
            reviewed: false,
        },
        {
            id: "note-sm-date",
            text: {
                en: 'Look for the date on food before you buy it. "Best before" and "Use by" tell you how long it is good.',
                bn: 'কেনার আগে খাবারের গায়ে তারিখ দেখুন। "Best before" আর "Use by" বলে দেয় কতদিন ভালো থাকবে।',
                ta: 'வாங்கும் முன் உணவில் உள்ள தேதியைப் பாருங்கள். "Best before", "Use by" என்பவை எவ்வளவு காலம் நன்றாக இருக்கும் என்று சொல்லும்.',
                hi: 'ख़रीदने से पहले खाने पर तारीख़ देखें। "Best before" और "Use by" बताते हैं कि यह कब तक ठीक रहेगा।',
            },
            reviewed: false,
        },
        {
            id: "note-sm-receipt",
            text: {
                en: "Keep the receipt when you shop for someone else, so you can show what you spent.",
                bn: "অন্যের জন্য বাজার করলে রসিদ রাখুন, যাতে কত খরচ হলো দেখাতে পারেন।",
                ta: "வேறொருவருக்காக வாங்கும்போது ரசீதை வைத்திருங்கள், எவ்வளவு செலவு என்று காட்டலாம்.",
                hi: "किसी और के लिए ख़रीदारी करें तो रसीद रखें, ताकि दिखा सकें कितना ख़र्च हुआ।",
            },
            reviewed: false,
        },
        {
            id: "note-sm-member",
            text: {
                en: "The cashier may ask if you have a member card. If you do not have one, just say no.",
                bn: "ক্যাশিয়ার জিজ্ঞাসা করতে পারেন আপনার মেম্বার কার্ড আছে কি না। না থাকলে শুধু না বলুন।",
                ta: "உங்களிடம் உறுப்பினர் அட்டை இருக்கிறதா என்று காசாளர் கேட்கலாம். இல்லையென்றால் இல்லை என்று சொல்லுங்கள்.",
                hi: "कैशियर पूछ सकता है कि आपके पास मेंबर कार्ड है या नहीं। न हो तो बस मना कर दें।",
            },
            reviewed: false,
        },
    ],

    vocab: [
        {
            id: "v-trolley",
            term: "trolley",
            meaning: {
                en: "a big basket on wheels",
                bn: "চাকা লাগানো বড় ঝুড়ি",
                ta: "சக்கரம் உள்ள பெரிய கூடை",
                hi: "पहियों वाली बड़ी टोकरी",
            },
            picture: "trolley",
            reviewed: false,
        },
        {
            id: "v-aisle",
            term: "aisle",
            meaning: {
                en: "the walkway between shelves",
                bn: "তাকের মাঝখানের পথ",
                ta: "அலமாரிகளுக்கு இடையிலான பாதை",
                hi: "शेल्फ़ों के बीच का रास्ता",
            },
            picture: "aisle",
            reviewed: false,
        },
        {
            id: "v-cashier",
            term: "cashier",
            meaning: {
                en: "the person you pay",
                bn: "যাঁকে টাকা দেন",
                ta: "பணம் வாங்கும் நபர்",
                hi: "जिसे पैसे देते हैं",
            },
            picture: "cashier",
            reviewed: false,
        },
        {
            id: "v-receipt",
            term: "receipt",
            meaning: {
                en: "the paper that shows what you paid",
                bn: "রসিদ, কত টাকা দিলেন তার কাগজ",
                ta: "ரசீது, செலுத்திய தொகையைக் காட்டும் காகிதம்",
                hi: "रसीद, जो बताए कि कितने पैसे दिए",
            },
            picture: "receipt",
            reviewed: false,
        },
        {
            id: "v-discount",
            term: "discount",
            meaning: {
                en: "a lower price than usual",
                bn: "সাধারণের চেয়ে কম দাম",
                ta: "வழக்கத்தை விடக் குறைந்த விலை",
                hi: "आम दाम से कम क़ीमत",
            },
            picture: "discount",
            reviewed: false,
        },
        {
            id: "v-expiry-date",
            term: "expiry date",
            meaning: {
                en: "the last day the food is good",
                bn: "খাবার ভালো থাকার শেষ তারিখ",
                ta: "உணவு நன்றாக இருக்கும் கடைசி நாள்",
                hi: "खाना ठीक रहने की आख़िरी तारीख़",
            },
            picture: "expiryDate",
            reviewed: false,
        },
        {
            id: "v-plastic-bag",
            term: "plastic bag",
            meaning: {
                en: "a thin bag to carry your shopping",
                bn: "বাজার নেওয়ার পাতলা ব্যাগ",
                ta: "பொருட்களை எடுத்துச் செல்லும் மெல்லிய பை",
                hi: "सामान ले जाने की पतली थैली",
            },
            picture: "plasticBag",
            reviewed: false,
        },
        {
            id: "v-vegetables",
            term: "vegetables",
            meaning: {
                en: "plants you cook and eat, like carrots",
                bn: "সবজি, যেমন গাজর",
                ta: "காய்கறிகள், கேரட் போல",
                hi: "सब्ज़ियाँ, जैसे गाजर",
            },
            picture: "vegetables",
            reviewed: false,
        },
    ],

    phrases: [
        {
            id: "p-sm-where",
            text: "Where are the vegetables?",
            meaning: {
                en: "Asking where to find something.",
                bn: "সবজি কোথায়?",
                ta: "காய்கறிகள் எங்கே?",
                hi: "सब्ज़ियाँ कहाँ हैं?",
            },
            reviewed: false,
        },
        {
            id: "p-sm-discount",
            text: "Is this on discount?",
            meaning: {
                en: "Asking if the price is lower today.",
                bn: "এটায় কি ছাড় আছে?",
                ta: "இதற்குத் தள்ளுபடி உண்டா?",
                hi: "क्या इस पर छूट है?",
            },
            reviewed: false,
        },
        {
            id: "p-sm-bag",
            text: "Can I have a plastic bag?",
            meaning: {
                en: "Asking the cashier for a bag.",
                bn: "একটা প্লাস্টিক ব্যাগ পাব?",
                ta: "ஒரு பிளாஸ்டிக் பை கிடைக்குமா?",
                hi: "क्या मुझे एक प्लास्टिक बैग मिलेगा?",
            },
            reviewed: false,
        },
        {
            id: "p-sm-receipt",
            text: "Can I have the receipt?",
            meaning: {
                en: "Asking the cashier for the receipt.",
                bn: "রসিদটা দেবেন?",
                ta: "ரசீது தர முடியுமா?",
                hi: "क्या मुझे रसीद मिलेगी?",
            },
            reviewed: false,
        },
        {
            id: "p-sm-expired",
            text: "This milk has expired.",
            meaning: {
                en: "Telling staff that the food is past its date.",
                bn: "এই দুধের মেয়াদ শেষ।",
                ta: "இந்தப் பாலின் காலம் முடிந்துவிட்டது.",
                hi: "इस दूध की तारीख़ निकल गई है।",
            },
            reviewed: false,
        },
    ],

    exercises: [
        {
            id: "sm-0-picture",
            type: "selectPicture",
            instruction: {
                en: "Which one is this?",
                bn: "এটি কোনটি?",
                ta: "இது எது?",
                hi: "यह कौन-सा है?",
            },
            practises: ["v-trolley"],
            vocabId: "v-trolley",
            choiceVocabIds: ["v-trolley", "v-aisle", "v-cashier"],
            grading: { mode: "choice" },
        },
        {
            id: "sm-1-pairs",
            type: "matchPairs",
            instruction: {
                en: "Tap the pairs",
                bn: "জোড়া মেলান",
                ta: "ஜோடிகளைத் தட்டுங்கள்",
                hi: "जोड़ी मिलाएँ",
            },
            practises: ["v-aisle", "v-cashier", "v-receipt", "v-discount"],
            vocabIds: ["v-aisle", "v-cashier", "v-receipt", "v-discount"],
            grading: { mode: "pairs" },
        },
        {
            id: "sm-2-listen",
            type: "listenChooseMeaning",
            instruction: {
                en: "Listen. What does it mean?",
                bn: "শুনুন। এর মানে কী?",
                ta: "கேளுங்கள். இதன் பொருள் என்ன?",
                hi: "सुनिए। इसका मतलब क्या है?",
            },
            practises: ["v-expiry-date"],
            audioText: "expiry date",
            choices: [
                { id: "c-correct", vocabId: "v-expiry-date" },
                { id: "c-wrong-1", vocabId: "v-plastic-bag" },
                { id: "c-wrong-2", vocabId: "v-trolley" },
            ],
            correctChoiceId: "c-correct",
            grading: { mode: "choice" },
        },
        {
            id: "sm-3-picture-word",
            type: "pictureToWord",
            instruction: {
                en: "What is this called?",
                bn: "এটাকে কী বলে?",
                ta: "இதை என்ன என்று சொல்வார்கள்?",
                hi: "इसे क्या कहते हैं?",
            },
            practises: ["v-vegetables"],
            vocabId: "v-vegetables",
            choiceVocabIds: ["v-vegetables", "v-receipt", "v-plastic-bag"],
            grading: { mode: "choice" },
        },
        {
            id: "sm-4-arrange",
            type: "arrangeWords",
            instruction: {
                en: "Put the words in order",
                bn: "শব্দগুলো সাজান",
                ta: "சொற்களை வரிசைப்படுத்துங்கள்",
                hi: "शब्दों को क्रम में लगाएँ",
            },
            practises: ["v-vegetables"],
            phraseId: "p-sm-where",
            tokens: ["Where", "are", "the", "vegetables"],
            grading: { mode: "keywords", keywords: ["where", "vegetables"] },
        },
        {
            id: "sm-5-dialogue",
            type: "dialogueChoice",
            instruction: {
                en: "What do you say?",
                bn: "আপনি কী বলবেন?",
                ta: "நீங்கள் என்ன சொல்வீர்கள்?",
                hi: "आप क्या कहेंगे?",
            },
            practises: ["v-plastic-bag", "v-cashier"],
            situation: {
                en: "You are paying at the counter. You do not have your own bag.",
                bn: "আপনি কাউন্টারে টাকা দিচ্ছেন। আপনার সঙ্গে নিজের ব্যাগ নেই।",
                ta: "நீங்கள் கவுண்டரில் பணம் செலுத்துகிறீர்கள். உங்களிடம் பை இல்லை.",
                hi: "आप काउंटर पर पैसे दे रहे हैं। आपके पास अपना बैग नहीं है।",
            },
            line: "That is twelve dollars, please.",
            lineMeaning: {
                en: "The cashier tells you the price.",
                bn: "ক্যাশিয়ার আপনাকে দাম বলছেন।",
                ta: "காசாளர் விலையைச் சொல்கிறார்.",
                hi: "कैशियर आपको दाम बता रहा है।",
            },
            phraseId: "p-sm-bag",
            distractors: [
                { id: "d-where", phraseId: "p-sm-where" },
                { id: "d-expired", phraseId: "p-sm-expired" },
            ],
            grading: { mode: "choice" },
        },
        {
            id: "sm-6-listen-arrange",
            type: "listenArrangeWords",
            instruction: {
                en: "Listen. Tap what you hear",
                bn: "শুনুন। যা শুনলেন তা সাজান",
                ta: "கேளுங்கள். கேட்டதைத் தட்டுங்கள்",
                hi: "सुनिए। जो सुना, उसे लगाइए",
            },
            practises: ["v-receipt"],
            phraseId: "p-sm-receipt",
            tokens: ["Can", "I", "have", "the", "receipt", "trolley", "aisle"],
            grading: { mode: "keywords", keywords: ["have", "receipt"] },
        },
        {
            id: "sm-7-dialogue-expired",
            type: "dialogueChoice",
            instruction: {
                en: "What do you say?",
                bn: "আপনি কী বলবেন?",
                ta: "நீங்கள் என்ன சொல்வீர்கள்?",
                hi: "आप क्या कहेंगे?",
            },
            practises: ["v-expiry-date"],
            situation: {
                en: "The milk in your basket is past its date. You show it to a staff member.",
                bn: "আপনার ঝুড়ির দুধের তারিখ পেরিয়ে গেছে। আপনি একজন কর্মীকে দেখালেন।",
                ta: "உங்கள் கூடையில் உள்ள பாலின் தேதி கடந்துவிட்டது. அதை ஒரு பணியாளரிடம் காட்டுகிறீர்கள்.",
                hi: "आपकी टोकरी के दूध की तारीख़ निकल चुकी है। आप उसे एक कर्मचारी को दिखाते हैं।",
            },
            line: "Yes, can I help you?",
            lineMeaning: {
                en: "A staff member asks if they can help you.",
                bn: "একজন কর্মী জিজ্ঞাসা করছেন তিনি সাহায্য করতে পারেন কি না।",
                ta: "உங்களுக்கு உதவலாமா என்று பணியாளர் கேட்கிறார்.",
                hi: "कर्मचारी पूछ रहा है कि क्या वह आपकी मदद कर सकता है।",
            },
            phraseId: "p-sm-expired",
            distractors: [
                { id: "d-bag", phraseId: "p-sm-bag" },
                { id: "d-receipt", phraseId: "p-sm-receipt" },
            ],
            grading: { mode: "choice" },
        },
        {
            id: "sm-8-translate",
            type: "translateWordBank",
            instruction: {
                en: "Say this in English",
                bn: "এটি ইংরেজিতে বলুন",
                ta: "இதை ஆங்கிலத்தில் சொல்லுங்கள்",
                hi: "इसे अंग्रेज़ी में कहिए",
            },
            practises: ["v-discount"],
            prompt: {
                en: "Is this on discount?",
                bn: "এটায় কি ছাড় আছে?",
                ta: "இதற்குத் தள்ளுபடி உண்டா?",
                hi: "क्या इस पर छूट है?",
            },
            phraseId: "p-sm-discount",
            tokens: ["Is", "this", "on", "discount", "receipt", "aisle"],
            grading: { mode: "keywords", keywords: ["discount"] },
        },
        {
            id: "sm-9-fill",
            type: "fillBlank",
            instruction: {
                en: "Fill in the missing word",
                bn: "খালি জায়গায় শব্দ বসান",
                ta: "விடுபட்ட சொல்லை நிரப்புங்கள்",
                hi: "छूटा हुआ शब्द भरें",
            },
            practises: ["v-expiry-date"],
            sentence: ["I check the", null, "on the milk."],
            choices: [
                { id: "f-expiry-date", label: "expiry date" },
                { id: "f-cashier", label: "cashier" },
                { id: "f-trolley", label: "trolley" },
            ],
            correctChoiceId: "f-expiry-date",
            grading: { mode: "choice" },
        },
    ],

    speaking: {
        scene: "The learner is shopping in a neighbourhood supermarket in Singapore. You are a friendly staff member who is happy to help a customer who speaks little English.",
        names: [],
        goals: [
            { id: "say-sm-where", phraseId: "p-sm-where", keywords: ["where", "vegetables"] },
            { id: "say-sm-discount", phraseId: "p-sm-discount", keywords: ["discount"] },
            { id: "say-sm-bag", phraseId: "p-sm-bag", keywords: ["plastic bag"] },
            { id: "say-sm-receipt", phraseId: "p-sm-receipt", keywords: ["receipt"] },
        ],
    },
};
