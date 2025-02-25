"use client"
import React from 'react'
import { PrimaryButton, SecondaryButton } from '../ui/buttons'
import StackedCards from '../stacked-cards/StackedCards'
import Link from 'next/link'

function Community() {
    return (
        <div className='mt-20 flex flex-col items-center justify-center'>
            <div className="text-center space-y-2">
                <Link href="https://palash-app-forum.vercel.app/" target='__blank'>
                    <PrimaryButton onClick={() => {}} className='bg-white px-12 text-primary_button hover:bg-white/80 mb-6'>Community Forum</PrimaryButton>
                </Link>
                <h1 className="text-[50px] md:text-4xl font-light text-white w-[500px] mx-auto">Common Services We Address at our Community</h1>
            </div>
            <StackedCards />
            <Link href="https://palash-app-forum.vercel.app/" target='__blank'>
                <SecondaryButton className='border-white text-white hover:text-white hover:bg-gray-100/10 transition-all px-20 '>View All</SecondaryButton>
            </Link>
        </div>
    )
}

export default Community