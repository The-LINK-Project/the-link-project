import { getLocale } from "next-intl/server";
import { redirect } from "@/i18n/navigation";
import { HOME_FG_SURVEY } from "@/constants/survey/homeFgSurvey";

// /survey was the HOME focus group survey's address until the MWC workshop got
// a survey of its own. Links and QR codes already handed out still land on it.
export default async function OldSurveyPage() {
    redirect({ href: HOME_FG_SURVEY.path, locale: await getLocale() });
}
