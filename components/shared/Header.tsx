"use client"
import React from 'react'
import NavItems from './NavItems'
import { MenuIcon } from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuItem } from '../ui/dropdown-menu'
import { navLinks } from '../constants'
import Link from 'next/link'

const Header = () => {
  return (
    <div className='flex flex-row mx-24 bg-red-50 justify-between h-18 items-center'>
        <h1 className=''>The LINK Project</h1>
        <NavItems className="hidden md:block" />

    <div className='relative md:hidden'>
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
            </DropdownMenuContent>
        </DropdownMenu>
    </div>
    </div>
  )
}

export default Header