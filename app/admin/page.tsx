import React from "react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  BookOpen,
  Brain,
  ArrowRight,
  Settings,
  BarChart3,
  Users,
  Target,
  TrendingUp,
} from "lucide-react";
import { getAllLessons } from "@/lib/actions/Lesson.actions";
import { getAllQuizzes, getQuizResultStats } from "@/lib/actions/quiz.actions";
import { getAllUsers, getUserStats } from "@/lib/actions/user.actions";
import { getLessonProgressStats } from "@/lib/actions/LessonProgress.actions";

const AdminPage = async () => {
  try {
    const [lessons, quizzes, users, userStats, lessonStats, quizStats] =
      await Promise.all([
        getAllLessons().catch(() => []),
        getAllQuizzes().catch(() => []),
        getAllUsers().catch(() => []),
        getUserStats().catch(() => ({ newUsersThisWeek: 0 })),
        getLessonProgressStats().catch(() => ({
          totalSessions: 0,
          completedObjectives: 0,
          completionRate: 0,
        })),
        getQuizResultStats().catch(() => ({
          totalAttempts: 0,
          averageScore: 0,
          highPerformers: 0,
          needSupport: 0,
        })),
      ]);

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        {/* Header */}
        <div className="bg-white border-b border-slate-200 shadow-sm">
          <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-slate-900">
                  Admin Dashboard
                </h1>
                <p className="text-slate-600 mt-2">
                  Manage your LINK Project content and monitor platform activity
                </p>
              </div>
              <Badge
                variant="secondary"
                className="bg-[rgb(90,199,219)]/10 text-[rgb(90,199,219)] border-[rgb(90,199,219)]/20"
              >
                Administrator
              </Badge>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-6 py-12">
          {/* Stats Overview - Only real database counts */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <Card className="bg-white border-slate-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">
                      Total Users
                    </p>
                    <p className="text-2xl font-bold text-slate-900">
                      {users.length}
                    </p>
                    <p className="text-xs text-green-600 mt-1">
                      +{userStats.newUsersThisWeek} this week
                    </p>
                  </div>
                  <Users className="h-8 w-8 text-[rgb(90,199,219)]" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border-slate-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">
                      Active Lessons
                    </p>
                    <p className="text-2xl font-bold text-slate-900">
                      {lessons.length}
                    </p>
                    <p className="text-xs text-blue-600 mt-1">
                      {lessonStats.totalSessions} sessions
                    </p>
                  </div>
                  <BookOpen className="h-8 w-8 text-slate-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border-slate-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">
                      Quiz Sets
                    </p>
                    <p className="text-2xl font-bold text-[rgb(90,199,219)]">
                      {quizzes.length}
                    </p>
                    <p className="text-xs text-purple-600 mt-1">
                      {quizStats.totalAttempts} attempts
                    </p>
                  </div>
                  <Brain className="h-8 w-8 text-[rgb(90,199,219)]" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border-slate-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">
                      Quiz Average
                    </p>
                    <p className="text-2xl font-bold text-slate-900">
                      {quizStats.averageScore}%
                    </p>
                  </div>
                  <BarChart3 className="h-8 w-8 text-[rgb(90,199,219)]" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Management Cards */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <Card className="group hover:shadow-lg transition-all duration-300 border-slate-200 hover:border-[rgb(90,199,219)]/30 bg-white">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-[rgb(90,199,219)] to-[rgb(70,179,199)] rounded-lg flex items-center justify-center shadow-md">
                      <Brain className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-xl font-semibold text-slate-900">
                        Quiz Management
                      </CardTitle>
                      <CardDescription className="text-slate-600">
                        Create and manage lesson quizzes
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
                  Design interactive quizzes to test student comprehension.
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  <div className="flex items-center gap-4 text-sm text-slate-500">
                    <div className="flex items-center gap-1">
                      <BarChart3 className="h-4 w-4" />
                      <span>Analytics</span>
                    </div>
                  </div>

                  <Link href="/admin/quiz">
                    <Button
                      size="sm"
                      className="bg-[rgb(90,199,219)] hover:bg-[rgb(70,179,199)] text-white"
                    >
                      Manage
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300 border-slate-200 hover:border-blue-300 bg-white">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center shadow-md">
                      <Users className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-xl font-semibold text-slate-900">
                        User Management
                      </CardTitle>
                      <CardDescription className="text-slate-600">
                        View user accounts and data
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
                  View user profiles and account information from the database.
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  <div className="flex items-center gap-4 text-sm text-slate-500">
                    <div className="flex items-center gap-1">
                      <Target className="h-4 w-4" />
                      <span>Database</span>
                    </div>
                  </div>

                  <Link href="/admin/users">
                    <Button
                      size="sm"
                      className="bg-blue-500 hover:bg-blue-600 text-white"
                    >
                      View Users
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300 border-slate-200 hover:border-slate-300 bg-white relative overflow-hidden">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-slate-400 to-slate-500 rounded-lg flex items-center justify-center shadow-md">
                      <BookOpen className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-xl font-semibold text-slate-900">
                        Lesson Management
                      </CardTitle>
                      <CardDescription className="text-slate-600">
                        Organize and structure lesson content
                      </CardDescription>
                    </div>
                  </div>
                  <Badge
                    variant="outline"
                    className="text-amber-700 border-amber-200 bg-amber-50"
                  >
                    Coming Soon
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-2">
                <p className="text-slate-600 mb-6 leading-relaxed text-sm">
                  Create comprehensive lesson plans and educational materials.
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  <div className="flex items-center gap-4 text-sm text-slate-400">
                    <div className="flex items-center gap-1">
                      <Settings className="h-4 w-4" />
                      <span>Structure</span>
                    </div>
                  </div>

                  <Button
                    disabled
                    size="sm"
                    variant="outline"
                    className="text-slate-400 border-slate-200 cursor-not-allowed"
                  >
                    Coming Soon
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Analytics - Only real data */}
          <div className="grid lg:grid-cols-2 gap-8">
            <Card className="bg-white border-slate-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-slate-900">
                  <TrendingUp className="h-5 w-5 text-[rgb(90,199,219)]" />
                  Learning Progress
                </CardTitle>
                <CardDescription>Data from lesson sessions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <span className="text-sm text-slate-700">
                      Objectives Completed
                    </span>
                    <span className="font-semibold text-slate-900">
                      {lessonStats.completedObjectives}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <span className="text-sm text-slate-700">
                      Completion Rate
                    </span>
                    <span className="font-semibold text-green-600">
                      {lessonStats.completionRate}%
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border-slate-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-slate-900">
                  <BarChart3 className="h-5 w-5 text-[rgb(90,199,219)]" />
                  Quiz Performance
                </CardTitle>
                <CardDescription>Data from quiz attempts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <span className="text-sm text-slate-700">
                      High Performers (80%+)
                    </span>
                    <span className="font-semibold text-green-600">
                      {quizStats.highPerformers}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <span className="text-sm text-slate-700">
                      Need Support ({"<"}60%)
                    </span>
                    <span className="font-semibold text-red-600">
                      {quizStats.needSupport}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error loading admin dashboard:", error);
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <Card className="p-8">
          <CardContent>
            <h1 className="text-2xl font-bold text-red-600 mb-4">
              Error Loading Dashboard
            </h1>
            <p className="text-slate-600">
              Please check your database connection and try again.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }
};

export default AdminPage;
