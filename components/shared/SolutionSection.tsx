import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

const SolutionSection = () => {
    return (
        <div className="bg-green-50 w-full">
            <div className="container mx-auto py-20 px-4">
                <div className="text-center mb-16">
                    <p className="text-primary uppercase tracking-wide mb-4">
                        THE SOLUTION
                    </p>
                    <h2 className="text-5xl font-semibold tracking-tight mb-12">
                        Realtime Learning Anytime, Anywhere.
                    </h2>
                </div>
                <div className="flex flex-row gap-6 justify-center">
                    {/* #lefft side */}
                    <div className="flex flex-col gap-6">
                        {/* left top 2 orizontally placed */}
                        <div className="flex flex-row gap-6  w-[750px]">
                            <Card className="bg-gray-50 h-90 gap-3">
                                <CardHeader>
                                    <CardTitle className="text-primary">
                                        Personalised Learning Journey
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex flex-col gap-8 items-center">
                                        <h1 className="">
                                            After your very first lesson we find your weaknesses and
                                            make them your strengths with entire lessons made just for
                                            you.
                                        </h1>
                                        {/* <img className="w-72 h-40" src='/assets/giftemp.gif'></img> */}
                                        <img className="w-72 h-40" src="/assets/Content.png"></img>
                                    </div>
                                </CardContent>
                            </Card>
                            <Card className="bg-gray-50 h-90 gap-3">
                                <CardHeader>
                                    <CardTitle className="text-primary">
                                        Guided Learning Objectives
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex flex-col gap-8 items-center">
                                        <h1>
                                            Follow learning objectives so you can understand the
                                            lesson plan for the particular day and what you will be
                                            learning.
                                        </h1>
                                        {/* <img className="w-72 h-40" src='/assets/giftemp.gif'></img> */}
                                        <img className="w-72 h-40" src="/assets/Content3.png"></img>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                        <div className="flex flex-row w-[750px]">
                            <Card className="flex flex-col bg-gray-50 h-[366px] gap-3">
                                <CardHeader>
                                    <CardTitle className="text-primary">
                                        Realtime Conversations With Your Personal Assistant
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="flex flex-col gap-6">
                                    <h1 className="">
                                        The Link Project’s recording feature will let you speak and
                                        get helpful feedback. Learn to pronounce words accurately,
                                        speak with confidence, and talk more easily in daily life.
                                    </h1>
                                    <div className="flex flex-row justify-center">
                                        {/* <img src='/assets/giftemp.gif' className='h-52 w-md '></img> */}
                                        <img
                                            src="/assets/Content2.jpeg"
                                            className="h-52 w-md "
                                        ></img>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                    <div className=" w-[400px] h-[750px] gap-6">
                        <Card className="w-[400px] h-[750px] gap-3 bg-gray-50 overflow-hidden">
                            <CardHeader>
                                <CardTitle className="text-primary">
                                    Helpful AI Chatbot
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="flex flex-col gap-6 relative">
                                <h1>
                                    Utilise our chatbot for instant English help: practice your
                                    conversations, answer and ask questions and get grammar tips
                                    anytime. You have your very own personal teacher.
                                </h1>
                                {/* <img src='/assets/giftemp.gif' className="absolute pt-40 pl-20 hover:pl-14 transition-all duration-300 h-[600px] w-[1800px]"></img> */}
                                <img
                                    src="/assets/Leverage4.png"
                                    className="absolute pt-40 pl-14 transition-all duration-300 h-[600px] w-[1800px]"
                                ></img>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SolutionSection;
