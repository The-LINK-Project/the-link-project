import { useTranslations } from "next-intl";
import ContactForm from "@/components/contact/ContactForm";

export default function ContactPage() {
    const t = useTranslations("contactUs");

    return (
        <div className="flex min-h-screen flex-col justify-center px-5 pt-20 font-body text-ink md:flex-row">
            <div className="max-w-full md:w-1/2">
                <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-eyebrow">
                    {t("headerCall")}
                </p>
                <h1 className="mb-4 font-heading text-4xl font-bold tracking-tight text-ink sm:text-5xl">
                    {t("headerTitle")}
                </h1>
                <p className="mb-6 text-lg leading-relaxed text-ink-soft">
                    {t("headerDescription")}
                </p>

                <ContactForm />
            </div>
        </div>
    );
}
