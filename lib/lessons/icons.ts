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
    "seat",
    "transfer",
    "clock",
    // Seeing a doctor
    "thermometer",
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
    "price",
    "stall",
    // At work
    "helmet",
    "boots",
    "warning",
    "firstAid",
    "person",
] as const;

export type PictureKey = (typeof PICTURE_KEYS)[number];

/** What a whole lesson is about, drawn on its card on Home. */
export const LESSON_ICONS = ["train", "clinic", "food", "work", "mix"] as const;

export type LessonIcon = (typeof LESSON_ICONS)[number];
