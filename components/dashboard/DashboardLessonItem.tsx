import React from "react";
import Link from "next/link";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, CheckCircle, Clock, Play } from "lucide-react";

type DashboardLessonItemProps = {
    lesson: Lesson;
    lessonNum: number;
    lessonStatus: LessonStatus;
};

const DashboardLessonItem = (props: DashboardLessonItemProps) => {
    const { lesson, lessonNum, lessonStatus } = props;

    // Status styling configurations
    const lessonStatusStyles = {
        Completed: {
            badge: "bg-green-100 text-green-800 hover:bg-green-200",
            icon: <CheckCircle className="h-4 w-4 text-green-600" />,
            cardClass: "border-green-200 bg-green-50/30",
        },
        "In Progress": {
            badge: "bg-yellow-100 text-yellow-800 hover:bg-yellow-200",
            icon: <Play className="h-4 w-4 text-yellow-600" />,
            cardClass: "border-yellow-200 bg-yellow-50/30",
        },
        "Not Started": {
            badge: "bg-gray-100 text-gray-800 hover:bg-gray-200",
            icon: <Clock className="h-4 w-4 text-gray-600" />,
            cardClass: "border-gray-200 bg-gray-50/30",
        },
    };

    const defaultStyle = {
        badge: "bg-gray-100 text-gray-800 hover:bg-gray-200",
        icon: <BookOpen className="h-4 w-4 text-gray-600" />,
        cardClass: "border-gray-200",
    };

    const status = lessonStatusStyles[lessonStatus] || defaultStyle;

    return (
        <Link href={`/learn/${lessonNum}`} key={lessonNum} className="group">
            <Card
                className={`h-full flex flex-col transition-all duration-200 hover:shadow-lg hover:-translate-y-1 cursor-pointer ${status.cardClass}`}
            >
                <CardHeader className="pb-3">
                    <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2 flex-1 min-w-0 pr-2">
                            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
                                {lessonNum}
                            </div>
                            <CardTitle className="text-lg group-hover:text-primary transition-colors line-clamp-2">
                                {lesson.title}
                            </CardTitle>
                        </div>
                        <div className="flex-shrink-0">
                            {status.icon}
                        </div>
                    </div>
                </CardHeader>

                <CardContent className="pt-0 flex-grow flex flex-col">
                    <CardDescription className="text-sm text-gray-600 line-clamp-3 flex-grow">
                        {lesson.description}
                    </CardDescription>
                </CardContent>
                <CardFooter className="mt-auto">
                    <div className="flex flex-row items-center justify-between w-full">
                        <Badge variant="secondary" className={status.badge}>
                            {lessonStatus}
                        </Badge>

                    </div>
                </CardFooter>
            </Card>
        </Link>
    );
};

export default DashboardLessonItem;
