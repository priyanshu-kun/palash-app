"use client"
import { useEffect, useRef } from 'react';
import Image from "next/image"
import { SignUpForm } from "@/app/components/forms/sign-up-form"
import Logo from "@/app/assets/logo-light.png";
import { useAuth } from "@/app/hooks/useAuth";
import { redirect } from "next/navigation";
import { gsap } from 'gsap';
import { ErrorBoundary } from '../components/ErrorBoundary';


export default function Page() {
  const { user, loading } = useAuth();
  const leftSectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const featuresRef = useRef<(HTMLDivElement | null)[]>([]);
  const formRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    // GSAP Timeline for entrance animations
    const tl = gsap.timeline();

    // Animate video overlay fade in
    tl.from(leftSectionRef.current, {
      opacity: 0,
      duration: 1,
      ease: "power2.out"
    })
    // Animate title
    .from(titleRef.current, {
      y: 100,
      opacity: 0,
      duration: 1.2,
      ease: "power3.out"
    }, "-=0.5")
    // Animate subtitle
    .from(subtitleRef.current, {
      y: 50,
      opacity: 0,
      duration: 1,
      ease: "power2.out"
    }, "-=0.8")
    // Animate features
    .from(featuresRef.current, {
      y: 30,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: "power2.out"
    }, "-=0.6")
    // Animate form
    .from(formRef.current, {
      x: 50,
      opacity: 0,
      duration: 1,
      ease: "power2.out"
    }, "-=1");

    // Floating animation for features
    gsap.to(featuresRef.current, {
      y: -10,
      duration: 2,
      ease: "power2.inOut",
      yoyo: true,
      repeat: -1,
      stagger: 0.3
    });

    // Subtle pulsing animation for the overlay
    if (leftSectionRef.current) {
      gsap.to(leftSectionRef.current.querySelector('.overlay'), {
        opacity: 0.3,
        duration: 3,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1
      });
    }
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-[#f0f4f1]">
        <div className="animate-spin rounded-full h-16 w-16 sm:h-24 sm:w-24 lg:h-32 lg:w-32 border-b-2 border-green-600"></div>
      </div>
    )
  }

  if (user) {
    redirect("/");
  }

  return (
    <ErrorBoundary>
      <main className="min-h-screen w-full flex flex-col lg:flex-row overflow-hidden">
        {/* Left Section - Video Background with Animated Text */}
        <div ref={leftSectionRef} className="w-full lg:flex-1 relative flex items-center justify-center min-h-[50vh] lg:min-h-screen">
          {/* Video Background */}
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src="/videos/sign-in.mp4" type="video/mp4" />
            {/* Fallback for browsers that don't support video */}
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 via-green-700 to-teal-800"></div>
          </video>
          
          {/* Overlay */}
          <div className="overlay absolute inset-0 bg-gradient-to-br from-emerald-900/80 via-green-800/70 to-teal-900/80"></div>
          
          {/* Animated Content */}
          <div className="relative z-10 text-white text-center px-4 sm:px-6 lg:px-8 max-w-sm sm:max-w-md lg:max-w-lg">
            <h1 
              ref={titleRef}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight"
            >
              PALASH
              <span className="block text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light text-emerald-200 mt-1 sm:mt-2">
                THE CLUB
              </span>
            </h1>
            
            <p 
              ref={subtitleRef}
              className="text-base sm:text-lg md:text-xl lg:text-2xl mb-6 sm:mb-8 text-emerald-100 font-light leading-relaxed"
            >
              Begin Your Wellness Journey
            </p>
            
            <div className="space-y-2 sm:space-y-3 lg:space-y-4">
              <div 
                ref={el => { featuresRef.current[0] = el; }}
                className="flex items-center justify-center space-x-2 sm:space-x-3 text-emerald-100"
              >
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-emerald-400 rounded-full"></div>
                <span className="text-sm sm:text-base lg:text-lg">Join Our Community</span>
              </div>
              
              <div 
                ref={el => { featuresRef.current[1] = el; }}
                className="flex items-center justify-center space-x-2 sm:space-x-3 text-emerald-100"
              >
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-emerald-400 rounded-full"></div>
                <span className="text-sm sm:text-base lg:text-lg">Access Premium Services</span>
              </div>
              
              <div 
                ref={el => { featuresRef.current[2] = el; }}
                className="flex items-center justify-center space-x-2 sm:space-x-3 text-emerald-100"
              >
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-emerald-400 rounded-full"></div>
                <span className="text-sm sm:text-base lg:text-lg">Personalized Wellness Plans</span>
              </div>
              
              <div 
                ref={el => { featuresRef.current[3] = el; }}
                className="flex items-center justify-center space-x-2 sm:space-x-3 text-emerald-100"
              >
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-emerald-400 rounded-full"></div>
                <span className="text-sm sm:text-base lg:text-lg">Expert Guidance</span>
              </div>
            </div>
          </div>
          
          {/* Decorative Elements - Hidden on mobile */}
          <div className="hidden lg:block absolute top-10 left-10 w-20 h-20 border border-emerald-400/30 rounded-full animate-pulse"></div>
          <div className="hidden lg:block absolute bottom-20 right-10 w-16 h-16 border border-emerald-400/30 rounded-full animate-pulse delay-1000"></div>
          <div className="hidden lg:block absolute top-1/3 right-20 w-12 h-12 border border-emerald-400/30 rounded-full animate-pulse delay-500"></div>
        </div>

        {/* Right Section - Sign Up Form */}
        <div 
          ref={formRef}
          className="w-full lg:flex-1 bg-[#f0f4f1] flex items-center justify-center p-4 sm:p-6 lg:p-8 relative min-h-[50vh] lg:min-h-screen"
        >
          {/* Subtle pattern background */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23059669' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              backgroundSize: '60px 60px'
            }}></div>
          </div>
          
          <div className="mx-auto w-full max-w-sm sm:max-w-md space-y-4 sm:space-y-6 relative z-10">
            <div className="text-center">
              <div className="relative mx-auto mb-4 sm:mb-6 h-10 w-24 sm:h-12 sm:w-32">
                <Image
                  src={Logo}
                  alt="PALASH"
                  className="object-contain filter drop-shadow-lg"
                  fill
                />
              </div>
            </div>
            <SignUpForm />
          </div>
        </div>
      </main>
    </ErrorBoundary>
  )
}

