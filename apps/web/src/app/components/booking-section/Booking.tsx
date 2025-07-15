import Image from "next/image"
// import { Button } from "@/components/ui/button"
import { Play, Lock, Heart, Users } from "lucide-react"
import Ornament from "@/app/assets/Ornament.png";
import { PrimaryButton, SecondaryButton } from "../ui/buttons";
import Link from "next/link";

export default function WellnessHero() {
  // useEffect(() => {
  //   throw new Error("Test error");
  // }, []);
  return (
    <div className="min-h-screen  p-6 mt-28 md:p-12">
      <div className="mx-auto max-w-7xl grid gap-8 lg:grid-cols-2 items-center">
        {/* Left Column - Image Section */}
        <div className="relative rounded-3xl bg-transparent overflow-hidden">
          <div className="absolute top-4 left-4 z-10">
            <div className="bg-white/80 backdrop-blur-sm rounded-full px-4 py-2">Therapy Session</div>
          </div>
          <div className="absolute top-4 right-4 z-10">
            <button  className="rounded-full bg-white w-12 h-12 flex items-center justify-center">
              <Play className="w-6 h-6 text-black ml-1" fill="currentColor" />
            </button>
          </div>
          <Image
            src={Ornament}
            alt="Wellness therapy session"
            width={600}
            height={800}
            className="w-full object-cover aspect-[4/5]"
          />
          <div className="absolute bottom-0 left-0 py-6 px-4 flex gap-4 w-full bg-white/30">
          <Link href="/services" className="w-full">
            <PrimaryButton className="w-[40%] mx-auto block">Book now</PrimaryButton>
          </Link>
            {/* <SecondaryButton className="w-[60%]">Check Availability</SecondaryButton> */}
          </div>
        </div>

        {/* Right Column - Content Section */}
        <div className="text-white space-y-8">
          <h1 className="text-5xl md:text-6xl font-semibold leading-tight">You Deserve to be Healthy</h1>
          <p className="text-white/90 text-lg leading-relaxed">
            Ayurveda not only focus on disease. But also, Ayurveda maintains that all life must be supported by energy
            in balance. When there is minimal stress and the flow of energy within a person is balanced.
          </p>
          {/* <PrimaryButton className="bg-white text-black px-8 hover:bg-white hover:opacity-80">
            View All Bookings <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
          </PrimaryButton> */}

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-6 pt-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 space-y-4">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                <Lock className="w-5 h-5 text-white" />
              </div>
              <h3 className="font-semibold text-xl">Confidentiality</h3>
              <p className="text-white/80 text-sm">
                Your privacy is sacred; we maintain the highest level of confidentiality.
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 space-y-4">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <h3 className="font-semibold text-xl">Accessibility</h3>
              <p className="text-white/80 text-sm">Accessible health support to all background and areas.</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 space-y-4">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                <Users className="w-5 h-5 text-white" />
              </div>
              <h3 className="font-semibold text-xl">Community</h3>
              <p className="text-white/80 text-sm">We foster a supportive community where you can connect and share.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

