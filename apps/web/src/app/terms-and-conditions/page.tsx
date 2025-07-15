"use client"

import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { useAuth } from '../hooks/useAuth';

export default function TermsAndConditions() {
  const { user, loading } = useAuth();
  
  return (
    <>
      <Navbar user={user} isLoading={loading} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero Section */}
        <div className="relative h-64 rounded-xl overflow-hidden mb-16 mt-20">
          <div className="absolute inset-0 bg-gradient-to-r from-[#012b2b]/70 to-[#517d64]/70 flex items-center">
            <div className="container mx-auto px-6">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Terms and Conditions
              </h1>
              <p className="text-xl text-white max-w-2xl">
                Journey to Wellness - Please read these terms carefully before using our services.
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          <section className="bg-white p-8 rounded-xl shadow-sm">
            <h2 className="text-2xl font-semibold mb-4 text-[#012b2b]">
              1. Acceptance of Terms
            </h2>
            <p className="text-gray-700">
              By accessing and using The Palash Club services, wellness programs, and facilities, you agree to be bound by these Terms and Conditions. 
              The Palash Club is a wellness center offering Ayurveda, Naturopathy, Acupressure, Reiki, and Sound Therapy services. 
              If you do not agree to these terms, please do not use our services.
            </p>
          </section>

          <section className="bg-white p-8 rounded-xl shadow-sm">
            <h2 className="text-2xl font-semibold mb-4 text-[#012b2b]">
              2. Membership Plans and Benefits
            </h2>
            <p className="text-gray-700 mb-4">
              The Palash Club offers the following membership options:
            </p>
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-[#012b2b] mb-2">Family Membership</h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Pay membership for one and get discount for six people</li>
                  <li>Valid for Member Nominee, Spouse, Parents, and unmarried children below 25 years (Two Only)</li>
                  <li>25% flat discount on all club activities, accommodations, dining, and SPA activities</li>
                </ul>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-[#012b2b] mb-2">Lifetime Membership</h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>7 years big renewal period</li>
                  <li>Extended time period to take advantage of membership benefits</li>
                  <li>All family membership benefits included</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="bg-white p-8 rounded-xl shadow-sm">
            <h2 className="text-2xl font-semibold mb-4 text-[#012b2b]">
              3. Wellness Services and Medical Benefits
            </h2>
            <p className="text-gray-700 mb-4">
              Members are entitled to the following wellness and medical benefits:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li><strong>Free Doctor Consultation:</strong> Free consultation from Amrutwel Ayurveda with prior appointments for day-to-day illness</li>
              <li><strong>Medical Wellness Discount:</strong> 15% flat discount on all medicine and treatment at Amrutwel Ayurveda and Research Centre</li>
              <li><strong>Free Panchkarma Treatment:</strong> Two people from one membership get free 7 days Panchkarma treatment worth ₹2,00,000/- including accommodation, food, therapy, and medicine</li>
              <li><strong>Free Diet Consultation:</strong> All enrolled members get free diet chart once a year from the doctor</li>
              <li><strong>Free Yoga Guidance:</strong> Free yoga guidance for practice at home</li>
            </ul>
          </section>

          <section className="bg-white p-8 rounded-xl shadow-sm">
            <h2 className="text-2xl font-semibold mb-4 text-[#012b2b]">
              4. Club Activities and Facilities
            </h2>
            <p className="text-gray-700 mb-4">
              Members have access to various wellness activities and hobby clubs:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Ayurveda, Naturopathy, Acupressure, Reiki, and Sound Therapy sessions</li>
              <li>Free access to Photography Club, Music Club, Pottery Club, and Art Club</li>
              <li>Luxury accommodations with private pool and spa facilities</li>
              <li>Organic food dining based on five Tatva (elements): water, earth, air, space, and fire</li>
              <li>Priority booking for all activities (prior appointment required)</li>
            </ul>
          </section>

          <section className="bg-white p-8 rounded-xl shadow-sm">
            <h2 className="text-2xl font-semibold mb-4 text-[#012b2b]">
              5. Guest Policy and Reference Benefits
            </h2>
            <div className="space-y-4 text-gray-700">
              <div>
                <h3 className="font-semibold mb-2">Guest Discounts:</h3>
                <p>Guests accompanying members receive 10% discount on all services. Members do not have to pay full price for any guest.</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Reference Benefits:</h3>
                <p>Members receive 5% reference benefit on total treatment value for both club and hospital references.</p>
              </div>
            </div>
          </section>

          <section className="bg-white p-8 rounded-xl shadow-sm">
            <h2 className="text-2xl font-semibold mb-4 text-[#012b2b]">
              6. User Responsibilities and Health Disclaimer
            </h2>
            <p className="text-gray-700 mb-4">
              As a user of our wellness services, you agree to:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Provide accurate health information and medical history during consultations</li>
              <li>Follow prescribed Ayurvedic treatments and dietary recommendations</li>
              <li>Maintain prior appointments for doctor consultations and treatments</li>
              <li>Respect the holistic wellness philosophy based on ancient Ayurvedic wisdom</li>
              <li>Understand that Ayurveda focuses on prevention and natural healing</li>
            </ul>
          </section>

          <section className="bg-white p-8 rounded-xl shadow-sm">
            <h2 className="text-2xl font-semibold mb-4 text-[#012b2b]">
              7. Payment Terms and Membership Validity
            </h2>
            <p className="text-gray-700 mb-4">
              Payment and membership terms include:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Membership fees are non-refundable unless otherwise specified</li>
              <li>Family membership covers up to 6 people as specified in membership benefits</li>
              <li>Lifetime membership includes 7-year renewal period</li>
              <li>All discounts and free services are subject to availability and prior booking</li>
              <li>Free Panchkarma treatment is valid once per membership period</li>
            </ul>
          </section>

          <section className="bg-white p-8 rounded-xl shadow-sm">
            <h2 className="text-2xl font-semibold mb-4 text-[#012b2b]">
              8. Privacy and Confidentiality
            </h2>
            <p className="text-gray-700">
              We maintain strict confidentiality of all medical consultations and health information. 
              Your wellness journey and treatment details are protected under our privacy policy. 
              Information shared with Amrutwel Ayurveda and Research Centre is used solely for treatment purposes.
            </p>
          </section>

          <section className="bg-white p-8 rounded-xl shadow-sm">
            <h2 className="text-2xl font-semibold mb-4 text-[#012b2b]">
              9. Modifications to Terms
            </h2>
            <p className="text-gray-700">
              The Palash Club reserves the right to modify these terms and membership benefits. 
              Members will be notified of any significant changes. Continued use of the services 
              after modifications constitutes acceptance of the updated terms.
            </p>
          </section>

          <section className="bg-white p-8 rounded-xl shadow-sm">
            <h2 className="text-2xl font-semibold mb-4 text-[#012b2b]">
              10. Contact Information
            </h2>
            <div className="text-gray-700 space-y-2">
              <p><strong>The Palash Club</strong></p>
              <p>Khasra No. 107, Village Sawangi (Amgaon Deoli),<br />
                 Taluka Hingna, District Nagpur</p>
              <p><strong>Phone:</strong> +91 9422115180</p>
              <p><strong>Email:</strong> thepalashclub@gmail.com</p>
              <p><strong>Website:</strong> www.palash.club.com</p>
              <p className="mt-4 text-sm italic">
                "Come in the side of Ayurveda, come close to healthy life." - Dr. Komal Kashikar
              </p>
            </div>
          </section>

          <div className="mt-12 pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-500 text-center">
              Last updated: {new Date().toLocaleDateString()}
            </p>
            <p className="text-sm text-gray-500 text-center mt-2">
              "Here is the place where your enjoyment leads you towards health."
            </p>
          </div>
        </div>
      </main>
      <div className='w-full mb-12'>
        <Footer />
      </div>
    </>
  )
}