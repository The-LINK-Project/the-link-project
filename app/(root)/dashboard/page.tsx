import React from 'react'
import { lessons } from '@/constants'
import Link from 'next/link'

const DashboardPage = () => {
  return (
    <section>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {lessons.map((lesson, index) => (
          <Link href={`/learn/${index}`} key={index}>
            <div className='bg-white rounded-lg p-4 shadow-md h-full flex flex-col'>
              <h2 className='text-lg font-bold mb-2'>{index+1}. {lesson.title}</h2>
              <p className='text-sm text-gray-600 flex-1'>{lesson.description}</p>
            </div>
          </Link>
        ))}
        </div>
    </section>
  )
}

export default DashboardPage