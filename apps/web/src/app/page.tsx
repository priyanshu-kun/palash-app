"use client"

import { useEffect, useState } from "react";
import Hero from "@/app/components/hero/Hero";
import Booking from "@/app/components/booking-section/Booking";
import WellnessServices from "@/app/components/wellness-services/WellnessServices";
import Community from "@/app/components/community/Community";
import HowItsWork from "@/app/components/how-its-work/HowItsWork";
import TestimonialCarousel from "@/app/components/testimonial-carousel/TestimonialCarousel";
import CallToAction from "@/app/components/call-to-action/CallToAction";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import { useAuth } from "./hooks/useAuth";
import { Toaster } from "./components/ui/toast/toaster";
import { LoadingScreen } from "./components/ui/loader/loading";
export default function Page() {
  const { user, loading } = useAuth();
  const [load, setLoad] = useState(true);
  useEffect(() => {
    setLoad(false);
  }, [loading]);

  // if(true) {
  //   return 
  // }
  return (
      <div className="parent_home w-full pb-8 pt-6">
        {
          load && <LoadingScreen text="Inhale... Exhale... Your experience is unfolding. 🧘" fullScreen={true} size="md" color="primary" /> 
        }
        <Toaster />
        <Navbar user={user} isLoading={loading} />
        <Hero />
        <Booking />
        <WellnessServices />
        <Community />
        <HowItsWork />
        <TestimonialCarousel />
        <CallToAction />
        <Footer />
      </div>
  )
}

