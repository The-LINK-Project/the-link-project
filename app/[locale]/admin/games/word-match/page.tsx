import WordMatchRoundManager from "@/components/admin/games/WordMatchRoundManager";
import { getAllWordMatchRounds } from "@/lib/actions/wordMatch.actions";

export const dynamic = "force-dynamic";

export default async function WordMatchAdminPage() {
    const rounds = await getAllWordMatchRounds();

    return (
        <div className="min-h-screen">
            <div className="max-w-4xl mx-auto p-8">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-[rgb(90,199,219)] mb-4">
                        Word Match Rounds
                    </h1>
                    <p className="text-lg text-slate-600">
                        Create rounds of matching pairs for the Word Match game
                    </p>
                </div>
                <div className="mb-8 rounded-xl border-2 border-amber-300 bg-amber-50 p-5 text-amber-900">
                    <p className="font-semibold">
                        Heads up: the live game does not read from here.
                    </p>
                    <p className="mt-1 text-sm">
                        For the focus group, Word Match runs from a static content
                        file in the repo (constants/games/wordMatch.ts). Rounds
                        created on this page are saved to the database but will
                        not appear in the game. See plan.md &sect;7.1.
                    </p>
                </div>
                <WordMatchRoundManager initialRounds={rounds} />
            </div>
        </div>
    );
}
