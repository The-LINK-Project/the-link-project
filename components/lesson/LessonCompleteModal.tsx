"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { deleteLessonProgress } from "@/lib/actions/LessonProgress.actions";

type LessonCompleteModalProps = {
  isComplete: boolean;
  setIsComplete: (value: boolean) => void;
  lessonIndex: number;
  lessonObjectives: string[];
};

const LessonCompleteModal = ({
  isComplete,
  setIsComplete,
  lessonIndex,
  lessonObjectives,
}: LessonCompleteModalProps) => {
  const [showStars, setShowStars] = useState([false, false, false]);
  const [showButtons, setShowButtons] = useState(false);

  useEffect(() => {
    if (isComplete) {
      // Reset animation state
      setShowStars([false, false, false]);
      setShowButtons(false);

      // Animate stars appearing sequentially
      const starTimers = [
        setTimeout(() => setShowStars((prev) => [true, prev[1], prev[2]]), 200),
        setTimeout(() => setShowStars((prev) => [prev[0], true, prev[2]]), 400),
        setTimeout(() => setShowStars((prev) => [prev[0], prev[1], true]), 600),
        // Show buttons after all stars are visible
        setTimeout(() => setShowButtons(true), 1000),
      ];

      return () => {
        starTimers.forEach((timer) => clearTimeout(timer));
      };
    }
  }, [isComplete]);

  return (
    <Dialog open={isComplete} onOpenChange={setIsComplete}>
      <DialogContent
        className="sm:max-w-md"
        showCloseButton={false}
        onPointerDownOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        <DialogHeader>
          {/* Stars Animation */}
          <div className="flex justify-center gap-2 mb-4">
            {showStars.map((show, index) => (
              <div
                key={index}
                className={`text-4xl transition-all duration-500 ${
                  show ? "opacity-100 scale-100" : "opacity-0 scale-50"
                }`}
                style={{
                  animation: show
                    ? `bounce 0.6s ease-out ${index * 0.1}s 1 forwards`
                    : "none",
                }}
              >
                ⭐
              </div>
            ))}
          </div>

          <DialogTitle
            className={`transition-all duration-500 ${showButtons ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          >
            🎉 Lesson Complete!
          </DialogTitle>
          <DialogDescription
            className={`transition-all duration-500 delay-100 ${showButtons ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          >
            Congratulations! You've completed all the lesson objectives. What
            would you like to do next?
          </DialogDescription>
        </DialogHeader>

        <div
          className={`flex flex-col gap-3 mt-4 transition-all duration-500 delay-200 ${showButtons ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <Link href="/dashboard">
            <Button className="w-full transform transition-transform hover:scale-105">
              Return to Dashboard
            </Button>
          </Link>
          <Link href={`/learn/${lessonIndex}/quiz`}>
            <Button
              variant="outline"
              className="w-full transform transition-transform hover:scale-105"
            >
              Take the Quiz
            </Button>
          </Link>
          <Button
            variant="secondary"
            className="w-full transform transition-transform hover:scale-105"
            onClick={() => {
              deleteLessonProgress({
                lessonIndex: lessonIndex,
              });
              setIsComplete(false);
            }}
          >
            Reset Progress
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LessonCompleteModal;
