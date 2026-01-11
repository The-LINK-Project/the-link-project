"use client";
import React from "react";
import { navLinks } from "../../constants";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useAuth } from "@clerk/nextjs";

const NavItems = ({ className }: { className: string }) => {
    const { isSignedIn } = useAuth();
    
    // Filter out Contact and About Us when user is logged in
    const filteredNavLinks = isSignedIn
        ? navLinks.filter(
              (link) => link.name !== "Contact" && link.name !== "About Us"
          )
        : navLinks;

    return (
        <div className={cn("space-x-10", className)}>
            {filteredNavLinks.map((navLink) => (
                <Link href={navLink.route} key={navLink.name}>
                    {navLink.name}
                </Link>
            ))}
        </div>
    );
};

export default NavItems;
