import React from "react";

type Props = {
    lessonObjectives: string[];
    lessonObjectivesProgress: boolean[];
};

const ObjectivesMet = ({
    lessonObjectives,
    lessonObjectivesProgress,
}: Props) => {
    return (
        <div>
            {lessonObjectives.map((objective, index) => (
                <span key={index} className="flex gap-2">
                    <h1>{objective}</h1>
                    <span>:</span>
                    {lessonObjectivesProgress[index] ? "✅" : "❌"}
                </span>
            ))}
        </div>
    );
};

export default ObjectivesMet;
