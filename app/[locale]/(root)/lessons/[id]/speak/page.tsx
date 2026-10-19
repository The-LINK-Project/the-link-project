import { notFound } from "next/navigation";

import SpeakPage from "@/components/speaking/SpeakFlow";
import { getLesson } from "@/lib/lessons/data";

export const dynamic = "force-dynamic";

export default async function Page({
    params,
    searchParams,
}: {
    params: Promise<{ id: string }>;
    searchParams: Promise<{ words?: string | string[]; phrases?: string | string[] }>;
}) {
    const { id } = await params;
    if (!getLesson(id)) notFound();
    const { words, phrases } = await searchParams;
    const single = (value?: string | string[]) => (Array.isArray(value) ? value[0] : value);

    return <SpeakPage lessonId={id} words={single(words)} phrases={single(phrases)} />;
}
