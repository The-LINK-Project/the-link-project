import { Card, CardContent } from "@/components/ui/card"
import { Brain, Zap, Shield, Hourglass, HourglassIcon, Speech, BookOpenCheck } from "lucide-react"

const ProblemSection = () => {
  return (
    <div className="container mx-auto py-32 px-4">
      <div className="text-center mb-16">
        <p className="text-red-500 uppercase tracking-wide mb-4">THE CHALLENGE</p>
        <h2 className="text-5xl font-semibold tracking-tight mb-12">
          Learning English takes time and support.
        </h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 ml-16 pt-10">
        <div className="flex flex-col items-start">
          <div className="bg-red-100 p-4 rounded-full mb-4">
            <Speech className="text-red-500 h-6 w-6"></Speech>
            
          </div>
          <h3 className="text-xl font-semibold mb-3">Confidence in Speaking</h3>
          <p className="text-gray-600 text-lg mr-20 font-light">
          Despite understanding some English, speaking clearly in daily life or at work can still feel stressful or uncertain.
          </p>
        </div>
        <div className="flex flex-col items-start">
          <div className="bg-red-100 p-4 rounded-full mb-4">
            <HourglassIcon className="text-red-500 h-6 w-6"></HourglassIcon>
          </div>
          <h3 className="text-xl font-semibold mb-3">Finding Time</h3>
          <p className="text-gray-600 text-lg mr-20 font-light">
          With busy working hours and changing schedules, finding time to attend classes or stay consistent with learning can be difficult.
          </p>
        </div>
        
        <div className="flex flex-col items-start">
          <div className="bg-red-100 p-4 rounded-full mb-4">
            <BookOpenCheck className="text-red-500 w-6 h-6"></BookOpenCheck>
          </div>
          <h3 className="text-xl font-semibold mb-3">Lessons Aren't Practical</h3>
          <p className="text-gray-600 text-lg mr-20 font-light">
          Many learning tools focus on exams or formal English, making it hard to apply what’s learned to real conversations and everyday situations.
          </p>
        </div>
      </div>
    </div>
  )
}

export default ProblemSection