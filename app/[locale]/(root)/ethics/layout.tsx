import { requireSignedIn } from "@/lib/auth";

// Played from the dashboard, so it sits behind the same sign-in. Middleware
// gates the route first; this is the backstop.
export default async function EthicsLayout({ children }: { children: React.ReactNode }) {
    await requireSignedIn();

    return <>{children}</>;
}
