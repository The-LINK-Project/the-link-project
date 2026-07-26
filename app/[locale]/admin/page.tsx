import React from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    BookOpen,
    Brain,
    Users,
    Gamepad2,
    ClipboardList,
    ArrowRight,
    Timer,
    Images,
} from "lucide-react";
import { getAllLessons } from "@/lib/actions/Lesson.actions";
import { getAllQuizzes, getQuizResultStats } from "@/lib/actions/quiz.actions";
import { getUserStats } from "@/lib/actions/user.actions";
import { getLessonProgressStats } from "@/lib/actions/LessonProgress.actions";
import { getWordMatchStats } from "@/lib/actions/wordMatch.actions";
import { getPictureStoryStats } from "@/lib/actions/pictureStory.actions";
import { getSurveyStats } from "@/lib/actions/survey.actions";
import { ACTIVE_SURVEY_ID } from "@/constants/survey/feedbackSurvey";
import {
    AdminPageShell,
    ADMIN_ACCENTS,
    type AdminAccent,
} from "@/components/admin/AdminPageShell";

// One bento panel per content domain. The whole panel is the link — no
// buttons, no borders, just a soft color wash with the domain's live
// analytics inline. Management and monitoring in a single surface.
const DomainPanel = ({
    href,
    title,
    tagline,
    cta,
    icon: Icon,
    accent,
    className = "",
    children,
}: {
    href: string;
    title: string;
    tagline: string;
    cta: string;
    icon: React.ElementType;
    accent: AdminAccent;
    className?: string;
    children: React.ReactNode;
}) => {
    const colors = ADMIN_ACCENTS[accent];
    return (
        <Link
            href={href}
            className={`group relative flex flex-col rounded-3xl p-6 ${colors.wash} transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 ${className}`}
        >
            <div className="flex items-start justify-between gap-4 mb-5">
                <div className="flex items-center gap-3">
                    <div
                        className={`w-10 h-10 rounded-xl ${colors.tile} flex items-center justify-center shrink-0 shadow-sm`}
                    >
                        <Icon className="h-5 w-5 text-white" />
                    </div>
                    <div>
                        <h3 className="text-base font-semibold text-slate-900">
                            {title}
                        </h3>
                        <p className="text-sm text-slate-500">{tagline}</p>
                    </div>
                </div>
                <span
                    className={`inline-flex items-center gap-1 text-sm font-medium ${colors.text} whitespace-nowrap`}
                >
                    {cta}
                    <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                </span>
            </div>
            <div className="mt-auto">{children}</div>
        </Link>
    );
};

// A big proportional figure with its label underneath — the panels' main
// data mark. Values wear ink, never the accent color.
const BigStat = ({
    value,
    label,
    delta,
}: {
    value: string | number;
    label: string;
    delta?: string;
}) => (
    <div>
        <p className="text-2xl font-semibold text-slate-900 leading-tight">
            {value}
        </p>
        <p className="text-xs text-slate-500 mt-0.5">
            {label}
            {delta && (
                <span className="text-emerald-600 font-medium"> {delta}</span>
            )}
        </p>
    </div>
);

const Meter = ({
    label,
    value,
    accent,
}: {
    label: string;
    value: number;
    accent: AdminAccent;
}) => {
    const colors = ADMIN_ACCENTS[accent];
    return (
        <div>
            <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs text-slate-500">{label}</span>
                <span className="text-xs font-semibold text-slate-900">
                    {value}%
                </span>
            </div>
            <div
                className={`h-1.5 rounded-full ${colors.track} overflow-hidden`}
            >
                <div
                    className={`h-full rounded-full ${colors.bar}`}
                    style={{
                        width: `${Math.min(100, Math.max(0, value))}%`,
                    }}
                />
            </div>
        </div>
    );
};

const GameLabel = ({
    icon: Icon,
    children,
}: {
    icon: React.ElementType;
    children: React.ReactNode;
}) => (
    <p className="flex items-center gap-1.5 text-sm font-semibold text-slate-700 mb-3">
        <Icon className="h-4 w-4 text-slate-400" />
        {children}
    </p>
);

const formatSeconds = (ms: number) =>
    ms > 0 ? `${(ms / 1000).toFixed(1)}s` : "—";

const AdminPage = async () => {
    try {
        const [
            lessons,
            quizzes,
            userStats,
            lessonStats,
            quizStats,
            wordMatchStats,
            pictureStoryStats,
            surveyStats,
        ] = await Promise.all([
            getAllLessons().catch(() => []),
            getAllQuizzes().catch(() => []),
            getUserStats().catch(() => ({
                totalUsers: 0,
                newUsersThisWeek: 0,
            })),
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
            getWordMatchStats().catch(() => ({
                totalRounds: 0,
                totalPlays: 0,
                averageScore: 0,
                averageTimeMs: 0,
                averageWrongAttempts: 0,
            })),
            getPictureStoryStats().catch(() => ({
                totalSets: 0,
                totalPlays: 0,
                averageAccuracy: 0,
            })),
            ACTIVE_SURVEY_ID
                ? getSurveyStats(ACTIVE_SURVEY_ID).catch(() => null)
                : Promise.resolve(null),
        ]);

        return (
            <AdminPageShell
                title="Admin Dashboard"
                description="Everything on the platform, live from the database — click any panel to manage it"
                actions={
                    <Badge
                        variant="secondary"
                        className="bg-[rgb(90,199,219)]/10 text-[rgb(70,179,199)] border-[rgb(90,199,219)]/20"
                    >
                        Administrator
                    </Badge>
                }
            >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                    {/* Row 1 — learning content */}
                    <DomainPanel
                        href="/admin/lessons"
                        title="Lessons"
                        tagline="Plans, objectives and difficulty"
                        cta="Manage"
                        icon={BookOpen}
                        accent="emerald"
                        className="lg:col-span-5"
                    >
                        <div className="flex flex-wrap gap-x-8 gap-y-3 mb-4">
                            <BigStat value={lessons.length} label="live" />
                            <BigStat
                                value={lessonStats.totalSessions}
                                label="sessions started"
                            />
                            <BigStat
                                value={lessonStats.completedObjectives}
                                label="objectives met"
                            />
                        </div>
                        <Meter
                            label="Lesson completion"
                            value={lessonStats.completionRate}
                            accent="emerald"
                        />
                    </DomainPanel>

                    <DomainPanel
                        href="/admin/quiz"
                        title="Quizzes"
                        tagline="Comprehension checks per lesson"
                        cta="Manage"
                        icon={Brain}
                        accent="violet"
                        className="lg:col-span-7"
                    >
                        <div className="flex flex-wrap items-end gap-x-8 gap-y-3 mb-4">
                            <BigStat value={quizzes.length} label="quizzes" />
                            <BigStat
                                value={quizStats.totalAttempts}
                                label="attempts"
                            />
                            <BigStat
                                value={quizStats.highPerformers}
                                label="scored 80%+"
                            />
                            <BigStat
                                value={quizStats.needSupport}
                                label="below 60%"
                            />
                        </div>
                        <Meter
                            label="Average score"
                            value={quizStats.averageScore}
                            accent="violet"
                        />
                    </DomainPanel>

                    {/* Row 2 — games and feedback */}
                    <DomainPanel
                        href="/admin/games"
                        title="Games"
                        tagline="Self-paced mini-games"
                        cta="Manage"
                        icon={Gamepad2}
                        accent="amber"
                        className="lg:col-span-7"
                    >
                        <div className="grid sm:grid-cols-2 gap-x-10 gap-y-4">
                            <div>
                                <GameLabel icon={Timer}>Word Match</GameLabel>
                                <div className="flex flex-wrap gap-x-6 gap-y-3">
                                    <BigStat
                                        value={wordMatchStats.totalPlays}
                                        label={`plays · ${wordMatchStats.totalRounds} rounds`}
                                    />
                                    <BigStat
                                        value={`${wordMatchStats.averageScore}%`}
                                        label="avg score"
                                    />
                                    <BigStat
                                        value={formatSeconds(
                                            wordMatchStats.averageTimeMs,
                                        )}
                                        label={`avg time · ${wordMatchStats.averageWrongAttempts} misses`}
                                    />
                                </div>
                            </div>
                            <div>
                                <GameLabel icon={Images}>
                                    Picture Story
                                </GameLabel>
                                <div className="flex items-end gap-6">
                                    <BigStat
                                        value={pictureStoryStats.totalPlays}
                                        label={`plays · ${pictureStoryStats.totalSets} sets`}
                                    />
                                    <div className="flex-1 min-w-[120px] pb-1">
                                        <Meter
                                            label="Accuracy"
                                            value={
                                                pictureStoryStats.averageAccuracy
                                            }
                                            accent="amber"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </DomainPanel>

                    <DomainPanel
                        href="/admin/surveys"
                        title="Surveys"
                        tagline={
                            surveyStats
                                ? `"${surveyStats.surveyId}" · anonymous`
                                : "Workshop feedback"
                        }
                        cta="View"
                        icon={ClipboardList}
                        accent="rose"
                        className="lg:col-span-5"
                    >
                        {surveyStats ? (
                            <>
                                <div className="flex flex-wrap gap-x-8 gap-y-3 mb-4">
                                    <BigStat
                                        value={surveyStats.submitted}
                                        label="submitted"
                                    />
                                    <BigStat
                                        value={surveyStats.started}
                                        label="started"
                                    />
                                    <BigStat
                                        value={surveyStats.questionCount}
                                        label="questions"
                                    />
                                </div>
                                <Meter
                                    label="Completion"
                                    value={surveyStats.completionRate}
                                    accent="rose"
                                />
                            </>
                        ) : (
                            <p className="text-sm text-slate-500">
                                No survey is open right now. Responses and CSV
                                export from past surveys live here.
                            </p>
                        )}
                    </DomainPanel>

                    {/* Row 3 — a slim full-width band for accounts */}
                    <DomainPanel
                        href="/admin/users"
                        title="Users"
                        tagline="Accounts and profile data"
                        cta="View all"
                        icon={Users}
                        accent="blue"
                        className="lg:col-span-12 lg:flex-row lg:items-center lg:gap-12 lg:[&>div:first-child]:mb-0"
                    >
                        <div className="flex flex-wrap gap-x-10 gap-y-3">
                            <BigStat
                                value={userStats.totalUsers}
                                label="accounts"
                                delta={`+${userStats.newUsersThisWeek} this week`}
                            />
                        </div>
                    </DomainPanel>
                </div>
            </AdminPageShell>
        );
    } catch (error) {
        console.error("Error loading admin dashboard:", error);
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
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
