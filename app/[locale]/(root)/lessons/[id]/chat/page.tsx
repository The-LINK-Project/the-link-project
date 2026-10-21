import { notFound } from "next/navigation";

import PromptPractice from "@/components/chatbot/PromptPractice";
import { getLesson } from "@/lib/lessons/data";

export const dynamic = "force-dynamic";

// Only a lesson about AI ends in prompting practice.
export default async function Page({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    if (!getLesson(id)?.chatPractice) notFound();

    return <PromptPractice lessonId={id} />;
}
