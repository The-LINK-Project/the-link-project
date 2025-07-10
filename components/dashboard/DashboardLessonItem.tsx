import React from "react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getProgressStatus as getLessonStatusData } from "@/lib/clientUtils";

type DashboardLessonItemProps = {
    lesson: Lesson
    lessonNum: number
    lessonStatus: LessonStatus
}

const DashboardLessonItem = (props: DashboardLessonItemProps) => {
    const { lesson, lessonNum, lessonStatus } = props; 

    const status = getLessonStatusData(lessonStatus);

  return (
    <Link href={`/learn/${lessonNum}`} key={lessonNum} className="group">
              <Card
                className={`h-full transition-all duration-200 hover:shadow-lg hover:-translate-y-1 cursor-pointer ${status.cardClass}`}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-[rgb(90,199,219)] flex items-center justify-center text-white font-semibold text-sm">
                        {lessonNum}
                      </div>
                      <CardTitle className="text-lg group-hover:text-[rgb(90,199,219)] transition-colors">
                        {lesson.title}

                        {/* for adrish: im adding the lesson difficulty here u can style later with a swtich for beginner, intermediate, advanced*/}
                        {lesson.difficulty && (
                          <Badge variant="secondary" className={status.badge}>
                            {lesson.difficulty}
                          </Badge>
                        )}
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
                      {lessonStatus}
                    </Badge>
                    <div className="text-xs text-gray-500">
                      Lesson {lessonNum}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
  )
}

export default DashboardLessonItem