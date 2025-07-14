"use client"
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { useAuth } from '../hooks/useAuth';
import { Button } from '../components/ui/Button';

const PricingPage: React.FC = () => {
  const { user, loading } = useAuth();

  return (
    <>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Navbar user={user} isLoading={loading} />
        
        {/* Hero Section */}
        <div className="relative h-64 sm:h-80 lg:h-96 rounded-xl overflow-hidden mb-12 lg:mb-16 mt-16 lg:mt-20">
          <Image 
            src="https://images.pexels.com/photos/3823488/pexels-photo-3823488.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
            alt="The Palash Club - Journey to Wellness" 
            layout="fill"
            objectFit="cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#012b2b]/80 to-[#517d64]/70 flex items-center">
            <div className="container mx-auto px-6">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2 lg:mb-4">
                Membership Plans
              </h1>
              <p className="text-sm sm:text-base lg:text-xl text-white max-w-2xl">
                Choose your path to holistic health with our comprehensive membership plans.
              </p>
            </div>
          </div>
        </div>

        {/* Services Overview */}
        <section className="mb-12 lg:mb-16">
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-8 lg:mb-12 text-center">
            Our Wellness Services
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
            {servicesOffered.map((service, index) => (
              <div key={index} className="bg-white rounded-xl shadow-md p-4 lg:p-6 hover:shadow-lg transition-shadow duration-200 border border-gray-100">
                <div className="flex items-center mb-3 lg:mb-4">
                  <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-[#012b2b] to-[#517d64] rounded-lg flex items-center justify-center text-white text-lg lg:text-xl">
                    {service.icon}
                  </div>
                  <h3 className="font-bold text-base lg:text-lg text-gray-900 ml-3">{service.category}</h3>
                </div>
                <div className="space-y-1 lg:space-y-2">
                  {service.treatments.map((treatment, treatmentIndex) => (
                    <div key={treatmentIndex} className="flex items-center">
                      <div className="w-1.5 h-1.5 bg-[#517d64] rounded-full mr-2 flex-shrink-0"></div>
                      <span className="text-xs lg:text-sm text-gray-600">{treatment}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Membership Comparison Table */}
        <section className="mb-12 lg:mb-20">
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-8 lg:mb-12 text-center">
            Membership Benefits Comparison
          </h2>
          
          {/* Mobile View - Cards */}
          <div className="lg:hidden space-y-6">
            {membershipPlans.map((plan, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg border-2 border-gray-200 overflow-hidden">
                <div className={`p-4 text-white text-center font-bold text-lg ${plan.headerColor}`}>
                  {plan.name}
                </div>
                <div className="p-4 space-y-3">
                  {membershipFeatures.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                      <span className="text-sm font-medium text-gray-700 flex-1">{feature.label}</span>
                      <span className={`text-sm font-semibold ${
                        typeof plan.features[featureIndex] === 'string' && plan.features[featureIndex].includes('No') 
                          ? 'text-red-600' 
                          : 'text-gray-900'
                      }`}>
                        {plan.features[featureIndex]}
                      </span>
                    </div>
                  ))}
                  <div className="pt-4">
                    <div className="bg-[#012b2b] text-white text-center py-2 px-4 rounded-lg font-bold text-lg">
                      ₹{plan.cost}
                    </div>
                    <Button onClick={() => alert("Coming Soon")} className=''>
                      Choose Plan
                    </Button>
                    
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop View - Table */}
          <div className="hidden lg:block overflow-x-auto bg-white rounded-xl shadow-lg">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="text-left p-4 font-bold text-gray-900 bg-gray-50 border-b border-gray-200 min-w-[200px]">
                    Benefits
                  </th>
                  {membershipPlans.map((plan, index) => (
                    <th key={index} className={`text-center p-4 text-white font-bold border-b border-gray-200 min-w-[150px] ${plan.headerColor}`}>
                      {plan.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {membershipFeatures.map((feature, featureIndex) => (
                  <tr key={featureIndex} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="p-4 font-medium text-gray-900 bg-gray-50">
                      {feature.label}
                    </td>
                    {membershipPlans.map((plan, planIndex) => (
                      <td key={planIndex} className="p-4 text-center">
                        <span className={`font-semibold ${
                          typeof plan.features[featureIndex] === 'string' && plan.features[featureIndex].includes('No') 
                            ? 'text-red-600' 
                            : 'text-gray-900'
                        }`}>
                          {plan.features[featureIndex]}
                        </span>
                      </td>
                    ))}
                  </tr>
                ))}
                <tr className="bg-gray-50">
                  <td className="p-4 font-bold text-lg text-gray-900">
                    COST
                  </td>
                  {membershipPlans.map((plan, planIndex) => (
                    <td key={planIndex} className="p-4 text-center">
                      <div className="bg-[#012b2b]/10 text-black py-2 px-4 rounded-lg font-bold text-lg inline-block">
                        ₹{plan.cost}
                      </div>
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-4"></td>
                  {membershipPlans.map((plan, planIndex) => (
                    <td key={planIndex} className="p-4 text-center">
                    <Button onClick={() => alert("Coming Soon")} className={`rounded-full bg-primary_button text-white ${planIndex === 2 ? "bg-orange-500 hover:bg-orange-600": planIndex === 1 ? "bg-gray-500 hover:bg-gray-600": ""}`}>
                      Choose Plan
                    </Button>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Special Features */}
        <section className="mb-12 lg:mb-20">
          <div className="bg-gradient-to-r from-[#012b2b] to-[#517d64] rounded-2xl p-6 lg:p-8 text-white">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-2xl lg:text-3xl font-bold mb-4 lg:mb-6">Why Choose Palash Club?</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
                {specialFeatures.map((feature, index) => (
                  <div key={index} className="bg-white/10 rounded-xl p-4 lg:p-6 backdrop-blur-sm">
                    <div className="text-2xl lg:text-3xl mb-2 lg:mb-3">{feature.icon}</div>
                    <h3 className="text-base lg:text-xl font-bold mb-2 lg:mb-3">{feature.title}</h3>
                    <p className="text-sm lg:text-base opacity-90">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="mb-12 lg:mb-20">
          <div className="bg-gray-50 rounded-2xl p-6 lg:p-8">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4 lg:mb-6">Ready to Begin Your Wellness Journey?</h2>
              <p className="text-base lg:text-lg text-gray-700 mb-6 lg:mb-8">
                Contact us today to learn more about our membership options and start your path to holistic health.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6 mb-6 lg:mb-8">
                <div className="flex items-center justify-center">
                  <svg className="w-5 h-5 lg:w-6 lg:h-6 text-[#517d64] mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span className="text-base lg:text-lg font-medium">+91 9422115180</span>
                </div>
                <div className="flex items-center justify-center">
                  <svg className="w-5 h-5 lg:w-6 lg:h-6 text-[#517d64] mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="text-base lg:text-lg font-medium">thepalashclub@gmail.com</span>
                </div>
              </div>
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

// Services offered by Palash Club
const servicesOffered = [
  {
    category: "Ayurveda",
    icon: "🌿",
    treatments: [
      "Hasthabhyangam", "Padabhyangam", "Full Body Massage", 
      "Facial", "Hair Treatment", "Bridal Package",
      "Steam Bath", "Potli", "Shirodhara", "Leach Therapy"
    ]
  },
  {
    category: "Naturopathy", 
    icon: "🌱",
    treatments: [
      "Pool Play", "Pool Gym", "Pool Therapy",
      "Mud Play", "Mud Therapy", "Yoga",
      "Meditation", "Diet Chart"
    ]
  },
  {
    category: "Reiki",
    icon: "✨",
    treatments: [
      "Reiki Therapy", "Reiki Yoga", "Reiki Meditation"
    ]
  },
  {
    category: "Sound Therapy",
    icon: "🎵",
    treatments: [
      "Sound Therapy", "Sound Yoga", "Sound Meditation"
    ]
  },
  {
    category: "Acupressure",
    icon: "👐",
    treatments: [
      "Acupressure Massage", "Acupressure Treatment"
    ]
  },
  {
    category: "Food",
    icon: "🍽️",
    treatments: [
      "Healthy Menu", "Nutritious Meals", "Special Diets"
    ]
  },
  {
    category: "Hobbies",
    icon: "🎨",
    treatments: [
      "Photography", "Music", "Pottery", 
      "Painting", "Nature Walk", "Free Buzz"
    ]
  },
  {
    category: "Hammam",
    icon: "🛁",
    treatments: [
      "Hammam Bath", "Hammam Massage"
    ]
  }
];

// Membership plans data
const membershipPlans = [
  {
    name: "MEMBERSHIP BENEFITS",
    headerColor: "bg-orange-500",
    cost: "1,98,000",
    features: ["25 Years", "4", "5", "25%", "25%", "25%", "25%", "10%", "5%", "Yes", "Yes", "No", "Yes", "No", "Yes", "No"]
  },
  {
    name: "MEMBERSHIP SILVER", 
    headerColor: "bg-gray-500",
    cost: "2,98,000",
    features: ["25 Years", "4", "7", "25%", "25%", "25%", "25%", "15%", "5%", "Yes", "Yes", "10%", "Yes", "For 2 people", "Yes", "Free Worth 1,25,000"]
  },
  {
    name: "MEMBERSHIP GOLD",
    headerColor: "bg-yellow-500", 
    cost: "3,95,000",
    features: ["25 Years", "6", "7", "25%", "25%", "25%", "25%", "15%", "5%", "Yes", "Yes", "10%", "Yes", "for 6 people", "Yes", "Free Worth 2,50,000"]
  }
];

// Membership features for table rows
const membershipFeatures = [
  { label: "Memberships Duration" },
  { label: "Number of Members" },
  { label: "Renewal Period" },
  { label: "Discount on club activities" },
  { label: "Discount on dining activities" },
  { label: "Discount on accommodations" },
  { label: "Discount on Spa activities" },
  { label: "Discount on medical Wellness" },
  { label: "Reference Benefits" },
  { label: "Priority Benefits" },
  { label: "Exploring hobbies" },
  { label: "Guest Discount" },
  { label: "Free Yoga Guidance" },
  { label: "Free Diet Chart" },
  { label: "Free Doctor Consultation" },
  { label: "Free Panchkarma For Seven Days" }
];

// Special features
const specialFeatures = [
  {
    icon: "🏥",
    title: "Holistic Approach",
    description: "5 parallel medicine systems working together for your complete wellness"
  },
  {
    icon: "👨‍⚕️",
    title: "Expert Care",
    description: "Experienced doctors and therapists guiding your health journey"
  },
  {
    icon: "🌟",
    title: "Premium Facilities",
    description: "State-of-the-art wellness facilities with modern amenities"
  }
];

export default PricingPage;