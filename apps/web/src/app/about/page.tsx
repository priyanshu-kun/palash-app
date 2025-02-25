// pages/about.tsx
import React from 'react';
import Image from 'next/image';
import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

const AboutPage: React.FC = () => {
  return (
    <>
      <Head>
        <title>About Us | Harmony Wellness Center</title>
        <meta name="description" content="Learn about our holistic approach to wellness and meet our team of dedicated professionals." />
      </Head>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero Section */}
        <Navbar />
        <div className="relative h-96 rounded-xl overflow-hidden mb-16 mt-20">
          <Image 
            src="https://images.pexels.com/photos/6628529/pexels-photo-6628529.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
            alt="Harmony Wellness Center" 
            layout="fill"
            objectFit="cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#012b2b]/70 to-[#517d64]/70 flex items-center">
            <div className="container mx-auto px-6">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Our Story
              </h1>
              <p className="text-xl text-white max-w-2xl">
                Guiding you on your journey to holistic wellness since 2010.
              </p>
            </div>
          </div>
        </div>

        {/* Mission Section */}
        <section className="mb-20">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
            <p className="text-lg text-gray-700 mb-8">
              At Harmony Wellness Center, we believe in a holistic approach to health and wellbeing. 
              Our mission is to empower individuals to achieve balance in mind, body, and spirit through 
              personalized wellness solutions and expert guidance.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="font-semibold text-xl mb-3 text-blue-700">Holistic Care</h3>
                <p className="text-gray-700">
                  We address all aspects of your wellness, creating integrated plans that nurture your complete health.
                </p>
              </div>
              <div className="bg-purple-50 p-6 rounded-lg">
                <h3 className="font-semibold text-xl mb-3 text-purple-700">Expert Guidance</h3>
                <p className="text-gray-700">
                  Our certified practitioners bring decades of experience to help you on your wellness journey.
                </p>
              </div>
              <div className="bg-teal-50 p-6 rounded-lg">
                <h3 className="font-semibold text-xl mb-3 text-teal-700">Community Focus</h3>
                <p className="text-gray-700">
                  We believe wellness thrives in community, offering group programs and events to foster connection.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Story Section */}
        <section className="my-32">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Journey</h2>
              <p className="text-lg text-gray-700 mb-4">
                Founded in 2010 by Dr. Sarah Chen, Harmony Wellness Center began as a small practice 
                focused on integrative medicine. Dr. Chen's vision was to create a space where conventional 
                medical wisdom could blend seamlessly with complementary therapies.
              </p>
              <p className="text-lg text-gray-700 mb-4">
                Over the years, we've grown into a comprehensive wellness center, bringing together experts 
                across multiple disciplines – from nutrition and fitness to mental health and traditional 
                healing practices.
              </p>
              <p className="text-lg text-gray-700">
                Today, we're proud to serve thousands of clients annually, guiding each person on their 
                unique path to wellness with compassion, expertise, and an unwavering commitment to holistic care.
              </p>
            </div>
            <div className='p-3 rounded-xl border border-solid border-gray-200'>

            <div className="relative h-[600px] rounded-xl overflow-hidden">
              <Image 
                src="https://images.pexels.com/photos/8872793/pexels-photo-8872793.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Dr. Sarah Chen, Founder" 
                layout="fill" 
                objectFit="cover" 
                objectPosition='center'
              />
            </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member) => (
              <div key={member.id} className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="relative h-72">
                  <Image 
                    src={member.image} 
                    alt={member.name} 
                    layout="fill" 
                    objectFit="cover" 
                    objectPosition='top'
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-xl mb-1">{member.name}</h3>
                  <p className="text-secondary_button  mb-3">{member.role}</p>
                  <p className="text-gray-700 mb-4">{member.bio}</p>
                  <div className="flex space-x-3">
                    {member.credentials.map((credential, index) => (
                      <span key={index} className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                        {credential}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="#">
              <span className="inline-flex items-center text-secondary_button hover:text-primary_button">
                Meet our full team
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </span>
            </Link>
          </div>
        </section>

        {/* Values */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10">
            <div className="flex">
              <div className="flex-shrink-0 h-12 w-12 flex items-center justify-center rounded-md bg-blue-100 text-blue-600">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">Compassionate Care</h3>
                <p className="mt-2 text-gray-700">
                  We treat each client with empathy and understanding, recognizing their unique journey.
                </p>
              </div>
            </div>
            <div className="flex">
              <div className="flex-shrink-0 h-12 w-12 flex items-center justify-center rounded-md bg-purple-100 text-purple-600">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">Evidence-Based Approach</h3>
                <p className="mt-2 text-gray-700">
                  We combine ancient wisdom with modern research for effective, proven wellness solutions.
                </p>
              </div>
            </div>
            <div className="flex">
              <div className="flex-shrink-0 h-12 w-12 flex items-center justify-center rounded-md bg-teal-100 text-teal-600">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">Accessibility</h3>
                <p className="mt-2 text-gray-700">
                  We believe wellness should be accessible to all, offering services on a sliding scale.
                </p>
              </div>
            </div>
            <div className="flex">
              <div className="flex-shrink-0 h-12 w-12 flex items-center justify-center rounded-md bg-amber-100 text-amber-600">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">Continuous Growth</h3>
                <p className="mt-2 text-gray-700">
                  We commit to ongoing education and evolving our practice to serve you better.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

<div className='w-full mb-12'>
            <Footer  />
</div>
    </>
  );
};

// Sample data - in a real application, this would come from a CMS or API
const teamMembers = [
  {
    id: 1,
    name: "Dr. Sarah Chen",
    role: "Founder & Medical Director",
    image: "https://images.pexels.com/photos/2361316/pexels-photo-2361316.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    bio: "With over 20 years of experience in integrative medicine, Dr. Chen brings a unique approach that bridges Eastern and Western healing traditions.",
    credentials: ["MD", "PhD", "Certified in Integrative Medicine"]
  },
  {
    id: 2,
    name: "Michael Rodriguez",
    role: "Nutrition Specialist",
    image: "https://images.pexels.com/photos/19728120/pexels-photo-19728120/free-photo-of-side-view-of-a-woman-with-her-arms-crossed.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    bio: "Michael specializes in creating customized nutrition plans that address specific health concerns while supporting overall wellness.",
    credentials: ["RD", "CSSD", "CSOWM"]
  },
  {
    id: 3,
    name: "Aisha Patel",
    role: "Yoga & Meditation Instructor",
    image: "https://images.pexels.com/photos/24233283/pexels-photo-24233283/free-photo-of-woman-in-jacket-sitting-and-holding-ipad.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    bio: "Aisha has taught yoga and meditation for 15 years, helping clients find balance, flexibility, and inner peace through mindful practice.",
    credentials: ["E-RYT 500", "YACEP", "Meditation Certified"]
  }
];

const testimonials = [
  {
    id: 1,
    name: "Jennifer L.",
    service: "Holistic Nutrition Program",
    image: "/images/testimonials/jennifer.jpg",
    text: "The personalized nutrition plan changed my life. After years of struggling with energy issues, I finally feel like myself again!"
  },
  {
    id: 2,
    name: "Marcus T.",
    service: "Stress Management & Meditation",
    image: "/images/testimonials/marcus.jpg",
    text: "Aisha's meditation classes have given me tools to manage my stress in ways I never thought possible. My anxiety is down and my productivity is up."
  }
];

export default AboutPage;