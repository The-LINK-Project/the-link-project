import React from "react";
import { LayoutGrid, BookImage } from "lucide-react";
import { getAllWordMatchRounds } from "@/lib/actions/wordMatch.actions";
import { getAllPictureStorySets } from "@/lib/actions/pictureStory.actions";
import {
    AdminPageShell,
    AdminManagementCard,
} from "@/components/admin/AdminPageShell";

export const dynamic = "force-dynamic";

const GamesAdminPage = async () => {
    const [rounds, sets] = await Promise.all([
        getAllWordMatchRounds().catch(() => []),
        getAllPictureStorySets().catch(() => []),
    ]);

    return (
        <AdminPageShell
            title="Games Management"
            description="Manage content for the self-paced mini-games"
            backHref="/admin"
            backLabel="Back to Dashboard"
        >
            <div className="grid gap-4 md:grid-cols-2">
                <AdminManagementCard
                    href="/admin/games/word-match"
                    title="Word Match"
                    description="Tap-to-match pairs of words, pictures and replies"
                    stat={`${rounds.length} rounds`}
                    cta="Manage"
                    icon={LayoutGrid}
                    accent="brand"
                />
                <AdminManagementCard
                    href="/admin/games/picture-story"
                    title="Picture Story"
                    description="Picture sequences with multiple-choice sentences"
                    stat={`${sets.length} question sets`}
                    cta="Manage"
                    icon={BookImage}
                    accent="violet"
                />
            </div>
        </AdminPageShell>
    );
};

export default GamesAdminPage;
