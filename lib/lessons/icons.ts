/**
 * Picture keys for vocabulary.
 *
 * The lesson domain names a picture semantically ("train", "money") and
 * `visuals.ts` decides what to draw. Keeping the artwork out of the content
 * model means replacing a photograph touches one mapping rather than every
 * lesson.
 *
 * The list is deliberately short. A word only gets a key when a single picture
 * can carry its meaning without a caption; everything else is taught through
 * the text-based exercises instead.
 */
export const PICTURE_KEYS = [
    "train",
    "platform",
    "exit",
    "mrtFare",
    "money",
    "card",
    "tapOut",
    "seat",
    "transfer",
    "clock",
    // Seeing a doctor
    "thermometer",
    "pain",
    "cough",
    "medicine",
    "clinic",
    "appointment",
    "calendar",
    "bed",
    "document",
    // Buying food
    "food",
    "bag",
    "flame",
    "drink",
    "less",
    "price",
    "stall",
    // At work
    "helmet",
    "boots",
    "warning",
    "firstAid",
    "person",
    "salary",
    "repeat",
    // Helping at home
    "laundry",
    "iron",
    "mop",
    "dishes",
    "rubbish",
    "fridge",
    "stove",
    "cupboard",
    // Getting to know someone
    "nameTag",
    "country",
    "family",
    "children",
    "friend",
    "job",
    "hobby",
    "sunday",
    // Reading signs
    "wetFloor",
    "noEntry",
    "noSmoking",
    "closed",
    "push",
    "pull",
    "toilet",
    "danger",
    // Buses and finding your way
    "busStop",
    "bell",
    "left",
    "right",
    "straight",
    "trafficLight",
    "overheadBridge",
    "map",
    // At the supermarket
    "trolley",
    "aisle",
    "cashier",
    "receipt",
    "discount",
    "expiryDate",
    "plasticBag",
    "vegetables",
    // Construction science
    "concrete",
    "cement",
    "steelBar",
    "beam",
    "column",
    "load",
    "level",
    "scaffold",
    // Talking about AI
    "artificialIntelligence",
    "machineLearning",
    "trainingData",
    "chatbot",
    "prompt",
    "voiceAssistant",
    "imageRecognition",
    "generativeAi",
    "hallucination",
] as const;

export type PictureKey = (typeof PICTURE_KEYS)[number];

/** What a whole lesson is about, drawn on its card on Home. */
export const LESSON_ICONS = [
    "train",
    "clinic",
    "food",
    "work",
    "home",
    "chat",
    "sign",
    "bus",
    "cart",
    "build",
    "ai",
    "mix",
] as const;

export type LessonIcon = (typeof LESSON_ICONS)[number];
