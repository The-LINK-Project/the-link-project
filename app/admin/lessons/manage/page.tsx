"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Search, Trash2, Edit, Plus } from "lucide-react";
import Link from "next/link";
import { getAllLessons, deleteLesson } from "@/lib/actions/Lesson.actions";

interface LessonData {
  _id: string;
  title: string;
  description: string;
  objectives: string[];
  lessonIndex: number;
  difficulty: string;
}

const ManageLessonsPage = () => {
  const [lessons, setLessons] = useState<LessonData[]>([]);
  const [filteredLessons, setFilteredLessons] = useState<LessonData[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchLessons();
  }, []);

  useEffect(() => {
    filterLessons();
  }, [lessons, searchTerm, selectedDifficulty]);

  const fetchLessons = async () => {
    try {
      const fetchedLessons = await getAllLessons();
      setLessons(fetchedLessons as LessonData[]);
    } catch (error) {
      console.error("Error fetching lessons:", error);
      setMessage("Error fetching lessons");
    } finally {
      setLoading(false);
    }
  };

  const filterLessons = () => {
    let filtered = lessons;

    if (searchTerm) {
      filtered = filtered.filter(
        (lesson) =>
          lesson.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          lesson.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedDifficulty !== "all") {
      filtered = filtered.filter(
        (lesson) => lesson.difficulty === selectedDifficulty
      );
    }

    // Sort by lesson index
    filtered.sort((a, b) => a.lessonIndex - b.lessonIndex);

    setFilteredLessons(filtered);
  };

  const handleDelete = async (lessonId: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) {
      return;
    }

    try {
      const result = await deleteLesson(lessonId);
      if (result.success) {
        setMessage("Lesson deleted successfully!");
        setTimeout(() => setMessage(""), 5000);
        await fetchLessons();
      } else {
        setMessage(result.message);
        setTimeout(() => setMessage(""), 5000);
      }
    } catch (error) {
      console.error("Error deleting lesson:", error);
      setMessage("Error deleting lesson");
      setTimeout(() => setMessage(""), 5000);
    }
  };

  const getDifficultyBadgeVariant = (difficulty: string) => {
    switch (difficulty) {
      case "beginner":
        return "default";
      case "intermediate":
        return "secondary";
      case "advanced":
        return "destructive";
      default:
        return "outline";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/admin/lessons">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Lessons
                </Button>
              </Link>
              <div>
                <h1 className="text-3xl font-bold text-slate-900">
                  Manage Lessons
                </h1>
                <p className="text-slate-600 mt-2">
                  View, edit, and organize your lesson content
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge
                variant="secondary"
                className="bg-blue-50 text-blue-700 border-blue-200"
              >
                {filteredLessons.length} of {lessons.length} lessons
              </Badge>
              <Link href="/admin/lessons/create">
                <Button size="sm" className="bg-green-500 hover:bg-green-600">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Lesson
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {message && (
          <div
            className={`mb-6 p-4 rounded-md border ${
              message.includes("Error") || message.includes("Failed")
                ? "bg-red-50 border-red-200 text-red-700"
                : "bg-green-50 border-green-200 text-green-700"
            }`}
          >
            {message}
          </div>
        )}

        {/* Filters */}
        <Card className="mb-8 bg-white border-slate-200">
          <CardHeader>
            <CardTitle className="text-lg">Filters & Search</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    placeholder="Search lessons by title or description..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div>
                <select
                  value={selectedDifficulty}
                  onChange={(e) => setSelectedDifficulty(e.target.value)}
                  className="w-full p-2 border border-slate-200 rounded-md bg-white"
                >
                  <option value="all">All Difficulties</option>
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Lessons List */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <p className="text-slate-500">Loading lessons...</p>
          </div>
        ) : filteredLessons.length === 0 ? (
          <Card className="bg-white border-slate-200">
            <CardContent className="py-12 text-center">
              <p className="text-slate-500 mb-4">
                {lessons.length === 0
                  ? "No lessons found."
                  : "No lessons match your search criteria."}
              </p>
              <Link href="/admin/lessons/create">
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Your First Lesson
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredLessons.map((lesson) => (
              <Card
                key={lesson._id}
                className="bg-white border-slate-200 hover:shadow-md transition-shadow"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline" className="text-xs">
                          #{lesson.lessonIndex}
                        </Badge>
                        <Badge
                          variant={getDifficultyBadgeVariant(lesson.difficulty)}
                          className="text-xs"
                        >
                          {lesson.difficulty}
                        </Badge>
                      </div>
                      <CardTitle className="text-lg leading-tight">
                        {lesson.title}
                      </CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <CardDescription className="text-sm text-slate-600 mb-4 line-clamp-3">
                    {lesson.description}
                  </CardDescription>

                  <div className="mb-4">
                    <p className="text-xs font-medium text-slate-500 mb-2">
                      Learning Objectives:
                    </p>
                    <ul className="text-xs text-slate-600 space-y-1">
                      {lesson.objectives.slice(0, 2).map((objective, index) => (
                        <li key={index} className="flex items-start">
                          <span className="mr-2 text-slate-400">•</span>
                          <span className="line-clamp-1">{objective}</span>
                        </li>
                      ))}
                      {lesson.objectives.length > 2 && (
                        <li className="text-slate-400 text-xs">
                          +{lesson.objectives.length - 2} more...
                        </li>
                      )}
                    </ul>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(lesson._id, lesson.title)}
                      className="w-full"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageLessonsPage;
