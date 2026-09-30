import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

const Footer = () => {
    const t = useTranslations("footer");

    return (
        // Full-bleed like ShareIdeasSection above, so the two read as one band
        <footer className="relative left-1/2 w-screen -translate-x-1/2 border-t border-[#15301f]/10 bg-primary py-6 text-center text-sm font-semibold text-[#15301f]/70">
            <Link href="/privacy" className="underline-offset-4 hover:text-[#15301f] hover:underline">
                {t("privacyPolicy")}
            </Link>
        </footer>
    );
};

export default Footer;
