import React from "react";
import SurveyResultsClient from "@/components/admin/SurveyResultsClient";
import { SURVEYS, ACTIVE_SURVEY_ID } from "@/constants/survey/feedbackSurvey";
import { getSurveyResults } from "@/lib/actions/survey.actions";
import { AdminPageShell } from "@/components/admin/AdminPageShell";

// Admin access is enforced by app/[locale]/admin/layout.tsx, and each server
// action here re-checks it independently. Responses arrive anonymized — a
// submission-order number, never a user id.
const AdminSurveysPage = async () => {
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
                ACTIVE_SURVEY_ID
                    ? `Survey "${ACTIVE_SURVEY_ID}" is open right now.`
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
