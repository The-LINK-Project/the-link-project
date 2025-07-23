import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

const GetStartedButton = () => {
    return (
        <Link href="/dashboard">
            <Button className="cursor-pointer w-48 h-10 mt-3 gap-3 bg-primary hover:bg-ring transition-transform duration-500 transform hover:scale-105">
                <h1 className=" pr-1 text-foreground">Start Learning Now!</h1>
            </Button>
        </Link>
    );
};

export default GetStartedButton;
