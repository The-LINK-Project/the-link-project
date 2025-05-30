import React from 'react'
import { lessons } from '@/components/constants'

type LessonPageProps = {
  params: {
    lessonIndex: string
  }
}

const LessonPage = ({ params }: LessonPageProps) => {
  const index = parseInt(params.lessonIndex, 10)
  const lesson = lessons[index]

  if (!lesson) {
    return <div>Lesson not found.</div>
  }

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
    </section>
  )
}

export default LessonPage