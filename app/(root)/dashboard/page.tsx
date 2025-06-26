import React from "react";
import Link from "next/link";
import DashboardLessons from "@/components/shared/DashboardLessons";
import Chatbot from "@/components/chatbot/Chatbot";

const DashboardPage = async() => {

    return (
        <div>
            <DashboardLessons></DashboardLessons>
            <Chatbot></Chatbot>

        </div>
    );
};

export default DashboardPage;
