import React from "react";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const GetStartedButton = () => {
    return (
        <Link href="/dashboard">
            <Button className="h-auto cursor-pointer gap-2 rounded-lg bg-ink px-10 py-3.5 text-base font-semibold text-white transition-transform duration-500 hover:scale-105 hover:bg-ink/90">
                Start Learning Now!
                <ArrowRight className="!h-4 !w-4" strokeWidth={2.5} />
            </Button>
        </Link>
    );
};

export default GetStartedButton;
