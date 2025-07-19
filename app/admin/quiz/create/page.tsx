import QuizForm from "@/components/admin/quiz/QuizForm";

export default function CreateQuizPage() {
  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto p-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-[rgb(90,199,219)] mb-4">
            Create New Quiz
          </h1>
          <p className="text-lg text-slate-600">
            Build your custom quiz with multiple choice questions
          </p>
        </div>
        <QuizForm />
      </div>
    </div>
  );
}
