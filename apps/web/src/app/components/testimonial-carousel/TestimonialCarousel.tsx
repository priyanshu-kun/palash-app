"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/app/lib/utils"
import {SecondaryButton} from "@/app/components/ui/buttons/index"
import Leafs from "@/app/assets/leafs.png";
import Image from "next/image";

interface Testimonial {
  id: number
  quote: string
  author: string
  location: string
  avatar: string
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    quote:
      "Palash gave me the strength to overcome my anxiety. The compassionate therapists provided unwavering support, and I've found a renewed sense of purpose and tranquility in my life.",
    author: "Madhukar.D",
    location: "Client from New Delhi",
    avatar: "https://i.pravatar.cc/150",
  },
  {
    id: 2,
    quote:
      "The holistic approach to wellness transformed my perspective. The team's dedication and expertise helped me achieve balance and inner peace.",
    author: "Sarah M.",
    location: "Client from Mumbai",
    avatar: "https://i.pravatar.cc/150",
  },
  {
    id: 3,
    quote:
      "Finding this therapeutic community was life-changing. The personalized care and support system helped me rebuild my confidence.",
    author: "Raj K.",
    location: "Client from Bangalore",
    avatar: "https://i.pravatar.cc/150",
  },
]

export default function TestimonialCarousel() {
  const [currentIndex, setCurrentIndex] = React.useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = React.useState(true)
  const autoPlayRef = React.useRef<NodeJS.Timeout>(null)

  const nextSlide = React.useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
  }, [])

  const prevSlide = React.useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1))
  }, [])

  React.useEffect(() => {
    if (isAutoPlaying) {
      autoPlayRef.current = setInterval(nextSlide, 5000)
    }
    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current)
      }
    }
  }, [isAutoPlaying, nextSlide])

  const handleMouseEnter = () => setIsAutoPlaying(false)
  const handleMouseLeave = () => setIsAutoPlaying(true)

  return (
    <div
      className="relative min-h-[400px] w-full max-w-[1200px] mx-auto overflow-hidden rounded-3xl bg-primary_button p-8"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Decorative Leaves */}
      <Image src={Leafs} alt="leafs" className="absolute top-0 w-full object-cover" />

      <div className="relative">
        {/* Label */}
        <div className="mb-8">
          <span className="inline-block rounded-full bg-teal-800/50 px-4 py-1 text-sm text-teal-100">
            # Testimonials
          </span>
        </div>

        {/* Carousel */}
        <div className="relative mx-auto max-w-3xl">
          <div className="relative overflow-hidden">
            <div
              className="transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              <div className="flex">
                {testimonials.map((testimonial) => (
                  <div key={testimonial.id} className="w-full flex-shrink-0 px-4" style={{ width: "100%" }}>
                    <div className="text-center">
                      <blockquote className="mb-8">
                        <p className="text-2xl font-light leading-relaxed text-white md:text-3xl">
                          &quot;{testimonial.quote}&quot;
                        </p>
                      </blockquote>
                      <div className="flex flex-col items-center gap-2">
                        <div className="h-16 w-16 overflow-hidden rounded-full border-2 border-teal-600">
                          <Image
                            src={testimonial.avatar || "/placeholder.svg"}
                            alt=""
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="text-center">
                          <div className="font-semibold text-white">{testimonial.author}</div>
                          <div className="text-sm text-teal-200">{testimonial.location}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <SecondaryButton
            className="absolute left-0 top-1/2 border-white/30 hover:text-white -translate-y-1/2 transform rounded-full bg-teal-800/20 text-white hover:bg-teal-800/40"
            onClick={prevSlide}
          >
            <ChevronLeft className="h-6 w-6" />
          </SecondaryButton>
          <SecondaryButton
            className="absolute right-0 top-1/2 -translate-y-1/2 border-white/30 hover:text-white transform rounded-full bg-teal-800/20 text-white hover:bg-teal-800/40"
            onClick={nextSlide}
          >
            <ChevronRight className="h-6 w-6" />
          </SecondaryButton>

          {/* Dots */}
          <div className="mt-8 flex justify-center gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={cn(
                  "h-2 w-2 rounded-full transition-all",
                  currentIndex === index ? "bg-teal-200 w-4" : "bg-teal-200/40",
                )}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

