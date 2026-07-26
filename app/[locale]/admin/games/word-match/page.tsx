import WordMatchRoundManager from "@/components/admin/games/WordMatchRoundManager";
import { getAllWordMatchRounds } from "@/lib/actions/wordMatch.actions";
import { AdminPageShell } from "@/components/admin/AdminPageShell";

export const dynamic = "force-dynamic";

export default async function WordMatchAdminPage() {
    const rounds = await getAllWordMatchRounds();

    return (
        <AdminPageShell
            title="Word Match Rounds"
            description="Create rounds of matching pairs for the Word Match game"
            backHref="/admin/games"
            backLabel="Back to Games Management"
            width="narrow"
        >
            <div className="mb-8 rounded-xl border-2 border-amber-300 bg-amber-50 p-5 text-amber-900">
                <p className="font-semibold">
                    Heads up: the live game does not read from here.
                </p>
                <p className="mt-1 text-sm">
                    For the focus group, Word Match runs from a static content
                    file in the repo (constants/games/wordMatch.ts). Rounds
                    created on this page are saved to the database but will not
                    appear in the game. See plan.md &sect;7.1.
                </p>
            </div>
            <WordMatchRoundManager initialRounds={rounds} />
        </AdminPageShell>
    );
}
