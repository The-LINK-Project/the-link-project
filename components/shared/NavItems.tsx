import React from 'react'
import { navLinks } from '../constants'
import Link from 'next/link'
import { cn } from '@/lib/utils'

const NavItems = ({ className }: { className: string }) => {
  return (
    <div className={cn('space-x-10', className)}>
        {navLinks.map((navLink) => (
            <Link href={navLink.route} key={navLink.name}>
                {navLink.name}
            </Link>
        ))}
    </div>
  )
}

export default NavItems