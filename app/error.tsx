"use client"; 

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

const ErrorPage = () => {
  return (
    <div><p>An error occured!</p><Button asChild><Link href="/">Back to Home</Link></Button></div>
  )
}

export default ErrorPage