import SurveyPage from "@/components/survey/SurveyPage";
import { HOME_FG_SURVEY } from "@/constants/survey/homeFgSurvey";

// Per-user data, so it must never be statically prerendered
export const dynamic = "force-dynamic";

export default function HomeFgSurveyPage() {
    return <SurveyPage surveyId={HOME_FG_SURVEY.id} />;
}
