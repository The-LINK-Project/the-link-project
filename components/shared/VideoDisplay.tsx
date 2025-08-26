import React from "react";
import { Card, CardContent } from "../ui/card";

const VideoDisplay = () => {
    return (
        <div className="pt-20 flex flex-row justify-center">
            <Card className="max-w-6xl w-full flex flex-row items-center justify-center">
                <CardContent className="flex flex-row items-center justify-center p-4">
                    <img
                        src="/assets/Problemsection.png"
                        alt="Problem Section"
                        className="w-full h-auto rounded-xl object-contain"
                    />
                </CardContent>
            </Card>
        </div>
    );
};

export default VideoDisplay;
