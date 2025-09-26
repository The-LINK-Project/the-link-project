"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Card } from "../ui/card";
import { Separator } from "../ui/separator";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { CheckCircle2, Trophy } from "lucide-react";
import { useTranslations } from "next-intl";

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
    const t = useTranslations("lessonmodal");
    const [showContent, setShowContent] = useState(false);
    const [showObjectives, setShowObjectives] = useState([false, false, false]);

    useEffect(() => {
        if (isComplete) {
            // Reset animation state
            setShowContent(false);
            setShowObjectives([false, false, false]);

            // Show main content first
            setTimeout(() => setShowContent(true), 100);

            // Animate objectives appearing sequentially
            const objectiveTimers = lessonObjectives.map((_, index) =>
                setTimeout(
                    () => {
                        setShowObjectives((prev) => {
                            const newState = [...prev];
                            newState[index] = true;
                            return newState;
                        });
                    },
                    300 + index * 150
                )
            );

            return () => {
                objectiveTimers.forEach((timer) => clearTimeout(timer));
            };
        }
    }, [isComplete, lessonObjectives]);

    return (
        <Dialog open={isComplete} onOpenChange={setIsComplete}>
            <DialogContent
                className="sm:max-w-md"
                showCloseButton={false}
                onPointerDownOutside={(e) => e.preventDefault()}
                onEscapeKeyDown={(e) => e.preventDefault()}
            >
                <DialogHeader className="text-center">
                    {/* Success Icon */}
                    <div className="flex justify-center mb-4">
                        <div
                            className={`rounded-full bg-green-100 p-3 transition-all duration-500 ${showContent ? "opacity-100 scale-100" : "opacity-0 scale-50"
                                }`}
                        >
                            <Trophy className="h-8 w-8 text-green-600" />
                        </div>
                    </div>

                    <DialogTitle
                        className={`text-2xl font-bold text-gray-900 transition-all duration-500 ${showContent
                            ? "opacity-100 translate-y-0"
                            : "opacity-0 translate-y-4"
                            }`}
                    >
                        {t("complete")}
                    </DialogTitle>
                    <DialogDescription
                        className={`text-gray-600 transition-all duration-500 delay-100 ${showContent
                            ? "opacity-100 translate-y-0"
                            : "opacity-0 translate-y-4"
                            }`}
                    >
                        {t("congrats")}
                    </DialogDescription>
                </DialogHeader>

                {/* Objectives Summary */}
                <Card className="p-4 bg-gray-50 border-gray-200">
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                        {t("objectivesdone")}
                    </h4>
                    <div className="space-y-2">
                        {lessonObjectives.map((objective, index) => (
                            <div
                                key={index}
                                className={`flex items-center gap-2 transition-all duration-500 ${showObjectives[index]
                                    ? "opacity-100 translate-x-0"
                                    : "opacity-0 translate-x-4"
                                    }`}
                                style={{
                                    transitionDelay: `${300 + index * 150}ms`,
                                }}
                            >
                                <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0" />
                                <span className="text-sm text-gray-700">{objective}</span>
                                <Badge variant="secondary" className="ml-auto text-xs">
                                    {t("actualcomplete")}
                                </Badge>
                            </div>
                        ))}
                    </div>
                </Card>

                <Separator className="my-2" />

                {/* Action Buttons */}
                <div
                    className={`flex flex-col gap-3 transition-all duration-500 delay-500 ${showContent
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-8"
                        }`}
                >
                    <Link href="/dashboard">
                        <Button className="w-full">{t("returnbutton")}</Button>
                    </Link>
                    <Link href={`/learn/${lessonIndex}/quiz`}>
                        <Button variant="outline" className="w-full">
                            {t("takequiz")}
                        </Button>
                    </Link>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default LessonCompleteModal;
