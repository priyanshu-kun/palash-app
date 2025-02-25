"use client";
import React from 'react'
import Image from "next/image"
import HeroImage from "@/app/assets/hero.png"
import DesignElements from '../design-elements/DesignElements';
import VideoElement from '../design-elements/VideoElement';
import { useRouter } from 'next/navigation';

function Hero() {

  const router = useRouter();

  // const [selectedDate, setSelectedDate] = useState<number | null>(null);

  const unavaliableDates = [3, 7, 8, 11, 14];
  const bookings = [2, 5, 10, 13]
  return (
    <header className='w-[96%] mx-auto relative  h-[90vh] rounded-lg '>
      <Image src={HeroImage} className='absolute w-full h-full' alt="cover image" />
      <DesignElements text='Healthy Body' className='absolute bottom-[36%] left-[40%]' />
      <DesignElements text='Healthy Mind' className='absolute bottom-[36%] left-[15%]' />
      <VideoElement className='absolute top-[20%] left-[3%]' />
      <div className='absolute  h-40  bottom-6 left-0 text-white flex flex-col justify-between text-[65px] ml-6 font-bold'>
        <span>A Journey to</span>
        <span>Mental Wellness</span>
      </div>

      <div className="bg-white/30 border-2 border-white/20 backdrop-blur-md p-6 rounded-2xl shadow-lg w-[350px] absolute right-12 top-1/2 transform -translate-y-1/2">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-white">Book Schedule</h3>
          <button className="text-sm text-white underline">View All</button>
        </div>
        <div className="flex flex-col space-x-2 mb-4">
          <div className='flex  w-fit '>

            {Array.from({ length: 7 }, (_, i) => i + 1).map((day) => (
              <div key={day} className={`w-8 h-8  rounded-full mx-1  border border-solid border-white bg-transparent ${unavaliableDates.includes(day) && "border-dashed opacity-80"} ${bookings.includes(day) ? "bg-white text-black": "text-white"}  flex items-center justify-center `}>
                {day}
              </div>
            ))}
          </div>
          <div className='flex w-fit mt-3  '>
            {Array.from({ length: 7 }, (_, i) => i + 1).map((day) => (
              <div key={day+7} className={`w-8 h-8 rounded-full mx-1 border border-solid border-white ${unavaliableDates.includes(day+7) && "border-dashed opacity-80"}  ${bookings.includes(day+7) ? "bg-white text-black": "text-white"}   flex items-center justify-center `}>
                {day + 7}
              </div>
            ))}
          </div>
        </div>
        <button onClick={(e: any) => {
          e.preventDefault();
          router.push('/services')
        }} className="w-full py-2 bg-primary_button text-white rounded-full flex items-center justify-center space-x-2 hover:bg-gray-900 transition">
          <span>Book Now</span>
          <span>→</span>
        </button>
      </div>
    </header>
  )
}

export default Hero