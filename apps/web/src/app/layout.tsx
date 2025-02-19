import type React from "react"
import Navbar from "@/app/components/layout/Navbar"
import { Inter } from "next/font/google"
import "./globals.css"
import Footer from "./components/layout/Footer"

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}

