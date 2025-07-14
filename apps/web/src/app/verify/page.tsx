"use client"
import Image from "next/image"
import Logo from "@/app/assets/logo-light.png";
import { PrimaryButton, SecondaryButton } from "../components/ui/buttons/index";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/app/components/ui/input-otp/input-otp";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import {  verifyOTP } from "../api/auth";
import { useDispatch, useSelector } from "react-redux";
import { verifySignInOTPStart, verifySignInOTPSuccess, verifySignInOTPFailure } from "../features/auth/auth-slice";
import { toast, useToast } from "@/app/components/ui/toast/use-toast";
import { ToastProvider } from "@/app/components/ui/toast/toast";
import { useAuth } from "../hooks/useAuth";
import { redirect } from "next/navigation";
import { Suspense } from "react";

function VerifyContent() {
  const router = useRouter();
  const [otp, setOtp] = useState("");
  const {isLoading, error, phoneOrEmail} = useSelector((state: any) => state.authReducer);
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const type = searchParams.get("type");
  const { user, loading } = useAuth();

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

  const handleSubmit = async () => {
    try {
      if (!otp) {
        toast({
          title: "Invalid Input",
          description: "Please enter OTP",
          variant: "destructive"
        })
        dispatch(verifySignInOTPFailure("Please enter OTP"));
        return;
      }

      if (otp.length !== 4) {
        toast({
          title: "Invalid Input",
          description: "OTP must be 4 digits",
          variant: "destructive"
        })
        dispatch(verifySignInOTPFailure("OTP must be 4 digits"));
        return;
      }

      if (!/^\d+$/.test(otp)) {
        toast({
          title: "Invalid Input",
          description: "OTP must contain only numbers",
          variant: "destructive"
        })
        dispatch(verifySignInOTPFailure("OTP must contain only numbers"));
        return;
      }
      dispatch(verifySignInOTPStart());
      const response = await verifyOTP({type, otp, phoneOrEmail});
      dispatch(verifySignInOTPSuccess({accessToken: response.accessToken, refreshToken: response.refreshToken, user: response.user}));
      router.push("/");
    }
    catch(err: any) {
      toast({
        title: "Error",
        description: err.message,
        variant: "destructive"
      })
      router.push('/sign-in')
      dispatch(verifySignInOTPFailure(err.message));
    }
  }

  return (
    <main className="min-h-screen w-full flex items-center justify-center bg-[#f0f4f1] p-3 sm:p-4 md:p-6">
      <ToastProvider />
      
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23059669' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px'
        }}></div>
      </div>
      
      <div className="mx-auto w-full max-w-sm sm:max-w-md space-y-6 sm:space-y-8 relative z-10">
        {/* Header Section */}
        <div className="text-center">
          <div className="relative mx-auto mb-6 sm:mb-8 h-10 w-24 sm:h-12 sm:w-32">
            <Image
              src={Logo}
              alt="PALASH"
              className="object-contain filter drop-shadow-lg"
              fill
            />
          </div>
          
          <div className="mb-6 sm:mb-8">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-2 sm:mb-3">
              Verify Your Account
            </h1>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              We've sent a verification code to your {type === 'email' ? 'email' : 'phone'}
            </p>
            {phoneOrEmail && (
              <p className="text-xs sm:text-sm text-gray-500 mt-1 font-medium">
                {phoneOrEmail}
              </p>
            )}
          </div>
        </div>
        
        {/* OTP Input Section */}
        <div className="space-y-4 sm:space-y-6">
          <div className="text-center">
            <p className="text-sm sm:text-base text-gray-700 mb-4 sm:mb-6 font-medium">
              Enter 4-digit verification code
            </p>
            
            <div className="flex items-center justify-center">
              <InputOTP 
                maxLength={4} 
                value={otp}  
                onChange={(value) => setOtp(value)}
                className="gap-2 sm:gap-3"
              >
                <InputOTPGroup className="gap-2 sm:gap-3">
                  <InputOTPSlot 
                    index={0} 
                    className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 text-lg sm:text-xl md:text-2xl font-bold border-2 rounded-lg sm:rounded-xl focus:border-teal-600 focus:ring-2 focus:ring-teal-200"
                  />
                  <InputOTPSlot 
                    index={1} 
                    className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 text-lg sm:text-xl md:text-2xl font-bold border-2 rounded-lg sm:rounded-xl focus:border-teal-600 focus:ring-2 focus:ring-teal-200"
                  />
                  <InputOTPSlot 
                    index={2} 
                    className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 text-lg sm:text-xl md:text-2xl font-bold border-2 rounded-lg sm:rounded-xl focus:border-teal-600 focus:ring-2 focus:ring-teal-200"
                  />
                  <InputOTPSlot 
                    index={3} 
                    className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 text-lg sm:text-xl md:text-2xl font-bold border-2 rounded-lg sm:rounded-xl focus:border-teal-600 focus:ring-2 focus:ring-teal-200"
                  />
                </InputOTPGroup>
              </InputOTP>
            </div>
          </div>
          
          {/* Submit Button */}
          <PrimaryButton 
            type="submit" 
            isLoading={isLoading} 
            loadingText="Verifying..." 
            onClick={() => handleSubmit()} 
            className="w-full py-3 sm:py-4 md:py-6 text-sm sm:text-base md:text-lg bg-teal-900 text-white hover:bg-teal-800 rounded-lg sm:rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            Verify Code
          </PrimaryButton>
        </div>
        
        {/* Footer Section */}
        <div className="text-center space-y-3 sm:space-y-4 pt-4 sm:pt-6 border-t border-gray-200">
          <p className="text-xs sm:text-sm text-gray-500">
            Didn't receive the code?
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4">
            {/* <button 
              onClick={() => {
                // Add resend functionality here
                toast({
                  title: "Code Resent",
                  description: "A new verification code has been sent",
                  variant: "default"
                })
              }}
              className="text-sm sm:text-base text-teal-600 hover:text-teal-700 font-medium underline transition-colors"
            >
              Resend Code
            </button> */}
            
            {/* <span className="hidden sm:inline text-gray-400">|</span> */}
            
            <Link 
              href="/sign-in" 
              className="text-sm sm:text-base text-gray-600 hover:text-gray-800 font-medium underline transition-colors"
            >
              Back to Sign In
            </Link>
          </div>
          
          <Link 
            href="/" 
            className="inline-block text-xs sm:text-sm text-orange-500 hover:text-orange-600 underline font-medium transition-colors mt-3 sm:mt-4"
          >
            ← Back to Homepage
          </Link>
        </div>
        
        {/* Help Text */}
        <div className="text-center bg-gray-50 rounded-lg sm:rounded-xl p-3 sm:p-4">
          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
            <span className="font-medium">Need help?</span> The verification code expires in 10 minutes. 
            Make sure to check your spam folder if you don't see the email.
          </p>
        </div>
      </div>
    </main>
  )
}

export default function Page() {
  return (
    <Suspense fallback={
      <div className="min-h-screen w-full flex items-center justify-center bg-[#f0f4f1]">
        <div className="animate-spin rounded-full h-16 w-16 sm:h-24 sm:w-24 lg:h-32 lg:w-32 border-b-2 border-green-600"></div>
      </div>
    }>
      <VerifyContent />
    </Suspense>
  );
}


