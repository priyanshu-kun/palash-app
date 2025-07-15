"use client";
import React from 'react'
import Image from "next/image"
import HeroImage from "@/app/assets/hero.jpg"
import DesignElements from '../design-elements/DesignElements';
import VideoElement from '../design-elements/VideoElement';
import { useRouter } from 'next/navigation';

function Hero() {

  const router = useRouter();

  // const [selectedDate, setSelectedDate] = useState<number | null>(null);

  const unavaliableDates = [3, 7, 8, 11, 14];
  const bookings = [2, 5, 10, 13]
  return (
    <header className='w-[98%] sm:w-[96%] md:w-[94%] mx-auto relative h-[100vh] sm:h-[80vh] lg:h-[90vh] bg-white rounded-xl sm:rounded-2xl overflow-hidden'>
      <Image src={HeroImage} className='absolute w-full h-full object-cover' alt="cover image" />
      
      {/* Background overlay for better text readability on mobile */}
      <div className="absolute inset-0 bg-black/30 sm:bg-black/20 lg:bg-black/10"></div>
      
      {/* Design Elements - Hidden on mobile, visible on larger screens */}
      <div className="hidden lg:block">
        <DesignElements text='Healthy Body' className='absolute bottom-[36%] left-[40%]' />
        <DesignElements text='Healthy Mind' className='absolute bottom-[36%] left-[15%]' />
        <VideoElement className='absolute top-[20%] left-[3%]' />
      </div>

      {/* Hero Text - Responsive positioning and sizing */}
      <div className='absolute top-1/3 sm:bottom-6 lg:bottom-0 left-2 sm:left-4 lg:left-0 text-white flex flex-col justify-end items-start text-[24px] sm:text-[32px]   md:text-[40px] lg:text-[50px] xl:text-[65px] font-bold z-10'>
        <span className='w-fit px-2 sm:px-3 lg:px-4 py-1 sm:py-2 rounded-tr-lg sm:rounded-tr-xl lg:rounded-tr-2xl bg-transparent mb-1 sm:mb-2 drop-shadow-2xl shadow-black/50' style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.8), 1px 1px 4px rgba(0,0,0,0.9)' }}>A Journey to</span>
        <span className='w-fit px-2 sm:px-3 lg:px-4 py-1 sm:py-2 rounded-tr-lg sm:rounded-tr-xl lg:rounded-tr-2xl bg-transparent drop-shadow-2xl shadow-black/50' style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.8), 1px 1px 4px rgba(0,0,0,0.9)' }}>Mental Wellness</span>
      </div>

      {/* Mobile Booking Card - Bottom positioned for mobile */}
      <div className="block sm:hidden absolute bottom-4 left-2 right-2 z-10">
        <div className="bg-white/30 border-2 border-white/20 backdrop-blur-md p-3 rounded-xl shadow-lg">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-sm font-semibold text-white">Quick Book</h3>
            <button className="text-xs text-white underline hover:text-gray-200 transition-colors">View All</button>
          </div>
          
          {/* Simplified Calendar for Mobile */}
          <div className="flex flex-wrap gap-1 mb-3">
            {Array.from({ length: 14 }, (_, i) => i + 1).map((day) => (
              <div 
                key={day} 
                className={`w-6 h-6 rounded-lg border border-solid border-white bg-transparent text-xs
                          ${unavaliableDates.includes(day) && "border-dashed opacity-80"} 
                          ${bookings.includes(day) ? "bg-white text-black font-medium": "text-white"}  
                          flex items-center justify-center cursor-pointer hover:bg-white/20 transition-colors`}
              >
                {day}
              </div>
            ))}
          </div>
          
          {/* Book Now Button */}
          <button 
            onClick={(e: any) => {
              e.preventDefault();
              router.push('/services')
            }} 
            className="w-full py-2.5 bg-primary_button text-white text-sm rounded-lg flex items-center justify-center space-x-2 hover:bg-gray-900 transition-all duration-200 font-medium"
          >
            <span>Book Now</span>
            <span className="text-lg">→</span>
          </button>
        </div>
      </div>

      {/* Desktop/Tablet Booking Card - Side positioned */}
      <div className="hidden sm:block">
        <div className="bg-white/30 border-2 border-white/20 backdrop-blur-md p-4 lg:p-6 rounded-xl lg:rounded-2xl shadow-lg 
                        w-[280px] sm:w-[300px] lg:w-[350px] 
                        absolute 
                        top-4 right-4 lg:right-12 lg:top-1/2 lg:transform lg:-translate-y-1/2 
                        z-10">
          <div className="flex justify-between items-center mb-3 lg:mb-4">
            <h3 className="text-sm lg:text-lg font-semibold text-white">Book Schedule</h3>
            <button className="text-xs lg:text-sm text-white underline hover:text-gray-200 transition-colors">View All</button>
          </div>
          
          {/* Calendar Grid - Desktop layout */}
          <div className="flex flex-col space-y-2 lg:space-y-3 mb-3 lg:mb-4">
            {/* First row of dates */}
            <div className='flex justify-center lg:justify-start w-full'>
              {Array.from({ length: 7 }, (_, i) => i + 1).map((day) => (
                <div 
                  key={day} 
                  className={`w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 rounded-full mx-0.5 sm:mx-1 border border-solid border-white bg-transparent text-xs sm:text-sm 
                            ${unavaliableDates.includes(day) && "border-dashed opacity-80"} 
                            ${bookings.includes(day) ? "bg-white text-black font-medium": "text-white"}  
                            flex items-center justify-center cursor-pointer hover:bg-white/20 transition-colors`}
                >
                  {day}
                </div>
              ))}
            </div>
            
            {/* Second row of dates */}
            <div className='flex justify-center lg:justify-start w-full'>
              {Array.from({ length: 7 }, (_, i) => i + 1).map((day) => (
                <div 
                  key={day+7} 
                  className={`w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 rounded-full mx-0.5 sm:mx-1 border border-solid border-white text-xs sm:text-sm
                            ${unavaliableDates.includes(day+7) && "border-dashed opacity-80"}  
                            ${bookings.includes(day+7) ? "bg-white text-black font-medium": "text-white"}   
                            flex items-center justify-center cursor-pointer hover:bg-white/20 transition-colors`}
                >
                  {day + 7}
                </div>
              ))}
            </div>
          </div>
          
          {/* Book Now Button */}
          <button 
            onClick={(e: any) => {
              e.preventDefault();
              router.push('/services')
            }} 
            className="w-full py-2 lg:py-3 bg-primary_button text-white text-sm lg:text-base rounded-full flex items-center justify-center space-x-2 hover:bg-gray-900 transition-all duration-200 font-medium"
          >
            <span>Book Now</span>
            <span className="text-lg">→</span>
          </button>
          
          {/* Legend for tablet */}
          <div className="hidden sm:block lg:hidden mt-3 text-xs text-white/80">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 border border-white rounded-full"></div>
                <span>Available</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <span>Booked</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 border border-dashed border-white/60 rounded-full"></div>
                <span>Unavailable</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile-specific design elements */}
      <div className="block sm:hidden absolute top-1/4 right-4 z-0">
        <div className="text-white/20 text-4xl font-bold select-none">
          ✨
        </div>
      </div>
      
      <div className="block sm:hidden absolute top-2/3 left-4 z-0">
        <div className="text-white/20 text-3xl font-bold select-none">
          🧘‍♀️
        </div>
      </div>
    </header>
  )
}

export default Hero