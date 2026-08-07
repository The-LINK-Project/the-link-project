import React from "react";
import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import { Button } from "@/components/ui/button";
import SurveyClient from "@/components/survey/SurveyClient";
import { getActiveSurvey } from "@/constants/survey/feedbackSurvey";
import { getSurveyStateForUser } from "@/lib/actions/survey.actions";

// The feedback survey. Sign-in is enforced by the middleware (this route is
// not public), and the server only ever reads or writes the signed-in user's
// own response.

// Per-user data — must never be statically prerendered
export const dynamic = "force-dynamic";

const SurveyPage = async () => {
    const survey = getActiveSurvey();

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

    const initialState = await getSurveyStateForUser();
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
