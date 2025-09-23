'use client'
import { useTranslations } from "next-intl";


import React from "react";
import { ArrowRight, Bell } from "lucide-react";
import { Badge } from "../ui/badge";
import GetStartedButton from "./GetStartedButton";
import { useTranslations } from "next-intl";

const HeroSection = () => {
    const t = useTranslations("herosection");
    return (
        <div className="flex flex-col items-center gap-7">
            <div>
                <Badge className="bg-primary h-9 rounded-4xl">
                    <Badge className="bg-white h-6 rounded-4xl mr-0.5">
                        <Bell className="text-primary !h-4 !w-4"></Bell>
                        <h1 className=" text-primary">{t("announcement")}</h1>
                    </Badge>
                    <h1 className="text-white font-semibold">{t("announcement_text")}</h1>
                    <ArrowRight className="text-white !h-4 !w-4 ml-1"></ArrowRight>
                </Badge>
            </div>
            <h1 className="text-6xl font-semibold pt-3 text-center">
                {t("name")}
            </h1>
            <div className="text-center flex flex-col gap-4">
                <h1 className="text-gray-500 text-xl">
                    {t("header1")}
                </h1>
                <h1 className="text-gray-500 text-xl">
                    {t("header2")}
                </h1>
            </div>
            <div>
                <GetStartedButton />
            </div>
        </div>
    );
};

export default HeroSection;
