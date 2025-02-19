import Hero from "@/app/components/hero/Hero";
import Booking from "@/app/components/booking-section/Booking";
import WellnessServices from "@/app/components/wellness-services/WellnessServices";
import Community from "@/app/components/community/Community";
import HowItsWork from "@/app/components/how-its-work/HowItsWork";
import TestimonialCarousel from "@/app/components/testimonial-carousel/TestimonialCarousel";
import CallToAction from "@/app/components/call-to-action/CallToAction";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

export default function Page() {
  return (
    <div className="parent_home   w-full pb-8 pt-6 ">
      <Navbar />
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

