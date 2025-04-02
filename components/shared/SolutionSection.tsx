import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'

const SolutionSection = () => {
    return (
        <div className='bg-gray-100 w-full'>
            <div className="container mx-auto py-20 px-4">
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
                    <div className='flex flex-row gap-6  w-[750px]'>
                        <Card className='bg-gray-50 h-90 gap-3'>
                            <CardHeader>
                                <CardTitle className='text-red-500'>
                                    Leverage Point 1
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className='flex flex-col gap-8 items-center'>
                                    <h1 className='bg-red-50'>The world is blue and green, sky are blue and the grass is green just like the wispy meadow breeze by the seas</h1>
                                    <img className="w-72 h-40" src='/assets/giftemp.gif'></img>
                                </div>
                            </CardContent>
                        </Card>
                        <Card className='bg-gray-50 h-90 gap-3'>
                            <CardHeader>
                                <CardTitle className='text-red-500'>
                                    Leverage Point 2
                                </CardTitle>
                            </CardHeader>
                            <CardContent >
                                <div className='flex flex-col gap-8 items-center'>
                                    <h1>The world is blue and green, sky are blue and the grass is green just like the wispy meadow breeze by the seas</h1>
                                    <img className="w-72 h-40" src='/assets/giftemp.gif'></img>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                    <div className='flex flex-row w-[750px]'>
                        <Card className='flex flex-col bg-gray-50 h-[366px] gap-3'>
                            <CardHeader>
                                <CardTitle className='text-red-500'>
                                    Leverage Point 3
                                </CardTitle>
                            </CardHeader>
                            <CardContent className='flex flex-col gap-6'>
                                <h1 className='bg-red-50'>Feathery Entanglements of weightless clouds levitate magestically, stringing together the sky line like silk of a scarf</h1>
                                <div className='flex flex-row justify-center'>
                                    <img src='/assets/giftemp.gif' className='h-52 w-md '></img>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                </div>
                <div className=' w-[375px] h-[750px] gap-6'>
                    <Card className='w-[375px] h-[750px] gap-3 bg-gray-50 overflow-hidden'>
                        <CardHeader>
                            <CardTitle className='text-red-500'>
                                Leverage Point 4
                            </CardTitle>
                        </CardHeader>
                        <CardContent className='flex flex-col gap-6 relative'>
                            <h1>Amongst the wisps of sparkling confetti turbulent in the atmosphere, gentle whispering willows echo through the dismissive chambers of scintillating darkness</h1>
                            <img src='/assets/giftemp.gif' className="absolute pt-40 pl-20 hover:pl-14 transition-all duration-300 h-[600px] w-[1800px]"></img>
                        </CardContent>
                    </Card>
                </div>
            </div>
            
            </div>

        </div>
      )
}

export default SolutionSection