import { requireSignedIn } from "@/lib/auth";

interface DashboardLayoutProps {
    children: React.ReactNode;
}

// The (root) group mixes public marketing pages (/, /about, /contact) with the
// learner app, so the guard sits on each private subtree rather than on the
// group. Middleware still gates these routes first; this is the backstop.
export default async function DashboardLayout({
    children,
}: DashboardLayoutProps) {
    await requireSignedIn();

    return <>{children}</>;
}
