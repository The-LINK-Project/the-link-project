import React from 'react'
import { Button } from '../ui/button'
import { Lightbulb } from 'lucide-react'
import { redirectToForm } from '@/lib/clientUtils'

const ShareIdeasSection = () => {
  return (
    <div className='w-full bg-red-100 py-16'>
        <div className="text-center mb-16">
            <p className="text-red-500 uppercase tracking-wide mb-4">SHARE YOUR IDEAS</p>
            <h2 className="text-5xl font-semibold tracking-tight mb-12">
            Realtime Learning Anytime, Anywhere.
            </h2>
        </div>
        <Button className='cursor-pointer bg-red-500 w-48 h-10 mt-3 hover:bg-red-600 transition-transform duration-500 transform hover:scale-105' onClick={redirectToForm}>
            <Lightbulb className="!w-6 !h-5" strokeWidth={2} />
            <h1 className=' pr-1'>Share Your Ideas</h1>
        </Button>
    </div>
  )
}

export default ShareIdeasSection