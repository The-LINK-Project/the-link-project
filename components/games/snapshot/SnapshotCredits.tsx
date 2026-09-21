"use client";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { SNAPSHOT_ITEMS } from "@/constants/games/snapshot";

// CC BY / BY-SA photos must credit their authors; this keeps that one tap
// away without cluttering the game.
export default function SnapshotCredits() {
    return (
        <Dialog>
            <DialogTrigger className="self-start text-xs text-ink-soft underline-offset-4 hover:text-ink hover:underline">
                Photo credits
            </DialogTrigger>
            <DialogContent className="max-h-[80vh] overflow-y-auto sm:max-w-lg">
                <DialogHeader>
                    <DialogTitle>Photo credits</DialogTitle>
                    <DialogDescription>
                        Photos from Wikimedia Commons, used under their open
                        licences.
                    </DialogDescription>
                </DialogHeader>
                <ul className="flex flex-col gap-1 text-sm text-ink-soft">
                    {SNAPSHOT_ITEMS.map((item) =>
                        item.credit ? (
                            <li key={item.slug}>
                                <a
                                    href={item.credit.sourceUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-ink underline-offset-4 hover:underline"
                                >
                                    {item.word}
                                </a>{" "}
                                by {item.credit.author}, {item.credit.license}
                            </li>
                        ) : null,
                    )}
                </ul>
            </DialogContent>
        </Dialog>
    );
}
