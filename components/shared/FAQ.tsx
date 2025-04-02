import React from 'react'
import { frequentlyAskedQuestions } from '../constants'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion'


const FAQ = () => {
  return (
    <div className='py-20'>
        <div className="text-center mb-16">
            <p className="text-red-500 uppercase tracking-wide mb-4">FAQ</p>
            <h2 className="text-5xl font-semibold tracking-tight mb-12">
            Frequently Asked Questions
            </h2>
        </div>
        <div className='flex flex-col gap-2 items-center'>
            <Accordion type='single' collapsible className='w-3xl space-y-2'>
                {frequentlyAskedQuestions.map((question) => (
                    <AccordionItem className="  border border-solid border-gray-200 rounded-md px-3" value={question.question} key={question.question}>
                        <AccordionTrigger>
                            <h1>{question.question}</h1>
                        </AccordionTrigger>
                        <AccordionContent>
                            <h1>{question.answer}</h1>
                        </AccordionContent>

                    </AccordionItem>

                ))}
                <AccordionItem value='not needed'>

                </AccordionItem>
            </Accordion>
        </div>
    </div>
  )
}

export default FAQ