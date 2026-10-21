import React from "react";
import Link from "next/link";
import { ClipboardList } from "lucide-react";
import { Button } from "../ui/button";
import {
    HOME_PAGE_SURVEY_ID,
    getOpenSurvey,
} from "@/constants/survey/feedbackSurvey";

// The way into the running workshop's survey: people in the room are told to
// open the home page and press this. Renders nothing when HOME_PAGE_SURVEY_ID
// is null or that survey has closed.
const WorkshopSurveyButton = () => {
    const survey = HOME_PAGE_SURVEY_ID
        ? getOpenSurvey(HOME_PAGE_SURVEY_ID)
        : null;
    if (!survey) return null;

    return (
        <Button
            asChild
            className="h-auto cursor-pointer gap-2 rounded-lg bg-primary px-10 py-3.5 text-base font-semibold text-ink transition-transform duration-500 hover:scale-105 hover:bg-primary/90"
        >
            <Link href={survey.path}>
                <ClipboardList className="!h-4 !w-4" strokeWidth={2.5} />
                Workshop survey
            </Link>
        </Button>
    );
};

export default WorkshopSurveyButton;
