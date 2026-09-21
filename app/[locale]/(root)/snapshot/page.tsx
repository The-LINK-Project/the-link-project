import type { Metadata } from "next";
import SnapshotGame from "@/components/games/snapshot/SnapshotGame";

export const metadata: Metadata = {
    title: "Snapshot | The LINK Project",
    description:
        "A quick picture-and-word memory game from The LINK Project, set in everyday Singapore.",
};

// Public on purpose: showcase visitors play without an account, so this page
// sits outside /games (which requires sign-in) and is listed as public in
// middleware.ts.
export default function SnapshotPage() {
    return (
        <main className="font-body text-ink">
            <div className="mx-auto w-full max-w-6xl px-4 pb-20 pt-8 sm:px-8 sm:pt-12">
                <SnapshotGame />
            </div>
        </main>
    );
}
