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
    "home-help": "/lessons/home-help-scene.jpg",
    "meet-people": "/lessons/meet-people-scene.jpg",
    "reading-signs": "/lessons/reading-signs-scene.jpg",
    "bus-directions": "/lessons/bus-directions-scene.jpg",
    "supermarket": "/lessons/supermarket-scene.jpg",
    "construction-science": "/lessons/construction-science-scene.jpg",
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
    // Helping at home
    laundry: "/lessons/laundry.jpg",
    iron: "/lessons/iron.jpg",
    mop: "/lessons/mop.jpg",
    dishes: "/lessons/dishes.jpg",
    rubbish: "/lessons/rubbish.jpg",
    fridge: "/lessons/fridge.jpg",
    stove: "/lessons/stove.jpg",
    cupboard: "/lessons/cupboard.jpg",
    // Getting to know someone
    nameTag: "/lessons/name-tag.jpg",
    country: "/lessons/country.jpg",
    family: "/lessons/family.jpg",
    children: "/lessons/children.jpg",
    friend: "/lessons/friend.jpg",
    job: "/lessons/job.jpg",
    hobby: "/lessons/hobby.jpg",
    sunday: "/lessons/sunday.jpg",
    // Reading signs
    wetFloor: "/lessons/wet-floor.jpg",
    noEntry: "/lessons/no-entry.jpg",
    noSmoking: "/lessons/no-smoking.jpg",
    closed: "/lessons/closed.jpg",
    push: "/lessons/push.jpg",
    pull: "/lessons/pull.jpg",
    toilet: "/lessons/toilet.jpg",
    danger: "/lessons/danger.jpg",
    // Buses and finding your way
    busStop: "/lessons/bus-stop.jpg",
    bell: "/lessons/bell.jpg",
    left: "/lessons/left.jpg",
    right: "/lessons/right.jpg",
    straight: "/lessons/straight.jpg",
    trafficLight: "/lessons/traffic-light.jpg",
    overheadBridge: "/lessons/overhead-bridge.jpg",
    map: "/lessons/map.jpg",
    // At the supermarket
    trolley: "/lessons/trolley.jpg",
    aisle: "/lessons/aisle.jpg",
    cashier: "/lessons/cashier.jpg",
    receipt: "/lessons/receipt.jpg",
    discount: "/lessons/discount.jpg",
    expiryDate: "/lessons/expiry-date.jpg",
    plasticBag: "/lessons/plastic-bag.jpg",
    vegetables: "/lessons/vegetables.jpg",
    // Construction science
    concrete: "/lessons/concrete.jpg",
    cement: "/lessons/cement.jpg",
    steelBar: "/lessons/steel-bar.jpg",
    beam: "/lessons/beam.jpg",
    column: "/lessons/column.jpg",
    load: "/lessons/load.jpg",
    level: "/lessons/level.jpg",
    scaffold: "/lessons/scaffold.jpg",
    // Illustrations rather than photographs: these ideas have no one scene to photograph.
    artificialIntelligence: "/lessons/ai-artificial-intelligence.svg",
    machineLearning: "/lessons/ai-machine-learning.svg",
    trainingData: "/lessons/ai-training-data.svg",
    chatbot: "/lessons/ai-chatbot.svg",
    prompt: "/lessons/ai-prompt.svg",
    voiceAssistant: "/lessons/ai-voice-assistant.svg",
    imageRecognition: "/lessons/ai-image-recognition.svg",
    generativeAi: "/lessons/ai-generative.svg",
    hallucination: "/lessons/ai-hallucination.svg",
};

export function lessonVisual(lessonId: string): string | undefined {
    return LESSON_VISUALS[lessonId];
}

export function pictureVisual(picture: PictureKey): string {
    return PICTURE_VISUALS[picture];
}
