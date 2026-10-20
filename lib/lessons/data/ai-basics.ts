/**
 * Lesson: "AI Words".
 *
 * Stands in for `GET /v1/lessons/ai-basics`. Nothing imports this except
 * `data/index.ts`, so replacing it with a fetch is a one-file change.
 *
 * Content notes:
 * - Written for a workshop of adults who already speak English well. It teaches
 *   the vocabulary of AI, not English, so it leaves out the listening and
 *   translation exercises: hearing a word or reordering a sentence is no work
 *   for a fluent speaker.
 * - Most fill-in-the-blank items describe an everyday situation and ask which
 *   AI word names it. Recognising the idea in the wild is the useful skill.
 * - The words lead into the workshop's hands-on part: chatting to an AI, talking
 *   to one by voice, generating images, and taking photos for it to recognise.
 * - After the exercises the learner tries prompting LINK Assistant (see
 *   `chatPractice`), which is the workshop's way forward; speaking comes second.
 * - The AI words stay English, but everything that explains them is in the
 *   learner's language, as in every other lesson. Every Bengali, Tamil and
 *   Hindi string (and its rows in `contentCopy.ts`) is `reviewed: false` and
 *   must be checked by a native speaker before real learners see it.
 */

import type { Lesson } from "../types";

export const aiBasics: Lesson = {
    id: "ai-basics",
    title: {
        en: "AI Words",
        bn: "AI-এর শব্দ",
        ta: "AI சொற்கள்",
        hi: "AI के शब्द",
    },
    goal: {
        en: "Know the key words people use when they talk about AI.",
        bn: "AI নিয়ে কথা বলার সময় লোকে যে মূল শব্দগুলো ব্যবহার করে, সেগুলো জানা।",
        ta: "AI பற்றிப் பேசும்போது மக்கள் பயன்படுத்தும் முக்கியச் சொற்களைத் தெரிந்துகொள்வது.",
        hi: "AI के बारे में बात करते समय लोग जो मुख्य शब्द इस्तेमाल करते हैं, उन्हें जानना।",
    },
    icon: "ai",
    level: "beginner",
    estimatedMinutes: 10,

    // The word list on the intro page does the teaching.
    notes: [],

    vocab: [
        {
            id: "v-ai",
            term: "artificial intelligence (AI)",
            meaning: {
                en: "computer programs that can do tasks that usually need a human mind",
                bn: "কম্পিউটার প্রোগ্রাম, যা এমন কাজ করতে পারে যা সাধারণত মানুষকে মাথা খাটিয়ে করতে হয়",
                ta: "பொதுவாக மனித மூளை தேவைப்படும் வேலைகளைச் செய்யக்கூடிய கம்ப்யூட்டர் புரோகிராம்கள்",
                hi: "कंप्यूटर प्रोग्राम जो ऐसे काम कर सकते हैं जिनके लिए आमतौर पर इंसानी दिमाग़ चाहिए",
            },
            picture: "artificialIntelligence",
            reviewed: false,
        },
        {
            id: "v-machine-learning",
            term: "machine learning",
            meaning: {
                en: "how an AI gets better by learning patterns from lots of examples",
                bn: "অনেক উদাহরণ থেকে প্যাটার্ন শিখে AI যেভাবে আরও ভালো হয়ে ওঠে",
                ta: "நிறைய உதாரணங்களிலிருந்து பேட்டர்ன்களைக் கற்று, AI மேலும் சிறப்பாகும் விதம்",
                hi: "जिस तरह AI बहुत सारे उदाहरणों से पैटर्न सीखकर बेहतर होता जाता है",
            },
            picture: "machineLearning",
            reviewed: false,
        },
        {
            id: "v-training-data",
            term: "training data",
            meaning: {
                en: "the examples (text, photos, recordings) an AI learns from",
                bn: "যে উদাহরণগুলো (লেখা, ছবি, রেকর্ডিং) থেকে AI শেখে",
                ta: "AI கற்றுக்கொள்ளும் உதாரணங்கள் (எழுத்து, புகைப்படங்கள், பதிவுகள்)",
                hi: "वे उदाहरण (लिखी बातें, फ़ोटो, रिकॉर्डिंग) जिनसे AI सीखता है",
            },
            picture: "trainingData",
            reviewed: false,
        },
        {
            id: "v-chatbot",
            term: "chatbot",
            meaning: {
                en: "an AI you have a conversation with by typing, like ChatGPT or Gemini",
                bn: "যে AI-এর সাথে আপনি টাইপ করে কথা বলেন, যেমন ChatGPT বা Gemini",
                ta: "டைப் செய்து நீங்கள் உரையாடும் AI; ChatGPT அல்லது Gemini போன்றது",
                hi: "ऐसा AI जिससे आप टाइप करके बात करते हैं, जैसे ChatGPT या Gemini",
            },
            picture: "chatbot",
            reviewed: false,
        },
        {
            id: "v-prompt",
            term: "prompt",
            meaning: {
                en: "the question or instruction you type or say to an AI",
                bn: "যে প্রশ্ন বা নির্দেশ আপনি AI-কে টাইপ করে দেন বা মুখে বলেন",
                ta: "நீங்கள் AI-இடம் டைப் செய்யும் அல்லது சொல்லும் கேள்வி அல்லது கட்டளை",
                hi: "वह सवाल या निर्देश जो आप AI को टाइप करके या बोलकर देते हैं",
            },
            picture: "prompt",
            reviewed: false,
        },
        {
            id: "v-generative-ai",
            term: "generative AI",
            meaning: {
                en: "AI that creates new things: text, pictures, music or video",
                bn: "যে AI নতুন জিনিস তৈরি করে: লেখা, ছবি, গান বা ভিডিও",
                ta: "புதிய விஷயங்களை உருவாக்கும் AI: எழுத்து, படங்கள், இசை அல்லது வீடியோ",
                hi: "AI जो नई चीज़ें बनाता है: लिखी बातें, तस्वीरें, संगीत या वीडियो",
            },
            picture: "generativeAi",
            reviewed: false,
        },
        {
            id: "v-voice-assistant",
            term: "voice assistant",
            meaning: {
                en: "an AI that listens to your voice and answers out loud, like Siri",
                bn: "যে AI আপনার কথা শুনে মুখে উত্তর দেয়, যেমন Siri",
                ta: "உங்கள் குரலைக் கேட்டு, சத்தமாகப் பதில் சொல்லும் AI; Siri போன்றது",
                hi: "AI जो आपकी आवाज़ सुनता है और बोलकर जवाब देता है, जैसे Siri",
            },
            picture: "voiceAssistant",
            reviewed: false,
        },
        {
            id: "v-image-recognition",
            term: "image recognition",
            meaning: {
                en: "AI that can tell what is in a photo",
                bn: "যে AI ছবি দেখে বলতে পারে তাতে কী আছে",
                ta: "புகைப்படத்தில் என்ன இருக்கிறது என்று சொல்லக்கூடிய AI",
                hi: "AI जो फ़ोटो देखकर बता सकता है कि उसमें क्या है",
            },
            picture: "imageRecognition",
            reviewed: false,
        },
        {
            id: "v-hallucination",
            term: "hallucination",
            meaning: {
                en: "when an AI confidently gives an answer that is made up or wrong",
                bn: "যখন AI খুব নিশ্চিতভাবে এমন উত্তর দেয় যা বানানো বা ভুল",
                ta: "AI முழு நம்பிக்கையுடன் இட்டுக்கட்டிய அல்லது தவறான பதிலைச் சொல்வது",
                hi: "जब AI पूरे यक़ीन के साथ ऐसा जवाब दे जो मनगढ़ंत या ग़लत हो",
            },
            picture: "hallucination",
            reviewed: false,
        },
    ],

    phrases: [
        {
            id: "p-hallucination",
            text: "That's an AI hallucination.",
            meaning: {
                en: "Saying the AI gave a confident answer that was false.",
                bn: "AI খুব নিশ্চিতভাবে একটা ভুল উত্তর দিয়েছে, তা বলা।",
                ta: "AI முழு நம்பிக்கையுடன் சொன்ன பதில் தவறு என்று சொல்வது.",
                hi: "यह कहना कि AI ने पूरे यक़ीन से ग़लत जवाब दिया।",
            },
            reviewed: false,
        },
        {
            id: "p-clearer-prompt",
            text: "Try giving it a clearer prompt.",
            meaning: {
                en: "Suggesting a more detailed question to get a better answer.",
                bn: "ভালো উত্তর পেতে আরও বিস্তারিত করে প্রশ্ন করার পরামর্শ দেওয়া।",
                ta: "நல்ல பதில் கிடைக்க, இன்னும் விவரமாகக் கேள்வி கேட்கச் சொல்வது.",
                hi: "बेहतर जवाब पाने के लिए और विस्तार से सवाल पूछने की सलाह देना।",
            },
            reviewed: false,
        },
    ],

    exercises: [
        // 1. An easy start: pick the picture. The other tiles are words this
        //    lesson also teaches.
        {
            id: "ai-ex-1-picture",
            type: "selectPicture",
            instruction: {
                en: "Which one is a chatbot?",
                bn: "কোনটি chatbot?",
                ta: "இவற்றில் chatbot எது?",
                hi: "इनमें से chatbot कौन-सा है?",
            },
            practises: ["v-chatbot"],
            vocabId: "v-chatbot",
            choiceVocabIds: ["v-voice-assistant", "v-chatbot", "v-image-recognition"],
            grading: { mode: "choice" },
        },

        // 2. The basic words, matched to their meanings.
        {
            id: "ai-ex-2-pairs",
            type: "matchPairs",
            instruction: {
                en: "Tap the pairs",
                bn: "জোড়া মেলান",
                ta: "ஜோடிகளைத் தட்டுங்கள்",
                hi: "जोड़ी मिलाएँ",
            },
            practises: ["v-ai", "v-chatbot", "v-prompt", "v-training-data"],
            vocabIds: ["v-ai", "v-chatbot", "v-prompt", "v-training-data"],
            grading: { mode: "pairs" },
        },

        // 3. A real situation: which word names it? Fill-blank tiles are shown
        //    in the order written, so the answer's position varies by item.
        {
            id: "ai-ex-3-fill",
            type: "fillBlank",
            instruction: {
                en: "Which word fits?",
                bn: "কোন শব্দটি বসবে?",
                ta: "எந்தச் சொல் பொருந்தும்?",
                hi: "कौन-सा शब्द सही बैठता है?",
            },
            practises: ["v-prompt"],
            sentence: ['You type "Write a birthday message for my mum." That message is your', null],
            choices: [
                { id: "f-training-data", label: "training data" },
                { id: "f-prompt", label: "prompt" },
                { id: "f-chatbot", label: "chatbot" },
            ],
            correctChoiceId: "f-prompt",
            grading: { mode: "choice" },
        },

        // 4. Recall: see it, name it.
        {
            id: "ai-ex-4-picture-word",
            type: "pictureToWord",
            instruction: {
                en: "What is this called?",
                bn: "এটাকে কী বলে?",
                ta: "இதை என்ன என்று சொல்வார்கள்?",
                hi: "इसे क्या कहते हैं?",
            },
            practises: ["v-voice-assistant"],
            vocabId: "v-voice-assistant",
            choiceVocabIds: ["v-voice-assistant", "v-chatbot", "v-image-recognition"],
            grading: { mode: "choice" },
        },

        // 5. The second set of words: what AI can do.
        {
            id: "ai-ex-5-pairs",
            type: "matchPairs",
            instruction: {
                en: "Tap the pairs",
                bn: "জোড়া মেলান",
                ta: "ஜோடிகளைத் தட்டுங்கள்",
                hi: "जोड़ी मिलाएँ",
            },
            practises: ["v-machine-learning", "v-generative-ai", "v-voice-assistant", "v-image-recognition"],
            vocabIds: ["v-machine-learning", "v-generative-ai", "v-voice-assistant", "v-image-recognition"],
            grading: { mode: "pairs" },
        },

        // 6–7. Two situations where the right word takes some telling apart.
        {
            id: "ai-ex-6-fill",
            type: "fillBlank",
            instruction: {
                en: "Which word fits?",
                bn: "কোন শব্দটি বসবে?",
                ta: "எந்தச் சொல் பொருந்தும்?",
                hi: "कौन-सा शब्द सही बैठता है?",
            },
            practises: ["v-image-recognition"],
            sentence: ["You point your phone at a flower and it tells you the flower's name. That's", null],
            choices: [
                { id: "f-generative-ai", label: "generative AI" },
                { id: "f-machine-learning", label: "machine learning" },
                { id: "f-image-recognition", label: "image recognition" },
            ],
            correctChoiceId: "f-image-recognition",
            grading: { mode: "choice" },
        },
        {
            id: "ai-ex-7-fill",
            type: "fillBlank",
            instruction: {
                en: "Which word fits?",
                bn: "কোন শব্দটি বসবে?",
                ta: "எந்தச் சொல் பொருந்தும்?",
                hi: "कौन-सा शब्द सही बैठता है?",
            },
            practises: ["v-generative-ai"],
            sentence: ["An app makes a brand-new picture of a cat in space from your words. That's", null],
            choices: [
                { id: "f-image-recognition", label: "image recognition" },
                { id: "f-generative-ai", label: "generative AI" },
                { id: "f-machine-learning", label: "machine learning" },
            ],
            correctChoiceId: "f-generative-ai",
            grading: { mode: "choice" },
        },

        // 8–9. A friend describes something; reply with the right word.
        {
            id: "ai-ex-8-dialogue",
            type: "dialogueChoice",
            instruction: {
                en: "What do you say?",
                bn: "আপনি কী বলবেন?",
                ta: "நீங்கள் என்ன சொல்வீர்கள்?",
                hi: "आप क्या कहेंगे?",
            },
            practises: ["v-hallucination"],
            situation: {
                en: "Your friend has been using a chatbot and looks confused.",
                bn: "আপনার বন্ধু একটা chatbot ব্যবহার করছিলেন, এখন তিনি ধাঁধায় পড়ে গেছেন।",
                ta: "உங்கள் நண்பர் ஒரு chatbot-ஐப் பயன்படுத்திக்கொண்டிருந்தார். இப்போது குழப்பத்தில் இருக்கிறார்.",
                hi: "आपका दोस्त एक chatbot इस्तेमाल कर रहा था और अब उलझन में दिख रहा है।",
            },
            line: "I asked the chatbot for a book to read, but the book doesn't exist!",
            lineMeaning: {
                en: "Your friend searched for the book and could not find it anywhere.",
                bn: "আপনার বন্ধু বইটা খুঁজেছেন, কিন্তু কোথাও পাননি।",
                ta: "உங்கள் நண்பர் அந்தப் புத்தகத்தைத் தேடினார், ஆனால் எங்குமே கிடைக்கவில்லை.",
                hi: "आपके दोस्त ने वह किताब ढूँढी, पर वह कहीं नहीं मिली।",
            },
            phraseId: "p-hallucination",
            distractors: [
                {
                    id: "d-voice-assistant",
                    text: "That's a voice assistant.",
                    meaning: {
                        en: "Saying it was an AI that answers out loud.",
                        bn: "এটা ছিল মুখে উত্তর দেওয়া একটা AI, তা বলা।",
                        ta: "அது சத்தமாகப் பதில் சொல்லும் AI என்று சொல்வது.",
                        hi: "यह कहना कि यह बोलकर जवाब देने वाला AI था।",
                    },
                },
                {
                    id: "d-training-data",
                    text: "That's training data.",
                    meaning: {
                        en: "Saying it was the examples the AI learned from.",
                        bn: "এগুলো সেই উদাহরণ যা থেকে AI শিখেছে, তা বলা।",
                        ta: "அவை AI கற்றுக்கொண்ட உதாரணங்கள் என்று சொல்வது.",
                        hi: "यह कहना कि ये वे उदाहरण थे जिनसे AI ने सीखा।",
                    },
                },
            ],
            grading: { mode: "choice" },
        },
        {
            id: "ai-ex-9-dialogue",
            type: "dialogueChoice",
            instruction: {
                en: "What do you say?",
                bn: "আপনি কী বলবেন?",
                ta: "நீங்கள் என்ன சொல்வீர்கள்?",
                hi: "आप क्या कहेंगे?",
            },
            practises: ["v-prompt", "v-chatbot"],
            situation: {
                en: "Your friend asked a chatbot to plan a trip.",
                bn: "আপনার বন্ধু একটা chatbot-কে বেড়াতে যাওয়ার প্ল্যান করে দিতে বলেছিলেন।",
                ta: "உங்கள் நண்பர் ஒரு பயணத்தைத் திட்டமிட்டுத் தரும்படி chatbot-இடம் கேட்டார்.",
                hi: "आपके दोस्त ने एक chatbot से घूमने जाने का प्लान बनाने को कहा।",
            },
            line: "The chatbot's answer was way too vague.",
            lineMeaning: {
                en: "The answer did not have enough detail to be useful.",
                bn: "উত্তরে যথেষ্ট খুঁটিনাটি ছিল না, তাই কাজে লাগেনি।",
                ta: "பதிலில் போதுமான விவரம் இல்லை; அதனால் பயன்படவில்லை.",
                hi: "जवाब में इतनी जानकारी नहीं थी कि वह काम आ सके।",
            },
            phraseId: "p-clearer-prompt",
            distractors: [
                {
                    id: "d-more-data",
                    text: "Give it more training data.",
                    meaning: {
                        en: "Suggesting they change what the AI learned from.",
                        bn: "AI যা থেকে শিখেছে, তা বদলানোর পরামর্শ দেওয়া।",
                        ta: "AI எதிலிருந்து கற்றுக்கொண்டதோ, அதை மாற்றச் சொல்வது.",
                        hi: "AI ने जिससे सीखा, उसे बदलने की सलाह देना।",
                    },
                },
                {
                    id: "d-image-recognition",
                    text: "Use image recognition.",
                    meaning: {
                        en: "Suggesting they use an AI that reads photos.",
                        bn: "ছবি দেখে বুঝতে পারে এমন AI ব্যবহারের পরামর্শ দেওয়া।",
                        ta: "புகைப்படங்களைப் புரிந்துகொள்ளும் AI-ஐப் பயன்படுத்தச் சொல்வது.",
                        hi: "फ़ोटो देखकर समझने वाला AI इस्तेमाल करने की सलाह देना।",
                    },
                },
            ],
            grading: { mode: "choice" },
        },

        // 10. Ends on an easier item, as every lesson does.
        {
            id: "ai-ex-10-fill",
            type: "fillBlank",
            instruction: {
                en: "Fill in the missing word",
                bn: "খালি জায়গায় শব্দ বসান",
                ta: "விடுபட்ட சொல்லை நிரப்புங்கள்",
                hi: "छूटा हुआ शब्द भरें",
            },
            practises: ["v-training-data", "v-machine-learning"],
            sentence: ["An AI learns patterns from lots of examples. Those examples are called training", null],
            choices: [
                { id: "f-prompts", label: "prompts" },
                { id: "f-chatbots", label: "chatbots" },
                { id: "f-data", label: "data" },
            ],
            correctChoiceId: "f-data",
            grading: { mode: "choice" },
        },
    ],

    // After the exercises, the learner tries prompting LINK Assistant. This is
    // what the workshop uses in place of the voice chat.
    chatPractice: {
        intro: {
            en: "A chatbot answers whatever you type, and what you type is your prompt. Try the ideas below, or ask anything you like.",
            bn:
                "আপনি যা টাইপ করেন, chatbot তার উত্তর দেয়; আপনার লেখাটাই আপনার prompt। নিচের আইডিয়াগুলো করে দেখুন, বা যা খুশি জিজ্ঞাসা করুন।",
            ta:
                "நீங்கள் எதை டைப் செய்தாலும் chatbot பதில் சொல்லும்; நீங்கள் டைப் செய்வதுதான் உங்கள் prompt. கீழே உள்ள யோசனைகளை முயன்று பாருங்கள், அல்லது விரும்பியதைக் கேளுங்கள்.",
            hi:
                "आप जो भी टाइप करें, chatbot उसका जवाब देता है; आप जो टाइप करते हैं, वही आपका prompt है। नीचे दिए आइडिया आज़माएँ, या जो चाहें पूछें।",
        },
        tips: [
            {
                en: "Say exactly what you want.",
                bn: "ঠিক কী চান, পরিষ্কার করে বলুন।",
                ta: "உங்களுக்கு என்ன வேண்டும் என்று சரியாகச் சொல்லுங்கள்.",
                hi: "ठीक-ठीक बताएँ कि आपको क्या चाहिए।",
            },
            {
                en: "Give context: who it is for, and limits like time or budget.",
                bn: "পরিস্থিতি জানান: কার জন্য, আর সময় বা বাজেটের মতো সীমা।",
                ta: "பின்னணியைச் சொல்லுங்கள்: யாருக்காக, நேரம் அல்லது பட்ஜெட் போன்ற வரம்புகள்.",
                hi: "पूरी बात बताएँ: किसके लिए है, और समय या बजट जैसी सीमाएँ।",
            },
            {
                en: "Say the format: a list, three sentences, a short message.",
                bn: "কোন আকারে চান বলুন: তালিকা, তিনটি বাক্য, ছোট মেসেজ।",
                ta: "எந்த வடிவில் வேண்டும் என்று சொல்லுங்கள்: பட்டியல், மூன்று வாக்கியங்கள், ஒரு சிறிய மெசேஜ்.",
                hi: "बताएँ कि किस रूप में चाहिए: लिस्ट, तीन वाक्य, छोटा मैसेज।",
            },
            {
                en: "Not happy with the answer? Ask a follow-up to change it.",
                bn: "উত্তর পছন্দ হয়নি? বদলাতে একটা follow-up প্রশ্ন করুন।",
                ta: "பதில் பிடிக்கவில்லையா? அதை மாற்ற ஒரு follow-up கேள்வி கேளுங்கள்.",
                hi: "जवाब पसंद नहीं आया? उसे बदलने के लिए follow-up सवाल पूछें।",
            },
        ],
        tasks: [
            {
                id: "task-explain",
                title: {
                    en: "Ask about an AI word",
                    bn: "AI-এর একটা শব্দ নিয়ে জিজ্ঞাসা করুন",
                    ta: "ஒரு AI சொல்லைப் பற்றிக் கேளுங்கள்",
                    hi: "AI के किसी शब्द के बारे में पूछें",
                },
                hint: {
                    en: "Pick any word from the lesson and ask the chatbot to explain it.",
                    bn: "পাঠ থেকে যেকোনো একটা শব্দ বেছে নিন, আর chatbot-কে সেটা বুঝিয়ে বলতে বলুন।",
                    ta: "பாடத்திலிருந்து ஏதாவது ஒரு சொல்லைத் தேர்ந்தெடுத்து, அதை விளக்கும்படி chatbot-இடம் கேளுங்கள்.",
                    hi: "पाठ से कोई भी शब्द चुनें और chatbot से उसे समझाने को कहें।",
                },
                starter: "Explain what a hallucination is in AI, in two simple sentences.",
            },
            {
                id: "task-vague",
                title: {
                    en: "Send a vague prompt",
                    bn: "একটা অস্পষ্ট prompt পাঠান",
                    ta: "தெளிவில்லாத ஒரு prompt அனுப்புங்கள்",
                    hi: "एक अस्पष्ट prompt भेजें",
                },
                hint: {
                    en: "Send this short prompt and see what comes back.",
                    bn: "এই ছোট prompt-টা পাঠান, দেখুন কী উত্তর আসে।",
                    ta: "இந்தச் சிறிய prompt-ஐ அனுப்பி, என்ன பதில் வருகிறது என்று பாருங்கள்.",
                    hi: "यह छोटा prompt भेजें और देखें क्या जवाब आता है।",
                },
                starter: "Plan a weekend.",
            },
            {
                id: "task-clear",
                title: {
                    en: "Now add the details",
                    bn: "এবার বিস্তারিত যোগ করুন",
                    ta: "இப்போது விவரங்களைச் சேருங்கள்",
                    hi: "अब पूरी जानकारी जोड़ें",
                },
                hint: {
                    en: "Same request with context, limits and a format. Compare the two answers.",
                    bn: "একই অনুরোধ, এবার পরিস্থিতি, সীমা আর আকার জানিয়ে। দুটো উত্তর মিলিয়ে দেখুন।",
                    ta:
                        "அதே கோரிக்கை, இப்போது பின்னணி, வரம்புகள், வடிவத்துடன். இரண்டு பதில்களையும் ஒப்பிட்டுப் பாருங்கள்.",
                    hi: "वही अनुरोध, पर पूरी बात, सीमाएँ और रूप बताकर। दोनों जवाबों की तुलना करें।",
                },
                starter:
                    "Plan a Saturday in Singapore for a family of four with two young kids. Our budget is $100. Give a timetable from 9am to 6pm.",
            },
            {
                id: "task-create",
                title: {
                    en: "Make something new",
                    bn: "নতুন কিছু তৈরি করুন",
                    ta: "புதிதாக ஏதாவது உருவாக்குங்கள்",
                    hi: "कुछ नया बनाएँ",
                },
                hint: {
                    en: "That's generative AI: it writes something that did not exist before.",
                    bn: "এটাই generative AI: এটা এমন কিছু লেখে যা আগে ছিল না।",
                    ta: "இதுதான் generative AI: முன்பு இல்லாத ஒன்றை அது எழுதுகிறது.",
                    hi: "यही generative AI है: यह कुछ ऐसा लिखता है जो पहले था ही नहीं।",
                },
                starter: "Write a funny four-line poem about waiting for the MRT.",
            },
            {
                id: "task-follow-up",
                title: {
                    en: "Ask a follow-up",
                    bn: "একটা follow-up প্রশ্ন করুন",
                    ta: "ஒரு follow-up கேள்வி கேளுங்கள்",
                    hi: "एक follow-up सवाल पूछें",
                },
                hint: {
                    en: "Change the last answer without starting again.",
                    bn: "আবার শুরু না করে শেষ উত্তরটা বদলান।",
                    ta: "மீண்டும் தொடங்காமல், கடைசிப் பதிலை மாற்றுங்கள்.",
                    hi: "दोबारा शुरू किए बिना पिछला जवाब बदलें।",
                },
                starter: "Make it shorter and add an emoji.",
            },
            {
                id: "task-check",
                title: {
                    en: "Check for a hallucination",
                    bn: "hallucination আছে কি না যাচাই করুন",
                    ta: "hallucination இருக்கிறதா என்று சரிபாருங்கள்",
                    hi: "देखें कहीं hallucination तो नहीं",
                },
                hint: {
                    en: "Ask for facts, then ask if it is sure. Chatbots can sound confident and still be wrong.",
                    bn: "তথ্য চান, তারপর জিজ্ঞাসা করুন সেটা নিশ্চিত কি না। খুব নিশ্চিত শোনালেও chatbot ভুল বলতে পারে।",
                    ta:
                        "சில உண்மைத் தகவல்களைக் கேட்டு, பிறகு அதற்கு உறுதியாகத் தெரியுமா என்று கேளுங்கள். உறுதியாகப் பேசினாலும் chatbot-கள் தவறாக இருக்கலாம்.",
                    hi: "तथ्य पूछें, फिर पूछें कि क्या वह पक्का है। पूरे यक़ीन से बोलकर भी chatbot ग़लत हो सकते हैं।",
                },
                starter: "Recommend three books about AI for beginners, with their authors. Are you sure they all exist?",
            },
        ],
    },

    // Not used at the workshop, which has no voice chat. Kept so the lesson has
    // the same two stages as the others when it is used later.
    speaking: {
        scene: "The learner is visiting an exhibition about artificial intelligence. You are a friendly guide who chats with them about what they know about AI and how they might use it in daily life.",
        names: ["ChatGPT", "Gemini", "Siri"],
        goals: [
            { id: "say-chatbot", vocabId: "v-chatbot", keywords: ["chatbot"] },
            { id: "say-prompt", vocabId: "v-prompt", keywords: ["prompt"] },
            { id: "say-generative-ai", vocabId: "v-generative-ai", keywords: ["generative"] },
            { id: "say-hallucination", vocabId: "v-hallucination", keywords: ["hallucination"] },
        ],
    },
};
