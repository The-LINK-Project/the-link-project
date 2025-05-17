import React from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const NotFoundPage = () => {
  return (
    <div className='flex flex-col items-center pt-80 h-full gap-5'>
      <div>404 | No such page</div>
      <Button className='bg-main-blue hover:bg-main-blue-hover'>
        <Link href={"/"}>Return</Link>
      </Button>
    </div>
  )
}

export default NotFoundPage