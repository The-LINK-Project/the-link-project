/**
 * Lesson: "Helping at home".
 *
 * The sentences a domestic worker needs in a Singapore flat: asking what to do
 * next, saying what is finished, asking to be shown how, and owning up to a
 * breakage. The notes carry the safety rules that matter most in a high-rise home.
 *
 * Every Bengali, Tamil and Hindi string is `reviewed: false` and must be
 * checked by a native speaker before real learners see it.
 */

import type { Lesson } from "../types";

export const homeHelp: Lesson = {
    id: "home-help",
    title: { en: "Helping at home", bn: "বাড়ির কাজ", ta: "வீட்டு வேலை", hi: "घर का काम" },
    goal: {
        en: "Understand what to do at home, say what you have finished, and ask when you are not sure.",
        bn: "বাড়িতে কী করতে হবে বোঝা, কোন কাজ শেষ হয়েছে বলা, আর নিশ্চিত না হলে জিজ্ঞাসা করা।",
        ta: "வீட்டில் என்ன செய்ய வேண்டும் என்று புரிந்துகொள்வது, முடித்த வேலையைச் சொல்வது, சந்தேகம் இருந்தால் கேட்பது.",
        hi: "घर में क्या करना है समझना, कौन-सा काम हो गया बताना, और पक्का न हो तो पूछना।",
    },
    icon: "home",
    level: "beginner",
    estimatedMinutes: 6,

    notes: [
        {
            id: "note-hh-window",
            text: {
                en: "Never lean out of a window to clean it or to hang clothes. If someone asks you to, say it is not safe.",
                bn: "জানালা পরিষ্কার করতে বা কাপড় মেলতে কখনও জানালার বাইরে ঝুঁকবেন না। কেউ বললে জানান যে এটা নিরাপদ নয়।",
                ta: "ஜன்னலைச் சுத்தம் செய்யவோ துணி காயப்போடவோ ஒருபோதும் ஜன்னலுக்கு வெளியே சாயாதீர்கள். யாராவது சொன்னால், இது பாதுகாப்பானது அல்ல என்று சொல்லுங்கள்.",
                hi: "खिड़की साफ़ करने या कपड़े सुखाने के लिए कभी खिड़की से बाहर न झुकें। कोई कहे तो बताएँ कि यह सुरक्षित नहीं है।",
            },
            reviewed: false,
        },
        {
            id: "note-hh-rubbish",
            text: {
                en: "Never throw anything out of a window. Put rubbish in the rubbish chute or the bin.",
                bn: "জানালা দিয়ে কখনও কিছু ফেলবেন না। ময়লা ফেলার শুট বা ডাস্টবিনে ময়লা ফেলুন।",
                ta: "ஜன்னல் வழியாக எதையும் ஒருபோதும் வீசாதீர்கள். குப்பையைக் குப்பைக் குழாயில் அல்லது தொட்டியில் போடுங்கள்.",
                hi: "खिड़की से कभी कुछ न फेंकें। कूड़ा कूड़े की चूट या डस्टबिन में डालें।",
            },
            reviewed: false,
        },
        {
            id: "note-hh-bleach",
            text: {
                en: "Never mix bleach with other cleaning products. The gas can hurt you.",
                bn: "ব্লিচ কখনও অন্য পরিষ্কারের জিনিসের সঙ্গে মেশাবেন না। এর গ্যাসে ক্ষতি হতে পারে।",
                ta: "ப்ளீச்சை மற்ற சுத்தம் செய்யும் பொருட்களுடன் ஒருபோதும் கலக்காதீர்கள். அதன் வாயு உங்களுக்குத் தீங்கு செய்யலாம்.",
                hi: "ब्लीच को कभी दूसरे सफ़ाई के सामान के साथ न मिलाएँ। उसकी गैस से नुकसान हो सकता है।",
            },
            reviewed: false,
        },
        {
            id: "note-hh-ask",
            text: {
                en: "If you do not know how to use a machine, ask first. It is better to ask than to break it.",
                bn: "কোনো যন্ত্র চালাতে না জানলে আগে জিজ্ঞাসা করুন। ভেঙে ফেলার চেয়ে জিজ্ঞাসা করা ভালো।",
                ta: "ஒரு இயந்திரத்தை எப்படிப் பயன்படுத்துவது என்று தெரியாவிட்டால் முதலில் கேளுங்கள். உடைப்பதை விடக் கேட்பது நல்லது.",
                hi: "कोई मशीन चलानी न आती हो तो पहले पूछें। ख़राब करने से पूछना बेहतर है।",
            },
            reviewed: false,
        },
    ],

    vocab: [
        {
            id: "v-laundry",
            term: "laundry",
            meaning: {
                en: "clothes to wash",
                bn: "ধোয়ার কাপড়",
                ta: "துவைக்க வேண்டிய துணிகள்",
                hi: "धोने के कपड़े",
            },
            picture: "laundry",
            reviewed: false,
        },
        {
            id: "v-iron",
            term: "iron",
            meaning: {
                en: "a hot tool that makes clothes flat",
                bn: "কাপড় সমান করার গরম যন্ত্র",
                ta: "துணிகளைத் தேய்க்கும் சூடான கருவி",
                hi: "कपड़े सीधे करने वाली गरम मशीन",
            },
            picture: "iron",
            reviewed: false,
        },
        {
            id: "v-mop",
            term: "mop",
            meaning: {
                en: "a stick with cloth for washing the floor",
                bn: "মেঝে মোছার লাঠি",
                ta: "தரையைத் துடைக்கும் கோல்",
                hi: "फ़र्श पोंछने का डंडा",
            },
            picture: "mop",
            reviewed: false,
        },
        {
            id: "v-dishes",
            term: "dishes",
            meaning: {
                en: "plates and bowls you eat from",
                bn: "থালা আর বাটি",
                ta: "தட்டுகளும் கிண்ணங்களும்",
                hi: "थाली और कटोरियाँ",
            },
            picture: "dishes",
            reviewed: false,
        },
        {
            id: "v-rubbish",
            term: "rubbish",
            meaning: {
                en: "things you throw away",
                bn: "ময়লা, যা ফেলে দেওয়া হয়",
                ta: "குப்பை, தூக்கி எறியும் பொருட்கள்",
                hi: "कूड़ा, जो फेंक दिया जाता है",
            },
            picture: "rubbish",
            reviewed: false,
        },
        {
            id: "v-fridge",
            term: "fridge",
            meaning: {
                en: "a cold box that keeps food fresh",
                bn: "খাবার ঠান্ডা রাখার যন্ত্র",
                ta: "உணவைக் குளிர்ச்சியாக வைக்கும் பெட்டி",
                hi: "खाना ठंडा रखने की मशीन",
            },
            picture: "fridge",
            reviewed: false,
        },
        {
            id: "v-stove",
            term: "stove",
            meaning: {
                en: "where you cook food with fire",
                bn: "রান্না করার চুলা",
                ta: "சமையல் அடுப்பு",
                hi: "खाना पकाने का चूल्हा",
            },
            picture: "stove",
            reviewed: false,
        },
        {
            id: "v-cupboard",
            term: "cupboard",
            meaning: {
                en: "a place with doors to keep things",
                bn: "জিনিস রাখার আলমারি",
                ta: "பொருட்களை வைக்கும் அலமாரி",
                hi: "सामान रखने की अलमारी",
            },
            picture: "cupboard",
            reviewed: false,
        },
    ],

    phrases: [
        {
            id: "p-hh-next",
            text: "What should I do next?",
            meaning: {
                en: "Asking what work comes after this.",
                bn: "এরপর আমি কী করব?",
                ta: "அடுத்து நான் என்ன செய்ய வேண்டும்?",
                hi: "अब मैं आगे क्या करूँ?",
            },
            reviewed: false,
        },
        {
            id: "p-hh-finished",
            text: "I finished the laundry.",
            meaning: {
                en: "Saying the laundry is done.",
                bn: "আমি কাপড় ধোয়া শেষ করেছি।",
                ta: "நான் துணி துவைத்து முடித்துவிட்டேன்.",
                hi: "मैंने कपड़े धो लिए हैं।",
            },
            reviewed: false,
        },
        {
            id: "p-hh-where",
            text: "Where do I put this?",
            meaning: {
                en: "Asking where something goes.",
                bn: "এটা কোথায় রাখব?",
                ta: "இதை எங்கே வைக்க வேண்டும்?",
                hi: "इसे कहाँ रखूँ?",
            },
            reviewed: false,
        },
        {
            id: "p-hh-show",
            text: "Can you show me how?",
            meaning: {
                en: "Asking someone to show you the way to do it.",
                bn: "কীভাবে করতে হয় দেখিয়ে দেবেন?",
                ta: "எப்படி என்று காட்ட முடியுமா?",
                hi: "क्या आप दिखा सकते हैं कि कैसे करना है?",
            },
            reviewed: false,
        },
        {
            id: "p-hh-broke",
            text: "Sorry, I broke a plate.",
            meaning: {
                en: "Saying sorry and telling the truth about a broken plate.",
                bn: "দুঃখিত, আমি একটা থালা ভেঙে ফেলেছি।",
                ta: "மன்னிக்கவும், நான் ஒரு தட்டை உடைத்துவிட்டேன்.",
                hi: "माफ़ कीजिए, मुझसे एक थाली टूट गई।",
            },
            reviewed: false,
        },
    ],

    exercises: [
        {
            id: "hh-0-picture",
            type: "selectPicture",
            instruction: {
                en: "Which one is this?",
                bn: "এটি কোনটি?",
                ta: "இது எது?",
                hi: "यह कौन-सा है?",
            },
            practises: ["v-mop"],
            vocabId: "v-mop",
            choiceVocabIds: ["v-mop", "v-iron", "v-fridge"],
            grading: { mode: "choice" },
        },
        {
            id: "hh-1-pairs",
            type: "matchPairs",
            instruction: {
                en: "Tap the pairs",
                bn: "জোড়া মেলান",
                ta: "ஜோடிகளைத் தட்டுங்கள்",
                hi: "जोड़ी मिलाएँ",
            },
            practises: ["v-laundry", "v-iron", "v-rubbish", "v-cupboard"],
            vocabIds: ["v-laundry", "v-iron", "v-rubbish", "v-cupboard"],
            grading: { mode: "pairs" },
        },
        {
            id: "hh-2-listen",
            type: "listenChooseMeaning",
            instruction: {
                en: "Listen. What does it mean?",
                bn: "শুনুন। এর মানে কী?",
                ta: "கேளுங்கள். இதன் பொருள் என்ன?",
                hi: "सुनिए। इसका मतलब क्या है?",
            },
            practises: ["v-dishes"],
            audioText: "dishes",
            choices: [
                { id: "c-correct", vocabId: "v-dishes" },
                { id: "c-wrong-1", vocabId: "v-fridge" },
                { id: "c-wrong-2", vocabId: "v-stove" },
            ],
            correctChoiceId: "c-correct",
            grading: { mode: "choice" },
        },
        {
            id: "hh-3-picture-word",
            type: "pictureToWord",
            instruction: {
                en: "What is this called?",
                bn: "এটাকে কী বলে?",
                ta: "இதை என்ன என்று சொல்வார்கள்?",
                hi: "इसे क्या कहते हैं?",
            },
            practises: ["v-stove"],
            vocabId: "v-stove",
            choiceVocabIds: ["v-stove", "v-cupboard", "v-rubbish"],
            grading: { mode: "choice" },
        },
        {
            id: "hh-4-arrange",
            type: "arrangeWords",
            instruction: {
                en: "Put the words in order",
                bn: "শব্দগুলো সাজান",
                ta: "சொற்களை வரிசைப்படுத்துங்கள்",
                hi: "शब्दों को क्रम में लगाएँ",
            },
            practises: ["v-laundry"],
            phraseId: "p-hh-next",
            tokens: ["What", "should", "I", "do", "next"],
            grading: { mode: "keywords", keywords: ["do", "next"] },
        },
        {
            id: "hh-5-dialogue",
            type: "dialogueChoice",
            instruction: {
                en: "What do you say?",
                bn: "আপনি কী বলবেন?",
                ta: "நீங்கள் என்ன சொல்வீர்கள்?",
                hi: "आप क्या कहेंगे?",
            },
            practises: ["v-laundry"],
            situation: {
                en: "You finished washing the clothes. Your employer comes into the room.",
                bn: "আপনি কাপড় ধোয়া শেষ করেছেন। নিয়োগকর্তা ঘরে এলেন।",
                ta: "நீங்கள் துணி துவைத்து முடித்துவிட்டீர்கள். உங்கள் முதலாளி அறைக்கு வருகிறார்.",
                hi: "आपने कपड़े धो लिए हैं। आपके नियोक्ता कमरे में आते हैं।",
            },
            line: "Is the laundry done?",
            lineMeaning: {
                en: "Your employer asks if the clothes are washed.",
                bn: "নিয়োগকর্তা জিজ্ঞাসা করছেন কাপড় ধোয়া হয়েছে কি না।",
                ta: "துணிகள் துவைத்தாகிவிட்டதா என்று முதலாளி கேட்கிறார்.",
                hi: "नियोक्ता पूछ रहे हैं कि कपड़े धुल गए या नहीं।",
            },
            phraseId: "p-hh-finished",
            distractors: [
                { id: "d-show", phraseId: "p-hh-show" },
                { id: "d-broke", phraseId: "p-hh-broke" },
            ],
            grading: { mode: "choice" },
        },
        {
            id: "hh-6-listen-arrange",
            type: "listenArrangeWords",
            instruction: {
                en: "Listen. Tap what you hear",
                bn: "শুনুন। যা শুনলেন তা সাজান",
                ta: "கேளுங்கள். கேட்டதைத் தட்டுங்கள்",
                hi: "सुनिए। जो सुना, उसे लगाइए",
            },
            practises: ["v-cupboard"],
            phraseId: "p-hh-where",
            tokens: ["Where", "do", "I", "put", "this", "mop", "iron"],
            grading: { mode: "keywords", keywords: ["where", "put"] },
        },
        {
            id: "hh-7-dialogue-show",
            type: "dialogueChoice",
            instruction: {
                en: "What do you say?",
                bn: "আপনি কী বলবেন?",
                ta: "நீங்கள் என்ன சொல்வீர்கள்?",
                hi: "आप क्या कहेंगे?",
            },
            practises: ["v-iron"],
            situation: {
                en: "There is a new iron at home. You do not know how to use it.",
                bn: "বাড়িতে একটা নতুন ইস্ত্রি এসেছে। আপনি এটা চালাতে জানেন না।",
                ta: "வீட்டில் ஒரு புதிய இஸ்திரிப் பெட்டி உள்ளது. அதை எப்படிப் பயன்படுத்துவது என்று உங்களுக்குத் தெரியாது.",
                hi: "घर में एक नई इस्त्री आई है। आपको उसे चलाना नहीं आता।",
            },
            line: "Please iron these shirts today.",
            lineMeaning: {
                en: "Your employer asks you to iron the shirts.",
                bn: "নিয়োগকর্তা শার্টগুলো ইস্ত্রি করতে বলছেন।",
                ta: "சட்டைகளை இஸ்திரி செய்யும்படி முதலாளி கேட்கிறார்.",
                hi: "नियोक्ता क़मीज़ों पर इस्त्री करने को कह रहे हैं।",
            },
            phraseId: "p-hh-show",
            distractors: [
                { id: "d-finished", phraseId: "p-hh-finished" },
                { id: "d-where", phraseId: "p-hh-where" },
            ],
            grading: { mode: "choice" },
        },
        {
            id: "hh-8-translate",
            type: "translateWordBank",
            instruction: {
                en: "Say this in English",
                bn: "এটি ইংরেজিতে বলুন",
                ta: "இதை ஆங்கிலத்தில் சொல்லுங்கள்",
                hi: "इसे अंग्रेज़ी में कहिए",
            },
            practises: ["v-dishes"],
            prompt: {
                en: "Sorry, I broke a plate.",
                bn: "দুঃখিত, আমি একটা থালা ভেঙে ফেলেছি।",
                ta: "மன்னிக்கவும், நான் ஒரு தட்டை உடைத்துவிட்டேன்.",
                hi: "माफ़ कीजिए, मुझसे एक थाली टूट गई।",
            },
            phraseId: "p-hh-broke",
            tokens: ["Sorry", "I", "broke", "a", "plate", "mop", "laundry"],
            grading: { mode: "keywords", keywords: ["broke", "plate"] },
        },
        {
            id: "hh-9-fill",
            type: "fillBlank",
            instruction: {
                en: "Fill in the missing word",
                bn: "খালি জায়গায় শব্দ বসান",
                ta: "விடுபட்ட சொல்லை நிரப்புங்கள்",
                hi: "छूटा हुआ शब्द भरें",
            },
            practises: ["v-fridge"],
            sentence: ["Put the milk in the", null, "now."],
            choices: [
                { id: "f-fridge", label: "fridge" },
                { id: "f-mop", label: "mop" },
                { id: "f-laundry", label: "laundry" },
            ],
            correctChoiceId: "f-fridge",
            grading: { mode: "choice" },
        },
    ],

    speaking: {
        scene: "The learner is a domestic worker in a flat in Singapore, talking to the employer at home. You are the employer: patient and kind, and happy to help someone who speaks little English.",
        names: [],
        goals: [
            { id: "say-hh-next", phraseId: "p-hh-next", keywords: ["do", "next"] },
            { id: "say-hh-where", phraseId: "p-hh-where", keywords: ["where", "put"] },
            { id: "say-hh-show", phraseId: "p-hh-show", keywords: ["show"] },
            { id: "say-hh-finished", phraseId: "p-hh-finished", keywords: ["finished", "laundry"] },
        ],
    },
};
