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
import { BookOpen, Brain, ArrowRight, Settings, BarChart3 } from "lucide-react";

const AdminPage = () => {
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
                Manage your LINK Project content
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
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Quiz Management Card */}
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
              <p className="text-slate-600 mb-6 leading-relaxed">
                Design interactive quizzes to test student comprehension. Create
                multiple choice questions, set difficulty levels, and track
                performance analytics.
              </p>

              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <div className="flex items-center gap-4 text-sm text-slate-500">
                  <div className="flex items-center gap-1">
                    <BarChart3 className="h-4 w-4" />
                    <span>Analytics</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Settings className="h-4 w-4" />
                    <span>Customizable</span>
                  </div>
                </div>

                <Link href="/admin/quiz">
                  <Button className="bg-[rgb(90,199,219)] hover:bg-[rgb(70,179,199)] text-white group-hover:shadow-md transition-all duration-300">
                    Manage Quizzes
                    <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Lesson Management Card */}
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
              <p className="text-slate-600 mb-6 leading-relaxed">
                Create comprehensive lesson plans, upload educational materials,
                and organize learning objectives. Full lesson management tools
                will be available soon.
              </p>

              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <div className="flex items-center gap-4 text-sm text-slate-400">
                  <div className="flex items-center gap-1">
                    <BookOpen className="h-4 w-4" />
                    <span>Curriculum</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Settings className="h-4 w-4" />
                    <span>Structure</span>
                  </div>
                </div>

                <Button
                  disabled
                  variant="outline"
                  className="text-slate-400 border-slate-200 cursor-not-allowed"
                >
                  Coming Soon
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </CardContent>

            {/* Coming Soon Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          </Card>
        </div>

        {/* Stats Overview */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="bg-white rounded-lg border border-slate-200 p-6 text-center">
            <div className="text-2xl font-bold text-slate-900">12</div>
            <div className="text-sm text-slate-600">Active Lessons</div>
          </div>
          <div className="bg-white rounded-lg border border-slate-200 p-6 text-center">
            <div className="text-2xl font-bold text-[rgb(90,199,219)]">8</div>
            <div className="text-sm text-slate-600">Quiz Sets</div>
          </div>
          <div className="bg-white rounded-lg border border-slate-200 p-6 text-center">
            <div className="text-2xl font-bold text-slate-900">156</div>
            <div className="text-sm text-slate-600">Student Responses</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
