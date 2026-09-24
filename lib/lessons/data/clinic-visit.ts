/**
 * Lesson: "Seeing a doctor".
 *
 * Getting sick far from home is frightening, and the words for it are the ones
 * a worker needs most urgently and hears least often. The lesson stays with
 * what happens at a small clinic counter and in the doctor's room: saying what
 * is wrong, asking for an MC, and understanding how to take the medicine.
 *
 * Every Bengali, Tamil and Hindi string is `reviewed: false` and must be
 * checked by a native speaker before real learners see it.
 */

import type { Lesson } from "../types";

export const clinicVisit: Lesson = {
    id: "clinic-visit",
    title: {
        en: "Seeing a doctor",
        bn: "ডাক্তার দেখানো",
        ta: "மருத்துவரைப் பார்ப்பது",
        hi: "डॉक्टर को दिखाना",
    },
    goal: {
        en: "Say what is wrong, ask for an MC, and understand how to take your medicine.",
        bn: "কী সমস্যা তা বলা, এমসি চাওয়া, আর ওষুধ কীভাবে খাবেন তা বোঝা।",
        ta: "என்ன பிரச்சினை என்று சொல்வது, எம்சி கேட்பது, மருந்தை எப்படி எடுப்பது என்று புரிந்துகொள்வது.",
        hi: "क्या तकलीफ़ है यह बताना, एमसी माँगना, और दवा कैसे लेनी है यह समझना।",
    },
    icon: "clinic",
    level: "beginner",
    estimatedMinutes: 6,

    notes: [
        {
            id: "note-where",
            text: {
                en: "If you are sick, go to a clinic near your dormitory or a polyclinic. In an emergency, call 995 for an ambulance.",
                bn: "অসুস্থ হলে ডরমিটরির কাছের ক্লিনিক বা পলিক্লিনিকে যান। জরুরি অবস্থায় অ্যাম্বুলেন্সের জন্য 995 নম্বরে ফোন করুন।",
                ta: "உடல்நலம் சரியில்லை என்றால் தங்குமிடத்திற்கு அருகில் உள்ள கிளினிக் அல்லது பாலிகிளினிக்கிற்குச் செல்லுங்கள். அவசரநிலையில் ஆம்புலன்சிற்கு 995 அழையுங்கள்.",
                hi: "बीमार हों तो अपने डॉरमिटरी के पास के क्लिनिक या पॉलीक्लिनिक जाएँ। आपात स्थिति में एम्बुलेंस के लिए 995 पर फ़ोन करें।",
            },
            reviewed: false,
        },
        {
            id: "note-mc",
            text: {
                en: "Ask the doctor for an MC. Give it to your employer so your sick day is counted as sick leave.",
                bn: "ডাক্তারের কাছে এমসি চান। নিয়োগকর্তাকে দিন, যাতে অসুস্থতার দিনটি অসুস্থতার ছুটি হিসেবে গণ্য হয়।",
                ta: "மருத்துவரிடம் எம்சி கேளுங்கள். உங்கள் நோய் விடுப்பு கணக்கில் வர அதை முதலாளியிடம் கொடுங்கள்.",
                hi: "डॉक्टर से एमसी माँगें। उसे अपने मालिक को दें, ताकि बीमारी का दिन बीमारी की छुट्टी में गिना जाए।",
            },
            reviewed: false,
        },
        {
            id: "note-pay",
            text: {
                en: "Your employer must pay for your medical care. Keep every receipt.",
                bn: "আপনার চিকিৎসার খরচ নিয়োগকর্তাকেই দিতে হবে। সব রসিদ রেখে দিন।",
                ta: "உங்கள் மருத்துவச் செலவை முதலாளி தான் கொடுக்க வேண்டும். எல்லா ரசீதுகளையும் வைத்திருங்கள்.",
                hi: "आपके इलाज का खर्च मालिक को देना होता है। हर रसीद संभाल कर रखें।",
            },
            reviewed: false,
        },
        {
            id: "note-medicine",
            text: {
                en: "Take medicine the way the doctor says: how many times a day, and before or after food.",
                bn: "ডাক্তার যেভাবে বলেন সেভাবে ওষুধ খান: দিনে কতবার, আর খাবারের আগে না পরে।",
                ta: "மருத்துவர் சொன்னபடி மருந்தை எடுங்கள்: நாளுக்கு எத்தனை முறை, சாப்பாட்டிற்கு முன்பா பின்பா.",
                hi: "दवा वैसे ही लें जैसे डॉक्टर कहे: दिन में कितनी बार, और खाने से पहले या बाद में।",
            },
            reviewed: false,
        },
        {
            id: "note-help",
            text: {
                en: "If your employer does not let you see a doctor, call MOM at 6438 5122 or the Migrant Workers' Centre at 6536 2692.",
                bn: "নিয়োগকর্তা ডাক্তার দেখাতে না দিলে MOM-কে 6438 5122 নম্বরে বা Migrant Workers' Centre-কে 6536 2692 নম্বরে ফোন করুন।",
                ta: "முதலாளி மருத்துவரைப் பார்க்க விடவில்லை என்றால் MOM-ஐ 6438 5122 அல்லது Migrant Workers' Centre-ஐ 6536 2692 எண்ணில் அழையுங்கள்.",
                hi: "अगर मालिक डॉक्टर को दिखाने नहीं देता, तो MOM को 6438 5122 पर या Migrant Workers' Centre को 6536 2692 पर फ़ोन करें।",
            },
            reviewed: false,
        },
    ],

    vocab: [
        {
            id: "v-fever",
            term: "fever",
            meaning: {
                en: "your body is very hot",
                bn: "জ্বর; শরীর গরম",
                ta: "காய்ச்சல்; உடல் சூடாக இருப்பது",
                hi: "बुख़ार; शरीर गरम होना",
            },
            picture: "thermometer",
            reviewed: false,
        },
        {
            id: "v-pain",
            term: "pain",
            meaning: {
                en: "it hurts",
                bn: "ব্যথা",
                ta: "வலி",
                hi: "दर्द",
            },
            reviewed: false,
        },
        {
            id: "v-medicine",
            term: "medicine",
            meaning: {
                en: "what you take to get better",
                bn: "ওষুধ",
                ta: "மருந்து",
                hi: "दवा",
            },
            picture: "medicine",
            reviewed: false,
        },
        {
            id: "v-mc",
            term: "MC",
            meaning: {
                en: "a paper from the doctor that says you are sick",
                bn: "ডাক্তারের দেওয়া কাগজ, যাতে লেখা থাকে আপনি অসুস্থ",
                ta: "நீங்கள் நோயாளி என்று மருத்துவர் கொடுக்கும் காகிதம்",
                hi: "डॉक्टर का काग़ज़ जिसमें लिखा हो कि आप बीमार हैं",
            },
            picture: "document",
            reviewed: false,
        },
        {
            id: "v-appointment",
            term: "appointment",
            meaning: {
                en: "a fixed time to see the doctor",
                bn: "ডাক্তার দেখানোর নির্দিষ্ট সময়",
                ta: "மருத்துவரைப் பார்க்க நிச்சயித்த நேரம்",
                hi: "डॉक्टर से मिलने का तय समय",
            },
            picture: "appointment",
            reviewed: false,
        },
        {
            id: "v-clinic",
            term: "clinic",
            meaning: {
                en: "a small place where a doctor sees you",
                bn: "ছোট জায়গা যেখানে ডাক্তার আপনাকে দেখেন",
                ta: "மருத்துவர் உங்களைப் பார்க்கும் சிறிய இடம்",
                hi: "छोटी जगह जहाँ डॉक्टर आपको देखता है",
            },
            picture: "clinic",
            reviewed: false,
        },
        {
            id: "v-rest",
            term: "rest",
            meaning: {
                en: "stay home and sleep",
                bn: "বিশ্রাম; বাড়িতে থেকে ঘুমানো",
                ta: "ஓய்வு; வீட்டில் இருந்து தூங்குவது",
                hi: "आराम; घर पर रहकर सोना",
            },
            picture: "bed",
            reviewed: false,
        },
        {
            id: "v-cough",
            term: "cough",
            meaning: {
                en: "when air comes out of your mouth with a loud sound",
                bn: "কাশি",
                ta: "இருமல்",
                hi: "खाँसी",
            },
            reviewed: false,
        },
    ],

    phrases: [
        {
            id: "p-have-fever",
            text: "I have a fever.",
            meaning: {
                en: "Telling the doctor your body is hot.",
                bn: "আমার জ্বর হয়েছে।",
                ta: "எனக்குக் காய்ச்சல்.",
                hi: "मुझे बुख़ार है।",
            },
            reviewed: false,
        },
        {
            id: "p-pain-here",
            text: "I have pain here.",
            meaning: {
                en: "Pointing to where it hurts.",
                bn: "এখানে আমার ব্যথা। (ব্যথার জায়গা দেখিয়ে)",
                ta: "இங்கே எனக்கு வலி. (வலிக்கும் இடத்தைக் காட்டி)",
                hi: "मुझे यहाँ दर्द है। (दर्द की जगह दिखाते हुए)",
            },
            reviewed: false,
        },
        {
            id: "p-need-mc",
            text: "Can I have an MC?",
            meaning: {
                en: "Asking the doctor for a sick-leave paper.",
                bn: "ডাক্তারের কাছে অসুস্থতার ছুটির কাগজ চাওয়া।",
                ta: "மருத்துவரிடம் நோய் விடுப்புக் காகிதம் கேட்பது.",
                hi: "डॉक्टर से बीमारी की छुट्टी का काग़ज़ माँगना।",
            },
            reviewed: false,
        },
        {
            id: "p-how-many-times",
            text: "How many times a day?",
            meaning: {
                en: "Asking how often to take the medicine.",
                bn: "দিনে কতবার ওষুধ খেতে হবে, তা জিজ্ঞাসা করা।",
                ta: "மருந்தை நாளுக்கு எத்தனை முறை எடுக்க வேண்டும் என்று கேட்பது.",
                hi: "दिन में कितनी बार दवा लेनी है, यह पूछना।",
            },
            reviewed: false,
        },
    ],

    exercises: [
        {
            id: "cl-0-picture",
            type: "selectPicture",
            instruction: {
                en: "Which one is this?",
                bn: "এটি কোনটি?",
                ta: "இது எது?",
                hi: "यह कौन-सा है?",
            },
            practises: ["v-fever"],
            vocabId: "v-fever",
            choiceVocabIds: ["v-fever", "v-medicine", "v-clinic"],
            grading: { mode: "choice" },
        },
        {
            id: "cl-1-pairs",
            type: "matchPairs",
            instruction: {
                en: "Tap the pairs",
                bn: "জোড়া মেলান",
                ta: "ஜோடிகளைத் தட்டுங்கள்",
                hi: "जोड़ी मिलाएँ",
            },
            practises: ["v-fever", "v-medicine", "v-mc", "v-rest"],
            vocabIds: ["v-fever", "v-medicine", "v-mc", "v-rest"],
            grading: { mode: "pairs" },
        },
        {
            id: "cl-2-listen",
            type: "listenChooseMeaning",
            instruction: {
                en: "Listen. What does it mean?",
                bn: "শুনুন। এর মানে কী?",
                ta: "கேளுங்கள். இதன் பொருள் என்ன?",
                hi: "सुनिए। इसका मतलब क्या है?",
            },
            practises: ["v-appointment"],
            audioText: "appointment",
            choices: [
                { id: "c-correct", vocabId: "v-appointment" },
                { id: "c-wrong-1", vocabId: "v-cough" },
                {
                    id: "c-wrong-2",
                    label: {
                        en: "a day off from work",
                        bn: "কাজ থেকে এক দিনের ছুটি",
                        ta: "வேலையிலிருந்து ஒரு நாள் விடுப்பு",
                        hi: "काम से एक दिन की छुट्टी",
                    },
                },
            ],
            correctChoiceId: "c-correct",
            grading: { mode: "choice" },
        },
        {
            id: "cl-3-picture-word",
            type: "pictureToWord",
            instruction: {
                en: "What is this called?",
                bn: "এটাকে কী বলে?",
                ta: "இதை என்ன என்று சொல்வார்கள்?",
                hi: "इसे क्या कहते हैं?",
            },
            practises: ["v-medicine"],
            vocabId: "v-medicine",
            choiceVocabIds: ["v-medicine", "v-clinic", "v-rest"],
            grading: { mode: "choice" },
        },
        {
            id: "cl-4-arrange",
            type: "arrangeWords",
            instruction: {
                en: "Put the words in order",
                bn: "শব্দগুলো সাজান",
                ta: "சொற்களை வரிசைப்படுத்துங்கள்",
                hi: "शब्दों को क्रम में लगाएँ",
            },
            practises: ["v-fever"],
            phraseId: "p-have-fever",
            tokens: ["I", "have", "a", "fever"],
            grading: { mode: "keywords", keywords: ["have", "fever"] },
        },
        {
            id: "cl-5-dialogue",
            type: "dialogueChoice",
            instruction: {
                en: "What do you say?",
                bn: "আপনি কী বলবেন?",
                ta: "நீங்கள் என்ன சொல்வீர்கள்?",
                hi: "आप क्या कहेंगे?",
            },
            practises: ["v-fever"],
            situation: {
                en: "You are in the doctor's room.",
                bn: "আপনি ডাক্তারের ঘরে আছেন।",
                ta: "நீங்கள் மருத்துவரின் அறையில் இருக்கிறீர்கள்.",
                hi: "आप डॉक्टर के कमरे में हैं।",
            },
            line: "What is the problem?",
            lineMeaning: {
                en: "The doctor asks what is wrong.",
                bn: "ডাক্তার জিজ্ঞাসা করছেন কী সমস্যা।",
                ta: "என்ன பிரச்சினை என்று மருத்துவர் கேட்கிறார்.",
                hi: "डॉक्टर पूछ रहा है कि क्या तकलीफ़ है।",
            },
            phraseId: "p-have-fever",
            distractors: [
                { id: "d-times", phraseId: "p-how-many-times" },
                {
                    id: "d-thanks",
                    text: "Thank you, doctor.",
                    meaning: {
                        en: "Saying thank you.",
                        bn: "ধন্যবাদ, ডাক্তার।",
                        ta: "நன்றி, டாக்டர்.",
                        hi: "धन्यवाद, डॉक्टर।",
                    },
                },
            ],
            grading: { mode: "choice" },
        },
        {
            id: "cl-6-listen-arrange",
            type: "listenArrangeWords",
            instruction: {
                en: "Listen. Tap what you hear",
                bn: "শুনুন। যা শুনলেন তা সাজান",
                ta: "கேளுங்கள். கேட்டதைத் தட்டுங்கள்",
                hi: "सुनिए। जो सुना, उसे लगाइए",
            },
            practises: ["v-mc"],
            phraseId: "p-need-mc",
            tokens: ["Can", "I", "have", "an", "MC", "fever", "rest"],
            grading: { mode: "keywords", keywords: ["can", "mc"] },
        },
        {
            id: "cl-7-dialogue-pain",
            type: "dialogueChoice",
            instruction: {
                en: "What do you say?",
                bn: "আপনি কী বলবেন?",
                ta: "நீங்கள் என்ன சொல்வீர்கள்?",
                hi: "आप क्या कहेंगे?",
            },
            practises: ["v-pain"],
            situation: {
                en: "The doctor wants to know where it hurts.",
                bn: "ডাক্তার জানতে চান কোথায় ব্যথা।",
                ta: "எங்கே வலிக்கிறது என்று மருத்துவர் அறிய விரும்புகிறார்.",
                hi: "डॉक्टर जानना चाहता है कि दर्द कहाँ है।",
            },
            line: "Where is the pain?",
            lineMeaning: {
                en: "The doctor asks where it hurts.",
                bn: "ডাক্তার জিজ্ঞাসা করছেন কোথায় ব্যথা।",
                ta: "எங்கே வலிக்கிறது என்று மருத்துவர் கேட்கிறார்.",
                hi: "डॉक्टर पूछ रहा है कि दर्द कहाँ है।",
            },
            phraseId: "p-pain-here",
            distractors: [
                { id: "d-times-2", phraseId: "p-how-many-times" },
                { id: "d-mc", phraseId: "p-need-mc" },
            ],
            grading: { mode: "choice" },
        },
        {
            id: "cl-8-translate",
            type: "translateWordBank",
            instruction: {
                en: "Say this in English",
                bn: "এটি ইংরেজিতে বলুন",
                ta: "இதை ஆங்கிலத்தில் சொல்லுங்கள்",
                hi: "इसे अंग्रेज़ी में कहिए",
            },
            practises: ["v-medicine"],
            prompt: {
                en: "How many times a day?",
                bn: "দিনে কতবার?",
                ta: "நாளுக்கு எத்தனை முறை?",
                hi: "दिन में कितनी बार?",
            },
            phraseId: "p-how-many-times",
            tokens: ["How", "many", "times", "a", "day", "fever", "medicine"],
            grading: { mode: "keywords", keywords: ["how many", "times", "day"] },
        },
        {
            id: "cl-9-fill",
            type: "fillBlank",
            instruction: {
                en: "Fill in the missing word",
                bn: "খালি জায়গায় শব্দ বসান",
                ta: "விடுபட்ட சொல்லை நிரப்புங்கள்",
                hi: "छूटा हुआ शब्द भरें",
            },
            practises: ["v-medicine"],
            sentence: ["Take the medicine two", null, "a day."],
            choices: [
                { id: "f-times", label: "times" },
                { id: "f-days", label: "days" },
                { id: "f-fever", label: "fever" },
            ],
            correctChoiceId: "f-times",
            grading: { mode: "choice" },
        },
    ],

    speaking: {
        scene: "The learner is at a small clinic in Singapore. You are the doctor: kind, unhurried, and used to patients who speak little English.",
        names: [],
        goals: [
            { id: "say-fever", phraseId: "p-have-fever", keywords: ["fever"] },
            { id: "say-pain", phraseId: "p-pain-here", keywords: ["pain"] },
            { id: "say-mc", phraseId: "p-need-mc", keywords: ["mc"] },
            { id: "say-times", phraseId: "p-how-many-times", keywords: ["how many", "day"] },
        ],
    },
};
