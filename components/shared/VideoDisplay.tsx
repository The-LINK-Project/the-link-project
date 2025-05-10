import React from 'react'
import { Card, CardContent } from '../ui/card'

const VideoDisplay = () => {
  return (
    <div className='pt-20 flex flex-row justify-center'>
        <Card className='w-5xl flex flex-row items-center justify-center '>
            <CardContent className='flex flex-row items-center justify-center '>
                {/* <img src='/assets/giftemp.gif' className='w-5xl h-[550px]'></img> */}
                {/* <img src='/assets/Example1.png' className='w-5xl h-[550px]'></img> */}
                <img src='/assets/Example3.png' className=''></img>
            </CardContent>
        </Card>
    </div>
  )
}

export default VideoDisplay