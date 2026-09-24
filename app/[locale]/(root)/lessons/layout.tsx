import { requireSignedIn } from "@/lib/auth";

// Lessons keep a learner's place per account, so the whole subtree needs a
// session. Middleware gates these routes first; this is the backstop.
export default async function LessonsLayout({ children }: { children: React.ReactNode }) {
    await requireSignedIn();

    return <>{children}</>;
}
