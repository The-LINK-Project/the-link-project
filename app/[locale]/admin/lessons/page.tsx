import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Settings } from "lucide-react";
import { getAllLessons } from "@/lib/actions/Lesson.actions";
import {
    AdminPageShell,
    AdminManagementCard,
} from "@/components/admin/AdminPageShell";

interface LessonData {
    _id: string;
    title: string;
    description: string;
    objectives: string[];
    lessonIndex: number;
    difficulty: string;
}

const DifficultyStat = ({
    count,
    label,
    colorClass,
}: {
    count: number;
    label: string;
    colorClass: string;
}) => (
    <Card className="bg-white border-slate-200">
        <CardContent className="p-4 text-center">
            <p className={`text-2xl font-semibold ${colorClass}`}>{count}</p>
            <p className="text-sm text-slate-500">{label}</p>
        </CardContent>
    </Card>
);

export default async function LessonsMainPage() {
    let lessons: LessonData[] = [];
    try {
        lessons = (await getAllLessons()) as LessonData[];
    } catch (error) {
        console.error("Error fetching lessons:", error);
    }

    return (
        <AdminPageShell
            title="Lesson Management"
            description="Create and manage your educational content"
            backHref="/admin"
            backLabel="Back to Dashboard"
            actions={
                <Badge
                    variant="secondary"
                    className="bg-[rgb(90,199,219)]/10 text-[rgb(70,179,199)] border-[rgb(90,199,219)]/20"
                >
                    {lessons.length} Lessons
                </Badge>
            }
        >
            <div className="grid gap-4 md:grid-cols-2">
                <AdminManagementCard
                    href="/admin/lessons/create"
                    title="Create Lessons"
                    description="Titles, objectives and difficulty levels"
                    stat="Adds straight to the live lesson list"
                    cta="Create"
                    icon={Plus}
                    accent="emerald"
                />
                <AdminManagementCard
                    href="/admin/lessons/manage"
                    title="Manage Lessons"
                    description="View, edit and delete existing content"
                    stat={`${lessons.length} lessons in the database`}
                    cta="Manage"
                    icon={Settings}
                    accent="blue"
                />
            </div>

            {lessons.length > 0 && (
                <div className="mt-10">
                    <h2 className="text-lg font-semibold text-slate-900 mb-4">
                        Lessons by Difficulty
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <DifficultyStat
                            count={
                                lessons.filter(
                                    (l) => l.difficulty === "beginner",
                                ).length
                            }
                            label="Beginner"
                            colorClass="text-emerald-600"
                        />
                        <DifficultyStat
                            count={
                                lessons.filter(
                                    (l) => l.difficulty === "intermediate",
                                ).length
                            }
                            label="Intermediate"
                            colorClass="text-amber-600"
                        />
                        <DifficultyStat
                            count={
                                lessons.filter(
                                    (l) => l.difficulty === "advanced",
                                ).length
                            }
                            label="Advanced"
                            colorClass="text-red-600"
                        />
                    </div>
                </div>
            )}
        </AdminPageShell>
    );
}
