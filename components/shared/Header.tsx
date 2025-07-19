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
import Link from "next/link";
import { Button } from "../ui/button";
import { Lightbulb } from "lucide-react";
import { redirectToForm } from "@/lib/clientUtils";
import { UserButton } from "@clerk/nextjs";
import { SignedOut } from "@clerk/clerk-react";

const Header = () => {
  return (
    <div className="flex flex-row mx-6 md:mx-24 h-18 items-center justify-between">
      {/* LEFT: Logo */}
      <div className="flex flex-row items-center gap-2">
        <img src="/assets/link.png" className="w-8 h-8" alt="logo" />
        <h1 className="font-semibold text-lg">The LINK Project</h1>
      </div>

      {/* CENTER: NavItems */}
      <div className="hidden md:flex flex-1 justify-center">
        <NavItems className="hidden md:flex" />
      </div>

      {/* RIGHT: User / Get Started */}
      <div className="flex items-center gap-4">
        <UserButton />
        <SignedOut>
          <Button
            asChild
            className="px-6 py-3 text-base font-semibold rounded-xl bg-[rgb(90,199,219)] hover:bg-[rgb(75,180,200)] text-white shadow-md transition-all duration-200"
          >
            <Link href="/sign-up">Get Started</Link>
          </Button>
        </SignedOut>
      </div>

      {/* Mobile menu */}
      <div className="relative md:hidden ml-2">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <MenuIcon />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {navLinks.map((navLink) => (
              <DropdownMenuItem key={navLink.name} asChild>
                <Link href={navLink.route}>{navLink.name}</Link>
              </DropdownMenuItem>
            ))}
            <DropdownMenuItem>
              <Button
                className="mb-3 cursor-pointer bg-main-blue w-48 h-10 mt-3 hover:bg-main-blue-hover transition-transform duration-500 transform hover:scale-105 flex justify-center"
                onClick={redirectToForm}
              >
                <Lightbulb className="w-6 h-5 text-white mr-2" />
                <h1 className="pr-1">Share Your Ideas</h1>
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>

  );
};

export default Header;
