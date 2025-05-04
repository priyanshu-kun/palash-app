"use client"

import { useState } from "react"
import { MapPin } from "lucide-react"
import { Card, CardContent } from "@/app/components/ui/card/Card"
import { PrimaryButton as Button } from "@/app/components/ui/buttons/PrimaryButton"

interface LocationPickerProps {
  onLocationSelect: (location: {
    address: string
    city: string
    state: string
    country: string
    postalCode: string
    coordinates: {
      latitude: number
      longitude: number
    }
  }) => void
}

export function LocationPicker({ onLocationSelect }: LocationPickerProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const getCurrentLocation = () => {
    setIsLoading(true)
    setError(null)

    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser")
      setIsLoading(false)
      return
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords

          // In a real app, you would use a geocoding service to get the address
          // For this demo, we'll simulate a response

          // Simulate API call delay
          await new Promise((resolve) => setTimeout(resolve, 1000))

          // Mock response
          const mockLocation = {
            address: "123 Main Street",
            city: "San Francisco",
            state: "CA",
            country: "USA",
            postalCode: "94105",
            coordinates: {
              latitude,
              longitude,
            },
          }

          onLocationSelect(mockLocation)
        } catch (err) {
          setError("Failed to get location details")
          console.error(err)
        } finally {
          setIsLoading(false)
        }
      },
      (err) => {
        setError(`Error getting location: ${err.message}`)
        setIsLoading(false)
      },
    )
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100">
            <MapPin className="h-6 w-6 text-emerald-600" />
          </div>
          <div className="space-y-1">
            <h3 className="font-medium">Set Service Location</h3>
            <p className="text-sm text-gray-500">
              Use your current location or manually enter the address details below
            </p>
          </div>
          <Button
            type="button"
            onClick={getCurrentLocation}
            disabled={isLoading}
            className="w-full max-w-xs"
          >
            {isLoading ? "Getting location..." : "Use Current Location"}
          </Button>
          {error && <p className="text-xs text-red-500">{error}</p>}
        </div>
      </CardContent>
    </Card>
  )
}
