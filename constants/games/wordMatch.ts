// Word Match content bank — see content-bank.md for the reviewed source.
//
// This ships as static repo content rather than MongoDB so the games have no
// database or network dependency during the focus group. See plan.md §7.1.
//
// Every picture tile points at an SVG in /public/games/icons/.

const icon = (name: string) => `/games/icons/${name}.svg`;

/** Picture tile on the left, word on the right. */
const pic = (name: string, word: string): WordMatchPair => ({
    left: { imageUrl: icon(name) },
    right: { text: word },
});

/** Phrase-to-phrase pair, for content that has no sensible illustration. */
const phrase = (situation: string, response: string): WordMatchPair => ({
    left: { text: situation },
    right: { text: response },
});

export const WORD_MATCH_CATEGORIES: WordMatchCategory[] = [
    { id: "kitchen", label: "Kitchen & cooking", emoji: "🍚" },
    { id: "laundry", label: "Laundry & ironing", emoji: "👕" },
    { id: "cleaning", label: "Cleaning the flat", emoji: "🧹" },
    { id: "market", label: "Marketing & groceries", emoji: "🛒" },
    { id: "hawker", label: "Hawker centre", emoji: "🍜" },
    { id: "flat", label: "Around the flat", emoji: "🏠" },
    { id: "doctor", label: "At the doctor", emoji: "🌡️" },
    { id: "transport", label: "Getting around", emoji: "🚇" },
    { id: "weather", label: "Weather & going out", emoji: "🌧️" },
    { id: "time", label: "Time & schedule", emoji: "🕐" },
    { id: "talking", label: "Everyday talking", emoji: "💬" },
];

export const WORD_MATCH_ROUNDS: WordMatchGameRound[] = [
    {
        _id: "kitchen-things",
        title: "In the kitchen",
        category: "kitchen",
        difficulty: "easy",
        pairs: [
            pic("rice-cooker", "rice cooker"),
            pic("kettle", "kettle"),
            pic("frying-pan", "frying pan"),
            pic("chopping-board", "chopping board"),
            pic("knife", "knife"),
            pic("spoon", "spoon"),
        ],
    },
    {
        _id: "kitchen-actions",
        title: "Cooking words",
        category: "kitchen",
        difficulty: "hard",
        pairs: [
            pic("boil", "boil"),
            pic("steam", "steam"),
            pic("fry", "fry"),
            pic("defrost", "defrost"),
            pic("stir", "stir"),
            pic("pour", "pour"),
        ],
    },
    {
        _id: "laundry-things",
        title: "Laundry things",
        category: "laundry",
        difficulty: "easy",
        pairs: [
            pic("washing-machine", "washing machine"),
            pic("detergent", "detergent"),
            pic("hanger", "hanger"),
            pic("iron", "iron"),
            pic("bamboo-pole", "bamboo pole"),
            pic("laundry-basket", "laundry basket"),
        ],
    },
    {
        _id: "laundry-actions",
        title: "Laundry actions",
        category: "laundry",
        difficulty: "medium",
        pairs: [
            pic("wash-clothes", "wash"),
            pic("hang-out", "hang out to dry"),
            pic("fold", "fold"),
            pic("iron-shirt", "iron the shirt"),
            pic("put-away", "put away"),
        ],
    },
    {
        _id: "cleaning-things",
        title: "Cleaning things",
        category: "cleaning",
        difficulty: "easy",
        pairs: [
            pic("mop", "mop"),
            pic("broom", "broom"),
            pic("dustpan", "dustpan"),
            pic("vacuum", "vacuum cleaner"),
            pic("cloth", "cloth"),
            pic("bucket", "bucket"),
        ],
    },
    {
        _id: "cleaning-actions",
        title: "Cleaning actions",
        category: "cleaning",
        difficulty: "hard",
        pairs: [
            pic("sweep", "sweep"),
            pic("mop-floor", "mop"),
            pic("wipe", "wipe"),
            pic("vacuum-rug", "vacuum"),
            pic("dust", "dust"),
        ],
    },
    {
        _id: "market-things",
        title: "At the market",
        category: "market",
        difficulty: "easy",
        pairs: [
            pic("wet-market", "wet market"),
            pic("trolley", "trolley"),
            pic("receipt", "receipt"),
            pic("plastic-bag", "plastic bag"),
            pic("weighing-scale", "weighing scale"),
            pic("change", "change"),
        ],
    },
    {
        _id: "market-food",
        title: "Fresh food",
        category: "market",
        difficulty: "medium",
        pairs: [
            pic("fish", "fresh fish"),
            pic("vegetables", "vegetables"),
            pic("eggs", "a tray of eggs"),
            pic("chicken", "chicken"),
            pic("rice-bag", "a bag of rice"),
            pic("bananas", "a bunch of bananas"),
        ],
    },
    {
        _id: "hawker-things",
        title: "At the hawker centre",
        category: "hawker",
        difficulty: "easy",
        pairs: [
            pic("hawker-stall", "hawker centre"),
            pic("tray", "tray"),
            pic("chopsticks", "chopsticks"),
            pic("kopi", "kopi"),
            pic("tray-return", "tray return"),
            pic("queue", "queue"),
        ],
    },
    {
        _id: "flat-rooms",
        title: "Rooms and things",
        category: "flat",
        difficulty: "easy",
        pairs: [
            pic("living-room", "living room"),
            pic("bed", "bedroom"),
            pic("cupboard", "cupboard"),
            pic("curtain", "curtain"),
            pic("fan", "fan"),
            pic("light-switch", "light switch"),
        ],
    },
    {
        _id: "doctor-feeling",
        title: "Not feeling well",
        category: "doctor",
        difficulty: "easy",
        pairs: [
            pic("thermometer", "thermometer"),
            pic("fever", "fever"),
            pic("cough", "cough"),
            pic("headache", "headache"),
            pic("stomach-ache", "stomach ache"),
            pic("medicine", "medicine"),
        ],
    },
    {
        _id: "transport-going-out",
        title: "Going out",
        category: "transport",
        difficulty: "easy",
        pairs: [
            pic("mrt", "MRT"),
            pic("bus", "bus"),
            pic("ez-link", "EZ-link card"),
            pic("bus-stop", "bus stop"),
            pic("lift", "lift"),
            pic("escalator", "escalator"),
        ],
    },
    {
        _id: "weather-today",
        title: "The weather",
        category: "weather",
        difficulty: "easy",
        pairs: [
            pic("rain", "raining"),
            pic("sun", "sunny"),
            pic("clouds", "cloudy"),
            pic("umbrella", "umbrella"),
            pic("jacket", "jacket"),
            pic("hot", "hot"),
        ],
    },
    {
        _id: "time-clock",
        title: "What time?",
        category: "time",
        difficulty: "medium",
        pairs: [
            pic("clock-7", "seven o'clock"),
            pic("clock-330", "half past three"),
            pic("clock-915", "quarter past nine"),
            pic("sunrise", "morning"),
            pic("sun-overhead", "afternoon"),
            pic("moon", "night"),
        ],
    },
    {
        _id: "talking-what-to-say",
        title: "What do you say?",
        category: "talking",
        difficulty: "medium",
        pairs: [
            phrase("You did not hear clearly", "Sorry, can you repeat please?"),
            phrase(
                "You do not know the word",
                "I don't understand. Can you show me?",
            ),
            phrase("You have finished the work", "I have finished. What next?"),
            phrase("You are not sure which one", "This one or that one?"),
            phrase(
                "You will be back soon",
                "I am on the way. I will reach in twenty minutes.",
            ),
            phrase(
                "You want to ask something",
                "Excuse me, can I ask you something?",
            ),
        ],
    },
];

/** Categories that actually have rounds, in the order defined above. */
export const getWordMatchCategories = (): WordMatchCategory[] =>
    WORD_MATCH_CATEGORIES.filter((category) =>
        WORD_MATCH_ROUNDS.some((round) => round.category === category.id),
    );

export const getWordMatchRoundsByCategory = (
    categoryId: string,
): WordMatchGameRound[] =>
    WORD_MATCH_ROUNDS.filter((round) => round.category === categoryId);

/**
 * Input is ignored for this long after a correct match.
 *
 * Without it, a fast tap landing in the same frame as a match is compared
 * against the tile that was just matched and is scored wrong.
 */
export const MATCH_COOLDOWN_MS = 400;
