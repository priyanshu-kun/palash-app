"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { PrimaryButton, SecondaryButton } from "@/app/components/ui/buttons/index";
import { Input } from "@/app/components/ui/input/input";
import { Label } from "@/app/components/ui/label/index";
import { useDispatch, useSelector } from "react-redux";
import { signInFailure, signInStart, signInSuccess, signUpFailure, signUpStart, signUpSuccess } from "@/app/features/auth/auth-slice";
import { signUpUser } from "@/app/api/auth"
import { saveTokens } from "@/app/utils/save-token";
import { LoadingScreen } from "@/app/components/ui/loader/loading";
import { Loader2 } from "lucide-react";
import { useToast } from "@/app/components/ui/toast/use-toast";
import { ToastProvider } from "@/app/components/ui/toast/toast";
import { Checkbox } from "@/app/components/ui/checkbox/checkbox";
export function SignUpForm() {
  const router = useRouter()
  const {isLoading, error} = useSelector((state: any) => state.authReducer);  
  const dispatch = useDispatch()  
  const { toast } = useToast();

  const initialState = {
    name: "",
    username: "",
    emailOrPhone: "",
    dob: "",
    is_agreed_to_terms: false,
  } 
  const [formData, setFormData] = useState(initialState)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault()
      // Validate email/phone
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const phoneRegex = /^[6-9]\d{9}$/;

      if(phoneRegex.test(formData.emailOrPhone)) {
        toast({
          title: "Invalid Input",
          description: "Currently we only support email sign up",
          variant: "destructive"
        })
        return;
      }

      if(!formData.is_agreed_to_terms) {
        toast({
          title: "Invalid Input",
          description: "Please agree to the terms and conditions",
          variant: "destructive"
        })
      }

      if (!emailRegex.test(formData.emailOrPhone) && !phoneRegex.test(formData.emailOrPhone)) {
        toast({
          title: "Invalid Input",
          description: "Please enter a valid email address or phone number",
          variant: "destructive"
        })
        return;
      }

      // Validate date of birth
      const dobDate = new Date(formData.dob);
      const today = new Date();
      const minAge = 13; // Minimum age requirement
      
      let age = today.getFullYear() - dobDate.getFullYear();
      const monthDiff = today.getMonth() - dobDate.getMonth();
      
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dobDate.getDate())) {
        age--;
      }


      if (isNaN(dobDate.getTime())) {
        toast({
          title: "Invalid Input",
          description: "Please enter a valid date of birth",
          variant: "destructive"
        })
        return;
      }

      if (dobDate > today) {
        toast({
          title: "Invalid Input",
          description: "Date of birth cannot be in the future",
          variant: "destructive"
        })
        return;
      }

      if (age < minAge) {
        toast({
          title: "Invalid Input",
          description: `You must be at least ${minAge} years old to sign up`,
          variant: "destructive"
        })
        return;
      }
      e.preventDefault()
      console.log(formData);
      dispatch(signUpStart())
      await signUpUser(formData);
      toast({
        title: "OTP Sent",
        description: "Please check your inbox or spam folder.",
        variant: "default"
      })
      dispatch(signUpSuccess(formData.emailOrPhone))
      router.push("/verify?type=signup")
    }
    catch(err: any) {
      toast({
        title: "Error",
        description: err.response.data.message,
        variant: "destructive"
      })
      dispatch(signUpFailure(err.response.data.message))
    }
  }


  if(error) {
    return <div className="flex flex-col items-center justify-center ">
      <p className="text-red-500 text-center text-sm">{error}</p> 
      <button className="text-blue-500 hover:underline mt-5" onClick={() => dispatch(signInFailure(""))}>Try again</button>
    </div>
  } 

  return (
    <div className="space-y-6">
      <ToastProvider />
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Enter your name</Label>
          <Input 
            id="name" 
            name="name" 
            placeholder="eg. John Doe" 
            required 
            onChange={handleChange} 
            value={formData.name}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="username">Choose a username</Label>
          <Input 
            id="username" 
            name="username" 
            placeholder="eg. johndoe" 
            required 
            onChange={handleChange}
            value={formData.username}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="emailOrPhone">Enter your email or phone</Label>
          <Input 
            id="emailOrPhone" 
            name="emailOrPhone" 
            type="text" 
            placeholder="eg. johndoe@gmail.com or (+91)" 
            required 
            onChange={handleChange}
            value={formData.emailOrPhone}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="dob">Enter your date of birth</Label>
          <Input 
            id="dob" 
            name="dob" 
            type="date" 
            required 
            onChange={handleChange}
            value={formData.dob}
          />
        </div>
        <div className="mt-2 flex items-center gap-2 pl-4">
          <Checkbox 
            id="is_agreed_to_terms" 
            name="is_agreed_to_terms" 
            required 
            checked={formData.is_agreed_to_terms}
            onCheckedChange={(checked) => setFormData({ ...formData, is_agreed_to_terms: Boolean(checked) })}
            className="w-4 h-4"
          />
          <Label htmlFor="is_agreed_to_terms"><Link href="/terms-and-conditions" className="text-orange-500 hover:underline">I agree to the <span className="text-orange-500">Terms & Conditions</span></Link></Label>
        </div>
        <PrimaryButton 
          type="submit" 
          isLoading={isLoading}
          loadingText="Signing up..."
          className="w-full py-6"
          disabled={formData.name === "" || formData.username === "" || formData.emailOrPhone === "" || formData.dob === ""}
        >
          Sign Up
        </PrimaryButton>
        <SecondaryButton 
          onClick={() => router.push("/")} 
          className="w-full py-6" 
          type="button"
        >
          Back to Site
        </SecondaryButton>
        <p className="text-sm text-muted-foreground text-center">
          Already have an account?{" "}
          <Link href="/sign-in" className="text-orange-500 hover:underline">
            Sign in
          </Link>
        </p>
      </form>
    </div>
  )
}