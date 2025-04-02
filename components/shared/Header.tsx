"use client"
import React from 'react'
import NavItems from './NavItems'
import { MenuIcon } from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuItem } from '../ui/dropdown-menu'
import { navLinks } from '../constants'
import Link from 'next/link'
import { Button } from '../ui/button'
import { Lightbulb } from 'lucide-react'
import { redirectToForm } from '@/lib/clientUtils'

const Header = () => {
  return (
    <div className='flex flex-row mx-24 bg-red-50 justify-between h-18 items-center'>
        <h1 className='font-semibold text-lg'>The LINK Project</h1>
        <div className='flex flex-row justify-center items-center gap-10'>
            <NavItems className="hidden md:block" />
            <div className='hidden md:block'>
                <Button className='mb-3 cursor-pointer bg-red-500 w-48 h-10 mt-3 hover:bg-red-600 transition-transform duration-500 transform hover:scale-105 flex items- justify-center' onClick={redirectToForm}>
                    <Lightbulb className="!w-6 !h-5" strokeWidth={2} />
                    <h1 className=' pr-1'>Share Your Ideas</h1>
                </Button>
            </div>
        </div> 
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
                <DropdownMenuItem>
                    <Button className='mb-3 cursor-pointer bg-red-500 w-48 h-10 mt-3 hover:bg-red-600 transition-transform duration-500 transform hover:scale-105 flex items- justify-center' onClick={redirectToForm}>
                        <Lightbulb className="!w-6 !h-5 text-white" strokeWidth={2} />
                        <h1 className=' pr-1'>Share Your Ideas</h1>
                    </Button>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    </div>
    </div>
  )
}

export default Header