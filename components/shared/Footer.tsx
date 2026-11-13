import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

const Footer = () => {
    const t = useTranslations("footer");

    return (
        // Full-bleed like ShareIdeasSection above, so the two read as one band
        <footer className="relative left-1/2 w-screen -translate-x-1/2 border-t border-[#15301f]/10 bg-primary py-6 text-center text-sm font-semibold text-[#15301f]/70">
            <Link
                href="/privacy"
                className="underline-offset-4 hover:text-[#15301f] hover:underline"
            >
                {t("privacyPolicy")}
            </Link>
            {/* Google asks for this line wherever its badge is shown and
                there is room. The home page shows the badge. On a phone the
                sides keep clear of the chat button (right-5, size-14). */}
            <p className="mx-auto mt-3 max-w-xl px-[4.75rem] text-xs font-normal text-[#15301f]/60 sm:px-6">
                Google Play and the Google Play logo are trademarks of Google
                LLC.
            </p>
        </footer>
    );
};

export default Footer;
