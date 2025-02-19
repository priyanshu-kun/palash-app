import {SecondaryButton} from "@/app/components/ui/buttons/index";
import { ArrowRight } from 'lucide-react'
import CallToActionImage from "@/app/assets/call_to_action.png";
import Image from "next/image";
import React from 'react'

function CallToAction() {
  return (
    <div className="min-h-screen bg-transparent mt-20 text-white px-4 py-12 md:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Hero Section */}
        <div className="space-y-4 max-w-2xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium leading-tight">
            Ready to embark on the journey of wellness?
          </h1>
          <p className="text-lg text-gray-300 leading-relaxed">
            Start your health transformation with our experienced therapists today. Get to be in your ultimate inner
            peace and lasting well-being with our programs, tailored special to your health needs.
          </p>
          <SecondaryButton
            variant="outline"
            className="group text-white hover:text-white border-orange-400 hover:bg-orange-400/20"
          >
            Get Started
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </SecondaryButton>
        </div>

        {/* Banner Section */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-[#FFE4E1] text-black p-6 rounded-lg flex items-center justify-center">
            <span className="text-lg font-medium">#LetsStayHealthy</span>
          </div>
          <div className="bg-[#5F8575] text-white p-6 rounded-lg flex items-center justify-center">
            <span className="text-lg font-medium">50% Discount</span>
          </div>
        </div>

        {/* Image Section */}
        <div className="relative w-full h-[300px] md:h-[400px] rounded-lg overflow-hidden">
          <Image
            src={CallToActionImage}
            alt="Hands reaching towards each other representing wellness and care"
            className="object-cover"
          />
        
        </div>
      </div>
    </div>
  )
}

export default CallToAction