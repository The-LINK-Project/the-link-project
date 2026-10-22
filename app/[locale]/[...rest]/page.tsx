import { notFound } from "next/navigation";

// Any address no page answers gets the site's own not-found page, in the
// learner's language and with the header to find their way back, instead of
// Next's bare one.
export default function UnknownPage() {
    notFound();
}
