import React from 'react'
import { PrimaryButton, SecondaryButton } from '../ui/buttons'
import StackedCards from '../stacked-cards/StackedCards'

function Community() {
    return (
        <div className='mt-20 flex flex-col items-center justify-center'>
            <div className="text-center space-y-2">
                <PrimaryButton className='bg-white px-12 text-primary_button hover:bg-white/80 mb-6'>Community Forum</PrimaryButton>
                <h1 className="text-[50px] md:text-4xl font-light text-white w-[500px] mx-auto">Common Services We Address at our Community</h1>
            </div>
            <StackedCards />
            <SecondaryButton className='border-white text-white hover:text-white hover:bg-gray-100/10 transition-all px-20 '>View All</SecondaryButton>

        </div>
    )
}

export default Community