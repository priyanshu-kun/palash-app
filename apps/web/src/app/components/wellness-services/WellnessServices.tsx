import Image from "next/image"
import { ArrowRight, Leaf } from "lucide-react"
import { PrimaryButton, SecondaryButton } from "../ui/buttons"
import YogaImg from "@/app/assets/wellness-services-img.jpg";
import Leafs from "@/app/assets/leafs.png";

export default function WellnessServices() {
  return (
    <div className="min-h-screen bg-transparent mt-20">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <h1 className="text-white text-5xl text-center mb-8">Services</h1>

        {/* Navigation */}
        <nav className="flex flex-wrap justify-center gap-8 mb-12">
          <PrimaryButton  className="bg-white text-black hover:bg-white/90">
            Yoga
          </PrimaryButton>
          <PrimaryButton  className="text-white bg-transparent hover:bg-white/10">
            Meditation
          </PrimaryButton>
          <PrimaryButton  className="text-white bg-transparent hover:bg-white/10">
            Expert-Led Discussions
          </PrimaryButton>
          <PrimaryButton  className="text-white bg-transparent hover:bg-white/10">
            Social Sharing
          </PrimaryButton>
          <PrimaryButton className="text-white bg-transparent hover:bg-white/10">
            Live Sessions
          </PrimaryButton>
        </nav>

        {/* Main Content */}
        <div className={`relative rounded-3xl  border-2 border-white/40 backdrop-blur-sm p-8 overflow-hidden`}>
          {/* Background Pattern - Using a semi-transparent overlay */}
          <Image src={Leafs} alt="leaf design element" className="absolute bg-cover bg-center w-full" />
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 pattern-leaves"></div>
          </div>

          <div className="relative z-10 grid lg:grid-cols-2 gap-12">
            {/* Left Column */}
            <div className="space-y-6">
              <span className="inline-block px-6 py-2 rounded-full bg-white/10 text-white text-sm">Yoga</span>
              <h2 className="text-white text-4xl lg:text-5xl font-normal leading-tight">
                Experience wellness with our expert yoga services
              </h2>
              <p className="text-gray-300 leading-relaxed">
                We offer personalized sessions, group classes, and specialized practices like prenatal and therapeutic
                yoga. Led by certified instructors, our programs focus on flexibility, strength, stress relief, and
                mindfulness.
              </p>

              <div className="space-y-4">
                <SecondaryButton  className="w-full justify-between border-white text-white hover:text-white text-xl py-6">
                  Group Sessions
                  <ArrowRight className="ml-2 h-6 w-6" />
                </SecondaryButton>
                <SecondaryButton  className="w-full justify-between border-white text-white hover:text-white text-xl py-6">
                  Crisis Helpline
                  <ArrowRight className="ml-2 h-6 w-6" />
                </SecondaryButton>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Counseling Card */}
              <div className="bg-white rounded-2xl p-3 relative overflow-hidden">
                <div className="relative h-96 ">
                  <Image
                    src={YogaImg}
                    alt="Person practicing yoga on beach"
                    fill
                    className="object-cover rounded-xl filter grayscale"
                  />
                </div>
                <div className=" absolute bottom-0 flex left-0">
                    <div className="w-[60%] bg-white/80 rounded-tr-[80px] pl-8 pt-6  h-36">
                  <h3 className="text-3xl mb-2 font-semibold text-primary_button">Counseling</h3>
                  <p className="text-primary_button font-bold text-sm mb-4">
                    One-on-one sessions with our expert also experienced mental health therapists.
                  </p>
                    </div>
                  <PrimaryButton className="bg-[#2F5753] mt-14 px-8 ml-4 hover:bg-[#2F5753]/90">
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </PrimaryButton>
                </div>
              </div>

              {/* Additional Services */}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

