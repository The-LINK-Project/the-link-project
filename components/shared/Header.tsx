import React from 'react'
import NavItems from './NavItems'

const Header = () => {
  return (
    <div className='flex flex-row bg-amber-300'>
            <h1 className='bg-red-50'>The LINK Project</h1>
            <NavItems></NavItems>
    </div>
  )
}

export default Header