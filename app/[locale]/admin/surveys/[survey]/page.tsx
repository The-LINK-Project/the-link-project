import React from "react";
import { notFound } from "next/navigation";
import SurveyResultsClient from "@/components/admin/SurveyResultsClient";
import { getSurveyByPath } from "@/constants/survey/feedbackSurvey";
import { getSurveyResults } from "@/lib/actions/survey.actions";
import { AdminPageShell } from "@/components/admin/AdminPageShell";

// One survey's results, at /admin/surveys plus the survey's own path, e.g.
// /admin/surveys/mwcsurvey. Admin access is enforced by the admin layout, and
// getSurveyResults re-checks it. Responses arrive anonymized — a
// submission-order number, never a user id.
const AdminSurveyResultsPage = async ({
    params,
}: {
    params: Promise<{ survey: string }>;
}) => {
    const survey = getSurveyByPath(`/${(await params).survey}`);
    if (!survey) notFound();

    const results = await getSurveyResults(survey.id).catch((error) => {
        console.error("Couldn't load survey results:", error);
        return null;
    });

    return (
        <AdminPageShell
            title={survey.label}
            description={`${survey.path} · ${survey.id} · ${
                survey.open ? "taking answers" : "closed"
            }. Responses are anonymous — numbered by submission order, with no names or emails anywhere.`}
            backHref="/admin/surveys"
            backLabel="All surveys"
        >
            {results ? (
                <SurveyResultsClient results={results} />
            ) : (
                <p className="text-slate-600">
                    Couldn&apos;t load the results. Refresh to try again.
                </p>
            )}
        </AdminPageShell>
    );
};

export default AdminSurveyResultsPage;
