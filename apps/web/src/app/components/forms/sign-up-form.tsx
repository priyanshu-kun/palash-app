"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { PrimaryButton } from "@/app/components/ui/buttons/index";
import { Input } from "@/app/components/ui/input/input";
import { Label } from "@/app/components/ui/label/index";
import { LoadingSpinner } from "@/app/components/forms/loading";

export function SignUpForm() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      router.push("/verify")
    }, 2000)
  }

  if (isLoading) {
    return <LoadingSpinner />
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight text-gray-900">Sign Up</h1>
        <p className="text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link href="/sign-in" className="text-orange-500 hover:underline">
            Sign in
          </Link>
        </p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" placeholder="Enter your name" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="username">Username</Label>
          <Input id="username" placeholder="Choose a username" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Phone/Email</Label>
          <Input id="email" type="email" placeholder="Enter email or phone" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="dob">Date of Birth</Label>
          <Input id="dob" type="date" required />
        </div>
        <PrimaryButton type="submit" className="w-full bg-teal-900 text-white hover:bg-teal-800">
          Sign Up
        </PrimaryButton>
      </form>
    </div>
  )
}

