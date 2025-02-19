"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { PrimaryButton, SecondaryButton } from "@/app/components/ui/buttons/index";
import { Input } from "@/app/components/ui/input/input";
import { Label } from "@/app/components/ui/label/index";
import { LoadingSpinner } from "@/app/components/forms/loading";

export function SignInForm() {
  const [email, setEmail] = useState("")
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
        <h1 className="text-2xl font-semibold tracking-tight text-primary_button">Sign In</h1>
        <p className="text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link href="/sign-up" className="text-orange-500 hover:underline">
            Create now
          </Link>
        </p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">phone/Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="phone or pmail"
            value={email}
            onChange={(e: any) => setEmail(e.target.value)}
            required
          />
        </div>
        <PrimaryButton type="submit" className="w-full bg-teal-900 text-white hover:bg-teal-800">
         Submit 
        </PrimaryButton>
      </form>
    </div>
  )
}