"use client"
import React from 'react'
import { Button } from '../ui/button'
import { AlertCircleIcon, ArrowRight, Bell, Lightbulb } from 'lucide-react'
import { Badge } from '../ui/badge'

const HeroSection = () => {

  const redirectToForm = () => {
    window.open('https://www.chess.com', '_blank');
  }
  return (
    <div className='flex flex-col items-center gap-7'>
      <div>
        <Badge className='bg-red-100 h-9 rounded-4xl'>
          <Badge className='bg-gray-100 h-6 rounded-4xl mr-0.5' >
            <Bell className='text-red-500 !h-4 !w-4'></Bell>
            <h1 className=' text-red-500'>Announcement</h1>
          </Badge>
          <h1 className='text-red-500'>
            Introducing The LINK Project
          </h1>
          <ArrowRight className='text-red-500 !h-4 !w-4 ml-1'>

          </ArrowRight>
        </Badge>
      </div>
        <h1 className='text-6xl font-semibold pt-3'>The LINK Project</h1>
        <div className='text-center flex flex-col gap-4'>
          <h1 className='text-gray-500 text-xl'>Learn English with personalized, </h1>
          <h1 className='text-gray-500 text-xl'>AI-powered lessons built for the real world.</h1>
        </div>
        <div>
          <Button className='cursor-pointer bg-red-500 w-48 h-10 mt-3' onClick={redirectToForm}>
            <Lightbulb className="!w-6 !h-5" strokeWidth={2} />
            <h1 className=' pr-1'>Share Your Ideas</h1>
            </Button>
        </div>
        <div>
          <h1 className='text-gray-500'>Completely Free. No Credit Card Required.</h1>
        </div>
    </div>
  )
}

export default HeroSection