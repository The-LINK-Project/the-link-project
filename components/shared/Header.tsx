"use client";
import React from "react";
import NavItems from "./NavItems";
import { MenuIcon } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
    DropdownMenuItem,
} from "../ui/dropdown-menu";
import { navLinks } from "../../constants";
import { Link, usePathname } from "@/i18n/navigation";
import { Button } from "../ui/button";
import { UserButton } from "@clerk/nextjs";
import { SignedOut } from "@clerk/clerk-react";
import LocaleSwitcher from "./LocaleSwitcher";

const Header = () => {
    return (
        <div className="flex flex-row mx-4 sm:mx-8 lg:mx-24 justify-between h-16 sm:h-18 items-center py-2">
            <Link href="/" className="flex flex-row gap-1 sm:gap-2 items-center">
                <img src="/assets/link_green.png" className="w-6 h-6 sm:w-8 sm:h-8" />
                <h1 className="font-semibold text-sm sm:text-lg">
                    <span className="sm:hidden">LINK</span>
                    <span className="hidden sm:inline">The LINK Project</span>
                </h1>
            </Link>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex flex-row justify-center items-center gap-6 lg:gap-10">
                <NavItems className="hidden md:block" />
                <LocaleSwitcher />
                <UserButton />
                <SignedOut>
                    <div className="flex gap-2">
                        <Button asChild size="sm">
                            <Link href="/sign-up">Sign up</Link>
                        </Button>
                        <Button asChild size="sm">
                            <Link href="/sign-in">Sign in</Link>
                        </Button>
                    </div>
                </SignedOut>
            </div>

            {/* Mobile Navigation */}
            <div className="flex md:hidden items-center gap-2">
                <LocaleSwitcher />
                <UserButton />
                <SignedOut>
                    <div className="flex gap-1">
                        <Button asChild size="sm" className="text-xs px-2">
                            <Link href="/sign-up">Sign up</Link>
                        </Button>
                        <Button asChild size="sm" className="text-xs px-2">
                            <Link href="/sign-in">Sign in</Link>
                        </Button>
                    </div>
                </SignedOut>
                <DropdownMenu>
                    <DropdownMenuTrigger className="ml-2">
                        <MenuIcon className="w-5 h-5" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                        {navLinks.map((navLink) => (
                            <DropdownMenuItem key={navLink.name} asChild>
                                <Link href={navLink.route} className="w-full">
                                    {navLink.name}
                                </Link>
                            </DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    );
};

export default Header;
