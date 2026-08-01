import React from "react";
import PictureStoryGame from "@/components/games/PictureStoryGame";
import { PICTURE_STORY_SETS } from "@/constants/games/pictureStory";

const PictureStoryPage = () => {
    return (
        <div className="min-h-screen flex flex-col items-center">
            <div className="w-full max-w-2xl px-4 py-8 sm:px-6 sm:py-12">
                <div className="mb-6 text-center">
                    <div className="mb-4 inline-flex items-center rounded-full bg-green-50 px-4 py-2 text-sm font-medium text-primary">
                        Game
                    </div>
                    <h1 className="mb-2 text-3xl font-bold text-primary sm:text-4xl">
                        Picture Story
                    </h1>
                    <p className="text-lg text-slate-600">
                        Look at the pictures. Tap the correct sentence.
                    </p>
                </div>

                <PictureStoryGame sets={PICTURE_STORY_SETS} />
            </div>
        </div>
    );
};

export default PictureStoryPage;
