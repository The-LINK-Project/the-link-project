import React from "react";
import SurveyResultsClient from "@/components/admin/SurveyResultsClient";
import { SURVEYS, getOpenSurveys } from "@/constants/survey/feedbackSurvey";
import { getSurveyResults } from "@/lib/actions/survey.actions";
import { AdminPageShell } from "@/components/admin/AdminPageShell";

// Admin access is enforced by app/[locale]/admin/layout.tsx, and each server
// action here re-checks it independently. Responses arrive anonymized — a
// submission-order number, never a user id.
const AdminSurveysPage = async () => {
    const openPaths = getOpenSurveys().map((survey) => survey.path);
    const results = (
        await Promise.all(
            SURVEYS.map((survey) =>
                getSurveyResults(survey.id).catch(() => null),
            ),
        )
    ).filter((item): item is SurveyResults => item !== null);

    return (
        <AdminPageShell
            title="Survey Results"
            description={`${
                openPaths.length > 0
                    ? `Open right now: ${openPaths.join(", ")}.`
                    : "No survey is open right now."
            } Responses are anonymous — numbered by submission order, with no names or emails anywhere.`}
            backHref="/admin"
            backLabel="Back to Dashboard"
        >
            <SurveyResultsClient results={results} />
        </AdminPageShell>
    );
};

export default AdminSurveysPage;
