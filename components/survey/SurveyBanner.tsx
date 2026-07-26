"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Heart, MessageSquareText } from "lucide-react";

// Dashboard banner for the feedback survey. The state comes from the server
// (lib/actions/survey.actions.ts), so what it says always matches reality:
// invite, resume with progress, or a thank-you that stops appearing after a
// day. There is no dismiss control here; declining happens on the consent
// screen's "No thank you", which quiets the banner across devices.

type SurveyBannerProps = {
    state: SurveyBannerState;
};

export default function SurveyBanner({ state }: SurveyBannerProps) {
    if (!state.show) return null;

    if (state.variant === "thanks") {
        return (
            <div className="mb-8 flex items-center gap-4 rounded-xl border-2 border-primary/40 bg-primary/10 p-5">
                <Heart className="h-8 w-8 shrink-0" aria-hidden="true" />
                <div>
                    <p className="text-lg font-semibold">
                        Thank you for your answers!
                    </p>
                    <p className="text-base text-muted-foreground">
                        They help us make the next workshop better.
                    </p>
                </div>
            </div>
        );
    }

    const isResume = state.variant === "resume";

    return (
        <div className="mb-8 rounded-xl border-2 border-primary/40 bg-primary/10 p-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <MessageSquareText
                    className="hidden h-10 w-10 shrink-0 sm:block"
                    aria-hidden="true"
                />
                <div className="flex-1">
                    <p className="text-lg font-semibold leading-snug">
                        {isResume
                            ? "Your survey is waiting for you"
                            : "Tell us about today"}
                    </p>
                    <p className="mt-1 text-base text-muted-foreground">
                        {isResume
                            ? `You answered ${state.answeredCount} of ${state.questionCount} questions. Your answers are saved.`
                            : `It takes ${state.timeEstimate}. Your answers are anonymous.`}
                    </p>
                </div>
                <Button
                    asChild
                    size="lg"
                    className="min-h-[56px] w-full text-lg sm:w-auto"
                >
                    <Link href="/survey">
                        {isResume ? "Continue" : "Start"}
                        <ArrowRight className="h-5 w-5" aria-hidden="true" />
                    </Link>
                </Button>
            </div>
        </div>
    );
}
