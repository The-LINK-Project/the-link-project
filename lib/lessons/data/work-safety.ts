/**
 * Lesson: "At work".
 *
 * The sentences a worker needs on site: asking a supervisor to repeat, saying
 * something is not safe, saying they are hurt, and asking for a day off. The
 * notes carry the rights that go with them, because knowing you may refuse
 * unsafe work is worth more than any single word.
 *
 * Every Bengali, Tamil and Hindi string is `reviewed: false` and must be
 * checked by a native speaker before real learners see it.
 */

import type { Lesson } from "../types";

export const workSafety: Lesson = {
    id: "work-safety",
    title: {
        en: "At work",
        bn: "কর্মস্থলে",
        ta: "வேலையில்",
        hi: "काम पर",
    },
    goal: {
        en: "Ask your supervisor to say it again, say when something is not safe, and ask for a day off.",
        bn: "সুপারভাইজারকে আবার বলতে বলা, কিছু নিরাপদ না হলে বলা, আর ছুটি চাওয়া।",
        ta: "மேற்பார்வையாளரை மீண்டும் சொல்லச் சொல்வது, பாதுகாப்பில்லை என்று சொல்வது, விடுப்பு கேட்பது.",
        hi: "सुपरवाइज़र से दोबारा कहने को कहना, कुछ सुरक्षित न हो तो बताना, और छुट्टी माँगना।",
    },
    icon: "work",
    level: "beginner",
    estimatedMinutes: 6,

    notes: [
        {
            id: "note-ppe",
            text: {
                en: "Wear your helmet, safety boots and vest on the worksite. Your employer must give them to you for free.",
                bn: "কর্মস্থলে হেলমেট, সেফটি বুট আর ভেস্ট পরুন। নিয়োগকর্তাকে এগুলো বিনামূল্যে দিতে হবে।",
                ta: "வேலைத்தளத்தில் ஹெல்மெட், பாதுகாப்பு பூட்ஸ், வெஸ்ட் அணியுங்கள். முதலாளி இவற்றை இலவசமாகக் கொடுக்க வேண்டும்.",
                hi: "काम की जगह पर हेलमेट, सेफ़्टी बूट और वेस्ट पहनें। मालिक को ये मुफ़्त में देने होते हैं।",
            },
            reviewed: false,
        },
        {
            id: "note-unsafe",
            text: {
                en: "If work is not safe, tell your supervisor. You can say no to unsafe work. You can also call MOM at 6438 5122.",
                bn: "কাজ নিরাপদ না হলে সুপারভাইজারকে বলুন। অনিরাপদ কাজে আপনি না বলতে পারেন। MOM-কে 6438 5122 নম্বরে ফোনও করতে পারেন।",
                ta: "வேலை பாதுகாப்பாக இல்லை என்றால் மேற்பார்வையாளரிடம் சொல்லுங்கள். பாதுகாப்பற்ற வேலைக்கு நீங்கள் மறுக்கலாம். MOM-ஐ 6438 5122 எண்ணிலும் அழைக்கலாம்.",
                hi: "काम सुरक्षित न हो तो सुपरवाइज़र को बताएँ। असुरक्षित काम के लिए आप मना कर सकते हैं। MOM को 6438 5122 पर फ़ोन भी कर सकते हैं।",
            },
            reviewed: false,
        },
        {
            id: "note-hurt",
            text: {
                en: "If you are hurt at work, tell your supervisor the same day and see a doctor. Keep the MC and every receipt.",
                bn: "কাজে আঘাত পেলে সেদিনই সুপারভাইজারকে বলুন আর ডাক্তার দেখান। এমসি আর সব রসিদ রেখে দিন।",
                ta: "வேலையில் காயம் ஏற்பட்டால் அன்றே மேற்பார்வையாளரிடம் சொல்லி மருத்துவரைப் பாருங்கள். எம்சி, எல்லா ரசீதுகளையும் வைத்திருங்கள்.",
                hi: "काम पर चोट लगे तो उसी दिन सुपरवाइज़र को बताएँ और डॉक्टर को दिखाएँ। एमसी और हर रसीद संभाल कर रखें।",
            },
            reviewed: false,
        },
        {
            id: "note-salary",
            text: {
                en: "Your salary must be paid within 7 days after the end of the month. If it is late, call MOM.",
                bn: "মাস শেষ হওয়ার ৭ দিনের মধ্যে বেতন দিতে হবে। দেরি হলে MOM-কে ফোন করুন।",
                ta: "மாதம் முடிந்த 7 நாட்களுக்குள் சம்பளம் கொடுக்க வேண்டும். தாமதமானால் MOM-ஐ அழையுங்கள்.",
                hi: "महीना ख़त्म होने के 7 दिन के अंदर तनख़्वाह मिलनी चाहिए। देर हो तो MOM को फ़ोन करें।",
            },
            reviewed: false,
        },
        {
            id: "note-emergency",
            text: {
                en: "In an emergency, call 995 for an ambulance.",
                bn: "জরুরি অবস্থায় অ্যাম্বুলেন্সের জন্য 995 নম্বরে ফোন করুন।",
                ta: "அவசரநிலையில் ஆம்புலன்சிற்கு 995 அழையுங்கள்.",
                hi: "आपात स्थिति में एम्बुलेंस के लिए 995 पर फ़ोन करें।",
            },
            reviewed: false,
        },
    ],

    vocab: [
        {
            id: "v-supervisor",
            term: "supervisor",
            meaning: {
                en: "the boss at your worksite",
                bn: "কর্মস্থলের বস",
                ta: "வேலைத்தளத்தின் மேலாளர்",
                hi: "काम की जगह का बॉस",
            },
            picture: "person",
            reviewed: false,
        },
        {
            id: "v-dangerous",
            term: "dangerous",
            meaning: {
                en: "not safe; you can get hurt",
                bn: "বিপজ্জনক; আঘাত লাগতে পারে",
                ta: "ஆபத்தானது; காயம் ஏற்படலாம்",
                hi: "ख़तरनाक; चोट लग सकती है",
            },
            picture: "warning",
            reviewed: false,
        },
        {
            id: "v-hurt",
            term: "hurt",
            meaning: {
                en: "your body is injured",
                bn: "আঘাত পাওয়া",
                ta: "காயம் அடைந்திருப்பது",
                hi: "चोट लगना",
            },
            picture: "firstAid",
            reviewed: false,
        },
        {
            id: "v-day-off",
            term: "day off",
            meaning: {
                en: "a day with no work",
                bn: "ছুটির দিন",
                ta: "வேலை இல்லாத நாள்",
                hi: "छुट्टी का दिन",
            },
            picture: "calendar",
            reviewed: false,
        },
        {
            id: "v-break",
            term: "break",
            meaning: {
                en: "a short rest from work",
                bn: "কাজের মাঝে ছোট বিরতি",
                ta: "வேலைக்கு இடையில் சிறிய ஓய்வு",
                hi: "काम के बीच थोड़ा आराम",
            },
            picture: "clock",
            reviewed: false,
        },
        {
            id: "v-safety-boots",
            term: "safety boots",
            meaning: {
                en: "strong shoes for work",
                bn: "কাজের জন্য শক্ত জুতা",
                ta: "வேலைக்கான உறுதியான காலணி",
                hi: "काम के लिए मज़बूत जूते",
            },
            picture: "boots",
            reviewed: false,
        },
        {
            id: "v-salary",
            term: "salary",
            meaning: {
                en: "the money you get for your work",
                bn: "বেতন",
                ta: "சம்பளம்",
                hi: "तनख़्वाह",
            },
            picture: "money",
            reviewed: false,
        },
        {
            id: "v-again",
            term: "again",
            meaning: {
                en: "one more time",
                bn: "আবার",
                ta: "மீண்டும்",
                hi: "फिर से",
            },
            reviewed: false,
        },
    ],

    phrases: [
        {
            id: "p-say-again",
            text: "Can you say it again?",
            meaning: {
                en: "Asking someone to repeat what they said.",
                bn: "আবার বলবেন?",
                ta: "மீண்டும் சொல்ல முடியுமா?",
                hi: "क्या आप फिर से कह सकते हैं?",
            },
            reviewed: false,
        },
        {
            id: "p-dangerous",
            text: "This is dangerous.",
            meaning: {
                en: "Saying that something is not safe.",
                bn: "এটা বিপজ্জনক।",
                ta: "இது ஆபத்தானது.",
                hi: "यह ख़तरनाक है।",
            },
            reviewed: false,
        },
        {
            id: "p-hurt",
            text: "I am hurt.",
            meaning: {
                en: "Saying that you are injured.",
                bn: "আমি আঘাত পেয়েছি।",
                ta: "எனக்குக் காயம்.",
                hi: "मुझे चोट लगी है।",
            },
            reviewed: false,
        },
        {
            id: "p-day-off",
            text: "I need a day off.",
            meaning: {
                en: "Asking for a day with no work.",
                bn: "আমার এক দিন ছুটি দরকার।",
                ta: "எனக்கு ஒரு நாள் விடுப்பு வேண்டும்.",
                hi: "मुझे एक दिन की छुट्टी चाहिए।",
            },
            reviewed: false,
        },
        {
            id: "p-salary-late",
            text: "My salary is late.",
            meaning: {
                en: "Saying your pay has not come on time.",
                bn: "আমার বেতন দেরিতে আসছে।",
                ta: "என் சம்பளம் தாமதமாகிறது.",
                hi: "मेरी तनख़्वाह देर से आ रही है।",
            },
            reviewed: false,
        },
    ],

    exercises: [
        {
            id: "ws-0-picture",
            type: "selectPicture",
            instruction: {
                en: "Which one is this?",
                bn: "এটি কোনটি?",
                ta: "இது எது?",
                hi: "यह कौन-सा है?",
            },
            practises: ["v-dangerous"],
            vocabId: "v-dangerous",
            choiceVocabIds: ["v-dangerous", "v-day-off", "v-break"],
            grading: { mode: "choice" },
        },
        {
            id: "ws-1-pairs",
            type: "matchPairs",
            instruction: {
                en: "Tap the pairs",
                bn: "জোড়া মেলান",
                ta: "ஜோடிகளைத் தட்டுங்கள்",
                hi: "जोड़ी मिलाएँ",
            },
            practises: ["v-supervisor", "v-dangerous", "v-hurt", "v-day-off"],
            vocabIds: ["v-supervisor", "v-dangerous", "v-hurt", "v-day-off"],
            grading: { mode: "pairs" },
        },
        {
            id: "ws-2-listen",
            type: "listenChooseMeaning",
            instruction: {
                en: "Listen. What does it mean?",
                bn: "শুনুন। এর মানে কী?",
                ta: "கேளுங்கள். இதன் பொருள் என்ன?",
                hi: "सुनिए। इसका मतलब क्या है?",
            },
            practises: ["v-salary"],
            audioText: "salary",
            choices: [
                { id: "c-correct", vocabId: "v-salary" },
                { id: "c-wrong-1", vocabId: "v-day-off" },
                { id: "c-wrong-2", vocabId: "v-supervisor" },
            ],
            correctChoiceId: "c-correct",
            grading: { mode: "choice" },
        },
        {
            id: "ws-3-picture-word",
            type: "pictureToWord",
            instruction: {
                en: "What is this called?",
                bn: "এটাকে কী বলে?",
                ta: "இதை என்ன என்று சொல்வார்கள்?",
                hi: "इसे क्या कहते हैं?",
            },
            practises: ["v-hurt"],
            vocabId: "v-hurt",
            choiceVocabIds: ["v-hurt", "v-break", "v-salary"],
            grading: { mode: "choice" },
        },
        {
            id: "ws-4-arrange",
            type: "arrangeWords",
            instruction: {
                en: "Put the words in order",
                bn: "শব্দগুলো সাজান",
                ta: "சொற்களை வரிசைப்படுத்துங்கள்",
                hi: "शब्दों को क्रम में लगाएँ",
            },
            practises: ["v-day-off"],
            phraseId: "p-day-off",
            tokens: ["I", "need", "a", "day off"],
            grading: { mode: "keywords", keywords: ["need", "day off"] },
        },
        {
            id: "ws-5-dialogue",
            type: "dialogueChoice",
            instruction: {
                en: "What do you say?",
                bn: "আপনি কী বলবেন?",
                ta: "நீங்கள் என்ன சொல்வீர்கள்?",
                hi: "आप क्या कहेंगे?",
            },
            practises: ["v-again", "v-supervisor"],
            situation: {
                en: "Your supervisor speaks very fast. You did not understand.",
                bn: "সুপারভাইজার খুব দ্রুত কথা বলেন। আপনি বুঝতে পারেননি।",
                ta: "மேற்பார்வையாளர் மிக வேகமாகப் பேசுகிறார். உங்களுக்குப் புரியவில்லை.",
                hi: "सुपरवाइज़र बहुत तेज़ बोलता है। आपको समझ नहीं आया।",
            },
            line: "Bring the long pipes to level three, then check the ties.",
            lineMeaning: {
                en: "The supervisor gives a long instruction.",
                bn: "সুপারভাইজার একটি লম্বা নির্দেশ দিচ্ছেন।",
                ta: "மேற்பார்வையாளர் ஒரு நீண்ட உத்தரவு கொடுக்கிறார்.",
                hi: "सुपरवाइज़र एक लंबा निर्देश दे रहा है।",
            },
            phraseId: "p-say-again",
            distractors: [
                { id: "d-day-off", phraseId: "p-day-off" },
                { id: "d-salary", phraseId: "p-salary-late" },
            ],
            grading: { mode: "choice" },
        },
        {
            id: "ws-6-listen-arrange",
            type: "listenArrangeWords",
            instruction: {
                en: "Listen. Tap what you hear",
                bn: "শুনুন। যা শুনলেন তা সাজান",
                ta: "கேளுங்கள். கேட்டதைத் தட்டுங்கள்",
                hi: "सुनिए। जो सुना, उसे लगाइए",
            },
            practises: ["v-dangerous"],
            phraseId: "p-dangerous",
            tokens: ["This", "is", "dangerous", "hurt", "safe"],
            grading: { mode: "keywords", keywords: ["dangerous"] },
        },
        {
            id: "ws-7-dialogue-hurt",
            type: "dialogueChoice",
            instruction: {
                en: "What do you say?",
                bn: "আপনি কী বলবেন?",
                ta: "நீங்கள் என்ன சொல்வீர்கள்?",
                hi: "आप क्या कहेंगे?",
            },
            practises: ["v-hurt"],
            situation: {
                en: "You fell and your arm is bleeding. Your supervisor runs over.",
                bn: "আপনি পড়ে গেছেন, হাত থেকে রক্ত পড়ছে। সুপারভাইজার দৌড়ে আসেন।",
                ta: "நீங்கள் விழுந்து கை இரத்தம் வருகிறது. மேற்பார்வையாளர் ஓடி வருகிறார்.",
                hi: "आप गिर गए और बाँह से ख़ून निकल रहा है। सुपरवाइज़र दौड़कर आता है।",
            },
            line: "What happened?",
            lineMeaning: {
                en: "The supervisor asks what happened.",
                bn: "সুপারভাইজার জিজ্ঞাসা করছেন কী হয়েছে।",
                ta: "என்ன ஆனது என்று மேற்பார்வையாளர் கேட்கிறார்.",
                hi: "सुपरवाइज़र पूछ रहा है कि क्या हुआ।",
            },
            phraseId: "p-hurt",
            distractors: [
                { id: "d-again", phraseId: "p-say-again" },
                { id: "d-salary-2", phraseId: "p-salary-late" },
            ],
            grading: { mode: "choice" },
        },
        {
            id: "ws-8-translate",
            type: "translateWordBank",
            instruction: {
                en: "Say this in English",
                bn: "এটি ইংরেজিতে বলুন",
                ta: "இதை ஆங்கிலத்தில் சொல்லுங்கள்",
                hi: "इसे अंग्रेज़ी में कहिए",
            },
            practises: ["v-salary"],
            prompt: {
                en: "My salary is late.",
                bn: "আমার বেতন দেরিতে আসছে।",
                ta: "என் சம்பளம் தாமதமாகிறது.",
                hi: "मेरी तनख़्वाह देर से आ रही है।",
            },
            phraseId: "p-salary-late",
            tokens: ["My", "salary", "is", "late", "break", "again", "day off"],
            grading: { mode: "keywords", keywords: ["salary", "late"] },
        },
        {
            id: "ws-9-fill",
            type: "fillBlank",
            instruction: {
                en: "Fill in the missing word",
                bn: "খালি জায়গায় শব্দ বসান",
                ta: "விடுபட்ட சொல்லை நிரப்புங்கள்",
                hi: "छूटा हुआ शब्द भरें",
            },
            practises: ["v-safety-boots"],
            sentence: ["Wear your safety", null, "at work."],
            choices: [
                { id: "f-boots", label: "boots" },
                { id: "f-break", label: "break" },
                { id: "f-salary", label: "salary" },
            ],
            correctChoiceId: "f-boots",
            grading: { mode: "choice" },
        },
    ],

    speaking: {
        scene: "The learner is at a construction worksite in Singapore, talking to their supervisor. You are the supervisor: patient and kind, and you want the learner to be safe.",
        names: [],
        goals: [
            { id: "say-again", phraseId: "p-say-again", keywords: ["say", "again"] },
            { id: "say-dangerous", phraseId: "p-dangerous", keywords: ["dangerous"] },
            { id: "say-hurt", phraseId: "p-hurt", keywords: ["hurt"] },
            { id: "say-day-off", phraseId: "p-day-off", keywords: ["day off"] },
        ],
    },
};
