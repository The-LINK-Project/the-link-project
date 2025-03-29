import React from 'react'
import NavItems from './NavItems'

const Header = () => {
  return (
    <div className='flex flex-row mx-24 bg-red-50 justify-between h-18 items-center'>
            <h1 className=''>The LINK Project</h1>
            <NavItems></NavItems>
    </div>
  )
}

export default Header