"use client";

import React from "react";
import { BookOpen, CheckCircle, Clock, Play } from "lucide-react";

export const redirectToForm = () => {
  window.open(
    "https://docs.google.com/forms/d/e/1FAIpQLSfVcdizYAyHxaOlbGcNlGf-NewHqq744HKP5lCC1Sx58wbtzQ/viewform",
    "_blank"
  );
};

// Get progress status styling
export const getProgressStatus = (progress: LessonStatus) => {
  switch (progress) {
    case "Completed":
      return {
        badge: "bg-green-100 text-green-800 hover:bg-green-200",
        icon: <CheckCircle className="h-4 w-4 text-green-600" />,
        cardClass: "border-green-200 bg-green-50/30",
      };
    case "In Progress":
      return {
        badge: "bg-yellow-100 text-yellow-800 hover:bg-yellow-200",
        icon: <Play className="h-4 w-4 text-yellow-600" />,
        cardClass: "border-yellow-200 bg-yellow-50/30",
      };
    case "Not Started":
      return {
        badge: "bg-gray-100 text-gray-800 hover:bg-gray-200",
        icon: <Clock className="h-4 w-4 text-gray-600" />,
        cardClass: "border-gray-200 bg-gray-50/30",
      };
    default:
      return {
        badge: "bg-gray-100 text-gray-800 hover:bg-gray-200",
        icon: <BookOpen className="h-4 w-4 text-gray-600" />,
        cardClass: "border-gray-200",
      };
  }
};