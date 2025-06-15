import React from "react";
import { lessons } from "@/constants";
import Link from "next/link";
import { getAllLessonProgressesForDashboard } from "@/lib/actions/LessonProgress.actions";
import DashboardLessons from "@/components/shared/DashboardLessons";

const DashboardPage = async() => {
    const lessonProgresses = await getAllLessonProgressesForDashboard();

    return (
        <DashboardLessons></DashboardLessons>
    );
};

export default DashboardPage;
