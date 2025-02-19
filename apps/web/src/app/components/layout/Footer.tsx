"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowUpCircle, Search } from "lucide-react"
import { PrimaryButton } from "@/app/components/ui/buttons/index"
import Logo from "@/app/assets/logo.png";
import Image from "next/image";
// import {} from ""

export default function Footer() {
  const [showBackToTop, setShowBackToTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <footer className="bg-[#104844] w-[96%] mx-auto rounded-xl  text-gray-300 py-12 relative">
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo and Description */}
        <div>
          <div className="mb-8">
            {/* <h2 className="text-[#FF7F50] text-2xl font-bold mb-4">PALASH</h2> */}
            <Image src={Logo} alt="logo" className="text-2xl font-bold mb-4 w-48" />
            <p className="text-sm max-w-md text-[#FF7F50]">
              We are health experienced therapists that are passionate about our goal on empowering you mentally with our
              wellness journey.
            </p>
          </div>

          {/* Email Subscription */}
          <div>
            <div className="flex items-center max-w-md gap-2">
              <div className="relative">
               
                <input
                  type="text"
                  className="block w-96 pl-10 pr-3 py-4 border-2  border-white/40 rounded-full bg-transparent  placeholder:text-white/40 placeholder:font-semibold text-sm   focus:border-[#FF7F50] outline-none "
                  placeholder="Enter email address to get free session ..."
                />
              </div>
              <PrimaryButton className="border-gray-600 py-6 px-8 text-gray-300">
                Submit
              </PrimaryButton>
            </div>
           
          </div>
        </div>


        {/* Footer Links */}
        <div className="">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-20 mb-8">
<div className="space-y-2">
            <Link href="/about" className="block hover:text-[#FF7F50]">
              About Us
            </Link>
            <Link href="/services" className="block hover:text-[#FF7F50]">
              Services & Booking
            </Link>
            <Link href="/wellness" className="block hover:text-[#FF7F50]">
              Wellness Programs
            </Link>
            <Link href="/testimonials" className="block hover:text-[#FF7F50]">
              Testimonials
            </Link>
          </div>
          <div className="space-y-2">
            <Link href="/faq" className="block hover:text-[#FF7F50]">
              FAQ
            </Link>
            <Link href="/price" className="block hover:text-[#FF7F50]">
              Price List
            </Link>
            <Link href="/policy" className="block hover:text-[#FF7F50]">
              User Policy
            </Link>
            <Link href="/support" className="block hover:text-[#FF7F50]">
              Support
            </Link>
          </div>
          <div className="space-y-2">
            <Link href="/phone" className="block hover:text-[#FF7F50]">
              Phone
            </Link>
            <Link href="/email" className="block hover:text-[#FF7F50]">
              Email
            </Link>
            <Link href="/location" className="block hover:text-[#FF7F50]">
              Location
            </Link>
            <Link href="/social" className="block hover:text-[#FF7F50]">
              Social Media
            </Link>
          </div>
          </div>
          
 <div className="text-sm text-[#FF7F50]">
              <p>Copyright © Palash The Club</p>
            </div>
        </div>

        {/* Copyright */}


        {/* Back to Top Button */}
        {showBackToTop && (
          <button
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 bg-[#FF7F50] text-white p-2 rounded-full hover:bg-[#FF7F50]/80 transition-all"
            aria-label="Back to top"
          >
            <ArrowUpCircle className="h-6 w-6" />
          </button>
        )}
      </div>
    </footer>
  )
}

