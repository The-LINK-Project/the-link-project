import { config } from "dotenv";

// Load .env.local before any module reads process.env (dynamic imports below)
config({ path: ".env.local" });
config();

const wordMatchRounds = [
    {
        title: "Greetings and replies",
        pairs: [
            {
                left: { text: "How are you?", imageUrl: "" },
                right: { text: "I am fine", imageUrl: "" },
            },
            {
                left: { text: "Thank you", imageUrl: "" },
                right: { text: "You are welcome", imageUrl: "" },
            },
            {
                left: { text: "What is your name?", imageUrl: "" },
                right: { text: "My name is Ali", imageUrl: "" },
            },
            {
                left: { text: "Nice to meet you", imageUrl: "" },
                right: { text: "Nice to meet you too", imageUrl: "" },
            },
            {
                left: { text: "Goodbye", imageUrl: "" },
                right: { text: "See you tomorrow", imageUrl: "" },
            },
        ],
    },
    {
        title: "Words and pictures",
        pairs: [
            {
                left: { text: "Apple", imageUrl: "" },
                right: { text: "🍎", imageUrl: "" },
            },
            {
                left: { text: "Rain", imageUrl: "" },
                right: { text: "🌧️", imageUrl: "" },
            },
            {
                left: { text: "Phone", imageUrl: "" },
                right: { text: "📱", imageUrl: "" },
            },
            {
                left: { text: "House", imageUrl: "" },
                right: { text: "🏠", imageUrl: "" },
            },
            {
                left: { text: "Bus", imageUrl: "" },
                right: { text: "🚌", imageUrl: "" },
            },
        ],
    },
];

const pictureStorySets = [
    {
        title: "Daily actions",
        questions: [
            {
                sequence: ["🌅", "🪥", "😁"],
                options: [
                    "I brush my teeth in the morning.",
                    "I sleep at night.",
                    "I eat rice.",
                    "I wash my clothes.",
                ],
                correctAnswerIndex: 0,
            },
            {
                sequence: ["🌧️", "☂️", "🚶"],
                options: [
                    "I cook dinner.",
                    "I walk with an umbrella in the rain.",
                    "I watch TV.",
                    "I ride a bicycle.",
                ],
                correctAnswerIndex: 1,
            },
            {
                sequence: ["🍳", "🍚", "😋"],
                options: [
                    "I go to sleep.",
                    "I clean the house.",
                    "I cook and eat food.",
                    "I read a book.",
                ],
                correctAnswerIndex: 2,
            },
            {
                sequence: ["🌙", "🛏️", "😴"],
                options: [
                    "I eat breakfast.",
                    "I go to work.",
                    "I play football.",
                    "I sleep at night.",
                ],
                correctAnswerIndex: 3,
            },
            {
                sequence: ["📱", "👂", "😊"],
                options: [
                    "I talk on the phone.",
                    "I wash the dishes.",
                    "I open the window.",
                    "I drink water.",
                ],
                correctAnswerIndex: 0,
            },
        ],
    },
    {
        title: "At work and home",
        questions: [
            {
                sequence: ["🚌", "🏗️", "👷"],
                options: [
                    "I cook rice at home.",
                    "I take the bus to work.",
                    "I go to the market.",
                    "I call my friend.",
                ],
                correctAnswerIndex: 1,
            },
            {
                sequence: ["🧺", "👕", "☀️"],
                options: [
                    "I buy a new shirt.",
                    "I go swimming.",
                    "I wash and dry my clothes.",
                    "I eat lunch outside.",
                ],
                correctAnswerIndex: 2,
            },
            {
                sequence: ["🤒", "🏥", "💊"],
                options: [
                    "I am sick and go to the doctor.",
                    "I am happy and go to the park.",
                    "I am hungry and eat food.",
                    "I am tired and go to sleep.",
                ],
                correctAnswerIndex: 0,
            },
            {
                sequence: ["🛒", "🍎", "💵"],
                options: [
                    "I clean my room.",
                    "I take a shower.",
                    "I watch a movie.",
                    "I buy food at the shop.",
                ],
                correctAnswerIndex: 3,
            },
            {
                sequence: ["📞", "👨‍👩‍👧", "❤️"],
                options: [
                    "I go to the bank.",
                    "I call my family.",
                    "I wash the floor.",
                    "I catch the train.",
                ],
                correctAnswerIndex: 1,
            },
        ],
    },
];

async function seedGames() {
    const { connectToDatabase } = await import("@/lib/database");
    const { default: WordMatchRound } = await import(
        "@/lib/database/models/wordMatchRound.model"
    );
    const { default: PictureStorySet } = await import(
        "@/lib/database/models/pictureStorySet.model"
    );

    await connectToDatabase();

    const existingRounds = await WordMatchRound.countDocuments();
    if (existingRounds === 0) {
        await WordMatchRound.insertMany(wordMatchRounds);
        console.log(`Inserted ${wordMatchRounds.length} Word Match rounds.`);
    } else {
        console.log(
            `Skipped Word Match: ${existingRounds} rounds already exist.`,
        );
    }

    const existingSets = await PictureStorySet.countDocuments();
    if (existingSets === 0) {
        await PictureStorySet.insertMany(pictureStorySets);
        console.log(`Inserted ${pictureStorySets.length} Picture Story sets.`);
    } else {
        console.log(
            `Skipped Picture Story: ${existingSets} sets already exist.`,
        );
    }
}

seedGames()
    .then(() => {
        process.exit(0);
    })
    .catch((error) => {
        console.error("Seeding games failed:", error);
        process.exit(1);
    });
