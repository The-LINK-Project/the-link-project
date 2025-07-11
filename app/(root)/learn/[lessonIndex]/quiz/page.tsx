import React from "react";
import QuizClient from "@/components/quiz/QuizClient";

type QuizPageProps = {
  params: {
    lessonIndex: string;
  };
};
const page = ({ params }: QuizPageProps) => {
  const index = parseInt(params.lessonIndex, 10);

  return (
    <div>
      <QuizClient params={{ lessonIndex: index }} />
    </div>
  );
};

export default page;
