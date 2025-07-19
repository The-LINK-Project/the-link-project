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
    <div className="flex flex-row mx-24 justify-between h-18 items-center">
      <div className="flex flex-row gap-1">
        <img src="/assets/link.png" className="w-8 h-8"></img>
        <h1 className="font-semibold text-lg">The LINK Project</h1>
      </div>
      <div className="flex flex-row justify-center items-center gap-10">
        <NavItems className="hidden md:block" />
        <div className="hidden md:block">
        </div> 
        <UserButton />
        <SignedOut>
          <Button asChild>
            <Link href="/sign-in">Log in</Link>
          </Button>
        </SignedOut>
      </div>
      <div className="relative md:hidden">
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
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default Header;
