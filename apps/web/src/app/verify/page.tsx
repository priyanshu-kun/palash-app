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
    return null
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
      dispatch(verifySignInOTPFailure(err.message));
    }
  }

  return (
    <main className="min-h-screen w-full flex items-center justify-center  bg-[#f0f4f1] p-4 md:p-6">
      <ToastProvider />
      <div className="mx-auto w-full max-w-md space-y-6 ">
        <div className="text-center">
          <div className="relative mx-auto mb-6 h-12 w-32">
            <Image
              src={Logo}
              alt="PALASH"
              className="object-contain"
            />
          </div>
        </div>
        <div className="space-y-2">
          <p className="text-sm text-gray-500 ml-4">Enter the OTP sent to your email or phone</p>  
          <div className="flex items-center justify-center">
            <InputOTP maxLength={4} value={otp}  onChange={(value) => setOtp(value)}>
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
              </InputOTPGroup>
            </InputOTP>
          </div>
        </div>
        <PrimaryButton type="submit" isLoading={isLoading} loadingText="Confirming OTP..." onClick={() => handleSubmit()} className="w-full py-6  bg-teal-900 text-white hover:bg-teal-800">
          Confirm OTP
        </PrimaryButton>
        <Link href="/" className="w-full py-2 text-orange-400 underline block text-center">Back to Site</Link>
      </div>
    </main>
  )
}

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyContent />
    </Suspense>
  );
}


