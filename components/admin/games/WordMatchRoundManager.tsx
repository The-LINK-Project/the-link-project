"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
    createWordMatchRound,
    deleteWordMatchRound,
} from "@/lib/actions/wordMatch.actions";
import { Plus, Save, Trash2 } from "lucide-react";

const DEFAULT_PAIR_COUNT = 5;
const MAX_PAIRS = 8;

const emptyPair = (): WordMatchPair => ({
    left: { text: "", imageUrl: "" },
    right: { text: "", imageUrl: "" },
});

const emptyForm = (): WordMatchRoundData => ({
    title: "",
    pairs: Array.from({ length: DEFAULT_PAIR_COUNT }, emptyPair),
});

type WordMatchRoundManagerProps = {
    initialRounds: WordMatchRoundAdmin[];
};

export default function WordMatchRoundManager({
    initialRounds,
}: WordMatchRoundManagerProps) {
    const [roundData, setRoundData] = useState<WordMatchRoundData>(emptyForm());
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [deletingId, setDeletingId] = useState<string | null>(null);
    const router = useRouter();

    const updateTile = (
        pairIndex: number,
        side: "left" | "right",
        field: "text" | "imageUrl",
        value: string,
    ) => {
        setRoundData((prev) => ({
            ...prev,
            pairs: prev.pairs.map((pair, i) =>
                i === pairIndex
                    ? { ...pair, [side]: { ...pair[side], [field]: value } }
                    : pair,
            ),
        }));
    };

    const addPair = () => {
        setRoundData((prev) => ({
            ...prev,
            pairs: [...prev.pairs, emptyPair()],
        }));
    };

    const removePair = (pairIndex: number) => {
        setRoundData((prev) => ({
            ...prev,
            pairs: prev.pairs.filter((_, i) => i !== pairIndex),
        }));
    };

    const tileHasContent = (tile: WordMatchTileContent) =>
        Boolean(tile.text?.trim() || tile.imageUrl?.trim());

    const isFormValid =
        roundData.title.trim().length > 0 &&
        roundData.pairs.length >= 2 &&
        roundData.pairs.every(
            (pair) => tileHasContent(pair.left) && tileHasContent(pair.right),
        );

    const handleSubmit = async () => {
        if (!isFormValid) {
            alert(
                "Please add a title and fill in both tiles of every pair (a word/phrase or an image URL).",
            );
            return;
        }

        setIsSubmitting(true);
        try {
            const result = await createWordMatchRound(roundData);
            if (result.success) {
                alert("Round created successfully!");
                setRoundData(emptyForm());
                router.refresh();
            } else {
                alert(`Error: ${result.message}`);
            }
        } catch (error) {
            alert("An error occurred while creating the round.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async (round: WordMatchRoundAdmin) => {
        if (
            !confirm(
                `Delete the round "${round.title}"? This cannot be undone.`,
            )
        ) {
            return;
        }

        setDeletingId(round._id);
        try {
            const result = await deleteWordMatchRound(round._id);
            if (result.success) {
                router.refresh();
            } else {
                alert(`Error: ${result.message}`);
            }
        } catch (error) {
            alert("An error occurred while deleting the round.");
        } finally {
            setDeletingId(null);
        }
    };

    return (
        <div className="space-y-8">
            {/* Round details */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
                <h2 className="text-2xl font-semibold text-slate-800 mb-6">
                    Round Information
                </h2>
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                        Round Title *
                    </label>
                    <input
                        type="text"
                        value={roundData.title}
                        onChange={(e) =>
                            setRoundData((prev) => ({
                                ...prev,
                                title: e.target.value,
                            }))
                        }
                        className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[rgb(90,199,219)] focus:border-transparent"
                        placeholder="e.g. Greetings and replies"
                    />
                </div>
            </div>

            {/* Pairs */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="flex justify-between items-center mb-2">
                    <h2 className="text-2xl font-semibold text-slate-800">
                        Pairs ({roundData.pairs.length})
                    </h2>
                    <button
                        onClick={addPair}
                        disabled={roundData.pairs.length >= MAX_PAIRS}
                        className="flex items-center gap-2 px-4 py-2 bg-[rgb(90,199,219)] text-white rounded-lg hover:bg-[rgb(90,199,219)]/90 disabled:bg-slate-300 disabled:cursor-not-allowed transition-colors"
                    >
                        <Plus className="h-4 w-4" />
                        Add Pair
                    </button>
                </div>
                <p className="text-sm text-slate-500 mb-6">
                    Each pair is two tiles that belong together: a word and its
                    picture (paste an image URL), or a phrase and its natural
                    reply. Fill in text, an image URL, or both for each tile.
                </p>

                <div className="space-y-4">
                    {roundData.pairs.map((pair, index) => (
                        <div
                            key={index}
                            className="border border-slate-200 rounded-lg p-4"
                        >
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="font-semibold text-slate-700">
                                    Pair {index + 1}
                                </h3>
                                {roundData.pairs.length > 2 && (
                                    <button
                                        onClick={() => removePair(index)}
                                        className="text-red-500 hover:text-red-700 transition-colors"
                                        aria-label={`Remove pair ${index + 1}`}
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </button>
                                )}
                            </div>
                            <div className="grid gap-4 md:grid-cols-2">
                                {(["left", "right"] as const).map((side) => (
                                    <div
                                        key={side}
                                        className="bg-slate-50 rounded-lg p-3 space-y-2"
                                    >
                                        <p className="text-sm font-medium text-slate-600">
                                            {side === "left"
                                                ? "Tile 1"
                                                : "Tile 2 (its match)"}
                                        </p>
                                        <input
                                            type="text"
                                            value={pair[side].text}
                                            onChange={(e) =>
                                                updateTile(
                                                    index,
                                                    side,
                                                    "text",
                                                    e.target.value,
                                                )
                                            }
                                            className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[rgb(90,199,219)] focus:border-transparent"
                                            placeholder="Word or phrase"
                                        />
                                        <input
                                            type="url"
                                            value={pair[side].imageUrl}
                                            onChange={(e) =>
                                                updateTile(
                                                    index,
                                                    side,
                                                    "imageUrl",
                                                    e.target.value,
                                                )
                                            }
                                            className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[rgb(90,199,219)] focus:border-transparent"
                                            placeholder="Image URL (optional)"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Submit */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="flex justify-between items-center">
                    <div>
                        <h3 className="text-lg font-semibold text-slate-800">
                            Ready to create this round?
                        </h3>
                        <p className="text-slate-600">
                            Make sure every pair is complete before saving.
                        </p>
                    </div>
                    <button
                        onClick={handleSubmit}
                        disabled={isSubmitting || !isFormValid}
                        className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-slate-300 disabled:cursor-not-allowed transition-colors"
                    >
                        <Save className="h-4 w-4" />
                        {isSubmitting ? "Creating Round..." : "Create Round"}
                    </button>
                </div>
            </div>

            {/* Existing rounds */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
                <h2 className="text-2xl font-semibold text-slate-800 mb-6">
                    Existing Rounds ({initialRounds.length})
                </h2>
                {initialRounds.length === 0 ? (
                    <p className="text-slate-500 text-center py-8">
                        No rounds created yet.
                    </p>
                ) : (
                    <div className="space-y-3">
                        {initialRounds.map((round) => (
                            <div
                                key={round._id}
                                className="flex items-center justify-between border border-slate-200 rounded-lg p-4"
                            >
                                <div>
                                    <h3 className="font-semibold text-slate-800">
                                        {round.title}
                                    </h3>
                                    <p className="text-sm text-slate-500">
                                        {round.pairs.length} pairs · created{" "}
                                        {new Date(
                                            round.createdAt,
                                        ).toLocaleDateString()}
                                    </p>
                                </div>
                                <button
                                    onClick={() => handleDelete(round)}
                                    disabled={deletingId === round._id}
                                    className="flex items-center gap-2 px-3 py-2 text-red-600 border border-red-200 rounded-lg hover:bg-red-50 disabled:opacity-50 transition-colors"
                                >
                                    <Trash2 className="h-4 w-4" />
                                    {deletingId === round._id
                                        ? "Deleting..."
                                        : "Delete"}
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
