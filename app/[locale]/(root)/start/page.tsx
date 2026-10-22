import { auth } from "@clerk/nextjs/server";
import { getLocale } from "next-intl/server";

import { redirect } from "@/i18n/navigation";

// Where "Start Learning Now!" goes. Someone who is new makes an account; anyone
// already signed in goes straight to their lessons. Every other page sends a
// signed-out visitor to sign in instead, as they are most likely coming back.
export default async function StartPage() {
    const { userId } = await auth();
    redirect({ href: userId ? "/dashboard" : "/sign-up", locale: await getLocale() });
}
