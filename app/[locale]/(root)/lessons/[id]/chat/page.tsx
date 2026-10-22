import { notFound } from "next/navigation";

import PromptPractice from "@/components/chatbot/PromptPractice";
import { requireSignedIn } from "@/lib/auth";
import { getLesson } from "@/lib/lessons/data";

export const dynamic = "force-dynamic";

// Only a lesson about AI ends in prompting practice.
export default async function Page({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    if (!getLesson(id)?.chatPractice) notFound();
    // Whose conversation to show again, known here rather than waited for in the browser.
    const owner = await requireSignedIn();

    return <PromptPractice lessonId={id} owner={owner} />;
}
