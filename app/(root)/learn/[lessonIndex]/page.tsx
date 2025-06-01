import React from 'react'
import { lessons } from '@/components/constants'
import { instructions } from '@/utils/conversation_config'
import { getCurrentUser } from '@/lib/actions/user.actions'
import ConsolePage from '@/components/ConsolePage'
import Lesson from '@/components/Lesson'

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
  const specificInstructions = instructions
    .replace('<<NAME>>', user?.firstName)
    .replace('<<LESSON_TITLE>>', lessonTitle)
    .replace('<<LESSON_DESCRIPTION>>', lessonDescription)
    .replace('<<LEARNING_OBJECTIVES>>', lessonObjectives.join(', '));
  console.log(specificInstructions);

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
      <Lesson initialInstructions={specificInstructions}></Lesson>
    </section>
  )
}

export default LessonPage