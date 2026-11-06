import type { FirstLanguage } from "./languages";

/**
 * Lesson content for the first languages the lessons are not authored in.
 *
 * Lessons are written in English with Bengali, Tamil and Hindi alongside each
 * string. A learner whose language is any of the other eleven used to see
 * English everywhere the lesson explains itself: exercise instructions, the
 * meaning under each reply, the glosses on the matching tiles, the situation
 * above a dialogue, the notes about Singapore. This table gives those learners
 * the same explanations, keyed by the English so that one authored copy of
 * every string is still the source and a corrected translation lives in one
 * place.
 *
 * Every lesson is checked against it in a test: a string added to a lesson
 * without a row here fails the suite rather than quietly showing English.
 */
export type ContentLanguage = Exclude<FirstLanguage, "bn" | "ta" | "hi" | "en">;

export const LESSON_CONTENT_COPY: Record<ContentLanguage, Record<string, string>> = {
    te: {
        'Signs and announcements say "alight". It means get off the train.':
            'సైన్ బోర్డులు, ప్రకటనలలో "alight" అని ఉంటుంది. అంటే రైలు దిగడం.',
        'Say "take away" to bring the food home. Some stalls charge a little more for the box.':
            'ఆహారాన్ని ఇంటికి తీసుకెళ్లాలంటే "take away" అని చెప్పండి. కొన్ని దుకాణాలు బాక్సుకు కొంచెం ఎక్కువ తీసుకుంటాయి.',
        'A tissue packet on a table means someone has taken that seat. People call this "chope".':
            'టేబుల్ మీద టిష్యూ ప్యాకెట్ ఉంటే ఆ సీటు ఎవరో తీసుకున్నారని అర్థం. దీన్ని "chope" అంటారు.',
        "A meal at a hawker centre or coffee shop usually costs 4 to 7 dollars. Most stalls take cash, and many take PayNow.":
            "హాకర్ సెంటర్ లేదా కాఫీ షాపులో భోజనానికి సాధారణంగా 4 నుండి 7 డాలర్లు అవుతుంది. చాలా దుకాణాలు నగదు తీసుకుంటాయి, చాలా వాటిలో PayNow కూడా నడుస్తుంది.",
        "A quick practice with words from every lesson. New every day.":
            "ప్రతి పాఠంలోని పదాలతో చిన్న అభ్యాసం. ప్రతిరోజూ కొత్తది.",
        "After eating, return your tray and plates to the tray return point. It is the rule, and there can be a fine.":
            "తిన్న తర్వాత మీ ట్రే మరియు ప్లేట్లను ట్రే రిటర్న్ పాయింట్‌కు తిరిగి ఇవ్వండి. ఇది నియమం, జరిమానా కూడా పడవచ్చు.",
        "Ask the doctor for an MC. Give it to your employer so your sick day is counted as sick leave.":
            "డాక్టర్‌ను MC అడగండి. మీ అనారోగ్య రోజు సిక్ లీవ్‌గా లెక్కించబడేలా దాన్ని మీ యజమానికి ఇవ్వండి.",
        "Ask your supervisor to say it again, say when something is not safe, and ask for a day off.":
            "సూపర్‌వైజర్‌ను మళ్లీ చెప్పమని అడిగి, ఏదైనా సురక్షితం కాకపోతే చెప్పి, సెలవు అడగండి.",
        "Asking for a day with no work.": "పని లేని ఒక రోజు అడగడం.",
        "Asking for less chilli.": "తక్కువ మిర్చి అడగడం.",
        "Asking how often to take the medicine.": "మందు ఎన్నిసార్లు తీసుకోవాలో అడగడం.",
        "Asking people to let you off the train.": "రైలు దిగడానికి దారి ఇవ్వమని అడగడం.",
        "Asking someone to repeat what they said.": "చెప్పినది మళ్లీ చెప్పమని అడగడం.",
        "Asking the doctor for a sick-leave paper.": "డాక్టర్‌ను సిక్ లీవ్ కాగితం అడగడం.",
        "Asking the price.": "ధర అడగడం.",
        "Asking to add ten dollars to your card.": "మీ కార్డులో పది డాలర్లు వేయమని అడగడం.",
        "Asking which platform goes to Jurong East.":
            "జురాంగ్ ఈస్ట్‌కు ఏ ప్లాట్‌ఫారమ్ వెళ్తుందో అడగడం.",
        "At a hawker centre, you order at the stall, pay, and carry the food to a table yourself.":
            "హాకర్ సెంటర్‌లో మీరు దుకాణం వద్ద ఆర్డర్ చేసి, డబ్బు చెల్లించి, ఆహారాన్ని మీరే టేబుల్‌కు తీసుకెళ్తారు.",
        "At work": "పని వద్ద",
        "Buying food": "ఆహారం కొనడం",
        "Daily mix": "రోజువారీ మిశ్రమం",
        "Fill in the missing word": "తప్పిపోయిన పదాన్ని పూరించండి",
        "Find the right platform, top up your card, and get off at the right stop.":
            "సరైన ప్లాట్‌ఫారమ్‌ను కనుగొని, మీ కార్డుకు డబ్బు టాప్ అప్ చేసి, సరైన స్టాప్‌లో దిగండి.",
        "How many times a day?": "రోజుకు ఎన్నిసార్లు?",
        "How much?": "ఎంత?",
        "If work is not safe, tell your supervisor. You can say no to unsafe work. You can also call MOM at 6438 5122.":
            "పని సురక్షితం కాకపోతే మీ సూపర్‌వైజర్‌కు చెప్పండి. అసురక్షిత పనికి మీరు కాదు అని చెప్పవచ్చు. MOMకు 6438 5122 నంబరుకు కూడా కాల్ చేయవచ్చు.",
        "If you are hurt at work, tell your supervisor the same day and see a doctor. Keep the MC and every receipt.":
            "పనిలో గాయపడితే అదే రోజు మీ సూపర్‌వైజర్‌కు చెప్పి డాక్టర్‌ను కలవండి. MC మరియు ప్రతి రసీదును భద్రంగా ఉంచండి.",
        "If you are sick, go to a clinic near your dormitory or a polyclinic. In an emergency, call 995 for an ambulance.":
            "అనారోగ్యంగా ఉంటే మీ డార్మిటరీ దగ్గరి క్లినిక్‌కు లేదా పాలీక్లినిక్‌కు వెళ్లండి. అత్యవసర పరిస్థితిలో అంబులెన్స్ కోసం 995కు కాల్ చేయండి.",
        "If your employer does not let you see a doctor, call MOM at 6438 5122 or the Migrant Workers' Centre at 6536 2692.":
            "మీ యజమాని డాక్టర్‌ను కలవనివ్వకపోతే MOMకు 6438 5122 లేదా మైగ్రెంట్ వర్కర్స్ సెంటర్‌కు 6536 2692 నంబరుకు కాల్ చేయండి.",
        "In an emergency, call 995 for an ambulance.":
            "అత్యవసర పరిస్థితిలో అంబులెన్స్ కోసం 995కు కాల్ చేయండి.",
        "It is your turn at the chicken rice stall.": "చికెన్ రైస్ దుకాణం వద్ద మీ వంతు వచ్చింది.",
        "Listen. Tap what you hear": "వినండి. విన్నదాన్ని నొక్కండి",
        "Listen. What does it mean?": "వినండి. దీని అర్థం ఏమిటి?",
        "My salary is late.": "నా జీతం ఆలస్యమైంది.",
        "Order at a food stall, ask the price, and say how you want it.":
            "ఆహార దుకాణంలో ఆర్డర్ చేసి, ధర అడిగి, మీకు ఎలా కావాలో చెప్పండి.",
        "Ordering a drink without ice.": "ఐస్ లేకుండా పానీయం ఆర్డర్ చేయడం.",
        "Ordering one chicken rice to bring home.":
            "ఇంటికి తీసుకెళ్లడానికి ఒక చికెన్ రైస్ ఆర్డర్ చేయడం.",
        "Pointing to where it hurts.": "నొప్పి ఉన్న చోటును చూపించడం.",
        "Put the words in order": "పదాలను క్రమంలో పెట్టండి",
        "Say this in English": "దీన్ని ఇంగ్లీషులో చెప్పండి",
        "Say what is wrong, ask for an MC, and understand how to take your medicine.":
            "మీ సమస్యను చెప్పి, ఎంసీ అడిగి, మందు ఎలా తీసుకోవాలో తెలుసుకోండి.",
        "Saying thank you to an older man.": "పెద్ద వయసు వ్యక్తికి ధన్యవాదాలు చెప్పడం.",
        "Saying thank you.": "ధన్యవాదాలు చెప్పడం.",
        "Saying that something is not safe.": "ఏదో సురక్షితం కాదని చెప్పడం.",
        "Saying that you are injured.": "మీరు గాయపడ్డారని చెప్పడం.",
        "Saying you want the food in a box, not on a plate.":
            "ఆహారం ప్లేటులో కాకుండా బాక్సులో కావాలని చెప్పడం.",
        "Saying your pay has not come on time.": "మీ జీతం సమయానికి రాలేదని చెప్పడం.",
        "Seats in a different colour are reserved seats. Give them to old people, pregnant women, and anyone who is hurt.":
            "వేరే రంగులో ఉన్న సీట్లు రిజర్వ్ చేసిన సీట్లు. వాటిని వృద్ధులకు, గర్భిణులకు, గాయపడిన వారికి ఇవ్వండి.",
        "Seeing a doctor": "డాక్టర్‌ను కలవడం",
        "Stand on the left side of the escalator so people can walk past on the right.":
            "ఎస్కలేటర్‌లో ఎడమ వైపు నిలబడండి, అప్పుడు ఇతరులు కుడి వైపు నుండి నడిచి వెళ్లగలరు.",
        "Take medicine the way the doctor says: how many times a day, and before or after food.":
            "డాక్టర్ చెప్పినట్లు మందు తీసుకోండి: రోజుకు ఎన్నిసార్లు, భోజనానికి ముందా తర్వాతా.",
        "Taking the MRT": "ఎంఆర్‌టీ ప్రయాణం",
        "Tap the pairs": "జతలను నొక్కండి",
        "Tap your card at the gate when you go in and again when you go out. If you forget to tap out, you pay the highest fare.":
            "లోపలికి వెళ్లేటప్పుడు, బయటకు వచ్చేటప్పుడు గేటు వద్ద మీ కార్డును ట్యాప్ చేయండి. బయటకు వచ్చేటప్పుడు ట్యాప్ చేయడం మరిస్తే అత్యధిక ఛార్జీ చెల్లించాలి.",
        "Telling staff your card is not working at the gate.":
            "గేటు వద్ద మీ కార్డు పనిచేయడం లేదని సిబ్బందికి చెప్పడం.",
        "Telling the doctor your body is hot.": "మీ శరీరం వేడిగా ఉందని డాక్టర్‌కు చెప్పడం.",
        "The doctor asks what is wrong.": "ఏమైందని డాక్టర్ అడుగుతున్నారు.",
        "The doctor asks where it hurts.": "ఎక్కడ నొప్పిగా ఉందని డాక్టర్ అడుగుతున్నారు.",
        "The doctor wants to know where it hurts.":
            "ఎక్కడ నొప్పిగా ఉందో డాక్టర్ తెలుసుకోవాలనుకుంటున్నారు.",
        "The seller asks for your order.": "అమ్మకందారు మీ ఆర్డర్ అడుగుతున్నారు.",
        "The seller asks if you will eat here or bring it home.":
            "ఇక్కడే తింటారా లేక ఇంటికి తీసుకెళ్తారా అని అమ్మకందారు అడుగుతున్నారు.",
        "The staff member asks if you need help.": "సహాయం కావాలా అని సిబ్బంది అడుగుతున్నారు.",
        "The supervisor asks what happened.": "ఏం జరిగిందని సూపర్‌వైజర్ అడుగుతున్నారు.",
        "The supervisor gives a long instruction.": "సూపర్‌వైజర్ పొడవైన సూచన ఇస్తున్నారు.",
        "Top up your card for free at the machine inside the station. 7-Eleven and Cheers shops also top up, but they charge a small fee each time.":
            "స్టేషన్ లోపలి మెషీన్‌లో మీ కార్డును ఉచితంగా టాప్ అప్ చేయండి. 7-Eleven మరియు Cheers దుకాణాలు కూడా టాప్ అప్ చేస్తాయి, కానీ ప్రతిసారీ చిన్న రుసుము తీసుకుంటాయి.",
        "Use the same card or phone both times. If you tap in with your card and out with your phone, the trip will not match.":
            "రెండుసార్లూ ఒకే కార్డు లేదా ఫోన్ వాడండి. కార్డుతో లోపలికి ట్యాప్ చేసి ఫోన్‌తో బయటకు ట్యాప్ చేస్తే ప్రయాణం సరిపోలదు.",
        "Wear your helmet, safety boots and vest on the worksite. Your employer must give them to you for free.":
            "పని స్థలంలో హెల్మెట్, సేఫ్టీ బూట్లు, వెస్ట్ ధరించండి. మీ యజమాని వాటిని మీకు ఉచితంగా ఇవ్వాలి.",
        "What do you say?": "మీరు ఏమి చెబుతారు?",
        "What is this called?": "దీన్ని ఏమంటారు?",
        "Which one is this?": "ఇది ఏది?",
        "Which platform for Jurong East?": "జురాంగ్ ఈస్ట్‌కు ఏ ప్లాట్‌ఫారమ్?",
        "You are at a food stall. You want to eat at home.":
            "మీరు ఆహార దుకాణం వద్ద ఉన్నారు. ఇంట్లో తినాలనుకుంటున్నారు.",
        "You are in the doctor's room.": "మీరు డాక్టర్ గదిలో ఉన్నారు.",
        "You fell and your arm is bleeding. Your supervisor runs over.":
            "మీరు పడిపోయారు, మీ చేయి నుండి రక్తం కారుతోంది. మీ సూపర్‌వైజర్ పరుగెత్తుకుని వచ్చారు.",
        "Your card does not work at the gate. A staff member comes over.":
            "గేటు వద్ద మీ కార్డు పనిచేయడం లేదు. ఒక సిబ్బంది వచ్చారు.",
        "Your employer must pay for your medical care. Keep every receipt.":
            "మీ వైద్య ఖర్చులను మీ యజమాని చెల్లించాలి. ప్రతి రసీదును భద్రంగా ఉంచండి.",
        "Your salary must be paid within 7 days after the end of the month. If it is late, call MOM.":
            "నెల ముగిసిన 7 రోజుల్లోగా మీ జీతం చెల్లించాలి. ఆలస్యమైతే MOMకు కాల్ చేయండి.",
        "Your supervisor speaks very fast. You did not understand.":
            "మీ సూపర్‌వైజర్ చాలా వేగంగా మాట్లాడతారు. మీకు అర్థం కాలేదు.",
        "a day off from work": "పని నుండి ఒక రోజు సెలవు",
        "a day with no work": "పని లేని ఒక రోజు",
        "a fixed time to see the doctor": "డాక్టర్‌ను కలవడానికి నిర్ణయించిన సమయం",
        "a paper from the doctor that says you are sick":
            "మీరు అనారోగ్యంగా ఉన్నారని చెప్పే డాక్టర్ కాగితం",
        "a seat for old, pregnant or hurt people":
            "వృద్ధులు, గర్భిణులు లేదా గాయపడిన వారి కోసం సీటు",
        "a short rest from work": "పని నుండి కొద్దిసేపు విశ్రాంతి",
        "a small place where a doctor sees you": "డాక్టర్ మిమ్మల్ని చూసే చిన్న చోటు",
        "a smaller amount": "తక్కువ మొత్తం",
        "a station where you change to another line": "మరో లైన్‌కు మారే స్టేషన్",
        "add money to your card": "మీ కార్డులో డబ్బు వేయడం",
        "bring the food home in a box": "ఆహారాన్ని బాక్సులో ఇంటికి తీసుకెళ్లడం",
        "change to another train line": "మరో రైలు లైన్‌కు మారడం",
        "eat here, at a table": "ఇక్కడే టేబుల్ వద్ద తినడం",
        "get off the train": "రైలు దిగడం",
        "hot, with chilli": "కారంగా, మిర్చితో",
        "it hurts": "నొప్పిగా ఉంది",
        "not safe; you can get hurt": "సురక్షితం కాదు; మీరు గాయపడవచ్చు",
        "one more time": "మరోసారి",
        "one small shop inside a hawker centre": "హాకర్ సెంటర్ లోపల ఒక చిన్న దుకాణం",
        "paper money and coins": "నోట్లు మరియు నాణేలు",
        "rice with chicken, a common Singapore meal": "చికెన్‌తో అన్నం, సింగపూర్‌లో సాధారణ భోజనం",
        "something to drink, like tea or juice": "తాగడానికి ఏదైనా, టీ లేదా జ్యూస్ లాంటిది",
        "stay home and sleep": "ఇంట్లో ఉండి నిద్రపోవడం",
        "strong shoes for work": "పని కోసం గట్టి బూట్లు",
        "the boss at your worksite": "మీ పని స్థలంలో బాస్",
        "the money you get for your work": "మీ పనికి మీకు వచ్చే డబ్బు",
        "the money you pay for the trip": "ప్రయాణానికి మీరు చెల్లించే డబ్బు",
        "the way out of the station": "స్టేషన్ నుండి బయటకు దారి",
        "touch your card at the gate when you leave":
            "బయటకు వెళ్లేటప్పుడు గేటు వద్ద మీ కార్డును తాకించడం",
        "wait for the next train": "తదుపరి రైలు కోసం వేచి ఉండడం",
        "what is the price": "ధర ఎంత",
        "what you take to get better": "నయం కావడానికి మీరు తీసుకునేది",
        "when air comes out of your mouth with a loud sound":
            "నోటి నుండి పెద్ద శబ్దంతో గాలి బయటకు రావడం",
        "where you wait for the train": "మీరు రైలు కోసం వేచి ఉండే చోటు",
        "your body is injured": "మీ శరీరం గాయపడింది",
        "your body is very hot": "మీ శరీరం చాలా వేడిగా ఉంది",
        // AI Words (workshop lesson)
        "AI Words": "AI పదాలు",
        "Know the key words people use when they talk about AI.":
            "AI గురించి మాట్లాడేటప్పుడు ప్రజలు వాడే ముఖ్యమైన పదాలను తెలుసుకోండి.",
        "computer programs that can do tasks that usually need a human mind":
            "సాధారణంగా మనిషి ఆలోచించి చేయాల్సిన పనులను చేయగల కంప్యూటర్ ప్రోగ్రాములు",
        "how an AI gets better by learning patterns from lots of examples":
            "చాలా ఉదాహరణలలో మళ్లీ మళ్లీ కనిపించే వాటిని నేర్చుకుని AI మెరుగయ్యే విధానం",
        "the examples (text, photos, recordings) an AI learns from":
            "AI నేర్చుకునే ఉదాహరణలు (రాతలు, ఫోటోలు, రికార్డింగ్‌లు)",
        "an AI you have a conversation with by typing, like ChatGPT or Gemini":
            "మీరు టైప్ చేసి మాట్లాడుకునే AI, ChatGPT లేదా Gemini లాంటిది",
        "the question or instruction you type or say to an AI": "మీరు AIకి టైప్ చేసే లేదా చెప్పే ప్రశ్న లేదా సూచన",
        "AI that creates new things: text, pictures, music or video":
            "కొత్త వాటిని తయారు చేసే AI: రాతలు, చిత్రాలు, సంగీతం లేదా వీడియో",
        "an AI that listens to your voice and answers out loud, like Siri":
            "మీ మాట విని, తిరిగి మాట్లాడి జవాబు చెప్పే AI, Siri లాంటిది",
        "AI that can tell what is in a photo": "ఫోటోలో ఏముందో చెప్పగల AI",
        "when an AI confidently gives an answer that is made up or wrong":
            "AI పూర్తి నమ్మకంతో తనే కల్పించిన లేదా తప్పు జవాబు ఇవ్వడం",
        "Saying the AI gave a confident answer that was false.": "AI నమ్మకంగా తప్పు జవాబు ఇచ్చిందని చెప్పడం.",
        "Suggesting a more detailed question to get a better answer.":
            "మంచి జవాబు రావాలంటే ఇంకా వివరంగా అడగమని సూచించడం.",
        "Which one is a chatbot?": "వీటిలో chatbot ఏది?",
        "Which word fits?": "ఏ పదం సరిపోతుంది?",
        "Your friend has been using a chatbot and looks confused.":
            "మీ స్నేహితుడు ఒక chatbot వాడుతున్నాడు, అయోమయంగా కనిపిస్తున్నాడు.",
        "Your friend searched for the book and could not find it anywhere.":
            "మీ స్నేహితుడు ఆ పుస్తకం కోసం వెతికాడు, కానీ అది ఎక్కడా దొరకలేదు.",
        "Saying it was an AI that answers out loud.": "అది మాట్లాడి జవాబు చెప్పే AI అని చెప్పడం.",
        "Saying it was the examples the AI learned from.": "అది AI నేర్చుకున్న ఉదాహరణలు అని చెప్పడం.",
        "Your friend asked a chatbot to plan a trip.": "మీ స్నేహితుడు ఒక ప్రయాణం ప్లాన్ చేయమని chatbotను అడిగాడు.",
        "The answer did not have enough detail to be useful.": "ఆ జవాబులో ఉపయోగపడేంత వివరాలు లేవు.",
        "Suggesting they change what the AI learned from.": "AI నేర్చుకోవడానికి వాడిన వాటిని మార్చమని సూచించడం.",
        "Suggesting they use an AI that reads photos.": "ఫోటోలను అర్థం చేసుకునే AIని వాడమని సూచించడం.",
        "A chatbot answers whatever you type, and what you type is your prompt. Try the ideas below, or ask anything you like.":
            "మీరు ఏది టైప్ చేసినా chatbot జవాబు ఇస్తుంది, మీరు టైప్ చేసేదే మీ prompt. కింద ఉన్న ఆలోచనలను ప్రయత్నించండి, లేదా మీకు నచ్చినది ఏదైనా అడగండి.",
        "Say exactly what you want.": "మీకు ఏం కావాలో సరిగ్గా చెప్పండి.",
        "Give context: who it is for, and limits like time or budget.":
            "సందర్భం చెప్పండి: ఇది ఎవరి కోసం, సమయం లేదా బడ్జెట్ లాంటి పరిమితులు.",
        "Say the format: a list, three sentences, a short message.":
            "ఏ రూపంలో కావాలో చెప్పండి: జాబితా, మూడు వాక్యాలు, చిన్న మెసేజ్.",
        "Not happy with the answer? Ask a follow-up to change it.":
            "జవాబు నచ్చలేదా? దాన్ని మార్చడానికి follow-up ప్రశ్న అడగండి.",
        "Ask about an AI word": "ఒక AI పదం గురించి అడగండి",
        "Pick any word from the lesson and ask the chatbot to explain it.":
            "పాఠంలోని ఏదైనా ఒక పదాన్ని ఎంచుకుని, దాన్ని వివరించమని chatbotను అడగండి.",
        "Send a vague prompt": "స్పష్టంగా లేని prompt పంపండి",
        "Send this short prompt and see what comes back.": "ఈ చిన్న prompt పంపి, ఏం జవాబు వస్తుందో చూడండి.",
        "Now add the details": "ఇప్పుడు వివరాలు జోడించండి",
        "Same request with context, limits and a format. Compare the two answers.":
            "అదే అభ్యర్థన, ఈసారి సందర్భం, పరిమితులు, రూపంతో కలిపి. రెండు జవాబులను పోల్చి చూడండి.",
        "Make something new": "కొత్తది ఏదైనా తయారు చేయండి",
        "That's generative AI: it writes something that did not exist before.":
            "ఇదే generative AI: ఇంతకు ముందు లేనిదాన్ని ఇది రాస్తుంది.",
        "Ask a follow-up": "ఒక follow-up ప్రశ్న అడగండి",
        "Change the last answer without starting again.": "మళ్లీ మొదటి నుండి మొదలుపెట్టకుండా, చివరి జవాబును మార్చండి.",
        "Check for a hallucination": "hallucination ఉందో లేదో చూడండి",
        "Ask for facts, then ask if it is sure. Chatbots can sound confident and still be wrong.":
            "నిజాలు అడగండి, తర్వాత అది ఖచ్చితంగా తెలుసా అని అడగండి. chatbotలు నమ్మకంగా మాట్లాడినా తప్పు చెప్పవచ్చు.",
        "Getting to know someone": "కొత్తవారితో పరిచయం",
        "Say your name and where you are from, and ask new people about themselves.":
            "మీ పేరు, మీరు ఎక్కడి నుంచి వచ్చారో చెప్పండి. కొత్తగా కలిసినవారిని వారి గురించి అడగండి.",
        "People in Singapore often say \"Have you eaten?\" as a friendly hello. You can say \"Yes, thank you.\"":
            "సింగపూర్‌లో పలకరించడానికి తరచూ \"Have you eaten?\" అంటారు. మీరు \"Yes, thank you.\" అనవచ్చు.",
        "People may call an older woman \"Aunty\" and an older man \"Uncle\". It is polite, even if you are not family.":
            "పెద్ద వయసు మహిళను \"Aunty\" అని, పురుషుడిని \"Uncle\" అని పిలవవచ్చు. బంధువులు కాకపోయినా ఇలా పిలవడం మర్యాద.",
        "You do not have to answer every question. If someone asks about your pay or your family and you do not want to say, you can smile and change the topic.":
            "ప్రతి ప్రశ్నకూ జవాబు చెప్పాల్సిన అవసరం లేదు. జీతం లేదా కుటుంబం గురించి అడిగితే చెప్పడం ఇష్టం లేకపోతే, నవ్వుతూ వేరే విషయం మాట్లాడవచ్చు.",
        "The best way to learn is to talk. Say hello to one new person on your day off.":
            "మాట్లాడితే బాగా నేర్చుకుంటారు. మీ సెలవు రోజున ఒక కొత్త వ్యక్తిని పలకరించండి.",
        "what people call you": "మిమ్మల్ని పిలిచే పేరు",
        "a place like India or Bangladesh": "భారతదేశం లేదా బంగ్లాదేశ్ వంటి దేశం",
        "your parents, husband or wife, and children": "మీ తల్లిదండ్రులు, భర్త లేదా భార్య, పిల్లలు",
        "young boys and girls; sons and daughters":
            "చిన్న అబ్బాయిలు, అమ్మాయిలు; కొడుకులు, కూతుళ్లు",
        "someone you like and spend time with": "మీకు నచ్చి, మీరు సమయం గడిపే వ్యక్తి",
        "the work you do for money": "డబ్బు కోసం మీరు చేసే పని",
        "something you like to do in your free time": "ఖాళీ సమయంలో మీకు చేయడం ఇష్టమైన పని",
        "the day after Saturday; many workers rest":
            "శనివారం తర్వాతి రోజు; చాలామంది కార్మికులు విశ్రాంతి తీసుకుంటారు",
        "Asking someone's name.": "ఒకరి పేరు అడగడం.",
        "Telling someone your name.": "మీ పేరు చెప్పడం.",
        "Asking which country someone comes from.": "ఒకరు ఏ దేశం నుంచి వచ్చారో అడగడం.",
        "Asking what work someone does.": "ఒకరు ఏ పని చేస్తారో అడగడం.",
        "Saying you are happy to meet someone new.":
            "కొత్త వ్యక్తిని కలవడం సంతోషంగా ఉందని చెప్పడం.",
        "Asking about someone's day off.": "ఒకరి సెలవు రోజు గురించి అడగడం.",
        "You meet someone new at the park on your day off.":
            "మీ సెలవు రోజున పార్కులో కొత్త వ్యక్తిని కలుస్తారు.",
        "The new person asks your name.": "కొత్తగా కలిసిన వ్యక్తి మీ పేరు అడుగుతున్నారు.",
        "Your friend brings a new person to meet you.":
            "మీ స్నేహితుడు కొత్త వ్యక్తిని మీకు పరిచయం చేయడానికి తీసుకొస్తారు.",
        "The new person tells you her name.": "కొత్తగా కలిసిన మహిళ తన పేరు చెబుతున్నారు.",
        "What is your job?": "మీరు ఏ పని చేస్తారు?",
        "Helping at home": "ఇంటిపనిలో సహాయం",
        "Understand what to do at home, say what you have finished, and ask when you are not sure.":
            "ఇంట్లో ఏం చేయాలో తెలుసుకోండి. ఏ పని పూర్తయిందో చెప్పండి. తెలియకపోతే అడగండి.",
        "Never lean out of a window to clean it or to hang clothes. If someone asks you to, say it is not safe.":
            "కిటికీ శుభ్రం చేయడానికైనా, బట్టలు ఆరేయడానికైనా బయటకు వంగకండి. ఎవరైనా అలా చేయమంటే సురక్షితం కాదని చెప్పండి.",
        "Never throw anything out of a window. Put rubbish in the rubbish chute or the bin.":
            "కిటికీ నుంచి ఏదీ బయటకు విసరకండి. చెత్తను వంటగదిలోని చెత్త వేసే లోహపు తలుపు ఉన్న గొట్టంలో లేదా చెత్తబుట్టలో వేయండి.",
        "Never mix bleach with other cleaning products. The gas can hurt you.":
            "బ్లీచ్‌ను ఇతర శుభ్రపరిచే పదార్థాలతో కలపకండి. వచ్చే వాయువు మీకు హాని చేయవచ్చు.",
        "If you do not know how to use a machine, ask first. It is better to ask than to break it.":
            "యంత్రం ఎలా వాడాలో తెలియకపోతే ముందు అడగండి. పాడుచేయడం కంటే అడగడం మంచిది.",
        "clothes to wash": "ఉతకాల్సిన బట్టలు",
        "a hot tool that makes clothes flat": "బట్టల ముడతలు పోగొట్టే వేడి పరికరం",
        "a stick with cloth for washing the floor": "నేలను కడగడానికి గుడ్డ ఉన్న కర్ర",
        "plates and bowls you eat from": "మీరు తినడానికి వాడే ప్లేట్లు, గిన్నెలు",
        "things you throw away": "మీరు పారవేసే వస్తువులు",
        "a cold box that keeps food fresh": "ఆహారం తాజాగా ఉండేలా చల్లగా ఉంచే పెట్టె",
        "where you cook food with fire": "మంటతో వంట చేసే చోటు",
        "a place with doors to keep things": "వస్తువులు పెట్టుకోవడానికి తలుపులున్న చోటు",
        "Asking what work comes after this.": "దీని తర్వాత ఏ పని చేయాలో అడగడం.",
        "Saying the laundry is done.": "బట్టలు ఉతకడం పూర్తయిందని చెప్పడం.",
        "Asking where something goes.": "ఒక వస్తువును ఎక్కడ పెట్టాలో అడగడం.",
        "Asking someone to show you the way to do it.": "ఎలా చేయాలో చూపించమని అడగడం.",
        "Saying sorry and telling the truth about a broken plate.":
            "ప్లేటు పగిలినందుకు క్షమాపణ చెప్పి నిజం చెప్పడం.",
        "You finished washing the clothes. Your employer comes into the room.":
            "మీరు బట్టలు ఉతకడం పూర్తి చేశారు. మీ యజమాని గదిలోకి వస్తున్నారు.",
        "Your employer asks if the clothes are washed.":
            "బట్టలు ఉతికారా అని మీ యజమాని అడుగుతున్నారు.",
        "There is a new iron at home. You do not know how to use it.":
            "ఇంట్లో కొత్త ఇస్త్రీ పెట్టె ఉంది. దాన్ని ఎలా వాడాలో మీకు తెలియదు.",
        "Your employer asks you to iron the shirts.":
            "చొక్కాలు ఇస్త్రీ చేయమని మీ యజమాని అడుగుతున్నారు.",
        "Sorry, I broke a plate.": "క్షమించండి, నేను ఒక ప్లేటు పగలగొట్టాను.",
        "Reading signs": "సైన్ బోర్డులు చదవడం",
        "Read the signs you see every day, and ask when you do not understand one.":
            "రోజూ కనిపించే సైన్ బోర్డులు చదవండి. అర్థం కాకపోతే అడగండి.",
        "Red signs usually mean stop or danger. Yellow means be careful. Green usually means safe, or the way out.":
            "ఎరుపు బోర్డులు సాధారణంగా ఆగమని లేదా ప్రమాదమని చెబుతాయి. పసుపు అంటే జాగ్రత్త. ఆకుపచ్చ అంటే సాధారణంగా సురక్షితం లేదా బయటకు వెళ్లే దారి.",
        "You can be fined for smoking where it is not allowed. Many places have a yellow box that shows where you can smoke.":
            "అనుమతి లేని చోట పొగ తాగితే జరిమానా పడవచ్చు. పొగ తాగవచ్చే చోట చాలా సార్లు పసుపు రంగు గీతలతో పెట్టె ఆకారంలో గుర్తు ఉంటుంది.",
        "Many signs in Singapore are in English, Chinese, Malay and Tamil. If your language is there, read it first, then look for the English word.":
            "సింగపూర్‌లో చాలా బోర్డులు ఇంగ్లీషు, చైనీస్, మలయ్, తమిళంలో ఉంటాయి. మీ భాష ఉంటే ముందు అది చదివి, తర్వాత ఇంగ్లీషు పదాన్ని చూడండి.",
        "Not sure what a sign means? Take a photo and ask someone. Do not go past a danger sign.":
            "బోర్డు అర్థం తెలియదా? ఫోటో తీసి ఎవరినైనా అడగండి. ప్రమాద బోర్డును దాటి వెళ్లకండి.",
        "the floor has water; you can slip": "నేలపై నీరు ఉంది; జారిపడవచ్చు",
        "do not go in": "లోపలికి వెళ్లకండి",
        "do not smoke here": "ఇక్కడ పొగ తాగకండి",
        "not open now": "ఇప్పుడు తెరిచి లేదు",
        "press the door away from you": "తలుపును మీ నుంచి దూరంగా నెట్టండి",
        "bring the door towards you": "తలుపును మీ వైపు లాగండి",
        "the room with a toilet, in a public place": "బహిరంగ ప్రదేశంలో మరుగుదొడ్డి ఉన్న గది",
        "something here can hurt you": "ఇక్కడ ఉన్నది మీకు హాని చేయవచ్చు",
        "Asking someone to explain a sign.": "బోర్డు అర్థం చెప్పమని అడగడం.",
        "Telling someone to be careful of the wet floor.": "తడి నేలపై జాగ్రత్తగా ఉండమని చెప్పడం.",
        "Asking the way to the toilet.": "మరుగుదొడ్డికి దారి అడగడం.",
        "Saying a shop is not open.": "దుకాణం తెరిచి లేదని చెప్పడం.",
        "Telling someone they are not allowed to enter.":
            "లోపలికి వెళ్లడానికి అనుమతి లేదని చెప్పడం.",
        "You are new in a building and you need the toilet. You see a cleaner.":
            "ఈ భవనానికి మీరు కొత్త. మరుగుదొడ్డికి వెళ్లాలి. శుభ్రం చేసే వ్యక్తి కనిపిస్తారు.",
        "The cleaner asks if you need help.": "సహాయం కావాలా అని శుభ్రం చేసే వ్యక్తి అడుగుతున్నారు.",
        "Your friend is walking to a door with a red No Entry sign.":
            "మీ స్నేహితుడు ఎరుపు No Entry బోర్డు ఉన్న తలుపు వైపు నడుస్తున్నారు.",
        "Your friend asks if they can go in.":
            "లోపలికి వెళ్లవచ్చా అని మీ స్నేహితుడు అడుగుతున్నారు.",
        "The shop is closed.": "దుకాణం మూసి ఉంది.",
        "Buses and finding your way": "బస్సులు, దారి తెలుసుకోవడం",
        "Find the right bus, get off at your stop, and ask for directions when you are lost.":
            "సరైన బస్సు ఎక్కండి, మీ స్టాప్‌లో దిగండి. దారి తప్పితే దారి అడగండి.",
        "Tap your card when you get on the bus and again when you get off. If you forget to tap when you get off, you can pay more.":
            "బస్సు ఎక్కేటప్పుడు, దిగేటప్పుడు మీ కార్డును ట్యాప్ చేయండి. దిగేటప్పుడు మరిస్తే ఎక్కువ డబ్బు చెల్లించాల్సి రావచ్చు.",
        "Press the bell just before your stop. If nobody presses it and nobody is waiting, the bus does not stop.":
            "మీ స్టాప్ రావడానికి కొంచెం ముందు బెల్ నొక్కండి. ఎవరూ నొక్కకపోయినా, ఎవరూ వేచి లేకపోయినా బస్సు ఆగదు.",
        "Raise your hand when your bus comes, so the driver knows to stop.":
            "మీ బస్సు వచ్చినప్పుడు చేయి ఎత్తండి. అప్పుడు ఆపాలని డ్రైవర్‌కు తెలుస్తుంది.",
        "Cross the road at a traffic light or an overhead bridge. You can be fined for crossing somewhere else nearby.":
            "ట్రాఫిక్ లైట్ వద్ద లేదా రోడ్డు మీదుగా నడిచి వెళ్లే వంతెనపై రోడ్డు దాటండి. దగ్గరలో వేరే చోట దాటితే జరిమానా పడవచ్చు.",
        "where you wait for the bus": "బస్సు కోసం వేచి ఉండే చోటు",
        "press it to ask the bus to stop": "బస్సు ఆపమని చెప్పడానికి దీన్ని నొక్కండి",
        "the side of your left hand": "మీ ఎడమ చేతి వైపు",
        "the side of your right hand": "మీ కుడి చేతి వైపు",
        "keep going ahead; do not turn": "ముందుకు వెళ్తూ ఉండండి; తిరగకండి",
        "the lights that say stop or go": "ఆగాలో వెళ్లాలో చెప్పే లైట్లు",
        "a bridge for walking over a road": "రోడ్డు మీదుగా నడిచి వెళ్లే వంతెన",
        "a picture that shows where places are": "ప్రదేశాలు ఎక్కడున్నాయో చూపించే చిత్రం",
        "Asking which bus to take.": "ఏ బస్సు ఎక్కాలో అడగడం.",
        "Asking the way to the bus stop.": "బస్సు స్టాప్‌కు దారి అడగడం.",
        "Telling someone the way.": "ఒకరికి దారి చెప్పడం.",
        "Saying you do not know where you are.": "మీరు ఎక్కడున్నారో తెలియదని చెప్పడం.",
        "Asking someone to tell you when to get off.": "ఎప్పుడు దిగాలో చెప్పమని అడగడం.",
        "You are at a bus stop and want to go to Little India. A woman is waiting next to you.":
            "మీరు బస్సు స్టాప్‌లో ఉన్నారు. Little India వెళ్లాలి. మీ పక్కన ఒక మహిళ వేచి ఉన్నారు.",
        "The woman asks if you are waiting for a bus.":
            "బస్సు కోసం వేచి ఉన్నారా అని ఆ మహిళ అడుగుతున్నారు.",
        "You do not know this road and your phone has no battery. You see a man walking.":
            "మీకు ఈ రోడ్డు తెలియదు. మీ ఫోన్‌లో ఛార్జ్ లేదు. నడుస్తున్న ఒక వ్యక్తి కనిపిస్తారు.",
        "The man asks if he can help you.": "మీకు సహాయం చేయవచ్చా అని ఆ వ్యక్తి అడుగుతున్నారు.",
        "Please tell me my stop.": "దయచేసి నా స్టాప్ వచ్చినప్పుడు చెప్పండి.",
        "At the supermarket": "సూపర్‌మార్కెట్‌లో",
        "Find what you need, check the price and the date, and pay at the counter.":
            "కావాల్సినవి కనుగొనండి, ధర, తేదీ చూసి, కౌంటర్ వద్ద డబ్బు చెల్లించండి.",
        "Big supermarkets charge at least 5 cents for each plastic bag. Bring your own bag to save money.":
            "పెద్ద సూపర్‌మార్కెట్లలో ఒక్కో ప్లాస్టిక్ సంచికి కనీసం 5 సెంట్లు తీసుకుంటారు. డబ్బు ఆదా చేయడానికి మీ సంచి తెచ్చుకోండి.",
        "Look for the date on food before you buy it. \"Best before\" and \"Use by\" tell you how long it is good.":
            "ఆహారం కొనే ముందు దాని మీద తేదీ చూడండి. \"Best before\", \"Use by\" అది ఎంతకాలం బాగుంటుందో చెబుతాయి.",
        "Keep the receipt when you shop for someone else, so you can show what you spent.":
            "వేరొకరి కోసం కొన్నప్పుడు రసీదు ఉంచుకోండి. ఎంత ఖర్చు చేశారో చూపించవచ్చు.",
        "The cashier may ask if you have a member card. If you do not have one, just say no.":
            "సభ్యత్వ కార్డు ఉందా అని డబ్బు తీసుకునే వ్యక్తి అడగవచ్చు. లేకపోతే లేదని చెప్పండి.",
        "a big basket on wheels": "చక్రాలున్న పెద్ద బుట్ట",
        "the walkway between shelves": "అరల మధ్య నడిచే దారి",
        "the person you pay": "మీరు డబ్బు చెల్లించే వ్యక్తి",
        "the paper that shows what you paid": "మీరు చెల్లించిన డబ్బు వివరాలున్న కాగితం",
        "a lower price than usual": "మామూలు కంటే తక్కువ ధర",
        "the last day the food is good": "ఆహారం బాగుండే చివరి రోజు",
        "a thin bag to carry your shopping": "కొన్న వస్తువులు తీసుకెళ్లే పలుచని సంచి",
        "plants you cook and eat, like carrots": "క్యారెట్ వంటి వండి తినే మొక్కలు",
        "Asking where to find something.": "ఒక వస్తువు ఎక్కడ దొరుకుతుందో అడగడం.",
        "Asking if the price is lower today.": "ఈ రోజు ధర తక్కువగా ఉందా అని అడగడం.",
        "Asking the cashier for a bag.": "డబ్బు తీసుకునే వ్యక్తిని సంచి అడగడం.",
        "Asking the cashier for the receipt.": "డబ్బు తీసుకునే వ్యక్తిని రసీదు అడగడం.",
        "Telling staff that the food is past its date.": "ఆహారం గడువు దాటిందని సిబ్బందికి చెప్పడం.",
        "You are paying at the counter. You do not have your own bag.":
            "మీరు కౌంటర్ వద్ద డబ్బు చెల్లిస్తున్నారు. మీ సొంత సంచి లేదు.",
        "The cashier tells you the price.": "డబ్బు తీసుకునే వ్యక్తి ధర చెబుతున్నారు.",
        "The milk in your basket is past its date. You show it to a staff member.":
            "మీ బుట్టలోని పాల గడువు దాటింది. మీరు సిబ్బందికి చూపిస్తున్నారు.",
        "A staff member asks if they can help you.":
            "మీకు సహాయం చేయవచ్చా అని సిబ్బంది అడుగుతున్నారు.",
        "Is this on discount?": "దీనికి ధర తగ్గింపు ఉందా?",
        "Construction science": "నిర్మాణం వెనుక శాస్త్రం",
        "Learn the main building materials, why a building stays up, and how to warn others about a problem.":
            "ముఖ్యమైన నిర్మాణ సామగ్రి, భవనం ఎలా నిలబడుతుందో, సమస్య ఉంటే ఇతరులను ఎలా హెచ్చరించాలో నేర్చుకోండి.",
        "Concrete is strong when it is pressed, but it cracks when it is pulled. That is why steel bars go inside it.":
            "కాంక్రీటు ఒత్తిడిని బాగా తట్టుకుంటుంది. కానీ లాగితే పగుళ్లు వస్తాయి. అందుకే దానిలో ఉక్కు కడ్డీలు పెడతారు.",
        "Too much water makes concrete weak. Use only the amount of water your supervisor tells you.":
            "ఎక్కువ నీరు కాంక్రీటును బలహీనం చేస్తుంది. మీ సూపర్‌వైజర్ చెప్పినంత నీరు మాత్రమే వాడండి.",
        "Concrete goes hard slowly. It takes about 28 days to reach full strength, so ask your supervisor before you put weight on it.":
            "కాంక్రీటు నెమ్మదిగా గట్టిపడుతుంది. పూర్తి బలం రావడానికి సుమారు 28 రోజులు పడుతుంది. దానిపై బరువు పెట్టే ముందు మీ సూపర్‌వైజర్‌ను అడగండి.",
        "A building carries its weight down: from the floor to the beams, to the columns, then into the ground. Never cut a beam or a column without permission.":
            "భవనం బరువు కిందికి వెళ్తుంది: నేల నుంచి బీములకు, కాలమ్‌లకు, ఆ తర్వాత భూమిలోకి. అనుమతి లేకుండా బీమ్ లేదా కాలమ్‌ను ఎప్పుడూ కోయకండి.",
        "Every scaffold has a weight limit. Too much weight can make it fall, so do not add more than you are told.":
            "ప్రతి పరంజాకు బరువు పరిమితి ఉంటుంది. ఎక్కువ బరువుతో అది పడిపోవచ్చు. చెప్పిన దానికంటే ఎక్కువ పెట్టకండి.",
        "cement, sand, stones and water mixed; it goes hard":
            "సిమెంటు, ఇసుక, రాళ్లు, నీటి మిశ్రమం; ఇది గట్టిపడుతుంది",
        "the grey powder that holds concrete together": "కాంక్రీటును కలిపి ఉంచే బూడిద రంగు పొడి",
        "a long metal rod inside concrete": "కాంక్రీటు లోపల ఉండే పొడవైన ఉక్కు కడ్డీ",
        "a strong part that goes across and holds up a floor":
            "అడ్డంగా ఉండి అంతస్తును మోసే బలమైన భాగం",
        "a strong part that stands up and carries the weight":
            "నిలువుగా ఉండి బరువును మోసే బలమైన భాగం",
        "the weight something must carry": "ఒక వస్తువు మోయాల్సిన బరువు",
        "a tool that shows if something is flat": "సమంగా ఉందో చూపించే పరికరం",
        "a metal frame you stand on to work up high": "ఎత్తులో పని చేయడానికి నిలబడే లోహపు చట్రం",
        "Warning that the concrete is not hard yet.": "కాంక్రీటు ఇంకా గట్టిపడలేదని హెచ్చరించడం.",
        "Saying that something weighs too much.": "ఏదైనా చాలా బరువుగా ఉందని చెప్పడం.",
        "Telling someone to stop adding water to the mix.":
            "మిశ్రమంలో ఇంకా నీరు పోయవద్దని చెప్పడం.",
        "Reporting a crack to your supervisor.": "పగులు గురించి మీ సూపర్‌వైజర్‌కు చెప్పడం.",
        "Asking someone to make sure the scaffold is safe.": "పరంజా సురక్షితంగా ఉందో చూడమని అడగడం.",
        "A worker is about to walk on the floor you poured this morning.":
            "ఈ ఉదయం మీరు కాంక్రీటు పోసిన నేలపై ఒక కార్మికుడు నడవబోతున్నారు.",
        "The worker asks if he can walk here.": "ఇక్కడ నడవవచ్చా అని కార్మికుడు అడుగుతున్నారు.",
        "Your co-worker is mixing concrete and keeps pouring in water.":
            "మీ తోటి కార్మికుడు కాంక్రీటు కలుపుతూ నీరు పోస్తూనే ఉన్నారు.",
        "Your co-worker wants to add more water.":
            "మీ తోటి కార్మికుడు ఇంకా నీరు పోయాలనుకుంటున్నారు.",
        "There is a crack in this column.": "ఈ కాలమ్‌లో పగులు ఉంది.",
    },
    ml: {
        'Signs and announcements say "alight". It means get off the train.':
            'ബോർഡുകളിലും അറിയിപ്പുകളിലും "alight" എന്ന് പറയും. അതിന്റെ അർത്ഥം ട്രെയിനിൽ നിന്ന് ഇറങ്ങുക എന്നാണ്.',
        'Say "take away" to bring the food home. Some stalls charge a little more for the box.':
            'ഭക്ഷണം വീട്ടിലേക്ക് കൊണ്ടുപോകാൻ "take away" എന്ന് പറയുക. ചില കടകൾ പെട്ടിക്ക് അൽപ്പം കൂടുതൽ ഈടാക്കും.',
        'A tissue packet on a table means someone has taken that seat. People call this "chope".':
            'മേശയിൽ ഒരു ടിഷ്യൂ പാക്കറ്റ് ഉണ്ടെങ്കിൽ ആ സീറ്റ് ആരോ എടുത്തിട്ടുണ്ട് എന്നാണ്. ഇതിനെ "chope" എന്ന് വിളിക്കുന്നു.',
        "A meal at a hawker centre or coffee shop usually costs 4 to 7 dollars. Most stalls take cash, and many take PayNow.":
            "ഹോക്കർ സെന്ററിലോ കോഫി ഷോപ്പിലോ ഒരു ഭക്ഷണത്തിന് സാധാരണ 4 മുതൽ 7 ഡോളർ വരെയാകും. മിക്ക കടകളും പണം സ്വീകരിക്കും, പലതിലും PayNow-ഉം നടക്കും.",
        "A quick practice with words from every lesson. New every day.":
            "എല്ലാ പാഠങ്ങളിലെയും വാക്കുകൾ ഉപയോഗിച്ചുള്ള ചെറിയ പരിശീലനം. എല്ലാ ദിവസവും പുതിയത്.",
        "After eating, return your tray and plates to the tray return point. It is the rule, and there can be a fine.":
            "കഴിച്ച ശേഷം ട്രേയും പ്ലേറ്റുകളും ട്രേ റിട്ടേൺ പോയിന്റിൽ തിരികെ വയ്ക്കുക. ഇത് നിയമമാണ്, പിഴയും വരാം.",
        "Ask the doctor for an MC. Give it to your employer so your sick day is counted as sick leave.":
            "ഡോക്ടറോട് MC ചോദിക്കുക. നിങ്ങളുടെ അസുഖ ദിവസം സിക്ക് ലീവായി കണക്കാക്കാൻ അത് തൊഴിലുടമയ്ക്ക് നൽകുക.",
        "Ask your supervisor to say it again, say when something is not safe, and ask for a day off.":
            "വീണ്ടും പറയാൻ സൂപ്പർവൈസറോട് ആവശ്യപ്പെടുക, സുരക്ഷിതമല്ലെങ്കിൽ പറയുക, അവധി ചോദിക്കുക.",
        "Asking for a day with no work.": "ജോലിയില്ലാത്ത ഒരു ദിവസം ചോദിക്കുന്നു.",
        "Asking for less chilli.": "മുളക് കുറയ്ക്കാൻ പറയുന്നു.",
        "Asking how often to take the medicine.": "മരുന്ന് എത്ര തവണ കഴിക്കണമെന്ന് ചോദിക്കുന്നു.",
        "Asking people to let you off the train.":
            "ട്രെയിനിൽ നിന്ന് ഇറങ്ങാൻ വഴി തരാൻ ആളുകളോട് പറയുന്നു.",
        "Asking someone to repeat what they said.": "പറഞ്ഞത് വീണ്ടും പറയാൻ ആവശ്യപ്പെടുന്നു.",
        "Asking the doctor for a sick-leave paper.": "ഡോക്ടറോട് സിക്ക് ലീവ് കടലാസ് ചോദിക്കുന്നു.",
        "Asking the price.": "വില ചോദിക്കുന്നു.",
        "Asking to add ten dollars to your card.": "കാർഡിൽ പത്ത് ഡോളർ ചേർക്കാൻ പറയുന്നു.",
        "Asking which platform goes to Jurong East.":
            "ജുറോങ് ഈസ്റ്റിലേക്ക് ഏത് പ്ലാറ്റ്ഫോമെന്ന് ചോദിക്കുന്നു.",
        "At a hawker centre, you order at the stall, pay, and carry the food to a table yourself.":
            "ഹോക്കർ സെന്ററിൽ കടയിൽ ഓർഡർ ചെയ്ത്, പണം നൽകി, ഭക്ഷണം സ്വയം മേശയിലേക്ക് കൊണ്ടുപോകണം.",
        "At work": "ജോലിസ്ഥലത്ത്",
        "Buying food": "ഭക്ഷണം വാങ്ങൽ",
        "Daily mix": "ദൈനംദിന മിശ്ര പരിശീലനം",
        "Fill in the missing word": "വിട്ടുപോയ വാക്ക് പൂരിപ്പിക്കുക",
        "Find the right platform, top up your card, and get off at the right stop.":
            "ശരിയായ പ്ലാറ്റ്ഫോം കണ്ടെത്തുക, കാർഡിൽ പണം നിറയ്ക്കുക, ശരിയായ സ്റ്റോപ്പിൽ ഇറങ്ങുക.",
        "How many times a day?": "ദിവസം എത്ര തവണ?",
        "How much?": "എത്രയാണ്?",
        "If work is not safe, tell your supervisor. You can say no to unsafe work. You can also call MOM at 6438 5122.":
            "ജോലി സുരക്ഷിതമല്ലെങ്കിൽ സൂപ്പർവൈസറോട് പറയുക. സുരക്ഷിതമല്ലാത്ത ജോലിക്ക് നിങ്ങൾക്ക് വേണ്ട എന്ന് പറയാം. MOM-നെ 6438 5122-ൽ വിളിക്കുകയും ചെയ്യാം.",
        "If you are hurt at work, tell your supervisor the same day and see a doctor. Keep the MC and every receipt.":
            "ജോലിസ്ഥലത്ത് പരിക്കേറ്റാൽ അന്നുതന്നെ സൂപ്പർവൈസറോട് പറഞ്ഞ് ഡോക്ടറെ കാണുക. MC-യും എല്ലാ രസീതുകളും സൂക്ഷിക്കുക.",
        "If you are sick, go to a clinic near your dormitory or a polyclinic. In an emergency, call 995 for an ambulance.":
            "അസുഖമുണ്ടെങ്കിൽ ഡോർമിറ്ററിക്ക് അടുത്തുള്ള ക്ലിനിക്കിലോ പോളിക്ലിനിക്കിലോ പോകുക. അടിയന്തര സാഹചര്യത്തിൽ ആംബുലൻസിന് 995 വിളിക്കുക.",
        "If your employer does not let you see a doctor, call MOM at 6438 5122 or the Migrant Workers' Centre at 6536 2692.":
            "തൊഴിലുടമ ഡോക്ടറെ കാണാൻ അനുവദിക്കുന്നില്ലെങ്കിൽ MOM-നെ 6438 5122-ലോ മൈഗ്രന്റ് വർക്കേഴ്സ് സെന്ററിനെ 6536 2692-ലോ വിളിക്കുക.",
        "In an emergency, call 995 for an ambulance.":
            "അടിയന്തര സാഹചര്യത്തിൽ ആംബുലൻസിന് 995 വിളിക്കുക.",
        "It is your turn at the chicken rice stall.": "ചിക്കൻ റൈസ് കടയിൽ നിങ്ങളുടെ ഊഴമായി.",
        "Listen. Tap what you hear": "കേൾക്കുക. കേട്ടത് ടാപ്പ് ചെയ്യുക",
        "Listen. What does it mean?": "കേൾക്കുക. ഇതിന്റെ അർത്ഥം എന്താണ്?",
        "My salary is late.": "എന്റെ ശമ്പളം വൈകി.",
        "Order at a food stall, ask the price, and say how you want it.":
            "ഭക്ഷണക്കടയിൽ ഓർഡർ ചെയ്യുക, വില ചോദിക്കുക, എങ്ങനെ വേണമെന്ന് പറയുക.",
        "Ordering a drink without ice.": "ഐസില്ലാതെ ഒരു പാനീയം ഓർഡർ ചെയ്യുന്നു.",
        "Ordering one chicken rice to bring home.":
            "വീട്ടിലേക്ക് കൊണ്ടുപോകാൻ ഒരു ചിക്കൻ റൈസ് ഓർഡർ ചെയ്യുന്നു.",
        "Pointing to where it hurts.": "വേദനയുള്ള സ്ഥലം ചൂണ്ടിക്കാണിക്കുന്നു.",
        "Put the words in order": "വാക്കുകൾ ക്രമത്തിൽ വയ്ക്കുക",
        "Say this in English": "ഇത് ഇംഗ്ലീഷിൽ പറയുക",
        "Say what is wrong, ask for an MC, and understand how to take your medicine.":
            "എന്താണ് പ്രശ്നമെന്ന് പറയുക, എംസി ചോദിക്കുക, മരുന്ന് എങ്ങനെ കഴിക്കണമെന്ന് മനസ്സിലാക്കുക.",
        "Saying thank you to an older man.": "പ്രായമുള്ള ഒരാളോട് നന്ദി പറയുന്നു.",
        "Saying thank you.": "നന്ദി പറയുന്നു.",
        "Saying that something is not safe.": "എന്തോ സുരക്ഷിതമല്ലെന്ന് പറയുന്നു.",
        "Saying that you are injured.": "നിങ്ങൾക്ക് പരിക്കേറ്റെന്ന് പറയുന്നു.",
        "Saying you want the food in a box, not on a plate.":
            "ഭക്ഷണം പ്ലേറ്റിലല്ല, പെട്ടിയിൽ വേണമെന്ന് പറയുന്നു.",
        "Saying your pay has not come on time.": "ശമ്പളം സമയത്ത് കിട്ടിയില്ലെന്ന് പറയുന്നു.",
        "Seats in a different colour are reserved seats. Give them to old people, pregnant women, and anyone who is hurt.":
            "വേറെ നിറത്തിലുള്ള സീറ്റുകൾ റിസർവ് ചെയ്തവയാണ്. അവ പ്രായമായവർക്കും ഗർഭിണികൾക്കും പരിക്കേറ്റവർക്കും നൽകുക.",
        "Seeing a doctor": "ഡോക്ടറെ കാണൽ",
        "Stand on the left side of the escalator so people can walk past on the right.":
            "എസ്കലേറ്ററിൽ ഇടതുവശത്ത് നിൽക്കുക, അപ്പോൾ മറ്റുള്ളവർക്ക് വലതുവശത്തുകൂടി നടന്നുപോകാം.",
        "Take medicine the way the doctor says: how many times a day, and before or after food.":
            "ഡോക്ടർ പറയുന്നതുപോലെ മരുന്ന് കഴിക്കുക: ദിവസം എത്ര തവണ, ഭക്ഷണത്തിന് മുമ്പോ ശേഷമോ.",
        "Taking the MRT": "എംആർടി യാത്ര",
        "Tap the pairs": "ജോഡികൾ ടാപ്പ് ചെയ്യുക",
        "Tap your card at the gate when you go in and again when you go out. If you forget to tap out, you pay the highest fare.":
            "അകത്തേക്ക് കയറുമ്പോഴും പുറത്തേക്ക് പോകുമ്പോഴും ഗേറ്റിൽ കാർഡ് ടാപ്പ് ചെയ്യുക. പുറത്തിറങ്ങുമ്പോൾ ടാപ്പ് ചെയ്യാൻ മറന്നാൽ ഏറ്റവും ഉയർന്ന ചാർജ് നൽകേണ്ടിവരും.",
        "Telling staff your card is not working at the gate.":
            "ഗേറ്റിൽ കാർഡ് പ്രവർത്തിക്കുന്നില്ലെന്ന് ജീവനക്കാരോട് പറയുന്നു.",
        "Telling the doctor your body is hot.": "ശരീരം ചൂടാണെന്ന് ഡോക്ടറോട് പറയുന്നു.",
        "The doctor asks what is wrong.": "എന്താണ് പ്രശ്നമെന്ന് ഡോക്ടർ ചോദിക്കുന്നു.",
        "The doctor asks where it hurts.": "എവിടെയാണ് വേദനയെന്ന് ഡോക്ടർ ചോദിക്കുന്നു.",
        "The doctor wants to know where it hurts.": "എവിടെയാണ് വേദനയെന്ന് ഡോക്ടർക്ക് അറിയണം.",
        "The seller asks for your order.": "കടക്കാരൻ നിങ്ങളുടെ ഓർഡർ ചോദിക്കുന്നു.",
        "The seller asks if you will eat here or bring it home.":
            "ഇവിടെ കഴിക്കുമോ അതോ വീട്ടിലേക്ക് കൊണ്ടുപോകുമോ എന്ന് കടക്കാരൻ ചോദിക്കുന്നു.",
        "The staff member asks if you need help.": "സഹായം വേണോ എന്ന് ജീവനക്കാരൻ ചോദിക്കുന്നു.",
        "The supervisor asks what happened.": "എന്താണ് സംഭവിച്ചതെന്ന് സൂപ്പർവൈസർ ചോദിക്കുന്നു.",
        "The supervisor gives a long instruction.": "സൂപ്പർവൈസർ ഒരു നീണ്ട നിർദ്ദേശം നൽകുന്നു.",
        "Top up your card for free at the machine inside the station. 7-Eleven and Cheers shops also top up, but they charge a small fee each time.":
            "സ്റ്റേഷനിലെ മെഷീനിൽ കാർഡ് സൗജന്യമായി ടോപ്പ് അപ്പ് ചെയ്യാം. 7-Eleven, Cheers കടകളിലും ടോപ്പ് അപ്പ് ചെയ്യാം, പക്ഷേ ഓരോ തവണയും ചെറിയ ഫീസ് ഈടാക്കും.",
        "Use the same card or phone both times. If you tap in with your card and out with your phone, the trip will not match.":
            "രണ്ട് തവണയും ഒരേ കാർഡോ ഫോണോ ഉപയോഗിക്കുക. കാർഡ് കൊണ്ട് കയറി ഫോൺ കൊണ്ട് ഇറങ്ങിയാൽ യാത്ര പൊരുത്തപ്പെടില്ല.",
        "Wear your helmet, safety boots and vest on the worksite. Your employer must give them to you for free.":
            "ജോലിസ്ഥലത്ത് ഹെൽമെറ്റ്, സേഫ്റ്റി ബൂട്ട്, വെസ്റ്റ് ധരിക്കുക. തൊഴിലുടമ ഇവ സൗജന്യമായി നൽകണം.",
        "What do you say?": "നിങ്ങൾ എന്ത് പറയും?",
        "What is this called?": "ഇതിനെ എന്താണ് വിളിക്കുന്നത്?",
        "Which one is this?": "ഇത് ഏതാണ്?",
        "Which platform for Jurong East?": "ജുറോങ് ഈസ്റ്റിലേക്ക് ഏത് പ്ലാറ്റ്ഫോം?",
        "You are at a food stall. You want to eat at home.":
            "നിങ്ങൾ ഒരു ഭക്ഷണക്കടയിലാണ്. വീട്ടിൽ കഴിക്കാനാണ് ആഗ്രഹം.",
        "You are in the doctor's room.": "നിങ്ങൾ ഡോക്ടറുടെ മുറിയിലാണ്.",
        "You fell and your arm is bleeding. Your supervisor runs over.":
            "നിങ്ങൾ വീണു, കൈയിൽ നിന്ന് രക്തം വരുന്നു. സൂപ്പർവൈസർ ഓടിവരുന്നു.",
        "Your card does not work at the gate. A staff member comes over.":
            "ഗേറ്റിൽ കാർഡ് പ്രവർത്തിക്കുന്നില്ല. ഒരു ജീവനക്കാരൻ അടുത്തേക്ക് വരുന്നു.",
        "Your employer must pay for your medical care. Keep every receipt.":
            "ചികിത്സാ ചെലവ് തൊഴിലുടമ വഹിക്കണം. എല്ലാ രസീതുകളും സൂക്ഷിക്കുക.",
        "Your salary must be paid within 7 days after the end of the month. If it is late, call MOM.":
            "മാസം കഴിഞ്ഞ് 7 ദിവസത്തിനകം ശമ്പളം നൽകണം. വൈകിയാൽ MOM-നെ വിളിക്കുക.",
        "Your supervisor speaks very fast. You did not understand.":
            "സൂപ്പർവൈസർ വളരെ വേഗത്തിൽ സംസാരിക്കുന്നു. നിങ്ങൾക്ക് മനസ്സിലായില്ല.",
        "a day off from work": "ജോലിയിൽ നിന്ന് ഒരു ദിവസത്തെ അവധി",
        "a day with no work": "ജോലിയില്ലാത്ത ഒരു ദിവസം",
        "a fixed time to see the doctor": "ഡോക്ടറെ കാണാൻ നിശ്ചയിച്ച സമയം",
        "a paper from the doctor that says you are sick":
            "നിങ്ങൾക്ക് അസുഖമാണെന്ന് പറയുന്ന ഡോക്ടറുടെ കടലാസ്",
        "a seat for old, pregnant or hurt people":
            "പ്രായമായവർക്കോ ഗർഭിണികൾക്കോ പരിക്കേറ്റവർക്കോ ഉള്ള സീറ്റ്",
        "a short rest from work": "ജോലിയിൽ നിന്ന് ഒരു ചെറിയ വിശ്രമം",
        "a small place where a doctor sees you": "ഡോക്ടർ നിങ്ങളെ പരിശോധിക്കുന്ന ഒരു ചെറിയ സ്ഥലം",
        "a smaller amount": "കുറഞ്ഞ അളവ്",
        "a station where you change to another line": "മറ്റൊരു ലൈനിലേക്ക് മാറുന്ന സ്റ്റേഷൻ",
        "add money to your card": "കാർഡിൽ പണം ചേർക്കുക",
        "bring the food home in a box": "ഭക്ഷണം പെട്ടിയിലാക്കി വീട്ടിലേക്ക് കൊണ്ടുപോകുക",
        "change to another train line": "മറ്റൊരു ട്രെയിൻ ലൈനിലേക്ക് മാറുക",
        "eat here, at a table": "ഇവിടെ മേശയിലിരുന്ന് കഴിക്കുക",
        "get off the train": "ട്രെയിനിൽ നിന്ന് ഇറങ്ങുക",
        "hot, with chilli": "എരിവുള്ള, മുളകുള്ള",
        "it hurts": "വേദനിക്കുന്നു",
        "not safe; you can get hurt": "സുരക്ഷിതമല്ല; പരിക്കേൽക്കാം",
        "one more time": "ഒരിക്കൽ കൂടി",
        "one small shop inside a hawker centre": "ഹോക്കർ സെന്ററിനുള്ളിലെ ഒരു ചെറിയ കട",
        "paper money and coins": "നോട്ടുകളും നാണയങ്ങളും",
        "rice with chicken, a common Singapore meal":
            "ചിക്കനോടുകൂടിയ ചോറ്, സിംഗപ്പൂരിലെ സാധാരണ ഭക്ഷണം",
        "something to drink, like tea or juice": "കുടിക്കാനുള്ളത്, ചായയോ ജ്യൂസോ പോലെ",
        "stay home and sleep": "വീട്ടിൽ ഇരുന്ന് ഉറങ്ങുക",
        "strong shoes for work": "ജോലിക്കുള്ള ബലമുള്ള ഷൂസ്",
        "the boss at your worksite": "ജോലിസ്ഥലത്തെ മേലധികാരി",
        "the money you get for your work": "ജോലിക്ക് നിങ്ങൾക്ക് കിട്ടുന്ന പണം",
        "the money you pay for the trip": "യാത്രയ്ക്ക് നിങ്ങൾ നൽകുന്ന പണം",
        "the way out of the station": "സ്റ്റേഷനിൽ നിന്ന് പുറത്തേക്കുള്ള വഴി",
        "touch your card at the gate when you leave": "പുറത്തുപോകുമ്പോൾ ഗേറ്റിൽ കാർഡ് തൊടുക",
        "wait for the next train": "അടുത്ത ട്രെയിനിനായി കാത്തിരിക്കുക",
        "what is the price": "വില എത്രയാണ്",
        "what you take to get better": "സുഖം പ്രാപിക്കാൻ കഴിക്കുന്നത്",
        "when air comes out of your mouth with a loud sound":
            "വായിൽ നിന്ന് ഉച്ചത്തിലുള്ള ശബ്ദത്തോടെ വായു പുറത്തുവരുമ്പോൾ",
        "where you wait for the train": "ട്രെയിനിനായി കാത്തുനിൽക്കുന്ന സ്ഥലം",
        "your body is injured": "ശരീരത്തിന് പരിക്കേറ്റു",
        "your body is very hot": "ശരീരം വളരെ ചൂടാണ്",
        // AI Words (workshop lesson)
        "AI Words": "AI വാക്കുകൾ",
        "Know the key words people use when they talk about AI.":
            "AI-യെക്കുറിച്ച് സംസാരിക്കുമ്പോൾ ആളുകൾ ഉപയോഗിക്കുന്ന പ്രധാന വാക്കുകൾ അറിയുക.",
        "computer programs that can do tasks that usually need a human mind":
            "സാധാരണയായി മനുഷ്യൻ ചിന്തിച്ച് ചെയ്യുന്ന ജോലികൾ ചെയ്യാൻ കഴിയുന്ന കമ്പ്യൂട്ടർ പ്രോഗ്രാമുകൾ",
        "how an AI gets better by learning patterns from lots of examples":
            "ധാരാളം ഉദാഹരണങ്ങളിൽ ആവർത്തിച്ചു വരുന്നവ പഠിച്ച് AI മെച്ചപ്പെടുന്ന രീതി",
        "the examples (text, photos, recordings) an AI learns from":
            "AI പഠിക്കാൻ ഉപയോഗിക്കുന്ന ഉദാഹരണങ്ങൾ (എഴുത്തുകൾ, ഫോട്ടോകൾ, റെക്കോർഡിംഗുകൾ)",
        "an AI you have a conversation with by typing, like ChatGPT or Gemini":
            "ടൈപ്പ് ചെയ്ത് നിങ്ങൾ സംസാരിക്കുന്ന AI, ChatGPT-യോ Gemini-യോ പോലെ",
        "the question or instruction you type or say to an AI":
            "AI-യോട് നിങ്ങൾ ടൈപ്പ് ചെയ്തോ പറഞ്ഞോ നൽകുന്ന ചോദ്യം അല്ലെങ്കിൽ നിർദ്ദേശം",
        "AI that creates new things: text, pictures, music or video":
            "പുതിയ കാര്യങ്ങൾ ഉണ്ടാക്കുന്ന AI: എഴുത്ത്, ചിത്രങ്ങൾ, സംഗീതം അല്ലെങ്കിൽ വീഡിയോ",
        "an AI that listens to your voice and answers out loud, like Siri":
            "നിങ്ങളുടെ ശബ്ദം കേട്ട് ഉറക്കെ മറുപടി പറയുന്ന AI, Siri പോലെ",
        "AI that can tell what is in a photo": "ഫോട്ടോയിൽ എന്താണുള്ളതെന്ന് പറയാൻ കഴിയുന്ന AI",
        "when an AI confidently gives an answer that is made up or wrong":
            "AI ആത്മവിശ്വാസത്തോടെ കെട്ടിച്ചമച്ചതോ തെറ്റായതോ ആയ ഉത്തരം നൽകുമ്പോൾ",
        "Saying the AI gave a confident answer that was false.":
            "AI ആത്മവിശ്വാസത്തോടെ തെറ്റായ ഉത്തരം നൽകിയെന്ന് പറയുന്നു.",
        "Suggesting a more detailed question to get a better answer.":
            "നല്ല ഉത്തരം കിട്ടാൻ കൂടുതൽ വിശദമായി ചോദിക്കാൻ നിർദ്ദേശിക്കുന്നു.",
        "Which one is a chatbot?": "ഇതിൽ ഏതാണ് chatbot?",
        "Which word fits?": "ഏത് വാക്കാണ് ചേരുന്നത്?",
        "Your friend has been using a chatbot and looks confused.":
            "നിങ്ങളുടെ സുഹൃത്ത് കുറച്ചുനേരമായി ഒരു chatbot ഉപയോഗിക്കുന്നു, ആശയക്കുഴപ്പത്തിലാണെന്ന് തോന്നുന്നു.",
        "Your friend searched for the book and could not find it anywhere.":
            "നിങ്ങളുടെ സുഹൃത്ത് ആ പുസ്തകം തിരഞ്ഞു, പക്ഷേ എവിടെയും കണ്ടെത്താനായില്ല.",
        "Saying it was an AI that answers out loud.": "അത് ഉറക്കെ മറുപടി പറയുന്ന ഒരു AI ആണെന്ന് പറയുന്നു.",
        "Saying it was the examples the AI learned from.": "അത് AI പഠിച്ച ഉദാഹരണങ്ങളാണെന്ന് പറയുന്നു.",
        "Your friend asked a chatbot to plan a trip.":
            "നിങ്ങളുടെ സുഹൃത്ത് ഒരു യാത്ര പ്ലാൻ ചെയ്യാൻ chatbot-നോട് ആവശ്യപ്പെട്ടു.",
        "The answer did not have enough detail to be useful.":
            "ആ ഉത്തരത്തിൽ ഉപകാരപ്പെടാൻ വേണ്ടത്ര വിശദാംശങ്ങൾ ഉണ്ടായിരുന്നില്ല.",
        "Suggesting they change what the AI learned from.": "AI പഠിക്കാൻ ഉപയോഗിച്ചവ മാറ്റാൻ നിർദ്ദേശിക്കുന്നു.",
        "Suggesting they use an AI that reads photos.": "ഫോട്ടോ മനസ്സിലാക്കുന്ന AI ഉപയോഗിക്കാൻ നിർദ്ദേശിക്കുന്നു.",
        "A chatbot answers whatever you type, and what you type is your prompt. Try the ideas below, or ask anything you like.":
            "നിങ്ങൾ എന്ത് ടൈപ്പ് ചെയ്താലും chatbot മറുപടി നൽകും, നിങ്ങൾ ടൈപ്പ് ചെയ്യുന്നതാണ് നിങ്ങളുടെ prompt. താഴെയുള്ള ആശയങ്ങൾ പരീക്ഷിക്കുക, അല്ലെങ്കിൽ ഇഷ്ടമുള്ളത് എന്തും ചോദിക്കുക.",
        "Say exactly what you want.": "നിങ്ങൾക്ക് എന്താണ് വേണ്ടതെന്ന് കൃത്യമായി പറയുക.",
        "Give context: who it is for, and limits like time or budget.":
            "സന്ദർഭം നൽകുക: ആർക്കുവേണ്ടിയാണ്, പിന്നെ സമയം, ബജറ്റ് പോലുള്ള പരിധികൾ.",
        "Say the format: a list, three sentences, a short message.":
            "ഏത് രൂപത്തിൽ വേണമെന്ന് പറയുക: ഒരു ലിസ്റ്റ്, മൂന്ന് വാചകങ്ങൾ, ഒരു ചെറിയ സന്ദേശം.",
        "Not happy with the answer? Ask a follow-up to change it.":
            "ഉത്തരം ഇഷ്ടപ്പെട്ടില്ലേ? അത് മാറ്റാൻ ഒരു follow-up ചോദ്യം ചോദിക്കുക.",
        "Ask about an AI word": "ഒരു AI വാക്കിനെക്കുറിച്ച് ചോദിക്കുക",
        "Pick any word from the lesson and ask the chatbot to explain it.":
            "പാഠത്തിലെ ഏതെങ്കിലും ഒരു വാക്ക് തിരഞ്ഞെടുത്ത് അത് വിശദീകരിക്കാൻ chatbot-നോട് ആവശ്യപ്പെടുക.",
        "Send a vague prompt": "വ്യക്തമല്ലാത്ത ഒരു prompt അയയ്ക്കുക",
        "Send this short prompt and see what comes back.": "ഈ ചെറിയ prompt അയച്ച് എന്ത് മറുപടി വരുന്നു എന്ന് നോക്കുക.",
        "Now add the details": "ഇനി വിശദാംശങ്ങൾ ചേർക്കുക",
        "Same request with context, limits and a format. Compare the two answers.":
            "അതേ ആവശ്യം, ഇത്തവണ സന്ദർഭവും പരിധികളും രൂപവും ചേർത്ത്. രണ്ട് ഉത്തരങ്ങളും താരതമ്യം ചെയ്യുക.",
        "Make something new": "പുതിയ എന്തെങ്കിലും ഉണ്ടാക്കുക",
        "That's generative AI: it writes something that did not exist before.":
            "ഇതാണ് generative AI: മുമ്പ് ഇല്ലാതിരുന്ന ഒന്ന് അത് എഴുതുന്നു.",
        "Ask a follow-up": "ഒരു follow-up ചോദ്യം ചോദിക്കുക",
        "Change the last answer without starting again.": "വീണ്ടും തുടക്കം മുതൽ തുടങ്ങാതെ അവസാനത്തെ ഉത്തരം മാറ്റുക.",
        "Check for a hallucination": "hallucination ഉണ്ടോ എന്ന് പരിശോധിക്കുക",
        "Ask for facts, then ask if it is sure. Chatbots can sound confident and still be wrong.":
            "വസ്തുതകൾ ചോദിക്കുക, പിന്നെ ഉറപ്പാണോ എന്ന് ചോദിക്കുക. chatbot-കൾ ആത്മവിശ്വാസത്തോടെ സംസാരിച്ചാലും തെറ്റാകാം.",
        "Getting to know someone": "പുതിയ ആളുകളെ പരിചയപ്പെടാം",
        "Say your name and where you are from, and ask new people about themselves.":
            "നിങ്ങളുടെ പേരും എവിടെ നിന്നാണ് വന്നതെന്നും പറയുക. പുതിയ ആളുകളോട് അവരെക്കുറിച്ച് ചോദിക്കുക.",
        "People in Singapore often say \"Have you eaten?\" as a friendly hello. You can say \"Yes, thank you.\"":
            "സിംഗപ്പൂരിൽ സൗഹൃദത്തോടെ അഭിവാദ്യം ചെയ്യാൻ പലരും \"Have you eaten?\" എന്ന് ചോദിക്കും. നിങ്ങൾക്ക് \"Yes, thank you.\" എന്ന് പറയാം.",
        "People may call an older woman \"Aunty\" and an older man \"Uncle\". It is polite, even if you are not family.":
            "പ്രായമുള്ള സ്ത്രീയെ \"Aunty\" എന്നും പുരുഷനെ \"Uncle\" എന്നും വിളിക്കാറുണ്ട്. ബന്ധുക്കളല്ലെങ്കിലും ഇങ്ങനെ വിളിക്കുന്നത് മര്യാദയാണ്.",
        "You do not have to answer every question. If someone asks about your pay or your family and you do not want to say, you can smile and change the topic.":
            "എല്ലാ ചോദ്യത്തിനും മറുപടി പറയേണ്ടതില്ല. ശമ്പളമോ കുടുംബമോ കുറിച്ച് ചോദിക്കുമ്പോൾ പറയാൻ താൽപര്യമില്ലെങ്കിൽ ചിരിച്ചുകൊണ്ട് മറ്റൊരു കാര്യം സംസാരിക്കാം.",
        "The best way to learn is to talk. Say hello to one new person on your day off.":
            "സംസാരിച്ചാണ് നന്നായി പഠിക്കാൻ കഴിയുക. അവധി ദിവസം പുതിയ ഒരാളെ അഭിവാദ്യം ചെയ്യുക.",
        "what people call you": "ആളുകൾ നിങ്ങളെ വിളിക്കുന്ന പേര്",
        "a place like India or Bangladesh": "ഇന്ത്യയോ ബംഗ്ലാദേശോ പോലുള്ള ഒരു രാജ്യം",
        "your parents, husband or wife, and children":
            "നിങ്ങളുടെ അച്ഛനമ്മമാർ, ഭർത്താവ് അല്ലെങ്കിൽ ഭാര്യ, മക്കൾ",
        "young boys and girls; sons and daughters":
            "ചെറിയ ആൺകുട്ടികളും പെൺകുട്ടികളും; ആൺമക്കളും പെൺമക്കളും",
        "someone you like and spend time with":
            "നിങ്ങൾക്ക് ഇഷ്ടമുള്ള, നിങ്ങൾ സമയം ചെലവഴിക്കുന്ന ഒരാൾ",
        "the work you do for money": "പണം കിട്ടാൻ നിങ്ങൾ ചെയ്യുന്ന ജോലി",
        "something you like to do in your free time": "ഒഴിവുസമയത്ത് ചെയ്യാൻ ഇഷ്ടമുള്ള കാര്യം",
        "the day after Saturday; many workers rest":
            "ശനിയാഴ്ച കഴിഞ്ഞുള്ള ദിവസം; പല തൊഴിലാളികളും വിശ്രമിക്കും",
        "Asking someone's name.": "ഒരാളുടെ പേര് ചോദിക്കുന്നു.",
        "Telling someone your name.": "നിങ്ങളുടെ പേര് പറയുന്നു.",
        "Asking which country someone comes from.":
            "ഒരാൾ ഏത് രാജ്യത്തുനിന്നാണ് വന്നതെന്ന് ചോദിക്കുന്നു.",
        "Asking what work someone does.": "ഒരാൾ എന്ത് ജോലി ചെയ്യുന്നുവെന്ന് ചോദിക്കുന്നു.",
        "Saying you are happy to meet someone new.":
            "പുതിയ ഒരാളെ കണ്ടതിൽ സന്തോഷമുണ്ടെന്ന് പറയുന്നു.",
        "Asking about someone's day off.": "ഒരാളുടെ അവധി ദിവസത്തെക്കുറിച്ച് ചോദിക്കുന്നു.",
        "You meet someone new at the park on your day off.":
            "അവധി ദിവസം പാർക്കിൽ നിങ്ങൾ പുതിയ ഒരാളെ കാണുന്നു.",
        "The new person asks your name.": "പുതിയ ആൾ നിങ്ങളുടെ പേര് ചോദിക്കുന്നു.",
        "Your friend brings a new person to meet you.":
            "നിങ്ങളുടെ സുഹൃത്ത് പുതിയ ഒരാളെ പരിചയപ്പെടുത്താൻ കൊണ്ടുവരുന്നു.",
        "The new person tells you her name.": "പുതുതായി പരിചയപ്പെട്ട സ്ത്രീ തന്റെ പേര് പറയുന്നു.",
        "What is your job?": "നിങ്ങൾ എന്ത് ജോലി ചെയ്യുന്നു?",
        "Helping at home": "വീട്ടിൽ സഹായിക്കാം",
        "Understand what to do at home, say what you have finished, and ask when you are not sure.":
            "വീട്ടിൽ എന്ത് ചെയ്യണമെന്ന് മനസ്സിലാക്കുക. ചെയ്തുതീർത്തത് പറയുക. ഉറപ്പില്ലെങ്കിൽ ചോദിക്കുക.",
        "Never lean out of a window to clean it or to hang clothes. If someone asks you to, say it is not safe.":
            "ജനൽ തുടയ്ക്കാനോ തുണി വിരിക്കാനോ പുറത്തേക്ക് ചായരുത്. ആരെങ്കിലും ആവശ്യപ്പെട്ടാൽ അത് സുരക്ഷിതമല്ലെന്ന് പറയുക.",
        "Never throw anything out of a window. Put rubbish in the rubbish chute or the bin.":
            "ജനലിലൂടെ ഒന്നും പുറത്തേക്ക് എറിയരുത്. അടുക്കളയിലെ ലോഹവാതിലുള്ള മാലിന്യം ഇടുന്ന കുഴലിലോ ചവറ്റുകുട്ടയിലോ മാലിന്യം ഇടുക.",
        "Never mix bleach with other cleaning products. The gas can hurt you.":
            "ബ്ലീച്ച് മറ്റു വൃത്തിയാക്കുന്ന വസ്തുക്കളുമായി കലർത്തരുത്. ഉണ്ടാകുന്ന വാതകം നിങ്ങളെ അപകടത്തിലാക്കാം.",
        "If you do not know how to use a machine, ask first. It is better to ask than to break it.":
            "യന്ത്രം ഉപയോഗിക്കാൻ അറിയില്ലെങ്കിൽ ആദ്യം ചോദിക്കുക. കേടുവരുത്തുന്നതിനെക്കാൾ ചോദിക്കുന്നതാണ് നല്ലത്.",
        "clothes to wash": "അലക്കാനുള്ള വസ്ത്രങ്ങൾ",
        "a hot tool that makes clothes flat": "വസ്ത്രങ്ങളുടെ ചുളിവ് മാറ്റുന്ന ചൂടുള്ള ഉപകരണം",
        "a stick with cloth for washing the floor": "തറ കഴുകാൻ തുണി ഘടിപ്പിച്ച വടി",
        "plates and bowls you eat from": "ഭക്ഷണം കഴിക്കുന്ന പ്ലേറ്റുകളും പാത്രങ്ങളും",
        "things you throw away": "നിങ്ങൾ കളയുന്ന വസ്തുക്കൾ",
        "a cold box that keeps food fresh": "ഭക്ഷണം കേടാകാതെ തണുപ്പിച്ച് സൂക്ഷിക്കുന്ന പെട്ടി",
        "where you cook food with fire": "തീ ഉപയോഗിച്ച് ഭക്ഷണം പാകം ചെയ്യുന്ന സ്ഥലം",
        "a place with doors to keep things": "സാധനങ്ങൾ സൂക്ഷിക്കാൻ വാതിലുകളുള്ള ഇടം",
        "Asking what work comes after this.": "ഇതിനുശേഷം എന്ത് ജോലി ചെയ്യണമെന്ന് ചോദിക്കുന്നു.",
        "Saying the laundry is done.": "തുണി അലക്കിത്തീർന്നെന്ന് പറയുന്നു.",
        "Asking where something goes.": "ഒരു സാധനം എവിടെ വെക്കണമെന്ന് ചോദിക്കുന്നു.",
        "Asking someone to show you the way to do it.":
            "എങ്ങനെ ചെയ്യണമെന്ന് കാണിച്ചുതരാൻ ചോദിക്കുന്നു.",
        "Saying sorry and telling the truth about a broken plate.":
            "പ്ലേറ്റ് പൊട്ടിച്ചതിന് ക്ഷമ ചോദിച്ച് സത്യം പറയുന്നു.",
        "You finished washing the clothes. Your employer comes into the room.":
            "നിങ്ങൾ തുണി അലക്കിത്തീർത്തു. തൊഴിലുടമ മുറിയിലേക്ക് വരുന്നു.",
        "Your employer asks if the clothes are washed.":
            "തുണി അലക്കിയോ എന്ന് തൊഴിലുടമ ചോദിക്കുന്നു.",
        "There is a new iron at home. You do not know how to use it.":
            "വീട്ടിൽ പുതിയ ഇസ്തിരിപ്പെട്ടി ഉണ്ട്. അത് ഉപയോഗിക്കാൻ നിങ്ങൾക്ക് അറിയില്ല.",
        "Your employer asks you to iron the shirts.":
            "ഷർട്ടുകൾ ഇസ്തിരിയിടാൻ തൊഴിലുടമ ആവശ്യപ്പെടുന്നു.",
        "Sorry, I broke a plate.": "ക്ഷമിക്കണം, ഞാൻ ഒരു പ്ലേറ്റ് പൊട്ടിച്ചു.",
        "Reading signs": "ബോർഡുകൾ വായിക്കാം",
        "Read the signs you see every day, and ask when you do not understand one.":
            "ദിവസവും കാണുന്ന ബോർഡുകൾ വായിക്കുക. അർത്ഥം മനസ്സിലായില്ലെങ്കിൽ ചോദിക്കുക.",
        "Red signs usually mean stop or danger. Yellow means be careful. Green usually means safe, or the way out.":
            "ചുവപ്പ് ബോർഡുകൾ സാധാരണയായി നിൽക്കാനോ അപകടമുണ്ടെന്നോ പറയുന്നു. മഞ്ഞ എന്നാൽ സൂക്ഷിക്കുക. പച്ച സാധാരണയായി സുരക്ഷിതമാണെന്നോ പുറത്തേക്കുള്ള വഴിയെന്നോ പറയുന്നു.",
        "You can be fined for smoking where it is not allowed. Many places have a yellow box that shows where you can smoke.":
            "അനുവാദമില്ലാത്തിടത്ത് പുകവലിച്ചാൽ പിഴ കിട്ടാം. പുകവലിക്കാൻ കഴിയുന്ന സ്ഥലം പല ഇടത്തും മഞ്ഞ വരകളുള്ള ചതുരത്തിൽ കാണിക്കും.",
        "Many signs in Singapore are in English, Chinese, Malay and Tamil. If your language is there, read it first, then look for the English word.":
            "സിംഗപ്പൂരിലെ പല ബോർഡുകളും ഇംഗ്ലീഷ്, ചൈനീസ്, മലയ്, തമിഴ് ഭാഷകളിലാണ്. നിങ്ങളുടെ ഭാഷ ഉണ്ടെങ്കിൽ ആദ്യം അത് വായിക്കുക. പിന്നെ ഇംഗ്ലീഷ് വാക്ക് നോക്കുക.",
        "Not sure what a sign means? Take a photo and ask someone. Do not go past a danger sign.":
            "ബോർഡിന്റെ അർത്ഥം അറിയില്ലേ? ഫോട്ടോ എടുത്ത് ആരോടെങ്കിലും ചോദിക്കുക. അപകടം കാണിക്കുന്ന ബോർഡ് കടന്നുപോകരുത്.",
        "the floor has water; you can slip": "തറയിൽ വെള്ളമുണ്ട്; തെന്നിവീഴാം",
        "do not go in": "അകത്തേക്ക് പോകരുത്",
        "do not smoke here": "ഇവിടെ പുകവലിക്കരുത്",
        "not open now": "ഇപ്പോൾ തുറന്നിട്ടില്ല",
        "press the door away from you": "വാതിൽ നിങ്ങളിൽനിന്ന് അകത്തേക്ക് തള്ളുക",
        "bring the door towards you": "വാതിൽ നിങ്ങളുടെ നേരെ വലിക്കുക",
        "the room with a toilet, in a public place": "പൊതുസ്ഥലത്തെ കക്കൂസുള്ള മുറി",
        "something here can hurt you": "ഇവിടെയുള്ള എന്തോ ഒന്ന് നിങ്ങളെ പരിക്കേൽപ്പിക്കാം",
        "Asking someone to explain a sign.": "ബോർഡിന്റെ അർത്ഥം പറഞ്ഞുതരാൻ ചോദിക്കുന്നു.",
        "Telling someone to be careful of the wet floor.": "നനഞ്ഞ തറയിൽ സൂക്ഷിക്കാൻ പറയുന്നു.",
        "Asking the way to the toilet.": "കക്കൂസിലേക്കുള്ള വഴി ചോദിക്കുന്നു.",
        "Saying a shop is not open.": "കട തുറന്നിട്ടില്ലെന്ന് പറയുന്നു.",
        "Telling someone they are not allowed to enter.": "അകത്ത് കയറാൻ അനുവാദമില്ലെന്ന് പറയുന്നു.",
        "You are new in a building and you need the toilet. You see a cleaner.":
            "നിങ്ങൾ ആദ്യമായി ഈ കെട്ടിടത്തിൽ വന്നതാണ്. കക്കൂസിൽ പോകണം. വൃത്തിയാക്കുന്ന ഒരാളെ കാണുന്നു.",
        "The cleaner asks if you need help.": "സഹായം വേണോ എന്ന് വൃത്തിയാക്കുന്ന ആൾ ചോദിക്കുന്നു.",
        "Your friend is walking to a door with a red No Entry sign.":
            "ചുവന്ന No Entry ബോർഡുള്ള വാതിലിലേക്ക് നിങ്ങളുടെ സുഹൃത്ത് നടക്കുന്നു.",
        "Your friend asks if they can go in.": "അകത്ത് കയറാമോ എന്ന് സുഹൃത്ത് ചോദിക്കുന്നു.",
        "The shop is closed.": "കട അടച്ചിരിക്കുന്നു.",
        "Buses and finding your way": "ബസുകളും വഴി കണ്ടെത്തലും",
        "Find the right bus, get off at your stop, and ask for directions when you are lost.":
            "ശരിയായ ബസ് കണ്ടെത്തുക. നിങ്ങളുടെ സ്റ്റോപ്പിൽ ഇറങ്ങുക. വഴി തെറ്റിയാൽ വഴി ചോദിക്കുക.",
        "Tap your card when you get on the bus and again when you get off. If you forget to tap when you get off, you can pay more.":
            "ബസിൽ കയറുമ്പോഴും ഇറങ്ങുമ്പോഴും കാർഡ് തൊടിക്കുക. ഇറങ്ങുമ്പോൾ മറന്നാൽ കൂടുതൽ പണം കൊടുക്കേണ്ടിവരാം.",
        "Press the bell just before your stop. If nobody presses it and nobody is waiting, the bus does not stop.":
            "നിങ്ങളുടെ സ്റ്റോപ്പ് എത്തുന്നതിന് തൊട്ടുമുമ്പ് ബെൽ അമർത്തുക. ആരും അമർത്താതെയും കാത്തുനിൽക്കാൻ ആരുമില്ലാതെയും വന്നാൽ ബസ് നിർത്തില്ല.",
        "Raise your hand when your bus comes, so the driver knows to stop.":
            "നിങ്ങളുടെ ബസ് വരുമ്പോൾ കൈ ഉയർത്തുക. നിർത്തണമെന്ന് ഡ്രൈവർക്ക് അപ്പോൾ മനസ്സിലാകും.",
        "Cross the road at a traffic light or an overhead bridge. You can be fined for crossing somewhere else nearby.":
            "ട്രാഫിക് ലൈറ്റുള്ള സ്ഥലത്തോ റോഡിന് മുകളിലെ നടപ്പാലത്തിലൂടെയോ റോഡ് കടക്കുക. സമീപത്ത് മറ്റിടത്ത് കടന്നാൽ പിഴ കിട്ടാം.",
        "where you wait for the bus": "ബസിന് കാത്തുനിൽക്കുന്ന സ്ഥലം",
        "press it to ask the bus to stop": "ബസ് നിർത്താൻ ആവശ്യപ്പെടാൻ ഇത് അമർത്തുക",
        "the side of your left hand": "നിങ്ങളുടെ ഇടതുകൈയുടെ വശം",
        "the side of your right hand": "നിങ്ങളുടെ വലതുകൈയുടെ വശം",
        "keep going ahead; do not turn": "മുന്നോട്ട് പോകുക; തിരിയരുത്",
        "the lights that say stop or go": "നിർത്താനോ പോകാനോ കാണിക്കുന്ന വിളക്കുകൾ",
        "a bridge for walking over a road": "റോഡിന് മുകളിലൂടെ നടക്കാനുള്ള പാലം",
        "a picture that shows where places are": "സ്ഥലങ്ങൾ എവിടെയാണെന്ന് കാണിക്കുന്ന ചിത്രം",
        "Asking which bus to take.": "ഏത് ബസിൽ കയറണമെന്ന് ചോദിക്കുന്നു.",
        "Asking the way to the bus stop.": "ബസ് സ്റ്റോപ്പിലേക്കുള്ള വഴി ചോദിക്കുന്നു.",
        "Telling someone the way.": "ഒരാൾക്ക് വഴി പറഞ്ഞുകൊടുക്കുന്നു.",
        "Saying you do not know where you are.": "നിങ്ങൾ എവിടെയാണെന്ന് അറിയില്ലെന്ന് പറയുന്നു.",
        "Asking someone to tell you when to get off.":
            "എപ്പോൾ ഇറങ്ങണമെന്ന് പറഞ്ഞുതരാൻ ചോദിക്കുന്നു.",
        "You are at a bus stop and want to go to Little India. A woman is waiting next to you.":
            "നിങ്ങൾ ബസ് സ്റ്റോപ്പിലാണ്. Little India യിലേക്ക് പോകണം. അടുത്ത് ഒരു സ്ത്രീ കാത്തുനിൽക്കുന്നു.",
        "The woman asks if you are waiting for a bus.":
            "ബസിന് കാത്തുനിൽക്കുകയാണോ എന്ന് സ്ത്രീ ചോദിക്കുന്നു.",
        "You do not know this road and your phone has no battery. You see a man walking.":
            "നിങ്ങൾക്ക് ഈ റോഡ് അറിയില്ല. ഫോണിൽ ചാർജുമില്ല. ഒരാൾ നടന്നുപോകുന്നത് കാണുന്നു.",
        "The man asks if he can help you.": "സഹായിക്കട്ടെയോ എന്ന് ആ പുരുഷൻ ചോദിക്കുന്നു.",
        "Please tell me my stop.": "എന്റെ സ്റ്റോപ്പ് എത്തുമ്പോൾ ദയവായി പറയുക.",
        "At the supermarket": "സൂപ്പർമാർക്കറ്റിൽ",
        "Find what you need, check the price and the date, and pay at the counter.":
            "ആവശ്യമുള്ളത് കണ്ടെത്തുക. വിലയും തീയതിയും നോക്കി കൗണ്ടറിൽ പണം കൊടുക്കുക.",
        "Big supermarkets charge at least 5 cents for each plastic bag. Bring your own bag to save money.":
            "വലിയ സൂപ്പർമാർക്കറ്റുകളിൽ ഓരോ പ്ലാസ്റ്റിക് സഞ്ചിക്കും കുറഞ്ഞത് 5 സെന്റ് കൊടുക്കണം. പണം ലാഭിക്കാൻ സ്വന്തം സഞ്ചി കൊണ്ടുവരുക.",
        "Look for the date on food before you buy it. \"Best before\" and \"Use by\" tell you how long it is good.":
            "ഭക്ഷണം വാങ്ങുന്നതിന് മുമ്പ് അതിലെ തീയതി നോക്കുക. \"Best before\", \"Use by\" എന്നിവ എത്രകാലം അത് നല്ലതായിരിക്കുമെന്ന് പറയുന്നു.",
        "Keep the receipt when you shop for someone else, so you can show what you spent.":
            "മറ്റൊരാൾക്കായി സാധനങ്ങൾ വാങ്ങുമ്പോൾ രസീത് സൂക്ഷിക്കുക. എത്ര ചെലവായെന്ന് കാണിക്കാം.",
        "The cashier may ask if you have a member card. If you do not have one, just say no.":
            "അംഗത്വ കാർഡ് ഉണ്ടോ എന്ന് പണം വാങ്ങുന്ന ആൾ ചോദിച്ചേക്കാം. ഇല്ലെങ്കിൽ ഇല്ലെന്ന് പറഞ്ഞാൽ മതി.",
        "a big basket on wheels": "ചക്രങ്ങളുള്ള വലിയ കൊട്ട",
        "the walkway between shelves": "സാധനങ്ങൾ വെച്ച തട്ടുകൾക്കിടയിലെ നടപ്പാത",
        "the person you pay": "നിങ്ങൾ പണം കൊടുക്കുന്ന ആൾ",
        "the paper that shows what you paid": "കൊടുത്ത പണത്തിന്റെ വിവരങ്ങളുള്ള കടലാസ്",
        "a lower price than usual": "പതിവിലും കുറഞ്ഞ വില",
        "the last day the food is good": "ഭക്ഷണം കേടാകാതിരിക്കുന്ന അവസാന ദിവസം",
        "a thin bag to carry your shopping": "വാങ്ങിയ സാധനങ്ങൾ കൊണ്ടുപോകാനുള്ള നേർത്ത സഞ്ചി",
        "plants you cook and eat, like carrots": "കാരറ്റ് പോലുള്ള പാകം ചെയ്ത് കഴിക്കുന്ന ചെടികൾ",
        "Asking where to find something.": "ഒരു സാധനം എവിടെ കിട്ടുമെന്ന് ചോദിക്കുന്നു.",
        "Asking if the price is lower today.": "ഇന്ന് വില കുറവാണോ എന്ന് ചോദിക്കുന്നു.",
        "Asking the cashier for a bag.": "പണം വാങ്ങുന്ന ആളോട് സഞ്ചി ചോദിക്കുന്നു.",
        "Asking the cashier for the receipt.": "പണം വാങ്ങുന്ന ആളോട് രസീത് ചോദിക്കുന്നു.",
        "Telling staff that the food is past its date.":
            "ഭക്ഷണത്തിന്റെ തീയതി കഴിഞ്ഞെന്ന് ജീവനക്കാരോട് പറയുന്നു.",
        "You are paying at the counter. You do not have your own bag.":
            "നിങ്ങൾ കൗണ്ടറിൽ പണം കൊടുക്കുന്നു. സ്വന്തം സഞ്ചി കൊണ്ടുവന്നിട്ടില്ല.",
        "The cashier tells you the price.": "പണം വാങ്ങുന്ന ആൾ വില പറയുന്നു.",
        "The milk in your basket is past its date. You show it to a staff member.":
            "നിങ്ങളുടെ കൊട്ടയിലെ പാലിന്റെ തീയതി കഴിഞ്ഞു. നിങ്ങൾ അത് ഒരു ജീവനക്കാരനെ കാണിക്കുന്നു.",
        "A staff member asks if they can help you.":
            "സഹായിക്കട്ടെയോ എന്ന് ഒരു ജീവനക്കാരൻ ചോദിക്കുന്നു.",
        "Is this on discount?": "ഇതിന് വിലക്കുറവുണ്ടോ?",
        "Construction science": "കെട്ടിടനിർമാണ ശാസ്ത്രം",
        "Learn the main building materials, why a building stays up, and how to warn others about a problem.":
            "പ്രധാന നിർമാണസാധനങ്ങൾ, കെട്ടിടം എങ്ങനെ നിൽക്കുന്നു, പ്രശ്നമുണ്ടെങ്കിൽ മറ്റുള്ളവരെ എങ്ങനെ അറിയിക്കാം എന്നിവ പഠിക്കുക.",
        "Concrete is strong when it is pressed, but it cracks when it is pulled. That is why steel bars go inside it.":
            "കോൺക്രീറ്റ് അമർത്തുമ്പോൾ ബലമുള്ളതാണ്. പക്ഷേ വലിക്കുമ്പോൾ പൊട്ടും. അതുകൊണ്ടാണ് ഉള്ളിൽ കമ്പികൾ ഇടുന്നത്.",
        "Too much water makes concrete weak. Use only the amount of water your supervisor tells you.":
            "വെള്ളം കൂടിയാൽ കോൺക്രീറ്റിന്റെ ബലം കുറയും. സൂപ്പർവൈസർ പറയുന്നത്ര വെള്ളം മാത്രം ഉപയോഗിക്കുക.",
        "Concrete goes hard slowly. It takes about 28 days to reach full strength, so ask your supervisor before you put weight on it.":
            "കോൺക്രീറ്റ് പതുക്കെയാണ് ഉറയ്ക്കുന്നത്. പൂർണ ബലം കിട്ടാൻ ഏകദേശം 28 ദിവസം വേണം. ഭാരം വെക്കുന്നതിന് മുമ്പ് സൂപ്പർവൈസറോട് ചോദിക്കുക.",
        "A building carries its weight down: from the floor to the beams, to the columns, then into the ground. Never cut a beam or a column without permission.":
            "കെട്ടിടത്തിന്റെ ഭാരം താഴേക്കാണ് പോകുന്നത്: തറയിൽനിന്ന് ബീമുകളിലേക്ക്, തൂണുകളിലേക്ക്, പിന്നെ മണ്ണിലേക്ക്. അനുവാദമില്ലാതെ ബീമോ തൂണോ മുറിക്കരുത്.",
        "Every scaffold has a weight limit. Too much weight can make it fall, so do not add more than you are told.":
            "ഓരോ സ്കാഫോൾഡിങ്ങിനും താങ്ങാവുന്ന ഭാരത്തിന് പരിധിയുണ്ട്. ഭാരം കൂടിയാൽ വീഴാം. പറഞ്ഞതിലും കൂടുതൽ ഭാരം വെക്കരുത്.",
        "cement, sand, stones and water mixed; it goes hard":
            "സിമന്റ്, മണൽ, കല്ല്, വെള്ളം എന്നിവയുടെ മിശ്രിതം; അത് ഉറയ്ക്കും",
        "the grey powder that holds concrete together":
            "കോൺക്രീറ്റിനെ ചേർത്തുപിടിക്കുന്ന ചാരനിറമുള്ള പൊടി",
        "a long metal rod inside concrete": "കോൺക്രീറ്റിനുള്ളിലെ നീളമുള്ള ഉരുക്കുകമ്പി",
        "a strong part that goes across and holds up a floor":
            "കുറുകെ നിന്ന് നിലത്തെ താങ്ങുന്ന ബലമുള്ള ഭാഗം",
        "a strong part that stands up and carries the weight":
            "നിവർന്നുനിന്ന് ഭാരം താങ്ങുന്ന ബലമുള്ള ഭാഗം",
        "the weight something must carry": "ഒരു വസ്തു താങ്ങേണ്ട ഭാരം",
        "a tool that shows if something is flat": "നിരപ്പാണോ എന്ന് കാണിക്കുന്ന ഉപകരണം",
        "a metal frame you stand on to work up high":
            "ഉയരത്തിൽ ജോലി ചെയ്യാൻ കയറി നിൽക്കുന്ന ലോഹച്ചട്ടക്കൂട്",
        "Warning that the concrete is not hard yet.":
            "കോൺക്രീറ്റ് ഇനിയും ഉറച്ചിട്ടില്ലെന്ന് മുന്നറിയിപ്പ് നൽകുന്നു.",
        "Saying that something weighs too much.": "ഒരു സാധനത്തിന് ഭാരം കൂടുതലാണെന്ന് പറയുന്നു.",
        "Telling someone to stop adding water to the mix.":
            "കൂട്ടിലേക്ക് ഇനി വെള്ളം ചേർക്കരുതെന്ന് പറയുന്നു.",
        "Reporting a crack to your supervisor.": "ഒരു വിള്ളലിനെക്കുറിച്ച് സൂപ്പർവൈസറോട് പറയുന്നു.",
        "Asking someone to make sure the scaffold is safe.":
            "സ്കാഫോൾഡിങ് സുരക്ഷിതമാണെന്ന് ഉറപ്പാക്കാൻ ആവശ്യപ്പെടുന്നു.",
        "A worker is about to walk on the floor you poured this morning.":
            "ഇന്ന് രാവിലെ നിങ്ങൾ കോൺക്രീറ്റ് ഒഴിച്ച തറയിൽ ഒരു തൊഴിലാളി നടക്കാൻ പോകുന്നു.",
        "The worker asks if he can walk here.": "ഇവിടെ നടക്കാമോ എന്ന് തൊഴിലാളി ചോദിക്കുന്നു.",
        "Your co-worker is mixing concrete and keeps pouring in water.":
            "നിങ്ങളുടെ സഹപ്രവർത്തകൻ കോൺക്രീറ്റ് കൂട്ടുമ്പോൾ വെള്ളം ഒഴിച്ചുകൊണ്ടേയിരിക്കുന്നു.",
        "Your co-worker wants to add more water.":
            "നിങ്ങളുടെ സഹപ്രവർത്തകൻ കൂടുതൽ വെള്ളം ചേർക്കാൻ ആഗ്രഹിക്കുന്നു.",
        "There is a crack in this column.": "ഈ തൂണിൽ ഒരു വിള്ളലുണ്ട്.",
    },
    bu: {
        'Signs and announcements say "alight". It means get off the train.':
            'ဆိုင်းဘုတ်နှင့် ကြေညာချက်များတွင် "alight" ဟု ပြောသည်။ ရထားမှ ဆင်းရန် ဟု အဓိပ္ပာယ်ရသည်။',
        'Say "take away" to bring the food home. Some stalls charge a little more for the box.':
            'အစားအစာကို အိမ်ယူသွားရန် "take away" ဟု ပြောပါ။ အချို့ဆိုင်များက ဘူးအတွက် အနည်းငယ် ပိုယူသည်။',
        'A tissue packet on a table means someone has taken that seat. People call this "chope".':
            'စားပွဲပေါ်ရှိ တစ်ရှူးထုပ်သည် ထိုနေရာကို တစ်ယောက်ယောက် ယူထားပြီး ဟု ဆိုလိုသည်။ ၎င်းကို "chope" ဟု ခေါ်သည်။',
        "A meal at a hawker centre or coffee shop usually costs 4 to 7 dollars. Most stalls take cash, and many take PayNow.":
            "ဟော်ကာစင်တာ သို့မဟုတ် ကော်ဖီဆိုင်တွင် ထမင်းတစ်နပ်သည် များသောအားဖြင့် ၄ ဒေါ်လာမှ ၇ ဒေါ်လာ ကျသင့်သည်။ ဆိုင်အများစုက ငွေသားလက်ခံပြီး အများအပြားက PayNow လည်း လက်ခံသည်။",
        "A quick practice with words from every lesson. New every day.":
            "သင်ခန်းစာတိုင်းမှ စကားလုံးများဖြင့် အမြန်လေ့ကျင့်ပါ။ နေ့တိုင်း အသစ်ဖြစ်သည်။",
        "After eating, return your tray and plates to the tray return point. It is the rule, and there can be a fine.":
            "စားပြီးလျှင် ဗန်းနှင့် ပန်းကန်များကို ဗန်းပြန်အပ်သည့်နေရာသို့ ပြန်ပို့ပါ။ ၎င်းသည် စည်းကမ်းဖြစ်ပြီး ဒဏ်ငွေ ရှိနိုင်သည်။",
        "Ask the doctor for an MC. Give it to your employer so your sick day is counted as sick leave.":
            "ဆရာဝန်ထံ MC တောင်းပါ။ သင့်နေမကောင်းသည့်နေ့ကို နေမကောင်းခွင့်အဖြစ် ရေတွက်နိုင်ရန် အလုပ်ရှင်ကို ပေးပါ။",
        "Ask your supervisor to say it again, say when something is not safe, and ask for a day off.":
            "ကြီးကြပ်သူကို ထပ်ပြောရန် မေးပါ၊ မလုံခြုံသည့်အခါ ပြောပါ၊ ခွင့်တစ်ရက် တောင်းပါ။",
        "Asking for a day with no work.": "အလုပ်မလုပ်ရသည့် တစ်ရက် တောင်းခြင်း။",
        "Asking for less chilli.": "ငရုတ်သီး လျှော့ထည့်ရန် တောင်းခြင်း။",
        "Asking how often to take the medicine.": "ဆေးကို ဘယ်နှစ်ကြိမ် သောက်ရမည်ကို မေးခြင်း။",
        "Asking people to let you off the train.":
            "ရထားမှ ဆင်းနိုင်ရန် လမ်းဖယ်ပေးဖို့ တောင်းဆိုခြင်း။",
        "Asking someone to repeat what they said.": "ပြောခဲ့သည့်အရာကို ထပ်ပြောရန် တောင်းဆိုခြင်း။",
        "Asking the doctor for a sick-leave paper.": "ဆရာဝန်ထံ နေမကောင်းခွင့်စာရွက် တောင်းခြင်း။",
        "Asking the price.": "ဈေးနှုန်း မေးခြင်း။",
        "Asking to add ten dollars to your card.": "ကတ်ထဲသို့ ဆယ်ဒေါ်လာ ထည့်ပေးရန် တောင်းခြင်း။",
        "Asking which platform goes to Jurong East.":
            "Jurong East သို့ ဘယ်ပလက်ဖောင်းက သွားသည်ကို မေးခြင်း။",
        "At a hawker centre, you order at the stall, pay, and carry the food to a table yourself.":
            "ဟော်ကာစင်တာတွင် ဆိုင်၌ မှာယူ၊ ငွေရှင်းပြီး အစားအစာကို စားပွဲသို့ ကိုယ်တိုင် သယ်ရသည်။",
        "At work": "အလုပ်ခွင်တွင်",
        "Buying food": "အစားအစာ ဝယ်ခြင်း",
        "Daily mix": "နေ့စဉ် ရောနှောလေ့ကျင့်မှု",
        "Fill in the missing word": "လိုနေသော စကားလုံးကို ဖြည့်ပါ",
        "Find the right platform, top up your card, and get off at the right stop.":
            "မှန်ကန်သော ပလက်ဖောင်းကို ရှာပါ၊ ကတ်ထဲ ငွေဖြည့်ပါ၊ မှန်ကန်သော မှတ်တိုင်တွင် ဆင်းပါ။",
        "How many times a day?": "တစ်နေ့ ဘယ်နှစ်ကြိမ်လဲ?",
        "How much?": "ဘယ်လောက်လဲ?",
        "If work is not safe, tell your supervisor. You can say no to unsafe work. You can also call MOM at 6438 5122.":
            "အလုပ်က မလုံခြုံပါက ကြီးကြပ်သူကို ပြောပါ။ မလုံခြုံသော အလုပ်ကို ငြင်းနိုင်သည်။ MOM ကို 6438 5122 သို့လည်း ခေါ်ဆိုနိုင်သည်။",
        "If you are hurt at work, tell your supervisor the same day and see a doctor. Keep the MC and every receipt.":
            "အလုပ်တွင် ဒဏ်ရာရပါက ထိုနေ့မှာပင် ကြီးကြပ်သူကို ပြောပြီး ဆရာဝန်နှင့် ပြပါ။ MC နှင့် ပြေစာအားလုံးကို သိမ်းထားပါ။",
        "If you are sick, go to a clinic near your dormitory or a polyclinic. In an emergency, call 995 for an ambulance.":
            "နေမကောင်းပါက အိပ်ဆောင်အနီးရှိ ဆေးခန်း သို့မဟုတ် ပိုလီကလင်းနစ်သို့ သွားပါ။ အရေးပေါ်အခြေအနေတွင် လူနာတင်ယာဉ်အတွက် 995 ကို ခေါ်ပါ။",
        "If your employer does not let you see a doctor, call MOM at 6438 5122 or the Migrant Workers' Centre at 6536 2692.":
            "အလုပ်ရှင်က ဆရာဝန်နှင့် ပြခွင့်မပေးပါက MOM ကို 6438 5122 သို့မဟုတ် Migrant Workers' Centre ကို 6536 2692 သို့ ခေါ်ပါ။",
        "In an emergency, call 995 for an ambulance.":
            "အရေးပေါ်အခြေအနေတွင် လူနာတင်ယာဉ်အတွက် 995 ကို ခေါ်ပါ။",
        "It is your turn at the chicken rice stall.": "ကြက်သားထမင်းဆိုင်တွင် သင့်အလှည့် ရောက်ပြီ။",
        "Listen. Tap what you hear": "နားထောင်ပါ။ ကြားရသည့်အရာကို နှိပ်ပါ",
        "Listen. What does it mean?": "နားထောင်ပါ။ ဘာအဓိပ္ပာယ်လဲ?",
        "My salary is late.": "ကျွန်ုပ်၏ လစာ နောက်ကျနေသည်။",
        "Order at a food stall, ask the price, and say how you want it.":
            "အစားအသောက်ဆိုင်တွင် မှာယူပါ၊ ဈေးနှုန်းမေးပါ၊ မည်သို့လိုချင်ကြောင်း ပြောပါ။",
        "Ordering a drink without ice.": "ရေခဲမပါသော သောက်စရာ မှာယူခြင်း။",
        "Ordering one chicken rice to bring home.":
            "အိမ်သို့ ယူသွားရန် ကြက်သားထမင်း တစ်ပွဲ မှာယူခြင်း။",
        "Pointing to where it hurts.": "နာသည့်နေရာကို ညွှန်ပြခြင်း။",
        "Put the words in order": "စကားလုံးများကို အစီအစဉ်အတိုင်း စီပါ",
        "Say this in English": "ဒါကို အင်္ဂလိပ်လို ပြောပါ",
        "Say what is wrong, ask for an MC, and understand how to take your medicine.":
            "ဘာဖြစ်နေကြောင်း ပြောပါ၊ MC တောင်းပါ၊ ဆေးကို မည်သို့သောက်ရမည်ကို နားလည်ပါ။",
        "Saying thank you to an older man.": "အသက်ကြီးသူ အမျိုးသားကို ကျေးဇူးတင်ကြောင်း ပြောခြင်း။",
        "Saying thank you.": "ကျေးဇူးတင်ကြောင်း ပြောခြင်း။",
        "Saying that something is not safe.": "တစ်ခုခုက မလုံခြုံကြောင်း ပြောခြင်း။",
        "Saying that you are injured.": "သင် ဒဏ်ရာရထားကြောင်း ပြောခြင်း။",
        "Saying you want the food in a box, not on a plate.":
            "အစားအစာကို ပန်းကန်ဖြင့် မဟုတ်ဘဲ ဘူးဖြင့် လိုချင်ကြောင်း ပြောခြင်း။",
        "Saying your pay has not come on time.": "လစာ အချိန်မီ မရသေးကြောင်း ပြောခြင်း။",
        "Seats in a different colour are reserved seats. Give them to old people, pregnant women, and anyone who is hurt.":
            "အရောင်ကွဲသော ထိုင်ခုံများသည် သီးသန့်ထိုင်ခုံများ ဖြစ်သည်။ သက်ကြီးရွယ်အို၊ ကိုယ်ဝန်ဆောင်နှင့် ဒဏ်ရာရသူများကို ပေးပါ။",
        "Seeing a doctor": "ဆရာဝန်နှင့် ပြသခြင်း",
        "Stand on the left side of the escalator so people can walk past on the right.":
            "အခြားသူများ ညာဘက်မှ ဖြတ်လျှောက်နိုင်ရန် စက်လှေကား၏ ဘယ်ဘက်တွင် ရပ်ပါ။",
        "Take medicine the way the doctor says: how many times a day, and before or after food.":
            "ဆရာဝန် ပြောသည့်အတိုင်း ဆေးသောက်ပါ - တစ်နေ့ ဘယ်နှစ်ကြိမ်၊ အစာမစားမီ သို့မဟုတ် စားပြီး။",
        "Taking the MRT": "MRT စီးခြင်း",
        "Tap the pairs": "အတွဲများကို နှိပ်ပါ",
        "Tap your card at the gate when you go in and again when you go out. If you forget to tap out, you pay the highest fare.":
            "ဝင်သည့်အခါနှင့် ထွက်သည့်အခါ ဂိတ်တွင် ကတ်ကို ထိပါ။ ထွက်သည့်အခါ ထိရန် မေ့ပါက အမြင့်ဆုံး ခရီးစရိတ်ကို ပေးရမည်။",
        "Telling staff your card is not working at the gate.":
            "ဂိတ်တွင် ကတ် အလုပ်မလုပ်ကြောင်း ဝန်ထမ်းကို ပြောခြင်း။",
        "Telling the doctor your body is hot.": "ကိုယ်ပူနေကြောင်း ဆရာဝန်ကို ပြောခြင်း။",
        "The doctor asks what is wrong.": "ဆရာဝန်က ဘာဖြစ်သည်ကို မေးသည်။",
        "The doctor asks where it hurts.": "ဆရာဝန်က ဘယ်နေရာ နာသည်ကို မေးသည်။",
        "The doctor wants to know where it hurts.": "ဆရာဝန်က ဘယ်နေရာ နာသည်ကို သိလိုသည်။",
        "The seller asks for your order.": "ဆိုင်ရှင်က သင့်အော်ဒါကို မေးသည်။",
        "The seller asks if you will eat here or bring it home.":
            "ဆိုင်ရှင်က ဒီမှာ စားမည်လား အိမ်ယူသွားမည်လား မေးသည်။",
        "The staff member asks if you need help.": "ဝန်ထမ်းက အကူအညီ လိုသလား မေးသည်။",
        "The supervisor asks what happened.": "ကြီးကြပ်သူက ဘာဖြစ်သည်ကို မေးသည်။",
        "The supervisor gives a long instruction.": "ကြီးကြပ်သူက ရှည်လျားသော ညွှန်ကြားချက် ပေးသည်။",
        "Top up your card for free at the machine inside the station. 7-Eleven and Cheers shops also top up, but they charge a small fee each time.":
            "ဘူတာအတွင်းရှိ စက်တွင် ကတ်ကို အခမဲ့ ငွေဖြည့်ပါ။ 7-Eleven နှင့် Cheers ဆိုင်များတွင်လည်း ဖြည့်နိုင်သော်လည်း အကြိမ်တိုင်း အခကြေးငွေ အနည်းငယ် ယူသည်။",
        "Use the same card or phone both times. If you tap in with your card and out with your phone, the trip will not match.":
            "နှစ်ကြိမ်လုံး ကတ် သို့မဟုတ် ဖုန်း တစ်ခုတည်းကို သုံးပါ။ ကတ်ဖြင့် ဝင်ပြီး ဖုန်းဖြင့် ထွက်ပါက ခရီးစဉ် မကိုက်ညီပါ။",
        "Wear your helmet, safety boots and vest on the worksite. Your employer must give them to you for free.":
            "လုပ်ငန်းခွင်တွင် ဦးထုပ်၊ လုံခြုံရေးဖိနပ်နှင့် အင်္ကျီ ဝတ်ပါ။ အလုပ်ရှင်က ၎င်းတို့ကို အခမဲ့ ပေးရမည်။",
        "What do you say?": "သင် ဘာပြောမလဲ?",
        "What is this called?": "ဒါကို ဘာလို့ခေါ်သလဲ?",
        "Which one is this?": "ဒါက ဘယ်ဟာလဲ?",
        "Which platform for Jurong East?": "Jurong East အတွက် ဘယ်ပလက်ဖောင်းလဲ?",
        "You are at a food stall. You want to eat at home.":
            "သင် အစားအစာဆိုင်တွင် ရှိသည်။ အိမ်မှာ စားချင်သည်။",
        "You are in the doctor's room.": "သင် ဆရာဝန်၏ အခန်းထဲတွင် ရှိသည်။",
        "You fell and your arm is bleeding. Your supervisor runs over.":
            "သင် လဲကျပြီး လက်မောင်းမှ သွေးထွက်နေသည်။ ကြီးကြပ်သူ ပြေးလာသည်။",
        "Your card does not work at the gate. A staff member comes over.":
            "ဂိတ်တွင် သင့်ကတ် အလုပ်မလုပ်ပါ။ ဝန်ထမ်းတစ်ဦး လာသည်။",
        "Your employer must pay for your medical care. Keep every receipt.":
            "ဆေးကုသစရိတ်ကို အလုပ်ရှင်က ပေးရမည်။ ပြေစာအားလုံးကို သိမ်းထားပါ။",
        "Your salary must be paid within 7 days after the end of the month. If it is late, call MOM.":
            "လကုန်ပြီး ၇ ရက်အတွင်း လစာ ပေးရမည်။ နောက်ကျပါက MOM ကို ခေါ်ပါ။",
        "Your supervisor speaks very fast. You did not understand.":
            "ကြီးကြပ်သူက အလွန်မြန်မြန် ပြောသည်။ သင် နားမလည်ပါ။",
        "a day off from work": "အလုပ်မှ ခွင့်တစ်ရက်",
        "a day with no work": "အလုပ်မလုပ်ရသည့် တစ်ရက်",
        "a fixed time to see the doctor": "ဆရာဝန်နှင့် ပြရန် သတ်မှတ်ထားသော အချိန်",
        "a paper from the doctor that says you are sick": "သင် နေမကောင်းကြောင်း ဆရာဝန်၏ စာရွက်",
        "a seat for old, pregnant or hurt people":
            "သက်ကြီး၊ ကိုယ်ဝန်ဆောင် သို့မဟုတ် ဒဏ်ရာရသူများအတွက် ထိုင်ခုံ",
        "a short rest from work": "အလုပ်မှ ခဏ အနားယူချိန်",
        "a small place where a doctor sees you": "ဆရာဝန်က သင့်ကို ကြည့်သည့် နေရာငယ်",
        "a smaller amount": "ပိုနည်းသော ပမာဏ",
        "a station where you change to another line": "အခြားလိုင်းသို့ ပြောင်းသည့် ဘူတာ",
        "add money to your card": "ကတ်ထဲသို့ ငွေဖြည့်ခြင်း",
        "bring the food home in a box": "အစားအစာကို ဘူးဖြင့် အိမ်ယူသွားခြင်း",
        "change to another train line": "အခြား ရထားလိုင်းသို့ ပြောင်းခြင်း",
        "eat here, at a table": "ဒီမှာ စားပွဲတွင် စားခြင်း",
        "get off the train": "ရထားမှ ဆင်းခြင်း",
        "hot, with chilli": "စပ်သော၊ ငရုတ်သီးပါသော",
        "it hurts": "နာသည်",
        "not safe; you can get hurt": "မလုံခြုံ၊ ဒဏ်ရာရနိုင်သည်",
        "one more time": "နောက်တစ်ကြိမ်",
        "one small shop inside a hawker centre": "ဟော်ကာစင်တာအတွင်းရှိ ဆိုင်ငယ်တစ်ဆိုင်",
        "paper money and coins": "ငွေစက္ကူနှင့် အကြွေစေ့",
        "rice with chicken, a common Singapore meal":
            "ကြက်သားနှင့် ထမင်း၊ စင်ကာပူ၏ အဖြစ်များသော အစားအစာ",
        "something to drink, like tea or juice": "လက်ဖက်ရည် သို့မဟုတ် ဖျော်ရည်ကဲ့သို့ သောက်စရာ",
        "stay home and sleep": "အိမ်မှာနေပြီး အိပ်ခြင်း",
        "strong shoes for work": "အလုပ်အတွက် ခိုင်ခံ့သော ဖိနပ်",
        "the boss at your worksite": "လုပ်ငန်းခွင်ရှိ သူဌေး",
        "the money you get for your work": "အလုပ်အတွက် ရသော ငွေ",
        "the money you pay for the trip": "ခရီးအတွက် ပေးရသော ငွေ",
        "the way out of the station": "ဘူတာမှ ထွက်ပေါက်",
        "touch your card at the gate when you leave": "ထွက်သည့်အခါ ဂိတ်တွင် ကတ်ကို ထိခြင်း",
        "wait for the next train": "နောက်ရထားကို စောင့်ခြင်း",
        "what is the price": "ဈေးနှုန်း ဘယ်လောက်လဲ",
        "what you take to get better": "သက်သာရန် သောက်သည့်အရာ",
        "when air comes out of your mouth with a loud sound":
            "ပါးစပ်မှ လေ ကျယ်လောင်စွာ ထွက်လာသည့်အခါ",
        "where you wait for the train": "ရထားကို စောင့်သည့်နေရာ",
        "your body is injured": "ကိုယ်ခန္ဓာ ဒဏ်ရာရသည်",
        "your body is very hot": "ကိုယ် အလွန် ပူနေသည်",
        // AI Words (workshop lesson)
        "AI Words": "AI စကားလုံးများ",
        "Know the key words people use when they talk about AI.":
            "AI အကြောင်း ပြောသည့်အခါ လူများ သုံးသော အဓိက စကားလုံးများကို သိထားပါ။",
        "computer programs that can do tasks that usually need a human mind":
            "များသောအားဖြင့် လူက စဉ်းစားပြီး လုပ်ရသော အလုပ်များကို လုပ်နိုင်သည့် ကွန်ပျူတာ ပရိုဂရမ်များ",
        "how an AI gets better by learning patterns from lots of examples":
            "AI က ဥပမာ အများအပြားမှ ပုံစံများကို သင်ယူပြီး ပိုတော်လာပုံ",
        "the examples (text, photos, recordings) an AI learns from":
            "AI က သင်ယူသည့် ဥပမာများ (စာသား၊ ဓာတ်ပုံ၊ အသံဖမ်းချက်များ)",
        "an AI you have a conversation with by typing, like ChatGPT or Gemini":
            "ChatGPT သို့မဟုတ် Gemini ကဲ့သို့ စာရိုက်၍ စကားပြောနိုင်သော AI",
        "the question or instruction you type or say to an AI":
            "AI ကို စာရိုက်၍ဖြစ်စေ ပြော၍ဖြစ်စေ ပေးသော မေးခွန်း သို့မဟုတ် ညွှန်ကြားချက်",
        "AI that creates new things: text, pictures, music or video":
            "စာ၊ ပုံ၊ ဂီတ သို့မဟုတ် ဗီဒီယို စသည့် အရာအသစ်များကို ဖန်တီးပေးသော AI",
        "an AI that listens to your voice and answers out loud, like Siri":
            "Siri ကဲ့သို့ သင့်အသံကို နားထောင်ပြီး အသံထွက်၍ ပြန်ဖြေသော AI",
        "AI that can tell what is in a photo": "ဓာတ်ပုံထဲတွင် ဘာရှိသည်ကို ပြောပြနိုင်သော AI",
        "when an AI confidently gives an answer that is made up or wrong":
            "AI က လုပ်ကြံထားသော သို့မဟုတ် မှားသော အဖြေကို သေချာသကဲ့သို့ ပေးသည့်အခါ",
        "Saying the AI gave a confident answer that was false.":
            "AI က မှားသော အဖြေကို သေချာသကဲ့သို့ ပေးခဲ့ကြောင်း ပြောခြင်း။",
        "Suggesting a more detailed question to get a better answer.":
            "ပိုကောင်းသော အဖြေရရန် ပိုအသေးစိတ်သော မေးခွန်း မေးဖို့ အကြံပြုခြင်း။",
        "Which one is a chatbot?": "chatbot က ဘယ်ဟာလဲ?",
        "Which word fits?": "ဘယ်စကားလုံးက ကိုက်ညီသလဲ?",
        "Your friend has been using a chatbot and looks confused.":
            "သင့်သူငယ်ချင်းက chatbot ကို သုံးနေပြီး ခေါင်းရှုပ်နေပုံ ရသည်။",
        "Your friend searched for the book and could not find it anywhere.":
            "သင့်သူငယ်ချင်းက ထိုစာအုပ်ကို ရှာခဲ့သော်လည်း ဘယ်နေရာမှာမှ ရှာမတွေ့ပါ။",
        "Saying it was an AI that answers out loud.": "အသံထွက်၍ ပြန်ဖြေသော AI ဖြစ်ကြောင်း ပြောခြင်း။",
        "Saying it was the examples the AI learned from.": "AI သင်ယူခဲ့သော ဥပမာများ ဖြစ်ကြောင်း ပြောခြင်း။",
        "Your friend asked a chatbot to plan a trip.":
            "သင့်သူငယ်ချင်းက chatbot ကို ခရီးစဉ်တစ်ခု စီစဉ်ပေးရန် တောင်းဆိုခဲ့သည်။",
        "The answer did not have enough detail to be useful.": "အဖြေတွင် အသုံးဝင်လောက်အောင် အသေးစိတ် မပါပါ။",
        "Suggesting they change what the AI learned from.": "AI သင်ယူခဲ့သည့် အရာကို ပြောင်းရန် အကြံပြုခြင်း။",
        "Suggesting they use an AI that reads photos.": "ဓာတ်ပုံကို ကြည့်၍ နားလည်နိုင်သော AI ကို သုံးရန် အကြံပြုခြင်း။",
        "A chatbot answers whatever you type, and what you type is your prompt. Try the ideas below, or ask anything you like.":
            "Chatbot က သင်ရိုက်သမျှကို ဖြေပေးပြီး သင်ရိုက်သည့်အရာသည် သင့် prompt ဖြစ်သည်။ အောက်ပါ အကြံများကို စမ်းကြည့်ပါ၊ သို့မဟုတ် ကြိုက်ရာကို မေးပါ။",
        "Say exactly what you want.": "သင် ဘာလိုချင်သည်ကို တိတိကျကျ ပြောပါ။",
        "Give context: who it is for, and limits like time or budget.":
            "အခြေအနေ ပြောပြပါ - ဘယ်သူ့အတွက်လဲ၊ အချိန် သို့မဟုတ် ငွေ ဘယ်လောက်အထိ သုံးနိုင်သလဲ။",
        "Say the format: a list, three sentences, a short message.":
            "ပုံစံကို ပြောပါ - စာရင်း၊ စာကြောင်း သုံးကြောင်း၊ စာတိုတစ်စောင်။",
        "Not happy with the answer? Ask a follow-up to change it.":
            "အဖြေကို မကျေနပ်ဘူးလား? ပြင်ရန် နောက်ဆက်တွဲ မေးခွန်း မေးပါ။",
        "Ask about an AI word": "AI စကားလုံးတစ်လုံးအကြောင်း မေးပါ",
        "Pick any word from the lesson and ask the chatbot to explain it.":
            "သင်ခန်းစာထဲမှ စကားလုံးတစ်လုံးကို ရွေးပြီး chatbot ကို ရှင်းပြခိုင်းပါ။",
        "Send a vague prompt": "မရှင်းလင်းသော prompt တစ်ခု ပို့ပါ",
        "Send this short prompt and see what comes back.": "ဤ prompt တိုကို ပို့ပြီး ဘာပြန်ဖြေသည်ကို ကြည့်ပါ။",
        "Now add the details": "အခု အသေးစိတ်များ ထည့်ပါ",
        "Same request with context, limits and a format. Compare the two answers.":
            "တူညီသော တောင်းဆိုချက်ကို အခြေအနေ၊ ကန့်သတ်ချက်နှင့် ပုံစံ ထည့်၍ ပို့ပါ။ အဖြေနှစ်ခုကို နှိုင်းယှဉ်ပါ။",
        "Make something new": "အရာအသစ်တစ်ခု ဖန်တီးပါ",
        "That's generative AI: it writes something that did not exist before.":
            "ဤသည်မှာ generative AI ဖြစ်သည် - အရင်က မရှိခဲ့သော အရာအသစ်ကို ရေးပေးသည်။",
        "Ask a follow-up": "နောက်ဆက်တွဲ မေးခွန်း မေးပါ",
        "Change the last answer without starting again.": "အစက ပြန်မစဘဲ နောက်ဆုံးအဖြေကို ပြင်ပါ။",
        "Check for a hallucination": "Hallucination ရှိမရှိ စစ်ဆေးပါ",
        "Ask for facts, then ask if it is sure. Chatbots can sound confident and still be wrong.":
            "အချက်အလက်များကို မေးပါ၊ ပြီးလျှင် သေချာရဲ့လားဟု မေးပါ။ Chatbot များသည် သေချာသကဲ့သို့ ပြောသော်လည်း မှားနိုင်သည်။",
        "Getting to know someone": "လူသစ်နှင့် မိတ်ဆက်ခြင်း",
        "Say your name and where you are from, and ask new people about themselves.":
            "သင့်နာမည်နှင့် ဘယ်ကလာသလဲ ပြောပါ။ လူသစ်များကိုလည်း သူတို့အကြောင်း မေးပါ။",
        "People in Singapore often say \"Have you eaten?\" as a friendly hello. You can say \"Yes, thank you.\"":
            "စင်ကာပူတွင် ရင်းရင်းနှီးနှီး နှုတ်ဆက်ရန် \"Have you eaten?\" ဟု မေးလေ့ရှိသည်။ \"Yes, thank you.\" ဟု ပြန်ပြောနိုင်သည်။",
        "People may call an older woman \"Aunty\" and an older man \"Uncle\". It is polite, even if you are not family.":
            "အသက်ကြီးသော အမျိုးသမီးကို \"Aunty\"၊ အမျိုးသားကို \"Uncle\" ဟု ခေါ်တတ်သည်။ ဆွေမျိုးမဟုတ်လည်း ယဉ်ကျေးသော အခေါ်အဝေါ်ဖြစ်သည်။",
        "You do not have to answer every question. If someone asks about your pay or your family and you do not want to say, you can smile and change the topic.":
            "မေးခွန်းတိုင်းကို ဖြေရန် မလိုပါ။ လစာ သို့မဟုတ် မိသားစုအကြောင်း မပြောချင်လျှင် ပြုံးပြီး အခြားအကြောင်း ပြောနိုင်သည်။",
        "The best way to learn is to talk. Say hello to one new person on your day off.":
            "စကားပြောခြင်းက သင်ယူရန် အကောင်းဆုံးနည်းဖြစ်သည်။ နားရက်တွင် လူသစ်တစ်ယောက်ကို နှုတ်ဆက်ပါ။",
        "what people call you": "လူများက သင့်ကို ခေါ်သောအမည်",
        "a place like India or Bangladesh": "အိန္ဒိယ သို့မဟုတ် ဘင်္ဂလားဒေ့ရှ်ကဲ့သို့ နိုင်ငံ",
        "your parents, husband or wife, and children":
            "သင့်မိဘ၊ ခင်ပွန်း သို့မဟုတ် ဇနီးနှင့် သားသမီးများ",
        "young boys and girls; sons and daughters":
            "ယောက်ျားလေး၊ မိန်းကလေးငယ်များ; သားများနှင့် သမီးများ",
        "someone you like and spend time with": "သင်နှစ်သက်ပြီး အတူအချိန်ကုန်ဆုံးသောသူ",
        "the work you do for money": "ငွေရရန် သင်လုပ်သောအလုပ်",
        "something you like to do in your free time": "အားလပ်ချိန်တွင် သင်လုပ်ရတာ နှစ်သက်သောအရာ",
        "the day after Saturday; many workers rest": "စနေနေ့နောက်တစ်ရက်; အလုပ်သမားများစွာ နားကြသည်",
        "Asking someone's name.": "တစ်ယောက်ယောက်၏ နာမည်ကို မေးခြင်း။",
        "Telling someone your name.": "သင့်နာမည်ကို ပြောခြင်း။",
        "Asking which country someone comes from.": "ဘယ်နိုင်ငံက လာသလဲ မေးခြင်း။",
        "Asking what work someone does.": "ဘာအလုပ်လုပ်သလဲ မေးခြင်း။",
        "Saying you are happy to meet someone new.": "လူသစ်နှင့် တွေ့ရတာ ဝမ်းသာကြောင်း ပြောခြင်း။",
        "Asking about someone's day off.": "တစ်ယောက်ယောက်၏ နားရက်အကြောင်း မေးခြင်း။",
        "You meet someone new at the park on your day off.":
            "နားရက်တွင် ပန်းခြံ၌ လူသစ်တစ်ယောက်နှင့် တွေ့သည်။",
        "The new person asks your name.": "လူသစ်က သင့်နာမည်ကို မေးသည်။",
        "Your friend brings a new person to meet you.":
            "သင့်သူငယ်ချင်းက လူသစ်တစ်ယောက်ကို မိတ်ဆက်ပေးရန် ခေါ်လာသည်။",
        "The new person tells you her name.": "မိတ်ဆက်လာသော အမျိုးသမီးက သူ့နာမည်ကို ပြောသည်။",
        "What is your job?": "သင် ဘာအလုပ်လုပ်သလဲ။",
        "Helping at home": "အိမ်တွင် ကူညီခြင်း",
        "Understand what to do at home, say what you have finished, and ask when you are not sure.":
            "အိမ်တွင် ဘာလုပ်ရမလဲ နားလည်အောင်လုပ်ပါ။ ပြီးသွားသောအလုပ်ကို ပြောပါ။ မသေချာလျှင် မေးပါ။",
        "Never lean out of a window to clean it or to hang clothes. If someone asks you to, say it is not safe.":
            "ပြတင်းပေါက်သန့်ရှင်းရန် သို့မဟုတ် အဝတ်လှန်းရန် အပြင်သို့ ကိုယ်ကို ကိုင်းမထုတ်ပါနှင့်။ တစ်ယောက်ယောက်က ခိုင်းလျှင် မလုံခြုံကြောင်း ပြောပါ။",
        "Never throw anything out of a window. Put rubbish in the rubbish chute or the bin.":
            "ပြတင်းပေါက်မှ ဘာမှ ပစ်မချပါနှင့်။ အမှိုက်ကို မီးဖိုချောင်ရှိ သံတံခါးငယ်ပါသော အမှိုက်ချပြွန် သို့မဟုတ် အမှိုက်ပုံးထဲ ထည့်ပါ။",
        "Never mix bleach with other cleaning products. The gas can hurt you.":
            "အရောင်ချွတ်ဆေးကို အခြားသန့်ရှင်းရေးဆေးများနှင့် မရောပါနှင့်။ ထွက်လာသောဓာတ်ငွေ့က သင့်ကို ထိခိုက်စေနိုင်သည်။",
        "If you do not know how to use a machine, ask first. It is better to ask than to break it.":
            "စက်အသုံးပြုပုံ မသိလျှင် အရင်မေးပါ။ ပျက်စီးစေတာထက် မေးတာက ပိုကောင်းသည်။",
        "clothes to wash": "လျှော်ရန်အဝတ်များ",
        "a hot tool that makes clothes flat": "အဝတ်အတွန့်များ ပြေစေသော ပူသည့်ကိရိယာ",
        "a stick with cloth for washing the floor": "ကြမ်းပြင်ဆေးရန် အဝတ်တပ်ထားသော တုတ်",
        "plates and bowls you eat from": "စားသောက်ရာတွင် သုံးသော ပန်းကန်ပြားနှင့် ပန်းကန်လုံးများ",
        "things you throw away": "သင်ပစ်လိုက်သောပစ္စည်းများ",
        "a cold box that keeps food fresh": "အစားအစာကို လတ်ဆတ်အောင် အေးအေးထားပေးသောပုံး",
        "where you cook food with fire": "မီးဖြင့် အစားအစာချက်သောနေရာ",
        "a place with doors to keep things": "ပစ္စည်းသိမ်းရန် တံခါးများပါသောနေရာ",
        "Asking what work comes after this.": "ဒီနောက် ဘာအလုပ်ဆက်လုပ်ရမလဲ မေးခြင်း။",
        "Saying the laundry is done.": "အဝတ်လျှော်ပြီးကြောင်း ပြောခြင်း။",
        "Asking where something goes.": "ပစ္စည်းတစ်ခုကို ဘယ်မှာထားရမလဲ မေးခြင်း။",
        "Asking someone to show you the way to do it.": "လုပ်ပုံလုပ်နည်း ပြပေးရန် မေးခြင်း။",
        "Saying sorry and telling the truth about a broken plate.":
            "ပန်းကန်ကွဲသွားသည့်အကြောင်း အမှန်ပြောပြီး တောင်းပန်ခြင်း။",
        "You finished washing the clothes. Your employer comes into the room.":
            "သင်အဝတ်လျှော်ပြီးပြီ။ အလုပ်ရှင်က အခန်းထဲဝင်လာသည်။",
        "Your employer asks if the clothes are washed.":
            "အဝတ်လျှော်ပြီးပြီလားဟု အလုပ်ရှင်က မေးသည်။",
        "There is a new iron at home. You do not know how to use it.":
            "အိမ်တွင် မီးပူအသစ်ရှိသည်။ အသုံးပြုပုံကို သင်မသိပါ။",
        "Your employer asks you to iron the shirts.":
            "အလုပ်ရှင်က ရှပ်အင်္ကျီများကို မီးပူတိုက်ခိုင်းသည်။",
        "Sorry, I broke a plate.": "တောင်းပန်ပါတယ်၊ ကျွန်တော် ပန်းကန်တစ်ချပ် ခွဲမိပါတယ်။",
        "Reading signs": "ဆိုင်းဘုတ်များ ဖတ်ခြင်း",
        "Read the signs you see every day, and ask when you do not understand one.":
            "နေ့တိုင်းတွေ့သော ဆိုင်းဘုတ်များကို ဖတ်ပါ။ နားမလည်လျှင် မေးပါ။",
        "Red signs usually mean stop or danger. Yellow means be careful. Green usually means safe, or the way out.":
            "အနီရောင်ဆိုင်းဘုတ်များသည် များသောအားဖြင့် ရပ်ရန် သို့မဟုတ် အန္တရာယ်ရှိကြောင်း ပြသည်။ အဝါရောင်သည် သတိထားရန်ဖြစ်သည်။ အစိမ်းရောင်သည် များသောအားဖြင့် လုံခြုံကြောင်း သို့မဟုတ် ထွက်ပေါက်ကို ပြသည်။",
        "You can be fined for smoking where it is not allowed. Many places have a yellow box that shows where you can smoke.":
            "ခွင့်မပြုသောနေရာတွင် ဆေးလိပ်သောက်လျှင် ဒဏ်ငွေဆောင်ရနိုင်သည်။ နေရာများစွာတွင် ဆေးလိပ်သောက်နိုင်သောနေရာကို အဝါရောင်လေးထောင့် မျဉ်းဖြင့် ပြထားသည်။",
        "Many signs in Singapore are in English, Chinese, Malay and Tamil. If your language is there, read it first, then look for the English word.":
            "စင်ကာပူရှိ ဆိုင်းဘုတ်များစွာသည် အင်္ဂလိပ်၊ တရုတ်၊ မလေးနှင့် တမီးလ်ဘာသာတို့ဖြင့် ရေးထားသည်။ သင့်ဘာသာပါလျှင် အရင်ဖတ်ပါ။ ပြီးမှ အင်္ဂလိပ်စကားလုံးကို ရှာပါ။",
        "Not sure what a sign means? Take a photo and ask someone. Do not go past a danger sign.":
            "ဆိုင်းဘုတ်၏ အဓိပ္ပာယ် မသေချာဘူးလား။ ဓာတ်ပုံရိုက်ပြီး တစ်ယောက်ယောက်ကို မေးပါ။ အန္တရာယ်ဆိုင်းဘုတ်ကို ကျော်မသွားပါနှင့်။",
        "the floor has water; you can slip": "ကြမ်းပြင်ပေါ် ရေရှိသည်; ချော်လဲနိုင်သည်",
        "do not go in": "မဝင်ပါနှင့်",
        "do not smoke here": "ဒီမှာ ဆေးလိပ်မသောက်ပါနှင့်",
        "not open now": "ယခု မဖွင့်သေးပါ",
        "press the door away from you": "တံခါးကို သင့်ထံမှ အဝေးသို့ တွန်းပါ",
        "bring the door towards you": "တံခါးကို သင့်ဘက်သို့ ဆွဲပါ",
        "the room with a toilet, in a public place": "အများပြည်သူသုံးနေရာရှိ အိမ်သာပါသောအခန်း",
        "something here can hurt you": "ဒီနေရာရှိ အရာတစ်ခုက သင့်ကို ထိခိုက်စေနိုင်သည်",
        "Asking someone to explain a sign.": "ဆိုင်းဘုတ်ကို ရှင်းပြရန် မေးခြင်း။",
        "Telling someone to be careful of the wet floor.":
            "ရေစိုနေသော ကြမ်းပြင်ကို သတိထားရန် ပြောခြင်း။",
        "Asking the way to the toilet.": "အိမ်သာသို့သွားရာလမ်း မေးခြင်း။",
        "Saying a shop is not open.": "ဆိုင်မဖွင့်ကြောင်း ပြောခြင်း။",
        "Telling someone they are not allowed to enter.": "ဝင်ခွင့်မရှိကြောင်း ပြောခြင်း။",
        "You are new in a building and you need the toilet. You see a cleaner.":
            "သင် ဒီအဆောက်အအုံကို ရောက်ဖူးတာမရှိပါ။ အိမ်သာသွားချင်သည်။ သန့်ရှင်းရေးလုပ်သူကို တွေ့သည်။",
        "The cleaner asks if you need help.": "သန့်ရှင်းရေးလုပ်သူက အကူအညီလိုသလား မေးသည်။",
        "Your friend is walking to a door with a red No Entry sign.":
            "သင့်သူငယ်ချင်းက အနီရောင် No Entry ဆိုင်းဘုတ်ရှိသော တံခါးဆီသို့ လျှောက်နေသည်။",
        "Your friend asks if they can go in.": "သင့်သူငယ်ချင်းက ဝင်လို့ရသလား မေးသည်။",
        "The shop is closed.": "ဆိုင်ပိတ်ထားသည်။",
        "Buses and finding your way": "ဘတ်စ်ကားစီးခြင်းနှင့် လမ်းရှာခြင်း",
        "Find the right bus, get off at your stop, and ask for directions when you are lost.":
            "မှန်သောဘတ်စ်ကားကို ရှာပါ။ သင့်မှတ်တိုင်တွင် ဆင်းပါ။ လမ်းပျောက်လျှင် လမ်းမေးပါ။",
        "Tap your card when you get on the bus and again when you get off. If you forget to tap when you get off, you can pay more.":
            "ဘတ်စ်ကားပေါ်တက်ချိန်နှင့် ဆင်းချိန်တွင် ကတ်ကို ထိပါ။ ဆင်းချိန်တွင် မထိမိလျှင် ငွေပိုပေးရနိုင်သည်။",
        "Press the bell just before your stop. If nobody presses it and nobody is waiting, the bus does not stop.":
            "သင့်မှတ်တိုင် မရောက်ခင်လေးတွင် ခေါင်းလောင်းခလုတ်ကို နှိပ်ပါ။ ဘယ်သူမှ မနှိပ်ဘဲ စောင့်နေသူလည်း မရှိလျှင် ကားမရပ်ပါ။",
        "Raise your hand when your bus comes, so the driver knows to stop.":
            "သင့်ဘတ်စ်ကားလာလျှင် လက်မြှောက်ပါ။ ဒါမှ ယာဉ်မောင်းက ရပ်ရမည်ကို သိမည်။",
        "Cross the road at a traffic light or an overhead bridge. You can be fined for crossing somewhere else nearby.":
            "မီးပွိုင့် သို့မဟုတ် လမ်းပေါ်ကျော်သော လူကူးတံတားမှ လမ်းကူးပါ။ အနီးအနားရှိ အခြားနေရာမှ ကူးလျှင် ဒဏ်ငွေဆောင်ရနိုင်သည်။",
        "where you wait for the bus": "ဘတ်စ်ကားစောင့်သောနေရာ",
        "press it to ask the bus to stop": "ဘတ်စ်ကားရပ်ရန် ဒါကိုနှိပ်ပါ",
        "the side of your left hand": "သင့်ဘယ်လက်ရှိသောဘက်",
        "the side of your right hand": "သင့်ညာလက်ရှိသောဘက်",
        "keep going ahead; do not turn": "ရှေ့သို့တည့်တည့်သွားပါ; မကွေ့ပါနှင့်",
        "the lights that say stop or go": "ရပ်ရန် သို့မဟုတ် သွားရန် ပြသောမီးများ",
        "a bridge for walking over a road": "လမ်းပေါ်မှ လမ်းလျှောက်ကူးရန် တံတား",
        "a picture that shows where places are": "နေရာများ ဘယ်မှာရှိသလဲ ပြသောပုံ",
        "Asking which bus to take.": "ဘယ်ဘတ်စ်ကားစီးရမလဲ မေးခြင်း။",
        "Asking the way to the bus stop.": "ဘတ်စ်ကားမှတ်တိုင်သို့သွားရာလမ်း မေးခြင်း။",
        "Telling someone the way.": "တစ်ယောက်ယောက်ကို လမ်းပြခြင်း။",
        "Saying you do not know where you are.": "သင်ဘယ်ရောက်နေသလဲ မသိကြောင်း ပြောခြင်း။",
        "Asking someone to tell you when to get off.": "ဘယ်အချိန်ဆင်းရမလဲ ပြောပေးရန် မေးခြင်း။",
        "You are at a bus stop and want to go to Little India. A woman is waiting next to you.":
            "သင်ဘတ်စ်ကားမှတ်တိုင်တွင်ရှိပြီး Little India သို့ သွားချင်သည်။ သင့်ဘေးတွင် အမျိုးသမီးတစ်ယောက် စောင့်နေသည်။",
        "The woman asks if you are waiting for a bus.": "အမျိုးသမီးက ဘတ်စ်ကားစောင့်နေသလား မေးသည်။",
        "You do not know this road and your phone has no battery. You see a man walking.":
            "ဒီလမ်းကို သင်မသိပါ။ ဖုန်းလည်း ဘက်ထရီကုန်နေသည်။ လမ်းလျှောက်နေသော အမျိုးသားတစ်ယောက်ကို တွေ့သည်။",
        "The man asks if he can help you.": "အမျိုးသားက ကူညီပေးရမလား မေးသည်။",
        "Please tell me my stop.": "ကျွန်တော်ဆင်းရမယ့် မှတ်တိုင်ရောက်ရင် ပြောပေးပါ။",
        "At the supermarket": "စူပါမားကတ်တွင်",
        "Find what you need, check the price and the date, and pay at the counter.":
            "လိုသောပစ္စည်းကို ရှာပါ။ ဈေးနှုန်းနှင့် ရက်စွဲကို စစ်ပြီး ငွေရှင်းကောင်တာတွင် ပေးချေပါ။",
        "Big supermarkets charge at least 5 cents for each plastic bag. Bring your own bag to save money.":
            "စူပါမားကတ်ကြီးများတွင် ပလတ်စတစ်အိတ်တစ်အိတ်လျှင် အနည်းဆုံး 5 ဆင့် ယူသည်။ ငွေချွေတာရန် ကိုယ့်အိတ်ယူလာပါ။",
        "Look for the date on food before you buy it. \"Best before\" and \"Use by\" tell you how long it is good.":
            "အစားအစာမဝယ်ခင် ရက်စွဲကို ရှာကြည့်ပါ။ \"Best before\" နှင့် \"Use by\" က ဘယ်အချိန်အထိ ကောင်းသလဲ ပြသည်။",
        "Keep the receipt when you shop for someone else, so you can show what you spent.":
            "အခြားသူအတွက် ဈေးဝယ်လျှင် ပြေစာကို သိမ်းထားပါ။ ဘယ်လောက်သုံးခဲ့သလဲ ပြနိုင်သည်။",
        "The cashier may ask if you have a member card. If you do not have one, just say no.":
            "အသင်းဝင်ကတ်ရှိသလားဟု ငွေရှင်းဝန်ထမ်းက မေးနိုင်သည်။ မရှိလျှင် မရှိဘူးဟု ပြောရုံပါပဲ။",
        "a big basket on wheels": "ဘီးများပါသော ခြင်းတောင်းကြီး",
        "the walkway between shelves": "စင်များကြားက လျှောက်လမ်း",
        "the person you pay": "သင်ငွေပေးရသောသူ",
        "the paper that shows what you paid": "သင်ပေးချေခဲ့သည်ကို ပြသောစာရွက်",
        "a lower price than usual": "ပုံမှန်ထက် နည်းသောဈေးနှုန်း",
        "the last day the food is good": "အစားအစာကောင်းနေသေးသော နောက်ဆုံးရက်",
        "a thin bag to carry your shopping": "ဝယ်ထားသောပစ္စည်းများ သယ်ရန် အိတ်ပါး",
        "plants you cook and eat, like carrots": "မုန်လာဥနီကဲ့သို့ ချက်စားသောအပင်များ",
        "Asking where to find something.": "ပစ္စည်းတစ်ခုကို ဘယ်မှာရှာရမလဲ မေးခြင်း။",
        "Asking if the price is lower today.": "ဒီနေ့ ဈေးလျော့သလား မေးခြင်း။",
        "Asking the cashier for a bag.": "ငွေရှင်းဝန်ထမ်းထံ အိတ်တောင်းခြင်း။",
        "Asking the cashier for the receipt.": "ငွေရှင်းဝန်ထမ်းထံ ပြေစာတောင်းခြင်း။",
        "Telling staff that the food is past its date.":
            "အစားအစာ ရက်လွန်နေကြောင်း ဝန်ထမ်းကို ပြောခြင်း။",
        "You are paying at the counter. You do not have your own bag.":
            "သင်ကောင်တာတွင် ငွေရှင်းနေသည်။ ကိုယ်ပိုင်အိတ် မပါပါ။",
        "The cashier tells you the price.": "ငွေရှင်းဝန်ထမ်းက ဈေးနှုန်းပြောသည်။",
        "The milk in your basket is past its date. You show it to a staff member.":
            "သင့်ခြင်းတောင်းထဲက နို့သည် ရက်လွန်နေသည်။ ဝန်ထမ်းတစ်ယောက်ကို ပြသည်။",
        "A staff member asks if they can help you.": "ဝန်ထမ်းတစ်ယောက်က ကူညီပေးရမလား မေးသည်။",
        "Is this on discount?": "ဒါ ဈေးလျှော့ထားတာလား။",
        "Construction science": "ဆောက်လုပ်ရေး သိပ္ပံ",
        "Learn the main building materials, why a building stays up, and how to warn others about a problem.":
            "အဓိကဆောက်လုပ်ရေးပစ္စည်းများ၊ အဆောက်အအုံ ဘာကြောင့်မပြိုသလဲ၊ ပြဿနာရှိလျှင် အခြားသူများကို ဘယ်လိုသတိပေးရမလဲ လေ့လာပါ။",
        "Concrete is strong when it is pressed, but it cracks when it is pulled. That is why steel bars go inside it.":
            "ကွန်ကရစ်က ဖိအားကို ခံနိုင်သော်လည်း ဆွဲလျှင် အက်ကွဲသည်။ ဒါကြောင့် အထဲမှာ သံချောင်းထည့်သည်။",
        "Too much water makes concrete weak. Use only the amount of water your supervisor tells you.":
            "ရေများလွန်းလျှင် ကွန်ကရစ်အားနည်းသည်။ ကြီးကြပ်သူပြောသော ရေပမာဏကိုသာ သုံးပါ။",
        "Concrete goes hard slowly. It takes about 28 days to reach full strength, so ask your supervisor before you put weight on it.":
            "ကွန်ကရစ်က ဖြည်းဖြည်းချင်း မာလာသည်။ အပြည့်အဝခိုင်ရန် 28 ရက်ခန့်ကြာသည်။ အလေးမတင်ခင် ကြီးကြပ်သူကို မေးပါ။",
        "A building carries its weight down: from the floor to the beams, to the columns, then into the ground. Never cut a beam or a column without permission.":
            "အဆောက်အအုံအလေးချိန်က အောက်သို့ ဆင်းသည်: ကြမ်းခင်းမှ ရက်မများ၊ ထို့နောက် တိုင်များ၊ ပြီးမှ မြေကြီးသို့ ရောက်သည်။ ခွင့်မရှိဘဲ ရက်မ သို့မဟုတ် တိုင်ကို မဖြတ်ပါနှင့်။",
        "Every scaffold has a weight limit. Too much weight can make it fall, so do not add more than you are told.":
            "ငြမ်းတိုင်းတွင် ခံနိုင်သောအလေးချိန် ကန့်သတ်ချက်ရှိသည်။ လေးလွန်းလျှင် ပြိုနိုင်သဖြင့် ပြောထားသည်ထက် ပိုမတင်ပါနှင့်။",
        "cement, sand, stones and water mixed; it goes hard":
            "ဘိလပ်မြေ၊ သဲ၊ ကျောက်နှင့် ရေကို ရောထားသည်; မာလာသည်",
        "the grey powder that holds concrete together":
            "ကွန်ကရစ်ကို ပေါင်းစည်းပေးသော မီးခိုးရောင်အမှုန့်",
        "a long metal rod inside concrete": "ကွန်ကရစ်ထဲရှိ ရှည်လျားသော သံမဏိချောင်း",
        "a strong part that goes across and holds up a floor":
            "အလျားလိုက်ရှိပြီး ကြမ်းခင်းကို ထောက်ထားသော ခိုင်သည့်အပိုင်း",
        "a strong part that stands up and carries the weight":
            "မတ်တတ်ရပ်ပြီး အလေးချိန်ကို ထမ်းသော ခိုင်သည့်အပိုင်း",
        "the weight something must carry": "အရာတစ်ခုက ထမ်းရမည့်အလေးချိန်",
        "a tool that shows if something is flat": "ညီမညီပြသောကိရိယာ",
        "a metal frame you stand on to work up high":
            "အမြင့်တွင် အလုပ်လုပ်ရန် တက်ရပ်သော သတ္တုဘောင်",
        "Warning that the concrete is not hard yet.": "ကွန်ကရစ်မမာသေးကြောင်း သတိပေးခြင်း။",
        "Saying that something weighs too much.": "ပစ္စည်းတစ်ခု လေးလွန်းကြောင်း ပြောခြင်း။",
        "Telling someone to stop adding water to the mix.": "အရောထဲ ရေထပ်မထည့်ရန် ပြောခြင်း။",
        "Reporting a crack to your supervisor.": "အက်ကွဲရာကို ကြီးကြပ်သူထံ တင်ပြခြင်း။",
        "Asking someone to make sure the scaffold is safe.":
            "ငြမ်းလုံခြုံမှု ရှိမရှိ စစ်ဆေးရန် တောင်းဆိုခြင်း။",
        "A worker is about to walk on the floor you poured this morning.":
            "ဒီမနက် သင်လောင်းထားသော ကြမ်းခင်းပေါ် အလုပ်သမားတစ်ယောက် လျှောက်တော့မည်။",
        "The worker asks if he can walk here.": "အလုပ်သမားက ဒီမှာ လျှောက်လို့ရသလား မေးသည်။",
        "Your co-worker is mixing concrete and keeps pouring in water.":
            "သင့်လုပ်ဖော်ကိုင်ဖက်က ကွန်ကရစ်ရောနေပြီး ရေကို ဆက်တိုက်လောင်းနေသည်။",
        "Your co-worker wants to add more water.": "သင့်လုပ်ဖော်ကိုင်ဖက်က ရေထပ်ထည့်ချင်သည်။",
        "There is a crack in this column.": "ဒီတိုင်မှာ အက်ကွဲရာရှိပါတယ်။",
    },
    fi: {
        'Signs and announcements say "alight". It means get off the train.':
            'Sinasabi ng mga karatula at anunsyo ang "alight". Ibig sabihin nito ay bumaba sa tren.',
        'Say "take away" to bring the food home. Some stalls charge a little more for the box.':
            'Sabihin ang "take away" para iuwi ang pagkain. May ilang puwesto na nagdadagdag ng kaunti para sa kahon.',
        'A tissue packet on a table means someone has taken that seat. People call this "chope".':
            'Ang tissue packet sa mesa ay ibig sabihin may kumuha na ng upuang iyon. Tinatawag itong "chope".',
        "A meal at a hawker centre or coffee shop usually costs 4 to 7 dollars. Most stalls take cash, and many take PayNow.":
            "Ang isang pagkain sa hawker centre o coffee shop ay karaniwang 4 hanggang 7 dolyar. Karamihan sa mga puwesto ay tumatanggap ng cash, at marami ang tumatanggap ng PayNow.",
        "A quick practice with words from every lesson. New every day.":
            "Mabilis na pagsasanay gamit ang mga salita sa bawat aralin. Bago araw-araw.",
        "After eating, return your tray and plates to the tray return point. It is the rule, and there can be a fine.":
            "Pagkatapos kumain, ibalik ang tray at mga plato sa tray return point. Ito ang patakaran, at maaaring may multa.",
        "Ask the doctor for an MC. Give it to your employer so your sick day is counted as sick leave.":
            "Humingi ng MC sa doktor. Ibigay ito sa iyong employer para mabilang na sick leave ang araw na may sakit ka.",
        "Ask your supervisor to say it again, say when something is not safe, and ask for a day off.":
            "Hilingin sa supervisor na ulitin, sabihin kapag hindi ligtas, at humingi ng isang araw na pahinga.",
        "Asking for a day with no work.": "Paghingi ng isang araw na walang trabaho.",
        "Asking for less chilli.": "Paghiling ng mas kaunting sili.",
        "Asking how often to take the medicine.":
            "Pagtatanong kung gaano kadalas inumin ang gamot.",
        "Asking people to let you off the train.": "Pakikiusap na padaanin ka pababa ng tren.",
        "Asking someone to repeat what they said.": "Pakikiusap na ulitin ang sinabi.",
        "Asking the doctor for a sick-leave paper.":
            "Paghingi sa doktor ng papel para sa sick leave.",
        "Asking the price.": "Pagtatanong ng presyo.",
        "Asking to add ten dollars to your card.":
            "Paghiling na lagyan ng sampung dolyar ang iyong card.",
        "Asking which platform goes to Jurong East.":
            "Pagtatanong kung aling platform ang papunta sa Jurong East.",
        "At a hawker centre, you order at the stall, pay, and carry the food to a table yourself.":
            "Sa hawker centre, umoorder ka sa puwesto, nagbabayad, at ikaw mismo ang nagdadala ng pagkain sa mesa.",
        "At work": "Sa trabaho",
        "Buying food": "Pagbili ng pagkain",
        "Daily mix": "Araw-araw na halo",
        "Fill in the missing word": "Punan ang nawawalang salita",
        "Find the right platform, top up your card, and get off at the right stop.":
            "Hanapin ang tamang platform, lagyan ng pera ang iyong card, at bumaba sa tamang hintuan.",
        "How many times a day?": "Ilang beses sa isang araw?",
        "How much?": "Magkano?",
        "If work is not safe, tell your supervisor. You can say no to unsafe work. You can also call MOM at 6438 5122.":
            "Kung hindi ligtas ang trabaho, sabihin sa supervisor. Puwede kang tumanggi sa hindi ligtas na trabaho. Puwede mo ring tawagan ang MOM sa 6438 5122.",
        "If you are hurt at work, tell your supervisor the same day and see a doctor. Keep the MC and every receipt.":
            "Kung nasaktan ka sa trabaho, sabihin sa supervisor sa araw ding iyon at magpatingin sa doktor. Itago ang MC at bawat resibo.",
        "If you are sick, go to a clinic near your dormitory or a polyclinic. In an emergency, call 995 for an ambulance.":
            "Kung may sakit ka, pumunta sa klinika malapit sa dormitoryo o sa polyclinic. Sa emergency, tumawag sa 995 para sa ambulansya.",
        "If your employer does not let you see a doctor, call MOM at 6438 5122 or the Migrant Workers' Centre at 6536 2692.":
            "Kung hindi ka pinapayagan ng employer na magpatingin sa doktor, tawagan ang MOM sa 6438 5122 o ang Migrant Workers' Centre sa 6536 2692.",
        "In an emergency, call 995 for an ambulance.":
            "Sa emergency, tumawag sa 995 para sa ambulansya.",
        "It is your turn at the chicken rice stall.":
            "Ikaw na ang susunod sa puwesto ng chicken rice.",
        "Listen. Tap what you hear": "Makinig. I-tap ang narinig mo",
        "Listen. What does it mean?": "Makinig. Ano ang ibig sabihin nito?",
        "My salary is late.": "Late ang sahod ko.",
        "Order at a food stall, ask the price, and say how you want it.":
            "Umorder sa puwesto ng pagkain, itanong ang presyo, at sabihin kung paano mo ito gusto.",
        "Ordering a drink without ice.": "Pag-order ng inumin na walang yelo.",
        "Ordering one chicken rice to bring home.": "Pag-order ng isang chicken rice na iuuwi.",
        "Pointing to where it hurts.": "Pagturo kung saan masakit.",
        "Put the words in order": "Ayusin ang mga salita",
        "Say this in English": "Sabihin ito sa Ingles",
        "Say what is wrong, ask for an MC, and understand how to take your medicine.":
            "Sabihin ang nararamdaman mo, humingi ng MC, at unawain kung paano inumin ang gamot.",
        "Saying thank you to an older man.": "Pagpapasalamat sa mas matandang lalaki.",
        "Saying thank you.": "Pagpapasalamat.",
        "Saying that something is not safe.": "Pagsasabing hindi ligtas ang isang bagay.",
        "Saying that you are injured.": "Pagsasabing nasugatan ka.",
        "Saying you want the food in a box, not on a plate.":
            "Pagsasabing gusto mo ang pagkain sa kahon, hindi sa plato.",
        "Saying your pay has not come on time.": "Pagsasabing hindi dumating sa oras ang sahod mo.",
        "Seats in a different colour are reserved seats. Give them to old people, pregnant women, and anyone who is hurt.":
            "Ang mga upuang may ibang kulay ay reserved seats. Ibigay ang mga ito sa matatanda, buntis, at sinumang nasaktan.",
        "Seeing a doctor": "Pagpunta sa doktor",
        "Stand on the left side of the escalator so people can walk past on the right.":
            "Tumayo sa kaliwang bahagi ng escalator para makadaan ang mga tao sa kanan.",
        "Take medicine the way the doctor says: how many times a day, and before or after food.":
            "Inumin ang gamot ayon sa sinabi ng doktor: ilang beses sa isang araw, at bago o pagkatapos kumain.",
        "Taking the MRT": "Pagsakay sa MRT",
        "Tap the pairs": "I-tap ang magkapares",
        "Tap your card at the gate when you go in and again when you go out. If you forget to tap out, you pay the highest fare.":
            "I-tap ang card sa gate pagpasok at muli paglabas. Kung makalimutan mong mag-tap out, babayaran mo ang pinakamataas na pamasahe.",
        "Telling staff your card is not working at the gate.":
            "Pagsasabi sa staff na hindi gumagana ang card mo sa gate.",
        "Telling the doctor your body is hot.": "Pagsasabi sa doktor na mainit ang katawan mo.",
        "The doctor asks what is wrong.": "Tinatanong ng doktor kung ano ang problema.",
        "The doctor asks where it hurts.": "Tinatanong ng doktor kung saan masakit.",
        "The doctor wants to know where it hurts.": "Gustong malaman ng doktor kung saan masakit.",
        "The seller asks for your order.": "Tinatanong ng nagtitinda ang order mo.",
        "The seller asks if you will eat here or bring it home.":
            "Tinatanong ng nagtitinda kung kakain ka rito o iuuwi mo.",
        "The staff member asks if you need help.":
            "Tinatanong ng staff kung kailangan mo ng tulong.",
        "The supervisor asks what happened.": "Tinatanong ng supervisor kung ano ang nangyari.",
        "The supervisor gives a long instruction.":
            "Nagbibigay ang supervisor ng mahabang tagubilin.",
        "Top up your card for free at the machine inside the station. 7-Eleven and Cheers shops also top up, but they charge a small fee each time.":
            "Mag-top up ng card nang libre sa makina sa loob ng istasyon. Nagta-top up din ang 7-Eleven at Cheers, pero may maliit na bayad sa bawat beses.",
        "Use the same card or phone both times. If you tap in with your card and out with your phone, the trip will not match.":
            "Gamitin ang parehong card o telepono sa dalawang beses. Kung card ang ginamit mo sa pagpasok at telepono sa paglabas, hindi magtutugma ang biyahe.",
        "Wear your helmet, safety boots and vest on the worksite. Your employer must give them to you for free.":
            "Magsuot ng helmet, safety boots at vest sa worksite. Dapat ibigay ng employer ang mga ito nang libre.",
        "What do you say?": "Ano ang sasabihin mo?",
        "What is this called?": "Ano ang tawag dito?",
        "Which one is this?": "Alin dito?",
        "Which platform for Jurong East?": "Aling platform papuntang Jurong East?",
        "You are at a food stall. You want to eat at home.":
            "Nasa puwesto ka ng pagkain. Gusto mong kumain sa bahay.",
        "You are in the doctor's room.": "Nasa kuwarto ka ng doktor.",
        "You fell and your arm is bleeding. Your supervisor runs over.":
            "Nahulog ka at dumudugo ang braso mo. Tumakbo papunta sa iyo ang supervisor.",
        "Your card does not work at the gate. A staff member comes over.":
            "Hindi gumagana ang card mo sa gate. Lumapit ang isang staff.",
        "Your employer must pay for your medical care. Keep every receipt.":
            "Dapat bayaran ng employer ang iyong pagpapagamot. Itago ang bawat resibo.",
        "Your salary must be paid within 7 days after the end of the month. If it is late, call MOM.":
            "Dapat mabayaran ang sahod mo sa loob ng 7 araw pagkatapos ng buwan. Kung late, tawagan ang MOM.",
        "Your supervisor speaks very fast. You did not understand.":
            "Napakabilis magsalita ng supervisor mo. Hindi mo naintindihan.",
        "a day off from work": "isang araw na walang pasok",
        "a day with no work": "isang araw na walang trabaho",
        "a fixed time to see the doctor": "nakatakdang oras para magpatingin sa doktor",
        "a paper from the doctor that says you are sick":
            "papel mula sa doktor na nagsasabing may sakit ka",
        "a seat for old, pregnant or hurt people": "upuan para sa matatanda, buntis o nasaktan",
        "a short rest from work": "maikling pahinga sa trabaho",
        "a small place where a doctor sees you":
            "maliit na lugar kung saan ka tinitingnan ng doktor",
        "a smaller amount": "mas kaunti",
        "a station where you change to another line":
            "istasyon kung saan ka lumilipat sa ibang linya",
        "add money to your card": "maglagay ng pera sa card",
        "bring the food home in a box": "iuwi ang pagkain sa kahon",
        "change to another train line": "lumipat sa ibang linya ng tren",
        "eat here, at a table": "kumain dito, sa mesa",
        "get off the train": "bumaba sa tren",
        "hot, with chilli": "maanghang, may sili",
        "it hurts": "masakit",
        "not safe; you can get hurt": "hindi ligtas; puwede kang masaktan",
        "one more time": "isa pang beses",
        "one small shop inside a hawker centre":
            "isang maliit na tindahan sa loob ng hawker centre",
        "paper money and coins": "perang papel at barya",
        "rice with chicken, a common Singapore meal":
            "kanin na may manok, karaniwang pagkain sa Singapore",
        "something to drink, like tea or juice": "inumin, tulad ng tsaa o juice",
        "stay home and sleep": "manatili sa bahay at matulog",
        "strong shoes for work": "matibay na sapatos para sa trabaho",
        "the boss at your worksite": "ang boss sa worksite mo",
        "the money you get for your work": "ang perang natatanggap mo sa trabaho",
        "the money you pay for the trip": "ang perang binabayad mo sa biyahe",
        "the way out of the station": "ang labasan ng istasyon",
        "touch your card at the gate when you leave": "i-tap ang card sa gate paglabas",
        "wait for the next train": "hintayin ang susunod na tren",
        "what is the price": "magkano ang presyo",
        "what you take to get better": "ang iniinom mo para gumaling",
        "when air comes out of your mouth with a loud sound":
            "kapag lumabas ang hangin sa bibig mo nang may malakas na tunog",
        "where you wait for the train": "kung saan ka naghihintay ng tren",
        "your body is injured": "nasugatan ang katawan mo",
        "your body is very hot": "napakainit ng katawan mo",
        // AI Words (workshop lesson)
        "AI Words": "Mga Salita Tungkol sa AI",
        "Know the key words people use when they talk about AI.":
            "Alamin ang mahahalagang salita na ginagamit ng mga tao kapag pinag-uusapan ang AI.",
        "computer programs that can do tasks that usually need a human mind":
            "mga computer program na kayang gawin ang mga gawaing karaniwang kailangan ng isip ng tao",
        "how an AI gets better by learning patterns from lots of examples":
            "kung paano humuhusay ang AI sa pag-aaral ng mga pattern mula sa maraming halimbawa",
        "the examples (text, photos, recordings) an AI learns from":
            "ang mga halimbawang pinag-aaralan ng AI (teksto, litrato, recording)",
        "an AI you have a conversation with by typing, like ChatGPT or Gemini":
            "AI na kausap mo sa pamamagitan ng pag-type, tulad ng ChatGPT o Gemini",
        "the question or instruction you type or say to an AI":
            "ang tanong o tagubilin na tina-type o sinasabi mo sa AI",
        "AI that creates new things: text, pictures, music or video":
            "AI na gumagawa ng mga bagong bagay: teksto, larawan, musika o video",
        "an AI that listens to your voice and answers out loud, like Siri":
            "AI na nakikinig sa boses mo at sumasagot nang pasalita, tulad ng Siri",
        "AI that can tell what is in a photo": "AI na kayang malaman kung ano ang nasa litrato",
        "when an AI confidently gives an answer that is made up or wrong":
            "kapag buong tiwalang nagbibigay ang AI ng sagot na gawa-gawa o mali",
        "Saying the AI gave a confident answer that was false.":
            "Pagsasabing buong tiwalang nagbigay ang AI ng maling sagot.",
        "Suggesting a more detailed question to get a better answer.":
            "Pagmumungkahi ng mas detalyadong tanong para makakuha ng mas magandang sagot.",
        "Which one is a chatbot?": "Alin ang chatbot?",
        "Which word fits?": "Aling salita ang angkop?",
        "Your friend has been using a chatbot and looks confused.":
            "Gumagamit ng chatbot ang kaibigan mo at mukhang nalilito siya.",
        "Your friend searched for the book and could not find it anywhere.":
            "Hinanap ng kaibigan mo ang libro pero hindi niya ito makita kahit saan.",
        "Saying it was an AI that answers out loud.": "Pagsasabing AI iyon na sumasagot nang pasalita.",
        "Saying it was the examples the AI learned from.": "Pagsasabing iyon ang mga halimbawang pinag-aralan ng AI.",
        "Your friend asked a chatbot to plan a trip.":
            "Hiniling ng kaibigan mo sa isang chatbot na magplano ng biyahe.",
        "The answer did not have enough detail to be useful.": "Kulang sa detalye ang sagot kaya hindi ito nakatulong.",
        "Suggesting they change what the AI learned from.": "Pagmumungkahing palitan ang pinag-aralan ng AI.",
        "Suggesting they use an AI that reads photos.": "Pagmumungkahing gumamit ng AI na nakakaintindi ng litrato.",
        "A chatbot answers whatever you type, and what you type is your prompt. Try the ideas below, or ask anything you like.":
            "Sinasagot ng chatbot ang anumang i-type mo, at ang tina-type mo ay ang iyong prompt. Subukan ang mga ideya sa ibaba, o itanong ang kahit ano.",
        "Say exactly what you want.": "Sabihin nang eksakto ang gusto mo.",
        "Give context: who it is for, and limits like time or budget.":
            "Magbigay ng konteksto: para kanino ito, at mga limitasyon tulad ng oras o budget.",
        "Say the format: a list, three sentences, a short message.":
            "Sabihin ang format: listahan, tatlong pangungusap, maikling mensahe.",
        "Not happy with the answer? Ask a follow-up to change it.":
            "Hindi ka kuntento sa sagot? Mag-follow-up para baguhin ito.",
        "Ask about an AI word": "Magtanong tungkol sa isang salitang pang-AI",
        "Pick any word from the lesson and ask the chatbot to explain it.":
            "Pumili ng kahit anong salita sa aralin at hilingin sa chatbot na ipaliwanag ito.",
        "Send a vague prompt": "Magpadala ng malabong prompt",
        "Send this short prompt and see what comes back.":
            "Ipadala ang maikling prompt na ito at tingnan kung ano ang isasagot.",
        "Now add the details": "Ngayon, idagdag ang mga detalye",
        "Same request with context, limits and a format. Compare the two answers.":
            "Parehong hiling na may konteksto, limitasyon at format. Ikumpara ang dalawang sagot.",
        "Make something new": "Gumawa ng bagong bagay",
        "That's generative AI: it writes something that did not exist before.":
            "Iyan ang generative AI: sumusulat ito ng bagay na wala pa noon.",
        "Ask a follow-up": "Magtanong ng follow-up",
        "Change the last answer without starting again.": "Baguhin ang huling sagot nang hindi nagsisimula ulit.",
        "Check for a hallucination": "Tingnan kung may hallucination",
        "Ask for facts, then ask if it is sure. Chatbots can sound confident and still be wrong.":
            "Magtanong ng impormasyon, saka itanong kung sigurado ito. Puwedeng mukhang sigurado ang mga chatbot pero mali pa rin.",
        "Getting to know someone": "Pagkilala sa bagong kakilala",
        "Say your name and where you are from, and ask new people about themselves.":
            "Sabihin ang pangalan mo at kung taga-saan ka. Tanungin din ang mga bagong kakilala tungkol sa kanila.",
        "People in Singapore often say \"Have you eaten?\" as a friendly hello. You can say \"Yes, thank you.\"":
            "Sa Singapore, madalas bumati ang mga tao ng \"Have you eaten?\" Maaari mong sagutin ng \"Yes, thank you.\"",
        "People may call an older woman \"Aunty\" and an older man \"Uncle\". It is polite, even if you are not family.":
            "Maaaring tawaging \"Aunty\" ang mas matandang babae at \"Uncle\" ang mas matandang lalaki. Magalang ito kahit hindi kayo magkamag-anak.",
        "You do not have to answer every question. If someone asks about your pay or your family and you do not want to say, you can smile and change the topic.":
            "Hindi mo kailangang sagutin ang lahat ng tanong. Kung ayaw mong sabihin ang tungkol sa sahod o pamilya mo, maaari kang ngumiti at mag-iba ng usapan.",
        "The best way to learn is to talk. Say hello to one new person on your day off.":
            "Pinakamahusay matuto sa pakikipag-usap. Bumati sa isang bagong kakilala sa araw ng pahinga mo.",
        "what people call you": "ang tawag sa iyo ng mga tao",
        "a place like India or Bangladesh": "isang lugar na tulad ng India o Bangladesh",
        "your parents, husband or wife, and children": "mga magulang, asawa, at mga anak mo",
        "young boys and girls; sons and daughters": "mga batang lalaki at babae; mga anak",
        "someone you like and spend time with": "isang taong gusto mo at madalas mong kasama",
        "the work you do for money": "ang ginagawa mo para kumita",
        "something you like to do in your free time":
            "isang bagay na gusto mong gawin sa libreng oras",
        "the day after Saturday; many workers rest":
            "ang araw pagkatapos ng Sabado; maraming manggagawa ang nagpapahinga",
        "Asking someone's name.": "Pagtatanong ng pangalan ng isang tao.",
        "Telling someone your name.": "Pagsasabi ng pangalan mo.",
        "Asking which country someone comes from.":
            "Pagtatanong kung saang bansa galing ang isang tao.",
        "Asking what work someone does.": "Pagtatanong kung ano ang trabaho ng isang tao.",
        "Saying you are happy to meet someone new.":
            "Pagsasabi na masaya kang makilala ang isang tao.",
        "Asking about someone's day off.": "Pagtatanong tungkol sa araw ng pahinga ng isang tao.",
        "You meet someone new at the park on your day off.":
            "May nakilala kang bago sa parke sa araw ng pahinga mo.",
        "The new person asks your name.": "Tinatanong ng bagong kakilala ang pangalan mo.",
        "Your friend brings a new person to meet you.":
            "May dinalang bagong kakilala ang kaibigan mo para ipakilala sa iyo.",
        "The new person tells you her name.":
            "Sinasabi ng bagong kakilalang babae ang pangalan niya.",
        "What is your job?": "Ano ang trabaho mo?",
        "Helping at home": "Pagtulong sa bahay",
        "Understand what to do at home, say what you have finished, and ask when you are not sure.":
            "Unawain ang gagawin sa bahay, sabihin ang natapos mo, at magtanong kapag hindi ka sigurado.",
        "Never lean out of a window to clean it or to hang clothes. If someone asks you to, say it is not safe.":
            "Huwag dumungaw palabas ng bintana para maglinis o magsampay. Kung may magpagawa nito, sabihin na hindi ito ligtas.",
        "Never throw anything out of a window. Put rubbish in the rubbish chute or the bin.":
            "Huwag magtapon ng kahit ano palabas ng bintana. Ilagay ang basura sa lagusan ng basura na may maliit na pintuang metal sa kusina o sa basurahan.",
        "Never mix bleach with other cleaning products. The gas can hurt you.":
            "Huwag ihalo ang pampaputi sa ibang panlinis. Maaaring makasama sa iyo ang gas na lalabas.",
        "If you do not know how to use a machine, ask first. It is better to ask than to break it.":
            "Kung hindi mo alam gamitin ang makina, magtanong muna. Mas mabuting magtanong kaysa makasira.",
        "clothes to wash": "mga damit na lalabhan",
        "a hot tool that makes clothes flat": "mainit na gamit na nagpapakinis ng damit",
        "a stick with cloth for washing the floor": "patpat na may tela para maglinis ng sahig",
        "plates and bowls you eat from": "mga plato at mangkok na ginagamit sa pagkain",
        "things you throw away": "mga bagay na itinatapon mo",
        "a cold box that keeps food fresh":
            "malamig na kahon na nagpapanatiling sariwa ang pagkain",
        "where you cook food with fire": "kung saan ka nagluluto gamit ang apoy",
        "a place with doors to keep things": "lagayan ng mga gamit na may mga pinto",
        "Asking what work comes after this.": "Pagtatanong kung anong trabaho ang susunod.",
        "Saying the laundry is done.": "Pagsasabi na tapos na ang paglalaba.",
        "Asking where something goes.": "Pagtatanong kung saan ilalagay ang isang bagay.",
        "Asking someone to show you the way to do it.":
            "Paghiling na ipakita kung paano ito gawin.",
        "Saying sorry and telling the truth about a broken plate.":
            "Paghingi ng tawad at pagsasabi ng totoo tungkol sa nabasag na plato.",
        "You finished washing the clothes. Your employer comes into the room.":
            "Tapos ka nang maglaba. Pumasok ang amo mo sa kuwarto.",
        "Your employer asks if the clothes are washed.":
            "Tinatanong ng amo mo kung nalabhan na ang mga damit.",
        "There is a new iron at home. You do not know how to use it.":
            "May bagong plantsa sa bahay. Hindi mo alam kung paano ito gamitin.",
        "Your employer asks you to iron the shirts.":
            "Pinapaplantsa sa iyo ng amo mo ang mga kamiseta.",
        "Sorry, I broke a plate.": "Pasensya na po, nakabasag ako ng plato.",
        "Reading signs": "Pagbasa ng mga karatula",
        "Read the signs you see every day, and ask when you do not understand one.":
            "Basahin ang mga karatulang nakikita araw-araw. Magtanong kapag hindi mo naiintindihan.",
        "Red signs usually mean stop or danger. Yellow means be careful. Green usually means safe, or the way out.":
            "Ang pulang karatula ay karaniwang nagsasabing huminto o may panganib. Ang dilaw ay mag-ingat. Ang berde ay karaniwang ligtas o daan palabas.",
        "You can be fined for smoking where it is not allowed. Many places have a yellow box that shows where you can smoke.":
            "Maaari kang pagmultahin kung maninigarilyo ka sa bawal na lugar. Maraming lugar ang may dilaw na kahon na guhit para ipakita kung saan puwedeng manigarilyo.",
        "Many signs in Singapore are in English, Chinese, Malay and Tamil. If your language is there, read it first, then look for the English word.":
            "Maraming karatula sa Singapore ang nasa Ingles, Tsino, Malay at Tamil. Kung naroon ang wika mo, basahin muna iyon, saka hanapin ang salitang Ingles.",
        "Not sure what a sign means? Take a photo and ask someone. Do not go past a danger sign.":
            "Hindi sigurado sa ibig sabihin ng karatula? Kunan ng litrato at magtanong. Huwag lumampas sa karatulang may babala ng panganib.",
        "the floor has water; you can slip": "may tubig sa sahig; maaari kang madulas",
        "do not go in": "huwag pumasok",
        "do not smoke here": "huwag manigarilyo rito",
        "not open now": "hindi bukas ngayon",
        "press the door away from you": "itulak ang pinto palayo sa iyo",
        "bring the door towards you": "hilahin ang pinto papunta sa iyo",
        "the room with a toilet, in a public place":
            "ang kuwartong may palikuran sa pampublikong lugar",
        "something here can hurt you": "may bagay dito na maaaring makasakit sa iyo",
        "Asking someone to explain a sign.": "Paghiling na ipaliwanag ang karatula.",
        "Telling someone to be careful of the wet floor.":
            "Pagsasabi na mag-ingat sa basang sahig.",
        "Asking the way to the toilet.": "Pagtatanong ng daan papunta sa palikuran.",
        "Saying a shop is not open.": "Pagsasabi na hindi bukas ang tindahan.",
        "Telling someone they are not allowed to enter.":
            "Pagsasabi na bawal pumasok ang isang tao.",
        "You are new in a building and you need the toilet. You see a cleaner.":
            "Bago ka sa gusali at kailangan mong gumamit ng palikuran. May nakita kang tagalinis.",
        "The cleaner asks if you need help.":
            "Tinatanong ng tagalinis kung kailangan mo ng tulong.",
        "Your friend is walking to a door with a red No Entry sign.":
            "Papunta ang kaibigan mo sa pintong may pulang karatulang No Entry.",
        "Your friend asks if they can go in.":
            "Tinatanong ng kaibigan mo kung puwede siyang pumasok.",
        "The shop is closed.": "Sarado ang tindahan.",
        "Buses and finding your way": "Mga bus at paghahanap ng daan",
        "Find the right bus, get off at your stop, and ask for directions when you are lost.":
            "Hanapin ang tamang bus, bumaba sa hintuan mo, at magtanong ng daan kapag naligaw.",
        "Tap your card when you get on the bus and again when you get off. If you forget to tap when you get off, you can pay more.":
            "Idikit ang kard mo sa pambasa pag-akyat sa bus at muli pagbaba. Kapag nakalimutan mo sa pagbaba, maaari kang magbayad nang mas mahal.",
        "Press the bell just before your stop. If nobody presses it and nobody is waiting, the bus does not stop.":
            "Pindutin ang kampanilya bago dumating sa hintuan mo. Kung walang pumindot at walang naghihintay, hindi hihinto ang bus.",
        "Raise your hand when your bus comes, so the driver knows to stop.":
            "Itaas ang kamay kapag dumating ang bus mo para malaman ng drayber na dapat siyang huminto.",
        "Cross the road at a traffic light or an overhead bridge. You can be fined for crossing somewhere else nearby.":
            "Tumawid sa may ilaw-trapiko o sa tulay na tawiran sa ibabaw ng kalsada. Maaari kang pagmultahin kung tatawid sa ibang lugar sa malapit.",
        "where you wait for the bus": "kung saan ka naghihintay ng bus",
        "press it to ask the bus to stop": "pindutin ito para humiling na ihinto ang bus",
        "the side of your left hand": "ang panig ng kaliwang kamay mo",
        "the side of your right hand": "ang panig ng kanang kamay mo",
        "keep going ahead; do not turn": "dumiretso; huwag lumiko",
        "the lights that say stop or go": "mga ilaw na nagsasabi kung hihinto o tutuloy",
        "a bridge for walking over a road": "tulay na lakaran sa ibabaw ng kalsada",
        "a picture that shows where places are": "larawang nagpapakita kung nasaan ang mga lugar",
        "Asking which bus to take.": "Pagtatanong kung aling bus ang sasakyan.",
        "Asking the way to the bus stop.": "Pagtatanong ng daan papunta sa hintuan ng bus.",
        "Telling someone the way.": "Pagtuturo ng daan sa isang tao.",
        "Saying you do not know where you are.": "Pagsasabi na hindi mo alam kung nasaan ka.",
        "Asking someone to tell you when to get off.":
            "Paghiling na sabihan ka kung kailan bababa.",
        "You are at a bus stop and want to go to Little India. A woman is waiting next to you.":
            "Nasa hintuan ka ng bus at gusto mong pumunta sa Little India. May babaeng naghihintay sa tabi mo.",
        "The woman asks if you are waiting for a bus.":
            "Tinatanong ng babae kung naghihintay ka ng bus.",
        "You do not know this road and your phone has no battery. You see a man walking.":
            "Hindi mo alam ang kalsadang ito at ubos ang baterya ng telepono mo. May nakita kang lalaking naglalakad.",
        "The man asks if he can help you.": "Tinatanong ng lalaki kung maaari ka niyang tulungan.",
        "Please tell me my stop.": "Pakisabi po kapag nasa hintuan ko na.",
        "At the supermarket": "Sa supermarket",
        "Find what you need, check the price and the date, and pay at the counter.":
            "Hanapin ang kailangan mo, tingnan ang presyo at petsa, at magbayad sa kahera.",
        "Big supermarkets charge at least 5 cents for each plastic bag. Bring your own bag to save money.":
            "Naniningil ang malalaking supermarket ng hindi bababa sa 5 sentimo bawat plastik na supot. Magdala ng sariling bag para makatipid.",
        "Look for the date on food before you buy it. \"Best before\" and \"Use by\" tell you how long it is good.":
            "Tingnan ang petsa sa pagkain bago bilhin. Sinasabi ng \"Best before\" at \"Use by\" kung hanggang kailan ito mabuti.",
        "Keep the receipt when you shop for someone else, so you can show what you spent.":
            "Itago ang resibo kapag namimili para sa ibang tao para maipakita mo ang ginastos.",
        "The cashier may ask if you have a member card. If you do not have one, just say no.":
            "Maaaring itanong ng kahera kung may kard ka bilang miyembro. Kung wala, sabihin lang na wala.",
        "a big basket on wheels": "malaking basket na may gulong",
        "the walkway between shelves": "ang daanan sa pagitan ng mga estante",
        "the person you pay": "ang taong binabayaran mo",
        "the paper that shows what you paid": "ang papel na nagpapakita ng binayaran mo",
        "a lower price than usual": "mas mababang presyo kaysa karaniwan",
        "the last day the food is good": "ang huling araw na mabuti pa ang pagkain",
        "a thin bag to carry your shopping": "manipis na supot para dalhin ang mga pinamili",
        "plants you cook and eat, like carrots":
            "mga halamang niluluto at kinakain, tulad ng karot",
        "Asking where to find something.": "Pagtatanong kung saan makikita ang isang bagay.",
        "Asking if the price is lower today.": "Pagtatanong kung mas mababa ang presyo ngayon.",
        "Asking the cashier for a bag.": "Paghingi ng supot sa kahera.",
        "Asking the cashier for the receipt.": "Paghingi ng resibo sa kahera.",
        "Telling staff that the food is past its date.":
            "Pagsasabi sa kawani na lampas na sa petsa ang pagkain.",
        "You are paying at the counter. You do not have your own bag.":
            "Nagbabayad ka sa kahera. Wala kang sariling bag.",
        "The cashier tells you the price.": "Sinasabi ng kahera ang presyo.",
        "The milk in your basket is past its date. You show it to a staff member.":
            "Lampas na sa petsa ang gatas sa basket mo. Ipinapakita mo ito sa isang kawani.",
        "A staff member asks if they can help you.":
            "Tinatanong ng isang kawani kung matutulungan ka niya.",
        "Is this on discount?": "May diskuwento ba ito?",
        "Construction science": "Agham sa pagtatayo",
        "Learn the main building materials, why a building stays up, and how to warn others about a problem.":
            "Alamin ang mga pangunahing materyales, kung bakit nakatayo ang gusali, at kung paano magbabala kapag may problema.",
        "Concrete is strong when it is pressed, but it cracks when it is pulled. That is why steel bars go inside it.":
            "Matibay ang kongkreto kapag dinidiinan, pero nabibitak kapag hinihila. Kaya nilalagyan ito ng mga bakal sa loob.",
        "Too much water makes concrete weak. Use only the amount of water your supervisor tells you.":
            "Humihina ang kongkreto kapag sobra ang tubig. Gamitin lang ang dami ng tubig na sinabi ng supervisor mo.",
        "Concrete goes hard slowly. It takes about 28 days to reach full strength, so ask your supervisor before you put weight on it.":
            "Dahan-dahang tumitigas ang kongkreto. Mga 28 araw bago ito lubos na tumibay. Magtanong sa supervisor bago magpatong ng bigat.",
        "A building carries its weight down: from the floor to the beams, to the columns, then into the ground. Never cut a beam or a column without permission.":
            "Pababa ang bigat ng gusali: mula sa sahig patungo sa mga biga, sa mga haligi, at sa lupa. Huwag putulin ang biga o haligi nang walang pahintulot.",
        "Every scaffold has a weight limit. Too much weight can make it fall, so do not add more than you are told.":
            "May hangganan ang bigat na kaya ng bawat andamyo. Maaari itong bumagsak kapag sobra. Huwag lumampas sa bigat na sinabi sa iyo.",
        "cement, sand, stones and water mixed; it goes hard":
            "pinaghalong semento, buhangin, bato at tubig; tumitigas ito",
        "the grey powder that holds concrete together": "abong pulbos na nagdidikit sa kongkreto",
        "a long metal rod inside concrete": "mahabang bakal sa loob ng kongkreto",
        "a strong part that goes across and holds up a floor":
            "matibay na bahaging pahalang at sumusuporta sa sahig",
        "a strong part that stands up and carries the weight":
            "matibay na bahaging patayo at nagdadala ng bigat",
        "the weight something must carry": "ang bigat na kailangang dalhin ng isang bagay",
        "a tool that shows if something is flat":
            "kasangkapang nagpapakita kung pantay ang isang bagay",
        "a metal frame you stand on to work up high":
            "balangkas na metal na tinatayuan para magtrabaho sa mataas",
        "Warning that the concrete is not hard yet.":
            "Pagbabala na hindi pa matigas ang kongkreto.",
        "Saying that something weighs too much.": "Pagsasabi na masyadong mabigat ang isang bagay.",
        "Telling someone to stop adding water to the mix.":
            "Pagsasabi na huwag nang magdagdag ng tubig sa halo.",
        "Reporting a crack to your supervisor.": "Pagsasabi sa supervisor tungkol sa bitak.",
        "Asking someone to make sure the scaffold is safe.":
            "Paghiling na tiyaking ligtas ang andamyo.",
        "A worker is about to walk on the floor you poured this morning.":
            "May manggagawang lalakad sa sahig na binuhusan mo ng kongkreto kaninang umaga.",
        "The worker asks if he can walk here.":
            "Tinatanong ng manggagawa kung puwede siyang maglakad dito.",
        "Your co-worker is mixing concrete and keeps pouring in water.":
            "Naghahalo ng kongkreto ang katrabaho mo at tuloy-tuloy ang pagbuhos niya ng tubig.",
        "Your co-worker wants to add more water.": "Gustong magdagdag ng tubig ng katrabaho mo.",
        "There is a crack in this column.": "May bitak sa haliging ito.",
    },
    in: {
        'Signs and announcements say "alight". It means get off the train.':
            'Papan tanda dan pengumuman menyebut "alight". Artinya turun dari kereta.',
        'Say "take away" to bring the food home. Some stalls charge a little more for the box.':
            'Katakan "take away" untuk membawa pulang makanan. Beberapa warung mengenakan biaya sedikit lebih untuk kotaknya.',
        'A tissue packet on a table means someone has taken that seat. People call this "chope".':
            'Bungkus tisu di atas meja berarti seseorang sudah mengambil tempat duduk itu. Orang menyebutnya "chope".',
        "A meal at a hawker centre or coffee shop usually costs 4 to 7 dollars. Most stalls take cash, and many take PayNow.":
            "Makan di hawker centre atau kedai kopi biasanya 4 sampai 7 dolar. Kebanyakan warung menerima uang tunai, dan banyak yang menerima PayNow.",
        "A quick practice with words from every lesson. New every day.":
            "Latihan singkat dengan kata-kata dari setiap pelajaran. Baru setiap hari.",
        "After eating, return your tray and plates to the tray return point. It is the rule, and there can be a fine.":
            "Setelah makan, kembalikan nampan dan piring ke tempat pengembalian nampan. Ini aturannya, dan bisa ada denda.",
        "Ask the doctor for an MC. Give it to your employer so your sick day is counted as sick leave.":
            "Minta MC kepada dokter. Berikan kepada majikan Anda agar hari sakit Anda dihitung sebagai cuti sakit.",
        "Ask your supervisor to say it again, say when something is not safe, and ask for a day off.":
            "Minta supervisor mengulanginya, katakan jika sesuatu tidak aman, dan minta cuti sehari.",
        "Asking for a day with no work.": "Meminta satu hari tanpa kerja.",
        "Asking for less chilli.": "Meminta cabai lebih sedikit.",
        "Asking how often to take the medicine.": "Menanyakan seberapa sering minum obat.",
        "Asking people to let you off the train.":
            "Meminta orang memberi jalan agar Anda bisa turun dari kereta.",
        "Asking someone to repeat what they said.": "Meminta seseorang mengulangi ucapannya.",
        "Asking the doctor for a sick-leave paper.": "Meminta surat cuti sakit kepada dokter.",
        "Asking the price.": "Menanyakan harga.",
        "Asking to add ten dollars to your card.": "Meminta isi sepuluh dolar ke kartu Anda.",
        "Asking which platform goes to Jurong East.": "Menanyakan peron mana yang ke Jurong East.",
        "At a hawker centre, you order at the stall, pay, and carry the food to a table yourself.":
            "Di hawker centre, Anda memesan di warung, membayar, dan membawa sendiri makanan ke meja.",
        "At work": "Di tempat kerja",
        "Buying food": "Membeli makanan",
        "Daily mix": "Latihan campuran harian",
        "Fill in the missing word": "Isi kata yang hilang",
        "Find the right platform, top up your card, and get off at the right stop.":
            "Temukan peron yang tepat, isi saldo kartu, dan turun di halte yang tepat.",
        "How many times a day?": "Berapa kali sehari?",
        "How much?": "Berapa harganya?",
        "If work is not safe, tell your supervisor. You can say no to unsafe work. You can also call MOM at 6438 5122.":
            "Jika pekerjaan tidak aman, beri tahu supervisor Anda. Anda boleh menolak pekerjaan yang tidak aman. Anda juga bisa menelepon MOM di 6438 5122.",
        "If you are hurt at work, tell your supervisor the same day and see a doctor. Keep the MC and every receipt.":
            "Jika terluka saat bekerja, beri tahu supervisor pada hari yang sama dan periksa ke dokter. Simpan MC dan semua kuitansi.",
        "If you are sick, go to a clinic near your dormitory or a polyclinic. In an emergency, call 995 for an ambulance.":
            "Jika sakit, pergilah ke klinik dekat asrama atau ke poliklinik. Dalam keadaan darurat, telepon 995 untuk ambulans.",
        "If your employer does not let you see a doctor, call MOM at 6438 5122 or the Migrant Workers' Centre at 6536 2692.":
            "Jika majikan tidak mengizinkan Anda ke dokter, telepon MOM di 6438 5122 atau Migrant Workers' Centre di 6536 2692.",
        "In an emergency, call 995 for an ambulance.":
            "Dalam keadaan darurat, telepon 995 untuk ambulans.",
        "It is your turn at the chicken rice stall.": "Sekarang giliran Anda di warung nasi ayam.",
        "Listen. Tap what you hear": "Dengarkan. Ketuk yang Anda dengar",
        "Listen. What does it mean?": "Dengarkan. Apa artinya?",
        "My salary is late.": "Gaji saya terlambat.",
        "Order at a food stall, ask the price, and say how you want it.":
            "Pesan di warung makan, tanyakan harganya, dan katakan bagaimana Anda menginginkannya.",
        "Ordering a drink without ice.": "Memesan minuman tanpa es.",
        "Ordering one chicken rice to bring home.": "Memesan satu nasi ayam untuk dibawa pulang.",
        "Pointing to where it hurts.": "Menunjuk bagian yang sakit.",
        "Put the words in order": "Susun kata-katanya",
        "Say this in English": "Katakan ini dalam bahasa Inggris",
        "Say what is wrong, ask for an MC, and understand how to take your medicine.":
            "Jelaskan keluhan Anda, minta MC, dan pahami cara minum obat.",
        "Saying thank you to an older man.": "Mengucapkan terima kasih kepada pria yang lebih tua.",
        "Saying thank you.": "Mengucapkan terima kasih.",
        "Saying that something is not safe.": "Mengatakan bahwa sesuatu tidak aman.",
        "Saying that you are injured.": "Mengatakan bahwa Anda terluka.",
        "Saying you want the food in a box, not on a plate.":
            "Mengatakan Anda ingin makanan dalam kotak, bukan di piring.",
        "Saying your pay has not come on time.": "Mengatakan gaji Anda belum dibayar tepat waktu.",
        "Seats in a different colour are reserved seats. Give them to old people, pregnant women, and anyone who is hurt.":
            "Kursi dengan warna berbeda adalah kursi prioritas. Berikan kepada orang tua, ibu hamil, dan siapa pun yang terluka.",
        "Seeing a doctor": "Pergi ke dokter",
        "Stand on the left side of the escalator so people can walk past on the right.":
            "Berdirilah di sisi kiri eskalator agar orang bisa lewat di sebelah kanan.",
        "Take medicine the way the doctor says: how many times a day, and before or after food.":
            "Minum obat sesuai petunjuk dokter: berapa kali sehari, dan sebelum atau sesudah makan.",
        "Taking the MRT": "Naik MRT",
        "Tap the pairs": "Ketuk pasangannya",
        "Tap your card at the gate when you go in and again when you go out. If you forget to tap out, you pay the highest fare.":
            "Tempelkan kartu di gerbang saat masuk dan lagi saat keluar. Jika lupa tap saat keluar, Anda membayar tarif tertinggi.",
        "Telling staff your card is not working at the gate.":
            "Memberi tahu petugas bahwa kartu Anda tidak berfungsi di gerbang.",
        "Telling the doctor your body is hot.": "Memberi tahu dokter bahwa badan Anda panas.",
        "The doctor asks what is wrong.": "Dokter bertanya apa keluhannya.",
        "The doctor asks where it hurts.": "Dokter bertanya di mana yang sakit.",
        "The doctor wants to know where it hurts.": "Dokter ingin tahu di mana yang sakit.",
        "The seller asks for your order.": "Penjual menanyakan pesanan Anda.",
        "The seller asks if you will eat here or bring it home.":
            "Penjual bertanya apakah Anda makan di sini atau dibawa pulang.",
        "The staff member asks if you need help.": "Petugas bertanya apakah Anda perlu bantuan.",
        "The supervisor asks what happened.": "Supervisor bertanya apa yang terjadi.",
        "The supervisor gives a long instruction.": "Supervisor memberi instruksi yang panjang.",
        "Top up your card for free at the machine inside the station. 7-Eleven and Cheers shops also top up, but they charge a small fee each time.":
            "Isi ulang kartu gratis di mesin dalam stasiun. Toko 7-Eleven dan Cheers juga bisa isi ulang, tetapi ada biaya kecil setiap kali.",
        "Use the same card or phone both times. If you tap in with your card and out with your phone, the trip will not match.":
            "Gunakan kartu atau ponsel yang sama untuk masuk dan keluar. Jika masuk dengan kartu dan keluar dengan ponsel, perjalanan tidak akan cocok.",
        "Wear your helmet, safety boots and vest on the worksite. Your employer must give them to you for free.":
            "Pakai helm, sepatu pengaman, dan rompi di lokasi kerja. Majikan wajib memberikannya secara gratis.",
        "What do you say?": "Apa yang Anda katakan?",
        "What is this called?": "Apa nama benda ini?",
        "Which one is this?": "Yang mana ini?",
        "Which platform for Jurong East?": "Peron mana ke Jurong East?",
        "You are at a food stall. You want to eat at home.":
            "Anda di warung makan. Anda ingin makan di rumah.",
        "You are in the doctor's room.": "Anda berada di ruang dokter.",
        "You fell and your arm is bleeding. Your supervisor runs over.":
            "Anda jatuh dan lengan Anda berdarah. Supervisor berlari menghampiri.",
        "Your card does not work at the gate. A staff member comes over.":
            "Kartu Anda tidak berfungsi di gerbang. Seorang petugas datang.",
        "Your employer must pay for your medical care. Keep every receipt.":
            "Majikan wajib membayar biaya pengobatan Anda. Simpan semua kuitansi.",
        "Your salary must be paid within 7 days after the end of the month. If it is late, call MOM.":
            "Gaji Anda harus dibayar dalam 7 hari setelah akhir bulan. Jika terlambat, telepon MOM.",
        "Your supervisor speaks very fast. You did not understand.":
            "Supervisor Anda bicara sangat cepat. Anda tidak mengerti.",
        "a day off from work": "satu hari libur kerja",
        "a day with no work": "satu hari tanpa kerja",
        "a fixed time to see the doctor": "waktu yang ditentukan untuk bertemu dokter",
        "a paper from the doctor that says you are sick":
            "surat dari dokter yang menyatakan Anda sakit",
        "a seat for old, pregnant or hurt people":
            "kursi untuk orang tua, ibu hamil, atau orang yang terluka",
        "a short rest from work": "istirahat sebentar dari kerja",
        "a small place where a doctor sees you": "tempat kecil di mana dokter memeriksa Anda",
        "a smaller amount": "jumlah yang lebih sedikit",
        "a station where you change to another line": "stasiun tempat Anda pindah ke jalur lain",
        "add money to your card": "menambah uang ke kartu Anda",
        "bring the food home in a box": "membawa pulang makanan dalam kotak",
        "change to another train line": "pindah ke jalur kereta lain",
        "eat here, at a table": "makan di sini, di meja",
        "get off the train": "turun dari kereta",
        "hot, with chilli": "pedas, dengan cabai",
        "it hurts": "sakit",
        "not safe; you can get hurt": "tidak aman; Anda bisa terluka",
        "one more time": "sekali lagi",
        "one small shop inside a hawker centre": "satu warung kecil di dalam hawker centre",
        "paper money and coins": "uang kertas dan koin",
        "rice with chicken, a common Singapore meal": "nasi dengan ayam, makanan umum di Singapura",
        "something to drink, like tea or juice": "sesuatu untuk diminum, seperti teh atau jus",
        "stay home and sleep": "tinggal di rumah dan tidur",
        "strong shoes for work": "sepatu kuat untuk bekerja",
        "the boss at your worksite": "bos di tempat kerja Anda",
        "the money you get for your work": "uang yang Anda dapat dari bekerja",
        "the money you pay for the trip": "uang yang Anda bayar untuk perjalanan",
        "the way out of the station": "jalan keluar dari stasiun",
        "touch your card at the gate when you leave": "tempelkan kartu di gerbang saat keluar",
        "wait for the next train": "menunggu kereta berikutnya",
        "what is the price": "berapa harganya",
        "what you take to get better": "yang Anda minum agar sembuh",
        "when air comes out of your mouth with a loud sound":
            "saat udara keluar dari mulut dengan suara keras",
        "where you wait for the train": "tempat Anda menunggu kereta",
        "your body is injured": "tubuh Anda terluka",
        "your body is very hot": "badan Anda sangat panas",
        // AI Words (workshop lesson)
        "AI Words": "Istilah AI",
        "Know the key words people use when they talk about AI.":
            "Kenali kata-kata penting yang dipakai orang saat membicarakan AI.",
        "computer programs that can do tasks that usually need a human mind":
            "program komputer yang bisa melakukan tugas yang biasanya membutuhkan pikiran manusia",
        "how an AI gets better by learning patterns from lots of examples":
            "cara AI menjadi lebih baik dengan mempelajari pola dari banyak contoh",
        "the examples (text, photos, recordings) an AI learns from":
            "contoh-contoh (teks, foto, rekaman) yang dipelajari AI",
        "an AI you have a conversation with by typing, like ChatGPT or Gemini":
            "AI yang bisa Anda ajak bicara lewat ketikan, seperti ChatGPT atau Gemini",
        "the question or instruction you type or say to an AI":
            "pertanyaan atau instruksi yang Anda ketik atau ucapkan kepada AI",
        "AI that creates new things: text, pictures, music or video":
            "AI yang membuat hal-hal baru: teks, gambar, musik, atau video",
        "an AI that listens to your voice and answers out loud, like Siri":
            "AI yang mendengarkan suara Anda lalu menjawab dengan suara, seperti Siri",
        "AI that can tell what is in a photo": "AI yang bisa tahu apa yang ada di dalam foto",
        "when an AI confidently gives an answer that is made up or wrong":
            "saat AI dengan yakin memberi jawaban yang dikarang atau salah",
        "Saying the AI gave a confident answer that was false.":
            "Mengatakan bahwa AI dengan yakin memberi jawaban yang salah.",
        "Suggesting a more detailed question to get a better answer.":
            "Menyarankan pertanyaan yang lebih rinci agar mendapat jawaban yang lebih baik.",
        "Which one is a chatbot?": "Mana yang chatbot?",
        "Which word fits?": "Kata mana yang cocok?",
        "Your friend has been using a chatbot and looks confused.":
            "Teman Anda baru saja memakai chatbot dan terlihat bingung.",
        "Your friend searched for the book and could not find it anywhere.":
            "Teman Anda mencari buku itu dan tidak bisa menemukannya di mana pun.",
        "Saying it was an AI that answers out loud.": "Mengatakan bahwa itu AI yang menjawab dengan suara.",
        "Saying it was the examples the AI learned from.": "Mengatakan bahwa itu contoh-contoh yang dipelajari AI.",
        "Your friend asked a chatbot to plan a trip.": "Teman Anda meminta chatbot merencanakan perjalanan.",
        "The answer did not have enough detail to be useful.": "Jawabannya kurang rinci sehingga tidak berguna.",
        "Suggesting they change what the AI learned from.": "Menyarankan untuk mengganti apa yang dipelajari AI.",
        "Suggesting they use an AI that reads photos.": "Menyarankan untuk memakai AI yang bisa memahami foto.",
        "A chatbot answers whatever you type, and what you type is your prompt. Try the ideas below, or ask anything you like.":
            "Chatbot menjawab apa pun yang Anda ketik, dan yang Anda ketik itu adalah prompt Anda. Coba ide di bawah ini, atau tanyakan apa saja.",
        "Say exactly what you want.": "Katakan persis apa yang Anda inginkan.",
        "Give context: who it is for, and limits like time or budget.":
            "Beri konteks: untuk siapa, dan batasan seperti waktu atau anggaran.",
        "Say the format: a list, three sentences, a short message.":
            "Sebutkan formatnya: daftar, tiga kalimat, pesan singkat.",
        "Not happy with the answer? Ask a follow-up to change it.":
            "Kurang puas dengan jawabannya? Ajukan pertanyaan lanjutan untuk mengubahnya.",
        "Ask about an AI word": "Tanyakan satu istilah AI",
        "Pick any word from the lesson and ask the chatbot to explain it.":
            "Pilih kata apa saja dari pelajaran ini dan minta chatbot menjelaskannya.",
        "Send a vague prompt": "Kirim prompt yang kurang jelas",
        "Send this short prompt and see what comes back.": "Kirim prompt singkat ini dan lihat apa jawabannya.",
        "Now add the details": "Sekarang tambahkan detailnya",
        "Same request with context, limits and a format. Compare the two answers.":
            "Permintaan yang sama dengan konteks, batasan, dan format. Bandingkan kedua jawabannya.",
        "Make something new": "Buat sesuatu yang baru",
        "That's generative AI: it writes something that did not exist before.":
            "Itulah generative AI: ia menulis sesuatu yang sebelumnya tidak ada.",
        "Ask a follow-up": "Ajukan pertanyaan lanjutan",
        "Change the last answer without starting again.": "Ubah jawaban terakhir tanpa mulai dari awal.",
        "Check for a hallucination": "Periksa apakah ada hallucination",
        "Ask for facts, then ask if it is sure. Chatbots can sound confident and still be wrong.":
            "Minta fakta, lalu tanyakan apakah ia yakin. Chatbot bisa terdengar yakin tetapi tetap salah.",
        "Getting to know someone": "Berkenalan",
        "Say your name and where you are from, and ask new people about themselves.":
            "Sebutkan nama dan asal Anda. Tanyakan juga tentang orang yang baru Anda kenal.",
        "People in Singapore often say \"Have you eaten?\" as a friendly hello. You can say \"Yes, thank you.\"":
            "Orang di Singapura sering menyapa dengan \"Have you eaten?\" Anda bisa menjawab \"Yes, thank you.\"",
        "People may call an older woman \"Aunty\" and an older man \"Uncle\". It is polite, even if you are not family.":
            "Orang sering memanggil perempuan yang lebih tua \"Aunty\" dan laki-laki yang lebih tua \"Uncle\". Ini sopan, meski bukan keluarga.",
        "You do not have to answer every question. If someone asks about your pay or your family and you do not want to say, you can smile and change the topic.":
            "Anda tidak harus menjawab semua pertanyaan. Kalau tidak ingin bercerita tentang gaji atau keluarga, Anda bisa tersenyum dan mengganti topik.",
        "The best way to learn is to talk. Say hello to one new person on your day off.":
            "Cara terbaik untuk belajar adalah berbicara. Sapa satu orang baru pada hari libur Anda.",
        "what people call you": "sebutan orang untuk Anda",
        "a place like India or Bangladesh": "tempat seperti India atau Bangladesh",
        "your parents, husband or wife, and children":
            "orang tua, suami atau istri, dan anak-anak Anda",
        "young boys and girls; sons and daughters": "anak laki-laki dan perempuan",
        "someone you like and spend time with": "orang yang Anda sukai dan sering Anda temui",
        "the work you do for money": "pekerjaan yang Anda lakukan untuk mendapat uang",
        "something you like to do in your free time": "kegiatan yang Anda sukai saat waktu luang",
        "the day after Saturday; many workers rest":
            "hari setelah Sabtu; banyak pekerja beristirahat",
        "Asking someone's name.": "Menanyakan nama seseorang.",
        "Telling someone your name.": "Menyebutkan nama Anda.",
        "Asking which country someone comes from.":
            "Menanyakan dari negara mana seseorang berasal.",
        "Asking what work someone does.": "Menanyakan pekerjaan seseorang.",
        "Saying you are happy to meet someone new.": "Mengatakan Anda senang berkenalan.",
        "Asking about someone's day off.": "Menanyakan hari libur seseorang.",
        "You meet someone new at the park on your day off.":
            "Anda bertemu orang baru di taman pada hari libur.",
        "The new person asks your name.": "Orang yang baru Anda kenal menanyakan nama Anda.",
        "Your friend brings a new person to meet you.":
            "Teman Anda membawa orang baru untuk berkenalan dengan Anda.",
        "The new person tells you her name.": "Perempuan yang baru Anda kenal menyebutkan namanya.",
        "What is your job?": "Apa pekerjaan Anda?",
        "Helping at home": "Membantu di rumah",
        "Understand what to do at home, say what you have finished, and ask when you are not sure.":
            "Pahami tugas di rumah, katakan apa yang sudah selesai, dan bertanyalah jika belum yakin.",
        "Never lean out of a window to clean it or to hang clothes. If someone asks you to, say it is not safe.":
            "Jangan menjulurkan badan keluar jendela untuk membersihkan atau menjemur pakaian. Jika diminta, katakan itu tidak aman.",
        "Never throw anything out of a window. Put rubbish in the rubbish chute or the bin.":
            "Jangan membuang apa pun keluar jendela. Buang sampah lewat pintu logam kecil saluran sampah di dapur atau ke tempat sampah.",
        "Never mix bleach with other cleaning products. The gas can hurt you.":
            "Jangan campur pemutih dengan cairan pembersih lain. Gasnya bisa membahayakan Anda.",
        "If you do not know how to use a machine, ask first. It is better to ask than to break it.":
            "Jika belum tahu cara memakai mesin, tanyakan dulu. Lebih baik bertanya daripada merusaknya.",
        "clothes to wash": "pakaian yang perlu dicuci",
        "a hot tool that makes clothes flat": "alat panas untuk merapikan pakaian",
        "a stick with cloth for washing the floor": "tongkat dengan kain untuk mengepel lantai",
        "plates and bowls you eat from": "piring dan mangkuk untuk makan",
        "things you throw away": "barang yang Anda buang",
        "a cold box that keeps food fresh": "lemari dingin yang menjaga makanan tetap segar",
        "where you cook food with fire": "tempat memasak makanan dengan api",
        "a place with doors to keep things": "tempat berpintu untuk menyimpan barang",
        "Asking what work comes after this.": "Menanyakan tugas setelah ini.",
        "Saying the laundry is done.": "Mengatakan pakaian sudah selesai dicuci.",
        "Asking where something goes.": "Menanyakan tempat menaruh sesuatu.",
        "Asking someone to show you the way to do it.": "Meminta seseorang menunjukkan caranya.",
        "Saying sorry and telling the truth about a broken plate.":
            "Meminta maaf dan berkata jujur tentang piring yang pecah.",
        "You finished washing the clothes. Your employer comes into the room.":
            "Anda sudah selesai mencuci pakaian. Majikan masuk ke ruangan.",
        "Your employer asks if the clothes are washed.":
            "Majikan bertanya apakah pakaian sudah dicuci.",
        "There is a new iron at home. You do not know how to use it.":
            "Ada setrika baru di rumah. Anda belum tahu cara memakainya.",
        "Your employer asks you to iron the shirts.": "Majikan meminta Anda menyetrika kemeja.",
        "Sorry, I broke a plate.": "Maaf, saya memecahkan piring.",
        "Reading signs": "Membaca papan tanda",
        "Read the signs you see every day, and ask when you do not understand one.":
            "Baca papan tanda yang Anda lihat setiap hari. Tanyakan jika belum paham.",
        "Red signs usually mean stop or danger. Yellow means be careful. Green usually means safe, or the way out.":
            "Tanda merah biasanya berarti berhenti atau bahaya. Kuning berarti hati-hati. Hijau biasanya berarti aman atau jalan keluar.",
        "You can be fined for smoking where it is not allowed. Many places have a yellow box that shows where you can smoke.":
            "Anda bisa didenda jika merokok di tempat terlarang. Banyak tempat memakai garis kotak kuning untuk menunjukkan area merokok.",
        "Many signs in Singapore are in English, Chinese, Malay and Tamil. If your language is there, read it first, then look for the English word.":
            "Banyak papan tanda di Singapura memakai bahasa Inggris, Mandarin, Melayu dan Tamil. Jika bahasa Anda ada, baca dulu, lalu cari kata bahasa Inggrisnya.",
        "Not sure what a sign means? Take a photo and ask someone. Do not go past a danger sign.":
            "Belum paham arti papan tanda? Ambil foto dan tanyakan kepada seseorang. Jangan melewati tanda bahaya.",
        "the floor has water; you can slip": "lantainya basah; Anda bisa terpeleset",
        "do not go in": "jangan masuk",
        "do not smoke here": "jangan merokok di sini",
        "not open now": "sekarang tidak buka",
        "press the door away from you": "dorong pintu menjauh dari Anda",
        "bring the door towards you": "tarik pintu ke arah Anda",
        "the room with a toilet, in a public place": "ruangan dengan toilet di tempat umum",
        "something here can hurt you": "ada sesuatu di sini yang bisa melukai Anda",
        "Asking someone to explain a sign.": "Meminta seseorang menjelaskan papan tanda.",
        "Telling someone to be careful of the wet floor.":
            "Mengingatkan seseorang agar berhati-hati di lantai basah.",
        "Asking the way to the toilet.": "Menanyakan jalan ke toilet.",
        "Saying a shop is not open.": "Mengatakan toko tidak buka.",
        "Telling someone they are not allowed to enter.":
            "Memberi tahu seseorang bahwa ia tidak boleh masuk.",
        "You are new in a building and you need the toilet. You see a cleaner.":
            "Anda baru pertama kali ke gedung ini dan perlu ke toilet. Anda melihat petugas kebersihan.",
        "The cleaner asks if you need help.":
            "Petugas kebersihan bertanya apakah Anda perlu bantuan.",
        "Your friend is walking to a door with a red No Entry sign.":
            "Teman Anda berjalan ke pintu dengan tanda No Entry berwarna merah.",
        "Your friend asks if they can go in.": "Teman Anda bertanya apakah boleh masuk.",
        "The shop is closed.": "Toko tutup.",
        "Buses and finding your way": "Naik bus dan mencari jalan",
        "Find the right bus, get off at your stop, and ask for directions when you are lost.":
            "Cari bus yang benar, turun di halte tujuan, dan tanyakan arah jika tersesat.",
        "Tap your card when you get on the bus and again when you get off. If you forget to tap when you get off, you can pay more.":
            "Tempelkan kartu saat naik bus dan saat turun. Jika lupa saat turun, Anda bisa membayar lebih mahal.",
        "Press the bell just before your stop. If nobody presses it and nobody is waiting, the bus does not stop.":
            "Tekan bel sesaat sebelum halte tujuan. Jika tidak ada yang menekan bel dan tidak ada yang menunggu, bus tidak berhenti.",
        "Raise your hand when your bus comes, so the driver knows to stop.":
            "Angkat tangan saat bus Anda datang agar pengemudi tahu harus berhenti.",
        "Cross the road at a traffic light or an overhead bridge. You can be fined for crossing somewhere else nearby.":
            "Seberangi jalan di lampu lalu lintas atau jembatan penyeberangan. Anda bisa didenda jika menyeberang di tempat lain di dekatnya.",
        "where you wait for the bus": "tempat menunggu bus",
        "press it to ask the bus to stop": "tekan untuk meminta bus berhenti",
        "the side of your left hand": "sisi tangan kiri Anda",
        "the side of your right hand": "sisi tangan kanan Anda",
        "keep going ahead; do not turn": "terus maju; jangan belok",
        "the lights that say stop or go": "lampu yang menunjukkan kapan berhenti atau jalan",
        "a bridge for walking over a road": "jembatan untuk berjalan kaki melintasi jalan",
        "a picture that shows where places are": "gambar yang menunjukkan letak tempat",
        "Asking which bus to take.": "Menanyakan bus mana yang harus dinaiki.",
        "Asking the way to the bus stop.": "Menanyakan jalan ke halte bus.",
        "Telling someone the way.": "Memberi tahu arah jalan kepada seseorang.",
        "Saying you do not know where you are.":
            "Mengatakan Anda tidak tahu sedang berada di mana.",
        "Asking someone to tell you when to get off.":
            "Meminta seseorang memberi tahu kapan harus turun.",
        "You are at a bus stop and want to go to Little India. A woman is waiting next to you.":
            "Anda di halte bus dan ingin ke Little India. Seorang perempuan menunggu di sebelah Anda.",
        "The woman asks if you are waiting for a bus.":
            "Perempuan itu bertanya apakah Anda sedang menunggu bus.",
        "You do not know this road and your phone has no battery. You see a man walking.":
            "Anda tidak kenal jalan ini dan baterai ponsel habis. Anda melihat seorang laki-laki berjalan.",
        "The man asks if he can help you.": "Laki-laki itu bertanya apakah bisa membantu Anda.",
        "Please tell me my stop.": "Tolong beri tahu saat sampai di halte saya.",
        "At the supermarket": "Di supermarket",
        "Find what you need, check the price and the date, and pay at the counter.":
            "Cari yang Anda perlukan, periksa harga dan tanggalnya, lalu bayar di kasir.",
        "Big supermarkets charge at least 5 cents for each plastic bag. Bring your own bag to save money.":
            "Supermarket besar mengenakan biaya minimal 5 sen untuk setiap kantong plastik. Bawa tas sendiri agar hemat.",
        "Look for the date on food before you buy it. \"Best before\" and \"Use by\" tell you how long it is good.":
            "Periksa tanggal pada makanan sebelum membeli. \"Best before\" dan \"Use by\" menunjukkan sampai kapan makanan masih baik.",
        "Keep the receipt when you shop for someone else, so you can show what you spent.":
            "Simpan struk saat berbelanja untuk orang lain agar bisa menunjukkan pengeluaran Anda.",
        "The cashier may ask if you have a member card. If you do not have one, just say no.":
            "Kasir mungkin bertanya apakah Anda punya kartu anggota. Kalau tidak punya, bilang saja tidak.",
        "a big basket on wheels": "keranjang besar beroda",
        "the walkway between shelves": "jalan di antara rak",
        "the person you pay": "orang yang menerima pembayaran Anda",
        "the paper that shows what you paid": "kertas yang menunjukkan pembayaran Anda",
        "a lower price than usual": "harga lebih rendah dari biasanya",
        "the last day the food is good": "hari terakhir makanan masih baik",
        "a thin bag to carry your shopping": "kantong tipis untuk membawa belanjaan",
        "plants you cook and eat, like carrots": "tanaman yang dimasak dan dimakan, seperti wortel",
        "Asking where to find something.": "Menanyakan tempat mencari sesuatu.",
        "Asking if the price is lower today.": "Menanyakan apakah harganya lebih murah hari ini.",
        "Asking the cashier for a bag.": "Meminta kantong kepada kasir.",
        "Asking the cashier for the receipt.": "Meminta struk kepada kasir.",
        "Telling staff that the food is past its date.":
            "Memberi tahu petugas bahwa makanan sudah lewat tanggal kedaluwarsa.",
        "You are paying at the counter. You do not have your own bag.":
            "Anda sedang membayar di kasir. Anda tidak membawa tas sendiri.",
        "The cashier tells you the price.": "Kasir menyebutkan harganya.",
        "The milk in your basket is past its date. You show it to a staff member.":
            "Susu di keranjang Anda sudah kedaluwarsa. Anda menunjukkannya kepada petugas.",
        "A staff member asks if they can help you.":
            "Seorang petugas bertanya apakah bisa membantu Anda.",
        "Is this on discount?": "Apakah ini sedang diskon?",
        "Construction science": "Ilmu bangunan",
        "Learn the main building materials, why a building stays up, and how to warn others about a problem.":
            "Pelajari bahan bangunan utama, mengapa bangunan bisa berdiri, dan cara memperingatkan orang lain saat ada masalah.",
        "Concrete is strong when it is pressed, but it cracks when it is pulled. That is why steel bars go inside it.":
            "Beton kuat saat ditekan, tetapi retak saat ditarik. Karena itu, batang baja dipasang di dalamnya.",
        "Too much water makes concrete weak. Use only the amount of water your supervisor tells you.":
            "Terlalu banyak air membuat beton lemah. Gunakan air hanya sebanyak yang diperintahkan supervisor.",
        "Concrete goes hard slowly. It takes about 28 days to reach full strength, so ask your supervisor before you put weight on it.":
            "Beton mengeras perlahan. Butuh sekitar 28 hari untuk mencapai kekuatan penuh. Tanyakan kepada supervisor sebelum menaruh beban di atasnya.",
        "A building carries its weight down: from the floor to the beams, to the columns, then into the ground. Never cut a beam or a column without permission.":
            "Berat bangunan disalurkan ke bawah: dari lantai ke balok, ke kolom, lalu ke tanah. Jangan pernah memotong balok atau kolom tanpa izin.",
        "Every scaffold has a weight limit. Too much weight can make it fall, so do not add more than you are told.":
            "Setiap perancah punya batas beban. Beban berlebih bisa membuatnya roboh. Jangan menaruh beban melebihi yang diperintahkan.",
        "cement, sand, stones and water mixed; it goes hard":
            "campuran semen, pasir, batu dan air; akan mengeras",
        "the grey powder that holds concrete together": "bubuk abu-abu yang merekatkan beton",
        "a long metal rod inside concrete": "batang baja panjang di dalam beton",
        "a strong part that goes across and holds up a floor":
            "bagian kuat yang melintang dan menopang lantai",
        "a strong part that stands up and carries the weight":
            "bagian kuat yang berdiri tegak dan menahan beban",
        "the weight something must carry": "berat yang harus ditahan sesuatu",
        "a tool that shows if something is flat": "alat untuk melihat apakah permukaan sudah rata",
        "a metal frame you stand on to work up high":
            "rangka logam untuk berdiri saat bekerja di ketinggian",
        "Warning that the concrete is not hard yet.": "Memperingatkan bahwa beton belum keras.",
        "Saying that something weighs too much.": "Mengatakan sesuatu terlalu berat.",
        "Telling someone to stop adding water to the mix.":
            "Menyuruh seseorang berhenti menambahkan air ke campuran.",
        "Reporting a crack to your supervisor.": "Melaporkan retakan kepada supervisor.",
        "Asking someone to make sure the scaffold is safe.":
            "Meminta seseorang memastikan perancah aman.",
        "A worker is about to walk on the floor you poured this morning.":
            "Seorang pekerja akan berjalan di lantai yang Anda cor pagi ini.",
        "The worker asks if he can walk here.": "Pekerja bertanya apakah boleh berjalan di sini.",
        "Your co-worker is mixing concrete and keeps pouring in water.":
            "Rekan kerja Anda sedang mencampur beton dan terus menuangkan air.",
        "Your co-worker wants to add more water.": "Rekan kerja Anda ingin menambah air.",
        "There is a crack in this column.": "Ada retakan di kolom ini.",
    },
    ms: {
        'Signs and announcements say "alight". It means get off the train.':
            'Papan tanda dan pengumuman menyebut "alight". Maksudnya turun dari tren.',
        'Say "take away" to bring the food home. Some stalls charge a little more for the box.':
            'Sebut "take away" untuk membawa pulang makanan. Sesetengah gerai mengenakan sedikit bayaran tambahan untuk kotak.',
        'A tissue packet on a table means someone has taken that seat. People call this "chope".':
            'Paket tisu di atas meja bermaksud seseorang telah mengambil tempat duduk itu. Orang memanggilnya "chope".',
        "A meal at a hawker centre or coffee shop usually costs 4 to 7 dollars. Most stalls take cash, and many take PayNow.":
            "Makan di pusat penjaja atau kedai kopi biasanya 4 hingga 7 dolar. Kebanyakan gerai menerima wang tunai, dan ramai yang menerima PayNow.",
        "A quick practice with words from every lesson. New every day.":
            "Latihan ringkas dengan perkataan daripada setiap pelajaran. Baharu setiap hari.",
        "After eating, return your tray and plates to the tray return point. It is the rule, and there can be a fine.":
            "Selepas makan, pulangkan dulang dan pinggan ke tempat pemulangan dulang. Ini peraturannya, dan boleh dikenakan denda.",
        "Ask the doctor for an MC. Give it to your employer so your sick day is counted as sick leave.":
            "Minta MC daripada doktor. Berikan kepada majikan anda supaya hari sakit anda dikira sebagai cuti sakit.",
        "Ask your supervisor to say it again, say when something is not safe, and ask for a day off.":
            "Minta penyelia mengulanginya, beritahu apabila sesuatu tidak selamat, dan minta cuti sehari.",
        "Asking for a day with no work.": "Meminta satu hari tanpa kerja.",
        "Asking for less chilli.": "Meminta kurang cili.",
        "Asking how often to take the medicine.": "Bertanya berapa kerap perlu makan ubat.",
        "Asking people to let you off the train.":
            "Meminta orang memberi laluan untuk turun dari tren.",
        "Asking someone to repeat what they said.":
            "Meminta seseorang mengulangi apa yang dikatakan.",
        "Asking the doctor for a sick-leave paper.": "Meminta surat cuti sakit daripada doktor.",
        "Asking the price.": "Bertanya harga.",
        "Asking to add ten dollars to your card.":
            "Meminta tambah nilai sepuluh dolar ke kad anda.",
        "Asking which platform goes to Jurong East.": "Bertanya platform mana yang ke Jurong East.",
        "At a hawker centre, you order at the stall, pay, and carry the food to a table yourself.":
            "Di pusat penjaja, anda memesan di gerai, membayar, dan membawa sendiri makanan ke meja.",
        "At work": "Di tempat kerja",
        "Buying food": "Membeli makanan",
        "Daily mix": "Latihan campuran harian",
        "Fill in the missing word": "Isi perkataan yang hilang",
        "Find the right platform, top up your card, and get off at the right stop.":
            "Cari platform yang betul, tambah nilai kad anda, dan turun di hentian yang betul.",
        "How many times a day?": "Berapa kali sehari?",
        "How much?": "Berapa harganya?",
        "If work is not safe, tell your supervisor. You can say no to unsafe work. You can also call MOM at 6438 5122.":
            "Jika kerja tidak selamat, beritahu penyelia anda. Anda boleh menolak kerja yang tidak selamat. Anda juga boleh menghubungi MOM di 6438 5122.",
        "If you are hurt at work, tell your supervisor the same day and see a doctor. Keep the MC and every receipt.":
            "Jika cedera semasa bekerja, beritahu penyelia pada hari yang sama dan berjumpa doktor. Simpan MC dan setiap resit.",
        "If you are sick, go to a clinic near your dormitory or a polyclinic. In an emergency, call 995 for an ambulance.":
            "Jika sakit, pergi ke klinik berhampiran asrama atau poliklinik. Dalam kecemasan, hubungi 995 untuk ambulans.",
        "If your employer does not let you see a doctor, call MOM at 6438 5122 or the Migrant Workers' Centre at 6536 2692.":
            "Jika majikan tidak membenarkan anda berjumpa doktor, hubungi MOM di 6438 5122 atau Migrant Workers' Centre di 6536 2692.",
        "In an emergency, call 995 for an ambulance.":
            "Dalam kecemasan, hubungi 995 untuk ambulans.",
        "It is your turn at the chicken rice stall.": "Kini giliran anda di gerai nasi ayam.",
        "Listen. Tap what you hear": "Dengar. Ketik apa yang anda dengar",
        "Listen. What does it mean?": "Dengar. Apakah maksudnya?",
        "My salary is late.": "Gaji saya lewat.",
        "Order at a food stall, ask the price, and say how you want it.":
            "Pesan di gerai makanan, tanya harganya, dan beritahu cara yang anda mahukan.",
        "Ordering a drink without ice.": "Memesan minuman tanpa ais.",
        "Ordering one chicken rice to bring home.": "Memesan satu nasi ayam untuk dibawa pulang.",
        "Pointing to where it hurts.": "Menunjuk tempat yang sakit.",
        "Put the words in order": "Susun perkataan mengikut urutan",
        "Say this in English": "Katakan ini dalam Bahasa Inggeris",
        "Say what is wrong, ask for an MC, and understand how to take your medicine.":
            "Beritahu masalah anda, minta MC, dan fahami cara mengambil ubat.",
        "Saying thank you to an older man.":
            "Mengucapkan terima kasih kepada lelaki yang lebih tua.",
        "Saying thank you.": "Mengucapkan terima kasih.",
        "Saying that something is not safe.": "Mengatakan sesuatu tidak selamat.",
        "Saying that you are injured.": "Mengatakan anda cedera.",
        "Saying you want the food in a box, not on a plate.":
            "Mengatakan anda mahu makanan dalam kotak, bukan di pinggan.",
        "Saying your pay has not come on time.":
            "Mengatakan gaji anda tidak dibayar tepat pada masanya.",
        "Seats in a different colour are reserved seats. Give them to old people, pregnant women, and anyone who is hurt.":
            "Tempat duduk berwarna lain ialah tempat duduk khas. Berikan kepada orang tua, wanita hamil, dan sesiapa yang cedera.",
        "Seeing a doctor": "Berjumpa doktor",
        "Stand on the left side of the escalator so people can walk past on the right.":
            "Berdiri di sebelah kiri eskalator supaya orang boleh lalu di sebelah kanan.",
        "Take medicine the way the doctor says: how many times a day, and before or after food.":
            "Makan ubat seperti yang doktor katakan: berapa kali sehari, dan sebelum atau selepas makan.",
        "Taking the MRT": "Menaiki MRT",
        "Tap the pairs": "Ketik pasangannya",
        "Tap your card at the gate when you go in and again when you go out. If you forget to tap out, you pay the highest fare.":
            "Ketik kad anda di pintu pagar semasa masuk dan sekali lagi semasa keluar. Jika terlupa ketik keluar, anda membayar tambang tertinggi.",
        "Telling staff your card is not working at the gate.":
            "Memberitahu kakitangan kad anda tidak berfungsi di pintu pagar.",
        "Telling the doctor your body is hot.": "Memberitahu doktor badan anda panas.",
        "The doctor asks what is wrong.": "Doktor bertanya apa masalahnya.",
        "The doctor asks where it hurts.": "Doktor bertanya di mana yang sakit.",
        "The doctor wants to know where it hurts.": "Doktor mahu tahu di mana yang sakit.",
        "The seller asks for your order.": "Penjual bertanya pesanan anda.",
        "The seller asks if you will eat here or bring it home.":
            "Penjual bertanya sama ada anda makan di sini atau bawa pulang.",
        "The staff member asks if you need help.":
            "Kakitangan bertanya sama ada anda perlukan bantuan.",
        "The supervisor asks what happened.": "Penyelia bertanya apa yang berlaku.",
        "The supervisor gives a long instruction.": "Penyelia memberi arahan yang panjang.",
        "Top up your card for free at the machine inside the station. 7-Eleven and Cheers shops also top up, but they charge a small fee each time.":
            "Tambah nilai kad anda secara percuma di mesin dalam stesen. Kedai 7-Eleven dan Cheers juga boleh tambah nilai, tetapi mengenakan bayaran kecil setiap kali.",
        "Use the same card or phone both times. If you tap in with your card and out with your phone, the trip will not match.":
            "Gunakan kad atau telefon yang sama untuk kedua-dua kali. Jika masuk dengan kad dan keluar dengan telefon, perjalanan tidak akan sepadan.",
        "Wear your helmet, safety boots and vest on the worksite. Your employer must give them to you for free.":
            "Pakai topi keledar, but keselamatan dan ves di tapak kerja. Majikan anda mesti memberikannya secara percuma.",
        "What do you say?": "Apa yang anda katakan?",
        "What is this called?": "Apakah nama benda ini?",
        "Which one is this?": "Yang mana satu ini?",
        "Which platform for Jurong East?": "Platform mana untuk Jurong East?",
        "You are at a food stall. You want to eat at home.":
            "Anda di gerai makanan. Anda mahu makan di rumah.",
        "You are in the doctor's room.": "Anda berada di bilik doktor.",
        "You fell and your arm is bleeding. Your supervisor runs over.":
            "Anda jatuh dan lengan anda berdarah. Penyelia anda berlari datang.",
        "Your card does not work at the gate. A staff member comes over.":
            "Kad anda tidak berfungsi di pintu pagar. Seorang kakitangan datang.",
        "Your employer must pay for your medical care. Keep every receipt.":
            "Majikan anda mesti membayar rawatan perubatan anda. Simpan setiap resit.",
        "Your salary must be paid within 7 days after the end of the month. If it is late, call MOM.":
            "Gaji anda mesti dibayar dalam masa 7 hari selepas akhir bulan. Jika lewat, hubungi MOM.",
        "Your supervisor speaks very fast. You did not understand.":
            "Penyelia anda bercakap sangat laju. Anda tidak faham.",
        "a day off from work": "satu hari cuti daripada kerja",
        "a day with no work": "satu hari tanpa kerja",
        "a fixed time to see the doctor": "masa yang ditetapkan untuk berjumpa doktor",
        "a paper from the doctor that says you are sick":
            "surat daripada doktor yang menyatakan anda sakit",
        "a seat for old, pregnant or hurt people":
            "tempat duduk untuk orang tua, wanita hamil atau orang yang cedera",
        "a short rest from work": "rehat sebentar daripada kerja",
        "a small place where a doctor sees you": "tempat kecil di mana doktor memeriksa anda",
        "a smaller amount": "jumlah yang lebih kecil",
        "a station where you change to another line": "stesen tempat anda bertukar ke laluan lain",
        "add money to your card": "tambah wang ke kad anda",
        "bring the food home in a box": "bawa pulang makanan dalam kotak",
        "change to another train line": "bertukar ke laluan tren lain",
        "eat here, at a table": "makan di sini, di meja",
        "get off the train": "turun dari tren",
        "hot, with chilli": "pedas, dengan cili",
        "it hurts": "sakit",
        "not safe; you can get hurt": "tidak selamat; anda boleh cedera",
        "one more time": "sekali lagi",
        "one small shop inside a hawker centre": "satu kedai kecil di dalam pusat penjaja",
        "paper money and coins": "wang kertas dan syiling",
        "rice with chicken, a common Singapore meal":
            "nasi dengan ayam, makanan biasa di Singapura",
        "something to drink, like tea or juice": "sesuatu untuk diminum, seperti teh atau jus",
        "stay home and sleep": "tinggal di rumah dan tidur",
        "strong shoes for work": "kasut kukuh untuk kerja",
        "the boss at your worksite": "bos di tapak kerja anda",
        "the money you get for your work": "wang yang anda dapat untuk kerja anda",
        "the money you pay for the trip": "wang yang anda bayar untuk perjalanan",
        "the way out of the station": "jalan keluar dari stesen",
        "touch your card at the gate when you leave":
            "sentuh kad anda di pintu pagar semasa keluar",
        "wait for the next train": "tunggu tren seterusnya",
        "what is the price": "berapa harganya",
        "what you take to get better": "apa yang anda ambil untuk sembuh",
        "when air comes out of your mouth with a loud sound":
            "apabila udara keluar dari mulut dengan bunyi kuat",
        "where you wait for the train": "tempat anda menunggu tren",
        "your body is injured": "badan anda cedera",
        "your body is very hot": "badan anda sangat panas",
        // AI Words (workshop lesson)
        "AI Words": "Istilah AI",
        "Know the key words people use when they talk about AI.":
            "Kenali perkataan penting yang digunakan orang apabila bercakap tentang AI.",
        "computer programs that can do tasks that usually need a human mind":
            "program komputer yang boleh melakukan tugas yang biasanya memerlukan fikiran manusia",
        "how an AI gets better by learning patterns from lots of examples":
            "cara AI menjadi lebih baik dengan mempelajari corak daripada banyak contoh",
        "the examples (text, photos, recordings) an AI learns from":
            "contoh-contoh (teks, gambar, rakaman) yang dipelajari oleh AI",
        "an AI you have a conversation with by typing, like ChatGPT or Gemini":
            "AI yang anda boleh ajak berbual dengan menaip, seperti ChatGPT atau Gemini",
        "the question or instruction you type or say to an AI":
            "soalan atau arahan yang anda taip atau sebut kepada AI",
        "AI that creates new things: text, pictures, music or video":
            "AI yang mencipta benda baharu: teks, gambar, muzik atau video",
        "an AI that listens to your voice and answers out loud, like Siri":
            "AI yang mendengar suara anda dan menjawab dengan suara, seperti Siri",
        "AI that can tell what is in a photo": "AI yang boleh tahu apa yang ada dalam gambar",
        "when an AI confidently gives an answer that is made up or wrong":
            "apabila AI dengan yakin memberi jawapan yang direka-reka atau salah",
        "Saying the AI gave a confident answer that was false.":
            "Mengatakan AI dengan yakin memberi jawapan yang salah.",
        "Suggesting a more detailed question to get a better answer.":
            "Mencadangkan soalan yang lebih terperinci untuk mendapat jawapan yang lebih baik.",
        "Which one is a chatbot?": "Yang mana satu chatbot?",
        "Which word fits?": "Perkataan mana yang sesuai?",
        "Your friend has been using a chatbot and looks confused.":
            "Kawan anda baru menggunakan chatbot dan nampak keliru.",
        "Your friend searched for the book and could not find it anywhere.":
            "Kawan anda mencari buku itu dan tidak dapat menjumpainya di mana-mana.",
        "Saying it was an AI that answers out loud.": "Mengatakan itu AI yang menjawab dengan suara.",
        "Saying it was the examples the AI learned from.": "Mengatakan itu contoh-contoh yang dipelajari oleh AI.",
        "Your friend asked a chatbot to plan a trip.": "Kawan anda meminta chatbot merancang perjalanan.",
        "The answer did not have enough detail to be useful.": "Jawapan itu tidak cukup terperinci untuk berguna.",
        "Suggesting they change what the AI learned from.": "Mencadangkan supaya menukar apa yang dipelajari oleh AI.",
        "Suggesting they use an AI that reads photos.":
            "Mencadangkan supaya menggunakan AI yang boleh memahami gambar.",
        "A chatbot answers whatever you type, and what you type is your prompt. Try the ideas below, or ask anything you like.":
            "Chatbot menjawab apa sahaja yang anda taip, dan apa yang anda taip itulah prompt anda. Cuba idea di bawah, atau tanya apa sahaja.",
        "Say exactly what you want.": "Sebut dengan tepat apa yang anda mahu.",
        "Give context: who it is for, and limits like time or budget.":
            "Beri konteks: untuk siapa, dan had seperti masa atau bajet.",
        "Say the format: a list, three sentences, a short message.":
            "Sebut formatnya: senarai, tiga ayat, mesej pendek.",
        "Not happy with the answer? Ask a follow-up to change it.":
            "Tidak puas hati dengan jawapan? Tanya soalan susulan untuk mengubahnya.",
        "Ask about an AI word": "Tanya tentang satu istilah AI",
        "Pick any word from the lesson and ask the chatbot to explain it.":
            "Pilih mana-mana perkataan daripada pelajaran ini dan minta chatbot menerangkannya.",
        "Send a vague prompt": "Hantar prompt yang kabur",
        "Send this short prompt and see what comes back.": "Hantar prompt pendek ini dan lihat apa jawapannya.",
        "Now add the details": "Sekarang tambah butirannya",
        "Same request with context, limits and a format. Compare the two answers.":
            "Permintaan yang sama dengan konteks, had dan format. Bandingkan kedua-dua jawapan.",
        "Make something new": "Cipta sesuatu yang baharu",
        "That's generative AI: it writes something that did not exist before.":
            "Itulah generative AI: ia menulis sesuatu yang tidak pernah wujud sebelum ini.",
        "Ask a follow-up": "Tanya soalan susulan",
        "Change the last answer without starting again.": "Ubah jawapan terakhir tanpa bermula semula.",
        "Check for a hallucination": "Semak jika ada hallucination",
        "Ask for facts, then ask if it is sure. Chatbots can sound confident and still be wrong.":
            "Minta fakta, kemudian tanya sama ada ia pasti. Chatbot boleh kedengaran yakin tetapi masih salah.",
        "Getting to know someone": "Berkenalan dengan orang baharu",
        "Say your name and where you are from, and ask new people about themselves.":
            "Beritahu nama dan asal anda. Tanya orang yang baru dikenali tentang diri mereka.",
        "People in Singapore often say \"Have you eaten?\" as a friendly hello. You can say \"Yes, thank you.\"":
            "Orang di Singapura sering menyapa dengan \"Have you eaten?\" Anda boleh jawab \"Yes, thank you.\"",
        "People may call an older woman \"Aunty\" and an older man \"Uncle\". It is polite, even if you are not family.":
            "Orang mungkin memanggil wanita lebih tua \"Aunty\" dan lelaki lebih tua \"Uncle\". Ini sopan walaupun bukan ahli keluarga.",
        "You do not have to answer every question. If someone asks about your pay or your family and you do not want to say, you can smile and change the topic.":
            "Anda tidak perlu menjawab semua soalan. Jika tidak mahu bercerita tentang gaji atau keluarga, anda boleh senyum dan tukar topik.",
        "The best way to learn is to talk. Say hello to one new person on your day off.":
            "Cara terbaik untuk belajar ialah bercakap. Sapa seorang yang baharu pada hari cuti anda.",
        "what people call you": "nama yang orang panggil anda",
        "a place like India or Bangladesh": "tempat seperti India atau Bangladesh",
        "your parents, husband or wife, and children":
            "ibu bapa, suami atau isteri, dan anak-anak anda",
        "young boys and girls; sons and daughters":
            "budak lelaki dan perempuan; anak lelaki dan anak perempuan",
        "someone you like and spend time with": "orang yang anda suka dan luangkan masa bersama",
        "the work you do for money": "kerja yang anda lakukan untuk mendapat wang",
        "something you like to do in your free time":
            "perkara yang anda suka buat pada masa lapang",
        "the day after Saturday; many workers rest": "hari selepas Sabtu; ramai pekerja berehat",
        "Asking someone's name.": "Bertanya nama seseorang.",
        "Telling someone your name.": "Memberitahu nama anda.",
        "Asking which country someone comes from.": "Bertanya seseorang berasal dari negara mana.",
        "Asking what work someone does.": "Bertanya apa pekerjaan seseorang.",
        "Saying you are happy to meet someone new.": "Mengatakan anda gembira berkenalan.",
        "Asking about someone's day off.": "Bertanya tentang hari cuti seseorang.",
        "You meet someone new at the park on your day off.":
            "Anda bertemu orang baharu di taman pada hari cuti.",
        "The new person asks your name.": "Orang yang baru dikenali bertanya nama anda.",
        "Your friend brings a new person to meet you.":
            "Kawan anda membawa orang baharu untuk berkenalan dengan anda.",
        "The new person tells you her name.": "Wanita yang baru dikenali memberitahu namanya.",
        "What is your job?": "Apa pekerjaan anda?",
        "Helping at home": "Membantu di rumah",
        "Understand what to do at home, say what you have finished, and ask when you are not sure.":
            "Fahami tugas di rumah, beritahu kerja yang sudah siap, dan tanya jika kurang pasti.",
        "Never lean out of a window to clean it or to hang clothes. If someone asks you to, say it is not safe.":
            "Jangan julurkan badan keluar tingkap untuk membersihkannya atau menyidai pakaian. Jika disuruh, katakan ia tidak selamat.",
        "Never throw anything out of a window. Put rubbish in the rubbish chute or the bin.":
            "Jangan buang apa-apa keluar tingkap. Masukkan sampah ke dalam saluran sampah berpintu logam kecil di dapur atau tong sampah.",
        "Never mix bleach with other cleaning products. The gas can hurt you.":
            "Jangan campur peluntur dengan bahan pencuci lain. Gasnya boleh membahayakan anda.",
        "If you do not know how to use a machine, ask first. It is better to ask than to break it.":
            "Jika tidak tahu cara menggunakan mesin, tanya dahulu. Lebih baik bertanya daripada merosakkannya.",
        "clothes to wash": "pakaian untuk dibasuh",
        "a hot tool that makes clothes flat": "alat panas untuk melicinkan pakaian",
        "a stick with cloth for washing the floor": "batang dengan kain untuk mencuci lantai",
        "plates and bowls you eat from": "pinggan dan mangkuk yang digunakan untuk makan",
        "things you throw away": "barang yang anda buang",
        "a cold box that keeps food fresh": "peti sejuk yang memastikan makanan kekal segar",
        "where you cook food with fire": "tempat memasak makanan dengan api",
        "a place with doors to keep things": "tempat berpintu untuk menyimpan barang",
        "Asking what work comes after this.": "Bertanya kerja apa yang perlu dibuat selepas ini.",
        "Saying the laundry is done.": "Mengatakan pakaian sudah siap dibasuh.",
        "Asking where something goes.": "Bertanya tempat untuk meletakkan sesuatu.",
        "Asking someone to show you the way to do it.":
            "Meminta seseorang menunjukkan cara melakukannya.",
        "Saying sorry and telling the truth about a broken plate.":
            "Meminta maaf dan bercakap benar tentang pinggan yang pecah.",
        "You finished washing the clothes. Your employer comes into the room.":
            "Anda sudah selesai membasuh pakaian. Majikan masuk ke bilik.",
        "Your employer asks if the clothes are washed.":
            "Majikan bertanya sama ada pakaian sudah dibasuh.",
        "There is a new iron at home. You do not know how to use it.":
            "Ada seterika baharu di rumah. Anda tidak tahu cara menggunakannya.",
        "Your employer asks you to iron the shirts.": "Majikan meminta anda menyeterika kemeja.",
        "Sorry, I broke a plate.": "Maaf, saya terpecahkan pinggan.",
        "Reading signs": "Membaca papan tanda",
        "Read the signs you see every day, and ask when you do not understand one.":
            "Baca papan tanda yang anda lihat setiap hari. Tanya jika tidak faham.",
        "Red signs usually mean stop or danger. Yellow means be careful. Green usually means safe, or the way out.":
            "Tanda merah biasanya bermaksud berhenti atau bahaya. Kuning bermaksud berhati-hati. Hijau biasanya bermaksud selamat atau jalan keluar.",
        "You can be fined for smoking where it is not allowed. Many places have a yellow box that shows where you can smoke.":
            "Anda boleh didenda kerana merokok di tempat yang dilarang. Banyak tempat mempunyai kotak bergaris kuning yang menunjukkan kawasan merokok.",
        "Many signs in Singapore are in English, Chinese, Malay and Tamil. If your language is there, read it first, then look for the English word.":
            "Banyak papan tanda di Singapura dalam bahasa Inggeris, Cina, Melayu dan Tamil. Jika ada bahasa anda, baca dahulu, kemudian cari perkataan Inggerisnya.",
        "Not sure what a sign means? Take a photo and ask someone. Do not go past a danger sign.":
            "Tidak pasti maksud papan tanda? Ambil gambar dan tanya seseorang. Jangan melepasi tanda bahaya.",
        "the floor has water; you can slip": "lantai ada air; anda boleh tergelincir",
        "do not go in": "jangan masuk",
        "do not smoke here": "jangan merokok di sini",
        "not open now": "tidak buka sekarang",
        "press the door away from you": "tolak pintu menjauhi anda",
        "bring the door towards you": "tarik pintu ke arah anda",
        "the room with a toilet, in a public place": "bilik dengan tandas di tempat awam",
        "something here can hurt you": "sesuatu di sini boleh mencederakan anda",
        "Asking someone to explain a sign.": "Meminta seseorang menerangkan papan tanda.",
        "Telling someone to be careful of the wet floor.":
            "Mengingatkan seseorang supaya berhati-hati di lantai basah.",
        "Asking the way to the toilet.": "Bertanya jalan ke tandas.",
        "Saying a shop is not open.": "Mengatakan kedai tidak buka.",
        "Telling someone they are not allowed to enter.":
            "Memberitahu seseorang bahawa dia tidak dibenarkan masuk.",
        "You are new in a building and you need the toilet. You see a cleaner.":
            "Anda baru pertama kali ke bangunan ini dan perlu ke tandas. Anda nampak pekerja pembersihan.",
        "The cleaner asks if you need help.":
            "Pekerja pembersihan bertanya sama ada anda perlukan bantuan.",
        "Your friend is walking to a door with a red No Entry sign.":
            "Kawan anda berjalan ke pintu dengan papan tanda No Entry berwarna merah.",
        "Your friend asks if they can go in.": "Kawan anda bertanya sama ada boleh masuk.",
        "The shop is closed.": "Kedai sudah tutup.",
        "Buses and finding your way": "Bas dan mencari jalan",
        "Find the right bus, get off at your stop, and ask for directions when you are lost.":
            "Cari bas yang betul, turun di perhentian anda, dan tanya arah jika sesat.",
        "Tap your card when you get on the bus and again when you get off. If you forget to tap when you get off, you can pay more.":
            "Sentuhkan kad apabila naik bas dan sekali lagi apabila turun. Jika terlupa semasa turun, anda mungkin perlu membayar lebih.",
        "Press the bell just before your stop. If nobody presses it and nobody is waiting, the bus does not stop.":
            "Tekan loceng sejurus sebelum perhentian anda. Jika tiada sesiapa menekan dan tiada orang menunggu, bas tidak berhenti.",
        "Raise your hand when your bus comes, so the driver knows to stop.":
            "Angkat tangan apabila bas anda datang supaya pemandu tahu untuk berhenti.",
        "Cross the road at a traffic light or an overhead bridge. You can be fined for crossing somewhere else nearby.":
            "Lintas jalan di lampu isyarat atau jejantas pejalan kaki. Anda boleh didenda jika melintas di tempat lain berdekatan.",
        "where you wait for the bus": "tempat anda menunggu bas",
        "press it to ask the bus to stop": "tekan untuk meminta bas berhenti",
        "the side of your left hand": "sebelah tangan kiri anda",
        "the side of your right hand": "sebelah tangan kanan anda",
        "keep going ahead; do not turn": "terus ke hadapan; jangan belok",
        "the lights that say stop or go": "lampu yang menunjukkan bila perlu berhenti atau jalan",
        "a bridge for walking over a road": "jambatan untuk berjalan kaki melintasi jalan raya",
        "a picture that shows where places are": "gambar yang menunjukkan lokasi tempat",
        "Asking which bus to take.": "Bertanya bas mana yang perlu dinaiki.",
        "Asking the way to the bus stop.": "Bertanya jalan ke perhentian bas.",
        "Telling someone the way.": "Memberitahu seseorang arah jalan.",
        "Saying you do not know where you are.": "Mengatakan anda tidak tahu di mana anda berada.",
        "Asking someone to tell you when to get off.":
            "Meminta seseorang memberitahu bila perlu turun.",
        "You are at a bus stop and want to go to Little India. A woman is waiting next to you.":
            "Anda di perhentian bas dan mahu ke Little India. Seorang wanita menunggu di sebelah anda.",
        "The woman asks if you are waiting for a bus.":
            "Wanita itu bertanya sama ada anda sedang menunggu bas.",
        "You do not know this road and your phone has no battery. You see a man walking.":
            "Anda tidak kenal jalan ini dan bateri telefon sudah habis. Anda nampak seorang lelaki berjalan.",
        "The man asks if he can help you.": "Lelaki itu bertanya sama ada dia boleh membantu anda.",
        "Please tell me my stop.": "Tolong beritahu apabila sampai di perhentian saya.",
        "At the supermarket": "Di pasar raya",
        "Find what you need, check the price and the date, and pay at the counter.":
            "Cari barang yang diperlukan, semak harga dan tarikh, lalu bayar di kaunter.",
        "Big supermarkets charge at least 5 cents for each plastic bag. Bring your own bag to save money.":
            "Pasar raya besar mengenakan sekurang-kurangnya 5 sen untuk setiap beg plastik. Bawa beg sendiri untuk berjimat.",
        "Look for the date on food before you buy it. \"Best before\" and \"Use by\" tell you how long it is good.":
            "Lihat tarikh pada makanan sebelum membelinya. \"Best before\" dan \"Use by\" memberitahu berapa lama makanan masih baik.",
        "Keep the receipt when you shop for someone else, so you can show what you spent.":
            "Simpan resit apabila membeli barang untuk orang lain supaya anda boleh tunjuk jumlah yang dibelanjakan.",
        "The cashier may ask if you have a member card. If you do not have one, just say no.":
            "Juruwang mungkin bertanya sama ada anda ada kad ahli. Jika tiada, katakan sahaja tiada.",
        "a big basket on wheels": "bakul besar beroda",
        "the walkway between shelves": "laluan di antara rak",
        "the person you pay": "orang yang menerima bayaran anda",
        "the paper that shows what you paid": "kertas yang menunjukkan bayaran anda",
        "a lower price than usual": "harga lebih rendah daripada biasa",
        "the last day the food is good": "hari terakhir makanan masih baik",
        "a thin bag to carry your shopping": "beg nipis untuk membawa barang belian",
        "plants you cook and eat, like carrots":
            "tumbuhan yang dimasak dan dimakan, seperti lobak merah",
        "Asking where to find something.": "Bertanya tempat mencari sesuatu.",
        "Asking if the price is lower today.": "Bertanya sama ada harga lebih rendah hari ini.",
        "Asking the cashier for a bag.": "Meminta beg daripada juruwang.",
        "Asking the cashier for the receipt.": "Meminta resit daripada juruwang.",
        "Telling staff that the food is past its date.":
            "Memberitahu pekerja bahawa makanan sudah melepasi tarikh luput.",
        "You are paying at the counter. You do not have your own bag.":
            "Anda sedang membayar di kaunter. Anda tidak membawa beg sendiri.",
        "The cashier tells you the price.": "Juruwang memberitahu harganya.",
        "The milk in your basket is past its date. You show it to a staff member.":
            "Susu dalam bakul anda sudah luput. Anda tunjukkan kepada seorang pekerja.",
        "A staff member asks if they can help you.":
            "Seorang pekerja bertanya sama ada dia boleh membantu anda.",
        "Is this on discount?": "Adakah ini ada diskaun?",
        "Construction science": "Sains pembinaan",
        "Learn the main building materials, why a building stays up, and how to warn others about a problem.":
            "Pelajari bahan binaan utama, sebab bangunan boleh berdiri, dan cara memberi amaran apabila ada masalah.",
        "Concrete is strong when it is pressed, but it cracks when it is pulled. That is why steel bars go inside it.":
            "Konkrit kuat apabila ditekan, tetapi retak apabila ditarik. Sebab itu bar keluli diletakkan di dalamnya.",
        "Too much water makes concrete weak. Use only the amount of water your supervisor tells you.":
            "Terlalu banyak air melemahkan konkrit. Gunakan hanya jumlah air yang diberitahu oleh penyelia.",
        "Concrete goes hard slowly. It takes about 28 days to reach full strength, so ask your supervisor before you put weight on it.":
            "Konkrit mengeras perlahan-lahan. Ia mengambil kira-kira 28 hari untuk mencapai kekuatan penuh. Tanya penyelia sebelum meletakkan beban di atasnya.",
        "A building carries its weight down: from the floor to the beams, to the columns, then into the ground. Never cut a beam or a column without permission.":
            "Berat bangunan disalurkan ke bawah: dari lantai ke rasuk, ke tiang, kemudian ke tanah. Jangan potong rasuk atau tiang tanpa kebenaran.",
        "Every scaffold has a weight limit. Too much weight can make it fall, so do not add more than you are told.":
            "Setiap perancah ada had beban. Berat berlebihan boleh menyebabkannya runtuh. Jangan letak lebih daripada yang diberitahu.",
        "cement, sand, stones and water mixed; it goes hard":
            "campuran simen, pasir, batu dan air; ia mengeras",
        "the grey powder that holds concrete together": "serbuk kelabu yang mengikat konkrit",
        "a long metal rod inside concrete": "batang keluli panjang di dalam konkrit",
        "a strong part that goes across and holds up a floor":
            "bahagian kuat yang melintang dan menyokong lantai",
        "a strong part that stands up and carries the weight":
            "bahagian kuat yang tegak dan menanggung berat",
        "the weight something must carry": "berat yang perlu ditanggung oleh sesuatu",
        "a tool that shows if something is flat": "alat yang menunjukkan sama ada permukaan rata",
        "a metal frame you stand on to work up high":
            "rangka logam untuk berdiri semasa bekerja di tempat tinggi",
        "Warning that the concrete is not hard yet.": "Memberi amaran bahawa konkrit belum keras.",
        "Saying that something weighs too much.": "Mengatakan sesuatu terlalu berat.",
        "Telling someone to stop adding water to the mix.":
            "Menyuruh seseorang berhenti menambah air ke dalam campuran.",
        "Reporting a crack to your supervisor.": "Melaporkan retakan kepada penyelia.",
        "Asking someone to make sure the scaffold is safe.":
            "Meminta seseorang memastikan perancah selamat.",
        "A worker is about to walk on the floor you poured this morning.":
            "Seorang pekerja hendak berjalan di atas lantai yang anda tuang konkrit pagi tadi.",
        "The worker asks if he can walk here.":
            "Pekerja bertanya sama ada dia boleh berjalan di sini.",
        "Your co-worker is mixing concrete and keeps pouring in water.":
            "Rakan sekerja anda sedang membancuh konkrit dan terus menuangkan air.",
        "Your co-worker wants to add more water.": "Rakan sekerja anda mahu menambah air.",
        "There is a crack in this column.": "Ada retakan pada tiang ini.",
    },
    zh: {
        'Signs and announcements say "alight". It means get off the train.':
            '标志和广播会说 "alight"，意思是下车。',
        'Say "take away" to bring the food home. Some stalls charge a little more for the box.':
            '说 "take away" 表示打包带回家。有些摊位会为打包盒多收一点钱。',
        'A tissue packet on a table means someone has taken that seat. People call this "chope".':
            '桌上放着一包纸巾，表示有人已经占了那个座位。大家把这叫做 "chope"。',
        "A meal at a hawker centre or coffee shop usually costs 4 to 7 dollars. Most stalls take cash, and many take PayNow.":
            "在小贩中心或咖啡店吃一餐通常要4到7元。大多数摊位收现金，很多也接受PayNow。",
        "A quick practice with words from every lesson. New every day.":
            "快速练习每节课的单词。每天都有新内容。",
        "After eating, return your tray and plates to the tray return point. It is the rule, and there can be a fine.":
            "吃完后，请把托盘和碗盘放回托盘回收处。这是规定，否则可能被罚款。",
        "Ask the doctor for an MC. Give it to your employer so your sick day is counted as sick leave.":
            "向医生索取病假单（MC）。把它交给雇主，这样你的病假才会被算作病假。",
        "Ask your supervisor to say it again, say when something is not safe, and ask for a day off.":
            "请主管再说一遍，发现不安全时说出来，并申请一天休假。",
        "Asking for a day with no work.": "请求一天不用工作。",
        "Asking for less chilli.": "要求少放辣椒。",
        "Asking how often to take the medicine.": "询问多久吃一次药。",
        "Asking people to let you off the train.": "请别人让你下车。",
        "Asking someone to repeat what they said.": "请对方再说一遍。",
        "Asking the doctor for a sick-leave paper.": "向医生索取病假单。",
        "Asking the price.": "询问价格。",
        "Asking to add ten dollars to your card.": "请求给你的卡充值十元。",
        "Asking which platform goes to Jurong East.": "询问哪个站台去裕廊东。",
        "At a hawker centre, you order at the stall, pay, and carry the food to a table yourself.":
            "在小贩中心，你要在摊位点餐、付钱，然后自己把食物端到桌上。",
        "At work": "在工作中",
        "Buying food": "购买食物",
        "Daily mix": "每日综合练习",
        "Fill in the missing word": "填入缺少的单词",
        "Find the right platform, top up your card, and get off at the right stop.":
            "找到正确的站台，为交通卡充值，并在正确的车站下车。",
        "How many times a day?": "一天几次？",
        "How much?": "多少钱？",
        "If work is not safe, tell your supervisor. You can say no to unsafe work. You can also call MOM at 6438 5122.":
            "如果工作不安全，请告诉你的主管。你可以拒绝不安全的工作。你也可以拨打人力部（MOM）电话 6438 5122。",
        "If you are hurt at work, tell your supervisor the same day and see a doctor. Keep the MC and every receipt.":
            "如果在工作中受伤，当天就告诉主管并去看医生。保留病假单和所有收据。",
        "If you are sick, go to a clinic near your dormitory or a polyclinic. In an emergency, call 995 for an ambulance.":
            "如果生病，去宿舍附近的诊所或综合诊疗所。紧急情况请拨打995叫救护车。",
        "If your employer does not let you see a doctor, call MOM at 6438 5122 or the Migrant Workers' Centre at 6536 2692.":
            "如果雇主不让你看医生，请拨打人力部（MOM）6438 5122 或客工中心 6536 2692。",
        "In an emergency, call 995 for an ambulance.": "紧急情况请拨打995叫救护车。",
        "It is your turn at the chicken rice stall.": "鸡饭摊轮到你了。",
        "Listen. Tap what you hear": "听一听。点选你听到的",
        "Listen. What does it mean?": "听一听。这是什么意思？",
        "My salary is late.": "我的工资迟发了。",
        "Order at a food stall, ask the price, and say how you want it.":
            "在食摊点餐、询问价格，并说明您想要的做法。",
        "Ordering a drink without ice.": "点一杯不加冰的饮料。",
        "Ordering one chicken rice to bring home.": "点一份鸡饭打包带回家。",
        "Pointing to where it hurts.": "指出疼痛的地方。",
        "Put the words in order": "把单词排好顺序",
        "Say this in English": "用英语说这句话",
        "Say what is wrong, ask for an MC, and understand how to take your medicine.":
            "说明哪里不舒服、索取病假单，并了解如何服药。",
        "Saying thank you to an older man.": "向一位年长的男士道谢。",
        "Saying thank you.": "道谢。",
        "Saying that something is not safe.": "说某样东西不安全。",
        "Saying that you are injured.": "说你受伤了。",
        "Saying you want the food in a box, not on a plate.": "说你要把食物装盒，不要用盘子。",
        "Saying your pay has not come on time.": "说你的工资没有按时发。",
        "Seats in a different colour are reserved seats. Give them to old people, pregnant women, and anyone who is hurt.":
            "颜色不同的座位是优先座。请让给老人、孕妇和受伤的人。",
        "Seeing a doctor": "看医生",
        "Stand on the left side of the escalator so people can walk past on the right.":
            "站在扶梯左侧，让别人可以从右侧走过。",
        "Take medicine the way the doctor says: how many times a day, and before or after food.":
            "按医生说的吃药：一天几次，饭前还是饭后。",
        "Taking the MRT": "乘搭地铁",
        "Tap the pairs": "点选配对",
        "Tap your card at the gate when you go in and again when you go out. If you forget to tap out, you pay the highest fare.":
            "进站和出站时都要在闸门刷卡。如果忘记出站刷卡，会被收取最高车费。",
        "Telling staff your card is not working at the gate.": "告诉工作人员你的卡在闸门刷不了。",
        "Telling the doctor your body is hot.": "告诉医生你身体发热。",
        "The doctor asks what is wrong.": "医生问你哪里不舒服。",
        "The doctor asks where it hurts.": "医生问你哪里痛。",
        "The doctor wants to know where it hurts.": "医生想知道哪里痛。",
        "The seller asks for your order.": "摊主问你要点什么。",
        "The seller asks if you will eat here or bring it home.": "摊主问你在这里吃还是打包。",
        "The staff member asks if you need help.": "工作人员问你是否需要帮助。",
        "The supervisor asks what happened.": "主管问发生了什么事。",
        "The supervisor gives a long instruction.": "主管给了一长串指示。",
        "Top up your card for free at the machine inside the station. 7-Eleven and Cheers shops also top up, but they charge a small fee each time.":
            "在车站内的机器上免费给卡充值。7-Eleven 和 Cheers 便利店也能充值，但每次收取少量手续费。",
        "Use the same card or phone both times. If you tap in with your card and out with your phone, the trip will not match.":
            "进出站要用同一张卡或同一部手机。如果用卡进站、用手机出站，这趟行程就对不上。",
        "Wear your helmet, safety boots and vest on the worksite. Your employer must give them to you for free.":
            "在工地要戴安全帽、穿安全靴和背心。雇主必须免费提供。",
        "What do you say?": "你会怎么说？",
        "What is this called?": "这个叫什么？",
        "Which one is this?": "这是哪一个？",
        "Which platform for Jurong East?": "去裕廊东是哪个站台？",
        "You are at a food stall. You want to eat at home.": "你在一个食物摊位。你想带回家吃。",
        "You are in the doctor's room.": "你在医生的诊室里。",
        "You fell and your arm is bleeding. Your supervisor runs over.":
            "你摔倒了，手臂在流血。你的主管跑了过来。",
        "Your card does not work at the gate. A staff member comes over.":
            "你的卡在闸门刷不了。一位工作人员走了过来。",
        "Your employer must pay for your medical care. Keep every receipt.":
            "雇主必须支付你的医疗费。保留每一张收据。",
        "Your salary must be paid within 7 days after the end of the month. If it is late, call MOM.":
            "工资必须在月底后7天内发放。如果迟了，请联系人力部（MOM）。",
        "Your supervisor speaks very fast. You did not understand.": "你的主管说得很快。你没听懂。",
        "a day off from work": "一天不用上班",
        "a day with no work": "没有工作的一天",
        "a fixed time to see the doctor": "看医生的固定时间",
        "a paper from the doctor that says you are sick": "医生开的证明你生病的单子",
        "a seat for old, pregnant or hurt people": "给老人、孕妇或受伤者的座位",
        "a short rest from work": "工作中的短暂休息",
        "a small place where a doctor sees you": "医生给你看病的小地方",
        "a smaller amount": "少一点的量",
        "a station where you change to another line": "换乘另一条线路的车站",
        "add money to your card": "给你的卡充值",
        "bring the food home in a box": "把食物装盒带回家",
        "change to another train line": "换乘另一条地铁线",
        "eat here, at a table": "在这里的桌子上吃",
        "get off the train": "下车",
        "hot, with chilli": "辣的，加辣椒",
        "it hurts": "很痛",
        "not safe; you can get hurt": "不安全；你可能会受伤",
        "one more time": "再一次",
        "one small shop inside a hawker centre": "小贩中心里的一个小摊位",
        "paper money and coins": "纸币和硬币",
        "rice with chicken, a common Singapore meal": "鸡肉配米饭，新加坡常见的一餐",
        "something to drink, like tea or juice": "喝的东西，比如茶或果汁",
        "stay home and sleep": "待在家里睡觉",
        "strong shoes for work": "工作用的结实鞋子",
        "the boss at your worksite": "你工地上的老板",
        "the money you get for your work": "你工作得到的钱",
        "the money you pay for the trip": "你为这趟车程付的钱",
        "the way out of the station": "车站的出口",
        "touch your card at the gate when you leave": "离开时在闸门刷卡",
        "wait for the next train": "等下一班车",
        "what is the price": "价格是多少",
        "what you take to get better": "为了康复而吃的东西",
        "when air comes out of your mouth with a loud sound": "空气从嘴里大声冲出来的时候",
        "where you wait for the train": "你等车的地方",
        "your body is injured": "你的身体受伤了",
        "your body is very hot": "你的身体很热",
        // AI Words (workshop lesson)
        "AI Words": "AI 词汇",
        "Know the key words people use when they talk about AI.": "认识人们谈论 AI 时常用的关键词。",
        "computer programs that can do tasks that usually need a human mind": "能做通常需要人脑才能完成的事情的电脑程序",
        "how an AI gets better by learning patterns from lots of examples": "AI 从大量例子中学习规律、变得越来越好的方式",
        "the examples (text, photos, recordings) an AI learns from": "AI 用来学习的例子（文字、照片、录音）",
        "an AI you have a conversation with by typing, like ChatGPT or Gemini": "你打字和它对话的 AI，比如 ChatGPT 或 Gemini",
        "the question or instruction you type or say to an AI": "你输入或说给 AI 听的问题或要求",
        "AI that creates new things: text, pictures, music or video": "能创作新东西的 AI：文字、图片、音乐或视频",
        "an AI that listens to your voice and answers out loud, like Siri": "能听你说话并大声回答你的 AI，比如 Siri",
        "AI that can tell what is in a photo": "能看出照片里有什么的 AI",
        "when an AI confidently gives an answer that is made up or wrong": "AI 很自信地给出编造的或错误的答案的时候",
        "Saying the AI gave a confident answer that was false.": "说 AI 很自信地给出了一个错误的答案。",
        "Suggesting a more detailed question to get a better answer.": "建议问得更详细一些，以得到更好的答案。",
        "Which one is a chatbot?": '哪一个是 "chatbot"？',
        "Which word fits?": "哪个词合适？",
        "Your friend has been using a chatbot and looks confused.": "你的朋友一直在用聊天机器人，看起来很困惑。",
        "Your friend searched for the book and could not find it anywhere.": "你的朋友找过那本书，但哪里都找不到。",
        "Saying it was an AI that answers out loud.": "说那是一个会大声回答的 AI。",
        "Saying it was the examples the AI learned from.": "说那是 AI 用来学习的例子。",
        "Your friend asked a chatbot to plan a trip.": "你的朋友让聊天机器人帮忙规划一次旅行。",
        "The answer did not have enough detail to be useful.": "这个回答不够详细，没什么用。",
        "Suggesting they change what the AI learned from.": "建议对方改一改 AI 用来学习的内容。",
        "Suggesting they use an AI that reads photos.": "建议对方用一个能看懂照片的 AI。",
        "A chatbot answers whatever you type, and what you type is your prompt. Try the ideas below, or ask anything you like.":
            "聊天机器人会回答你输入的任何内容，你输入的内容就是你的 prompt。试试下面的点子，或者想问什么就问什么。",
        "Say exactly what you want.": "清楚地说出你想要什么。",
        "Give context: who it is for, and limits like time or budget.": "说明背景：是给谁的，还有时间、预算等限制。",
        "Say the format: a list, three sentences, a short message.": "说明格式：列表、三句话、一条短消息。",
        "Not happy with the answer? Ask a follow-up to change it.": "对回答不满意？继续追问，让它修改。",
        "Ask about an AI word": "问一个 AI 词语",
        "Pick any word from the lesson and ask the chatbot to explain it.": "从这节课里任选一个词，请聊天机器人解释它。",
        "Send a vague prompt": "发一个模糊的 prompt",
        "Send this short prompt and see what comes back.": "发送这个简短的 prompt，看看会得到什么回答。",
        "Now add the details": "现在加上细节",
        "Same request with context, limits and a format. Compare the two answers.": "同样的请求，加上背景、限制和格式。比较两个回答。",
        "Make something new": "创作新东西",
        "That's generative AI: it writes something that did not exist before.": "这就是 generative AI：它能写出以前没有的东西。",
        "Ask a follow-up": "继续追问",
        "Change the last answer without starting again.": "不用重新开始，直接修改上一个回答。",
        "Check for a hallucination": "检查有没有 hallucination",
        "Ask for facts, then ask if it is sure. Chatbots can sound confident and still be wrong.":
            "先问一些事实，再问它是否确定。聊天机器人听起来很有把握，也可能是错的。",
        "Getting to know someone": "认识新朋友",
        "Say your name and where you are from, and ask new people about themselves.":
            "说说你的名字和来自哪里，也问问新朋友的情况。",
        "People in Singapore often say \"Have you eaten?\" as a friendly hello. You can say \"Yes, thank you.\"":
            "在新加坡，人们常用 \"Have you eaten?\" 来亲切地打招呼。你可以回答 \"Yes, thank you.\"",
        "People may call an older woman \"Aunty\" and an older man \"Uncle\". It is polite, even if you are not family.":
            "人们会把年长的女士叫作 \"Aunty\"，把年长的男士叫作 \"Uncle\"。就算不是亲戚，这样叫也很有礼貌。",
        "You do not have to answer every question. If someone asks about your pay or your family and you do not want to say, you can smile and change the topic.":
            "你不用回答每个问题。如果别人问起你的工资或家人，而你不想说，可以笑一笑，换个话题。",
        "The best way to learn is to talk. Say hello to one new person on your day off.":
            "多开口说话，学得最好。休息日试着跟一个新认识的人打招呼。",
        "what people call you": "别人用来称呼你的名字",
        "a place like India or Bangladesh": "像印度或孟加拉国这样的地方",
        "your parents, husband or wife, and children": "你的父母、丈夫或妻子，还有孩子",
        "young boys and girls; sons and daughters": "小男孩和小女孩；儿子和女儿",
        "someone you like and spend time with": "你喜欢并会一起相处的人",
        "the work you do for money": "你为了挣钱做的事",
        "something you like to do in your free time": "你有空时喜欢做的事",
        "the day after Saturday; many workers rest": "星期六后面的一天；很多工人会休息",
        "Asking someone's name.": "问对方的名字。",
        "Telling someone your name.": "告诉对方你的名字。",
        "Asking which country someone comes from.": "问对方来自哪个国家。",
        "Asking what work someone does.": "问对方做什么工作。",
        "Saying you are happy to meet someone new.": "说你很高兴认识对方。",
        "Asking about someone's day off.": "问对方休息日的情况。",
        "You meet someone new at the park on your day off.": "休息日，你在公园认识了一个人。",
        "The new person asks your name.": "新认识的人问你的名字。",
        "Your friend brings a new person to meet you.": "朋友带了一个人来和你认识。",
        "The new person tells you her name.": "新认识的女士告诉你她的名字。",
        "What is your job?": "你做什么工作？",
        "Helping at home": "帮忙做家务",
        "Understand what to do at home, say what you have finished, and ask when you are not sure.":
            "听懂家里的工作安排，说说已经做完什么，不确定时就问。",
        "Never lean out of a window to clean it or to hang clothes. If someone asks you to, say it is not safe.":
            "擦窗或晾衣服时，千万不要把身子探出窗外。有人叫你这样做，就说不安全。",
        "Never throw anything out of a window. Put rubbish in the rubbish chute or the bin.":
            "千万不要往窗外扔东西。把垃圾丢进厨房里有小金属门的垃圾槽，或丢进垃圾桶。",
        "Never mix bleach with other cleaning products. The gas can hurt you.":
            "千万不要把漂白水和其他清洁用品混在一起。产生的气体会伤害你。",
        "If you do not know how to use a machine, ask first. It is better to ask than to break it.":
            "不知道怎么用机器，就先问。问清楚总比弄坏好。",
        "clothes to wash": "要洗的衣服",
        "a hot tool that makes clothes flat": "用热把衣服弄平的工具",
        "a stick with cloth for washing the floor": "带着布、用来拖地的长杆",
        "plates and bowls you eat from": "吃饭用的盘子和碗",
        "things you throw away": "你要扔掉的东西",
        "a cold box that keeps food fresh": "让食物保持新鲜的冷藏箱",
        "where you cook food with fire": "用火煮食物的地方",
        "a place with doors to keep things": "有门、可以放东西的地方",
        "Asking what work comes after this.": "问接下来要做什么工作。",
        "Saying the laundry is done.": "说衣服已经洗好了。",
        "Asking where something goes.": "问东西要放在哪里。",
        "Asking someone to show you the way to do it.": "请对方示范怎么做。",
        "Saying sorry and telling the truth about a broken plate.": "为打破盘子道歉，并说实话。",
        "You finished washing the clothes. Your employer comes into the room.": "你洗好了衣服。雇主走进房间。",
        "Your employer asks if the clothes are washed.": "雇主问衣服洗好了没有。",
        "There is a new iron at home. You do not know how to use it.": "家里有一台新熨斗。你不知道怎么用。",
        "Your employer asks you to iron the shirts.": "雇主请你熨衬衫。",
        "Sorry, I broke a plate.": "对不起，我打破了一个盘子。",
        "Reading signs": "看懂告示牌",
        "Read the signs you see every day, and ask when you do not understand one.":
            "读一读每天看到的告示牌，不明白就问。",
        "Red signs usually mean stop or danger. Yellow means be careful. Green usually means safe, or the way out.":
            "红色告示通常表示停下或有危险。黄色表示要小心。绿色通常表示安全，或指向出口。",
        "You can be fined for smoking where it is not allowed. Many places have a yellow box that shows where you can smoke.":
            "在禁止吸烟的地方吸烟，可能会被罚款。很多地方会用黄色方框标出可以吸烟的区域。",
        "Many signs in Singapore are in English, Chinese, Malay and Tamil. If your language is there, read it first, then look for the English word.":
            "新加坡很多告示牌都用英语、华语、马来语和淡米尔语写着。如果有你的语言，先读一读，再找出英语词。",
        "Not sure what a sign means? Take a photo and ask someone. Do not go past a danger sign.":
            "不确定告示是什么意思？拍张照，问问别人。不要越过危险警告牌。",
        "the floor has water; you can slip": "地上有水，可能会滑倒",
        "do not go in": "不要进去",
        "do not smoke here": "不要在这里吸烟",
        "not open now": "现在没有开放",
        "press the door away from you": "把门往远离你的方向推",
        "bring the door towards you": "把门往你这边拉",
        "the room with a toilet, in a public place": "公共场所里有马桶的房间",
        "something here can hurt you": "这里有东西可能伤害你",
        "Asking someone to explain a sign.": "请对方解释告示的意思。",
        "Telling someone to be careful of the wet floor.": "提醒对方地上湿，要小心。",
        "Asking the way to the toilet.": "问去厕所的路。",
        "Saying a shop is not open.": "说商店没有营业。",
        "Telling someone they are not allowed to enter.": "告诉对方不能进去。",
        "You are new in a building and you need the toilet. You see a cleaner.":
            "你第一次来这栋楼，需要上厕所。你看见一名清洁工。",
        "The cleaner asks if you need help.": "清洁工问你需不需要帮忙。",
        "Your friend is walking to a door with a red No Entry sign.": "朋友正走向一扇贴着红色 No Entry 告示的门。",
        "Your friend asks if they can go in.": "朋友问可不可以进去。",
        "The shop is closed.": "商店关门了。",
        "Buses and finding your way": "搭巴士和找路",
        "Find the right bus, get off at your stop, and ask for directions when you are lost.":
            "找到要搭的巴士，在自己的站下车，迷路时开口问路。",
        "Tap your card when you get on the bus and again when you get off. If you forget to tap when you get off, you can pay more.":
            "上巴士和下巴士时都要刷卡。下车时忘了刷卡，可能会多付车费。",
        "Press the bell just before your stop. If nobody presses it and nobody is waiting, the bus does not stop.":
            "快到你的站时按铃。如果没人按铃，也没人等车，巴士就不会停。",
        "Raise your hand when your bus comes, so the driver knows to stop.": "巴士来了，举手示意，让司机知道要停车。",
        "Cross the road at a traffic light or an overhead bridge. You can be fined for crossing somewhere else nearby.":
            "在交通灯处过马路，或走行人天桥。在附近其他地方过马路，可能会被罚款。",
        "where you wait for the bus": "等巴士的地方",
        "press it to ask the bus to stop": "按一下，请司机停车",
        "the side of your left hand": "你左手的那一边",
        "the side of your right hand": "你右手的那一边",
        "keep going ahead; do not turn": "一直往前走，不要转弯",
        "the lights that say stop or go": "告诉你该停还是该走的灯",
        "a bridge for walking over a road": "让行人从马路上方走过去的桥",
        "a picture that shows where places are": "画出各个地方在哪里的图",
        "Asking which bus to take.": "问要搭哪辆巴士。",
        "Asking the way to the bus stop.": "问去巴士站的路。",
        "Telling someone the way.": "给对方指路。",
        "Saying you do not know where you are.": "说你不知道自己在哪里。",
        "Asking someone to tell you when to get off.": "请对方告诉你什么时候下车。",
        "You are at a bus stop and want to go to Little India. A woman is waiting next to you.":
            "你在巴士站，想去 Little India。旁边有一位女士在等车。",
        "The woman asks if you are waiting for a bus.": "女士问你是不是在等巴士。",
        "You do not know this road and your phone has no battery. You see a man walking.":
            "你不认识这条路，手机也没电了。你看见一位男士走过。",
        "The man asks if he can help you.": "男士问能不能帮你。",
        "Please tell me my stop.": "请在我到站时告诉我。",
        "At the supermarket": "在超市",
        "Find what you need, check the price and the date, and pay at the counter.":
            "找到需要的东西，查看价格和日期，再到收银台付款。",
        "Big supermarkets charge at least 5 cents for each plastic bag. Bring your own bag to save money.":
            "大型超市每个塑料袋至少收费5分。带自己的袋子可以省钱。",
        "Look for the date on food before you buy it. \"Best before\" and \"Use by\" tell you how long it is good.":
            "买食物前，先看上面的日期。\"Best before\" 和 \"Use by\" 告诉你食物可以放到什么时候。",
        "Keep the receipt when you shop for someone else, so you can show what you spent.":
            "帮别人买东西时要留好收据，这样就能让对方看你花了多少钱。",
        "The cashier may ask if you have a member card. If you do not have one, just say no.":
            "收银员可能会问你有没有会员卡。如果没有，就说没有。",
        "a big basket on wheels": "有轮子的大篮子",
        "the walkway between shelves": "货架之间走路的地方",
        "the person you pay": "收你钱的人",
        "the paper that shows what you paid": "记着你付了多少钱的纸",
        "a lower price than usual": "比平时低的价格",
        "the last day the food is good": "食物还可以吃的最后一天",
        "a thin bag to carry your shopping": "装买来的东西的薄袋子",
        "plants you cook and eat, like carrots": "煮来吃的植物，比如胡萝卜",
        "Asking where to find something.": "问在哪里能找到东西。",
        "Asking if the price is lower today.": "问今天价格有没有便宜一些。",
        "Asking the cashier for a bag.": "向收银员要袋子。",
        "Asking the cashier for the receipt.": "向收银员要收据。",
        "Telling staff that the food is past its date.": "告诉工作人员食物已经过期了。",
        "You are paying at the counter. You do not have your own bag.": "你在收银台付款，没有带自己的袋子。",
        "The cashier tells you the price.": "收银员告诉你价格。",
        "The milk in your basket is past its date. You show it to a staff member.":
            "你篮子里的牛奶过期了。你拿给一名工作人员看。",
        "A staff member asks if they can help you.": "一名工作人员问能不能帮你。",
        "Is this on discount?": "这个有打折吗？",
        "Construction science": "建筑科学",
        "Learn the main building materials, why a building stays up, and how to warn others about a problem.":
            "认识主要的建筑材料，了解建筑物为什么能站稳，以及有问题时怎样提醒别人。",
        "Concrete is strong when it is pressed, but it cracks when it is pulled. That is why steel bars go inside it.":
            "混凝土受压时很结实，但受拉时会开裂。所以里面要放钢筋。",
        "Too much water makes concrete weak. Use only the amount of water your supervisor tells you.":
            "水太多会让混凝土不够结实。只加主管说的水量。",
        "Concrete goes hard slowly. It takes about 28 days to reach full strength, so ask your supervisor before you put weight on it.":
            "混凝土会慢慢变硬，大约需要28天才达到全部强度。放重物之前，先问主管。",
        "A building carries its weight down: from the floor to the beams, to the columns, then into the ground. Never cut a beam or a column without permission.":
            "建筑物的重量向下传：从楼面到梁，再到柱子，最后传到地面。没有许可，千万不要切断梁或柱子。",
        "Every scaffold has a weight limit. Too much weight can make it fall, so do not add more than you are told.":
            "每个脚手架都有承重上限。放得太重会倒塌，不要超过别人交代的重量。",
        "cement, sand, stones and water mixed; it goes hard": "水泥、沙、石头和水混合在一起，会变硬",
        "the grey powder that holds concrete together": "把混凝土粘在一起的灰色粉末",
        "a long metal rod inside concrete": "混凝土里的长钢条",
        "a strong part that goes across and holds up a floor": "横着放、撑住楼面的坚固部分",
        "a strong part that stands up and carries the weight": "竖着立、承担重量的坚固部分",
        "the weight something must carry": "一个东西需要承受的重量",
        "a tool that shows if something is flat": "用来看东西是否水平的工具",
        "a metal frame you stand on to work up high": "在高处工作时站上去的金属架子",
        "Warning that the concrete is not hard yet.": "提醒对方混凝土还没有变硬。",
        "Saying that something weighs too much.": "说东西太重了。",
        "Telling someone to stop adding water to the mix.": "叫对方不要再往混合料里加水。",
        "Reporting a crack to your supervisor.": "向主管报告裂缝。",
        "Asking someone to make sure the scaffold is safe.": "请对方检查脚手架是否安全。",
        "A worker is about to walk on the floor you poured this morning.": "一名工人正要走上你今天早上浇好的混凝土地面。",
        "The worker asks if he can walk here.": "工人问能不能走这里。",
        "Your co-worker is mixing concrete and keeps pouring in water.": "同事正在拌混凝土，一直往里面倒水。",
        "Your co-worker wants to add more water.": "同事想再加水。",
        "There is a crack in this column.": "这根柱子有裂缝。",
    },
    th: {
        'Signs and announcements say "alight". It means get off the train.':
            'ป้ายและประกาศจะพูดว่า "alight" หมายถึงลงจากรถไฟ',
        'Say "take away" to bring the food home. Some stalls charge a little more for the box.':
            'พูดว่า "take away" เพื่อเอาอาหารกลับบ้าน บางร้านคิดเพิ่มเล็กน้อยสำหรับกล่อง',
        'A tissue packet on a table means someone has taken that seat. People call this "chope".':
            'ทิชชู่ห่อหนึ่งวางบนโต๊ะหมายความว่ามีคนจองที่นั่งนั้นแล้ว คนเรียกสิ่งนี้ว่า "chope"',
        "A meal at a hawker centre or coffee shop usually costs 4 to 7 dollars. Most stalls take cash, and many take PayNow.":
            "อาหารหนึ่งมื้อที่ศูนย์อาหารหรือร้านกาแฟมักราคา 4 ถึง 7 ดอลลาร์ ร้านส่วนใหญ่รับเงินสด และหลายร้านรับ PayNow",
        "A quick practice with words from every lesson. New every day.":
            "ฝึกสั้น ๆ ด้วยคำจากทุกบทเรียน มีเนื้อหาใหม่ทุกวัน",
        "After eating, return your tray and plates to the tray return point. It is the rule, and there can be a fine.":
            "หลังกินเสร็จ ให้นำถาดและจานไปคืนที่จุดคืนถาด นี่คือกฎ และอาจถูกปรับได้",
        "Ask the doctor for an MC. Give it to your employer so your sick day is counted as sick leave.":
            "ขอใบรับรองแพทย์ (MC) จากหมอ แล้วส่งให้นายจ้างเพื่อให้วันที่ป่วยนับเป็นวันลาป่วย",
        "Ask your supervisor to say it again, say when something is not safe, and ask for a day off.":
            "ขอให้หัวหน้างานพูดอีกครั้ง บอกเมื่อมีสิ่งที่ไม่ปลอดภัย และขอวันหยุด",
        "Asking for a day with no work.": "ขอหยุดงานหนึ่งวัน",
        "Asking for less chilli.": "ขอพริกน้อยลง",
        "Asking how often to take the medicine.": "ถามว่าต้องกินยาบ่อยแค่ไหน",
        "Asking people to let you off the train.": "ขอทางให้คุณลงจากรถไฟ",
        "Asking someone to repeat what they said.": "ขอให้พูดซ้ำอีกครั้ง",
        "Asking the doctor for a sick-leave paper.": "ขอใบลาป่วยจากหมอ",
        "Asking the price.": "ถามราคา",
        "Asking to add ten dollars to your card.": "ขอเติมเงินสิบดอลลาร์ลงบัตร",
        "Asking which platform goes to Jurong East.": "ถามว่าชานชาลาไหนไปจูร่งอีสต์",
        "At a hawker centre, you order at the stall, pay, and carry the food to a table yourself.":
            "ที่ศูนย์อาหาร คุณสั่งที่ร้าน จ่ายเงิน แล้วยกอาหารไปที่โต๊ะเอง",
        "At work": "ที่ทำงาน",
        "Buying food": "การซื้ออาหาร",
        "Daily mix": "แบบฝึกผสมประจำวัน",
        "Fill in the missing word": "เติมคำที่หายไป",
        "Find the right platform, top up your card, and get off at the right stop.":
            "หาชานชาลาที่ถูกต้อง เติมเงินในบัตร และลงที่สถานีที่ถูกต้อง",
        "How many times a day?": "วันละกี่ครั้ง?",
        "How much?": "ราคาเท่าไหร่?",
        "If work is not safe, tell your supervisor. You can say no to unsafe work. You can also call MOM at 6438 5122.":
            "ถ้างานไม่ปลอดภัย ให้บอกหัวหน้างาน คุณปฏิเสธงานที่ไม่ปลอดภัยได้ และโทรหา MOM ที่ 6438 5122 ได้ด้วย",
        "If you are hurt at work, tell your supervisor the same day and see a doctor. Keep the MC and every receipt.":
            "ถ้าบาดเจ็บจากการทำงาน ให้บอกหัวหน้างานในวันนั้นและไปพบแพทย์ เก็บใบรับรองแพทย์และใบเสร็จทุกใบไว้",
        "If you are sick, go to a clinic near your dormitory or a polyclinic. In an emergency, call 995 for an ambulance.":
            "ถ้าป่วย ให้ไปคลินิกใกล้หอพักหรือโพลีคลินิก ในกรณีฉุกเฉิน โทร 995 เรียกรถพยาบาล",
        "If your employer does not let you see a doctor, call MOM at 6438 5122 or the Migrant Workers' Centre at 6536 2692.":
            "ถ้านายจ้างไม่ให้คุณไปพบแพทย์ โทรหา MOM ที่ 6438 5122 หรือศูนย์แรงงานต่างชาติที่ 6536 2692",
        "In an emergency, call 995 for an ambulance.": "ในกรณีฉุกเฉิน โทร 995 เรียกรถพยาบาล",
        "It is your turn at the chicken rice stall.": "ถึงคิวคุณที่ร้านข้าวมันไก่แล้ว",
        "Listen. Tap what you hear": "ฟัง แล้วแตะสิ่งที่ได้ยิน",
        "Listen. What does it mean?": "ฟัง แล้วบอกว่าหมายความว่าอะไร",
        "My salary is late.": "เงินเดือนของฉันออกช้า",
        "Order at a food stall, ask the price, and say how you want it.":
            "สั่งอาหารที่ร้าน ถามราคา และบอกว่าคุณต้องการแบบไหน",
        "Ordering a drink without ice.": "สั่งเครื่องดื่มไม่ใส่น้ำแข็ง",
        "Ordering one chicken rice to bring home.": "สั่งข้าวมันไก่หนึ่งจานกลับบ้าน",
        "Pointing to where it hurts.": "ชี้ตรงที่เจ็บ",
        "Put the words in order": "เรียงคำให้ถูกลำดับ",
        "Say this in English": "พูดประโยคนี้เป็นภาษาอังกฤษ",
        "Say what is wrong, ask for an MC, and understand how to take your medicine.":
            "บอกอาการ ขอใบรับรองแพทย์ และเข้าใจวิธีใช้ยา",
        "Saying thank you to an older man.": "กล่าวขอบคุณผู้ชายที่อายุมากกว่า",
        "Saying thank you.": "กล่าวขอบคุณ",
        "Saying that something is not safe.": "บอกว่าบางอย่างไม่ปลอดภัย",
        "Saying that you are injured.": "บอกว่าคุณบาดเจ็บ",
        "Saying you want the food in a box, not on a plate.":
            "บอกว่าอยากได้อาหารใส่กล่อง ไม่ใช่ใส่จาน",
        "Saying your pay has not come on time.": "บอกว่าเงินเดือนของคุณไม่ออกตรงเวลา",
        "Seats in a different colour are reserved seats. Give them to old people, pregnant women, and anyone who is hurt.":
            "ที่นั่งที่มีสีต่างออกไปคือที่นั่งสำรอง ให้ผู้สูงอายุ หญิงตั้งครรภ์ และผู้ที่บาดเจ็บนั่ง",
        "Seeing a doctor": "การไปพบแพทย์",
        "Stand on the left side of the escalator so people can walk past on the right.":
            "ยืนชิดซ้ายบนบันไดเลื่อน เพื่อให้คนอื่นเดินผ่านทางขวาได้",
        "Take medicine the way the doctor says: how many times a day, and before or after food.":
            "กินยาตามที่หมอสั่ง: วันละกี่ครั้ง และก่อนหรือหลังอาหาร",
        "Taking the MRT": "การโดยสาร MRT",
        "Tap the pairs": "แตะจับคู่",
        "Tap your card at the gate when you go in and again when you go out. If you forget to tap out, you pay the highest fare.":
            "แตะบัตรที่ประตูตอนเข้าและอีกครั้งตอนออก ถ้าลืมแตะตอนออก คุณต้องจ่ายค่าโดยสารสูงสุด",
        "Telling staff your card is not working at the gate.":
            "บอกเจ้าหน้าที่ว่าบัตรของคุณใช้ไม่ได้ที่ประตู",
        "Telling the doctor your body is hot.": "บอกหมอว่าตัวคุณร้อน",
        "The doctor asks what is wrong.": "หมอถามว่าเป็นอะไร",
        "The doctor asks where it hurts.": "หมอถามว่าเจ็บตรงไหน",
        "The doctor wants to know where it hurts.": "หมออยากรู้ว่าเจ็บตรงไหน",
        "The seller asks for your order.": "คนขายถามว่าจะสั่งอะไร",
        "The seller asks if you will eat here or bring it home.":
            "คนขายถามว่าจะกินที่นี่หรือเอากลับบ้าน",
        "The staff member asks if you need help.": "เจ้าหน้าที่ถามว่าต้องการความช่วยเหลือไหม",
        "The supervisor asks what happened.": "หัวหน้างานถามว่าเกิดอะไรขึ้น",
        "The supervisor gives a long instruction.": "หัวหน้างานให้คำสั่งยาวๆ",
        "Top up your card for free at the machine inside the station. 7-Eleven and Cheers shops also top up, but they charge a small fee each time.":
            "เติมเงินบัตรฟรีที่เครื่องในสถานี ร้าน 7-Eleven และ Cheers ก็เติมได้ แต่คิดค่าธรรมเนียมเล็กน้อยทุกครั้ง",
        "Use the same card or phone both times. If you tap in with your card and out with your phone, the trip will not match.":
            "ใช้บัตรหรือโทรศัพท์เครื่องเดียวกันทั้งสองครั้ง ถ้าเข้าด้วยบัตรแล้วออกด้วยโทรศัพท์ การเดินทางจะไม่ตรงกัน",
        "Wear your helmet, safety boots and vest on the worksite. Your employer must give them to you for free.":
            "สวมหมวกนิรภัย รองเท้านิรภัย และเสื้อกั๊กในไซต์งาน นายจ้างต้องจัดให้คุณฟรี",
        "What do you say?": "คุณจะพูดว่าอย่างไร?",
        "What is this called?": "สิ่งนี้เรียกว่าอะไร?",
        "Which one is this?": "อันไหนคืออันนี้?",
        "Which platform for Jurong East?": "ชานชาลาไหนไปจูร่งอีสต์?",
        "You are at a food stall. You want to eat at home.":
            "คุณอยู่ที่ร้านอาหาร คุณอยากเอากลับไปกินที่บ้าน",
        "You are in the doctor's room.": "คุณอยู่ในห้องตรวจของหมอ",
        "You fell and your arm is bleeding. Your supervisor runs over.":
            "คุณล้มและแขนมีเลือดออก หัวหน้างานวิ่งมาหา",
        "Your card does not work at the gate. A staff member comes over.":
            "บัตรของคุณใช้ไม่ได้ที่ประตู เจ้าหน้าที่เดินเข้ามา",
        "Your employer must pay for your medical care. Keep every receipt.":
            "นายจ้างต้องจ่ายค่ารักษาพยาบาลของคุณ เก็บใบเสร็จทุกใบไว้",
        "Your salary must be paid within 7 days after the end of the month. If it is late, call MOM.":
            "เงินเดือนต้องจ่ายภายใน 7 วันหลังสิ้นเดือน ถ้าล่าช้า โทรหา MOM",
        "Your supervisor speaks very fast. You did not understand.":
            "หัวหน้างานพูดเร็วมาก คุณฟังไม่เข้าใจ",
        "a day off from work": "วันหยุดจากงานหนึ่งวัน",
        "a day with no work": "วันที่ไม่ต้องทำงาน",
        "a fixed time to see the doctor": "เวลานัดพบหมอ",
        "a paper from the doctor that says you are sick": "ใบจากหมอที่บอกว่าคุณป่วย",
        "a seat for old, pregnant or hurt people":
            "ที่นั่งสำหรับผู้สูงอายุ หญิงตั้งครรภ์ หรือผู้บาดเจ็บ",
        "a short rest from work": "พักจากงานสั้นๆ",
        "a small place where a doctor sees you": "ที่เล็กๆ ที่หมอตรวจคุณ",
        "a smaller amount": "ปริมาณน้อยลง",
        "a station where you change to another line": "สถานีที่คุณเปลี่ยนไปอีกสาย",
        "add money to your card": "เติมเงินลงบัตร",
        "bring the food home in a box": "ใส่กล่องเอาอาหารกลับบ้าน",
        "change to another train line": "เปลี่ยนไปรถไฟอีกสาย",
        "eat here, at a table": "กินที่นี่ ที่โต๊ะ",
        "get off the train": "ลงจากรถไฟ",
        "hot, with chilli": "เผ็ด ใส่พริก",
        "it hurts": "เจ็บ",
        "not safe; you can get hurt": "ไม่ปลอดภัย คุณอาจบาดเจ็บได้",
        "one more time": "อีกครั้ง",
        "one small shop inside a hawker centre": "ร้านเล็กๆ หนึ่งร้านในศูนย์อาหาร",
        "paper money and coins": "ธนบัตรและเหรียญ",
        "rice with chicken, a common Singapore meal": "ข้าวกับไก่ อาหารทั่วไปของสิงคโปร์",
        "something to drink, like tea or juice": "เครื่องดื่ม เช่น ชาหรือน้ำผลไม้",
        "stay home and sleep": "อยู่บ้านและนอนพัก",
        "strong shoes for work": "รองเท้าแข็งแรงสำหรับทำงาน",
        "the boss at your worksite": "หัวหน้าที่ไซต์งานของคุณ",
        "the money you get for your work": "เงินที่คุณได้จากการทำงาน",
        "the money you pay for the trip": "เงินที่คุณจ่ายค่าเดินทาง",
        "the way out of the station": "ทางออกจากสถานี",
        "touch your card at the gate when you leave": "แตะบัตรที่ประตูตอนออก",
        "wait for the next train": "รอรถไฟขบวนถัดไป",
        "what is the price": "ราคาเท่าไหร่",
        "what you take to get better": "สิ่งที่คุณกินเพื่อให้หายป่วย",
        "when air comes out of your mouth with a loud sound": "เมื่อลมออกจากปากพร้อมเสียงดัง",
        "where you wait for the train": "ที่ที่คุณรอรถไฟ",
        "your body is injured": "ร่างกายของคุณบาดเจ็บ",
        "your body is very hot": "ตัวของคุณร้อนมาก",
        // AI Words (workshop lesson)
        "AI Words": "คำศัพท์ AI",
        "Know the key words people use when they talk about AI.": "รู้จักคำสำคัญที่คนใช้เวลาพูดถึง AI",
        "computer programs that can do tasks that usually need a human mind":
            "โปรแกรมคอมพิวเตอร์ที่ทำงานที่ปกติต้องใช้สมองคนได้",
        "how an AI gets better by learning patterns from lots of examples":
            "วิธีที่ AI เก่งขึ้นโดยเรียนรู้รูปแบบจากตัวอย่างจำนวนมาก",
        "the examples (text, photos, recordings) an AI learns from":
            "ตัวอย่างที่ AI ใช้เรียนรู้ (ข้อความ รูปภาพ เสียงที่บันทึกไว้)",
        "an AI you have a conversation with by typing, like ChatGPT or Gemini":
            "AI ที่คุณคุยด้วยโดยการพิมพ์ เช่น ChatGPT หรือ Gemini",
        "the question or instruction you type or say to an AI": "คำถามหรือคำสั่งที่คุณพิมพ์หรือพูดกับ AI",
        "AI that creates new things: text, pictures, music or video":
            "AI ที่สร้างสิ่งใหม่ๆ: ข้อความ รูปภาพ เพลง หรือวิดีโอ",
        "an AI that listens to your voice and answers out loud, like Siri":
            "AI ที่ฟังเสียงของคุณและตอบออกมาเป็นเสียง เช่น Siri",
        "AI that can tell what is in a photo": "AI ที่บอกได้ว่าในรูปภาพมีอะไร",
        "when an AI confidently gives an answer that is made up or wrong":
            "เมื่อ AI ตอบอย่างมั่นใจ แต่เป็นคำตอบที่แต่งขึ้นมาเองหรือผิด",
        "Saying the AI gave a confident answer that was false.": "บอกว่า AI ตอบอย่างมั่นใจ แต่คำตอบนั้นไม่จริง",
        "Suggesting a more detailed question to get a better answer.":
            "แนะนำให้ถามละเอียดขึ้นเพื่อให้ได้คำตอบที่ดีกว่า",
        "Which one is a chatbot?": "อันไหนคือ chatbot?",
        "Which word fits?": "คำไหนเหมาะที่สุด?",
        "Your friend has been using a chatbot and looks confused.": "เพื่อนของคุณใช้ chatbot อยู่ และดูสับสน",
        "Your friend searched for the book and could not find it anywhere.":
            "เพื่อนของคุณค้นหาหนังสือเล่มนั้น แต่หาไม่เจอที่ไหนเลย",
        "Saying it was an AI that answers out loud.": "บอกว่านั่นคือ AI ที่ตอบออกมาเป็นเสียง",
        "Saying it was the examples the AI learned from.": "บอกว่านั่นคือตัวอย่างที่ AI ใช้เรียนรู้",
        "Your friend asked a chatbot to plan a trip.": "เพื่อนของคุณขอให้ chatbot วางแผนการเดินทาง",
        "The answer did not have enough detail to be useful.": "คำตอบไม่มีรายละเอียดพอที่จะเอาไปใช้ได้",
        "Suggesting they change what the AI learned from.": "แนะนำให้เปลี่ยนสิ่งที่ AI ใช้เรียนรู้",
        "Suggesting they use an AI that reads photos.": "แนะนำให้ใช้ AI ที่อ่านรูปภาพได้",
        "A chatbot answers whatever you type, and what you type is your prompt. Try the ideas below, or ask anything you like.":
            "chatbot จะตอบทุกอย่างที่คุณพิมพ์ และสิ่งที่คุณพิมพ์คือ prompt ของคุณ ลองไอเดียด้านล่าง หรือถามอะไรก็ได้ที่อยากรู้",
        "Say exactly what you want.": "บอกให้ชัดว่าคุณต้องการอะไร",
        "Give context: who it is for, and limits like time or budget.":
            "ให้ข้อมูลประกอบ: สำหรับใคร และข้อจำกัด เช่น เวลาหรืองบประมาณ",
        "Say the format: a list, three sentences, a short message.":
            "บอกรูปแบบที่ต้องการ: เป็นรายการ สามประโยค หรือข้อความสั้นๆ",
        "Not happy with the answer? Ask a follow-up to change it.": "ไม่พอใจคำตอบ? ถามต่อ (follow-up) เพื่อให้แก้ไข",
        "Ask about an AI word": "ถามเกี่ยวกับคำศัพท์ AI",
        "Pick any word from the lesson and ask the chatbot to explain it.":
            "เลือกคำไหนก็ได้จากบทเรียน แล้วให้ chatbot อธิบาย",
        "Send a vague prompt": "ส่ง prompt ที่ไม่ชัดเจน",
        "Send this short prompt and see what comes back.": "ส่ง prompt สั้นๆ นี้ แล้วดูว่าได้คำตอบอะไร",
        "Now add the details": "ทีนี้เพิ่มรายละเอียด",
        "Same request with context, limits and a format. Compare the two answers.":
            "คำขอเดิม แต่เพิ่มข้อมูลประกอบ ข้อจำกัด และรูปแบบ แล้วเทียบคำตอบทั้งสอง",
        "Make something new": "สร้างสิ่งใหม่",
        "That's generative AI: it writes something that did not exist before.":
            "นี่คือ generative AI: มันเขียนสิ่งที่ไม่เคยมีมาก่อน",
        "Ask a follow-up": "ถามต่อ (follow-up)",
        "Change the last answer without starting again.": "แก้คำตอบล่าสุดโดยไม่ต้องเริ่มใหม่",
        "Check for a hallucination": "ตรวจหา hallucination",
        "Ask for facts, then ask if it is sure. Chatbots can sound confident and still be wrong.":
            "ถามข้อเท็จจริง แล้วถามว่ามันแน่ใจไหม chatbot อาจฟังดูมั่นใจแต่ก็ยังผิดได้",
        "Getting to know someone": "ทำความรู้จักคนใหม่",
        "Say your name and where you are from, and ask new people about themselves.":
            "บอกชื่อและบอกว่าคุณมาจากไหน แล้วถามเรื่องของคนที่เพิ่งรู้จัก",
        "People in Singapore often say \"Have you eaten?\" as a friendly hello. You can say \"Yes, thank you.\"":
            "คนในสิงคโปร์มักทักทายอย่างเป็นกันเองว่า \"Have you eaten?\" คุณตอบได้ว่า \"Yes, thank you.\"",
        "People may call an older woman \"Aunty\" and an older man \"Uncle\". It is polite, even if you are not family.":
            "คนอาจเรียกผู้หญิงที่อายุมากกว่าว่า \"Aunty\" และผู้ชายที่อายุมากกว่าว่า \"Uncle\" เป็นคำเรียกที่สุภาพ แม้ไม่ได้เป็นญาติกัน",
        "You do not have to answer every question. If someone asks about your pay or your family and you do not want to say, you can smile and change the topic.":
            "คุณไม่ต้องตอบทุกคำถาม ถ้ามีคนถามเรื่องค่าจ้างหรือครอบครัวแล้วคุณไม่อยากบอก คุณยิ้มและเปลี่ยนเรื่องคุยได้",
        "The best way to learn is to talk. Say hello to one new person on your day off.":
            "วิธีเรียนที่ดีที่สุดคือพูด ลองทักทายคนใหม่สักคนในวันหยุด",
        "what people call you": "ชื่อที่คนใช้เรียกคุณ",
        "a place like India or Bangladesh": "สถานที่อย่างประเทศอินเดียหรือบังกลาเทศ",
        "your parents, husband or wife, and children": "พ่อแม่ สามีหรือภรรยา และลูกของคุณ",
        "young boys and girls; sons and daughters": "เด็กผู้ชายและเด็กผู้หญิง ลูกชายและลูกสาว",
        "someone you like and spend time with": "คนที่คุณชอบและใช้เวลาด้วยกัน",
        "the work you do for money": "งานที่คุณทำเพื่อได้เงิน",
        "something you like to do in your free time": "สิ่งที่คุณชอบทำในเวลาว่าง",
        "the day after Saturday; many workers rest": "วันถัดจากวันเสาร์ คนทำงานหลายคนได้พัก",
        "Asking someone's name.": "ถามชื่อของอีกคน",
        "Telling someone your name.": "บอกชื่อของคุณ",
        "Asking which country someone comes from.": "ถามว่าอีกคนมาจากประเทศไหน",
        "Asking what work someone does.": "ถามว่าอีกคนทำงานอะไร",
        "Saying you are happy to meet someone new.": "บอกว่าดีใจที่ได้รู้จักคนใหม่",
        "Asking about someone's day off.": "ถามเรื่องวันหยุดของอีกคน",
        "You meet someone new at the park on your day off.": "คุณเจอคนใหม่ที่สวนสาธารณะในวันหยุด",
        "The new person asks your name.": "คนที่เพิ่งรู้จักถามชื่อคุณ",
        "Your friend brings a new person to meet you.": "เพื่อนพาคนใหม่มาให้คุณรู้จัก",
        "The new person tells you her name.": "ผู้หญิงที่เพิ่งรู้จักบอกชื่อของเธอ",
        "What is your job?": "คุณทำงานอะไร?",
        "Helping at home": "ช่วยงานที่บ้าน",
        "Understand what to do at home, say what you have finished, and ask when you are not sure.":
            "เข้าใจงานที่ต้องทำที่บ้าน บอกว่างานไหนเสร็จแล้ว และถามเมื่อไม่แน่ใจ",
        "Never lean out of a window to clean it or to hang clothes. If someone asks you to, say it is not safe.":
            "อย่าโน้มตัวออกนอกหน้าต่างเพื่อเช็ดหน้าต่างหรือตากผ้า ถ้ามีคนสั่งให้ทำ ให้บอกว่าไม่ปลอดภัย",
        "Never throw anything out of a window. Put rubbish in the rubbish chute or the bin.":
            "อย่าทิ้งอะไรออกนอกหน้าต่าง ให้ทิ้งขยะในช่องทิ้งขยะที่มีฝาโลหะในครัว หรือในถังขยะ",
        "Never mix bleach with other cleaning products. The gas can hurt you.":
            "อย่าผสมน้ำยาฟอกขาวกับน้ำยาทำความสะอาดอื่น ก๊าซที่เกิดขึ้นอาจเป็นอันตรายต่อคุณ",
        "If you do not know how to use a machine, ask first. It is better to ask than to break it.":
            "ถ้าไม่รู้วิธีใช้เครื่อง ให้ถามก่อน ถามดีกว่าทำเครื่องพัง",
        "clothes to wash": "เสื้อผ้าที่ต้องซัก",
        "a hot tool that makes clothes flat": "เครื่องมือร้อนที่ทำให้เสื้อผ้าเรียบ",
        "a stick with cloth for washing the floor": "ไม้ที่มีผ้าติดไว้สำหรับถูพื้น",
        "plates and bowls you eat from": "จานและชามที่ใช้กินอาหาร",
        "things you throw away": "สิ่งของที่คุณทิ้ง",
        "a cold box that keeps food fresh": "ตู้เย็นที่ช่วยให้อาหารสด",
        "where you cook food with fire": "ที่ทำอาหารด้วยไฟ",
        "a place with doors to keep things": "ที่เก็บของซึ่งมีบานประตู",
        "Asking what work comes after this.": "ถามว่าต้องทำงานอะไรต่อ",
        "Saying the laundry is done.": "บอกว่าซักผ้าเสร็จแล้ว",
        "Asking where something goes.": "ถามว่าต้องวางของไว้ที่ไหน",
        "Asking someone to show you the way to do it.": "ขอให้อีกคนแสดงวิธีทำ",
        "Saying sorry and telling the truth about a broken plate.":
            "ขอโทษและบอกความจริงเรื่องจานที่แตก",
        "You finished washing the clothes. Your employer comes into the room.":
            "คุณซักผ้าเสร็จแล้ว นายจ้างเดินเข้ามาในห้อง",
        "Your employer asks if the clothes are washed.": "นายจ้างถามว่าซักผ้าแล้วหรือยัง",
        "There is a new iron at home. You do not know how to use it.":
            "มีเตารีดใหม่ที่บ้าน คุณไม่รู้วิธีใช้",
        "Your employer asks you to iron the shirts.": "นายจ้างขอให้คุณรีดเสื้อเชิ้ต",
        "Sorry, I broke a plate.": "ขอโทษด้วย ฉันทำจานแตก",
        "Reading signs": "อ่านป้าย",
        "Read the signs you see every day, and ask when you do not understand one.":
            "อ่านป้ายที่เห็นทุกวัน ถ้าไม่เข้าใจให้ถาม",
        "Red signs usually mean stop or danger. Yellow means be careful. Green usually means safe, or the way out.":
            "ป้ายสีแดงมักหมายถึงให้หยุดหรือมีอันตราย สีเหลืองหมายถึงให้ระวัง สีเขียวมักหมายถึงปลอดภัยหรือทางออก",
        "You can be fined for smoking where it is not allowed. Many places have a yellow box that shows where you can smoke.":
            "คุณอาจถูกปรับถ้าสูบบุหรี่ในที่ห้ามสูบ หลายแห่งมีกรอบสีเหลืองบอกบริเวณที่สูบบุหรี่ได้",
        "Many signs in Singapore are in English, Chinese, Malay and Tamil. If your language is there, read it first, then look for the English word.":
            "ป้ายหลายแห่งในสิงคโปร์มีภาษาอังกฤษ จีน มาเลย์ และทมิฬ ถ้ามีภาษาของคุณ ให้อ่านก่อน แล้วหาคำภาษาอังกฤษ",
        "Not sure what a sign means? Take a photo and ask someone. Do not go past a danger sign.":
            "ไม่แน่ใจว่าป้ายหมายถึงอะไร? ถ่ายรูปแล้วถามใครสักคน อย่าเดินเลยป้ายเตือนอันตรายเข้าไป",
        "the floor has water; you can slip": "มีน้ำบนพื้น คุณอาจลื่น",
        "do not go in": "อย่าเข้าไป",
        "do not smoke here": "อย่าสูบบุหรี่ที่นี่",
        "not open now": "ตอนนี้ยังไม่เปิด",
        "press the door away from you": "ดันประตูออกห่างจากตัว",
        "bring the door towards you": "ดึงประตูเข้าหาตัว",
        "the room with a toilet, in a public place": "ห้องที่มีส้วมในที่สาธารณะ",
        "something here can hurt you": "มีบางอย่างที่นี่ทำให้คุณบาดเจ็บได้",
        "Asking someone to explain a sign.": "ขอให้อีกคนอธิบายป้าย",
        "Telling someone to be careful of the wet floor.": "เตือนให้ระวังพื้นเปียก",
        "Asking the way to the toilet.": "ถามทางไปห้องน้ำ",
        "Saying a shop is not open.": "บอกว่าร้านยังไม่เปิด",
        "Telling someone they are not allowed to enter.": "บอกอีกคนว่าเข้าไปไม่ได้",
        "You are new in a building and you need the toilet. You see a cleaner.":
            "คุณเพิ่งมาอาคารนี้และต้องการเข้าห้องน้ำ คุณเห็นพนักงานทำความสะอาด",
        "The cleaner asks if you need help.": "พนักงานทำความสะอาดถามว่าต้องการความช่วยเหลือไหม",
        "Your friend is walking to a door with a red No Entry sign.":
            "เพื่อนกำลังเดินไปที่ประตูซึ่งมีป้าย No Entry สีแดง",
        "Your friend asks if they can go in.": "เพื่อนถามว่าเข้าไปได้ไหม",
        "The shop is closed.": "ร้านปิดแล้ว",
        "Buses and finding your way": "รถเมล์และการหาทาง",
        "Find the right bus, get off at your stop, and ask for directions when you are lost.":
            "หารถเมล์ที่ถูกสาย ลงป้ายของคุณ และถามทางเมื่อหลง",
        "Tap your card when you get on the bus and again when you get off. If you forget to tap when you get off, you can pay more.":
            "แตะบัตรตอนขึ้นรถเมล์และแตะอีกครั้งตอนลง ถ้าลืมแตะตอนลง คุณอาจเสียค่าโดยสารมากขึ้น",
        "Press the bell just before your stop. If nobody presses it and nobody is waiting, the bus does not stop.":
            "กดกริ่งก่อนถึงป้ายของคุณเล็กน้อย ถ้าไม่มีใครกดและไม่มีคนรอ รถเมล์จะไม่จอด",
        "Raise your hand when your bus comes, so the driver knows to stop.":
            "ยกมือเมื่อรถเมล์ของคุณมา คนขับจะได้รู้ว่าต้องจอด",
        "Cross the road at a traffic light or an overhead bridge. You can be fined for crossing somewhere else nearby.":
            "ข้ามถนนตรงสัญญาณไฟจราจรหรือใช้สะพานลอยคนข้าม คุณอาจถูกปรับถ้าข้ามตรงจุดอื่นใกล้ ๆ",
        "where you wait for the bus": "ที่ที่คุณรอรถเมล์",
        "press it to ask the bus to stop": "กดเพื่อขอให้รถเมล์จอด",
        "the side of your left hand": "ด้านเดียวกับมือซ้ายของคุณ",
        "the side of your right hand": "ด้านเดียวกับมือขวาของคุณ",
        "keep going ahead; do not turn": "ตรงไปเรื่อย ๆ อย่าเลี้ยว",
        "the lights that say stop or go": "ไฟที่บอกให้หยุดหรือไป",
        "a bridge for walking over a road": "สะพานสำหรับเดินข้ามถนน",
        "a picture that shows where places are": "รูปที่แสดงว่าสถานที่ต่าง ๆ อยู่ตรงไหน",
        "Asking which bus to take.": "ถามว่าต้องขึ้นรถเมล์สายไหน",
        "Asking the way to the bus stop.": "ถามทางไปป้ายรถเมล์",
        "Telling someone the way.": "บอกทางให้อีกคน",
        "Saying you do not know where you are.": "บอกว่าคุณไม่รู้ว่าตัวเองอยู่ที่ไหน",
        "Asking someone to tell you when to get off.": "ขอให้อีกคนบอกเมื่อถึงเวลาลง",
        "You are at a bus stop and want to go to Little India. A woman is waiting next to you.":
            "คุณอยู่ที่ป้ายรถเมล์และอยากไป Little India มีผู้หญิงรออยู่ข้างคุณ",
        "The woman asks if you are waiting for a bus.": "ผู้หญิงถามว่าคุณกำลังรอรถเมล์หรือ",
        "You do not know this road and your phone has no battery. You see a man walking.":
            "คุณไม่รู้จักถนนนี้และแบตเตอรี่โทรศัพท์หมด คุณเห็นผู้ชายกำลังเดิน",
        "The man asks if he can help you.": "ผู้ชายถามว่าให้ช่วยไหม",
        "Please tell me my stop.": "ช่วยบอกเมื่อถึงป้ายที่ฉันต้องลงด้วย",
        "At the supermarket": "ที่ซูเปอร์มาร์เก็ต",
        "Find what you need, check the price and the date, and pay at the counter.":
            "หาของที่ต้องการ ดูราคาและวันที่ แล้วจ่ายเงินที่เคาน์เตอร์",
        "Big supermarkets charge at least 5 cents for each plastic bag. Bring your own bag to save money.":
            "ซูเปอร์มาร์เก็ตใหญ่คิดค่าถุงพลาสติกอย่างน้อยถุงละ 5 เซนต์ นำถุงมาเองเพื่อประหยัดเงิน",
        "Look for the date on food before you buy it. \"Best before\" and \"Use by\" tell you how long it is good.":
            "ดูวันที่บนอาหารก่อนซื้อ \"Best before\" และ \"Use by\" บอกว่าอาหารยังดีถึงเมื่อไร",
        "Keep the receipt when you shop for someone else, so you can show what you spent.":
            "เก็บใบเสร็จไว้เมื่อซื้อของให้คนอื่น เพื่อแสดงว่าใช้เงินไปเท่าไร",
        "The cashier may ask if you have a member card. If you do not have one, just say no.":
            "พนักงานเก็บเงินอาจถามว่ามีบัตรสมาชิกไหม ถ้าไม่มี ก็บอกว่าไม่มี",
        "a big basket on wheels": "ตะกร้าใบใหญ่ที่มีล้อ",
        "the walkway between shelves": "ทางเดินระหว่างชั้นวางของ",
        "the person you pay": "คนที่คุณจ่ายเงินให้",
        "the paper that shows what you paid": "กระดาษที่แสดงว่าคุณจ่ายเงินอะไรไป",
        "a lower price than usual": "ราคาที่ถูกกว่าปกติ",
        "the last day the food is good": "วันสุดท้ายที่อาหารยังดีอยู่",
        "a thin bag to carry your shopping": "ถุงบางสำหรับใส่ของที่ซื้อ",
        "plants you cook and eat, like carrots": "พืชที่นำมาทำอาหารและกิน เช่น แครอต",
        "Asking where to find something.": "ถามว่าหาของได้ที่ไหน",
        "Asking if the price is lower today.": "ถามว่าวันนี้ราคาถูกลงไหม",
        "Asking the cashier for a bag.": "ขอถุงจากพนักงานเก็บเงิน",
        "Asking the cashier for the receipt.": "ขอใบเสร็จจากพนักงานเก็บเงิน",
        "Telling staff that the food is past its date.": "บอกพนักงานว่าอาหารเลยวันที่กำหนดแล้ว",
        "You are paying at the counter. You do not have your own bag.":
            "คุณกำลังจ่ายเงินที่เคาน์เตอร์ คุณไม่ได้เอาถุงมาเอง",
        "The cashier tells you the price.": "พนักงานเก็บเงินบอกราคา",
        "The milk in your basket is past its date. You show it to a staff member.":
            "นมในตะกร้าของคุณหมดอายุแล้ว คุณเอาให้พนักงานดู",
        "A staff member asks if they can help you.": "พนักงานคนหนึ่งถามว่าให้ช่วยไหม",
        "Is this on discount?": "อันนี้ลดราคาไหม?",
        "Construction science": "วิทยาศาสตร์งานก่อสร้าง",
        "Learn the main building materials, why a building stays up, and how to warn others about a problem.":
            "เรียนรู้วัสดุก่อสร้างหลัก เหตุผลที่อาคารตั้งอยู่ได้ และวิธีเตือนคนอื่นเมื่อมีปัญหา",
        "Concrete is strong when it is pressed, but it cracks when it is pulled. That is why steel bars go inside it.":
            "คอนกรีตรับแรงกดได้ดี แต่จะแตกร้าวเมื่อถูกดึง จึงต้องใส่เหล็กเส้นไว้ข้างใน",
        "Too much water makes concrete weak. Use only the amount of water your supervisor tells you.":
            "น้ำมากเกินไปทำให้คอนกรีตไม่แข็งแรง ใช้น้ำตามปริมาณที่หัวหน้างานบอกเท่านั้น",
        "Concrete goes hard slowly. It takes about 28 days to reach full strength, so ask your supervisor before you put weight on it.":
            "คอนกรีตค่อย ๆ แข็งตัว ใช้เวลาประมาณ 28 วันจึงแข็งแรงเต็มที่ ถามหัวหน้างานก่อนวางของหนักลงไป",
        "A building carries its weight down: from the floor to the beams, to the columns, then into the ground. Never cut a beam or a column without permission.":
            "น้ำหนักอาคารถ่ายลงด้านล่าง จากพื้นไปคาน ไปเสา แล้วลงดิน อย่าตัดคานหรือเสาโดยไม่ได้รับอนุญาต",
        "Every scaffold has a weight limit. Too much weight can make it fall, so do not add more than you are told.":
            "นั่งร้านทุกชุดมีขีดจำกัดน้ำหนัก น้ำหนักมากเกินไปทำให้พังได้ อย่าวางน้ำหนักเกินที่บอก",
        "cement, sand, stones and water mixed; it goes hard":
            "ปูนซีเมนต์ ทราย หิน และน้ำผสมกัน แล้วจะแข็งตัว",
        "the grey powder that holds concrete together": "ผงสีเทาที่ช่วยยึดคอนกรีตเข้าด้วยกัน",
        "a long metal rod inside concrete": "เหล็กเส้นยาวที่อยู่ในคอนกรีต",
        "a strong part that goes across and holds up a floor":
            "ส่วนแข็งแรงที่พาดแนวนอนและรองรับพื้น",
        "a strong part that stands up and carries the weight": "ส่วนแข็งแรงที่ตั้งตรงและรับน้ำหนัก",
        "the weight something must carry": "น้ำหนักที่สิ่งหนึ่งต้องรับ",
        "a tool that shows if something is flat": "เครื่องมือที่บอกว่าพื้นผิวได้ระดับหรือไม่",
        "a metal frame you stand on to work up high": "โครงโลหะที่ใช้ยืนทำงานบนที่สูง",
        "Warning that the concrete is not hard yet.": "เตือนว่าคอนกรีตยังไม่แข็ง",
        "Saying that something weighs too much.": "บอกว่าของหนักเกินไป",
        "Telling someone to stop adding water to the mix.": "บอกให้หยุดเติมน้ำลงในส่วนผสม",
        "Reporting a crack to your supervisor.": "รายงานรอยร้าวให้หัวหน้างานทราบ",
        "Asking someone to make sure the scaffold is safe.": "ขอให้ตรวจดูว่านั่งร้านปลอดภัย",
        "A worker is about to walk on the floor you poured this morning.":
            "คนงานกำลังจะเดินบนพื้นที่คุณเทคอนกรีตเมื่อเช้า",
        "The worker asks if he can walk here.": "คนงานถามว่าเดินตรงนี้ได้ไหม",
        "Your co-worker is mixing concrete and keeps pouring in water.":
            "เพื่อนร่วมงานกำลังผสมคอนกรีตและเทน้ำลงไปเรื่อย ๆ",
        "Your co-worker wants to add more water.": "เพื่อนร่วมงานอยากเติมน้ำอีก",
        "There is a crack in this column.": "เสาต้นนี้มีรอยร้าว",
    },
    vi: {
        'Signs and announcements say "alight". It means get off the train.':
            'Biển báo và thông báo nói "alight". Nghĩa là xuống tàu.',
        'Say "take away" to bring the food home. Some stalls charge a little more for the box.':
            'Nói "take away" để mang đồ ăn về nhà. Một số quầy tính thêm một chút cho hộp.',
        'A tissue packet on a table means someone has taken that seat. People call this "chope".':
            'Một gói khăn giấy trên bàn nghĩa là ai đó đã giữ chỗ ngồi đó. Người ta gọi đây là "chope".',
        "A meal at a hawker centre or coffee shop usually costs 4 to 7 dollars. Most stalls take cash, and many take PayNow.":
            "Một bữa ăn ở khu ẩm thực hoặc quán cà phê thường có giá 4 đến 7 đô. Hầu hết các quầy nhận tiền mặt, và nhiều quầy nhận PayNow.",
        "A quick practice with words from every lesson. New every day.":
            "Luyện nhanh các từ trong mọi bài học. Nội dung mới mỗi ngày.",
        "After eating, return your tray and plates to the tray return point. It is the rule, and there can be a fine.":
            "Sau khi ăn, hãy trả khay và đĩa về điểm trả khay. Đó là quy định, và có thể bị phạt.",
        "Ask the doctor for an MC. Give it to your employer so your sick day is counted as sick leave.":
            "Xin bác sĩ giấy nghỉ bệnh (MC). Đưa cho chủ để ngày bệnh của bạn được tính là nghỉ ốm.",
        "Ask your supervisor to say it again, say when something is not safe, and ask for a day off.":
            "Nhờ quản lý nói lại, báo khi có điều không an toàn và xin nghỉ một ngày.",
        "Asking for a day with no work.": "Xin một ngày không làm việc.",
        "Asking for less chilli.": "Xin ít ớt hơn.",
        "Asking how often to take the medicine.": "Hỏi bao lâu uống thuốc một lần.",
        "Asking people to let you off the train.": "Nhờ mọi người nhường lối để bạn xuống tàu.",
        "Asking someone to repeat what they said.": "Nhờ ai đó nhắc lại điều họ vừa nói.",
        "Asking the doctor for a sick-leave paper.": "Xin bác sĩ giấy nghỉ bệnh.",
        "Asking the price.": "Hỏi giá.",
        "Asking to add ten dollars to your card.": "Yêu cầu nạp mười đô vào thẻ.",
        "Asking which platform goes to Jurong East.": "Hỏi sân ga nào đi Jurong East.",
        "At a hawker centre, you order at the stall, pay, and carry the food to a table yourself.":
            "Ở khu ẩm thực, bạn gọi món tại quầy, trả tiền, rồi tự bưng đồ ăn ra bàn.",
        "At work": "Tại nơi làm việc",
        "Buying food": "Mua đồ ăn",
        "Daily mix": "Bài luyện tập hằng ngày",
        "Fill in the missing word": "Điền từ còn thiếu",
        "Find the right platform, top up your card, and get off at the right stop.":
            "Tìm đúng sân ga, nạp tiền vào thẻ và xuống đúng trạm.",
        "How many times a day?": "Một ngày mấy lần?",
        "How much?": "Bao nhiêu tiền?",
        "If work is not safe, tell your supervisor. You can say no to unsafe work. You can also call MOM at 6438 5122.":
            "Nếu công việc không an toàn, hãy nói với quản lý. Bạn có thể từ chối việc không an toàn. Bạn cũng có thể gọi MOM theo số 6438 5122.",
        "If you are hurt at work, tell your supervisor the same day and see a doctor. Keep the MC and every receipt.":
            "Nếu bị thương khi làm việc, hãy báo quản lý ngay trong ngày và đi khám bác sĩ. Giữ giấy nghỉ bệnh và mọi hóa đơn.",
        "If you are sick, go to a clinic near your dormitory or a polyclinic. In an emergency, call 995 for an ambulance.":
            "Nếu bị bệnh, hãy đến phòng khám gần ký túc xá hoặc phòng khám đa khoa. Khẩn cấp thì gọi 995 để gọi xe cứu thương.",
        "If your employer does not let you see a doctor, call MOM at 6438 5122 or the Migrant Workers' Centre at 6536 2692.":
            "Nếu chủ không cho bạn đi khám, hãy gọi MOM theo số 6438 5122 hoặc Trung tâm Lao động Nhập cư theo số 6536 2692.",
        "In an emergency, call 995 for an ambulance.": "Khẩn cấp thì gọi 995 để gọi xe cứu thương.",
        "It is your turn at the chicken rice stall.": "Đến lượt bạn ở quầy cơm gà.",
        "Listen. Tap what you hear": "Nghe. Chạm vào từ bạn nghe được",
        "Listen. What does it mean?": "Nghe. Nó có nghĩa là gì?",
        "My salary is late.": "Lương của tôi bị trễ.",
        "Order at a food stall, ask the price, and say how you want it.":
            "Gọi món tại quầy, hỏi giá và nói cách bạn muốn món ăn được chuẩn bị.",
        "Ordering a drink without ice.": "Gọi đồ uống không đá.",
        "Ordering one chicken rice to bring home.": "Gọi một phần cơm gà mang về.",
        "Pointing to where it hurts.": "Chỉ vào chỗ đau.",
        "Put the words in order": "Sắp xếp các từ theo thứ tự",
        "Say this in English": "Nói câu này bằng tiếng Anh",
        "Say what is wrong, ask for an MC, and understand how to take your medicine.":
            "Nói vấn đề của bạn, xin giấy nghỉ bệnh và hiểu cách dùng thuốc.",
        "Saying thank you to an older man.": "Cảm ơn một người đàn ông lớn tuổi.",
        "Saying thank you.": "Nói cảm ơn.",
        "Saying that something is not safe.": "Nói rằng có điều gì đó không an toàn.",
        "Saying that you are injured.": "Nói rằng bạn bị thương.",
        "Saying you want the food in a box, not on a plate.":
            "Nói bạn muốn đồ ăn đựng trong hộp, không phải trên đĩa.",
        "Saying your pay has not come on time.": "Nói rằng lương của bạn chưa được trả đúng hạn.",
        "Seats in a different colour are reserved seats. Give them to old people, pregnant women, and anyone who is hurt.":
            "Ghế có màu khác là ghế ưu tiên. Hãy nhường cho người già, phụ nữ mang thai và người bị thương.",
        "Seeing a doctor": "Đi khám bác sĩ",
        "Stand on the left side of the escalator so people can walk past on the right.":
            "Đứng bên trái thang cuốn để người khác có thể đi qua bên phải.",
        "Take medicine the way the doctor says: how many times a day, and before or after food.":
            "Uống thuốc theo lời bác sĩ: một ngày mấy lần, trước hay sau khi ăn.",
        "Taking the MRT": "Đi tàu MRT",
        "Tap the pairs": "Chạm vào các cặp",
        "Tap your card at the gate when you go in and again when you go out. If you forget to tap out, you pay the highest fare.":
            "Chạm thẻ ở cổng khi vào và chạm lại khi ra. Nếu quên chạm khi ra, bạn phải trả mức vé cao nhất.",
        "Telling staff your card is not working at the gate.":
            "Báo nhân viên rằng thẻ của bạn không dùng được ở cổng.",
        "Telling the doctor your body is hot.": "Nói với bác sĩ rằng người bạn nóng.",
        "The doctor asks what is wrong.": "Bác sĩ hỏi bạn bị làm sao.",
        "The doctor asks where it hurts.": "Bác sĩ hỏi đau ở đâu.",
        "The doctor wants to know where it hurts.": "Bác sĩ muốn biết đau ở đâu.",
        "The seller asks for your order.": "Người bán hỏi bạn muốn gọi gì.",
        "The seller asks if you will eat here or bring it home.":
            "Người bán hỏi bạn ăn ở đây hay mang về.",
        "The staff member asks if you need help.": "Nhân viên hỏi bạn có cần giúp không.",
        "The supervisor asks what happened.": "Quản lý hỏi chuyện gì đã xảy ra.",
        "The supervisor gives a long instruction.": "Quản lý đưa ra một chỉ dẫn dài.",
        "Top up your card for free at the machine inside the station. 7-Eleven and Cheers shops also top up, but they charge a small fee each time.":
            "Nạp thẻ miễn phí tại máy trong ga. Cửa hàng 7-Eleven và Cheers cũng nạp được, nhưng thu một khoản phí nhỏ mỗi lần.",
        "Use the same card or phone both times. If you tap in with your card and out with your phone, the trip will not match.":
            "Dùng cùng một thẻ hoặc điện thoại cho cả hai lần. Nếu vào bằng thẻ mà ra bằng điện thoại, chuyến đi sẽ không khớp.",
        "Wear your helmet, safety boots and vest on the worksite. Your employer must give them to you for free.":
            "Đội mũ bảo hộ, mang giày bảo hộ và áo phản quang ở công trường. Chủ phải cấp miễn phí cho bạn.",
        "What do you say?": "Bạn sẽ nói gì?",
        "What is this called?": "Cái này gọi là gì?",
        "Which one is this?": "Đây là cái nào?",
        "Which platform for Jurong East?": "Sân ga nào đi Jurong East?",
        "You are at a food stall. You want to eat at home.":
            "Bạn đang ở một quầy ăn. Bạn muốn ăn ở nhà.",
        "You are in the doctor's room.": "Bạn đang ở trong phòng khám của bác sĩ.",
        "You fell and your arm is bleeding. Your supervisor runs over.":
            "Bạn bị ngã và cánh tay chảy máu. Quản lý chạy tới.",
        "Your card does not work at the gate. A staff member comes over.":
            "Thẻ của bạn không dùng được ở cổng. Một nhân viên đi tới.",
        "Your employer must pay for your medical care. Keep every receipt.":
            "Chủ phải trả chi phí khám chữa bệnh cho bạn. Giữ mọi hóa đơn.",
        "Your salary must be paid within 7 days after the end of the month. If it is late, call MOM.":
            "Lương phải được trả trong vòng 7 ngày sau cuối tháng. Nếu trễ, hãy gọi MOM.",
        "Your supervisor speaks very fast. You did not understand.":
            "Quản lý của bạn nói rất nhanh. Bạn không hiểu.",
        "a day off from work": "một ngày nghỉ làm",
        "a day with no work": "một ngày không làm việc",
        "a fixed time to see the doctor": "giờ hẹn cố định để gặp bác sĩ",
        "a paper from the doctor that says you are sick": "giấy của bác sĩ xác nhận bạn bị bệnh",
        "a seat for old, pregnant or hurt people":
            "ghế dành cho người già, phụ nữ mang thai hoặc người bị thương",
        "a short rest from work": "nghỉ ngắn giữa giờ làm",
        "a small place where a doctor sees you": "nơi nhỏ để bác sĩ khám cho bạn",
        "a smaller amount": "lượng ít hơn",
        "a station where you change to another line": "ga để đổi sang tuyến khác",
        "add money to your card": "nạp tiền vào thẻ",
        "bring the food home in a box": "mang đồ ăn về nhà trong hộp",
        "change to another train line": "đổi sang tuyến tàu khác",
        "eat here, at a table": "ăn ở đây, tại bàn",
        "get off the train": "xuống tàu",
        "hot, with chilli": "cay, có ớt",
        "it hurts": "đau",
        "not safe; you can get hurt": "không an toàn; bạn có thể bị thương",
        "one more time": "một lần nữa",
        "one small shop inside a hawker centre": "một quầy nhỏ trong khu ẩm thực",
        "paper money and coins": "tiền giấy và tiền xu",
        "rice with chicken, a common Singapore meal": "cơm với gà, món ăn phổ biến ở Singapore",
        "something to drink, like tea or juice": "thứ để uống, như trà hoặc nước ép",
        "stay home and sleep": "ở nhà và ngủ",
        "strong shoes for work": "giày chắc chắn để đi làm",
        "the boss at your worksite": "người quản lý ở công trường của bạn",
        "the money you get for your work": "tiền bạn nhận được cho công việc",
        "the money you pay for the trip": "tiền bạn trả cho chuyến đi",
        "the way out of the station": "lối ra khỏi ga",
        "touch your card at the gate when you leave": "chạm thẻ ở cổng khi ra",
        "wait for the next train": "đợi chuyến tàu tiếp theo",
        "what is the price": "giá bao nhiêu",
        "what you take to get better": "thứ bạn uống để khỏe lại",
        "when air comes out of your mouth with a loud sound":
            "khi không khí bật ra khỏi miệng với tiếng lớn",
        "where you wait for the train": "nơi bạn đợi tàu",
        "your body is injured": "cơ thể bạn bị thương",
        "your body is very hot": "người bạn rất nóng",
        // AI Words (workshop lesson)
        "AI Words": "Từ vựng về AI",
        "Know the key words people use when they talk about AI.":
            "Biết những từ quan trọng mà mọi người dùng khi nói về AI.",
        "computer programs that can do tasks that usually need a human mind":
            "chương trình máy tính làm được những việc thường cần đến bộ óc con người",
        "how an AI gets better by learning patterns from lots of examples":
            "cách AI giỏi lên nhờ học các quy luật từ rất nhiều ví dụ",
        "the examples (text, photos, recordings) an AI learns from":
            "những ví dụ (chữ viết, ảnh, bản ghi âm) mà AI dùng để học",
        "an AI you have a conversation with by typing, like ChatGPT or Gemini":
            "một AI mà bạn trò chuyện bằng cách gõ chữ, như ChatGPT hoặc Gemini",
        "the question or instruction you type or say to an AI": "câu hỏi hoặc yêu cầu mà bạn gõ hoặc nói với AI",
        "AI that creates new things: text, pictures, music or video":
            "AI làm ra những thứ mới: chữ viết, hình ảnh, nhạc hoặc video",
        "an AI that listens to your voice and answers out loud, like Siri":
            "một AI nghe bạn nói và trả lời thành tiếng, như Siri",
        "AI that can tell what is in a photo": "AI có thể cho biết trong ảnh có gì",
        "when an AI confidently gives an answer that is made up or wrong":
            "khi AI tự tin đưa ra câu trả lời bịa ra hoặc sai",
        "Saying the AI gave a confident answer that was false.": "Nói rằng AI đã tự tin đưa ra một câu trả lời sai.",
        "Suggesting a more detailed question to get a better answer.":
            "Gợi ý hỏi chi tiết hơn để có câu trả lời tốt hơn.",
        "Which one is a chatbot?": 'Cái nào là "chatbot"?',
        "Which word fits?": "Từ nào phù hợp?",
        "Your friend has been using a chatbot and looks confused.":
            "Bạn của bạn đang dùng chatbot và trông có vẻ bối rối.",
        "Your friend searched for the book and could not find it anywhere.":
            "Bạn của bạn đã tìm cuốn sách đó nhưng không thấy ở đâu cả.",
        "Saying it was an AI that answers out loud.": "Nói rằng đó là một AI trả lời thành tiếng.",
        "Saying it was the examples the AI learned from.": "Nói rằng đó là những ví dụ mà AI dùng để học.",
        "Your friend asked a chatbot to plan a trip.": "Bạn của bạn nhờ chatbot lên kế hoạch cho một chuyến đi.",
        "The answer did not have enough detail to be useful.": "Câu trả lời không đủ chi tiết để có ích.",
        "Suggesting they change what the AI learned from.": "Gợi ý bạn ấy thay đổi những gì AI dùng để học.",
        "Suggesting they use an AI that reads photos.": "Gợi ý bạn ấy dùng một AI biết đọc ảnh.",
        "A chatbot answers whatever you type, and what you type is your prompt. Try the ideas below, or ask anything you like.":
            "Chatbot trả lời bất cứ điều gì bạn gõ, và điều bạn gõ chính là prompt của bạn. Hãy thử các gợi ý bên dưới, hoặc hỏi bất cứ điều gì bạn muốn.",
        "Say exactly what you want.": "Nói chính xác điều bạn muốn.",
        "Give context: who it is for, and limits like time or budget.":
            "Cho biết bối cảnh: dành cho ai, và giới hạn như thời gian hoặc ngân sách.",
        "Say the format: a list, three sentences, a short message.":
            "Nói rõ hình thức: một danh sách, ba câu, một tin nhắn ngắn.",
        "Not happy with the answer? Ask a follow-up to change it.":
            "Chưa hài lòng với câu trả lời? Hãy hỏi tiếp để nó sửa lại.",
        "Ask about an AI word": "Hỏi về một từ AI",
        "Pick any word from the lesson and ask the chatbot to explain it.":
            "Chọn một từ bất kỳ trong bài và nhờ chatbot giải thích.",
        "Send a vague prompt": "Gửi một prompt mơ hồ",
        "Send this short prompt and see what comes back.": "Gửi prompt ngắn này và xem nhận được gì.",
        "Now add the details": "Giờ thêm chi tiết vào",
        "Same request with context, limits and a format. Compare the two answers.":
            "Cùng yêu cầu đó, thêm bối cảnh, giới hạn và hình thức. So sánh hai câu trả lời.",
        "Make something new": "Tạo ra thứ gì đó mới",
        "That's generative AI: it writes something that did not exist before.":
            "Đó là generative AI: nó viết ra thứ chưa từng có trước đây.",
        "Ask a follow-up": "Hỏi tiếp",
        "Change the last answer without starting again.": "Sửa câu trả lời vừa rồi mà không cần bắt đầu lại.",
        "Check for a hallucination": "Kiểm tra xem có hallucination không",
        "Ask for facts, then ask if it is sure. Chatbots can sound confident and still be wrong.":
            "Hỏi một vài thông tin thực tế, rồi hỏi xem nó có chắc không. Chatbot có thể nói rất tự tin mà vẫn sai.",
        "Getting to know someone": "Làm quen với người mới",
        "Say your name and where you are from, and ask new people about themselves.":
            "Nói tên và quê của bạn, rồi hỏi người mới gặp về bản thân họ.",
        "People in Singapore often say \"Have you eaten?\" as a friendly hello. You can say \"Yes, thank you.\"":
            "Ở Singapore, mọi người thường chào thân thiện bằng câu \"Have you eaten?\" Bạn có thể đáp \"Yes, thank you.\"",
        "People may call an older woman \"Aunty\" and an older man \"Uncle\". It is polite, even if you are not family.":
            "Mọi người có thể gọi phụ nữ lớn tuổi là \"Aunty\" và đàn ông lớn tuổi là \"Uncle\". Cách gọi này lịch sự, dù không phải người nhà.",
        "You do not have to answer every question. If someone asks about your pay or your family and you do not want to say, you can smile and change the topic.":
            "Bạn không cần trả lời mọi câu hỏi. Nếu ai hỏi về lương hay gia đình mà bạn không muốn nói, bạn có thể mỉm cười rồi đổi chuyện.",
        "The best way to learn is to talk. Say hello to one new person on your day off.":
            "Cách học tốt nhất là nói chuyện. Hãy chào một người mới vào ngày nghỉ.",
        "what people call you": "tên mọi người dùng để gọi bạn",
        "a place like India or Bangladesh": "một nơi như Ấn Độ hay Bangladesh",
        "your parents, husband or wife, and children": "bố mẹ, chồng hoặc vợ, và các con của bạn",
        "young boys and girls; sons and daughters": "các bé trai và bé gái; con trai và con gái",
        "someone you like and spend time with": "người bạn quý mến và dành thời gian ở cùng",
        "the work you do for money": "việc bạn làm để kiếm tiền",
        "something you like to do in your free time": "việc bạn thích làm khi rảnh",
        "the day after Saturday; many workers rest":
            "ngày sau thứ Bảy; nhiều người lao động nghỉ vào ngày này",
        "Asking someone's name.": "Hỏi tên một người.",
        "Telling someone your name.": "Nói tên của bạn.",
        "Asking which country someone comes from.": "Hỏi một người đến từ nước nào.",
        "Asking what work someone does.": "Hỏi một người làm nghề gì.",
        "Saying you are happy to meet someone new.": "Nói bạn vui khi được làm quen.",
        "Asking about someone's day off.": "Hỏi về ngày nghỉ của một người.",
        "You meet someone new at the park on your day off.":
            "Bạn gặp một người mới ở công viên vào ngày nghỉ.",
        "The new person asks your name.": "Người mới gặp hỏi tên bạn.",
        "Your friend brings a new person to meet you.":
            "Bạn của bạn dẫn một người mới đến làm quen với bạn.",
        "The new person tells you her name.": "Người phụ nữ mới gặp nói tên của mình.",
        "What is your job?": "Bạn làm nghề gì?",
        "Helping at home": "Giúp việc nhà",
        "Understand what to do at home, say what you have finished, and ask when you are not sure.":
            "Hiểu việc cần làm ở nhà, nói việc đã làm xong và hỏi khi chưa chắc.",
        "Never lean out of a window to clean it or to hang clothes. If someone asks you to, say it is not safe.":
            "Đừng bao giờ nhoài người ra ngoài cửa sổ để lau hay phơi quần áo. Nếu ai bảo làm vậy, hãy nói là không an toàn.",
        "Never throw anything out of a window. Put rubbish in the rubbish chute or the bin.":
            "Đừng ném bất cứ thứ gì ra ngoài cửa sổ. Bỏ rác vào cửa kim loại nhỏ của ống đổ rác trong bếp hoặc vào thùng rác.",
        "Never mix bleach with other cleaning products. The gas can hurt you.":
            "Đừng pha nước tẩy với các chất lau rửa khác. Khí sinh ra có thể gây hại cho bạn.",
        "If you do not know how to use a machine, ask first. It is better to ask than to break it.":
            "Nếu không biết dùng máy, hãy hỏi trước. Hỏi vẫn tốt hơn làm hỏng máy.",
        "clothes to wash": "quần áo cần giặt",
        "a hot tool that makes clothes flat": "dụng cụ nóng làm phẳng quần áo",
        "a stick with cloth for washing the floor": "cây có gắn vải để lau sàn",
        "plates and bowls you eat from": "đĩa và bát dùng để ăn",
        "things you throw away": "những thứ bạn vứt đi",
        "a cold box that keeps food fresh": "tủ lạnh giúp giữ thực phẩm tươi",
        "where you cook food with fire": "nơi dùng lửa để nấu ăn",
        "a place with doors to keep things": "chỗ có cửa để cất đồ",
        "Asking what work comes after this.": "Hỏi sau việc này cần làm việc gì.",
        "Saying the laundry is done.": "Nói đã giặt xong quần áo.",
        "Asking where something goes.": "Hỏi cần để đồ ở đâu.",
        "Asking someone to show you the way to do it.": "Nhờ ai đó chỉ cách làm.",
        "Saying sorry and telling the truth about a broken plate.":
            "Xin lỗi và nói thật về chiếc đĩa bị vỡ.",
        "You finished washing the clothes. Your employer comes into the room.":
            "Bạn đã giặt xong quần áo. Chủ đi vào phòng.",
        "Your employer asks if the clothes are washed.": "Chủ hỏi đã giặt quần áo chưa.",
        "There is a new iron at home. You do not know how to use it.":
            "Nhà có bàn ủi mới. Bạn chưa biết cách dùng.",
        "Your employer asks you to iron the shirts.": "Chủ nhờ bạn ủi áo sơ mi.",
        "Sorry, I broke a plate.": "Xin lỗi, tôi làm vỡ một chiếc đĩa.",
        "Reading signs": "Đọc biển báo",
        "Read the signs you see every day, and ask when you do not understand one.":
            "Đọc các biển báo bạn thấy hằng ngày và hỏi khi không hiểu.",
        "Red signs usually mean stop or danger. Yellow means be careful. Green usually means safe, or the way out.":
            "Biển màu đỏ thường có nghĩa là dừng lại hoặc nguy hiểm. Màu vàng là cẩn thận. Màu xanh lá thường là an toàn hoặc lối ra.",
        "You can be fined for smoking where it is not allowed. Many places have a yellow box that shows where you can smoke.":
            "Bạn có thể bị phạt tiền nếu hút thuốc ở nơi cấm. Nhiều nơi có ô kẻ màu vàng chỉ chỗ được hút thuốc.",
        "Many signs in Singapore are in English, Chinese, Malay and Tamil. If your language is there, read it first, then look for the English word.":
            "Nhiều biển báo ở Singapore có tiếng Anh, tiếng Trung, tiếng Mã Lai và tiếng Tamil. Nếu có tiếng của bạn, hãy đọc trước, rồi tìm từ tiếng Anh.",
        "Not sure what a sign means? Take a photo and ask someone. Do not go past a danger sign.":
            "Chưa rõ biển báo có nghĩa gì? Chụp ảnh và hỏi ai đó. Đừng đi qua biển cảnh báo nguy hiểm.",
        "the floor has water; you can slip": "sàn có nước; bạn có thể trượt ngã",
        "do not go in": "đừng đi vào",
        "do not smoke here": "đừng hút thuốc ở đây",
        "not open now": "hiện không mở cửa",
        "press the door away from you": "đẩy cửa ra xa bạn",
        "bring the door towards you": "kéo cửa về phía bạn",
        "the room with a toilet, in a public place": "phòng có bồn cầu ở nơi công cộng",
        "something here can hurt you": "có thứ ở đây có thể làm bạn bị thương",
        "Asking someone to explain a sign.": "Nhờ ai đó giải thích biển báo.",
        "Telling someone to be careful of the wet floor.": "Nhắc ai đó cẩn thận vì sàn ướt.",
        "Asking the way to the toilet.": "Hỏi đường đến nhà vệ sinh.",
        "Saying a shop is not open.": "Nói cửa hàng không mở cửa.",
        "Telling someone they are not allowed to enter.": "Nói với ai đó rằng họ không được vào.",
        "You are new in a building and you need the toilet. You see a cleaner.":
            "Bạn mới đến tòa nhà này và cần đi vệ sinh. Bạn thấy một người dọn vệ sinh.",
        "The cleaner asks if you need help.": "Người dọn vệ sinh hỏi bạn có cần giúp không.",
        "Your friend is walking to a door with a red No Entry sign.":
            "Bạn của bạn đang đi tới cửa có biển No Entry màu đỏ.",
        "Your friend asks if they can go in.": "Bạn của bạn hỏi có được vào không.",
        "The shop is closed.": "Cửa hàng đóng cửa rồi.",
        "Buses and finding your way": "Đi xe buýt và tìm đường",
        "Find the right bus, get off at your stop, and ask for directions when you are lost.":
            "Tìm đúng xe buýt, xuống đúng trạm và hỏi đường khi bị lạc.",
        "Tap your card when you get on the bus and again when you get off. If you forget to tap when you get off, you can pay more.":
            "Chạm thẻ khi lên xe buýt và chạm lần nữa khi xuống. Nếu quên chạm lúc xuống, bạn có thể phải trả thêm tiền.",
        "Press the bell just before your stop. If nobody presses it and nobody is waiting, the bus does not stop.":
            "Bấm chuông ngay trước khi tới trạm của bạn. Nếu không ai bấm và không ai đợi, xe sẽ không dừng.",
        "Raise your hand when your bus comes, so the driver knows to stop.":
            "Giơ tay khi xe buýt của bạn đến để tài xế biết cần dừng.",
        "Cross the road at a traffic light or an overhead bridge. You can be fined for crossing somewhere else nearby.":
            "Qua đường ở chỗ có đèn giao thông hoặc đi cầu vượt dành cho người đi bộ. Bạn có thể bị phạt nếu qua ở chỗ khác gần đó.",
        "where you wait for the bus": "nơi bạn đợi xe buýt",
        "press it to ask the bus to stop": "bấm để xin xe buýt dừng",
        "the side of your left hand": "phía tay trái của bạn",
        "the side of your right hand": "phía tay phải của bạn",
        "keep going ahead; do not turn": "cứ đi thẳng; đừng rẽ",
        "the lights that say stop or go": "đèn báo khi nào dừng hoặc đi",
        "a bridge for walking over a road": "cầu để người đi bộ qua phía trên đường",
        "a picture that shows where places are": "hình vẽ cho biết các nơi nằm ở đâu",
        "Asking which bus to take.": "Hỏi cần đi xe buýt nào.",
        "Asking the way to the bus stop.": "Hỏi đường đến trạm xe buýt.",
        "Telling someone the way.": "Chỉ đường cho ai đó.",
        "Saying you do not know where you are.": "Nói bạn không biết mình đang ở đâu.",
        "Asking someone to tell you when to get off.": "Nhờ ai đó báo khi cần xuống xe.",
        "You are at a bus stop and want to go to Little India. A woman is waiting next to you.":
            "Bạn đang ở trạm xe buýt và muốn đến Little India. Một phụ nữ đang đợi cạnh bạn.",
        "The woman asks if you are waiting for a bus.":
            "Người phụ nữ hỏi bạn có đang đợi xe buýt không.",
        "You do not know this road and your phone has no battery. You see a man walking.":
            "Bạn không biết đường này và điện thoại đã hết pin. Bạn thấy một người đàn ông đang đi bộ.",
        "The man asks if he can help you.": "Người đàn ông hỏi có thể giúp bạn không.",
        "Please tell me my stop.": "Làm ơn báo cho tôi khi đến trạm của tôi.",
        "At the supermarket": "Ở siêu thị",
        "Find what you need, check the price and the date, and pay at the counter.":
            "Tìm đồ cần mua, xem giá và ngày ghi trên hàng, rồi trả tiền ở quầy.",
        "Big supermarkets charge at least 5 cents for each plastic bag. Bring your own bag to save money.":
            "Siêu thị lớn thu ít nhất 5 xu cho mỗi túi nhựa. Mang túi riêng để tiết kiệm tiền.",
        "Look for the date on food before you buy it. \"Best before\" and \"Use by\" tell you how long it is good.":
            "Xem ngày ghi trên thực phẩm trước khi mua. \"Best before\" và \"Use by\" cho biết thực phẩm còn tốt đến khi nào.",
        "Keep the receipt when you shop for someone else, so you can show what you spent.":
            "Giữ hóa đơn khi mua đồ cho người khác để cho họ xem bạn đã tiêu bao nhiêu.",
        "The cashier may ask if you have a member card. If you do not have one, just say no.":
            "Thu ngân có thể hỏi bạn có thẻ thành viên không. Nếu không có, chỉ cần nói không.",
        "a big basket on wheels": "giỏ lớn có bánh xe",
        "the walkway between shelves": "lối đi giữa các kệ",
        "the person you pay": "người bạn trả tiền cho",
        "the paper that shows what you paid": "tờ giấy ghi những khoản bạn đã trả",
        "a lower price than usual": "giá thấp hơn bình thường",
        "the last day the food is good": "ngày cuối thực phẩm còn tốt",
        "a thin bag to carry your shopping": "túi mỏng để đựng đồ đã mua",
        "plants you cook and eat, like carrots": "cây dùng để nấu và ăn, như cà rốt",
        "Asking where to find something.": "Hỏi tìm đồ ở đâu.",
        "Asking if the price is lower today.": "Hỏi hôm nay giá có thấp hơn không.",
        "Asking the cashier for a bag.": "Xin thu ngân một chiếc túi.",
        "Asking the cashier for the receipt.": "Xin thu ngân hóa đơn.",
        "Telling staff that the food is past its date.": "Báo nhân viên rằng thực phẩm đã quá hạn.",
        "You are paying at the counter. You do not have your own bag.":
            "Bạn đang trả tiền ở quầy. Bạn không có túi riêng.",
        "The cashier tells you the price.": "Thu ngân nói giá tiền.",
        "The milk in your basket is past its date. You show it to a staff member.":
            "Sữa trong giỏ của bạn đã quá hạn. Bạn đưa cho một nhân viên xem.",
        "A staff member asks if they can help you.": "Một nhân viên hỏi có thể giúp bạn không.",
        "Is this on discount?": "Món này có giảm giá không?",
        "Construction science": "Khoa học xây dựng",
        "Learn the main building materials, why a building stays up, and how to warn others about a problem.":
            "Tìm hiểu vật liệu xây dựng chính, vì sao tòa nhà đứng vững và cách báo cho người khác khi có vấn đề.",
        "Concrete is strong when it is pressed, but it cracks when it is pulled. That is why steel bars go inside it.":
            "Bê tông chịu nén tốt, nhưng bị nứt khi bị kéo. Vì vậy người ta đặt thanh thép bên trong.",
        "Too much water makes concrete weak. Use only the amount of water your supervisor tells you.":
            "Quá nhiều nước làm bê tông yếu đi. Chỉ dùng lượng nước mà quản lý dặn.",
        "Concrete goes hard slowly. It takes about 28 days to reach full strength, so ask your supervisor before you put weight on it.":
            "Bê tông cứng dần. Cần khoảng 28 ngày để đạt đủ độ bền, nên hãy hỏi quản lý trước khi đặt vật nặng lên.",
        "A building carries its weight down: from the floor to the beams, to the columns, then into the ground. Never cut a beam or a column without permission.":
            "Trọng lượng tòa nhà truyền xuống: từ sàn tới dầm, tới cột, rồi xuống đất. Không được cắt dầm hay cột khi chưa được phép.",
        "Every scaffold has a weight limit. Too much weight can make it fall, so do not add more than you are told.":
            "Mỗi giàn giáo đều có giới hạn tải trọng. Quá nặng có thể làm sập, nên đừng chất quá mức được dặn.",
        "cement, sand, stones and water mixed; it goes hard":
            "xi măng, cát, đá và nước trộn với nhau; sẽ cứng lại",
        "the grey powder that holds concrete together": "bột màu xám kết dính bê tông",
        "a long metal rod inside concrete": "thanh thép dài bên trong bê tông",
        "a strong part that goes across and holds up a floor": "bộ phận chắc nằm ngang đỡ sàn",
        "a strong part that stands up and carries the weight":
            "bộ phận chắc đứng thẳng chịu trọng lượng",
        "the weight something must carry": "trọng lượng mà một vật phải chịu",
        "a tool that shows if something is flat": "dụng cụ cho biết bề mặt có cân bằng không",
        "a metal frame you stand on to work up high": "khung kim loại để đứng làm việc trên cao",
        "Warning that the concrete is not hard yet.": "Cảnh báo bê tông chưa cứng.",
        "Saying that something weighs too much.": "Nói một vật quá nặng.",
        "Telling someone to stop adding water to the mix.":
            "Bảo ai đó ngừng thêm nước vào hỗn hợp.",
        "Reporting a crack to your supervisor.": "Báo vết nứt cho quản lý.",
        "Asking someone to make sure the scaffold is safe.":
            "Nhờ ai đó kiểm tra giàn giáo có an toàn không.",
        "A worker is about to walk on the floor you poured this morning.":
            "Một công nhân sắp bước lên sàn bạn vừa đổ bê tông sáng nay.",
        "The worker asks if he can walk here.": "Công nhân hỏi có thể đi ở đây không.",
        "Your co-worker is mixing concrete and keeps pouring in water.":
            "Đồng nghiệp đang trộn bê tông và cứ đổ thêm nước.",
        "Your co-worker wants to add more water.": "Đồng nghiệp muốn thêm nước.",
        "There is a crack in this column.": "Cột này có vết nứt.",
    },
    fr: {
        'Signs and announcements say "alight". It means get off the train.':
            'Les panneaux et les annonces disent "alight". Cela veut dire descendre du train.',
        'Say "take away" to bring the food home. Some stalls charge a little more for the box.':
            'Dites "take away" pour emporter la nourriture. Certains stands font payer un peu plus pour la boîte.',
        'A tissue packet on a table means someone has taken that seat. People call this "chope".':
            'Un paquet de mouchoirs sur une table veut dire que quelqu\'un a pris cette place. On appelle ça "chope".',
        "A meal at a hawker centre or coffee shop usually costs 4 to 7 dollars. Most stalls take cash, and many take PayNow.":
            "Un repas dans un hawker centre ou un coffee shop coûte en général 4 à 7 dollars. La plupart des stands acceptent les espèces, et beaucoup acceptent PayNow.",
        "A quick practice with words from every lesson. New every day.":
            "Un entraînement rapide avec les mots de toutes les leçons. Nouveau chaque jour.",
        "After eating, return your tray and plates to the tray return point. It is the rule, and there can be a fine.":
            "Après avoir mangé, rapportez votre plateau et vos assiettes au point de retour des plateaux. C'est la règle, et il peut y avoir une amende.",
        "Ask the doctor for an MC. Give it to your employer so your sick day is counted as sick leave.":
            "Demandez un MC au médecin. Donnez-le à votre employeur pour que votre jour de maladie soit compté comme congé maladie.",
        "Ask your supervisor to say it again, say when something is not safe, and ask for a day off.":
            "Demandez à votre superviseur de répéter, dites quand quelque chose n'est pas sûr et demandez un jour de congé.",
        "Asking for a day with no work.": "Demander un jour sans travail.",
        "Asking for less chilli.": "Demander moins de piment.",
        "Asking how often to take the medicine.":
            "Demander à quelle fréquence prendre le médicament.",
        "Asking people to let you off the train.":
            "Demander aux gens de vous laisser descendre du train.",
        "Asking someone to repeat what they said.":
            "Demander à quelqu'un de répéter ce qu'il a dit.",
        "Asking the doctor for a sick-leave paper.":
            "Demander au médecin un papier de congé maladie.",
        "Asking the price.": "Demander le prix.",
        "Asking to add ten dollars to your card.":
            "Demander d'ajouter dix dollars sur votre carte.",
        "Asking which platform goes to Jurong East.": "Demander quel quai va à Jurong East.",
        "At a hawker centre, you order at the stall, pay, and carry the food to a table yourself.":
            "Dans un hawker centre, vous commandez au stand, payez, et portez vous-même la nourriture à une table.",
        "At work": "Au travail",
        "Buying food": "Acheter à manger",
        "Daily mix": "Mélange du jour",
        "Fill in the missing word": "Complétez le mot manquant",
        "Find the right platform, top up your card, and get off at the right stop.":
            "Trouvez le bon quai, rechargez votre carte et descendez au bon arrêt.",
        "How many times a day?": "Combien de fois par jour ?",
        "How much?": "Combien ?",
        "If work is not safe, tell your supervisor. You can say no to unsafe work. You can also call MOM at 6438 5122.":
            "Si le travail n'est pas sûr, dites-le à votre superviseur. Vous pouvez refuser un travail dangereux. Vous pouvez aussi appeler le MOM au 6438 5122.",
        "If you are hurt at work, tell your supervisor the same day and see a doctor. Keep the MC and every receipt.":
            "Si vous êtes blessé au travail, prévenez votre superviseur le jour même et consultez un médecin. Gardez le MC et tous les reçus.",
        "If you are sick, go to a clinic near your dormitory or a polyclinic. In an emergency, call 995 for an ambulance.":
            "Si vous êtes malade, allez dans une clinique près de votre dortoir ou dans une polyclinique. En cas d'urgence, appelez le 995 pour une ambulance.",
        "If your employer does not let you see a doctor, call MOM at 6438 5122 or the Migrant Workers' Centre at 6536 2692.":
            "Si votre employeur ne vous laisse pas voir un médecin, appelez le MOM au 6438 5122 ou le Migrant Workers' Centre au 6536 2692.",
        "In an emergency, call 995 for an ambulance.":
            "En cas d'urgence, appelez le 995 pour une ambulance.",
        "It is your turn at the chicken rice stall.": "C'est votre tour au stand de riz au poulet.",
        "Listen. Tap what you hear": "Écoutez. Touchez ce que vous entendez",
        "Listen. What does it mean?": "Écoutez. Qu'est-ce que ça veut dire ?",
        "My salary is late.": "Mon salaire est en retard.",
        "Order at a food stall, ask the price, and say how you want it.":
            "Commandez à un stand de nourriture, demandez le prix et dites comment vous le voulez.",
        "Ordering a drink without ice.": "Commander une boisson sans glace.",
        "Ordering one chicken rice to bring home.": "Commander un riz au poulet à emporter.",
        "Pointing to where it hurts.": "Montrer où ça fait mal.",
        "Put the words in order": "Mettez les mots dans l'ordre",
        "Say this in English": "Dites ceci en anglais",
        "Say what is wrong, ask for an MC, and understand how to take your medicine.":
            "Dites ce qui ne va pas, demandez un certificat médical (MC) et comprenez comment prendre vos médicaments.",
        "Saying thank you to an older man.": "Dire merci à un homme plus âgé.",
        "Saying thank you.": "Dire merci.",
        "Saying that something is not safe.": "Dire que quelque chose n'est pas sûr.",
        "Saying that you are injured.": "Dire que vous êtes blessé.",
        "Saying you want the food in a box, not on a plate.":
            "Dire que vous voulez la nourriture dans une boîte, pas dans une assiette.",
        "Saying your pay has not come on time.": "Dire que votre paie n'est pas arrivée à temps.",
        "Seats in a different colour are reserved seats. Give them to old people, pregnant women, and anyone who is hurt.":
            "Les sièges d'une autre couleur sont des sièges réservés. Laissez-les aux personnes âgées, aux femmes enceintes et aux personnes blessées.",
        "Seeing a doctor": "Voir un médecin",
        "Stand on the left side of the escalator so people can walk past on the right.":
            "Tenez-vous à gauche sur l'escalator pour que les gens puissent passer à droite.",
        "Take medicine the way the doctor says: how many times a day, and before or after food.":
            "Prenez le médicament comme le médecin le dit : combien de fois par jour, et avant ou après le repas.",
        "Taking the MRT": "Prendre le MRT",
        "Tap the pairs": "Touchez les paires",
        "Tap your card at the gate when you go in and again when you go out. If you forget to tap out, you pay the highest fare.":
            "Passez votre carte au portique en entrant et de nouveau en sortant. Si vous oubliez en sortant, vous payez le tarif le plus élevé.",
        "Telling staff your card is not working at the gate.":
            "Dire au personnel que votre carte ne marche pas au portique.",
        "Telling the doctor your body is hot.": "Dire au médecin que votre corps est chaud.",
        "The doctor asks what is wrong.": "Le médecin demande ce qui ne va pas.",
        "The doctor asks where it hurts.": "Le médecin demande où ça fait mal.",
        "The doctor wants to know where it hurts.": "Le médecin veut savoir où ça fait mal.",
        "The seller asks for your order.": "Le vendeur demande votre commande.",
        "The seller asks if you will eat here or bring it home.":
            "Le vendeur demande si vous mangez ici ou si vous emportez.",
        "The staff member asks if you need help.": "L'employé demande si vous avez besoin d'aide.",
        "The supervisor asks what happened.": "Le superviseur demande ce qui s'est passé.",
        "The supervisor gives a long instruction.": "Le superviseur donne une longue consigne.",
        "Top up your card for free at the machine inside the station. 7-Eleven and Cheers shops also top up, but they charge a small fee each time.":
            "Rechargez votre carte gratuitement à la machine dans la station. Les magasins 7-Eleven et Cheers rechargent aussi, mais prennent de petits frais à chaque fois.",
        "Use the same card or phone both times. If you tap in with your card and out with your phone, the trip will not match.":
            "Utilisez la même carte ou le même téléphone les deux fois. Si vous entrez avec votre carte et sortez avec votre téléphone, le trajet ne correspondra pas.",
        "Wear your helmet, safety boots and vest on the worksite. Your employer must give them to you for free.":
            "Portez votre casque, vos chaussures de sécurité et votre gilet sur le chantier. Votre employeur doit vous les fournir gratuitement.",
        "What do you say?": "Que dites-vous ?",
        "What is this called?": "Comment ça s'appelle ?",
        "Which one is this?": "Lequel est-ce ?",
        "Which platform for Jurong East?": "Quel quai pour Jurong East ?",
        "You are at a food stall. You want to eat at home.":
            "Vous êtes à un stand de nourriture. Vous voulez manger chez vous.",
        "You are in the doctor's room.": "Vous êtes dans le cabinet du médecin.",
        "You fell and your arm is bleeding. Your supervisor runs over.":
            "Vous êtes tombé et votre bras saigne. Votre superviseur accourt.",
        "Your card does not work at the gate. A staff member comes over.":
            "Votre carte ne marche pas au portique. Un employé s'approche.",
        "Your employer must pay for your medical care. Keep every receipt.":
            "Votre employeur doit payer vos soins médicaux. Gardez tous les reçus.",
        "Your salary must be paid within 7 days after the end of the month. If it is late, call MOM.":
            "Votre salaire doit être payé dans les 7 jours après la fin du mois. S'il est en retard, appelez le MOM.",
        "Your supervisor speaks very fast. You did not understand.":
            "Votre superviseur parle très vite. Vous n'avez pas compris.",
        "a day off from work": "un jour de congé",
        "a day with no work": "un jour sans travail",
        "a fixed time to see the doctor": "une heure fixée pour voir le médecin",
        "a paper from the doctor that says you are sick":
            "un papier du médecin qui dit que vous êtes malade",
        "a seat for old, pregnant or hurt people":
            "un siège pour les personnes âgées, enceintes ou blessées",
        "a short rest from work": "une courte pause dans le travail",
        "a small place where a doctor sees you": "un petit endroit où un médecin vous reçoit",
        "a smaller amount": "une plus petite quantité",
        "a station where you change to another line": "une station où vous changez de ligne",
        "add money to your card": "ajouter de l'argent sur votre carte",
        "bring the food home in a box": "emporter la nourriture chez vous dans une boîte",
        "change to another train line": "changer pour une autre ligne de train",
        "eat here, at a table": "manger ici, à une table",
        "get off the train": "descendre du train",
        "hot, with chilli": "piquant, avec du piment",
        "it hurts": "ça fait mal",
        "not safe; you can get hurt": "pas sûr ; vous pouvez vous blesser",
        "one more time": "encore une fois",
        "one small shop inside a hawker centre": "une petite boutique dans un hawker centre",
        "paper money and coins": "des billets et des pièces",
        "rice with chicken, a common Singapore meal":
            "du riz au poulet, un plat courant à Singapour",
        "something to drink, like tea or juice": "quelque chose à boire, comme du thé ou du jus",
        "stay home and sleep": "rester à la maison et dormir",
        "strong shoes for work": "des chaussures solides pour le travail",
        "the boss at your worksite": "le chef sur votre chantier",
        "the money you get for your work": "l'argent que vous recevez pour votre travail",
        "the money you pay for the trip": "l'argent que vous payez pour le trajet",
        "the way out of the station": "la sortie de la station",
        "touch your card at the gate when you leave": "passer votre carte au portique en sortant",
        "wait for the next train": "attendre le prochain train",
        "what is the price": "quel est le prix",
        "what you take to get better": "ce que vous prenez pour aller mieux",
        "when air comes out of your mouth with a loud sound":
            "quand de l'air sort de votre bouche avec un bruit fort",
        "where you wait for the train": "là où vous attendez le train",
        "your body is injured": "votre corps est blessé",
        "your body is very hot": "votre corps est très chaud",
        // AI Words (workshop lesson)
        "AI Words": "Les mots de l'IA",
        "Know the key words people use when they talk about AI.":
            "Apprenez les mots clés que les gens utilisent quand ils parlent de l'IA.",
        "computer programs that can do tasks that usually need a human mind":
            "des programmes d'ordinateur qui peuvent faire des tâches qui demandent d'habitude un cerveau humain",
        "how an AI gets better by learning patterns from lots of examples":
            "la façon dont une IA s'améliore en trouvant ce qui se répète dans beaucoup d'exemples",
        "the examples (text, photos, recordings) an AI learns from":
            "les exemples (textes, photos, enregistrements) à partir desquels une IA apprend",
        "an AI you have a conversation with by typing, like ChatGPT or Gemini":
            "une IA avec qui vous discutez en écrivant, comme ChatGPT ou Gemini",
        "the question or instruction you type or say to an AI":
            "la question ou la demande que vous écrivez ou dites à une IA",
        "AI that creates new things: text, pictures, music or video":
            "une IA qui crée des choses nouvelles : textes, images, musique ou vidéos",
        "an AI that listens to your voice and answers out loud, like Siri":
            "une IA qui écoute ce que vous dites et répond à voix haute, comme Siri",
        "AI that can tell what is in a photo": "une IA qui peut dire ce qu'il y a sur une photo",
        "when an AI confidently gives an answer that is made up or wrong":
            "quand une IA donne avec assurance une réponse inventée ou fausse",
        "Saying the AI gave a confident answer that was false.":
            "Dire que l'IA a donné avec assurance une réponse fausse.",
        "Suggesting a more detailed question to get a better answer.":
            "Proposer une question plus détaillée pour avoir une meilleure réponse.",
        "Which one is a chatbot?": 'Lequel est un "chatbot" ?',
        "Which word fits?": "Quel mot convient ?",
        "Your friend has been using a chatbot and looks confused.": "Votre ami a utilisé un chatbot et a l'air perdu.",
        "Your friend searched for the book and could not find it anywhere.":
            "Votre ami a cherché le livre et ne l'a trouvé nulle part.",
        "Saying it was an AI that answers out loud.": "Dire que c'était une IA qui répond à voix haute.",
        "Saying it was the examples the AI learned from.":
            "Dire que c'étaient les exemples à partir desquels l'IA a appris.",
        "Your friend asked a chatbot to plan a trip.": "Votre ami a demandé à un chatbot de préparer un voyage.",
        "The answer did not have enough detail to be useful.":
            "La réponse n'avait pas assez de détails pour être utile.",
        "Suggesting they change what the AI learned from.": "Proposer de changer ce que l'IA a utilisé pour apprendre.",
        "Suggesting they use an AI that reads photos.": "Proposer d'utiliser une IA qui lit les photos.",
        "A chatbot answers whatever you type, and what you type is your prompt. Try the ideas below, or ask anything you like.":
            "Un chatbot répond à tout ce que vous écrivez, et ce que vous écrivez, c'est votre prompt. Essayez les idées ci-dessous, ou demandez ce que vous voulez.",
        "Say exactly what you want.": "Dites exactement ce que vous voulez.",
        "Give context: who it is for, and limits like time or budget.":
            "Donnez le contexte : pour qui c'est, et les limites comme le temps ou le budget.",
        "Say the format: a list, three sentences, a short message.":
            "Précisez le format : une liste, trois phrases, un court message.",
        "Not happy with the answer? Ask a follow-up to change it.":
            "La réponse ne vous plaît pas ? Posez une question de suivi pour la changer.",
        "Ask about an AI word": "Demandez le sens d'un mot d'IA",
        "Pick any word from the lesson and ask the chatbot to explain it.":
            "Choisissez un mot de la leçon et demandez au chatbot de l'expliquer.",
        "Send a vague prompt": "Envoyez un prompt vague",
        "Send this short prompt and see what comes back.": "Envoyez ce court prompt et regardez la réponse.",
        "Now add the details": "Ajoutez maintenant les détails",
        "Same request with context, limits and a format. Compare the two answers.":
            "La même demande avec du contexte, des limites et un format. Comparez les deux réponses.",
        "Make something new": "Créez quelque chose de nouveau",
        "That's generative AI: it writes something that did not exist before.":
            "C'est l'IA générative : elle écrit quelque chose qui n'existait pas avant.",
        "Ask a follow-up": "Posez une question de suivi",
        "Change the last answer without starting again.": "Modifiez la dernière réponse sans tout recommencer.",
        "Check for a hallucination": "Vérifiez s'il y a une hallucination",
        "Ask for facts, then ask if it is sure. Chatbots can sound confident and still be wrong.":
            "Demandez des faits, puis demandez s'il en est sûr. Les chatbots peuvent avoir l'air sûrs d'eux et pourtant se tromper.",
        "Getting to know someone": "Faire connaissance",
        "Say your name and where you are from, and ask new people about themselves.":
            "Dites votre nom et d'où vous venez. Posez aussi des questions aux personnes que vous rencontrez.",
        "People in Singapore often say \"Have you eaten?\" as a friendly hello. You can say \"Yes, thank you.\"":
            "À Singapour, on dit souvent \"Have you eaten?\" pour dire bonjour gentiment. Vous pouvez répondre \"Yes, thank you.\"",
        "People may call an older woman \"Aunty\" and an older man \"Uncle\". It is polite, even if you are not family.":
            "On peut appeler une femme plus âgée \"Aunty\" et un homme plus âgé \"Uncle\". C'est poli, même si vous n'êtes pas de la même famille.",
        "You do not have to answer every question. If someone asks about your pay or your family and you do not want to say, you can smile and change the topic.":
            "Vous n'êtes pas obligé de répondre à toutes les questions. Si vous ne voulez pas parler de votre salaire ou de votre famille, vous pouvez sourire et changer de sujet.",
        "The best way to learn is to talk. Say hello to one new person on your day off.":
            "Le meilleur moyen d'apprendre est de parler. Dites bonjour à une nouvelle personne pendant votre jour de congé.",
        "what people call you": "le nom que les gens utilisent pour vous appeler",
        "a place like India or Bangladesh": "un pays comme l'Inde ou le Bangladesh",
        "your parents, husband or wife, and children":
            "vos parents, votre mari ou votre femme, et vos enfants",
        "young boys and girls; sons and daughters":
            "les jeunes garçons et filles ; les fils et les filles",
        "someone you like and spend time with":
            "une personne que vous aimez bien et avec qui vous passez du temps",
        "the work you do for money": "le travail que vous faites pour gagner de l'argent",
        "something you like to do in your free time":
            "une activité que vous aimez faire pendant votre temps libre",
        "the day after Saturday; many workers rest":
            "le jour après le samedi ; beaucoup de travailleurs se reposent",
        "Asking someone's name.": "Demander le nom de quelqu'un.",
        "Telling someone your name.": "Dire votre nom.",
        "Asking which country someone comes from.": "Demander de quel pays vient quelqu'un.",
        "Asking what work someone does.": "Demander quel travail fait quelqu'un.",
        "Saying you are happy to meet someone new.":
            "Dire que vous êtes heureux de faire connaissance.",
        "Asking about someone's day off.": "Poser une question sur le jour de congé de quelqu'un.",
        "You meet someone new at the park on your day off.":
            "Vous rencontrez une nouvelle personne au parc pendant votre jour de congé.",
        "The new person asks your name.":
            "La personne que vous venez de rencontrer demande votre nom.",
        "Your friend brings a new person to meet you.":
            "Votre ami vous présente une nouvelle personne.",
        "The new person tells you her name.": "La femme que vous venez de rencontrer dit son nom.",
        "What is your job?": "Quel est votre travail ?",
        "Helping at home": "Aider à la maison",
        "Understand what to do at home, say what you have finished, and ask when you are not sure.":
            "Comprenez les tâches à faire à la maison, dites ce que vous avez terminé et posez des questions en cas de doute.",
        "Never lean out of a window to clean it or to hang clothes. If someone asks you to, say it is not safe.":
            "Ne vous penchez jamais dehors pour nettoyer une fenêtre ou étendre du linge. Si on vous le demande, dites que c'est dangereux.",
        "Never throw anything out of a window. Put rubbish in the rubbish chute or the bin.":
            "Ne jetez jamais rien par la fenêtre. Mettez les déchets dans le vide-ordures, par la petite porte en métal de la cuisine, ou dans la poubelle.",
        "Never mix bleach with other cleaning products. The gas can hurt you.":
            "Ne mélangez jamais l'eau de Javel avec d'autres produits de nettoyage. Le gaz peut vous faire du mal.",
        "If you do not know how to use a machine, ask first. It is better to ask than to break it.":
            "Si vous ne savez pas utiliser une machine, demandez d'abord. Il vaut mieux demander que la casser.",
        "clothes to wash": "les vêtements à laver",
        "a hot tool that makes clothes flat": "un outil chaud qui enlève les plis des vêtements",
        "a stick with cloth for washing the floor": "un manche avec un tissu pour laver le sol",
        "plates and bowls you eat from": "les assiettes et les bols pour manger",
        "things you throw away": "les choses que vous jetez",
        "a cold box that keeps food fresh": "une armoire froide qui garde les aliments frais",
        "where you cook food with fire": "l'endroit où l'on fait cuire les aliments avec du feu",
        "a place with doors to keep things":
            "un rangement avec des portes pour mettre des affaires",
        "Asking what work comes after this.": "Demander quelle tâche faire ensuite.",
        "Saying the laundry is done.": "Dire que le linge est lavé.",
        "Asking where something goes.": "Demander où mettre quelque chose.",
        "Asking someone to show you the way to do it.":
            "Demander à quelqu'un de montrer comment faire.",
        "Saying sorry and telling the truth about a broken plate.":
            "S'excuser et dire la vérité sur une assiette cassée.",
        "You finished washing the clothes. Your employer comes into the room.":
            "Vous avez fini de laver les vêtements. Votre employeur entre dans la pièce.",
        "Your employer asks if the clothes are washed.":
            "Votre employeur demande si les vêtements sont lavés.",
        "There is a new iron at home. You do not know how to use it.":
            "Il y a un nouveau fer à repasser à la maison. Vous ne savez pas l'utiliser.",
        "Your employer asks you to iron the shirts.":
            "Votre employeur vous demande de repasser les chemises.",
        "Sorry, I broke a plate.": "Pardon, j'ai cassé une assiette.",
        "Reading signs": "Lire les panneaux",
        "Read the signs you see every day, and ask when you do not understand one.":
            "Lisez les panneaux que vous voyez chaque jour et demandez quand vous ne comprenez pas.",
        "Red signs usually mean stop or danger. Yellow means be careful. Green usually means safe, or the way out.":
            "Les panneaux rouges veulent souvent dire arrêt ou danger. Le jaune veut dire attention. Le vert indique souvent un endroit sûr ou la sortie.",
        "You can be fined for smoking where it is not allowed. Many places have a yellow box that shows where you can smoke.":
            "Vous risquez une amende si vous fumez dans un endroit interdit. Beaucoup d'endroits ont un cadre jaune qui montre où fumer.",
        "Many signs in Singapore are in English, Chinese, Malay and Tamil. If your language is there, read it first, then look for the English word.":
            "À Singapour, beaucoup de panneaux sont en anglais, chinois, malais et tamoul. Si votre langue y est, lisez-la d'abord, puis cherchez le mot anglais.",
        "Not sure what a sign means? Take a photo and ask someone. Do not go past a danger sign.":
            "Vous ne comprenez pas un panneau ? Prenez une photo et demandez à quelqu'un. Ne passez pas au-delà d'un panneau de danger.",
        "the floor has water; you can slip": "il y a de l'eau au sol ; vous pouvez glisser",
        "do not go in": "n'entrez pas",
        "do not smoke here": "ne fumez pas ici",
        "not open now": "ce n'est pas ouvert maintenant",
        "press the door away from you": "poussez la porte en l'éloignant de vous",
        "bring the door towards you": "tirez la porte vers vous",
        "the room with a toilet, in a public place":
            "la pièce avec des toilettes dans un lieu public",
        "something here can hurt you": "quelque chose ici peut vous blesser",
        "Asking someone to explain a sign.": "Demander à quelqu'un d'expliquer un panneau.",
        "Telling someone to be careful of the wet floor.":
            "Dire à quelqu'un de faire attention au sol mouillé.",
        "Asking the way to the toilet.": "Demander le chemin des toilettes.",
        "Saying a shop is not open.": "Dire qu'un magasin n'est pas ouvert.",
        "Telling someone they are not allowed to enter.":
            "Dire à quelqu'un qu'il n'a pas le droit d'entrer.",
        "You are new in a building and you need the toilet. You see a cleaner.":
            "Vous venez pour la première fois dans ce bâtiment et vous cherchez les toilettes. Vous voyez une personne qui fait le ménage.",
        "The cleaner asks if you need help.":
            "La personne qui fait le ménage demande si vous avez besoin d'aide.",
        "Your friend is walking to a door with a red No Entry sign.":
            "Votre ami se dirige vers une porte avec un panneau rouge No Entry.",
        "Your friend asks if they can go in.": "Votre ami demande s'il peut entrer.",
        "The shop is closed.": "Le magasin est fermé.",
        "Buses and finding your way": "Prendre le bus et trouver son chemin",
        "Find the right bus, get off at your stop, and ask for directions when you are lost.":
            "Trouvez le bon bus, descendez à votre arrêt et demandez votre chemin si vous êtes perdu.",
        "Tap your card when you get on the bus and again when you get off. If you forget to tap when you get off, you can pay more.":
            "Passez votre carte en montant dans le bus et encore en descendant. Si vous oubliez en descendant, vous risquez de payer plus.",
        "Press the bell just before your stop. If nobody presses it and nobody is waiting, the bus does not stop.":
            "Appuyez sur le bouton juste avant votre arrêt. Si personne n'appuie et que personne n'attend, le bus ne s'arrête pas.",
        "Raise your hand when your bus comes, so the driver knows to stop.":
            "Levez la main quand votre bus arrive pour que le conducteur sache qu'il doit s'arrêter.",
        "Cross the road at a traffic light or an overhead bridge. You can be fined for crossing somewhere else nearby.":
            "Traversez au feu ou sur une passerelle au-dessus de la route. Vous risquez une amende si vous traversez ailleurs à proximité.",
        "where you wait for the bus": "l'endroit où vous attendez le bus",
        "press it to ask the bus to stop": "appuyez pour demander au bus de s'arrêter",
        "the side of your left hand": "le côté de votre main gauche",
        "the side of your right hand": "le côté de votre main droite",
        "keep going ahead; do not turn": "continuez tout droit ; ne tournez pas",
        "the lights that say stop or go": "les feux qui disent de s'arrêter ou d'avancer",
        "a bridge for walking over a road": "un pont pour traverser la route à pied par-dessus",
        "a picture that shows where places are": "un dessin qui montre où sont les lieux",
        "Asking which bus to take.": "Demander quel bus prendre.",
        "Asking the way to the bus stop.": "Demander le chemin de l'arrêt de bus.",
        "Telling someone the way.": "Indiquer le chemin à quelqu'un.",
        "Saying you do not know where you are.": "Dire que vous ne savez pas où vous êtes.",
        "Asking someone to tell you when to get off.":
            "Demander à quelqu'un de vous dire quand descendre.",
        "You are at a bus stop and want to go to Little India. A woman is waiting next to you.":
            "Vous êtes à un arrêt de bus et voulez aller à Little India. Une femme attend à côté de vous.",
        "The woman asks if you are waiting for a bus.": "La femme demande si vous attendez un bus.",
        "You do not know this road and your phone has no battery. You see a man walking.":
            "Vous ne connaissez pas cette route et votre téléphone n'a plus de batterie. Vous voyez un homme qui marche.",
        "The man asks if he can help you.": "L'homme demande s'il peut vous aider.",
        "Please tell me my stop.": "Prévenez-moi à mon arrêt, s'il vous plaît.",
        "At the supermarket": "Au supermarché",
        "Find what you need, check the price and the date, and pay at the counter.":
            "Trouvez ce qu'il vous faut, vérifiez le prix et la date, puis payez à la caisse.",
        "Big supermarkets charge at least 5 cents for each plastic bag. Bring your own bag to save money.":
            "Les grands supermarchés font payer au moins 5 centimes par sac plastique. Apportez votre sac pour économiser.",
        "Look for the date on food before you buy it. \"Best before\" and \"Use by\" tell you how long it is good.":
            "Regardez la date sur les aliments avant d'acheter. \"Best before\" et \"Use by\" indiquent jusqu'à quand ils restent bons.",
        "Keep the receipt when you shop for someone else, so you can show what you spent.":
            "Gardez le reçu quand vous faites les courses pour quelqu'un, pour montrer ce que vous avez dépensé.",
        "The cashier may ask if you have a member card. If you do not have one, just say no.":
            "La personne à la caisse peut demander si vous avez une carte de membre. Si vous n'en avez pas, dites simplement non.",
        "a big basket on wheels": "un grand panier à roulettes",
        "the walkway between shelves": "le passage entre les étagères",
        "the person you pay": "la personne à qui vous payez",
        "the paper that shows what you paid": "le papier qui montre ce que vous avez payé",
        "a lower price than usual": "un prix plus bas que d'habitude",
        "the last day the food is good": "le dernier jour où l'aliment est encore bon",
        "a thin bag to carry your shopping": "un sac fin pour porter vos courses",
        "plants you cook and eat, like carrots":
            "des plantes que l'on cuisine et mange, comme les carottes",
        "Asking where to find something.": "Demander où trouver quelque chose.",
        "Asking if the price is lower today.": "Demander si le prix est plus bas aujourd'hui.",
        "Asking the cashier for a bag.": "Demander un sac à la caisse.",
        "Asking the cashier for the receipt.": "Demander le reçu à la caisse.",
        "Telling staff that the food is past its date.":
            "Dire au personnel que la date de l'aliment est dépassée.",
        "You are paying at the counter. You do not have your own bag.":
            "Vous payez à la caisse. Vous n'avez pas votre propre sac.",
        "The cashier tells you the price.": "La personne à la caisse vous dit le prix.",
        "The milk in your basket is past its date. You show it to a staff member.":
            "La date du lait dans votre panier est dépassée. Vous le montrez à un membre du personnel.",
        "A staff member asks if they can help you.":
            "Un membre du personnel demande s'il peut vous aider.",
        "Is this on discount?": "Est-ce que cet article est en réduction ?",
        "Construction science": "Comprendre la construction",
        "Learn the main building materials, why a building stays up, and how to warn others about a problem.":
            "Découvrez les principaux matériaux, pourquoi un bâtiment tient debout et comment prévenir les autres en cas de problème.",
        "Concrete is strong when it is pressed, but it cracks when it is pulled. That is why steel bars go inside it.":
            "Le béton résiste bien quand on le comprime, mais il se fissure quand on tire dessus. C'est pourquoi on met des barres d'acier dedans.",
        "Too much water makes concrete weak. Use only the amount of water your supervisor tells you.":
            "Trop d'eau rend le béton moins solide. Utilisez seulement la quantité d'eau indiquée par votre superviseur.",
        "Concrete goes hard slowly. It takes about 28 days to reach full strength, so ask your supervisor before you put weight on it.":
            "Le béton durcit lentement. Il met environ 28 jours à devenir complètement solide. Demandez à votre superviseur avant de poser du poids dessus.",
        "A building carries its weight down: from the floor to the beams, to the columns, then into the ground. Never cut a beam or a column without permission.":
            "Le poids d'un bâtiment descend : du plancher aux poutres, puis aux poteaux et enfin au sol. Ne coupez jamais une poutre ou un poteau sans autorisation.",
        "Every scaffold has a weight limit. Too much weight can make it fall, so do not add more than you are told.":
            "Chaque échafaudage a une limite de poids. Trop de poids peut le faire tomber. Ne dépassez pas le poids qu'on vous a indiqué.",
        "cement, sand, stones and water mixed; it goes hard":
            "un mélange de ciment, de sable, de pierres et d'eau qui durcit",
        "the grey powder that holds concrete together": "la poudre grise qui lie le béton",
        "a long metal rod inside concrete": "une longue barre d'acier dans le béton",
        "a strong part that goes across and holds up a floor":
            "une partie solide placée en travers qui soutient un plancher",
        "a strong part that stands up and carries the weight":
            "une partie solide verticale qui porte le poids",
        "the weight something must carry": "le poids que quelque chose doit porter",
        "a tool that shows if something is flat":
            "un outil qui montre si une surface est bien horizontale",
        "a metal frame you stand on to work up high":
            "une structure en métal sur laquelle on se tient pour travailler en hauteur",
        "Warning that the concrete is not hard yet.": "Prévenir que le béton n'a pas encore durci.",
        "Saying that something weighs too much.": "Dire que quelque chose est trop lourd.",
        "Telling someone to stop adding water to the mix.":
            "Dire à quelqu'un d'arrêter d'ajouter de l'eau au mélange.",
        "Reporting a crack to your supervisor.": "Signaler une fissure à votre superviseur.",
        "Asking someone to make sure the scaffold is safe.":
            "Demander à quelqu'un de vérifier que l'échafaudage est sûr.",
        "A worker is about to walk on the floor you poured this morning.":
            "Un ouvrier va marcher sur le sol où vous avez coulé du béton ce matin.",
        "The worker asks if he can walk here.": "L'ouvrier demande s'il peut marcher ici.",
        "Your co-worker is mixing concrete and keeps pouring in water.":
            "Votre collègue mélange du béton et continue à verser de l'eau.",
        "Your co-worker wants to add more water.": "Votre collègue veut ajouter de l'eau.",
        "There is a crack in this column.": "Il y a une fissure dans ce poteau.",
    },
    es: {
        'Signs and announcements say "alight". It means get off the train.':
            'Los letreros y los anuncios dicen "alight". Significa bajar del tren.',
        'Say "take away" to bring the food home. Some stalls charge a little more for the box.':
            'Di "take away" para llevar la comida a casa. Algunos puestos cobran un poco más por la caja.',
        'A tissue packet on a table means someone has taken that seat. People call this "chope".':
            'Un paquete de pañuelos en una mesa significa que alguien ya ocupó ese asiento. A esto lo llaman "chope".',
        "A meal at a hawker centre or coffee shop usually costs 4 to 7 dollars. Most stalls take cash, and many take PayNow.":
            "Una comida en un hawker centre o coffee shop suele costar de 4 a 7 dólares. La mayoría de los puestos aceptan efectivo, y muchos aceptan PayNow.",
        "A quick practice with words from every lesson. New every day.":
            "Una práctica rápida con palabras de todas las lecciones. Nueva cada día.",
        "After eating, return your tray and plates to the tray return point. It is the rule, and there can be a fine.":
            "Después de comer, devuelve la bandeja y los platos al punto de devolución de bandejas. Es la norma, y puede haber multa.",
        "Ask the doctor for an MC. Give it to your employer so your sick day is counted as sick leave.":
            "Pide un MC al médico. Dáselo a tu empleador para que tu día de enfermedad cuente como baja por enfermedad.",
        "Ask your supervisor to say it again, say when something is not safe, and ask for a day off.":
            "Pide a tu supervisor que lo repita, avisa cuando algo no es seguro y pide un día libre.",
        "Asking for a day with no work.": "Pedir un día sin trabajo.",
        "Asking for less chilli.": "Pedir menos chile.",
        "Asking how often to take the medicine.": "Preguntar cada cuánto tomar la medicina.",
        "Asking people to let you off the train.": "Pedir a la gente que te deje bajar del tren.",
        "Asking someone to repeat what they said.": "Pedir a alguien que repita lo que dijo.",
        "Asking the doctor for a sick-leave paper.":
            "Pedir al médico un papel de baja por enfermedad.",
        "Asking the price.": "Preguntar el precio.",
        "Asking to add ten dollars to your card.": "Pedir que añadan diez dólares a tu tarjeta.",
        "Asking which platform goes to Jurong East.": "Preguntar qué andén va a Jurong East.",
        "At a hawker centre, you order at the stall, pay, and carry the food to a table yourself.":
            "En un hawker centre, pides en el puesto, pagas y llevas tú mismo la comida a una mesa.",
        "At work": "En el trabajo",
        "Buying food": "Comprar comida",
        "Daily mix": "Mezcla diaria",
        "Fill in the missing word": "Completa la palabra que falta",
        "Find the right platform, top up your card, and get off at the right stop.":
            "Encuentra el andén correcto, recarga tu tarjeta y bájate en la parada correcta.",
        "How many times a day?": "¿Cuántas veces al día?",
        "How much?": "¿Cuánto es?",
        "If work is not safe, tell your supervisor. You can say no to unsafe work. You can also call MOM at 6438 5122.":
            "Si el trabajo no es seguro, díselo a tu supervisor. Puedes negarte a hacer un trabajo inseguro. También puedes llamar al MOM al 6438 5122.",
        "If you are hurt at work, tell your supervisor the same day and see a doctor. Keep the MC and every receipt.":
            "Si te lesionas en el trabajo, avisa a tu supervisor el mismo día y ve al médico. Guarda el MC y todos los recibos.",
        "If you are sick, go to a clinic near your dormitory or a polyclinic. In an emergency, call 995 for an ambulance.":
            "Si estás enfermo, ve a una clínica cerca de tu dormitorio o a un policlínico. En una emergencia, llama al 995 para una ambulancia.",
        "If your employer does not let you see a doctor, call MOM at 6438 5122 or the Migrant Workers' Centre at 6536 2692.":
            "Si tu empleador no te deja ir al médico, llama al MOM al 6438 5122 o al Migrant Workers' Centre al 6536 2692.",
        "In an emergency, call 995 for an ambulance.":
            "En una emergencia, llama al 995 para una ambulancia.",
        "It is your turn at the chicken rice stall.":
            "Es tu turno en el puesto de arroz con pollo.",
        "Listen. Tap what you hear": "Escucha. Toca lo que oyes",
        "Listen. What does it mean?": "Escucha. ¿Qué significa?",
        "My salary is late.": "Mi salario está atrasado.",
        "Order at a food stall, ask the price, and say how you want it.":
            "Pide en un puesto de comida, pregunta el precio y di cómo lo quieres.",
        "Ordering a drink without ice.": "Pedir una bebida sin hielo.",
        "Ordering one chicken rice to bring home.": "Pedir un arroz con pollo para llevar a casa.",
        "Pointing to where it hurts.": "Señalar dónde duele.",
        "Put the words in order": "Pon las palabras en orden",
        "Say this in English": "Di esto en inglés",
        "Say what is wrong, ask for an MC, and understand how to take your medicine.":
            "Di qué te pasa, pide un certificado médico (MC) y entiende cómo tomar tu medicina.",
        "Saying thank you to an older man.": "Dar las gracias a un hombre mayor.",
        "Saying thank you.": "Dar las gracias.",
        "Saying that something is not safe.": "Decir que algo no es seguro.",
        "Saying that you are injured.": "Decir que estás herido.",
        "Saying you want the food in a box, not on a plate.":
            "Decir que quieres la comida en una caja, no en un plato.",
        "Saying your pay has not come on time.": "Decir que tu paga no ha llegado a tiempo.",
        "Seats in a different colour are reserved seats. Give them to old people, pregnant women, and anyone who is hurt.":
            "Los asientos de otro color son asientos reservados. Cédelos a personas mayores, mujeres embarazadas y personas heridas.",
        "Seeing a doctor": "Ir al médico",
        "Stand on the left side of the escalator so people can walk past on the right.":
            "Ponte a la izquierda en la escalera mecánica para que la gente pueda pasar por la derecha.",
        "Take medicine the way the doctor says: how many times a day, and before or after food.":
            "Toma la medicina como dice el médico: cuántas veces al día, y antes o después de comer.",
        "Taking the MRT": "Viajar en el MRT",
        "Tap the pairs": "Toca las parejas",
        "Tap your card at the gate when you go in and again when you go out. If you forget to tap out, you pay the highest fare.":
            "Pasa la tarjeta por el torniquete al entrar y otra vez al salir. Si olvidas pasarla al salir, pagas la tarifa más alta.",
        "Telling staff your card is not working at the gate.":
            "Decir al personal que tu tarjeta no funciona en el torniquete.",
        "Telling the doctor your body is hot.": "Decir al médico que tu cuerpo está caliente.",
        "The doctor asks what is wrong.": "El médico pregunta qué te pasa.",
        "The doctor asks where it hurts.": "El médico pregunta dónde duele.",
        "The doctor wants to know where it hurts.": "El médico quiere saber dónde duele.",
        "The seller asks for your order.": "El vendedor pregunta qué quieres pedir.",
        "The seller asks if you will eat here or bring it home.":
            "El vendedor pregunta si comes aquí o te lo llevas a casa.",
        "The staff member asks if you need help.": "El empleado pregunta si necesitas ayuda.",
        "The supervisor asks what happened.": "El supervisor pregunta qué pasó.",
        "The supervisor gives a long instruction.": "El supervisor da una instrucción larga.",
        "Top up your card for free at the machine inside the station. 7-Eleven and Cheers shops also top up, but they charge a small fee each time.":
            "Recarga tu tarjeta gratis en la máquina dentro de la estación. Las tiendas 7-Eleven y Cheers también recargan, pero cobran una pequeña comisión cada vez.",
        "Use the same card or phone both times. If you tap in with your card and out with your phone, the trip will not match.":
            "Usa la misma tarjeta o el mismo teléfono las dos veces. Si entras con la tarjeta y sales con el teléfono, el viaje no coincidirá.",
        "Wear your helmet, safety boots and vest on the worksite. Your employer must give them to you for free.":
            "Lleva casco, botas de seguridad y chaleco en la obra. Tu empleador debe dártelos gratis.",
        "What do you say?": "¿Qué dices?",
        "What is this called?": "¿Cómo se llama esto?",
        "Which one is this?": "¿Cuál es este?",
        "Which platform for Jurong East?": "¿Qué andén para Jurong East?",
        "You are at a food stall. You want to eat at home.":
            "Estás en un puesto de comida. Quieres comer en casa.",
        "You are in the doctor's room.": "Estás en la consulta del médico.",
        "You fell and your arm is bleeding. Your supervisor runs over.":
            "Te caíste y tu brazo sangra. Tu supervisor viene corriendo.",
        "Your card does not work at the gate. A staff member comes over.":
            "Tu tarjeta no funciona en el torniquete. Un empleado se acerca.",
        "Your employer must pay for your medical care. Keep every receipt.":
            "Tu empleador debe pagar tu atención médica. Guarda todos los recibos.",
        "Your salary must be paid within 7 days after the end of the month. If it is late, call MOM.":
            "Tu salario debe pagarse dentro de los 7 días después de fin de mes. Si se retrasa, llama al MOM.",
        "Your supervisor speaks very fast. You did not understand.":
            "Tu supervisor habla muy rápido. No entendiste.",
        "a day off from work": "un día libre del trabajo",
        "a day with no work": "un día sin trabajo",
        "a fixed time to see the doctor": "una hora fija para ver al médico",
        "a paper from the doctor that says you are sick":
            "un papel del médico que dice que estás enfermo",
        "a seat for old, pregnant or hurt people":
            "un asiento para personas mayores, embarazadas o heridas",
        "a short rest from work": "un descanso corto del trabajo",
        "a small place where a doctor sees you": "un lugar pequeño donde te atiende un médico",
        "a smaller amount": "una cantidad menor",
        "a station where you change to another line": "una estación donde cambias a otra línea",
        "add money to your card": "añadir dinero a tu tarjeta",
        "bring the food home in a box": "llevar la comida a casa en una caja",
        "change to another train line": "cambiar a otra línea de tren",
        "eat here, at a table": "comer aquí, en una mesa",
        "get off the train": "bajar del tren",
        "hot, with chilli": "picante, con chile",
        "it hurts": "duele",
        "not safe; you can get hurt": "no es seguro; puedes hacerte daño",
        "one more time": "una vez más",
        "one small shop inside a hawker centre": "una tienda pequeña dentro de un hawker centre",
        "paper money and coins": "billetes y monedas",
        "rice with chicken, a common Singapore meal":
            "arroz con pollo, una comida común en Singapur",
        "something to drink, like tea or juice": "algo para beber, como té o zumo",
        "stay home and sleep": "quedarse en casa y dormir",
        "strong shoes for work": "zapatos resistentes para el trabajo",
        "the boss at your worksite": "el jefe en tu obra",
        "the money you get for your work": "el dinero que recibes por tu trabajo",
        "the money you pay for the trip": "el dinero que pagas por el viaje",
        "the way out of the station": "la salida de la estación",
        "touch your card at the gate when you leave": "pasar la tarjeta por el torniquete al salir",
        "wait for the next train": "esperar el próximo tren",
        "what is the price": "cuál es el precio",
        "what you take to get better": "lo que tomas para mejorar",
        "when air comes out of your mouth with a loud sound":
            "cuando sale aire de tu boca con un sonido fuerte",
        "where you wait for the train": "donde esperas el tren",
        "your body is injured": "tu cuerpo está herido",
        "your body is very hot": "tu cuerpo está muy caliente",
        // AI Words (workshop lesson)
        "AI Words": "Palabras sobre la IA",
        "Know the key words people use when they talk about AI.":
            "Conoce las palabras clave que la gente usa cuando habla de la IA.",
        "computer programs that can do tasks that usually need a human mind":
            "programas de ordenador que pueden hacer tareas que normalmente necesitan una mente humana",
        "how an AI gets better by learning patterns from lots of examples":
            "cómo una IA mejora aprendiendo patrones de muchísimos ejemplos",
        "the examples (text, photos, recordings) an AI learns from":
            "los ejemplos (textos, fotos, grabaciones) de los que aprende una IA",
        "an AI you have a conversation with by typing, like ChatGPT or Gemini":
            "una IA con la que conversas escribiendo, como ChatGPT o Gemini",
        "the question or instruction you type or say to an AI":
            "la pregunta o petición que escribes o le dices a una IA",
        "AI that creates new things: text, pictures, music or video":
            "una IA que crea cosas nuevas: textos, imágenes, música o vídeos",
        "an AI that listens to your voice and answers out loud, like Siri":
            "una IA que escucha lo que dices y te contesta hablando, como Siri",
        "AI that can tell what is in a photo": "una IA que puede decir qué hay en una foto",
        "when an AI confidently gives an answer that is made up or wrong":
            "cuando una IA da con seguridad una respuesta inventada o equivocada",
        "Saying the AI gave a confident answer that was false.":
            "Decir que la IA dio con seguridad una respuesta falsa.",
        "Suggesting a more detailed question to get a better answer.":
            "Sugerir una pregunta más detallada para obtener una mejor respuesta.",
        "Which one is a chatbot?": '¿Cuál es un "chatbot"?',
        "Which word fits?": "¿Qué palabra encaja?",
        "Your friend has been using a chatbot and looks confused.":
            "Tu amigo ha estado usando un chatbot y parece confundido.",
        "Your friend searched for the book and could not find it anywhere.":
            "Tu amigo buscó el libro y no lo encontró en ningún sitio.",
        "Saying it was an AI that answers out loud.": "Decir que era una IA que contesta hablando.",
        "Saying it was the examples the AI learned from.": "Decir que eran los ejemplos de los que aprendió la IA.",
        "Your friend asked a chatbot to plan a trip.": "Tu amigo le pidió a un chatbot que planeara un viaje.",
        "The answer did not have enough detail to be useful.":
            "La respuesta no tenía suficientes detalles para ser útil.",
        "Suggesting they change what the AI learned from.": "Sugerir cambiar lo que la IA usó para aprender.",
        "Suggesting they use an AI that reads photos.": "Sugerir usar una IA que lee fotos.",
        "A chatbot answers whatever you type, and what you type is your prompt. Try the ideas below, or ask anything you like.":
            "Un chatbot responde a todo lo que escribes, y lo que escribes es tu prompt. Prueba las ideas de abajo o pregunta lo que quieras.",
        "Say exactly what you want.": "Di exactamente lo que quieres.",
        "Give context: who it is for, and limits like time or budget.":
            "Da contexto: para quién es y límites como el tiempo o el presupuesto.",
        "Say the format: a list, three sentences, a short message.":
            "Di el formato: una lista, tres frases, un mensaje corto.",
        "Not happy with the answer? Ask a follow-up to change it.":
            "¿No te gusta la respuesta? Haz una pregunta de seguimiento para cambiarla.",
        "Ask about an AI word": "Pregunta por una palabra de IA",
        "Pick any word from the lesson and ask the chatbot to explain it.":
            "Elige cualquier palabra de la lección y pide al chatbot que la explique.",
        "Send a vague prompt": "Envía un prompt poco claro",
        "Send this short prompt and see what comes back.": "Envía este prompt corto y mira qué te responde.",
        "Now add the details": "Ahora añade los detalles",
        "Same request with context, limits and a format. Compare the two answers.":
            "La misma petición con contexto, límites y formato. Compara las dos respuestas.",
        "Make something new": "Crea algo nuevo",
        "That's generative AI: it writes something that did not exist before.":
            "Eso es IA generativa: escribe algo que no existía antes.",
        "Ask a follow-up": "Haz una pregunta de seguimiento",
        "Change the last answer without starting again.": "Cambia la última respuesta sin empezar de nuevo.",
        "Check for a hallucination": "Comprueba si hay una alucinación",
        "Ask for facts, then ask if it is sure. Chatbots can sound confident and still be wrong.":
            "Pide datos y luego pregunta si está seguro. Los chatbots pueden sonar muy seguros y aun así equivocarse.",
        "Getting to know someone": "Conocer a alguien",
        "Say your name and where you are from, and ask new people about themselves.":
            "Di tu nombre y de dónde eres, y pregunta a las personas nuevas sobre ellas.",
        "People in Singapore often say \"Have you eaten?\" as a friendly hello. You can say \"Yes, thank you.\"":
            "En Singapur, la gente suele decir \"Have you eaten?\" como saludo amistoso. Puedes responder \"Yes, thank you.\"",
        "People may call an older woman \"Aunty\" and an older man \"Uncle\". It is polite, even if you are not family.":
            "A una mujer mayor la pueden llamar \"Aunty\" y a un hombre mayor, \"Uncle\". Es una forma educada de hablar, aunque no sean familia.",
        "You do not have to answer every question. If someone asks about your pay or your family and you do not want to say, you can smile and change the topic.":
            "No tienes que responder a todas las preguntas. Si alguien pregunta por tu sueldo o tu familia y no quieres hablar de eso, puedes sonreír y cambiar de tema.",
        "The best way to learn is to talk. Say hello to one new person on your day off.":
            "La mejor forma de aprender es hablar. Saluda a una persona nueva en tu día libre.",
        "what people call you": "el nombre que usa la gente para llamarte",
        "a place like India or Bangladesh": "un lugar como India o Bangladés",
        "your parents, husband or wife, and children":
            "tus padres, tu marido o tu mujer, y tus hijos",
        "young boys and girls; sons and daughters": "niños y niñas; hijos e hijas",
        "someone you like and spend time with": "alguien que te cae bien y con quien pasas tiempo",
        "the work you do for money": "el trabajo que haces para ganar dinero",
        "something you like to do in your free time": "algo que te gusta hacer en tu tiempo libre",
        "the day after Saturday; many workers rest":
            "el día después del sábado; muchos trabajadores descansan",
        "Asking someone's name.": "Preguntar el nombre de alguien.",
        "Telling someone your name.": "Decir tu nombre.",
        "Asking which country someone comes from.": "Preguntar de qué país viene alguien.",
        "Asking what work someone does.": "Preguntar en qué trabaja alguien.",
        "Saying you are happy to meet someone new.": "Decir que te alegra conocer a alguien.",
        "Asking about someone's day off.": "Preguntar por el día libre de alguien.",
        "You meet someone new at the park on your day off.":
            "Conoces a alguien en el parque durante tu día libre.",
        "The new person asks your name.": "La persona que acabas de conocer pregunta tu nombre.",
        "Your friend brings a new person to meet you.":
            "Tu amigo trae a alguien para presentártelo.",
        "The new person tells you her name.": "La mujer que acabas de conocer dice su nombre.",
        "What is your job?": "¿En qué trabajas?",
        "Helping at home": "Ayudar en casa",
        "Understand what to do at home, say what you have finished, and ask when you are not sure.":
            "Entiende qué hacer en casa, di lo que has terminado y pregunta cuando tengas dudas.",
        "Never lean out of a window to clean it or to hang clothes. If someone asks you to, say it is not safe.":
            "Nunca saques el cuerpo por una ventana para limpiarla o tender ropa. Si alguien te lo pide, di que no es seguro.",
        "Never throw anything out of a window. Put rubbish in the rubbish chute or the bin.":
            "Nunca tires nada por la ventana. Pon la basura en el conducto con una pequeña puerta de metal en la cocina o en el cubo de basura.",
        "Never mix bleach with other cleaning products. The gas can hurt you.":
            "Nunca mezcles lejía con otros productos de limpieza. El gas puede hacerte daño.",
        "If you do not know how to use a machine, ask first. It is better to ask than to break it.":
            "Si no sabes usar una máquina, pregunta primero. Es mejor preguntar que romperla.",
        "clothes to wash": "ropa para lavar",
        "a hot tool that makes clothes flat":
            "una herramienta caliente que quita las arrugas de la ropa",
        "a stick with cloth for washing the floor": "un palo con tela para lavar el suelo",
        "plates and bowls you eat from": "platos y cuencos que usas para comer",
        "things you throw away": "cosas que tiras",
        "a cold box that keeps food fresh": "un armario frío que mantiene los alimentos frescos",
        "where you cook food with fire": "donde cocinas los alimentos con fuego",
        "a place with doors to keep things": "un lugar con puertas para guardar cosas",
        "Asking what work comes after this.": "Preguntar qué trabajo viene después.",
        "Saying the laundry is done.": "Decir que has terminado de lavar la ropa.",
        "Asking where something goes.": "Preguntar dónde poner algo.",
        "Asking someone to show you the way to do it.":
            "Pedir a alguien que te enseñe cómo hacerlo.",
        "Saying sorry and telling the truth about a broken plate.":
            "Pedir perdón y decir la verdad sobre un plato roto.",
        "You finished washing the clothes. Your employer comes into the room.":
            "Has terminado de lavar la ropa. Tu empleador entra en la habitación.",
        "Your employer asks if the clothes are washed.":
            "Tu empleador pregunta si la ropa está lavada.",
        "There is a new iron at home. You do not know how to use it.":
            "Hay una plancha nueva en casa. No sabes cómo usarla.",
        "Your employer asks you to iron the shirts.":
            "Tu empleador te pide que planches las camisas.",
        "Sorry, I broke a plate.": "Perdón, he roto un plato.",
        "Reading signs": "Leer los letreros",
        "Read the signs you see every day, and ask when you do not understand one.":
            "Lee los letreros que ves cada día y pregunta cuando no entiendas alguno.",
        "Red signs usually mean stop or danger. Yellow means be careful. Green usually means safe, or the way out.":
            "Los letreros rojos suelen indicar que pares o que hay peligro. El amarillo indica precaución. El verde suele indicar que es seguro o mostrar la salida.",
        "You can be fined for smoking where it is not allowed. Many places have a yellow box that shows where you can smoke.":
            "Te pueden multar por fumar donde está prohibido. En muchos lugares, un recuadro amarillo marca dónde puedes fumar.",
        "Many signs in Singapore are in English, Chinese, Malay and Tamil. If your language is there, read it first, then look for the English word.":
            "Muchos letreros en Singapur están en inglés, chino, malayo y tamil. Si aparece tu idioma, léelo primero y luego busca la palabra en inglés.",
        "Not sure what a sign means? Take a photo and ask someone. Do not go past a danger sign.":
            "¿No sabes qué significa un letrero? Haz una foto y pregunta a alguien. No pases más allá de un letrero de peligro.",
        "the floor has water; you can slip": "hay agua en el suelo; puedes resbalar",
        "do not go in": "no entres",
        "do not smoke here": "no fumes aquí",
        "not open now": "ahora no está abierto",
        "press the door away from you": "empuja la puerta alejándola de ti",
        "bring the door towards you": "tira de la puerta hacia ti",
        "the room with a toilet, in a public place":
            "la habitación con un inodoro en un lugar público",
        "something here can hurt you": "algo aquí puede hacerte daño",
        "Asking someone to explain a sign.": "Pedir a alguien que explique un letrero.",
        "Telling someone to be careful of the wet floor.":
            "Decir a alguien que tenga cuidado con el suelo mojado.",
        "Asking the way to the toilet.": "Preguntar el camino al baño.",
        "Saying a shop is not open.": "Decir que una tienda no está abierta.",
        "Telling someone they are not allowed to enter.":
            "Decir a alguien que no tiene permiso para entrar.",
        "You are new in a building and you need the toilet. You see a cleaner.":
            "Es la primera vez que estás en este edificio y necesitas ir al baño. Ves a alguien del personal de limpieza.",
        "The cleaner asks if you need help.": "La persona de limpieza pregunta si necesitas ayuda.",
        "Your friend is walking to a door with a red No Entry sign.":
            "Tu amigo camina hacia una puerta con un letrero rojo de No Entry.",
        "Your friend asks if they can go in.": "Tu amigo pregunta si puede entrar.",
        "The shop is closed.": "La tienda está cerrada.",
        "Buses and finding your way": "Autobuses y cómo encontrar el camino",
        "Find the right bus, get off at your stop, and ask for directions when you are lost.":
            "Busca el autobús correcto, baja en tu parada y pregunta el camino si te pierdes.",
        "Tap your card when you get on the bus and again when you get off. If you forget to tap when you get off, you can pay more.":
            "Pasa la tarjeta por el lector al subir al autobús y otra vez al bajar. Si olvidas hacerlo al bajar, puedes pagar más.",
        "Press the bell just before your stop. If nobody presses it and nobody is waiting, the bus does not stop.":
            "Pulsa el timbre justo antes de tu parada. Si nadie lo pulsa y nadie espera, el autobús no para.",
        "Raise your hand when your bus comes, so the driver knows to stop.":
            "Levanta la mano cuando llegue tu autobús para que el conductor sepa que debe parar.",
        "Cross the road at a traffic light or an overhead bridge. You can be fined for crossing somewhere else nearby.":
            "Cruza por un semáforo o por un puente peatonal sobre la calle. Te pueden multar por cruzar en otro sitio cercano.",
        "where you wait for the bus": "donde esperas el autobús",
        "press it to ask the bus to stop": "púlsalo para pedir que pare el autobús",
        "the side of your left hand": "el lado de tu mano izquierda",
        "the side of your right hand": "el lado de tu mano derecha",
        "keep going ahead; do not turn": "sigue recto; no gires",
        "the lights that say stop or go": "las luces que indican cuándo parar o avanzar",
        "a bridge for walking over a road": "un puente para cruzar a pie por encima de una calle",
        "a picture that shows where places are": "un dibujo que muestra dónde están los lugares",
        "Asking which bus to take.": "Preguntar qué autobús tomar.",
        "Asking the way to the bus stop.": "Preguntar el camino a la parada de autobús.",
        "Telling someone the way.": "Indicar el camino a alguien.",
        "Saying you do not know where you are.": "Decir que no sabes dónde estás.",
        "Asking someone to tell you when to get off.": "Pedir a alguien que te avise cuándo bajar.",
        "You are at a bus stop and want to go to Little India. A woman is waiting next to you.":
            "Estás en una parada de autobús y quieres ir a Little India. Una mujer espera a tu lado.",
        "The woman asks if you are waiting for a bus.":
            "La mujer pregunta si estás esperando un autobús.",
        "You do not know this road and your phone has no battery. You see a man walking.":
            "No conoces esta calle y tu teléfono no tiene batería. Ves a un hombre caminando.",
        "The man asks if he can help you.": "El hombre pregunta si puede ayudarte.",
        "Please tell me my stop.": "Avísame en mi parada, por favor.",
        "At the supermarket": "En el supermercado",
        "Find what you need, check the price and the date, and pay at the counter.":
            "Busca lo que necesitas, comprueba el precio y la fecha, y paga en la caja.",
        "Big supermarkets charge at least 5 cents for each plastic bag. Bring your own bag to save money.":
            "Los supermercados grandes cobran al menos 5 céntimos por cada bolsa de plástico. Lleva tu propia bolsa para ahorrar.",
        "Look for the date on food before you buy it. \"Best before\" and \"Use by\" tell you how long it is good.":
            "Mira la fecha de los alimentos antes de comprarlos. \"Best before\" y \"Use by\" indican hasta cuándo están en buen estado.",
        "Keep the receipt when you shop for someone else, so you can show what you spent.":
            "Guarda el recibo cuando compres para otra persona, para poder mostrar lo que has gastado.",
        "The cashier may ask if you have a member card. If you do not have one, just say no.":
            "La persona de la caja puede preguntar si tienes tarjeta de socio. Si no tienes, basta con decir que no.",
        "a big basket on wheels": "una cesta grande con ruedas",
        "the walkway between shelves": "el pasillo entre las estanterías",
        "the person you pay": "la persona a la que pagas",
        "the paper that shows what you paid": "el papel que muestra lo que has pagado",
        "a lower price than usual": "un precio más bajo de lo normal",
        "the last day the food is good": "el último día en que el alimento está en buen estado",
        "a thin bag to carry your shopping": "una bolsa fina para llevar la compra",
        "plants you cook and eat, like carrots": "plantas que cocinas y comes, como las zanahorias",
        "Asking where to find something.": "Preguntar dónde encontrar algo.",
        "Asking if the price is lower today.": "Preguntar si el precio es más bajo hoy.",
        "Asking the cashier for a bag.": "Pedir una bolsa en la caja.",
        "Asking the cashier for the receipt.": "Pedir el recibo en la caja.",
        "Telling staff that the food is past its date.":
            "Decir al personal que el alimento ha pasado su fecha de caducidad.",
        "You are paying at the counter. You do not have your own bag.":
            "Estás pagando en la caja. No tienes tu propia bolsa.",
        "The cashier tells you the price.": "La persona de la caja te dice el precio.",
        "The milk in your basket is past its date. You show it to a staff member.":
            "La leche de tu cesta ha pasado su fecha de caducidad. Se la muestras a alguien del personal.",
        "A staff member asks if they can help you.":
            "Una persona del personal pregunta si puede ayudarte.",
        "Is this on discount?": "¿Esto tiene descuento?",
        "Construction science": "La ciencia de la construcción",
        "Learn the main building materials, why a building stays up, and how to warn others about a problem.":
            "Conoce los principales materiales de construcción, por qué un edificio se mantiene en pie y cómo avisar a los demás si hay un problema.",
        "Concrete is strong when it is pressed, but it cracks when it is pulled. That is why steel bars go inside it.":
            "El hormigón resiste bien cuando se comprime, pero se agrieta cuando se tira de él. Por eso lleva barras de acero dentro.",
        "Too much water makes concrete weak. Use only the amount of water your supervisor tells you.":
            "Demasiada agua debilita el hormigón. Usa solo la cantidad de agua que te indique tu supervisor.",
        "Concrete goes hard slowly. It takes about 28 days to reach full strength, so ask your supervisor before you put weight on it.":
            "El hormigón se endurece poco a poco. Tarda unos 28 días en alcanzar toda su resistencia. Pregunta a tu supervisor antes de poner peso encima.",
        "A building carries its weight down: from the floor to the beams, to the columns, then into the ground. Never cut a beam or a column without permission.":
            "El peso del edificio baja desde el suelo de cada planta a las vigas, luego a los pilares y por último al terreno. Nunca cortes una viga o un pilar sin permiso.",
        "Every scaffold has a weight limit. Too much weight can make it fall, so do not add more than you are told.":
            "Cada andamio tiene un límite de peso. Demasiado peso puede hacerlo caer. No pongas más del que te han indicado.",
        "cement, sand, stones and water mixed; it goes hard":
            "mezcla de cemento, arena, piedras y agua que se endurece",
        "the grey powder that holds concrete together": "el polvo gris que une el hormigón",
        "a long metal rod inside concrete": "una barra larga de acero dentro del hormigón",
        "a strong part that goes across and holds up a floor":
            "una parte resistente que va en horizontal y sostiene el suelo de una planta",
        "a strong part that stands up and carries the weight":
            "una parte resistente que está de pie y soporta el peso",
        "the weight something must carry": "el peso que algo debe soportar",
        "a tool that shows if something is flat":
            "una herramienta que indica si una superficie está nivelada",
        "a metal frame you stand on to work up high":
            "una estructura de metal donde te subes para trabajar en altura",
        "Warning that the concrete is not hard yet.": "Avisar de que el hormigón aún no está duro.",
        "Saying that something weighs too much.": "Decir que algo pesa demasiado.",
        "Telling someone to stop adding water to the mix.":
            "Decir a alguien que deje de añadir agua a la mezcla.",
        "Reporting a crack to your supervisor.": "Informar a tu supervisor de una grieta.",
        "Asking someone to make sure the scaffold is safe.":
            "Pedir a alguien que compruebe que el andamio es seguro.",
        "A worker is about to walk on the floor you poured this morning.":
            "Un trabajador va a caminar sobre el suelo donde vertiste hormigón esta mañana.",
        "The worker asks if he can walk here.": "El trabajador pregunta si puede caminar por aquí.",
        "Your co-worker is mixing concrete and keeps pouring in water.":
            "Tu compañero está mezclando hormigón y no deja de echar agua.",
        "Your co-worker wants to add more water.": "Tu compañero quiere añadir más agua.",
        "There is a crack in this column.": "Hay una grieta en este pilar.",
    },
};

export function isContentLanguage(language: string): language is ContentLanguage {
    return language in LESSON_CONTENT_COPY;
}
