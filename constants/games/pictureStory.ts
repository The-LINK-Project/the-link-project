// Picture Story content bank — see content-bank.md for the reviewed source.
//
// Static repo content, no database. See plan.md §7.1.
//
// Question types:
//   sentence / say / next — multiple choice, `options` + `correctAnswerIndex`
//   order                 — `sequence` holds the CORRECT order; the game
//                           shuffles the panels and the player taps them back
//                           into order. `options` is empty.

const panel = (name: string) => `/games/icons/${name}.svg`;
const panels = (...names: string[]) => names.map(panel);

export const PICTURE_STORY_SETS: PictureStoryGameSet[] = [
    {
        _id: "morning-kitchen",
        title: "Morning in the kitchen",
        difficulty: "easy",
        questions: [
            {
                type: "sentence",
                sequence: panels(
                    "rice-cooker",
                    "rice-and-water",
                    "rice-cooker-on",
                    "steam",
                ),
                prompt: "What is happening now?",
                options: [
                    "She is cooking the rice.",
                    "She cooked the rice.",
                    "She will cook the rice.",
                    "She cook the rice.",
                ],
                correctAnswerIndex: 0,
                explanation:
                    "The steam shows it is happening right now, so we use is cooking.",
            },
            {
                type: "sentence",
                sequence: panels("bowl-rice", "hand", "pot"),
                prompt: "Choose the correct sentence.",
                options: [
                    "Put the rice in the pot.",
                    "Put the rice on the pot.",
                    "Put the rice under the pot.",
                    "Put the rice at the pot.",
                ],
                correctAnswerIndex: 0,
                explanation:
                    "Things go in a pot because a pot is a container. On means the top of it.",
            },
            {
                type: "order",
                sequence: panels(
                    "kettle-filling",
                    "kettle-on",
                    "kettle-steam",
                    "pour-cup",
                ),
                captions: [
                    "fill the kettle",
                    "switch it on",
                    "the water boils",
                    "pour the water out of the kettle",
                ],
                prompt: "Put the pictures in the right order.",
                options: [],
                correctAnswerIndex: 0,
                explanation:
                    "First fill the kettle, then switch it on, then it boils, then you pour.",
            },
            {
                type: "next",
                sequence: panels("kettle-steam", "cup-coffee"),
                prompt: "What happens next?",
                options: [
                    "She pours the hot water into the cup.",
                    "She puts the cup into the kettle.",
                    "She washes the kettle.",
                    "She switches off the light.",
                ],
                correctAnswerIndex: 0,
                explanation:
                    "The water is hot and the cup is ready, so the next step is to pour.",
            },
            {
                type: "say",
                sequence: panels("cupboard-open", "empty-shelf", "question"),
                prompt: "You cannot find the sugar. What do you say?",
                options: [
                    "Ma'am, where is the sugar?",
                    "Ma'am, where the sugar is?",
                    "Ma'am, where sugar?",
                    "Ma'am, the sugar where?",
                ],
                correctAnswerIndex: 0,
                explanation:
                    "In a question, is comes before the sugar: Where is the sugar?",
            },
            {
                type: "sentence",
                sequence: panels(
                    "dirty-plates",
                    "washing-plate",
                    "clean-plates",
                ),
                prompt: "The work is finished. What do you say?",
                options: [
                    "I washed the plates.",
                    "I wash the plates.",
                    "I am washing the plates.",
                    "I will wash the plates.",
                ],
                correctAnswerIndex: 0,
                explanation:
                    "The work is already finished, so we use the past: washed.",
            },
            {
                type: "sentence",
                sequence: panels("three-plates"),
                prompt: "Choose the correct sentence.",
                options: [
                    "The plates are on the table.",
                    "The plates is on the table.",
                    "The plates am on the table.",
                    "The plates be on the table.",
                ],
                correctAnswerIndex: 0,
                explanation: "Plates is more than one, so we use are.",
            },
            {
                type: "sentence",
                sequence: panels("eggs"),
                prompt: "Choose the correct question.",
                options: [
                    "How many eggs do you want?",
                    "How much eggs do you want?",
                    "How many egg do you want?",
                    "How much egg do you want?",
                ],
                correctAnswerIndex: 0,
                explanation:
                    "We can count eggs, so we say how many, and the word becomes eggs.",
            },
            {
                type: "order",
                sequence: panels(
                    "wash-vegetables",
                    "cut-vegetables",
                    "empty-pan",
                    "fry",
                ),
                captions: [
                    "wash the vegetables",
                    "cut the vegetables",
                    "heat the pan",
                    "fry the vegetables",
                ],
                prompt: "Put the pictures in the right order.",
                options: [],
                correctAnswerIndex: 0,
                explanation:
                    "Wash first, then cut, then heat the pan, then fry.",
            },
            {
                type: "say",
                sequence: panels("rice-cooker-on", "plate-rice", "clock-12"),
                prompt: "Lunch is ready. What do you say?",
                options: [
                    "Ma'am, lunch is ready.",
                    "Ma'am, lunch is ready tomorrow.",
                    "Ma'am, lunch was ready.",
                    "Ma'am, lunch will be ready.",
                ],
                correctAnswerIndex: 0,
                explanation: "The food is ready now, so we say is ready.",
            },
        ],
    },
    {
        _id: "laundry-day",
        title: "Laundry day",
        difficulty: "medium",
        questions: [
            {
                type: "sentence",
                sequence: panels(
                    "dirty-clothes",
                    "washing-machine",
                    "detergent",
                    "machine-running",
                    "bamboo-pole",
                ),
                prompt: "What did she do first?",
                options: [
                    "She put the clothes in the machine.",
                    "She put the clothes on the machine.",
                    "She put the clothes under the machine.",
                    "She put the clothes at the machine.",
                ],
                correctAnswerIndex: 0,
                explanation:
                    "Clothes go in a washing machine because it is a container. On means the top of it.",
            },
            {
                type: "order",
                sequence: panels(
                    "clothes-in-machine",
                    "detergent",
                    "machine-running",
                    "hang-out",
                ),
                captions: [
                    "put the clothes in",
                    "add detergent",
                    "the machine washes",
                    "hang them out",
                ],
                prompt: "Put the pictures in the right order.",
                options: [],
                correctAnswerIndex: 0,
                explanation:
                    "Clothes in, then detergent, then the machine washes, then hang them out to dry.",
            },
            {
                type: "sentence",
                sequence: panels("woman-window", "hang-out"),
                prompt: "What is she doing?",
                options: [
                    "She is hanging the clothes outside.",
                    "She hung the clothes outside.",
                    "She will hang the clothes outside.",
                    "She hangs the clothes outside.",
                ],
                correctAnswerIndex: 0,
                explanation:
                    "She is doing it right now, so we use is hanging.",
            },
            {
                type: "next",
                sequence: panels("hang-out", "clouds", "rain"),
                prompt: "What happens next?",
                options: [
                    "She takes the clothes inside.",
                    "She hangs more clothes outside.",
                    "She opens the window.",
                    "She washes the clothes again.",
                ],
                correctAnswerIndex: 0,
                explanation:
                    "It is starting to rain, so the dry clothes must come in.",
            },
            {
                type: "sentence",
                sequence: panels("clouds-hdb"),
                prompt: "Choose the correct sentence.",
                options: [
                    "It is going to rain.",
                    "It is going to raining.",
                    "It is going rain.",
                    "It is go to rain.",
                ],
                correctAnswerIndex: 0,
                explanation:
                    "After going to we use the plain verb: going to rain.",
            },
            {
                type: "sentence",
                sequence: panels("bamboo-pole"),
                prompt: "Choose the correct sentence.",
                options: [
                    "Hang the clothes on the pole.",
                    "Hang the clothes in the pole.",
                    "Hang the clothes at the pole.",
                    "Hang the clothes into the pole.",
                ],
                correctAnswerIndex: 0,
                explanation:
                    "The clothes rest on the surface of the pole, so we say on. A pole is not a container, so not in.",
            },
            {
                type: "say",
                sequence: panels("iron", "iron-off", "question"),
                prompt: "The iron is not working. What do you say?",
                options: [
                    "Ma'am, the iron is not working.",
                    "Ma'am, the iron is not work.",
                    "Ma'am, the iron no working.",
                    "Ma'am, the iron not working.",
                ],
                correctAnswerIndex: 0,
                explanation:
                    "We need is and the -ing form: is not working.",
            },
            {
                type: "sentence",
                sequence: panels("dry-clothes-sun"),
                prompt: "Choose the correct sentence.",
                options: [
                    "The clothes are dry.",
                    "The clothes is dry.",
                    "The clothes was dry.",
                    "The clothes be dry.",
                ],
                correctAnswerIndex: 0,
                explanation:
                    "Clothes is always plural in English, so we use are.",
            },
            {
                type: "order",
                sequence: panels(
                    "iron-plug",
                    "shirt-flat",
                    "iron-shirt",
                    "shirt-hanger",
                ),
                captions: [
                    "plug in the iron",
                    "lay the shirt flat",
                    "iron the shirt",
                    "hang it up",
                ],
                prompt: "Put the pictures in the right order.",
                options: [],
                correctAnswerIndex: 0,
                explanation:
                    "Plug in the iron, lay the shirt flat, iron it, then hang it up.",
            },
            {
                type: "next",
                sequence: panels("fold", "cupboard"),
                prompt: "What happens next?",
                options: [
                    "She puts the clothes away in the cupboard.",
                    "She washes the clothes again.",
                    "She hangs the clothes outside.",
                    "She takes the clothes to the market.",
                ],
                correctAnswerIndex: 0,
                explanation:
                    "The clothes are clean and folded, so the last step is putting them away.",
            },
        ],
    },
    {
        _id: "market-hawker",
        title: "At the market and the hawker centre",
        difficulty: "hard",
        questions: [
            {
                type: "say",
                sequence: panels("fish", "price-tag", "question"),
                prompt: "You want to know the price. What do you say?",
                options: [
                    "How much is it?",
                    "How much it is?",
                    "How much it cost?",
                    "It is how much?",
                ],
                correctAnswerIndex: 0,
                explanation:
                    "In a question, is comes before it: How much is it?",
            },
            {
                type: "sentence",
                sequence: panels("chicken-scale"),
                prompt: "Choose the correct sentence.",
                options: [
                    "I want one kilo of chicken.",
                    "I want one kilo chicken.",
                    "I want one kilos of chicken.",
                    "I want a kilo of the chicken.",
                ],
                correctAnswerIndex: 0,
                explanation:
                    "We say one kilo of + the food. Kilo stays singular after one.",
            },
            {
                type: "order",
                sequence: panels(
                    "wet-market",
                    "vegetables",
                    "paying",
                    "carrying-bags",
                ),
                captions: [
                    "go to the market",
                    "choose the vegetables",
                    "pay at the stall",
                    "carry the bags home",
                ],
                prompt: "Put the pictures in the right order.",
                options: [],
                correctAnswerIndex: 0,
                explanation:
                    "Go in, choose what you need, pay, then carry it home.",
            },
            {
                type: "say",
                sequence: panels("kopitiam", "kopi", "no-sugar"),
                prompt: "You want coffee with less sugar. What do you say?",
                options: [
                    "One kopi, less sugar, please.",
                    "One kopi, less sugars, please.",
                    "One kopi, little sugars, please.",
                    "One kopi, few sugar, please.",
                ],
                correctAnswerIndex: 0,
                explanation:
                    "Sugar cannot be counted, so we say less sugar — never sugars.",
            },
            {
                type: "sentence",
                sequence: panels("carrying-bags"),
                prompt: "The shopping is finished. Choose the correct sentence.",
                options: [
                    "I bought the vegetables.",
                    "I buy the vegetables.",
                    "I buyed the vegetables.",
                    "I am buying the vegetables.",
                ],
                correctAnswerIndex: 0,
                explanation:
                    "The past of buy is bought. It is irregular — there is no buyed.",
            },
            {
                type: "sentence",
                sequence: panels("wet-market"),
                prompt: "Choose the correct sentence.",
                options: [
                    "I bought the fish at the market.",
                    "I bought the fish on the market.",
                    "I bought the fish to the market.",
                    "I bought the fish by the market.",
                ],
                correctAnswerIndex: 0,
                explanation:
                    "We use at for a place where something happens: at the market, at the bus stop.",
            },
            {
                type: "next",
                sequence: panels("empty-plates", "standing-up", "tray-return"),
                prompt: "What happens next?",
                options: [
                    "She returns the tray to the tray return.",
                    "She orders more food.",
                    "She sits down again.",
                    "She washes the plates.",
                ],
                correctAnswerIndex: 0,
                explanation:
                    "At a hawker centre you return your own tray when you finish.",
            },
            {
                type: "sentence",
                sequence: panels("change"),
                prompt: "Choose the correct sentence.",
                options: [
                    "She gave me the change.",
                    "She give me the change.",
                    "She gived me the change.",
                    "She giving me the change.",
                ],
                correctAnswerIndex: 0,
                explanation: "The past of give is gave. It is irregular.",
            },
            {
                type: "sentence",
                sequence: panels("rice-bag", "eggs"),
                prompt: "Choose the correct sentence.",
                options: [
                    "How much rice and how many eggs?",
                    "How many rice and how much eggs?",
                    "How much rice and how much eggs?",
                    "How many rice and how many eggs?",
                ],
                correctAnswerIndex: 0,
                explanation:
                    "We cannot count rice, so how much. We can count eggs, so how many.",
            },
            {
                type: "say",
                sequence: panels("shopping-bags", "plastic-bag", "question"),
                prompt: "You need a bag. What do you say?",
                options: [
                    "Can I have a plastic bag, please?",
                    "Can I to have a plastic bag, please?",
                    "I can have a plastic bag, please?",
                    "Can I having a plastic bag, please?",
                ],
                correctAnswerIndex: 0,
                explanation:
                    "A polite request is Can I have…? — the plain verb after can.",
            },
        ],
    },
    {
        _id: "out-and-about",
        title: "Out and about",
        difficulty: "hard",
        questions: [
            {
                type: "say",
                sequence: panels("woman-bag", "street", "bus-stop"),
                prompt: "You are lost. What do you ask?",
                options: [
                    "Excuse me, where is the bus stop?",
                    "Excuse me, where the bus stop is?",
                    "Excuse me, where bus stop?",
                    "Excuse me, the bus stop is where?",
                ],
                correctAnswerIndex: 0,
                explanation:
                    "In a question, is comes before the bus stop.",
            },
            {
                type: "order",
                sequence: panels(
                    "station-entrance",
                    "tap-card",
                    "platform",
                    "boarding-train",
                ),
                captions: [
                    "enter the station",
                    "tap your card",
                    "wait on the platform",
                    "get on the train",
                ],
                prompt: "Put the pictures in the right order.",
                options: [],
                correctAnswerIndex: 0,
                explanation:
                    "Enter the station, tap your card, wait on the platform, then board the train.",
            },
            {
                type: "sentence",
                sequence: panels("woman-bus", "clock-20", "hdb"),
                prompt: "You are on the way home. Choose the correct sentence.",
                options: [
                    "I will reach in twenty minutes.",
                    "I reach in twenty minutes.",
                    "I reached in twenty minutes.",
                    "I am reach in twenty minutes.",
                ],
                correctAnswerIndex: 0,
                explanation:
                    "It has not happened yet, so we use will and the plain verb.",
            },
            {
                type: "sentence",
                sequence: panels("woman-bus"),
                prompt: "Choose the correct sentence.",
                options: [
                    "She is on the bus.",
                    "She is in the bus.",
                    "She is at the bus.",
                    "She is into the bus.",
                ],
                correctAnswerIndex: 0,
                explanation:
                    "English uses on for buses, trains and planes — even though you are inside.",
            },
            {
                type: "next",
                sequence: panels("clouds", "door", "umbrella"),
                prompt: "What happens next?",
                options: [
                    "She takes the umbrella with her.",
                    "She leaves the umbrella at home.",
                    "She opens the window.",
                    "She hangs the clothes outside.",
                ],
                correctAnswerIndex: 0,
                explanation: "It looks like rain, so she takes the umbrella.",
            },
            {
                type: "say",
                sequence: panels(
                    "headache",
                    "thermometer",
                    "clinic",
                    "doctor",
                ),
                prompt: 'The doctor asks, "How are you feeling?" What do you say?',
                options: [
                    "I have a headache and a fever since this morning.",
                    "I have a headache and a fever since tomorrow.",
                    "I had a headache and a fever now.",
                    "I will have a headache and a fever yesterday.",
                ],
                correctAnswerIndex: 0,
                explanation:
                    "Say what is wrong and since when. Since this morning means it started earlier and has not stopped.",
            },
            {
                type: "sentence",
                sequence: panels("calendar-3", "cough"),
                prompt: "Choose the correct sentence.",
                options: [
                    "I have had this cough for three days.",
                    "I have this cough for three days ago.",
                    "I had this cough for three days now.",
                    "I having this cough for three days.",
                ],
                correctAnswerIndex: 0,
                explanation:
                    "It started three days ago and is still happening, so we use have had.",
            },
            {
                type: "say",
                sequence: panels("reception", "clock-10"),
                prompt: "You arrive at the clinic. What do you say?",
                options: [
                    "I have an appointment at ten o'clock.",
                    "I have an appointment on ten o'clock.",
                    "I have an appointment in ten o'clock.",
                    "I have an appointment to ten o'clock.",
                ],
                correctAnswerIndex: 0,
                explanation:
                    "We use at with a clock time: at ten o'clock, at half past three.",
            },
            {
                type: "order",
                sequence: panels(
                    "clinic",
                    "reception",
                    "waiting-chair",
                    "doctor",
                ),
                captions: [
                    "arrive at the clinic",
                    "register at the counter",
                    "wait your turn",
                    "see the doctor",
                ],
                prompt: "Put the pictures in the right order.",
                options: [],
                correctAnswerIndex: 0,
                explanation:
                    "Arrive, register at the counter, wait your turn, then see the doctor.",
            },
            {
                type: "sentence",
                sequence: panels("clock-330"),
                prompt: "What time is it?",
                options: [
                    "It is half past three.",
                    "It is half to three.",
                    "It is three past half.",
                    "It is half past of three.",
                ],
                correctAnswerIndex: 0,
                explanation: "Thirty minutes after three is half past three.",
            },
        ],
    },
    {
        // Set C source — the HARD set. Unlike A and B (meaning-based, no
        // grammar), these five look at an image progression and ask which
        // sentence is correct ENGLISH. All four options say the same thing;
        // three contain a real grammar mistake (agreement, tense, participle,
        // article, plural) and only one is correct. This is what makes Set C
        // harder — it tests the grammar, not just the vocabulary.
        _id: "focus-c",
        title: "Say it correctly (harder)",
        difficulty: "hard",
        questions: [
            {
                type: "sentence",
                sequence: panels("socks", "trousers", "shirt", "shoes"),
                prompt: "What is he doing? Choose the correct sentence.",
                options: [
                    "He is getting dressed.",
                    "He is get dressed.",
                    "He are getting dressed.",
                    "He getting dressed.",
                ],
                correctAnswerIndex: 0,
                explanation:
                    "Present continuous is 'is' + verb-ing: he is getting dressed.",
            },
            {
                type: "sentence",
                sequence: panels("apple", "mouth"),
                prompt: "Choose the correct sentence.",
                options: [
                    "She is eating an apple.",
                    "She is eating a apple.",
                    "She is eat an apple.",
                    "She eating an apple.",
                ],
                correctAnswerIndex: 0,
                explanation:
                    "Use 'an' before a vowel sound (an apple), and 'is' + eating for what is happening now.",
            },
            {
                type: "sentence",
                sequence: panels("toothpaste", "toothbrush", "head"),
                prompt: "The job is finished. Choose the correct sentence.",
                options: [
                    "She has brushed her teeth.",
                    "She has brush her teeth.",
                    "She have brushed her teeth.",
                    "She has brushing her teeth.",
                ],
                correctAnswerIndex: 0,
                explanation:
                    "Present perfect is 'has' + past participle: she has brushed her teeth.",
            },
            {
                type: "sentence",
                sequence: panels("fever", "thermometer", "medicine"),
                prompt: "He was sick. Choose the correct sentence.",
                options: [
                    "He has taken his medicine.",
                    "He has took his medicine.",
                    "He have taken his medicine.",
                    "He has take his medicine.",
                ],
                correctAnswerIndex: 0,
                explanation:
                    "The past participle of 'take' is 'taken': he has taken his medicine.",
            },
            {
                type: "sentence",
                sequence: panels("head", "eye", "ear", "nose"),
                prompt: "Choose the correct sentence.",
                options: [
                    "A face has two eyes and two ears.",
                    "A face have two eyes and two ears.",
                    "A face has two eye and two ear.",
                    "A face has two eyes and two ear.",
                ],
                correctAnswerIndex: 0,
                explanation:
                    "'A face' is singular, so 'has'; and more than one takes the plural: eyes, ears.",
            },
        ],
    },
];
