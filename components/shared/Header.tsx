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
import { UserButton, useAuth } from "@clerk/nextjs";
import { SignedOut } from "@clerk/clerk-react";

const Header = () => {
  const { isSignedIn } = useAuth();
  
  // Filter out Contact and About Us when user is logged in
  const filteredNavLinks = isSignedIn
    ? navLinks.filter(
          (link) => link.name !== "Contact" && link.name !== "About Us"
      )
    : navLinks;

  return (
    <div className="flex flex-row mx-24 justify-between h-18 items-center">
      <Link href="/" className="flex flex-row gap-1 items-center">
        <img src="/assets/link_green.png" className="w-8 h-8" />
        <h1 className="font-semibold text-lg">The LINK Project</h1>
      </Link>
      <div className="flex flex-row justify-center items-center gap-10">
        <NavItems className="hidden md:block" />
        <div className="hidden md:block"></div>
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
      <div className="relative md:hidden">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <MenuIcon />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {filteredNavLinks.map((navLink) => (
              <DropdownMenuItem key={navLink.name} asChild>
                <Link href={navLink.route}>{navLink.name}</Link>
              </DropdownMenuItem>
            ))}
            <DropdownMenuItem></DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default Header;
