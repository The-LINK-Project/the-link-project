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
 * - English only, so every item is `reviewed: true`: there is no translation
 *   waiting on a native speaker.
 */

import type { Lesson } from "../types";

export const aiBasics: Lesson = {
    id: "ai-basics",
    title: { en: "AI Words" },
    goal: { en: "Know the key words people use when they talk about AI." },
    icon: "ai",
    level: "beginner",
    estimatedMinutes: 10,

    // The word list on the intro page does the teaching.
    notes: [],

    vocab: [
        {
            id: "v-ai",
            term: "artificial intelligence (AI)",
            meaning: { en: "computer programs that can do tasks that usually need a human mind" },
            reviewed: true,
        },
        {
            id: "v-machine-learning",
            term: "machine learning",
            meaning: { en: "how an AI gets better by learning patterns from lots of examples" },
            reviewed: true,
        },
        {
            id: "v-training-data",
            term: "training data",
            meaning: { en: "the examples (text, photos, recordings) an AI learns from" },
            reviewed: true,
        },
        {
            id: "v-chatbot",
            term: "chatbot",
            meaning: { en: "an AI you have a conversation with by typing, like ChatGPT or Gemini" },
            picture: "chatbot",
            reviewed: true,
        },
        {
            id: "v-prompt",
            term: "prompt",
            meaning: { en: "the question or instruction you type or say to an AI" },
            reviewed: true,
        },
        {
            id: "v-generative-ai",
            term: "generative AI",
            meaning: { en: "AI that creates new things: text, pictures, music or video" },
            picture: "generativeAi",
            reviewed: true,
        },
        {
            id: "v-voice-assistant",
            term: "voice assistant",
            meaning: { en: "an AI that listens to your voice and answers out loud, like Siri" },
            picture: "voiceAssistant",
            reviewed: true,
        },
        {
            id: "v-image-recognition",
            term: "image recognition",
            meaning: { en: "AI that can tell what is in a photo" },
            picture: "imageRecognition",
            reviewed: true,
        },
        {
            id: "v-hallucination",
            term: "hallucination",
            meaning: { en: "when an AI confidently gives an answer that is made up or wrong" },
            reviewed: true,
        },
    ],

    phrases: [
        {
            id: "p-hallucination",
            text: "That's an AI hallucination.",
            meaning: { en: "Saying the AI gave a confident answer that was false." },
            reviewed: true,
        },
        {
            id: "p-clearer-prompt",
            text: "Try giving it a clearer prompt.",
            meaning: { en: "Suggesting a more detailed question to get a better answer." },
            reviewed: true,
        },
    ],

    exercises: [
        // 1. An easy start: pick the picture. The other tiles are words this
        //    lesson also teaches.
        {
            id: "ai-ex-1-picture",
            type: "selectPicture",
            instruction: { en: "Which one is a chatbot?" },
            practises: ["v-chatbot"],
            vocabId: "v-chatbot",
            choiceVocabIds: ["v-voice-assistant", "v-chatbot", "v-image-recognition"],
            grading: { mode: "choice" },
        },

        // 2. The basic words, matched to their meanings.
        {
            id: "ai-ex-2-pairs",
            type: "matchPairs",
            instruction: { en: "Tap the pairs" },
            practises: ["v-ai", "v-chatbot", "v-prompt", "v-training-data"],
            vocabIds: ["v-ai", "v-chatbot", "v-prompt", "v-training-data"],
            grading: { mode: "pairs" },
        },

        // 3. A real situation: which word names it? Fill-blank tiles are shown
        //    in the order written, so the answer's position varies by item.
        {
            id: "ai-ex-3-fill",
            type: "fillBlank",
            instruction: { en: "Which word fits?" },
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
            instruction: { en: "What is this called?" },
            practises: ["v-voice-assistant"],
            vocabId: "v-voice-assistant",
            choiceVocabIds: ["v-voice-assistant", "v-chatbot", "v-image-recognition"],
            grading: { mode: "choice" },
        },

        // 5. The second set of words: what AI can do.
        {
            id: "ai-ex-5-pairs",
            type: "matchPairs",
            instruction: { en: "Tap the pairs" },
            practises: ["v-machine-learning", "v-generative-ai", "v-voice-assistant", "v-image-recognition"],
            vocabIds: ["v-machine-learning", "v-generative-ai", "v-voice-assistant", "v-image-recognition"],
            grading: { mode: "pairs" },
        },

        // 6–7. Two situations where the right word takes some telling apart.
        {
            id: "ai-ex-6-fill",
            type: "fillBlank",
            instruction: { en: "Which word fits?" },
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
            instruction: { en: "Which word fits?" },
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
            instruction: { en: "What do you say?" },
            practises: ["v-hallucination"],
            situation: { en: "Your friend has been using a chatbot and looks confused." },
            line: "I asked the chatbot for a book to read, but the book doesn't exist!",
            lineMeaning: { en: "Your friend searched for the book and could not find it anywhere." },
            phraseId: "p-hallucination",
            distractors: [
                {
                    id: "d-voice-assistant",
                    text: "That's a voice assistant.",
                    meaning: { en: "Saying it was an AI that answers out loud." },
                },
                {
                    id: "d-training-data",
                    text: "That's training data.",
                    meaning: { en: "Saying it was the examples the AI learned from." },
                },
            ],
            grading: { mode: "choice" },
        },
        {
            id: "ai-ex-9-dialogue",
            type: "dialogueChoice",
            instruction: { en: "What do you say?" },
            practises: ["v-prompt", "v-chatbot"],
            situation: { en: "Your friend asked a chatbot to plan a trip." },
            line: "The chatbot's answer was way too vague.",
            lineMeaning: { en: "The answer did not have enough detail to be useful." },
            phraseId: "p-clearer-prompt",
            distractors: [
                {
                    id: "d-more-data",
                    text: "Give it more training data.",
                    meaning: { en: "Suggesting they change what the AI learned from." },
                },
                {
                    id: "d-image-recognition",
                    text: "Use image recognition.",
                    meaning: { en: "Suggesting they use an AI that reads photos." },
                },
            ],
            grading: { mode: "choice" },
        },

        // 10. Ends on an easier item, as every lesson does.
        {
            id: "ai-ex-10-fill",
            type: "fillBlank",
            instruction: { en: "Fill in the missing word" },
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
