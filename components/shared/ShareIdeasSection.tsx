import React from "react";
import { Button } from "../ui/button";
import { Lightbulb } from "lucide-react";
import Link from "next/link";


const ShareIdeasSection = () => {
  return (
    <div className="w-full  bg-blue-50 py-30 flex flex-col items-center ">
      <div className="text-center ">
        <p className="text-main-blue uppercase tracking-wide mb-4">
          TELL US WHAT YOU THINK
        </p>
        <h2 className="text-5xl font-semibold tracking-tight mb-10">
          Help Make The LINK Project Better.
        </h2>
        <Link href="/contact">
          <Button
            className="cursor-pointer bg-main-blue w-48 h-10 hover:bg-main-blue-hover transition-transform duration-500 transform hover:scale-105"
          >
            <Lightbulb className="!w-6 !h-5" strokeWidth={2} />
            <h1 className=" pr-1">Share Your Ideas</h1>
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default ShareIdeasSection;
