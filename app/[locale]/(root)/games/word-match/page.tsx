import React from "react";
import WordMatchGame from "@/components/games/WordMatchGame";
import { getAllWordMatchRounds } from "@/lib/actions/wordMatch.actions";

// Always read the latest rounds from MongoDB so new admin content shows up
export const dynamic = "force-dynamic";

const WordMatchPage = async () => {
    const rounds = await getAllWordMatchRounds();

    return (
        <div className="min-h-screen flex flex-col items-center">
            <div className="w-full max-w-3xl px-4 py-8 sm:px-6 sm:py-12">
                <div className="mb-6 text-center">
                    <div className="mb-4 inline-flex items-center rounded-full bg-green-50 px-4 py-2 text-sm font-medium text-primary">
                        Game
                    </div>
                    <h1 className="mb-2 text-3xl font-bold text-primary sm:text-4xl">
                        Word Match
                    </h1>
                    <p className="text-lg text-slate-600">
                        Tap two cards that match.
                    </p>
                </div>

                {rounds.length === 0 ? (
                    <div className="rounded-2xl border border-border bg-card p-10 text-center shadow-sm">
                        <div className="mb-4 text-5xl">🃏</div>
                        <p className="text-lg text-muted-foreground">
                            No rounds yet. Please check back soon!
                        </p>
                    </div>
                ) : (
                    <WordMatchGame rounds={rounds} />
                )}
            </div>
        </div>
    );
};

export default WordMatchPage;
