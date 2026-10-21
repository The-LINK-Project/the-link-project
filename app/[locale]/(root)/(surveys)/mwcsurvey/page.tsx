import SurveyPage from "@/components/survey/SurveyPage";
import { MWC_SURVEY } from "@/constants/survey/mwcSurvey";

// Per-user data — must never be statically prerendered
export const dynamic = "force-dynamic";

export default function MwcSurveyPage() {
    return <SurveyPage surveyId={MWC_SURVEY.id} />;
}
