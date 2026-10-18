import { requireSignedIn } from "@/lib/auth";

interface LearnLayoutProps {
    children: React.ReactNode;
}

// Covers the whole lesson subtree, /learn/[lessonIndex] and its /quiz page —
// the quiz was the page a middleware matcher hole exposed to anonymous
// visitors, so it must not depend on the matcher alone.
export default async function LearnLayout({ children }: LearnLayoutProps) {
    await requireSignedIn();

    return <>{children}</>;
}
