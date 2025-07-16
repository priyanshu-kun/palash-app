"use client"
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { useAuth } from '../hooks/useAuth';
import { Button } from '../components/ui/Button';
import { createMembershipOrder, fetchMembershipPlans, isAlreadySubscribed, subscribeToMembership, verifyMembershipOrder } from '../api/memberships';
import { Input } from '../components/ui/input';
import { useToast } from "@/app/components/ui/toast/use-toast"
import { ToastProvider } from "@/app/components/ui/toast/toast"
import { createOrder } from '../api/payment';
import Script from 'next/script';

interface MembershipPlan {
  id: string;
  name: string;
  durationYears: number;
  maxMembers: number;
  renewalPeriodYears: number;
  discountClubActivities: number;
  discountDining: number;
  discountAccommodations: number;
  discountSpaActivities: number;
  discountMedicalWellness: number;
  referenceBenefits: number;
  guestDiscount: number;
  includesYogaGuidance: boolean;
  includesDietChartFor: number;
  includesDoctorConsultation: boolean;
  panchkarmaWorth: number;
  cost: number;
  createdAt: string;
}

const PricingPage: React.FC = () => {
  const { user, loading } = useAuth();
  const [membershipPlans, setMembershipPlans] = useState<MembershipPlan[]>([]);
  const [plansLoading, setPlansLoading] = useState(true);
  const [selectedPlan, setSelectedPlan] = useState<MembershipPlan | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [memberEmails, setMemberEmails] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const loadMembershipPlans = async () => {
      try {
        const response = await fetchMembershipPlans();
        console.log(response);
        if (response.membershipPlans) {
          setMembershipPlans(response.membershipPlans);
        }
      } catch (error) {
        console.error('Error fetching membership plans:', error);
      } finally {
        setPlansLoading(false);
      }
    };

    loadMembershipPlans();
  }, []);

  const handleChoosePlan = (planId: string, planName: string) => {
    if (!user) {
      // Redirect to sign in if not authenticated
      window.location.href = '/sign-in';
      return;
    }

    const plan = membershipPlans.find(p => p.id === planId);
    if (plan) {
      setSelectedPlan(plan);
      // Set number of input fields based on plan type
      const inputCount = plan.name.toLowerCase() === 'platinum' ? 6 : 4;
      setMemberEmails(new Array(inputCount).fill(''));
      setShowModal(true);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedPlan(null);
    setMemberEmails([]);
  };

  const handleEmailChange = (index: number, email: string) => {
    const newEmails = [...memberEmails];
    newEmails[index] = email;
    setMemberEmails(newEmails);
  };

  const handleProceedToPurchase = async () => {
    try {
      if (!selectedPlan) return;

      // Filter out empty emails
      const validEmails = memberEmails.filter(email => email.trim() !== '');

      if (!user) {
        toast({
          title: "Authentication Required",
          description: "Please login to purchase this membership",
          variant: "destructive"
        });
        return;
      }

      setIsProcessing(true);

      const isAlreadySubscribedResponse = await isAlreadySubscribed({
        userId: user.id,
        membershipPlanId: selectedPlan.id
      });

      console.log("isAlreadySubscribedResponse: ", isAlreadySubscribedResponse);

      if (isAlreadySubscribedResponse.isAlreadySubscribed) {
        toast({
          title: "You are already subscribed to a membership",
          description: "Please contact support.",
          variant: "destructive"
        });
        return;
      }

      const { order: orderData } = await createMembershipOrder({
        userId: user.id,
        membershipPlanId: selectedPlan.id,
      });

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: selectedPlan.cost * 100,
        currency: "INR",
        name: "Palash Wellness",
        description: `Payment for ${selectedPlan.name}`,
        order_id: orderData.id,
        handler: async (response: any) => {
          try {
            const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = response;

            await verifyMembershipOrder({
              orderId: razorpay_order_id,
              paymentId: razorpay_payment_id,
              signature: razorpay_signature,
              userId: user.id,
              membershipPlanId: selectedPlan.id,
              amount: selectedPlan.cost,
              currency: "INR",
              status: "PAID",
              email: user.phone_or_email
            });

            const membershipData = {
              planId: selectedPlan.id,
              memberEmails: validEmails,
              paymentId: razorpay_payment_id
            }

            console.log("membershipData: ", membershipData);

            await subscribeToMembership(membershipData);

            toast({
              title: "Payment and Booking Successful",
              description: "Your booking and payment has been confirmed",
              variant: "default"
            });

            handleCloseModal();
          } catch (error: any) {
            console.error("Payment verification failed:", error.response.data.message);
            toast({
              title: "Payment Verification Failed, If the amount is deducted from your account, it will be refunded within 24 hours. Please contact support if the amount is not refunded.",
              description: error.response.data.message,
              variant: "destructive"
            });
          }
        },
        prefill: {
          name: user.name,
          email: user.phone_or_email,
          contact: user.phone_or_email
        },
        theme: {
          color: "#012b2b"
        }
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();

      handleCloseModal();
    } catch (error: any) {
      console.error('Error creating order:', error);
      toast({
        title: "Payment Verification Failed, If the amount is deducted from your account, it will be refunded within 24 hours. Please contact support if the amount is not refunded.",
        description: error.response.data.message,
        variant: "destructive"
      });
    }
    finally {
      setIsProcessing(false);
    }
  };

  const getPlanHeaderColor = (planName: string) => {
    switch (planName.toLowerCase()) {
      case 'silver':
        return 'bg-gray-500';
      case 'gold':
        return 'bg-yellow-500';
      case 'platinum':
        return 'bg-orange-500';
      default:
        return 'bg-gray-500';
    }
  };

  const formatPlanFeatures = (plan: MembershipPlan) => {
    return [
      `${plan.durationYears} Years`,
      `${plan.maxMembers}`,
      `${plan.renewalPeriodYears}`,
      `${plan.discountClubActivities}%`,
      `${plan.discountDining}%`,
      `${plan.discountAccommodations}%`,
      `${plan.discountSpaActivities}%`,
      `${plan.discountMedicalWellness}%`,
      `${plan.referenceBenefits}%`,
      plan.includesYogaGuidance ? 'Yes' : 'No',
      'Yes', // Exploring hobbies - assuming always included
      plan.guestDiscount > 0 ? `${plan.guestDiscount}%` : 'No',
      plan.includesYogaGuidance ? 'Yes' : 'No',
      plan.includesDietChartFor > 0 ? `For ${plan.includesDietChartFor} people` : 'No',
      plan.includesDoctorConsultation ? 'Yes' : 'No',
      plan.panchkarmaWorth > 0 ? `Free Worth ₹${plan.panchkarmaWorth.toLocaleString()}` : 'No'
    ];
  };

  return (
    <>
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="lazyOnload"
      />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <ToastProvider />
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
            {plansLoading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#012b2b] mx-auto"></div>
                <p className="mt-4 text-gray-600">Loading membership plans...</p>
              </div>
            ) : (
              membershipPlans.map((plan, index) => {
                const planFeatures = formatPlanFeatures(plan);
                return (
                  <div key={plan.id} className="bg-white rounded-xl shadow-lg border-2 border-gray-200 overflow-hidden">
                    <div className={`p-4 text-white text-center font-bold text-lg ${getPlanHeaderColor(plan.name)}`}>
                      {plan.name.toUpperCase()}
                    </div>
                    <div className="p-4 space-y-3">
                      {membershipFeatures.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                          <span className="text-sm font-medium text-gray-700 flex-1">{feature.label}</span>
                          <span className={`text-sm font-semibold ${typeof planFeatures[featureIndex] === 'string' && planFeatures[featureIndex].includes('No')
                            ? 'text-red-600'
                            : 'text-gray-900'
                            }`}>
                            {planFeatures[featureIndex]}
                          </span>
                        </div>
                      ))}
                      <div className="pt-4">
                        <div className="border border-solid w-full border-gray-300 bg-white text-gray-900 py-2 px-4 rounded-lg font-bold text-lg inline-block">
                          ₹{plan.cost.toLocaleString()}
                        </div>
                        <Button
                          onClick={() => handleChoosePlan(plan.id, plan.name)}
                          className={`rounded-full text-white w-full mt-2 ${plan.name.toLowerCase() === 'platinum'
                            ? "bg-orange-500 hover:bg-orange-600"
                            : plan.name.toLowerCase() === 'gold'
                              ? "bg-yellow-600 hover:bg-yellow-700"
                              : "bg-gray-500 hover:bg-gray-600"
                            }`}
                        >
                          Choose Plan
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Desktop View - Table */}
          <div className="hidden lg:block overflow-x-auto bg-white rounded-xl shadow-lg">
            {plansLoading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#012b2b] mx-auto"></div>
                <p className="mt-4 text-gray-600">Loading membership plans...</p>
              </div>
            ) : (
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="text-left p-4 font-bold text-gray-900 bg-gray-50 border-b border-gray-200 min-w-[200px]">
                      Benefits
                    </th>
                    {membershipPlans.map((plan, index) => (
                      <th key={plan.id} className={`text-center p-4 text-white font-bold border-b border-gray-200 min-w-[150px] ${getPlanHeaderColor(plan.name)}`}>
                        {plan.name.toUpperCase()}
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
                      {membershipPlans.map((plan, planIndex) => {
                        const planFeatures = formatPlanFeatures(plan);
                        return (
                          <td key={plan.id} className="p-4 text-center">
                            <span className={`font-semibold ${typeof planFeatures[featureIndex] === 'string' && planFeatures[featureIndex].includes('No')
                              ? 'text-red-600'
                              : 'text-gray-900'
                              }`}>
                              {planFeatures[featureIndex]}
                            </span>
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                  <tr className="bg-gray-50">
                    <td className="p-4 font-bold text-lg text-gray-900">
                      COST
                    </td>
                    {membershipPlans.map((plan, planIndex) => (
                      <td key={plan.id} className="p-4 text-center">
                        <div className="border border-solid border-gray-300 bg-white text-gray-900 py-2 px-4 rounded-lg font-bold text-lg inline-block">
                          ₹{plan.cost.toLocaleString()}
                        </div>
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-4"></td>
                    {membershipPlans.map((plan, planIndex) => (
                      <td key={plan.id} className="p-4 text-center">
                        <Button
                          onClick={() => handleChoosePlan(plan.id, plan.name)}
                          className={`rounded-full text-white ${plan.name.toLowerCase() === 'platinum'
                            ? "bg-orange-500 hover:bg-orange-600"
                            : plan.name.toLowerCase() === 'gold'
                              ? "bg-yellow-600 hover:bg-yellow-700"
                              : "bg-gray-500 hover:bg-gray-600"
                            }`}
                        >
                          Choose Plan
                        </Button>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            )}
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

      {/* Membership Selection Modal */}
      {showModal && selectedPlan && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className={`p-6 text-white ${getPlanHeaderColor(selectedPlan.name)}`}>
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">{selectedPlan.name.toUpperCase()} MEMBERSHIP</h2>
                <button
                  onClick={handleCloseModal}
                  className="text-white hover:text-gray-200 text-2xl"
                >
                  ×
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              {/* Plan Details */}
              <div className="mb-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Plan Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Duration:</span>
                      <span className="font-medium">{selectedPlan.durationYears} Years</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Max Members:</span>
                      <span className="font-medium">{selectedPlan.maxMembers}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Renewal Period:</span>
                      <span className="font-medium">{selectedPlan.renewalPeriodYears} Years</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Club Activities Discount:</span>
                      <span className="font-medium">{selectedPlan.discountClubActivities}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Dining Discount:</span>
                      <span className="font-medium">{selectedPlan.discountDining}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Spa Activities Discount:</span>
                      <span className="font-medium">{selectedPlan.discountSpaActivities}%</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Medical Wellness Discount:</span>
                      <span className="font-medium">{selectedPlan.discountMedicalWellness}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Reference Benefits:</span>
                      <span className="font-medium">{selectedPlan.referenceBenefits}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Guest Discount:</span>
                      <span className="font-medium">{selectedPlan.guestDiscount > 0 ? `${selectedPlan.guestDiscount}%` : 'No'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Yoga Guidance:</span>
                      <span className="font-medium">{selectedPlan.includesYogaGuidance ? 'Yes' : 'No'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Diet Chart:</span>
                      <span className="font-medium">{selectedPlan.includesDietChartFor > 0 ? `For ${selectedPlan.includesDietChartFor} people` : 'No'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Doctor Consultation:</span>
                      <span className="font-medium">{selectedPlan.includesDoctorConsultation ? 'Yes' : 'No'}</span>
                    </div>
                    {selectedPlan.panchkarmaWorth > 0 && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Free Panchkarma:</span>
                        <span className="font-medium">Worth ₹{selectedPlan.panchkarmaWorth.toLocaleString()}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Cost */}
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-gray-900">Total Cost:</span>
                    <span className="text-2xl font-bold text-[#012b2b]">₹{selectedPlan.cost.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Add Members Section */}
              <div className="mb-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  Add Members (Optional)
                  <span className="text-sm font-normal text-gray-600 ml-2">
                    - You can add up to {memberEmails.length} additional members
                  </span>
                </h3>
                <div className="space-y-3">
                  {memberEmails.map((email, index) => (
                    <div key={index}>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Member {index + 1} Email (Optional)
                      </label>
                      <Input
                        type="email"
                        value={email}
                        onChange={(e) => handleEmailChange(index, e.target.value.trim())}
                        placeholder="Enter email address"
                      />
                    </div>
                  ))}
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  Note: Members must have existing accounts on our platform.
                </p>
              </div>

              {/* Important Notices */}
              <div className="mb-6 space-y-4">
                {/* Cancellation and Refund Notice */}
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-0.5">
                      <svg className="w-5 h-5 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-amber-800 mb-1">Cancellation & Refund Policy</h4>
                      <p className="text-sm text-amber-700">
                        To cancel your membership or request a refund, please contact our admin team directly. 
                        Cancellation requests are processed on a case-by-case basis.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Member Account Warning */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-0.5">
                      <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-blue-800 mb-1">Important: Member Accounts Required</h4>
                      <p className="text-sm text-blue-700">
                        All members you add to your membership must have existing accounts on our platform. 
                        Please ensure all member emails are associated with registered accounts before proceeding.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <Button
                  className='flex-1 rounded-full'
                  onClick={handleCloseModal}
                  variant="outline"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleProceedToPurchase}
                  className={`flex-1 rounded-full text-white ${selectedPlan.name.toLowerCase() === 'platinum'
                    ? "bg-orange-500 hover:bg-orange-600"
                    : selectedPlan.name.toLowerCase() === 'gold'
                      ? "bg-yellow-600 hover:bg-yellow-700"
                      : "bg-gray-500 hover:bg-gray-600"
                    }`}
                >
                  Proceed to Purchase
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

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