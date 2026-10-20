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
    },
};

export function isContentLanguage(language: string): language is ContentLanguage {
    return language in LESSON_CONTENT_COPY;
}
