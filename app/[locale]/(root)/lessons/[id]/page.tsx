import { notFound } from "next/navigation";

import LessonPage from "@/components/learn/LessonFlow";
import { getLesson } from "@/lib/lessons/data";

// Progress lives in the browser, and the daily mix changes at midnight, so
// nothing here is worth prerendering.
export const dynamic = "force-dynamic";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    if (!getLesson(id)) notFound();

    return <LessonPage lessonId={id} />;
}
