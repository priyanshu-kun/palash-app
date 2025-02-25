import type React from "react"
import { Sidebar } from "../components/layout/Sidebar"
// import { Sidebar } from "@/components/layout/sidebar"
// import { Navbar } from "@/components/layout/navbar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
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

