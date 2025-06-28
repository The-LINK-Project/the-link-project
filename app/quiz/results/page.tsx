import Link from 'next/link';
import { getUserResults } from '@/lib/actions/results.actions';
import { createTestQuiz } from '@/lib/actions/quiz.actions';

export default async function ResultsPage() {
  const results = await getUserResults();
  
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Quiz Results</h1>
      
      <div className="mb-6 flex gap-4">
        <Link 
          href="/quiz/60f8a8d5287f1e00203b5f9b"
          className="inline-block px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Take Quiz
        </Link>
        
        <form action={createTestQuiz}>
          <button 
            type="submit"
            className="px-5 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            Create Test Quiz
          </button>
        </form>
      </div>
      
      {results.length === 0 ? (
        <div className="text-center p-12 border rounded-lg">
          <p className="text-lg">No quiz results found</p>
          <p className="text-gray-500 mt-2">Complete a quiz to see your results here</p>
        </div>
      ) : (
        <div className="border rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-4 text-left">Date</th>
                <th className="py-3 px-4 text-left">Quiz</th>
                <th className="py-3 px-4 text-left">Score</th>
              </tr>
            </thead>
            <tbody>
              {results.map((result) => (
                <tr key={result._id.toString()} className="border-t">
                  <td className="py-3 px-4">
                    {new Date(result.completedAt).toLocaleDateString()} {' '}
                    {new Date(result.completedAt).toLocaleTimeString()}
                  </td>
                  <td className="py-3 px-4">Simple Present Tense Quiz</td>
                  <td className="py-3 px-4 font-bold">
                    {result.score}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}