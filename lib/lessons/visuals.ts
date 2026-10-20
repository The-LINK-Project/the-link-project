import type { PictureKey } from "./icons";

/**
 * Static scenes give each lesson a recognisable Singapore setting before the
 * learner has to read or answer anything. The photographs are the mobile app's,
 * served from `public/lessons`.
 */
const LESSON_VISUALS: Partial<Record<string, string>> = {
    "mrt-basics": "/lessons/mrt-platform.jpg",
    "hawker-food": "/lessons/hawker-centre.jpg",
    "clinic-visit": "/lessons/clinic-reception.jpg",
    "work-safety": "/lessons/work-safety.jpg",
};

/**
 * One photograph per picture key, and every key has one: the record is total,
 * so a key added without its photograph does not compile. A line icon asks a
 * learner to decode a symbol before they can answer, and the symbols are not
 * shared across the places these learners come from; a scene is.
 */
const PICTURE_VISUALS: Record<PictureKey, string> = {
    train: "/lessons/alight.jpg",
    platform: "/lessons/mrt-platform.jpg",
    exit: "/lessons/mrt-exit.jpg",
    mrtFare: "/lessons/mrt-fare.jpg",
    money: "/lessons/cash.jpg",
    card: "/lessons/top-up.jpg",
    tapOut: "/lessons/tap-out.jpg",
    seat: "/lessons/reserved-seat.jpg",
    transfer: "/lessons/interchange.jpg",
    clock: "/lessons/break.jpg",
    thermometer: "/lessons/fever.jpg",
    pain: "/lessons/pain.jpg",
    cough: "/lessons/cough.jpg",
    medicine: "/lessons/medicine.jpg",
    clinic: "/lessons/clinic-reception.jpg",
    appointment: "/lessons/appointment.jpg",
    calendar: "/lessons/day-off.jpg",
    bed: "/lessons/rest.jpg",
    document: "/lessons/mc.jpg",
    food: "/lessons/chicken-rice.jpg",
    bag: "/lessons/takeaway.jpg",
    flame: "/lessons/spicy.jpg",
    drink: "/lessons/drink.jpg",
    less: "/lessons/less.jpg",
    price: "/lessons/price.jpg",
    stall: "/lessons/stall.jpg",
    helmet: "/lessons/helmet.jpg",
    boots: "/lessons/safety-boots.jpg",
    warning: "/lessons/dangerous.jpg",
    firstAid: "/lessons/hurt.jpg",
    person: "/lessons/supervisor.jpg",
    salary: "/lessons/salary.jpg",
    repeat: "/lessons/again.jpg",
};

export function lessonVisual(lessonId: string): string | undefined {
    return LESSON_VISUALS[lessonId];
}

export function pictureVisual(picture: PictureKey): string {
    return PICTURE_VISUALS[picture];
}
