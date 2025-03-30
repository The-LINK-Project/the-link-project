import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'

const SolutionSection = () => {
    return (
        <div className='bg-gray-100 w-full'>
            <div className="container mx-auto py-16 px-4">
            <div className="text-center mb-16">
                <p className="text-red-500 uppercase tracking-wide mb-4">THE SOLUTION</p>
                <h2 className="text-5xl font-semibold tracking-tight mb-12">
                Realtime Learning Anytime, Anywhere.
                </h2>
            </div>
            <div className='flex flex-row gap-6 justify-center'>
                {/* #lefft side */}
                <div className='flex flex-col gap-6'>
                    {/* left top 2 orizontally placed */}
                    <div className='flex flex-row gap-6 bg-red-50 w-[750px]'>
                        <Card>
                            <CardHeader>
                                <CardTitle className='text-red-500'>
                                    OINK Card 1
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className='flex flex-col gap-8 items-center'>
                                    <h1>The world is blue and green, sky are blue and the grass is green just like the wispy meadow breeze by the seas</h1>
                                    <img className="w-72 h-44" src='/assets/giftemp.gif'></img>
                                </div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle className='text-red-500'>
                                    OINK Card 2
                                </CardTitle>
                            </CardHeader>
                            <CardContent >
                                <div className='flex flex-col gap-8 items-center'>
                                    <h1>The world is blue and green, sky are blue and the grass is green just like the wispy meadow breeze by the seas</h1>
                                    <img className="w-72 h-44" src='/assets/giftemp.gif'></img>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                    <div className='flex flex-row w-[750px]'>
                        <Card className='flex flex-col  bg-red-50'>
                            <CardHeader>
                                <CardTitle className='text-red-500'>
                                    Oink Card 3
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <h1>Feathery Entanglements of weightless clouds levitate magestically, stringing together the sky line like silk of a scarf</h1>
                                <img src='/assets/giftemp.gif'></img>
                            </CardContent>
                        </Card>
                    </div>

                </div>
                <div className=' w-[375px] h-[750px] bg-amber-400 gap-6'>
                    <Card className='w-[375px] h-[750px]gap-6'>
                        <CardHeader>
                            <CardTitle className='text-red-500'>
                                Oink Card 4
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <h1>Amongst the wisps of sparkling confetti turbulent in the atmosphere, gentle whispering willows echo through the dismissive chambers of scintillating darkness</h1>
                            <img src='/assets/giftemp.gif'></img>
                        </CardContent>
                    </Card>
                </div>
            </div>
            
            </div>

        </div>
      )
}

export default SolutionSection