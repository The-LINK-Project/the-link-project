import React from "react";
import { Button } from "../ui/button";
import { Lightbulb } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";

const ShareIdeasSection = () => {
    const t = useTranslations("shareideas");
    return (
        <div className="w-full  bg-green-50 py-30 flex flex-col items-center ">
            <div className="text-center ">
                <p className="text-primary uppercase tracking-wide mb-4">
                    {t("tellUs")}
                </p>
                <h2 className="text-5xl font-semibold tracking-tight mb-10">
                    {t("makeBetter")}
                </h2>
                <Link href="/contact">
                    <Button className="cursor-pointer bg-primary w-48 h-10 hover:bg-primary-hover transition-transform duration-500 transform hover:scale-105">
                        <Lightbulb className="!w-6 !h-5" strokeWidth={2} />
                        <h1 className=" pr-1">{t("shareIdeas")}</h1>
                    </Button>
                </Link>
            </div>
        </div>
    );
};

export default ShareIdeasSection;
