import React from "react";
import DashboardLessons from "@/components/shared/DashboardLessons";
import Chatbot from "@/components/chatbot/Chatbot";

const DashboardPage = async () => {
  return (
    <div className="min-h-screen">
      <DashboardLessons />
      <div className="px-6 pb-6">
        <Chatbot />
      </div>
    </div>
  );
};

export default DashboardPage;
