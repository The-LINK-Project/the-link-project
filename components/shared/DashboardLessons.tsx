import React from "react";
import Link from "next/link";
import { getAllLessonProgressesForDashboard } from "@/lib/actions/LessonProgress.actions";
import { getAllLessons } from "@/lib/actions/Lesson.actions";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, CheckCircle, Clock, Play } from "lucide-react";

const DashboardLessons = async () => {
  const lessons = await getAllLessons();
  const lessonProgresses = await getAllLessonProgressesForDashboard();

  // Get progress status styling
  const getProgressStatus = (progress: string) => {
    switch (progress) {
      case "Completed":
        return {
          badge: "bg-green-100 text-green-800 hover:bg-green-200",
          icon: <CheckCircle className="h-4 w-4 text-green-600" />,
          cardClass: "border-green-200 bg-green-50/30",
        };
      case "In Progress":
        return {
          badge: "bg-yellow-100 text-yellow-800 hover:bg-yellow-200",
          icon: <Play className="h-4 w-4 text-yellow-600" />,
          cardClass: "border-yellow-200 bg-yellow-50/30",
        };
      case "Not Started":
        return {
          badge: "bg-gray-100 text-gray-800 hover:bg-gray-200",
          icon: <Clock className="h-4 w-4 text-gray-600" />,
          cardClass: "border-gray-200 bg-gray-50/30",
        };
      default:
        return {
          badge: "bg-gray-100 text-gray-800 hover:bg-gray-200",
          icon: <BookOpen className="h-4 w-4 text-gray-600" />,
          cardClass: "border-gray-200",
        };
    }
  };

  return (
    <section className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Your Learning Journey
        </h1>
        <p className="text-gray-600">
          Continue where you left off or start a new lesson
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {lessons.map((lesson, index) => {
          const progressStatus = lessonProgresses[index];
          const status = getProgressStatus(progressStatus);

          return (
            <Link href={`/learn/${index + 1}`} key={index} className="group">
              <Card
                className={`h-full transition-all duration-200 hover:shadow-lg hover:-translate-y-1 cursor-pointer ${status.cardClass}`}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-[rgb(90,199,219)] flex items-center justify-center text-white font-semibold text-sm">
                        {index + 1}
                      </div>
                      <CardTitle className="text-lg group-hover:text-[rgb(90,199,219)] transition-colors">
                        {lesson.title}
                      </CardTitle>
                    </div>
                    {status.icon}
                  </div>
                </CardHeader>

                <CardContent className="pt-0">
                  <CardDescription className="text-sm text-gray-600 mb-4 line-clamp-3">
                    {lesson.description}
                  </CardDescription>

                  <div className="flex items-center justify-between">
                    <Badge variant="secondary" className={status.badge}>
                      {progressStatus}
                    </Badge>
                    <div className="text-xs text-gray-500">
                      Lesson {index + 1}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default DashboardLessons;
