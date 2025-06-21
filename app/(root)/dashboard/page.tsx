import React from "react";
import { lessons } from "@/constants";
import Link from "next/link";
import DashboardLessons from "@/components/shared/DashboardLessons";

const DashboardPage = async() => {

    return (
        <DashboardLessons></DashboardLessons>
    );
};

export default DashboardPage;
