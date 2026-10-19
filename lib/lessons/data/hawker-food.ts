/**
 * Lesson: "Buying food".
 *
 * Ordering at a hawker centre stall is the most frequent English exchange a
 * worker has, and one where a few words go a long way. The lesson covers the
 * order, take away or eat here, the price, and asking for less chilli.
 *
 * Every Bengali, Tamil and Hindi string is `reviewed: false` and must be
 * checked by a native speaker before real learners see it.
 */

import type { Lesson } from "../types";

export const hawkerFood: Lesson = {
    id: "hawker-food",
    title: {
        en: "Buying food",
        bn: "খাবার কেনা",
        ta: "உணவு வாங்குவது",
        hi: "खाना ख़रीदना",
    },
    goal: {
        en: "Order at a food stall, ask the price, and say how you want it.",
        bn: "খাবারের দোকানে অর্ডার করা, দাম জিজ্ঞাসা করা, আর কীভাবে চান তা বলা।",
        ta: "உணவுக் கடையில் ஆர்டர் செய்வது, விலை கேட்பது, எப்படி வேண்டும் என்று சொல்வது.",
        hi: "खाने की दुकान पर ऑर्डर करना, दाम पूछना, और कैसा चाहिए यह बताना।",
    },
    icon: "food",
    level: "beginner",
    estimatedMinutes: 5,

    notes: [
        {
            id: "note-hawker",
            text: {
                en: "At a hawker centre, you order at the stall, pay, and carry the food to a table yourself.",
                bn: "হকার সেন্টারে দোকানে অর্ডার করে টাকা দিন, তারপর নিজেই খাবার টেবিলে নিয়ে যান।",
                ta: "ஹாக்கர் சென்டரில் கடையில் ஆர்டர் செய்து, பணம் கொடுத்து, உணவை நீங்களே மேசைக்கு எடுத்துச் செல்ல வேண்டும்.",
                hi: "हॉकर सेंटर में दुकान पर ऑर्डर करें, पैसे दें, और खाना ख़ुद टेबल तक ले जाएँ।",
            },
            reviewed: false,
        },
        {
            id: "note-tray",
            text: {
                en: "After eating, return your tray and plates to the tray return point. It is the rule, and there can be a fine.",
                bn: "খাওয়ার পরে ট্রে আর প্লেট ট্রে ফেরত দেওয়ার জায়গায় রেখে আসুন। এটি নিয়ম, না মানলে জরিমানা হতে পারে।",
                ta: "சாப்பிட்ட பிறகு தட்டு, கிண்ணங்களைத் தட்டு திரும்பக் கொடுக்கும் இடத்தில் வையுங்கள். இது விதி; அபராதம் வரலாம்.",
                hi: "खाने के बाद ट्रे और प्लेट ट्रे लौटाने की जगह पर रखें। यह नियम है, और जुर्माना लग सकता है।",
            },
            reviewed: false,
        },
        {
            id: "note-take-away",
            text: {
                en: 'Say "take away" to bring the food home. Some stalls charge a little more for the box.',
                bn: 'খাবার বাড়িতে নিতে চাইলে বলুন "take away"। কিছু দোকান বাক্সের জন্য একটু বেশি নেয়।',
                ta: 'உணவை வீட்டிற்கு எடுத்துச் செல்ல "take away" என்று சொல்லுங்கள். சில கடைகள் பெட்டிக்குச் சிறிது கூடுதல் வாங்கும்.',
                hi: 'खाना घर ले जाना हो तो "take away" कहें। कुछ दुकानें डिब्बे के लिए थोड़ा ज़्यादा लेती हैं।',
            },
            reviewed: false,
        },
        {
            id: "note-price",
            text: {
                en: "A meal at a hawker centre or coffee shop usually costs 4 to 7 dollars. Most stalls take cash, and many take PayNow.",
                bn: "হকার সেন্টার বা কফি শপে এক বেলার খাবার সাধারণত ৪ থেকে ৭ ডলার। বেশিরভাগ দোকান নগদ নেয়, অনেকে PayNow-ও নেয়।",
                ta: "ஹாக்கர் சென்டர் அல்லது காபி ஷாப்பில் ஒரு வேளை உணவு பொதுவாக 4 முதல் 7 டாலர். பெரும்பாலான கடைகள் பணம் வாங்கும்; பல கடைகள் PayNow-வும் வாங்கும்.",
                hi: "हॉकर सेंटर या कॉफ़ी शॉप में एक खाना आमतौर पर 4 से 7 डॉलर का होता है। ज़्यादातर दुकानें नक़द लेती हैं, और कई PayNow भी।",
            },
            reviewed: false,
        },
        {
            id: "note-chope",
            text: {
                en: 'A tissue packet on a table means someone has taken that seat. People call this "chope".',
                bn: 'টেবিলে টিস্যুর প্যাকেট থাকলে বুঝবেন কেউ সেই জায়গা নিয়েছে। একে বলে "chope"।',
                ta: 'மேசையில் டிஷ்யூ பாக்கெட் இருந்தால் அந்த இடத்தை யாரோ பிடித்துவிட்டார்கள் என்று அர்த்தம். இதை "chope" என்பார்கள்.',
                hi: 'टेबल पर टिश्यू का पैकेट रखा हो तो वह सीट किसी ने ले ली है। इसे "chope" कहते हैं।',
            },
            reviewed: false,
        },
    ],

    vocab: [
        {
            id: "v-chicken-rice",
            term: "chicken rice",
            meaning: {
                en: "rice with chicken, a common Singapore meal",
                bn: "মুরগির ভাত; সিঙ্গাপুরের সাধারণ খাবার",
                ta: "சிக்கன் ரைஸ்; சிங்கப்பூரின் பொதுவான உணவு",
                hi: "चिकन राइस; सिंगापुर का आम खाना",
            },
            picture: "food",
            reviewed: false,
        },
        {
            id: "v-take-away",
            term: "take away",
            meaning: {
                en: "bring the food home in a box",
                bn: "খাবার বাক্সে করে নিয়ে যাওয়া",
                ta: "உணவைப் பெட்டியில் எடுத்துச் செல்வது",
                hi: "खाना डिब्बे में पैक करके ले जाना",
            },
            picture: "bag",
            reviewed: false,
        },
        {
            id: "v-spicy",
            term: "spicy",
            meaning: {
                en: "hot, with chilli",
                bn: "ঝাল",
                ta: "காரம்",
                hi: "तीखा; मिर्च वाला",
            },
            picture: "flame",
            reviewed: false,
        },
        {
            id: "v-how-much",
            term: "how much",
            meaning: {
                en: "what is the price",
                bn: "দাম কত",
                ta: "விலை என்ன",
                hi: "दाम कितना",
            },
            picture: "price",
            reviewed: false,
        },
        {
            id: "v-drink",
            term: "drink",
            meaning: {
                en: "something to drink, like tea or juice",
                bn: "পানীয়; যেমন চা বা জুস",
                ta: "பானம்; தேநீர் அல்லது ஜூஸ் போன்றது",
                hi: "पीने की चीज़, जैसे चाय या जूस",
            },
            picture: "drink",
            reviewed: false,
        },
        {
            id: "v-cash",
            term: "cash",
            meaning: {
                en: "paper money and coins",
                bn: "নগদ টাকা",
                ta: "ரொக்கப் பணம்",
                hi: "नक़द पैसे",
            },
            picture: "money",
            reviewed: false,
        },
        {
            id: "v-stall",
            term: "stall",
            meaning: {
                en: "one small shop inside a hawker centre",
                bn: "হকার সেন্টারের ভেতরের ছোট দোকান",
                ta: "ஹாக்கர் சென்டருக்குள் இருக்கும் சிறிய கடை",
                hi: "हॉकर सेंटर के अंदर की छोटी दुकान",
            },
            picture: "stall",
            reviewed: false,
        },
        {
            id: "v-less",
            term: "less",
            meaning: {
                en: "a smaller amount",
                bn: "কম",
                ta: "குறைவாக",
                hi: "कम",
            },
            reviewed: false,
        },
    ],

    phrases: [
        {
            id: "p-one-chicken-rice",
            text: "One chicken rice, take away.",
            meaning: {
                en: "Ordering one chicken rice to bring home.",
                bn: "একটা মুরগির ভাত, নিয়ে যাওয়ার জন্য।",
                ta: "ஒரு சிக்கன் ரைஸ், எடுத்துச் செல்ல.",
                hi: "एक चिकन राइस, पैक करके।",
            },
            reviewed: false,
        },
        {
            id: "p-take-away",
            text: "Take away, please.",
            meaning: {
                en: "Saying you want the food in a box, not on a plate.",
                bn: "খাবার প্লেটে নয়, বাক্সে চাই বলা।",
                ta: "உணவு தட்டில் அல்ல, பெட்டியில் வேண்டும் என்று சொல்வது.",
                hi: "यह कहना कि खाना प्लेट में नहीं, डिब्बे में चाहिए।",
            },
            reviewed: false,
        },
        {
            id: "p-how-much",
            text: "How much?",
            meaning: {
                en: "Asking the price.",
                bn: "দাম কত?",
                ta: "விலை என்ன?",
                hi: "कितने का है?",
            },
            reviewed: false,
        },
        {
            id: "p-less-spicy",
            text: "Less spicy, please.",
            meaning: {
                en: "Asking for less chilli.",
                bn: "ঝাল কম দিন।",
                ta: "காரம் குறைவாக, ப்ளீஸ்.",
                hi: "कम तीखा दीजिए।",
            },
            reviewed: false,
        },
        {
            id: "p-one-drink",
            text: "One drink, no ice.",
            meaning: {
                en: "Ordering a drink without ice.",
                bn: "একটা পানীয়, বরফ ছাড়া।",
                ta: "ஒரு பானம், ஐஸ் இல்லாமல்.",
                hi: "एक ड्रिंक, बिना बर्फ़ के।",
            },
            reviewed: false,
        },
    ],

    exercises: [
        {
            id: "hf-0-picture",
            type: "selectPicture",
            instruction: {
                en: "Which one is this?",
                bn: "এটি কোনটি?",
                ta: "இது எது?",
                hi: "यह कौन-सा है?",
            },
            practises: ["v-chicken-rice"],
            vocabId: "v-chicken-rice",
            choiceVocabIds: ["v-chicken-rice", "v-drink", "v-take-away"],
            grading: { mode: "choice" },
        },
        {
            id: "hf-1-pairs",
            type: "matchPairs",
            instruction: {
                en: "Tap the pairs",
                bn: "জোড়া মেলান",
                ta: "ஜோடிகளைத் தட்டுங்கள்",
                hi: "जोड़ी मिलाएँ",
            },
            practises: ["v-chicken-rice", "v-take-away", "v-spicy", "v-how-much"],
            vocabIds: ["v-chicken-rice", "v-take-away", "v-spicy", "v-how-much"],
            grading: { mode: "pairs" },
        },
        {
            id: "hf-2-listen",
            type: "listenChooseMeaning",
            instruction: {
                en: "Listen. What does it mean?",
                bn: "শুনুন। এর মানে কী?",
                ta: "கேளுங்கள். இதன் பொருள் என்ன?",
                hi: "सुनिए। इसका मतलब क्या है?",
            },
            practises: ["v-take-away"],
            audioText: "take away",
            choices: [
                { id: "c-correct", vocabId: "v-take-away" },
                {
                    id: "c-wrong-1",
                    label: {
                        en: "eat here, at a table",
                        bn: "এখানে টেবিলে বসে খাওয়া",
                        ta: "இங்கே மேசையில் சாப்பிடுவது",
                        hi: "यहीं टेबल पर खाना",
                    },
                },
                { id: "c-wrong-2", vocabId: "v-stall" },
            ],
            correctChoiceId: "c-correct",
            grading: { mode: "choice" },
        },
        {
            id: "hf-3-picture-word",
            type: "pictureToWord",
            instruction: {
                en: "What is this called?",
                bn: "এটাকে কী বলে?",
                ta: "இதை என்ன என்று சொல்வார்கள்?",
                hi: "इसे क्या कहते हैं?",
            },
            practises: ["v-drink"],
            vocabId: "v-drink",
            choiceVocabIds: ["v-drink", "v-spicy", "v-cash"],
            grading: { mode: "choice" },
        },
        {
            id: "hf-4-dialogue",
            type: "dialogueChoice",
            instruction: {
                en: "What do you say?",
                bn: "আপনি কী বলবেন?",
                ta: "நீங்கள் என்ன சொல்வீர்கள்?",
                hi: "आप क्या कहेंगे?",
            },
            practises: ["v-take-away"],
            situation: {
                en: "You are at a food stall. You want to eat at home.",
                bn: "আপনি খাবারের দোকানে। আপনি বাড়িতে খেতে চান।",
                ta: "நீங்கள் உணவுக் கடையில். வீட்டில் சாப்பிட விரும்புகிறீர்கள்.",
                hi: "आप खाने की दुकान पर हैं। आप घर पर खाना चाहते हैं।",
            },
            line: "Eat here or take away?",
            lineMeaning: {
                en: "The seller asks if you will eat here or bring it home.",
                bn: "বিক্রেতা জিজ্ঞাসা করছেন এখানে খাবেন না নিয়ে যাবেন।",
                ta: "இங்கே சாப்பிடுவீர்களா அல்லது எடுத்துச் செல்வீர்களா என்று விற்பவர் கேட்கிறார்.",
                hi: "दुकानदार पूछ रहा है कि यहीं खाएँगे या ले जाएँगे।",
            },
            phraseId: "p-take-away",
            distractors: [
                { id: "d-how-much", phraseId: "p-how-much" },
                { id: "d-spicy", phraseId: "p-less-spicy" },
            ],
            grading: { mode: "choice" },
        },
        {
            id: "hf-5-arrange",
            type: "arrangeWords",
            instruction: {
                en: "Put the words in order",
                bn: "শব্দগুলো সাজান",
                ta: "சொற்களை வரிசைப்படுத்துங்கள்",
                hi: "शब्दों को क्रम में लगाएँ",
            },
            practises: ["v-drink"],
            phraseId: "p-one-drink",
            tokens: ["One", "drink", "no", "ice"],
            grading: { mode: "keywords", keywords: ["drink", "no", "ice"] },
        },
        {
            id: "hf-6-listen-arrange",
            type: "listenArrangeWords",
            instruction: {
                en: "Listen. Tap what you hear",
                bn: "শুনুন। যা শুনলেন তা সাজান",
                ta: "கேளுங்கள். கேட்டதைத் தட்டுங்கள்",
                hi: "सुनिए। जो सुना, उसे लगाइए",
            },
            practises: ["v-spicy", "v-less"],
            phraseId: "p-less-spicy",
            tokens: ["Less", "spicy", "please", "drink", "cash"],
            grading: { mode: "keywords", keywords: ["less", "spicy"] },
        },
        {
            id: "hf-7-dialogue-order",
            type: "dialogueChoice",
            instruction: {
                en: "What do you say?",
                bn: "আপনি কী বলবেন?",
                ta: "நீங்கள் என்ன சொல்வீர்கள்?",
                hi: "आप क्या कहेंगे?",
            },
            practises: ["v-chicken-rice"],
            situation: {
                en: "It is your turn at the chicken rice stall.",
                bn: "মুরগির ভাতের দোকানে এখন আপনার পালা।",
                ta: "சிக்கன் ரைஸ் கடையில் இப்போது உங்கள் முறை.",
                hi: "चिकन राइस की दुकान पर अब आपकी बारी है।",
            },
            line: "Yes, what do you want?",
            lineMeaning: {
                en: "The seller asks for your order.",
                bn: "বিক্রেতা আপনার অর্ডার জানতে চাইছেন।",
                ta: "விற்பவர் உங்கள் ஆர்டரைக் கேட்கிறார்.",
                hi: "दुकानदार आपका ऑर्डर पूछ रहा है।",
            },
            phraseId: "p-one-chicken-rice",
            distractors: [
                { id: "d-how-much-2", phraseId: "p-how-much" },
                {
                    id: "d-thanks",
                    text: "Thank you, uncle.",
                    meaning: {
                        en: "Saying thank you to an older man.",
                        bn: "বয়স্ক লোককে ধন্যবাদ বলা।",
                        ta: "வயதான ஆணுக்கு நன்றி சொல்வது.",
                        hi: "बड़ी उम्र के आदमी को धन्यवाद कहना।",
                    },
                },
            ],
            grading: { mode: "choice" },
        },
        {
            id: "hf-8-translate",
            type: "translateWordBank",
            instruction: {
                en: "Say this in English",
                bn: "এটি ইংরেজিতে বলুন",
                ta: "இதை ஆங்கிலத்தில் சொல்லுங்கள்",
                hi: "इसे अंग्रेज़ी में कहिए",
            },
            practises: ["v-how-much"],
            prompt: {
                en: "How much?",
                bn: "দাম কত?",
                ta: "விலை என்ன?",
                hi: "कितने का है?",
            },
            phraseId: "p-how-much",
            tokens: ["How", "much", "many", "spicy", "drink"],
            grading: { mode: "keywords", keywords: ["how much"] },
        },
        {
            id: "hf-9-fill",
            type: "fillBlank",
            instruction: {
                en: "Fill in the missing word",
                bn: "খালি জায়গায় শব্দ বসান",
                ta: "விடுபட்ட சொல்லை நிரப்புங்கள்",
                hi: "छूटा हुआ शब्द भरें",
            },
            practises: ["v-drink"],
            sentence: ["One", null, ", no ice."],
            choices: [
                { id: "f-drink", label: "drink" },
                { id: "f-rice", label: "rice" },
                { id: "f-spicy", label: "spicy" },
            ],
            correctChoiceId: "f-drink",
            grading: { mode: "choice" },
        },
    ],

    speaking: {
        scene: "The learner is at a chicken rice stall in a hawker centre in Singapore at lunchtime. You are the stall owner: busy but friendly, and happy to help a customer who speaks little English.",
        names: [],
        goals: [
            {
                id: "say-order",
                phraseId: "p-one-chicken-rice",
                keywords: ["chicken rice", "take away"],
            },
            { id: "say-how-much", phraseId: "p-how-much", keywords: ["how much"] },
            { id: "say-spicy", phraseId: "p-less-spicy", keywords: ["less", "spicy"] },
            { id: "say-drink", phraseId: "p-one-drink", keywords: ["drink", "ice"] },
        ],
    },
};
