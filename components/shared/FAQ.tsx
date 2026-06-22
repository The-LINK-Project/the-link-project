import React from "react";
import { frequentlyAskedQuestions } from "../../constants";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "../ui/accordion";
import { useTranslations } from "next-intl";

const FAQ = () => {
    const t = useTranslations("faq");

    return (
        <div className="py-24">
            <div className="mb-12 text-center">
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-eyebrow">
                    FAQ
                </p>
                <h2 className="mt-4 font-heading text-4xl font-bold leading-tight tracking-tight text-ink sm:text-5xl">
                    Frequently Asked Questions
                </h2>
            </div>

            <div className="mx-auto max-w-3xl px-6">
                <Accordion
                    type="single"
                    collapsible
                    className="flex flex-col gap-3.5"
                >
                    {frequentlyAskedQuestions.map((faq, idx) => (
                        <AccordionItem
                            key={idx}
                            value={faq.questionKey}
                            className="rounded-2xl border border-hairline bg-surface px-6 shadow-[0_6px_18px_rgba(30,39,35,0.04)] last:border-b"
                        >
                            <AccordionTrigger className="py-5 text-lg font-bold text-ink hover:no-underline">
                                {t(faq.questionKey)}
                            </AccordionTrigger>
                            <AccordionContent className="text-base leading-relaxed text-ink-soft">
                                {t(faq.answerKey)}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </div>
    );
};

export default FAQ;
