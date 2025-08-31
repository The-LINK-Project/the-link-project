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
import { UserButton } from "@clerk/nextjs";
import { SignedOut } from "@clerk/clerk-react";

const Header = () => {
  return (
    <div className="relative h-18">
      {/* Desktop / Laptop header */}
      <div className="hidden md:flex flex-row justify-between items-center px-24 h-18">
        {/* Logo */}
        <Link href="/" className="flex flex-row gap-1 items-center">
          <img src="/assets/link_green.png" className="w-8 h-8" />
          <h1 className="font-semibold text-lg">The LINK Project</h1>
        </Link>

        {/* Nav + profile */}
        <div className="flex flex-row justify-center items-center gap-10">
          <NavItems className="" />
          <UserButton />
          <SignedOut>
            <div className="flex gap-2">
              <Button asChild>
                <Link href="/sign-up">Sign up</Link>
              </Button>
              <Button asChild>
                <Link href="/sign-in">Sign in</Link>
              </Button>
            </div>
          </SignedOut>
        </div>
      </div>

      {/* Mobile header */}
      <div className="flex md:hidden items-center justify-between px-4 py-4 relative">
        {/* Logo left */}
        <Link href="/" className="flex flex-row gap-1 items-center">
          <img src="/assets/link_green.png" className="w-8 h-8" />
          <h1 className="font-semibold text-lg truncate">The LINK Project</h1>
        </Link>

      {/* Hamburger menu right */}
      <div>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <MenuIcon />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="flex flex-col gap-2">
            {navLinks.map((navLink) => (
              <DropdownMenuItem key={navLink.name} asChild>
                <Link href={navLink.route}>{navLink.name}</Link>
              </DropdownMenuItem>
            ))}

            {/* Profile icon with text */}
            <DropdownMenuItem className="flex items-center gap-2">
              <UserButton
                appearance={{
                  elements: {
                    userButtonAvatarBox: "w-6 h-6", // smaller avatar
                  },
                }}
              />
              <span className="text-sm font-medium">Profile</span>
            </DropdownMenuItem>

            <SignedOut>
              <DropdownMenuItem asChild>
                <Button asChild>
                  <Link href="/sign-up">Sign up</Link>
                </Button>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Button asChild>
                  <Link href="/sign-in">Sign in</Link>
                </Button>
              </DropdownMenuItem>
            </SignedOut>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      </div>

    </div>
  );
};

export default Header;
