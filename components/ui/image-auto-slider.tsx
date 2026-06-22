import React from "react";
import { cn } from "@/lib/utils";

interface ImageAutoSliderProps {
    /** Ordered list of image URLs to scroll through. */
    images: string[];
    /** Optional className applied to the masked viewport. */
    className?: string;
    /** Optional className applied to each image tile. */
    tileClassName?: string;
}

/**
 * A seamless, infinitely scrolling image strip. The list is duplicated once
 * so the CSS marquee can loop without a visible seam, and the animation
 * pauses on hover. Motion is disabled for users who prefer reduced motion
 * (see `globals.css`).
 */
export const ImageAutoSlider = ({
    images,
    className,
    tileClassName,
}: ImageAutoSliderProps) => {
    const loopImages = [...images, ...images];

    return (
        <div className={cn("image-marquee w-full overflow-hidden", className)}>
            <div className="image-marquee-track flex w-max gap-6">
                {loopImages.map((src, index) => (
                    <div
                        key={index}
                        className={cn(
                            "h-56 w-56 flex-shrink-0 overflow-hidden rounded-2xl shadow-lg md:h-72 md:w-72 lg:h-80 lg:w-80",
                            tileClassName,
                        )}
                    >
                        <img
                            src={src}
                            alt={`Community gallery photo ${(index % images.length) + 1}`}
                            className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                            loading="lazy"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};
