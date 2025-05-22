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
                Please read these terms carefully before using our services.
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
              By accessing and using Palash Wellness App, you agree to be bound by these Terms and Conditions. 
              If you do not agree to these terms, please do not use our services.
            </p>
          </section>

          <section className="bg-white p-8 rounded-xl shadow-sm">
            <h2 className="text-2xl font-semibold mb-4 text-[#012b2b]">
              2. Membership and Subscriptions
            </h2>
            <p className="text-gray-700 mb-4">
              Our membership plans include:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Free Trial (limited access, duration-based)</li>
              <li>Monthly Membership</li>
              <li>Quarterly Membership</li>
              <li>Annual Membership</li>
              <li>VIP / Premium Plans with exclusive benefits</li>
            </ul>
          </section>

          <section className="bg-white p-8 rounded-xl shadow-sm">
            <h2 className="text-2xl font-semibold mb-4 text-[#012b2b]">
              3. User Responsibilities
            </h2>
            <p className="text-gray-700 mb-4">
              As a user of our platform, you agree to:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Provide accurate and complete information during registration</li>
              <li>Maintain the confidentiality of your account credentials</li>
              <li>Notify us immediately of any unauthorized use of your account</li>
              <li>Use the services in compliance with all applicable laws</li>
            </ul>
          </section>

          <section className="bg-white p-8 rounded-xl shadow-sm">
            <h2 className="text-2xl font-semibold mb-4 text-[#012b2b]">
              4. Privacy and Data Protection
            </h2>
            <p className="text-gray-700">
              We are committed to protecting your privacy. Our data collection and usage practices are 
              governed by our Privacy Policy, which is incorporated into these Terms and Conditions.
            </p>
          </section>

          <section className="bg-white p-8 rounded-xl shadow-sm">
            <h2 className="text-2xl font-semibold mb-4 text-[#012b2b]">
              5. Payment Terms
            </h2>
            <p className="text-gray-700 mb-4">
              Payment terms include:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>All fees are non-refundable unless otherwise specified</li>
              <li>Auto-renewal is available for subscription plans</li>
              <li>Prices are subject to change with prior notice</li>
              <li>Payment processing is handled through secure third-party providers</li>
            </ul>
          </section>

          <section className="bg-white p-8 rounded-xl shadow-sm">
            <h2 className="text-2xl font-semibold mb-4 text-[#012b2b]">
              6. Service Usage and Limitations
            </h2>
            <p className="text-gray-700">
              We reserve the right to limit, suspend, or terminate access to our services for any user 
              who violates these terms or engages in fraudulent or harmful activities.
            </p>
          </section>

          <section className="bg-white p-8 rounded-xl shadow-sm">
            <h2 className="text-2xl font-semibold mb-4 text-[#012b2b]">
              7. Modifications to Terms
            </h2>
            <p className="text-gray-700">
              We reserve the right to modify these terms at any time. Users will be notified of any 
              significant changes. Continued use of the service after such modifications constitutes 
              acceptance of the updated terms.
            </p>
          </section>

          <section className="bg-white p-8 rounded-xl shadow-sm">
            <h2 className="text-2xl font-semibold mb-4 text-[#012b2b]">
              8. Contact Information
            </h2>
            <p className="text-gray-700">
              For any questions regarding these Terms and Conditions, please contact us at:
              <br />
              Email: support@palashwellness.com
              <br />
              Phone: +91-XXXXXXXXXX
            </p>
          </section>

          <div className="mt-12 pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-500 text-center">
              Last updated: {new Date().toLocaleDateString()}
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
