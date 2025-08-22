import React from "react";
import { Card, CardContent } from "../ui/card";

const SolutionSection = () => {
    return (
        <div className="bg-white-50 w-full">
            <div className="container mx-auto py-12 px-4 lg:px-8">
                {/* Header */}
                {/* <div className="text-center mb-8">
                    <h2 className="text-4xl font-semibold tracking-tight mb-2">
                        The Solution
                    </h2>
                    <p className="text-gray-600 text-base max-w-xl mx-auto">
                        Personalized learning powered by smart objectives, realtime conversations, and an intelligent chatbot.
                    </p>
                </div> */}
                <div className="text-center mb-16">
                    <p className="text-primary uppercase tracking-wide mb-4">
                        THE SOLUTION
                    </p>
                    <h2 className="text-5xl font-semibold tracking-tight mb-8 max-w-4xl mx-auto leading-tight">
                        Personalized learning powered by
                    </h2>
                    <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-2xl font-medium text-gray-700 mb-12">
                        <span className="flex items-center">
                            <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                            Smart objectives
                        </span>
                        <span className="flex items-center">
                            <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                            Realtime conversations
                        </span>
                        <span className="flex items-center">
                            <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                            Intelligent chatbot
                        </span>
                    </div>
                </div>

                <div className="flex flex-col gap-6">
                    {/* Objectives - Wide Banner */}
                    <Card className="bg-gray-50 overflow-hidden rounded-2xl shadow-md">
                        <CardContent className="p-0">
                            <img
                                src="/assets/Objectives.png"
                                alt="Learning Objectives"
                                className="w-full object-contain"
                                style={{ aspectRatio: "2000 / 302" }}
                            />
                        </CardContent>
                    </Card>

                    {/* Conversation + Chatbot */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Conversation */}
                        <Card className="lg:col-span-2 bg-gray-50 overflow-hidden rounded-2xl shadow-md">
                            <CardContent className="p-0">
                                <img
                                    src="/assets/Conversation.png"
                                    alt="Realtime Conversation"
                                    className="w-full object-contain"
                                    style={{ aspectRatio: "1480 / 1118" }}
                                />
                            </CardContent>
                        </Card>

                        {/* Chatbot */}
                        <Card className="bg-gray-50 overflow-hidden rounded-2xl shadow-md">
                            <CardContent className="p-0 flex items-center justify-center">
                                <img
                                    src="/assets/Chatbot.png"
                                    alt="AI Chatbot"
                                    className="w-full object-contain"
                                    style={{ aspectRatio: "594 / 996" }}
                                />
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SolutionSection;
