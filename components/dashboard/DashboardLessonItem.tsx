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
import { BookOpen, CheckCircle, Clock, Play } from "lucide-react";

const statusVars = {
  Completed: {
    cardBg: "var(--dashboard-status-completed-bg)",
    cardBorder: "var(--dashboard-status-completed-border)",
    badgeBg: "var(--dashboard-status-completed-badge-bg)",
    badgeText: "var(--dashboard-status-completed-badge-text)",
    icon: (
      <CheckCircle className="h-4 w-4" style={{ color: "var(--primary)" }} />
    ),
  },
  "In Progress": {
    cardBg: "var(--dashboard-status-inprogress-bg)",
    cardBorder: "var(--dashboard-status-inprogress-border)",
    badgeBg: "var(--dashboard-status-inprogress-badge-bg)",
    badgeText: "var(--dashboard-status-inprogress-badge-text)",
    icon: <Play className="h-4 w-4" style={{ color: "var(--primary)" }} />,
  },
  "Not Started": {
    cardBg: "var(--dashboard-status-notstarted-bg)",
    cardBorder: "var(--dashboard-status-notstarted-border)",
    badgeBg: "var(--dashboard-status-notstarted-badge-bg)",
    badgeText: "var(--dashboard-status-notstarted-badge-text)",
    icon: <Clock className="h-4 w-4" style={{ color: "var(--primary)" }} />,
  },
};

const defaultStyle = {
  cardBg: "var(--muted)",
  cardBorder: "var(--border)",
  badgeBg: "var(--muted)",
  badgeText: "var(--muted-foreground)",
  icon: <BookOpen className="h-4 w-4" style={{ color: "var(--primary)" }} />,
};

type DashboardLessonItemProps = {
  lesson: Lesson;
  lessonNum: number;
  lessonStatus: LessonStatus;
};

const DashboardLessonItem = (props: DashboardLessonItemProps) => {
  const { lesson, lessonNum, lessonStatus } = props;
  const status = statusVars[lessonStatus] || defaultStyle;

  return (
    <Link href={`/learn/${lessonNum}`} key={lessonNum} className="group">
      <Card
        className="h-full transition-all duration-200 hover:shadow-lg hover:-translate-y-1 cursor-pointer"
        style={{
          borderColor: status.cardBorder,
          background: status.cardBg,
        }}
      >
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center font-semibold text-sm"
                style={{
                  background: "var(--primary)",
                  color: "var(--primary-foreground)",
                }}
              >
                {lessonNum}
              </div>
              <CardTitle
                className="text-lg transition-colors"
                style={{ color: "var(--foreground)" }}
              >
                {lesson.title}
                {lesson.difficulty && (
                  <Badge
                    variant="secondary"
                    style={{
                      background: "var(--muted)",
                      color: "var(--muted-foreground)",
                      marginLeft: 8,
                    }}
                  >
                    {lesson.difficulty}
                  </Badge>
                )}
              </CardTitle>
            </div>
            {status.icon}
          </div>
        </CardHeader>

        <CardContent className="pt-0">
          <CardDescription
            className="text-sm mb-4 line-clamp-3"
            style={{ color: "var(--muted-foreground)" }}
          >
            {lesson.description}
          </CardDescription>

          <div className="flex items-center justify-between">
            <Badge
              variant="secondary"
              style={{
                background: status.badgeBg,
                color: status.badgeText,
                borderColor: status.cardBorder,
              }}
            >
              {lessonStatus}
            </Badge>
            <div
              className="text-xs"
              style={{ color: "var(--muted-foreground)" }}
            >
              Lesson {lessonNum}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default DashboardLessonItem;
