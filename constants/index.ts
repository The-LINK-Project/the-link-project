export const navLinks = [
    {
        name: "Home",
        route: "/"
    },
    {
        name: "Contact",
        route: "/contact"
    },
    {
        name: "About Us",
        route:"/about"
    },
    {
        name: "Get Started",
        route: "/dashboard"
    }
]

export const frequentlyAskedQuestions = [
    {
        question: "What is the LINK Project?",
        answer: "The LINK Project supports English learning for migrant workers in Singapore through a personalized AI voice assistant, helping improve daily communication and confidence."
    },
    {
        question: "When will the LINK Project launch",
        answer: "The core features will be launched in July."
    },
    {
        question: "How can I contribute towards the LINK Project",
        answer: "You can share your ideas on the google form linked to the website to inform us of what you would like to see and any suggestions you have."
    },
    {
        question: "Will the LINK Project be free?",
        answer: "Yes, the LINK Project is completely free and no payment will be required."
    },
    {
        question: "What kind of support does the LINK Project provide?",
        answer: "The Link Project gives you a free AI voice assistant to help improve your English anytime, anywhere. It helps you learn words, speak clearly, and feel more confident talking to your boss or in daily life."
    }
]; 

export const lessons: LessonData[] = [
    {
        title: "Introduction to Greetings",
        description: "Learn how to greet people in English for different times of the day and situations. Practice saying hello, introducing yourself, and responding politely.",
        objectives: [
            "Understand common English greetings",
            "Introduce yourself and ask for names",
            "Respond to greetings appropriately"
        ]
    },
    {
        title: "Talking About Your Job",
        description: "Learn vocabulary and phrases to talk about your work, job title, and daily tasks. Practice describing your job to others.",
        objectives: [
            "Use simple sentences to describe your job",
            "Learn job-related vocabulary",
            "Ask and answer questions about work"
        ]
    },
    {
        title: "Asking for Directions",
        description: "Practice asking for and giving directions in English. Learn key phrases to help you find places in Singapore.",
        objectives: [
            "Ask for directions politely",
            "Understand common location words (left, right, straight, etc.)",
            "Give simple directions to others"
        ]
    },
    {
        title: "Shopping and Money",
        description: "Learn how to communicate in shops and markets. Practice asking about prices, making purchases, and handling money.",
        objectives: [
            "Ask about prices and items",
            "Understand numbers and currency",
            "Use polite phrases when shopping"
        ]
    },
    {
        title: "Talking About the Past (Past Tense)",
        description: "Understand how to use the past tense to talk about things that happened before. Learn regular and irregular verbs.",
        objectives: [
            "Identify regular and irregular past tense verbs",
            "Form sentences using the past tense",
            "Talk about past experiences"
        ]
    },
    {
        title: "Health and Emergencies",
        description: "Learn important vocabulary and phrases for talking about health, feeling unwell, and emergencies.",
        objectives: [
            "Describe basic health problems",
            "Ask for help in emergencies",
            "Understand instructions from medical staff"
        ]
    },
    {
        title: "Making Requests and Asking for Help",
        description: "Practice making polite requests and asking for help in different situations, such as at work or in public.",
        objectives: [
            "Use polite language to make requests",
            "Ask for help or permission",
            "Respond to requests from others"
        ]
    },
    {
        title: "Daily Routines and Time",
        description: "Learn to talk about your daily schedule, routines, and telling the time in English.",
        objectives: [
            "Describe your daily routine",
            "Tell the time and talk about schedules",
            "Ask and answer questions about routines"
        ]
    },
    {
        title: "Social English: Making Friends",
        description: "Build confidence in starting conversations, making friends, and talking about hobbies and interests.",
        objectives: [
            "Start and maintain a simple conversation",
            "Talk about hobbies and interests",
            "Exchange contact information"
        ]
    }
]

// lessonProgress -> userId, lessonIndex, objectivesMet: [true, false, false, true], convoHistory: [{role, message}]