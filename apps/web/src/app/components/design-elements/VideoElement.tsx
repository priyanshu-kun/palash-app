import React from 'react'
import Image from "next/image";
import VideoImage from '@/app/assets/vide-design-element.png';
import { ArrowRight, Play } from 'lucide-react';


function VideoElement({className=""}: {className: string;}) {
  return (
    <div className={`${className} h-52 w-48 rounded-xl  bg-black/30  overflow-hidden  backdrop-blur-md `}>
        <div className='w-full h-[70%] relative'>
            <Image src={VideoImage} alt='video element  image' className='w-full h-full' /> 
        <button className=" py-2 bg-primary_button text-white rounded-full w-8 h-8 flex items-center justify-center space-x-2 hover:bg-gray-900 transition absolute bottom-0 right-0">
            <ArrowRight size={15} />
        </button>
        </div>
        <div className='text-white text-[10px] w-full h-fit  p-2'>
            Welcome to Palash club. Join us on our transformative journey towards lasting peace.
        </div>
    </div>
  )
}

export default VideoElement