import { requireSignedIn } from "@/lib/auth";

// The older features, kept but unlinked. Like every private subtree of (root),
// middleware gates these routes first; this is the backstop for the index page,
// and the learn, games and results layouts below keep their own.
export default async function LegacyLayout({ children }: { children: React.ReactNode }) {
    await requireSignedIn();

    return <>{children}</>;
}
