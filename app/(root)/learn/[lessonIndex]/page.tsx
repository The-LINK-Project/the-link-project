import React from "react";

import { instructions } from "@/utils/conversation_config";
import { getCurrentUser } from "@/lib/actions/user.actions";
import Lesson from "@/components/Lesson";
import { getLessonProgress } from "@/lib/actions/LessonProgress.actions";
import { formatConvoHistory, formatInitialObjectives } from "@/lib/utils";
import { checkIfLessonProgress } from "@/lib/actions/LessonProgress.actions";
import { getAllLessons } from "@/lib/actions/Lesson.actions";

type LessonPageProps = {
    params: {
        lessonIndex: string;
    };
};

const LessonPage = async ({ params }: LessonPageProps) => {

    const lessons = await getAllLessons()

    const user = await getCurrentUser();

    const index = parseInt(params.lessonIndex, 10);
    const lesson = lessons[index];
    if (!lesson) {
        return <div>Lesson not found.</div>;
    }

    // fill all the replacements in instructions
    const lessonTitle = lesson.title;
    const lessonDescription = lesson.description;
    const lessonObjectives = lesson.objectives;

    let lessonConvoHistory: Message[] = [];
    let lessonObjectivesProgress = [];
    let formattedConvoHistory: string | null = null;

    // check if the user has opened the lesson before
    const isLessonProgress = await checkIfLessonProgress({
        lessonIndex: index,
    });
    console.log(`IS THERE LESSON PROGRESS?: ${isLessonProgress}`)

    // if there is an object with the user and lesson in the database
    if (isLessonProgress) {
        // get the lesson progress
        const lessonProgress = await getLessonProgress({
            lessonIndex: index,
        });

        console.log(`LESSON PROG: ${lessonProgress}`)

        // set lesson objectives and convo history to progress
        lessonObjectivesProgress = lessonProgress.objectivesMet;
        lessonConvoHistory = lessonProgress.convoHistory;

        // if there is previous chat history in the lesson replace <<PREVIOUS_CONVERSATION>> with it else replace it with empty string
        if (lessonConvoHistory && lessonConvoHistory.length > 0) {
            formattedConvoHistory = formatConvoHistory(lessonConvoHistory);
        }
    } else {
        lessonObjectivesProgress = formatInitialObjectives(lessonObjectives);
    }

    let specificInstructions = instructions
        .replace("<<NAME>>", user?.firstName)
        .replace("<<LESSON_TITLE>>", lessonTitle)
        .replace("<<LESSON_DESCRIPTION>>", lessonDescription)
        .replace("<<PREVIOUS_CONVERSATION>>", formattedConvoHistory ?? "");

    return (
        <section className="max-w-2xl mx-auto mt-10 bg-white rounded-xl shadow-lg p-8">
            <h1 className="text-3xl font-extrabold text-gray-900 mb-4">
                {lesson.title}
            </h1>
            <p className="text-lg text-gray-700 mb-6">{lesson.description}</p>
            <h2 className="text-xl font-semibold text-blue-700 mb-3">
                Objectives
            </h2>
            <ul className="list-disc list-inside space-y-2 pl-2">
                {lesson.objectives.map((objective, i) => (
                    <li key={i} className="text-gray-800 text-base">
                        {objective}
                    </li>
                ))}
            </ul>
            <Lesson
                initialInstructions={specificInstructions}
                lessonIndex={index}
                previousConvoHistory={lessonConvoHistory}
                previousLessonObjectivesProgress={lessonObjectivesProgress}
                lessonObjectives={lessonObjectives}
                isLessonProgress={isLessonProgress}
            />
        </section>
    );
};

export default LessonPage;
