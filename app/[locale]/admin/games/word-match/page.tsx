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
                <WordMatchRoundManager initialRounds={rounds} />
            </div>
        </div>
    );
}
