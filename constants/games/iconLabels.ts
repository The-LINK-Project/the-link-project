// Short human labels for the picture icons.
//
// Used as captions under Picture Story panels so a learner is never guessing
// what a drawing is meant to be.
//
// Two rules when editing:
//   1. Keep it to one or two words — captions sit under a 96px icon.
//   2. Never let a caption give away a question's answer. Panels are labelled
//      with neutral nouns ("bus", "sugar"), not with the grammar being tested
//      ("on the bus", "less sugar").

export const ICON_LABELS: Record<string, string> = {
    // kitchen
    "rice-cooker": "rice cooker",
    "rice-cooker-on": "cooking",
    kettle: "kettle",
    "kettle-on": "switch on",
    "kettle-filling": "fill",
    "kettle-steam": "boiling",
    "frying-pan": "frying pan",
    "empty-pan": "pan",
    pot: "pot",
    "chopping-board": "chopping board",
    knife: "knife",
    spoon: "spoon",
    "bowl-rice": "rice",
    "plate-rice": "plate of rice",
    "three-plates": "plates",
    "dirty-plates": "dirty plates",
    "clean-plates": "clean plates",
    "washing-plate": "washing up",
    "cup-coffee": "cup",
    kopi: "kopi",
    "pour-cup": "pour",
    pour: "pour",
    "rice-and-water": "rice and water",
    boil: "boil",
    steam: "steam",
    fry: "fry",
    defrost: "defrost",
    stir: "stir",
    "wash-vegetables": "wash",
    "cut-vegetables": "cut",

    // laundry
    "washing-machine": "washing machine",
    "machine-running": "washing",
    "clothes-in-machine": "clothes in",
    detergent: "detergent",
    hanger: "hanger",
    iron: "iron",
    "iron-off": "not working",
    "iron-plug": "plug in",
    "iron-shirt": "ironing",
    "shirt-flat": "shirt",
    "shirt-hanger": "hang up",
    "bamboo-pole": "bamboo pole",
    "hang-out": "hang out",
    "dry-clothes-sun": "dry clothes",
    "dirty-clothes": "dirty clothes",
    "wash-clothes": "wash",
    "laundry-basket": "laundry basket",
    fold: "fold",
    "put-away": "put away",
    cupboard: "cupboard",
    "cupboard-open": "cupboard",
    "empty-shelf": "empty shelf",

    // cleaning
    mop: "mop",
    "mop-floor": "mop",
    broom: "broom",
    sweep: "sweep",
    dustpan: "dustpan",
    vacuum: "vacuum cleaner",
    "vacuum-rug": "vacuum",
    cloth: "cloth",
    wipe: "wipe",
    dust: "dust",
    bucket: "bucket",

    // market
    "wet-market": "wet market",
    trolley: "trolley",
    receipt: "receipt",
    "price-tag": "price",
    "plastic-bag": "plastic bag",
    "shopping-bags": "shopping",
    "carrying-bags": "going home",
    "weighing-scale": "weighing scale",
    "chicken-scale": "one kilo",
    change: "change",
    paying: "pay",
    fish: "fish",
    vegetables: "vegetables",
    eggs: "eggs",
    chicken: "chicken",
    "rice-bag": "bag of rice",
    bananas: "bananas",

    // hawker
    "hawker-stall": "hawker centre",
    kopitiam: "kopitiam",
    tray: "tray",
    "empty-plates": "finished",
    "tray-return": "tray return",
    chopsticks: "chopsticks",
    queue: "queue",
    "standing-up": "stand up",
    "no-sugar": "sugar",

    // flat
    "living-room": "living room",
    bed: "bedroom",
    curtain: "curtain",
    fan: "fan",
    "light-switch": "light switch",
    door: "door",
    hdb: "flat",
    "clouds-hdb": "cloudy",
    street: "street",

    // doctor
    thermometer: "thermometer",
    fever: "fever",
    cough: "cough",
    headache: "headache",
    "stomach-ache": "stomach ache",
    medicine: "medicine",
    clinic: "clinic",
    reception: "counter",
    "waiting-chair": "wait",
    doctor: "doctor",
    "calendar-3": "three days",

    // transport
    mrt: "MRT",
    "boarding-train": "get on",
    bus: "bus",
    "woman-bus": "bus",
    "woman-bag": "going out",
    "woman-window": "window",
    "ez-link": "EZ-link card",
    "tap-card": "tap card",
    "bus-stop": "bus stop",
    "station-entrance": "station",
    platform: "platform",
    lift: "lift",
    escalator: "escalator",

    // weather & time
    rain: "rain",
    clouds: "clouds",
    sun: "sunny",
    "sun-overhead": "afternoon",
    sunrise: "morning",
    moon: "night",
    umbrella: "umbrella",
    jacket: "jacket",
    hot: "hot",
    "clock-7": "7 o'clock",
    "clock-10": "10 o'clock",
    "clock-12": "12 o'clock",
    "clock-20": "20 minutes",
    "clock-330": "half past 3",
    "clock-915": "quarter past 9",

    // misc
    hand: "hand",
    question: "?",
};

/** Caption for a picture path such as "/games/icons/rice-cooker.svg". */
export const getIconLabel = (src: string): string | undefined => {
    const match = /\/games\/icons\/([^/.]+)\.svg$/.exec(src);
    return match ? ICON_LABELS[match[1]] : undefined;
};
