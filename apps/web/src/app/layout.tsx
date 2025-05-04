'use client'

import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Provider } from "react-redux"
import { store } from "./store"
import { Toaster } from "@/app/components/ui/toast/toaster"
// import LoadingScreen from "./Loading"

const inter = Inter({ subsets: ["latin"] })

// export const metadata: Metadata = {
//   title: "Palash Wellness",
//   description: "Your path to wellness",
// }

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="bg-[#f0f4f1]">
      <body className={inter.className}>
        <Provider store={store}>  
          {children}
        </Provider>
        <Toaster />
      </body>
    </html>
  )
}

