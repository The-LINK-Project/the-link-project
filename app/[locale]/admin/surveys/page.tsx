import React from "react";
import { ClipboardList } from "lucide-react";
import { SURVEYS, getSurveyAdminHref } from "@/constants/survey/feedbackSurvey";
import { getSurveyStats } from "@/lib/actions/survey.actions";
import {
    AdminPageShell,
    AdminManagementCard,
} from "@/components/admin/AdminPageShell";

// Admin access is enforced by app/[locale]/admin/layout.tsx, and each server
// action here re-checks it independently. One card per survey, newest first;
// each survey's results are on a page of their own.
const AdminSurveysPage = async () => {
    const surveys = [...SURVEYS].reverse();
    const stats = await Promise.all(
        surveys.map((survey) => getSurveyStats(survey.id).catch(() => null)),
    );

    return (
        <AdminPageShell
            title="Survey Results"
            description="Each workshop survey has its own results page, newest first. Responses are anonymous — numbered by submission order, with no names or emails anywhere."
            backHref="/admin"
            backLabel="Back to Dashboard"
        >
            <div className="grid gap-4 md:grid-cols-2">
                {surveys.map((survey, index) => {
                    const stat = stats[index];
                    return (
                        <AdminManagementCard
                            key={survey.id}
                            href={getSurveyAdminHref(survey)}
                            title={survey.label}
                            description={`${survey.path} · ${
                                survey.open ? "taking answers" : "closed"
                            }`}
                            stat={
                                stat
                                    ? `${stat.submitted} submitted · ${stat.started} started · ${stat.completionRate}% finished`
                                    : "Couldn't load the numbers"
                            }
                            cta="View results"
                            icon={ClipboardList}
                            accent="rose"
                        />
                    );
                })}
            </div>
        </AdminPageShell>
    );
};

export default AdminSurveysPage;
