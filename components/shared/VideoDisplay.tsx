import React from "react";
import Image from "next/image";

/**
 * Hero product preview framed in a browser-style chrome (traffic-light dots
 * + rounded card) to echo the in-app dashboard. Image is unchanged.
 */
const VideoDisplay = () => {
    return (
        <div className="px-4 pb-16 pt-2 sm:px-8">
            <div className="mx-auto max-w-5xl rounded-2xl border border-hairline bg-surface p-3.5 shadow-[0_30px_70px_rgba(30,39,35,0.12)]">
                <div className="flex gap-1.5 px-2 pb-3 pt-1">
                    <span className="h-3 w-3 rounded-full bg-[#e6786b]" />
                    <span className="h-3 w-3 rounded-full bg-[#e7c25e]" />
                    <span className="h-3 w-3 rounded-full bg-primary" />
                </div>
                <Image
                    src="/assets/Problemsection.png"
                    alt="Problem Section"
                    width={1600}
                    height={1137}
                    priority
                    sizes="(min-width: 1024px) 1024px, 100vw"
                    className="block w-full rounded-xl object-contain"
                />
            </div>
        </div>
    );
};

export default VideoDisplay;
