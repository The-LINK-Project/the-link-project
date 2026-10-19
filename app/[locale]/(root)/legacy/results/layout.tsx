import { requireSignedIn } from "@/lib/auth";

interface ResultsLayoutProps {
    children: React.ReactNode;
}

// The (root) group mixes public marketing pages (/, /about, /contact) with the
// learner app, so the guard sits on each private subtree rather than on the
// group. Middleware still gates these routes first; this is the backstop.
export default async function ResultsLayout({ children }: ResultsLayoutProps) {
    await requireSignedIn();

    return <>{children}</>;
}
