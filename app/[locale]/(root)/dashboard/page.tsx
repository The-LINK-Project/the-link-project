import React from "react";
import { ensureUser } from "@/lib/actions/user.actions";
import { getSurveyBannerState } from "@/lib/actions/survey.actions";
import LessonHome from "@/components/learn/LessonHome";
import SurveyBanner from "@/components/survey/SurveyBanner";
import { getTranslations } from "next-intl/server";

// Keep the reusable survey prompt dormant now that the focus group is over.
// The survey route, responses, and admin reporting remain available.
const SHOW_SURVEY_BANNER = false;

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
        console.error("Couldn't prepare the user's row:", error);
    }

    const surveyBannerState = SHOW_SURVEY_BANNER
        ? await getSurveyBannerState()
        : null;
    const t = await getTranslations("dashboard");

    return (
        <section className="p-6">
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
