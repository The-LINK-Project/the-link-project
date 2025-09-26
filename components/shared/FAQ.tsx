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
        <div className="py-20">
            <div className="text-center mb-16">
                <p className="text-primary uppercase tracking-wide mb-4">FAQ</p>
                <h2 className="text-5xl font-semibold tracking-tight mb-12">
                    Frequently Asked Questions
                </h2>
            </div>

            <div className="flex flex-col gap-2 items-center">
                <Accordion type="single" collapsible className="lg:w-3xl space-y-2 px-5 sm:w-lg">
                    {frequentlyAskedQuestions.map((faq, idx) => (
                        <AccordionItem
                            key={idx}
                            value={faq.questionKey}
                            className="border border-solid border-gray-200 rounded-md px-3"
                        >
                            <AccordionTrigger>
                                <h1>{t(faq.questionKey)}</h1>
                            </AccordionTrigger>
                            <AccordionContent>
                                <h1>{t(faq.answerKey)}</h1>
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </div>
    );
};

export default FAQ;
