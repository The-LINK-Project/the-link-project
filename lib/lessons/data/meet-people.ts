/**
 * Lesson: "Getting to know someone".
 *
 * Both workshops asked for speaking above everything else, and this is the
 * speaking lesson with no setting to learn first: names, countries, work and the
 * day off. The speaking goals are questions, so the learner leads the talk.
 *
 * Every Bengali, Tamil and Hindi string is `reviewed: false` and must be
 * checked by a native speaker before real learners see it.
 */

import type { Lesson } from "../types";

export const meetPeople: Lesson = {
    id: "meet-people",
    title: {
        en: "Getting to know someone",
        bn: "পরিচয় করা",
        ta: "ஒருவரைத் தெரிந்துகொள்வது",
        hi: "जान-पहचान",
    },
    goal: {
        en: "Say your name and where you are from, and ask new people about themselves.",
        bn: "নিজের নাম আর কোথা থেকে এসেছেন বলা, আর নতুন মানুষকে তাঁদের কথা জিজ্ঞাসা করা।",
        ta: "உங்கள் பெயரையும் ஊரையும் சொல்வது, புதியவர்களிடம் அவர்களைப் பற்றிக் கேட்பது.",
        hi: "अपना नाम और आप कहाँ से हैं बताना, और नए लोगों से उनके बारे में पूछना।",
    },
    icon: "chat",
    level: "beginner",
    estimatedMinutes: 6,

    notes: [
        {
            id: "note-mp-eaten",
            text: {
                en: 'People in Singapore often say "Have you eaten?" as a friendly hello. You can say "Yes, thank you."',
                bn: 'সিঙ্গাপুরে অনেকে বন্ধুর মতো "Have you eaten?" বলে কুশল জিজ্ঞাসা করেন। আপনি বলতে পারেন "Yes, thank you."',
                ta: 'சிங்கப்பூரில் பலர் நட்பாக "Have you eaten?" என்று நலம் விசாரிப்பார்கள். நீங்கள் "Yes, thank you." என்று சொல்லலாம்.',
                hi: 'सिंगापुर में कई लोग दोस्ताना ढंग से "Have you eaten?" पूछकर हालचाल लेते हैं। आप कह सकते हैं "Yes, thank you."',
            },
            reviewed: false,
        },
        {
            id: "note-mp-aunty",
            text: {
                en: 'People may call an older woman "Aunty" and an older man "Uncle". It is polite, even if you are not family.',
                bn: 'এখানে বয়স্ক নারীকে "Aunty" আর বয়স্ক পুরুষকে "Uncle" বলা হয়। আত্মীয় না হলেও এটা ভদ্রতা।',
                ta: 'இங்கே வயதான பெண்ணை "Aunty" என்றும் வயதான ஆணை "Uncle" என்றும் அழைப்பார்கள். உறவினர் இல்லாவிட்டாலும் இது மரியாதை.',
                hi: 'यहाँ बड़ी उम्र की महिला को "Aunty" और बड़ी उम्र के पुरुष को "Uncle" कहते हैं। रिश्तेदार न हों तब भी यह आदर की बात है।',
            },
            reviewed: false,
        },
        {
            id: "note-mp-private",
            text: {
                en: "You do not have to answer every question. If someone asks about your pay or your family and you do not want to say, you can smile and change the topic.",
                bn: "সব প্রশ্নের উত্তর দিতেই হবে এমন নয়। কেউ আপনার বেতন বা পরিবার নিয়ে জিজ্ঞাসা করলে বলতে না চাইলে হেসে অন্য কথায় যেতে পারেন।",
                ta: "எல்லாக் கேள்விகளுக்கும் பதில் சொல்ல வேண்டியதில்லை. உங்கள் சம்பளம் அல்லது குடும்பம் பற்றி யாராவது கேட்டு, சொல்ல விரும்பாவிட்டால் சிரித்துவிட்டு வேறு பேச்சுக்குச் செல்லலாம்.",
                hi: "हर सवाल का जवाब देना ज़रूरी नहीं। कोई आपकी तनख़्वाह या परिवार के बारे में पूछे और आप बताना न चाहें, तो मुस्कुराकर बात बदल सकते हैं।",
            },
            reviewed: false,
        },
        {
            id: "note-mp-practice",
            text: {
                en: "The best way to learn is to talk. Say hello to one new person on your day off.",
                bn: "শেখার সবচেয়ে ভালো উপায় কথা বলা। ছুটির দিনে একজন নতুন মানুষকে হ্যালো বলুন।",
                ta: "கற்றுக்கொள்ள சிறந்த வழி பேசுவதுதான். உங்கள் விடுமுறை நாளில் ஒரு புதியவரிடம் வணக்கம் சொல்லுங்கள்.",
                hi: "सीखने का सबसे अच्छा तरीका है बात करना। छुट्टी के दिन किसी एक नए व्यक्ति को नमस्ते कहें।",
            },
            reviewed: false,
        },
    ],

    vocab: [
        {
            id: "v-name",
            term: "name",
            meaning: {
                en: "what people call you",
                bn: "নাম, যে নামে আপনাকে ডাকা হয়",
                ta: "பெயர், உங்களை அழைக்கும் சொல்",
                hi: "नाम, जिससे लोग आपको बुलाते हैं",
            },
            picture: "nameTag",
            reviewed: false,
        },
        {
            id: "v-country",
            term: "country",
            meaning: {
                en: "a place like India or Bangladesh",
                bn: "দেশ, যেমন ভারত বা বাংলাদেশ",
                ta: "நாடு, இந்தியா அல்லது பங்களாதேஷ் போல",
                hi: "देश, जैसे भारत या बांग्लादेश",
            },
            picture: "country",
            reviewed: false,
        },
        {
            id: "v-family",
            term: "family",
            meaning: {
                en: "your parents, husband or wife, and children",
                bn: "বাবা-মা, স্বামী বা স্ত্রী আর সন্তান",
                ta: "பெற்றோர், கணவன் அல்லது மனைவி, பிள்ளைகள்",
                hi: "माता-पिता, पति या पत्नी और बच्चे",
            },
            picture: "family",
            reviewed: false,
        },
        {
            id: "v-children",
            term: "children",
            meaning: {
                en: "young boys and girls; sons and daughters",
                bn: "ছেলেমেয়ে, সন্তান",
                ta: "பிள்ளைகள், குழந்தைகள்",
                hi: "बच्चे, बेटे और बेटियाँ",
            },
            picture: "children",
            reviewed: false,
        },
        {
            id: "v-friend",
            term: "friend",
            meaning: {
                en: "someone you like and spend time with",
                bn: "বন্ধু, যাঁর সঙ্গে সময় কাটাতে ভালো লাগে",
                ta: "நண்பர், நீங்கள் விரும்பி நேரம் செலவிடுபவர்",
                hi: "दोस्त, जिसके साथ समय बिताना अच्छा लगे",
            },
            picture: "friend",
            reviewed: false,
        },
        {
            id: "v-job",
            term: "job",
            meaning: {
                en: "the work you do for money",
                bn: "চাকরি, টাকার জন্য যে কাজ করেন",
                ta: "வேலை, பணத்துக்காகச் செய்யும் பணி",
                hi: "नौकरी, पैसों के लिए किया जाने वाला काम",
            },
            picture: "job",
            reviewed: false,
        },
        {
            id: "v-hobby",
            term: "hobby",
            meaning: {
                en: "something you like to do in your free time",
                bn: "অবসরে যা করতে ভালো লাগে",
                ta: "ஓய்வு நேரத்தில் விரும்பிச் செய்வது",
                hi: "खाली समय में जो करना अच्छा लगे",
            },
            picture: "hobby",
            reviewed: false,
        },
        {
            id: "v-sunday",
            term: "Sunday",
            meaning: {
                en: "the day after Saturday; many workers rest",
                bn: "রবিবার, অনেক কর্মীর ছুটির দিন",
                ta: "ஞாயிற்றுக்கிழமை, பல தொழிலாளர்களின் விடுமுறை நாள்",
                hi: "रविवार, कई कामगारों की छुट्टी का दिन",
            },
            picture: "sunday",
            reviewed: false,
        },
    ],

    phrases: [
        {
            id: "p-mp-name",
            text: "What is your name?",
            meaning: {
                en: "Asking someone's name.",
                bn: "আপনার নাম কী?",
                ta: "உங்கள் பெயர் என்ன?",
                hi: "आपका नाम क्या है?",
            },
            reviewed: false,
        },
        {
            id: "p-mp-my-name",
            text: "My name is Ravi.",
            meaning: {
                en: "Telling someone your name.",
                bn: "আমার নাম রবি।",
                ta: "என் பெயர் ரவி.",
                hi: "मेरा नाम रवि है।",
            },
            reviewed: false,
        },
        {
            id: "p-mp-from",
            text: "Where are you from?",
            meaning: {
                en: "Asking which country someone comes from.",
                bn: "আপনি কোথা থেকে এসেছেন?",
                ta: "நீங்கள் எந்த ஊரிலிருந்து வருகிறீர்கள்?",
                hi: "आप कहाँ से हैं?",
            },
            reviewed: false,
        },
        {
            id: "p-mp-job",
            text: "What is your job?",
            meaning: {
                en: "Asking what work someone does.",
                bn: "আপনি কী কাজ করেন?",
                ta: "உங்கள் வேலை என்ன?",
                hi: "आप क्या काम करते हैं?",
            },
            reviewed: false,
        },
        {
            id: "p-mp-nice",
            text: "Nice to meet you.",
            meaning: {
                en: "Saying you are happy to meet someone new.",
                bn: "আপনার সঙ্গে দেখা হয়ে ভালো লাগল।",
                ta: "உங்களைச் சந்தித்ததில் மகிழ்ச்சி.",
                hi: "आपसे मिलकर अच्छा लगा।",
            },
            reviewed: false,
        },
        {
            id: "p-mp-sunday",
            text: "Where do you go on Sunday?",
            meaning: {
                en: "Asking about someone's day off.",
                bn: "রবিবারে আপনি কোথায় যান?",
                ta: "ஞாயிற்றுக்கிழமை எங்கே போவீர்கள்?",
                hi: "आप रविवार को कहाँ जाते हैं?",
            },
            reviewed: false,
        },
    ],

    exercises: [
        {
            id: "mp-0-picture",
            type: "selectPicture",
            instruction: {
                en: "Which one is this?",
                bn: "এটি কোনটি?",
                ta: "இது எது?",
                hi: "यह कौन-सा है?",
            },
            practises: ["v-family"],
            vocabId: "v-family",
            choiceVocabIds: ["v-family", "v-job", "v-hobby"],
            grading: { mode: "choice" },
        },
        {
            id: "mp-1-pairs",
            type: "matchPairs",
            instruction: {
                en: "Tap the pairs",
                bn: "জোড়া মেলান",
                ta: "ஜோடிகளைத் தட்டுங்கள்",
                hi: "जोड़ी मिलाएँ",
            },
            practises: ["v-name", "v-country", "v-friend", "v-hobby"],
            vocabIds: ["v-name", "v-country", "v-friend", "v-hobby"],
            grading: { mode: "pairs" },
        },
        {
            id: "mp-2-listen",
            type: "listenChooseMeaning",
            instruction: {
                en: "Listen. What does it mean?",
                bn: "শুনুন। এর মানে কী?",
                ta: "கேளுங்கள். இதன் பொருள் என்ன?",
                hi: "सुनिए। इसका मतलब क्या है?",
            },
            practises: ["v-job"],
            audioText: "job",
            choices: [
                { id: "c-correct", vocabId: "v-job" },
                { id: "c-wrong-1", vocabId: "v-children" },
                { id: "c-wrong-2", vocabId: "v-sunday" },
            ],
            correctChoiceId: "c-correct",
            grading: { mode: "choice" },
        },
        {
            id: "mp-3-picture-word",
            type: "pictureToWord",
            instruction: {
                en: "What is this called?",
                bn: "এটাকে কী বলে?",
                ta: "இதை என்ன என்று சொல்வார்கள்?",
                hi: "इसे क्या कहते हैं?",
            },
            practises: ["v-friend"],
            vocabId: "v-friend",
            choiceVocabIds: ["v-friend", "v-country", "v-name"],
            grading: { mode: "choice" },
        },
        {
            id: "mp-4-arrange",
            type: "arrangeWords",
            instruction: {
                en: "Put the words in order",
                bn: "শব্দগুলো সাজান",
                ta: "சொற்களை வரிசைப்படுத்துங்கள்",
                hi: "शब्दों को क्रम में लगाएँ",
            },
            practises: ["v-name"],
            phraseId: "p-mp-name",
            tokens: ["What", "is", "your", "name"],
            grading: { mode: "keywords", keywords: ["name"] },
        },
        {
            id: "mp-5-dialogue",
            type: "dialogueChoice",
            instruction: {
                en: "What do you say?",
                bn: "আপনি কী বলবেন?",
                ta: "நீங்கள் என்ன சொல்வீர்கள்?",
                hi: "आप क्या कहेंगे?",
            },
            practises: ["v-name"],
            situation: {
                en: "You meet someone new at the park on your day off.",
                bn: "ছুটির দিনে পার্কে একজন নতুন মানুষের সঙ্গে দেখা হলো।",
                ta: "உங்கள் விடுமுறை நாளில் பூங்காவில் ஒரு புதியவரைச் சந்திக்கிறீர்கள்.",
                hi: "छुट्टी के दिन पार्क में आपकी मुलाक़ात एक नए व्यक्ति से होती है।",
            },
            line: "Hello! What is your name?",
            lineMeaning: {
                en: "The new person asks your name.",
                bn: "নতুন মানুষটি আপনার নাম জিজ্ঞাসা করছেন।",
                ta: "புதியவர் உங்கள் பெயரைக் கேட்கிறார்.",
                hi: "नया व्यक्ति आपका नाम पूछ रहा है।",
            },
            phraseId: "p-mp-my-name",
            distractors: [
                { id: "d-from", phraseId: "p-mp-from" },
                { id: "d-sunday", phraseId: "p-mp-sunday" },
            ],
            grading: { mode: "choice" },
        },
        {
            id: "mp-6-listen-arrange",
            type: "listenArrangeWords",
            instruction: {
                en: "Listen. Tap what you hear",
                bn: "শুনুন। যা শুনলেন তা সাজান",
                ta: "கேளுங்கள். கேட்டதைத் தட்டுங்கள்",
                hi: "सुनिए। जो सुना, उसे लगाइए",
            },
            practises: ["v-country"],
            phraseId: "p-mp-from",
            tokens: ["Where", "are", "you", "from", "name", "job"],
            grading: { mode: "keywords", keywords: ["where", "from"] },
        },
        {
            id: "mp-7-dialogue-nice",
            type: "dialogueChoice",
            instruction: {
                en: "What do you say?",
                bn: "আপনি কী বলবেন?",
                ta: "நீங்கள் என்ன சொல்வீர்கள்?",
                hi: "आप क्या कहेंगे?",
            },
            practises: ["v-friend"],
            situation: {
                en: "Your friend brings a new person to meet you.",
                bn: "আপনার বন্ধু একজন নতুন মানুষকে আপনার সঙ্গে পরিচয় করাতে আনলেন।",
                ta: "உங்கள் நண்பர் ஒரு புதியவரை உங்களுக்கு அறிமுகப்படுத்த அழைத்து வருகிறார்.",
                hi: "आपका दोस्त एक नए व्यक्ति को आपसे मिलवाने लाता है।",
            },
            line: "Hi, my name is Anna.",
            lineMeaning: {
                en: "The new person tells you her name.",
                bn: "নতুন মানুষটি তাঁর নাম বলছেন।",
                ta: "புதியவர் தன் பெயரைச் சொல்கிறார்.",
                hi: "वह अपना नाम बता रही है।",
            },
            phraseId: "p-mp-nice",
            distractors: [
                { id: "d-name", phraseId: "p-mp-name" },
                { id: "d-sunday", phraseId: "p-mp-sunday" },
            ],
            grading: { mode: "choice" },
        },
        {
            id: "mp-8-translate",
            type: "translateWordBank",
            instruction: {
                en: "Say this in English",
                bn: "এটি ইংরেজিতে বলুন",
                ta: "இதை ஆங்கிலத்தில் சொல்லுங்கள்",
                hi: "इसे अंग्रेज़ी में कहिए",
            },
            practises: ["v-job"],
            prompt: {
                en: "What is your job?",
                bn: "আপনি কী কাজ করেন?",
                ta: "உங்கள் வேலை என்ன?",
                hi: "आप क्या काम करते हैं?",
            },
            phraseId: "p-mp-job",
            tokens: ["What", "is", "your", "job", "Sunday", "friend"],
            grading: { mode: "keywords", keywords: ["job"] },
        },
        {
            id: "mp-9-arrange-sunday",
            type: "arrangeWords",
            instruction: {
                en: "Put the words in order",
                bn: "শব্দগুলো সাজান",
                ta: "சொற்களை வரிசைப்படுத்துங்கள்",
                hi: "शब्दों को क्रम में लगाएँ",
            },
            practises: ["v-sunday"],
            phraseId: "p-mp-sunday",
            tokens: ["Where", "do", "you", "go", "on", "Sunday"],
            grading: { mode: "keywords", keywords: ["where", "Sunday"] },
        },
        {
            id: "mp-10-fill",
            type: "fillBlank",
            instruction: {
                en: "Fill in the missing word",
                bn: "খালি জায়গায় শব্দ বসান",
                ta: "விடுபட்ட சொல்லை நிரப்புங்கள்",
                hi: "छूटा हुआ शब्द भरें",
            },
            practises: ["v-family"],
            sentence: ["I call my", null, "on Sunday."],
            choices: [
                { id: "f-family", label: "family" },
                { id: "f-hobby", label: "hobby" },
                { id: "f-country", label: "country" },
            ],
            correctChoiceId: "f-family",
            grading: { mode: "choice" },
        },
    ],

    speaking: {
        scene: "The learner is relaxing at a park in Singapore on their day off and meets you for the first time. You are another migrant worker: warm, curious and happy to chat with someone who speaks little English.",
        names: [],
        goals: [
            { id: "say-mp-name", phraseId: "p-mp-name", keywords: ["name"] },
            { id: "say-mp-from", phraseId: "p-mp-from", keywords: ["where", "from"] },
            { id: "say-mp-job", phraseId: "p-mp-job", keywords: ["job"] },
            { id: "say-mp-nice", phraseId: "p-mp-nice", keywords: ["nice", "meet"] },
        ],
    },
};
