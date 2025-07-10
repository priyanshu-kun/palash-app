"use client"
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { useAuth } from '../hooks/useAuth';

const PricingPage: React.FC = () => {
  const { user, loading } = useAuth();
  const [selectedPlan, setSelectedPlan] = useState<'family' | 'lifetime'>('family');

  return (
    <>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Navbar user={user} isLoading={loading} />
        
        {/* Hero Section */}
        <div className="relative h-96 rounded-xl overflow-hidden mb-16 mt-20">
          <Image 
            src="https://images.pexels.com/photos/3823488/pexels-photo-3823488.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
            alt="The Palash Club - Journey to Wellness" 
            layout="fill"
            objectFit="cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#012b2b]/80 to-[#517d64]/70 flex items-center">
            <div className="container mx-auto px-6">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Journey to Wellness
              </h1>
              <p className="text-xl text-white max-w-2xl">
                Choose your path to holistic health with our comprehensive membership plans.
              </p>
            </div>
          </div>
        </div>

        {/* Introduction Section */}
        <section className="mb-20 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Ancient Wisdom Meets Modern Wellness
            </h2>
            <p className="text-lg text-gray-700 mb-8">
              The Palash Club brings together Ayurveda and four other parallel medicine systems to balance your energy daily. 
              Experience the perfect blend of ancient wisdom with modern amenities under the five elements: water, earth, air, space, and fire.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mb-12">
              {fiveElements.map((element, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-br from-[#012b2b] to-[#517d64] rounded-full flex items-center justify-center text-white text-2xl">
                    {element.icon}
                  </div>
                  <h3 className="font-semibold text-sm text-gray-800">{element.name}</h3>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Plan Toggle */}
        <div className="flex justify-center mb-12">
          <div className="bg-gray-100 p-1 rounded-lg flex">
            <button
              onClick={() => setSelectedPlan('family')}
              className={`px-6 py-2 rounded-md font-medium transition-all ${
                selectedPlan === 'family' 
                  ? 'bg-[#012b2b] text-white shadow-md' 
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Family Membership
            </button>
            <button
              onClick={() => setSelectedPlan('lifetime')}
              className={`px-6 py-2 rounded-md font-medium transition-all ${
                selectedPlan === 'lifetime' 
                  ? 'bg-[#012b2b] text-white shadow-md' 
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Lifetime Membership
            </button>
          </div>
        </div>

        {/* Membership Plans */}
        <section className="mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Family Membership */}
            <div className={`relative bg-white rounded-2xl shadow-lg border-2 transition-all duration-300 ${
              selectedPlan === 'family' ? 'border-[#012b2b] shadow-xl scale-105' : 'border-gray-200'
            }`}>
              <div className="p-8">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Family Membership</h3>
                  <p className="text-gray-600 mb-4">Perfect for families seeking wellness together</p>
                  <div className="bg-gradient-to-r from-[#012b2b] to-[#517d64] text-white px-4 py-2 rounded-full inline-block">
                    <span className="text-sm font-medium">Pay for 1, Benefits for 6</span>
                  </div>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <p className="font-medium text-gray-900">Coverage for 6 People</p>
                      <p className="text-sm text-gray-600">Member, Spouse, Parents & 2 unmarried children under 25</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <p className="font-medium text-gray-900">7-Year Renewal Period</p>
                      <p className="text-sm text-gray-600">Extended time to maximize your benefits</p>
                    </div>
                  </div>
                </div>

                <button onClick={() => {
                  alert("Coming Soon")
                }} className="w-full bg-gradient-to-r from-[#012b2b] to-[#517d64] text-white py-3 px-6 rounded-full  font-medium hover:from-[#014040] hover:to-[#628a75] transition-all duration-200 shadow-md hover:shadow-lg">
                  Choose Family Plan
                </button>
              </div>
            </div>

            {/* Lifetime Membership */}
            <div className={`relative bg-white rounded-2xl shadow-lg border-2 transition-all duration-300 ${
              selectedPlan === 'lifetime' ? 'border-[#012b2b] shadow-xl scale-105' : 'border-gray-200'
            }`}>
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-gradient-to-r from-amber-400 to-amber-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                  Most Popular
                </span>
              </div>
              <div className="p-8">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Lifetime Membership</h3>
                  <p className="text-gray-600 mb-4">Ultimate wellness investment for life</p>
                  <div className="bg-gradient-to-r from-amber-500 to-amber-600 text-white px-4 py-2 rounded-full inline-block">
                    <span className="text-sm font-medium">Lifetime Wellness Journey</span>
                  </div>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <p className="font-medium text-gray-900">All Family Benefits</p>
                      <p className="text-sm text-gray-600">Everything in Family plan plus more</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <p className="font-medium text-gray-900">Lifetime Access</p>
                      <p className="text-sm text-gray-600">No renewal needed, benefits for life</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <p className="font-medium text-gray-900">Premium Priority</p>
                      <p className="text-sm text-gray-600">Enhanced benefits and exclusive access</p>
                    </div>
                  </div>
                </div>

                <button onClick={() => {
                  alert("Coming Soon")
                }}  className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-white py-3 px-6 rounded-full font-medium hover:from-amber-600 hover:to-amber-700 transition-all duration-200 shadow-md hover:shadow-lg">
                  Choose Lifetime Plan
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Overview */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Membership Benefits</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {membershipBenefits.map((benefit, index) => (
              <div key={index} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-200">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#012b2b] to-[#517d64] rounded-lg flex items-center justify-center text-white">
                    {benefit.icon}
                  </div>
                  <div className="ml-4">
                    <h3 className="font-bold text-lg text-gray-900">{benefit.title}</h3>
                    <p className="text-[#517d64] font-medium">{benefit.value}</p>
                  </div>
                </div>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Special Offers */}
        <section className="mb-20">
          <div className="bg-gradient-to-r from-[#012b2b] to-[#517d64] rounded-2xl p-8 text-white">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6">Exclusive Member Benefits</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
                  <h3 className="text-xl font-bold mb-3">Free Panchkarma Treatment</h3>
                  <p className="text-lg mb-2">Worth ₹2,00,000</p>
                  <p className="text-sm opacity-90">
                    7-day comprehensive treatment for 2 people including accommodation, food, therapy, and medicine
                  </p>
                </div>
                <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
                  <h3 className="text-xl font-bold mb-3">Healthcare Partnership</h3>
                  <p className="text-lg mb-2">15% Discount + Free Consultations</p>
                  <p className="text-sm opacity-90">
                    Tie-up with Amrutwel Ayurveda and Research Centre for all your health needs
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="mb-20">
          <div className="bg-gray-50 rounded-2xl p-8">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Ready to Begin Your Wellness Journey?</h2>
              <p className="text-lg text-gray-700 mb-8">
                Contact us today to learn more about our membership options and start your path to holistic health.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="flex items-center justify-center">
                  <svg className="w-6 h-6 text-[#517d64] mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span className="text-lg font-medium">+91 9422115180</span>
                </div>
                <div className="flex items-center justify-center">
                  <svg className="w-6 h-6 text-[#517d64] mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="text-lg font-medium">thepalashclub@gmail.com</span>
                </div>
              </div>
              {/* <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-[#012b2b] text-white px-8 py-3 rounded-lg font-medium hover:bg-[#014040] transition-colors duration-200">
                  Schedule a Visit
                </button>
                <button className="border-2 border-[#012b2b] text-[#012b2b] px-8 py-3 rounded-lg font-medium hover:bg-[#012b2b] hover:text-white transition-all duration-200">
                  Download Brochure
                </button>
              </div> */}
            </div>
          </div>
        </section>
      </main>

      <div className='w-full mb-12'>
        <Footer />
      </div>
    </>
  );
};

const fiveElements = [
  { name: "Water", icon: "💧" },
  { name: "Earth", icon: "🌍" },
  { name: "Air", icon: "💨" },
  { name: "Space", icon: "🌌" },
  { name: "Fire", icon: "🔥" }
];

const membershipBenefits = [
  {
    title: "Club Activities",
    value: "25% Discount",
    description: "Flat discount on all club activities, accommodations, dining, and spa services",
    icon: "🏃"
  },
  {
    title: "Medical Wellness",
    value: "15% Discount",
    description: "Discounted treatments at Amrutwel Ayurveda and Research Centre",
    icon: "🏥"
  },
  {
    title: "Doctor Consultation",
    value: "Free",
    description: "Complimentary doctor consultations with prior appointments",
    icon: "👩‍⚕️"
  },
  {
    title: "Guest Benefits",
    value: "10% Discount",
    description: "Your guests also enjoy discounted rates when accompanying you",
    icon: "👥"
  },
  {
    title: "Diet Consultation",
    value: "Free Annual",
    description: "Personalized diet chart consultation once per year from our doctors",
    icon: "🥗"
  },
  {
    title: "Priority Access",
    value: "First Preference",
    description: "Priority booking for all club activities and services",
    icon: "⭐"
  },
  {
    title: "Referral Benefits",
    value: "5% Commission",
    description: "Earn referral benefits on successful club and hospital references",
    icon: "💰"
  },
  {
    title: "Yoga Guidance",
    value: "Free",
    description: "Complimentary yoga guidance for home practice sessions",
    icon: "🧘"
  },
  {
    title: "Hobby Clubs",
    value: "Free Access",
    description: "Access to Photography, Music, Pottery, and Art clubs",
    icon: "🎨"
  }
];

export default PricingPage;