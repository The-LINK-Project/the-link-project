/**
 * Lesson: "Buses and finding your way".
 *
 * The follow-up to the MRT lesson: which bus to take, how to get off it, and what
 * to say when lost. Phrases name Little India because it is where many learners
 * go on a day off, and place names are left in English on every sign.
 *
 * Every Bengali, Tamil and Hindi string is `reviewed: false` and must be
 * checked by a native speaker before real learners see it.
 */

import type { Lesson } from "../types";

export const busDirections: Lesson = {
    id: "bus-directions",
    title: {
        en: "Buses and finding your way",
        bn: "বাস আর পথ খোঁজা",
        ta: "பேருந்தும் வழி கண்டுபிடித்தலும்",
        hi: "बस और रास्ता ढूँढना",
    },
    goal: {
        en: "Find the right bus, get off at your stop, and ask for directions when you are lost.",
        bn: "সঠিক বাস খোঁজা, নিজের স্টপে নামা, আর পথ হারালে রাস্তা জিজ্ঞাসা করা।",
        ta: "சரியான பேருந்தைக் கண்டுபிடிப்பது, உங்கள் நிறுத்தத்தில் இறங்குவது, வழி தவறினால் வழி கேட்பது.",
        hi: "सही बस ढूँढना, अपने स्टॉप पर उतरना, और रास्ता न मिलने पर रास्ता पूछना।",
    },
    icon: "bus",
    level: "beginner",
    estimatedMinutes: 6,

    notes: [
        {
            id: "note-bd-tap",
            text: {
                en: "Tap your card when you get on the bus and again when you get off. If you forget to tap when you get off, you can pay more.",
                bn: "বাসে ওঠার সময় আর নামার সময় কার্ড ছোঁয়ান। নামার সময় ভুলে গেলে বেশি টাকা কাটতে পারে।",
                ta: "பேருந்தில் ஏறும்போதும் இறங்கும்போதும் அட்டையைத் தட்டுங்கள். இறங்கும்போது மறந்தால் அதிகக் கட்டணம் ஆகலாம்.",
                hi: "बस में चढ़ते और उतरते समय कार्ड टैप करें। उतरते समय भूल गए तो ज़्यादा पैसे कट सकते हैं।",
            },
            reviewed: false,
        },
        {
            id: "note-bd-bell",
            text: {
                en: "Press the bell just before your stop. If nobody presses it and nobody is waiting, the bus does not stop.",
                bn: "আপনার স্টপের ঠিক আগে বেল টিপুন। কেউ না টিপলে আর কেউ অপেক্ষা না করলে বাস থামে না।",
                ta: "உங்கள் நிறுத்தத்துக்குச் சற்று முன் மணியை அழுத்துங்கள். யாரும் அழுத்தாமல், யாரும் காத்திருக்காவிட்டால் பேருந்து நிற்காது.",
                hi: "अपने स्टॉप से ठीक पहले घंटी दबाएँ। कोई न दबाए और कोई इंतज़ार न कर रहा हो तो बस नहीं रुकती।",
            },
            reviewed: false,
        },
        {
            id: "note-bd-wave",
            text: {
                en: "Raise your hand when your bus comes, so the driver knows to stop.",
                bn: "আপনার বাস এলে হাত তুলুন, যাতে চালক বুঝতে পারেন থামতে হবে।",
                ta: "உங்கள் பேருந்து வரும்போது கையை உயர்த்துங்கள், அப்போது ஓட்டுநர் நிறுத்துவார்.",
                hi: "आपकी बस आए तो हाथ उठाएँ, ताकि ड्राइवर समझ जाए कि रुकना है।",
            },
            reviewed: false,
        },
        {
            id: "note-bd-cross",
            text: {
                en: "Cross the road at a traffic light or an overhead bridge. You can be fined for crossing somewhere else nearby.",
                bn: "রাস্তা পার হন ট্রাফিক লাইটে বা ওভারহেড ব্রিজ দিয়ে। কাছাকাছি অন্য জায়গা দিয়ে পার হলে জরিমানা হতে পারে।",
                ta: "போக்குவரத்து விளக்கில் அல்லது மேம்பாலத்தில் சாலையைக் கடங்கள். அருகில் வேறு இடத்தில் கடந்தால் அபராதம் விதிக்கப்படலாம்.",
                hi: "सड़क ट्रैफ़िक लाइट या ओवरहेड ब्रिज से पार करें। पास में कहीं और से पार करने पर जुर्माना हो सकता है।",
            },
            reviewed: false,
        },
    ],

    vocab: [
        {
            id: "v-bus-stop",
            term: "bus stop",
            meaning: {
                en: "where you wait for the bus",
                bn: "বাসের জন্য অপেক্ষার জায়গা",
                ta: "பேருந்துக்குக் காத்திருக்கும் இடம்",
                hi: "बस का इंतज़ार करने की जगह",
            },
            picture: "busStop",
            reviewed: false,
        },
        {
            id: "v-bell",
            term: "bell",
            meaning: {
                en: "press it to ask the bus to stop",
                bn: "বাস থামাতে যেটা টিপতে হয়",
                ta: "பேருந்தை நிறுத்த அழுத்தும் மணி",
                hi: "बस रुकवाने के लिए दबाने वाली घंटी",
            },
            picture: "bell",
            reviewed: false,
        },
        {
            id: "v-left",
            term: "left",
            meaning: {
                en: "the side of your left hand",
                bn: "বাঁ দিক",
                ta: "இடது பக்கம்",
                hi: "बाईं ओर",
            },
            picture: "left",
            reviewed: false,
        },
        {
            id: "v-right",
            term: "right",
            meaning: {
                en: "the side of your right hand",
                bn: "ডান দিক",
                ta: "வலது பக்கம்",
                hi: "दाईं ओर",
            },
            picture: "right",
            reviewed: false,
        },
        {
            id: "v-straight",
            term: "straight",
            meaning: {
                en: "keep going ahead; do not turn",
                bn: "সোজা, না ঘুরে এগিয়ে যান",
                ta: "நேராக, திரும்பாமல் செல்லுங்கள்",
                hi: "सीधे, बिना मुड़े आगे जाएँ",
            },
            picture: "straight",
            reviewed: false,
        },
        {
            id: "v-traffic-light",
            term: "traffic light",
            meaning: {
                en: "the lights that say stop or go",
                bn: "থামা বা চলার আলো",
                ta: "நில் அல்லது செல் என்று காட்டும் விளக்கு",
                hi: "रुकने या चलने की बत्ती",
            },
            picture: "trafficLight",
            reviewed: false,
        },
        {
            id: "v-overhead-bridge",
            term: "overhead bridge",
            meaning: {
                en: "a bridge for walking over a road",
                bn: "রাস্তার ওপর দিয়ে হাঁটার সেতু",
                ta: "சாலைக்கு மேலே நடக்கும் பாலம்",
                hi: "सड़क के ऊपर पैदल चलने का पुल",
            },
            picture: "overheadBridge",
            reviewed: false,
        },
        {
            id: "v-map",
            term: "map",
            meaning: {
                en: "a picture that shows where places are",
                bn: "মানচিত্র, কোন জায়গা কোথায় তা দেখায়",
                ta: "இடங்கள் எங்கே என்று காட்டும் வரைபடம்",
                hi: "नक्शा, जो जगहें दिखाता है",
            },
            picture: "map",
            reviewed: false,
        },
    ],

    phrases: [
        {
            id: "p-bd-which",
            text: "Which bus goes to Little India?",
            meaning: {
                en: "Asking which bus to take.",
                bn: "কোন বাস Little India যায়?",
                ta: "Little India-க்கு எந்தப் பேருந்து போகும்?",
                hi: "कौन-सी बस Little India जाती है?",
            },
            reviewed: false,
        },
        {
            id: "p-bd-where",
            text: "Where is the bus stop?",
            meaning: {
                en: "Asking the way to the bus stop.",
                bn: "বাসের স্টপ কোথায়?",
                ta: "பேருந்து நிறுத்தம் எங்கே?",
                hi: "बस का स्टॉप कहाँ है?",
            },
            reviewed: false,
        },
        {
            id: "p-bd-straight",
            text: "Go straight, then turn left.",
            meaning: {
                en: "Telling someone the way.",
                bn: "সোজা যান, তারপর বাঁয়ে ঘুরুন।",
                ta: "நேராகப் போய், பிறகு இடது பக்கம் திரும்புங்கள்.",
                hi: "सीधे जाइए, फिर बाएँ मुड़िए।",
            },
            reviewed: false,
        },
        {
            id: "p-bd-lost",
            text: "I am lost. Can you help me?",
            meaning: {
                en: "Saying you do not know where you are.",
                bn: "আমি পথ হারিয়েছি। একটু সাহায্য করবেন?",
                ta: "நான் வழி தவறிவிட்டேன். உதவ முடியுமா?",
                hi: "मुझे रास्ता नहीं मिल रहा। क्या आप मदद कर सकते हैं?",
            },
            reviewed: false,
        },
        {
            id: "p-bd-stop",
            text: "Please tell me my stop.",
            meaning: {
                en: "Asking someone to tell you when to get off.",
                bn: "আমার স্টপ এলে বলবেন।",
                ta: "என் நிறுத்தம் வந்தால் சொல்லுங்கள்.",
                hi: "मेरा स्टॉप आए तो बता दीजिए।",
            },
            reviewed: false,
        },
    ],

    exercises: [
        {
            id: "bd-0-picture",
            type: "selectPicture",
            instruction: {
                en: "Which one is this?",
                bn: "এটি কোনটি?",
                ta: "இது எது?",
                hi: "यह कौन-सा है?",
            },
            practises: ["v-bus-stop"],
            vocabId: "v-bus-stop",
            choiceVocabIds: ["v-bus-stop", "v-overhead-bridge", "v-traffic-light"],
            grading: { mode: "choice" },
        },
        {
            id: "bd-1-pairs",
            type: "matchPairs",
            instruction: {
                en: "Tap the pairs",
                bn: "জোড়া মেলান",
                ta: "ஜோடிகளைத் தட்டுங்கள்",
                hi: "जोड़ी मिलाएँ",
            },
            practises: ["v-bell", "v-straight", "v-traffic-light", "v-map"],
            vocabIds: ["v-bell", "v-straight", "v-traffic-light", "v-map"],
            grading: { mode: "pairs" },
        },
        {
            id: "bd-2-listen",
            type: "listenChooseMeaning",
            instruction: {
                en: "Listen. What does it mean?",
                bn: "শুনুন। এর মানে কী?",
                ta: "கேளுங்கள். இதன் பொருள் என்ன?",
                hi: "सुनिए। इसका मतलब क्या है?",
            },
            practises: ["v-left"],
            audioText: "left",
            choices: [
                { id: "c-correct", vocabId: "v-left" },
                { id: "c-wrong-1", vocabId: "v-straight" },
                { id: "c-wrong-2", vocabId: "v-bell" },
            ],
            correctChoiceId: "c-correct",
            grading: { mode: "choice" },
        },
        {
            id: "bd-3-picture-word",
            type: "pictureToWord",
            instruction: {
                en: "What is this called?",
                bn: "এটাকে কী বলে?",
                ta: "இதை என்ன என்று சொல்வார்கள்?",
                hi: "इसे क्या कहते हैं?",
            },
            practises: ["v-overhead-bridge"],
            vocabId: "v-overhead-bridge",
            choiceVocabIds: ["v-overhead-bridge", "v-map", "v-bell"],
            grading: { mode: "choice" },
        },
        {
            id: "bd-4-arrange",
            type: "arrangeWords",
            instruction: {
                en: "Put the words in order",
                bn: "শব্দগুলো সাজান",
                ta: "சொற்களை வரிசைப்படுத்துங்கள்",
                hi: "शब्दों को क्रम में लगाएँ",
            },
            practises: ["v-bus-stop"],
            phraseId: "p-bd-where",
            tokens: ["Where", "is", "the", "bus stop"],
            grading: { mode: "keywords", keywords: ["where", "bus stop"] },
        },
        {
            id: "bd-5-dialogue",
            type: "dialogueChoice",
            instruction: {
                en: "What do you say?",
                bn: "আপনি কী বলবেন?",
                ta: "நீங்கள் என்ன சொல்வீர்கள்?",
                hi: "आप क्या कहेंगे?",
            },
            practises: ["v-bus-stop"],
            situation: {
                en: "You are at a bus stop and want to go to Little India. A woman is waiting next to you.",
                bn: "আপনি বাসের স্টপে আছেন, Little India যেতে চান। পাশে একজন নারী অপেক্ষা করছেন।",
                ta: "நீங்கள் பேருந்து நிறுத்தத்தில் இருக்கிறீர்கள், Little India போக வேண்டும். உங்கள் அருகில் ஒரு பெண் காத்திருக்கிறார்.",
                hi: "आप बस स्टॉप पर हैं और Little India जाना चाहते हैं। आपके पास एक महिला इंतज़ार कर रही है।",
            },
            line: "Are you waiting for a bus?",
            lineMeaning: {
                en: "The woman asks if you are waiting for a bus.",
                bn: "নারীটি জিজ্ঞাসা করছেন আপনি বাসের জন্য অপেক্ষা করছেন কি না।",
                ta: "நீங்கள் பேருந்துக்காகக் காத்திருக்கிறீர்களா என்று அந்தப் பெண் கேட்கிறார்.",
                hi: "महिला पूछ रही है कि क्या आप बस का इंतज़ार कर रहे हैं।",
            },
            phraseId: "p-bd-which",
            distractors: [
                { id: "d-straight", phraseId: "p-bd-straight" },
                { id: "d-where", phraseId: "p-bd-where" },
            ],
            grading: { mode: "choice" },
        },
        {
            id: "bd-6-listen-arrange",
            type: "listenArrangeWords",
            instruction: {
                en: "Listen. Tap what you hear",
                bn: "শুনুন। যা শুনলেন তা সাজান",
                ta: "கேளுங்கள். கேட்டதைத் தட்டுங்கள்",
                hi: "सुनिए। जो सुना, उसे लगाइए",
            },
            practises: ["v-straight", "v-left"],
            phraseId: "p-bd-straight",
            tokens: ["Go", "straight", "then", "turn", "left", "right", "bell"],
            grading: { mode: "keywords", keywords: ["straight", "left"] },
        },
        {
            id: "bd-7-dialogue-lost",
            type: "dialogueChoice",
            instruction: {
                en: "What do you say?",
                bn: "আপনি কী বলবেন?",
                ta: "நீங்கள் என்ன சொல்வீர்கள்?",
                hi: "आप क्या कहेंगे?",
            },
            practises: ["v-map"],
            situation: {
                en: "You do not know this road and your phone has no battery. You see a man walking.",
                bn: "আপনি এই রাস্তা চেনেন না, ফোনের চার্জও শেষ। একজন পুরুষকে হেঁটে যেতে দেখলেন।",
                ta: "இந்தச் சாலை உங்களுக்குத் தெரியாது, உங்கள் தொலைபேசியில் சார்ஜும் இல்லை. ஒருவர் நடந்து வருவதைப் பார்க்கிறீர்கள்.",
                hi: "आप यह सड़क नहीं जानते और आपके फ़ोन की बैटरी ख़त्म है। आपको एक आदमी पैदल जाता दिखता है।",
            },
            line: "Hello, can I help you?",
            lineMeaning: {
                en: "The man asks if he can help you.",
                bn: "লোকটি জিজ্ঞাসা করছেন তিনি সাহায্য করতে পারেন কি না।",
                ta: "உங்களுக்கு உதவலாமா என்று அவர் கேட்கிறார்.",
                hi: "वह आदमी पूछ रहा है कि क्या वह आपकी मदद कर सकता है।",
            },
            phraseId: "p-bd-lost",
            distractors: [
                { id: "d-straight", phraseId: "p-bd-straight" },
                { id: "d-stop", phraseId: "p-bd-stop" },
            ],
            grading: { mode: "choice" },
        },
        {
            id: "bd-8-translate",
            type: "translateWordBank",
            instruction: {
                en: "Say this in English",
                bn: "এটি ইংরেজিতে বলুন",
                ta: "இதை ஆங்கிலத்தில் சொல்லுங்கள்",
                hi: "इसे अंग्रेज़ी में कहिए",
            },
            practises: ["v-bell"],
            prompt: {
                en: "Please tell me my stop.",
                bn: "আমার স্টপ এলে বলবেন।",
                ta: "என் நிறுத்தம் வந்தால் சொல்லுங்கள்.",
                hi: "मेरा स्टॉप आए तो बता दीजिए।",
            },
            phraseId: "p-bd-stop",
            tokens: ["Please", "tell", "me", "my", "stop", "bell", "left"],
            grading: { mode: "keywords", keywords: ["tell", "stop"] },
        },
        {
            id: "bd-9-fill",
            type: "fillBlank",
            instruction: {
                en: "Fill in the missing word",
                bn: "খালি জায়গায় শব্দ বসান",
                ta: "விடுபட்ட சொல்லை நிரப்புங்கள்",
                hi: "छूटा हुआ शब्द भरें",
            },
            practises: ["v-bell"],
            sentence: ["Press the", null, "before your stop."],
            choices: [
                { id: "f-bell", label: "bell" },
                { id: "f-map", label: "map" },
                { id: "f-left", label: "left" },
            ],
            correctChoiceId: "f-bell",
            grading: { mode: "choice" },
        },
    ],

    speaking: {
        scene: "The learner is at a bus stop in Singapore and wants to go to Little India. You are a friendly person also waiting for the bus, happy to help someone who speaks little English.",
        names: ["Little India"],
        goals: [
            { id: "say-bd-which", phraseId: "p-bd-which", keywords: ["bus", "Little India"] },
            { id: "say-bd-where", phraseId: "p-bd-where", keywords: ["where", "bus stop"] },
            { id: "say-bd-lost", phraseId: "p-bd-lost", keywords: ["lost"] },
            { id: "say-bd-stop", phraseId: "p-bd-stop", keywords: ["tell", "stop"] },
        ],
    },
};
