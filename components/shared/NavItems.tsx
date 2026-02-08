"use client";
import React from "react";
import { navLinks } from "../../constants";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { useAuth } from "@clerk/nextjs";

const NavItems = ({ className }: { className: string }) => {
    const { isSignedIn } = useAuth();
    const filteredLinks = isSignedIn
        ? navLinks.filter(
              (link) => link.name !== "Contact" && link.name !== "About Us",
          )
        : navLinks;
    return (
        <div className={cn("space-x-10", className)}>
            {filteredLinks.map((navLink) => (
                <Link href={navLink.route} key={navLink.name}>
                    {navLink.name}
                </Link>
            ))}
        </div>
    );
};

export default NavItems;
