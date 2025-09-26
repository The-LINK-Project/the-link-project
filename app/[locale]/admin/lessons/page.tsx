import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Plus, Settings, ArrowRight } from "lucide-react";
import Link from "next/link";
import { getAllLessons } from "@/lib/actions/Lesson.actions";

interface LessonData {
  _id: string;
  title: string;
  description: string;
  objectives: string[];
  lessonIndex: number;
  difficulty: string;
}

export default async function LessonsMainPage() {
  // Fetch lessons server-side (faster and more reliable)
  let lessons: LessonData[] = [];
  try {
    const fetchedLessons = await getAllLessons();
    lessons = fetchedLessons as LessonData[];
  } catch (error) {
    console.error("Error fetching lessons:", error);
    // lessons remains empty array
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">
                Lesson Management
              </h1>
              <p className="text-slate-600 mt-2">
                Create and manage your educational content
              </p>
            </div>
            <Badge
              variant="secondary"
              className="bg-green-50 text-green-700 border-green-200"
            >
              {`${lessons.length} Lessons`}
            </Badge>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Create Lessons Card */}
          <Card className="group hover:shadow-lg transition-all duration-300 border-slate-200 hover:border-green-300 bg-white">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center shadow-md">
                    <Plus className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-xl font-semibold text-slate-900">
                      Create Lessons
                    </CardTitle>
                    <CardDescription className="text-slate-600">
                      Add new educational content
                    </CardDescription>
                  </div>
                </div>
                <Badge
                  variant="outline"
                  className="text-green-700 border-green-200 bg-green-50"
                >
                  Active
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-2">
              <p className="text-slate-600 mb-6 leading-relaxed text-sm">
                Create comprehensive lesson plans with objectives, descriptions,
                and difficulty levels. Build engaging educational content for
                your students.
              </p>

              <div className="space-y-3 mb-6">
                <div className="flex items-center text-sm text-slate-600">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  Set lesson titles and descriptions
                </div>
                <div className="flex items-center text-sm text-slate-600">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  Define learning objectives
                </div>
                <div className="flex items-center text-sm text-slate-600">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  Assign difficulty levels
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <div className="flex items-center gap-4 text-sm text-slate-500">
                  <div className="flex items-center gap-1">
                    <BookOpen className="h-4 w-4" />
                    <span>Content</span>
                  </div>
                </div>

                <Link href="/admin/lessons/create">
                  <Button
                    size="sm"
                    className="bg-green-500 hover:bg-green-600 text-white"
                  >
                    Create Lesson
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Manage Lessons Card */}
          <Card className="group hover:shadow-lg transition-all duration-300 border-slate-200 hover:border-blue-300 bg-white">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center shadow-md">
                    <Settings className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-xl font-semibold text-slate-900">
                      Manage Lessons
                    </CardTitle>
                    <CardDescription className="text-slate-600">
                      View and edit existing content
                    </CardDescription>
                  </div>
                </div>
                <Badge
                  variant="outline"
                  className="text-blue-700 border-blue-200 bg-blue-50"
                >
                  {`${lessons.length} Items`}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-2">
              <p className="text-slate-600 mb-6 leading-relaxed text-sm">
                View all existing lessons, edit content, delete outdated
                materials, and organize your educational resources effectively.
              </p>

              <div className="space-y-3 mb-6">
                <div className="flex items-center text-sm text-slate-600">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                  View all lesson content
                </div>
                <div className="flex items-center text-sm text-slate-600">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                  Edit and update lessons
                </div>
                <div className="flex items-center text-sm text-slate-600">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                  Delete unnecessary content
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <div className="flex items-center gap-4 text-sm text-slate-500">
                  <div className="flex items-center gap-1">
                    <BookOpen className="h-4 w-4" />
                    <span>Database</span>
                  </div>
                </div>

                <Link href="/admin/lessons/manage">
                  <Button
                    size="sm"
                    className="bg-blue-500 hover:bg-blue-600 text-white"
                  >
                    Manage Lessons
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Stats */}
        {lessons.length > 0 && (
          <div className="mt-12 max-w-4xl mx-auto">
            <h2 className="text-xl font-semibold text-slate-900 mb-6">
              Quick Overview
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="bg-white border-slate-200">
                <CardContent className="p-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-green-600">
                      {
                        lessons.filter((l) => l.difficulty === "beginner")
                          .length
                      }
                    </p>
                    <p className="text-sm text-slate-600">Beginner Lessons</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white border-slate-200">
                <CardContent className="p-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-yellow-600">
                      {
                        lessons.filter((l) => l.difficulty === "intermediate")
                          .length
                      }
                    </p>
                    <p className="text-sm text-slate-600">
                      Intermediate Lessons
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white border-slate-200">
                <CardContent className="p-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-red-600">
                      {
                        lessons.filter((l) => l.difficulty === "advanced")
                          .length
                      }
                    </p>
                    <p className="text-sm text-slate-600">Advanced Lessons</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
