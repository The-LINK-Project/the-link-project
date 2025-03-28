import React from 'react'
import { navLinks } from '../constants'
import Link from 'next/link'

const NavItems = () => {
  return (
    <div className='space-x-10'>
        {navLinks.map((navLink) => (
            <Link href={navLink.route} key={navLink.name}>
                {navLink.name}
            </Link>
        ))}
    </div>
  )
}

export default NavItems