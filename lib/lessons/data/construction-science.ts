/**
 * Lesson: "Construction science".
 *
 * Why a building stays up, in the words a worker hears on site: what concrete and
 * steel each do, how the weight travels down, and why too much water or too heavy
 * a load is dangerous. The sentences are the warnings that follow from the science.
 *
 * Every Bengali, Tamil and Hindi string is `reviewed: false` and must be
 * checked by a native speaker before real learners see it.
 */

import type { Lesson } from "../types";

export const constructionScience: Lesson = {
    id: "construction-science",
    title: {
        en: "Construction science",
        bn: "নির্মাণের বিজ্ঞান",
        ta: "கட்டுமான அறிவியல்",
        hi: "निर्माण का विज्ञान",
    },
    goal: {
        en: "Learn the main building materials, why a building stays up, and how to warn others about a problem.",
        bn: "নির্মাণের প্রধান উপকরণ জানা, ভবন কেন দাঁড়িয়ে থাকে বোঝা, আর সমস্যা হলে অন্যদের সাবধান করা।",
        ta: "முக்கியக் கட்டுமானப் பொருட்களை அறிவது, கட்டடம் ஏன் நிற்கிறது என்று புரிந்துகொள்வது, பிரச்சினை இருந்தால் மற்றவர்களை எச்சரிப்பது.",
        hi: "निर्माण की मुख्य चीज़ें जानना, इमारत क्यों खड़ी रहती है समझना, और दिक़्क़त हो तो दूसरों को सावधान करना।",
    },
    icon: "build",
    level: "beginner",
    estimatedMinutes: 6,

    notes: [
        {
            id: "note-cs-steel",
            text: {
                en: "Concrete is strong when it is pressed, but it cracks when it is pulled. That is why steel bars go inside it.",
                bn: "চাপ দিলে কংক্রিট শক্ত থাকে, কিন্তু টান লাগলে ফেটে যায়। তাই ভেতরে স্টিলের রড দেওয়া হয়।",
                ta: "அழுத்தும்போது கான்கிரீட் உறுதியாக இருக்கும், ஆனால் இழுக்கும்போது விரிசல் விடும். அதனால்தான் உள்ளே எஃகுக் கம்பிகள் வைக்கப்படுகின்றன.",
                hi: "दबाव पड़ने पर कंक्रीट मज़बूत रहता है, पर खिंचाव से चटक जाता है। इसीलिए उसके अंदर स्टील की छड़ें डाली जाती हैं।",
            },
            reviewed: false,
        },
        {
            id: "note-cs-water",
            text: {
                en: "Too much water makes concrete weak. Use only the amount of water your supervisor tells you.",
                bn: "বেশি পানি কংক্রিটকে দুর্বল করে। সুপারভাইজার যতটা বলেন, ততটাই পানি দিন।",
                ta: "அதிகத் தண்ணீர் கான்கிரீட்டை பலவீனமாக்கும். மேற்பார்வையாளர் சொல்லும் அளவு தண்ணீர் மட்டும் பயன்படுத்துங்கள்.",
                hi: "ज़्यादा पानी कंक्रीट को कमज़ोर करता है। उतना ही पानी डालें जितना सुपरवाइज़र कहे।",
            },
            reviewed: false,
        },
        {
            id: "note-cs-cure",
            text: {
                en: "Concrete goes hard slowly. It takes about 28 days to reach full strength, so ask your supervisor before you put weight on it.",
                bn: "কংক্রিট ধীরে ধীরে শক্ত হয়। পুরো শক্তি পেতে প্রায় ২৮ দিন লাগে, তাই ওপরে ওজন দেওয়ার আগে সুপারভাইজারকে জিজ্ঞাসা করুন।",
                ta: "கான்கிரீட் மெதுவாகவே கெட்டியாகும். முழு வலிமை பெற சுமார் 28 நாட்கள் ஆகும், எனவே அதன் மேல் எடை வைக்கும் முன் மேற்பார்வையாளரைக் கேளுங்கள்.",
                hi: "कंक्रीट धीरे-धीरे सख़्त होता है। पूरी मज़बूती आने में लगभग 28 दिन लगते हैं, इसलिए उस पर वज़न रखने से पहले सुपरवाइज़र से पूछें।",
            },
            reviewed: false,
        },
        {
            id: "note-cs-load",
            text: {
                en: "A building carries its weight down: from the floor to the beams, to the columns, then into the ground. Never cut a beam or a column without permission.",
                bn: "ভবনের ওজন নিচে নামে: মেঝে থেকে বিমে, বিম থেকে কলামে, তারপর মাটিতে। অনুমতি ছাড়া কখনও বিম বা কলাম কাটবেন না।",
                ta: "கட்டடத்தின் எடை கீழே செல்கிறது: தளத்திலிருந்து உத்தரத்துக்கு, தூணுக்கு, பிறகு தரைக்கு. அனுமதி இல்லாமல் உத்தரத்தையோ தூணையோ ஒருபோதும் வெட்டாதீர்கள்.",
                hi: "इमारत का वज़न नीचे जाता है: फ़र्श से बीम में, बीम से कॉलम में, फिर ज़मीन में। बिना इजाज़त कभी बीम या कॉलम न काटें।",
            },
            reviewed: false,
        },
        {
            id: "note-cs-scaffold",
            text: {
                en: "Every scaffold has a weight limit. Too much weight can make it fall, so do not add more than you are told.",
                bn: "প্রতিটি মাচার ওজনের সীমা আছে। বেশি ওজনে এটি ভেঙে পড়তে পারে, তাই যতটা বলা হয়েছে তার বেশি রাখবেন না।",
                ta: "ஒவ்வொரு சாரத்துக்கும் எடை வரம்பு உண்டு. அதிக எடையால் அது விழலாம், எனவே சொன்னதை விட அதிகம் வைக்காதீர்கள்.",
                hi: "हर मचान के वज़न की एक सीमा होती है। ज़्यादा वज़न से वह गिर सकता है, इसलिए बताए गए से ज़्यादा न रखें।",
            },
            reviewed: false,
        },
    ],

    vocab: [
        {
            id: "v-concrete",
            term: "concrete",
            meaning: {
                en: "cement, sand, stones and water mixed; it goes hard",
                bn: "সিমেন্ট, বালি, পাথর আর পানির মিশ্রণ, যা শক্ত হয়",
                ta: "சிமெண்ட், மணல், கல், தண்ணீர் கலவை; அது கெட்டியாகும்",
                hi: "सीमेंट, रेत, पत्थर और पानी का मिश्रण, जो सख़्त हो जाता है",
            },
            picture: "concrete",
            reviewed: false,
        },
        {
            id: "v-cement",
            term: "cement",
            meaning: {
                en: "the grey powder that holds concrete together",
                bn: "ধূসর গুঁড়া, যা কংক্রিটকে জোড়া রাখে",
                ta: "கான்கிரீட்டைப் பிணைக்கும் சாம்பல் நிறப் பொடி",
                hi: "सलेटी पाउडर, जो कंक्रीट को जोड़े रखता है",
            },
            picture: "cement",
            reviewed: false,
        },
        {
            id: "v-steel-bar",
            term: "steel bar",
            meaning: {
                en: "a long metal rod inside concrete",
                bn: "কংক্রিটের ভেতরের লম্বা লোহার রড",
                ta: "கான்கிரீட்டுக்குள் இருக்கும் நீண்ட எஃகுக் கம்பி",
                hi: "कंक्रीट के अंदर की लंबी लोहे की छड़",
            },
            picture: "steelBar",
            reviewed: false,
        },
        {
            id: "v-beam",
            term: "beam",
            meaning: {
                en: "a strong part that goes across and holds up a floor",
                bn: "আড়াআড়ি শক্ত অংশ, যা মেঝে ধরে রাখে",
                ta: "தளத்தைத் தாங்கும் குறுக்கு உத்தரம்",
                hi: "आड़ा मज़बूत हिस्सा, जो फ़र्श को थामता है",
            },
            picture: "beam",
            reviewed: false,
        },
        {
            id: "v-column",
            term: "column",
            meaning: {
                en: "a strong part that stands up and carries the weight",
                bn: "খাড়া শক্ত অংশ, যা ওজন বহন করে",
                ta: "எடையைத் தாங்கும் நேரான தூண்",
                hi: "खड़ा मज़बूत हिस्सा, जो वज़न उठाता है",
            },
            picture: "column",
            reviewed: false,
        },
        {
            id: "v-load",
            term: "load",
            meaning: {
                en: "the weight something must carry",
                bn: "বোঝা, যে ওজন বহন করতে হয়",
                ta: "சுமை, தாங்க வேண்டிய எடை",
                hi: "बोझ, जो वज़न उठाना होता है",
            },
            picture: "load",
            reviewed: false,
        },
        {
            id: "v-level",
            term: "level",
            meaning: {
                en: "a tool that shows if something is flat",
                bn: "কিছু সমান কি না দেখার যন্ত্র",
                ta: "ஒன்று சமமாக உள்ளதா என்று காட்டும் கருவி",
                hi: "चीज़ समतल है या नहीं, यह दिखाने वाला औज़ार",
            },
            picture: "level",
            reviewed: false,
        },
        {
            id: "v-scaffold",
            term: "scaffold",
            meaning: {
                en: "a metal frame you stand on to work up high",
                bn: "উঁচুতে কাজের জন্য ধাতুর মাচা",
                ta: "உயரத்தில் வேலை செய்ய உதவும் உலோகச் சாரம்",
                hi: "ऊँचाई पर काम के लिए धातु का मचान",
            },
            picture: "scaffold",
            reviewed: false,
        },
    ],

    phrases: [
        {
            id: "p-cs-wet",
            text: "The concrete is still wet.",
            meaning: {
                en: "Warning that the concrete is not hard yet.",
                bn: "কংক্রিট এখনও ভেজা।",
                ta: "கான்கிரீட் இன்னும் ஈரமாக உள்ளது.",
                hi: "कंक्रीट अभी गीला है।",
            },
            reviewed: false,
        },
        {
            id: "p-cs-heavy",
            text: "This load is too heavy.",
            meaning: {
                en: "Saying that something weighs too much.",
                bn: "এই বোঝাটা খুব ভারী।",
                ta: "இந்தச் சுமை மிகவும் கனமாக உள்ளது.",
                hi: "यह बोझ बहुत भारी है।",
            },
            reviewed: false,
        },
        {
            id: "p-cs-water",
            text: "Do not add more water.",
            meaning: {
                en: "Telling someone to stop adding water to the mix.",
                bn: "আর পানি দেবেন না।",
                ta: "இன்னும் தண்ணீர் சேர்க்காதீர்கள்.",
                hi: "और पानी मत डालिए।",
            },
            reviewed: false,
        },
        {
            id: "p-cs-crack",
            text: "There is a crack in this column.",
            meaning: {
                en: "Reporting a crack to your supervisor.",
                bn: "এই কলামে একটা ফাটল আছে।",
                ta: "இந்தத் தூணில் ஒரு விரிசல் உள்ளது.",
                hi: "इस कॉलम में दरार है।",
            },
            reviewed: false,
        },
        {
            id: "p-cs-check",
            text: "Please check the scaffold.",
            meaning: {
                en: "Asking someone to make sure the scaffold is safe.",
                bn: "দয়া করে মাচাটা পরীক্ষা করুন।",
                ta: "தயவுசெய்து சாரத்தைச் சரிபாருங்கள்.",
                hi: "कृपया मचान की जाँच कीजिए।",
            },
            reviewed: false,
        },
    ],

    exercises: [
        {
            id: "cs-0-picture",
            type: "selectPicture",
            instruction: {
                en: "Which one is this?",
                bn: "এটি কোনটি?",
                ta: "இது எது?",
                hi: "यह कौन-सा है?",
            },
            practises: ["v-scaffold"],
            vocabId: "v-scaffold",
            choiceVocabIds: ["v-scaffold", "v-column", "v-level"],
            grading: { mode: "choice" },
        },
        {
            id: "cs-1-pairs",
            type: "matchPairs",
            instruction: {
                en: "Tap the pairs",
                bn: "জোড়া মেলান",
                ta: "ஜோடிகளைத் தட்டுங்கள்",
                hi: "जोड़ी मिलाएँ",
            },
            practises: ["v-concrete", "v-cement", "v-beam", "v-load"],
            vocabIds: ["v-concrete", "v-cement", "v-beam", "v-load"],
            grading: { mode: "pairs" },
        },
        {
            id: "cs-2-listen",
            type: "listenChooseMeaning",
            instruction: {
                en: "Listen. What does it mean?",
                bn: "শুনুন। এর মানে কী?",
                ta: "கேளுங்கள். இதன் பொருள் என்ன?",
                hi: "सुनिए। इसका मतलब क्या है?",
            },
            practises: ["v-column"],
            audioText: "column",
            choices: [
                { id: "c-correct", vocabId: "v-column" },
                { id: "c-wrong-1", vocabId: "v-cement" },
                { id: "c-wrong-2", vocabId: "v-level" },
            ],
            correctChoiceId: "c-correct",
            grading: { mode: "choice" },
        },
        {
            id: "cs-3-picture-word",
            type: "pictureToWord",
            instruction: {
                en: "What is this called?",
                bn: "এটাকে কী বলে?",
                ta: "இதை என்ன என்று சொல்வார்கள்?",
                hi: "इसे क्या कहते हैं?",
            },
            practises: ["v-steel-bar"],
            vocabId: "v-steel-bar",
            choiceVocabIds: ["v-steel-bar", "v-load", "v-beam"],
            grading: { mode: "choice" },
        },
        {
            id: "cs-4-arrange",
            type: "arrangeWords",
            instruction: {
                en: "Put the words in order",
                bn: "শব্দগুলো সাজান",
                ta: "சொற்களை வரிசைப்படுத்துங்கள்",
                hi: "शब्दों को क्रम में लगाएँ",
            },
            practises: ["v-concrete"],
            phraseId: "p-cs-wet",
            tokens: ["The", "concrete", "is", "still", "wet"],
            grading: { mode: "keywords", keywords: ["concrete", "wet"] },
        },
        {
            id: "cs-5-dialogue",
            type: "dialogueChoice",
            instruction: {
                en: "What do you say?",
                bn: "আপনি কী বলবেন?",
                ta: "நீங்கள் என்ன சொல்வீர்கள்?",
                hi: "आप क्या कहेंगे?",
            },
            practises: ["v-concrete"],
            situation: {
                en: "A worker is about to walk on the floor you poured this morning.",
                bn: "আজ সকালে আপনি যে মেঝে ঢালাই করেছেন, একজন কর্মী তার ওপর দিয়ে হাঁটতে যাচ্ছেন।",
                ta: "இன்று காலை நீங்கள் போட்ட தரையின் மேல் ஒரு தொழிலாளி நடக்கப் போகிறார்.",
                hi: "आज सुबह आपने जो फ़र्श डाला था, एक मज़दूर उस पर चलने वाला है।",
            },
            line: "Can I walk here?",
            lineMeaning: {
                en: "The worker asks if he can walk here.",
                bn: "কর্মীটি জিজ্ঞাসা করছেন এখানে হাঁটা যাবে কি না।",
                ta: "இங்கே நடக்கலாமா என்று தொழிலாளி கேட்கிறார்.",
                hi: "मज़दूर पूछ रहा है कि क्या वह यहाँ चल सकता है।",
            },
            phraseId: "p-cs-wet",
            distractors: [
                { id: "d-check", phraseId: "p-cs-check" },
                { id: "d-water", phraseId: "p-cs-water" },
            ],
            grading: { mode: "choice" },
        },
        {
            id: "cs-6-listen-arrange",
            type: "listenArrangeWords",
            instruction: {
                en: "Listen. Tap what you hear",
                bn: "শুনুন। যা শুনলেন তা সাজান",
                ta: "கேளுங்கள். கேட்டதைத் தட்டுங்கள்",
                hi: "सुनिए। जो सुना, उसे लगाइए",
            },
            practises: ["v-load"],
            phraseId: "p-cs-heavy",
            tokens: ["This", "load", "is", "too", "heavy", "cement", "level"],
            grading: { mode: "keywords", keywords: ["load", "heavy"] },
        },
        {
            id: "cs-7-dialogue-water",
            type: "dialogueChoice",
            instruction: {
                en: "What do you say?",
                bn: "আপনি কী বলবেন?",
                ta: "நீங்கள் என்ன சொல்வீர்கள்?",
                hi: "आप क्या कहेंगे?",
            },
            practises: ["v-cement"],
            situation: {
                en: "Your co-worker is mixing concrete and keeps pouring in water.",
                bn: "আপনার সহকর্মী কংক্রিট মেশাচ্ছেন আর পানি ঢেলেই যাচ্ছেন।",
                ta: "உங்கள் சக தொழிலாளி கான்கிரீட் கலக்கிறார், தொடர்ந்து தண்ணீர் ஊற்றுகிறார்.",
                hi: "आपका साथी कंक्रीट मिला रहा है और पानी डालता जा रहा है।",
            },
            line: "I think it needs more water.",
            lineMeaning: {
                en: "Your co-worker wants to add more water.",
                bn: "আপনার সহকর্মী আরও পানি দিতে চান।",
                ta: "உங்கள் சக தொழிலாளி இன்னும் தண்ணீர் சேர்க்க விரும்புகிறார்.",
                hi: "आपका साथी और पानी डालना चाहता है।",
            },
            phraseId: "p-cs-water",
            distractors: [
                { id: "d-heavy", phraseId: "p-cs-heavy" },
                { id: "d-check", phraseId: "p-cs-check" },
            ],
            grading: { mode: "choice" },
        },
        {
            id: "cs-8-translate",
            type: "translateWordBank",
            instruction: {
                en: "Say this in English",
                bn: "এটি ইংরেজিতে বলুন",
                ta: "இதை ஆங்கிலத்தில் சொல்லுங்கள்",
                hi: "इसे अंग्रेज़ी में कहिए",
            },
            practises: ["v-column"],
            prompt: {
                en: "There is a crack in this column.",
                bn: "এই কলামে একটা ফাটল আছে।",
                ta: "இந்தத் தூணில் ஒரு விரிசல் உள்ளது.",
                hi: "इस कॉलम में दरार है।",
            },
            phraseId: "p-cs-crack",
            tokens: ["There", "is", "a", "crack", "in", "this", "column", "beam", "cement"],
            grading: { mode: "keywords", keywords: ["crack", "column"] },
        },
        {
            id: "cs-9-arrange-check",
            type: "arrangeWords",
            instruction: {
                en: "Put the words in order",
                bn: "শব্দগুলো সাজান",
                ta: "சொற்களை வரிசைப்படுத்துங்கள்",
                hi: "शब्दों को क्रम में लगाएँ",
            },
            practises: ["v-scaffold"],
            phraseId: "p-cs-check",
            tokens: ["Please", "check", "the", "scaffold"],
            grading: { mode: "keywords", keywords: ["check", "scaffold"] },
        },
        {
            id: "cs-10-fill",
            type: "fillBlank",
            instruction: {
                en: "Fill in the missing word",
                bn: "খালি জায়গায় শব্দ বসান",
                ta: "விடுபட்ட சொல்லை நிரப்புங்கள்",
                hi: "छूटा हुआ शब्द भरें",
            },
            practises: ["v-level"],
            sentence: ["Use the", null, "to see if the wall is straight."],
            choices: [
                { id: "f-level", label: "level" },
                { id: "f-cement", label: "cement" },
                { id: "f-load", label: "load" },
            ],
            correctChoiceId: "f-level",
            grading: { mode: "choice" },
        },
    ],

    speaking: {
        scene: "The learner is at a construction worksite in Singapore, talking to their supervisor about the work. You are the supervisor: patient and kind, and you want the learner to be safe.",
        names: [],
        goals: [
            { id: "say-cs-wet", phraseId: "p-cs-wet", keywords: ["concrete", "wet"] },
            { id: "say-cs-heavy", phraseId: "p-cs-heavy", keywords: ["load", "heavy"] },
            { id: "say-cs-water", phraseId: "p-cs-water", keywords: ["water"] },
            { id: "say-cs-crack", phraseId: "p-cs-crack", keywords: ["crack", "column"] },
        ],
    },
};
