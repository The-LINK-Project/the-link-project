import React from "react";
import { ensureUser } from "@/lib/actions/user.actions";
import { getSurveyBannerState } from "@/lib/actions/survey.actions";
import { DASHBOARD_SURVEY_ID } from "@/constants/survey/feedbackSurvey";
import LessonHome from "@/components/learn/LessonHome";
import SurveyBanner from "@/components/survey/SurveyBanner";
import { getTranslations } from "next-intl/server";
import { unstable_rethrow } from "next/navigation";

// Per-user data — must never be statically prerendered
export const dynamic = "force-dynamic";

const DashboardPage = async () => {
    // Only makes the user's row ahead of their first lesson; nothing on this
    // page reads it. The lessons and their progress work without it, so a
    // database hiccup here must not take the whole page down. The lesson
    // actions make the row themselves if this didn't
    try {
        await ensureUser();
    } catch (error) {
        unstable_rethrow(error);
        console.error("Couldn't prepare the user's row:", error);
    }

    // Off unless DASHBOARD_SURVEY_ID names a survey (see feedbackSurvey.ts)
    const surveyBannerState = DASHBOARD_SURVEY_ID
        ? await getSurveyBannerState(DASHBOARD_SURVEY_ID)
        : null;
    const t = await getTranslations("dashboard");

    return (
        // Room at the bottom so the last card can scroll clear of the floating chat button
        <section className="p-6 pb-28">
            {surveyBannerState && <SurveyBanner state={surveyBannerState} />}

            <div className="mb-8 flex justify-between items-start">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        {t("headerCall")}
                    </h1>
                    <p className="text-gray-600">{t("headerCall2")}</p>
                </div>
            </div>

            {/* The lessons, the same as the mobile app's Home: what was left
                unfinished, every lesson and where it stands, and the daily mix.
                The older conversation lessons, games and results are kept at
                /legacy, unlinked. */}
            <LessonHome />
        </section>
    );
};

export default DashboardPage;
