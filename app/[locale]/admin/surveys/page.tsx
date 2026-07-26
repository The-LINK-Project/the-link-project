import React from "react";
import SurveyResultsClient from "@/components/admin/SurveyResultsClient";
import { SURVEYS, ACTIVE_SURVEY_ID } from "@/constants/survey/feedbackSurvey";
import { getSurveyResults } from "@/lib/actions/survey.actions";

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
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
            <div className="bg-white border-b border-slate-200 shadow-sm">
                <div className="max-w-7xl mx-auto px-6 py-8">
                    <h1 className="text-3xl font-bold text-slate-900">
                        Survey Results
                    </h1>
                    <p className="text-slate-600 mt-2">
                        {ACTIVE_SURVEY_ID
                            ? `Survey "${ACTIVE_SURVEY_ID}" is open right now.`
                            : "No survey is open right now."}{" "}
                        Responses are anonymous — numbered by submission order,
                        with no names or emails anywhere.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-12">
                <SurveyResultsClient results={results} />
            </div>
        </div>
    );
};

export default AdminSurveysPage;
