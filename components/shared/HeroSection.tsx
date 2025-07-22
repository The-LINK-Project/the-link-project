import React from "react";
import { ArrowRight, Bell } from "lucide-react";
import { Badge } from "../ui/badge";
import GetStartedButton from "./GetStartedButton";
const HeroSection = () => {
    return (
        <div className="flex flex-col items-center gap-7">
            <div>
                <Badge className="bg-blue-50 h-9 rounded-4xl">
                    <Badge className="bg-gray-100 h-6 rounded-4xl mr-0.5">
                        <Bell className="text-main-blue !h-4 !w-4"></Bell>
                        <h1 className=" text-main-blue">Announcement</h1>
                    </Badge>
                    <h1 className="text-main-blue">Introducing The LINK Project</h1>
                    <ArrowRight className="text-main-blue !h-4 !w-4 ml-1"></ArrowRight>
                </Badge>
            </div>
            <h1 className="text-6xl font-semibold pt-3 text-center">
                The LINK Project
            </h1>
            <div className="text-center flex flex-col gap-4">
                <h1 className="text-gray-500 text-xl">
                    Learn English with personalized,{" "}
                </h1>
                <h1 className="text-gray-500 text-xl">
                    AI-powered lessons built for the real world.
                </h1>
            </div>
            <div>
                <GetStartedButton />
            </div>
        </div>
    );
};

export default HeroSection;
