"use client"
import type React from "react"
import { Sidebar } from "../components/layout/Sidebar"
import { useAuth } from "../hooks/useAuth"
import { redirect } from "next/navigation"
// import { Sidebar } from "@/components/layout/sidebar"
// import { Navbar } from "@/components/layout/navbar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user, loading } = useAuth()


  // // Show nothing while checking authentication
  if (loading) {
    return null
  }

  // Redirect if not authenticated
  if (!user) {
    redirect("/sign-in")
  }

  if (user?.role !== "ADMIN") {
    redirect("/")
  }

  return (
    <div className="h-full relative">
      <div className="hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 z-[80] bg-primary_button">
        <Sidebar />
      </div>
      <main className="md:pl-72">
        {children}
      </main>
    </div>
  )
}

