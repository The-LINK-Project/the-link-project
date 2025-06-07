import React from 'react'

type Props = {
    lessonObjectives: string[];
    lessonObjectivesProgress: boolean[];
}

const ObjectivesMet = ({lessonObjectives, lessonObjectivesProgress}: Props) => {
  return (
    <div>
        {
            lessonObjectives.map((objective, index) => (
                <div key={index}> 
                    <h1>{objective}</h1>: {lessonObjectivesProgress[index] ? '✅' : "❌"}
                </div>
            ))
        }
    </div>
  )
}

export default ObjectivesMet