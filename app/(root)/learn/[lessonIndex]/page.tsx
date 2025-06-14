import React from 'react';
import { lessons } from '@/constants';
import { instructions } from '@/utils/conversation_config';
import { getCurrentUser } from '@/lib/actions/user.actions';
import ConsolePage from '@/components/ConsolePage';
import Lesson from '@/components/Lesson';
import { getLessonProgress } from '@/lib/actions/LessonProgress.actions';
import { formatConvoHistory } from '@/lib/utils';
import { checkIfLessonProgress } from '@/lib/actions/LessonProgress.actions';

type LessonPageProps = {
  params: {
    lessonIndex: string
  }
}

const LessonPage = async ({ params }: LessonPageProps) => {
  const user = await getCurrentUser();
  console.log("OINK");
  console.log(user.firstName);
  
  const index = parseInt(params.lessonIndex, 10)
  const lesson = lessons[index]
  if (!lesson) {
    return <div>Lesson not found.</div>
  }
  const lessonTitle = lesson.title;
  const lessonDescription = lesson.description;
  const lessonObjectives = lesson.objectives;
  let specificInstructions = instructions
    .replace('<<NAME>>', user?.firstName)
    .replace('<<LESSON_TITLE>>', lessonTitle)
    .replace('<<LESSON_DESCRIPTION>>', lessonDescription)
    .replace('<<LEARNING_OBJECTIVES>>', lessonObjectives.join(', '));
  console.log(specificInstructions);

  const lessonProgressArray = await getLessonProgress({ lessonIndex: index });
  const lessonProgress = lessonProgressArray[0];
  console.log(lessonProgress)

  // if there is lesson progress then this changes to that
  let lessonConvoHistory = []
  let lessonObjectivesProgress = []

  if (lessonProgress) {
    lessonObjectivesProgress = lessonProgress.objectivesMet;
    console.log("TEST ))")
    console.log(lessonObjectivesProgress)
    lessonConvoHistory = lessonProgress.convoHistory;
    console.log("TEST 0");
    console.log(lessonProgress.convoHistory)
    console.log("TEST!");
    console.log(lessonConvoHistory);
    
    let formattedConvoHistory: string | null = null;

    if (lessonConvoHistory && lessonConvoHistory.length > 0) {
      console.log(lessonConvoHistory)
      formattedConvoHistory = formatConvoHistory(lessonConvoHistory);
      console.log("FORMATTED: ")
      console.log(formattedConvoHistory)
    }
    specificInstructions = specificInstructions.replace(
      '<<PREVIOUS_CONVERSATION>>',
      formattedConvoHistory ?? ''
    );
    console.log(specificInstructions)
  }
// check if they have done any part of the lesson before.
  const isLessonProgress = await checkIfLessonProgress({lessonIndex: index})
  console.log(isLessonProgress)




  return (
    <section className="max-w-2xl mx-auto mt-10 bg-white rounded-xl shadow-lg p-8">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-4">{lesson.title}</h1>
      <p className="text-lg text-gray-700 mb-6">{lesson.description}</p>
      <h2 className="text-xl font-semibold text-blue-700 mb-3">Objectives</h2>
      <ul className="list-disc list-inside space-y-2 pl-2">
        {lesson.objectives.map((objective, i) => (
          <li key={i} className="text-gray-800 text-base">{objective}</li>
        ))}
      </ul>
      <Lesson initialInstructions={specificInstructions} lessonIndex={index} previousConvoHistory = {lessonConvoHistory} previousLessonObjectivesProgress = {lessonObjectivesProgress} lessonObjectives = {lessonObjectives} isLessonProgress = {isLessonProgress}></Lesson>
    </section>
  )
}

export default LessonPage