import React from "react";
import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import { Button } from "@/components/ui/button";
import SurveyClient from "@/components/survey/SurveyClient";
import { getOpenSurvey } from "@/constants/survey/feedbackSurvey";
import { getSurveyStateForUser } from "@/lib/actions/survey.actions";

// One survey's page, shared by every survey route in
// app/[locale]/(root)/(surveys)/. Sign-in is enforced by the middleware and
// the group's layout, and the server only ever reads or writes the signed-in
// user's own response.

type SurveyPageProps = {
    surveyId: string;
};

const SurveyPage = async ({ surveyId }: SurveyPageProps) => {
    const survey = getOpenSurvey(surveyId);

    if (!survey) {
        return (
            <section className="mx-auto flex min-h-[60vh] w-full max-w-xl flex-col items-center justify-center gap-6 px-4 py-10 text-center">
                <h1 className="text-2xl font-bold">No survey right now</h1>
                <p className="text-lg text-muted-foreground">
                    There is nothing to fill in at the moment. Thank you for
                    checking!
                </p>
                <Button asChild size="lg" className="min-h-[56px] text-lg">
                    <Link href="/dashboard">Back to my lessons</Link>
                </Button>
            </section>
        );
    }

    const initialState = await getSurveyStateForUser(survey.id);
    const { userId } = await auth();

    return (
        <SurveyClient
            survey={survey}
            initialState={initialState}
            ownerId={userId}
        />
    );
};

export default SurveyPage;
