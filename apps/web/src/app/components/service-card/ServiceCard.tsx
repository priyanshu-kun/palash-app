"use client"

import Image from "next/image"
import { useState } from "react"
import { Star } from "lucide-react"
import type { Service } from "@/app/@types/interface"
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card/Card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/app/components/ui/dialog/Dialog"
import { PrimaryButton as Button } from "@/app/components/ui/buttons/index";
import { BookingCalendar } from "@/app/components/calander/Calander"

interface ServiceCardProps {
  service: Service
}

export function ServiceCard({ service }: ServiceCardProps) {
  const [showDetails, setShowDetails] = useState(false)
  const [showBooking, setShowBooking] = useState(false)

  const averageRating = service.reviews.reduce((acc, review) => acc + review.rating, 0) / service.reviews.length

  return (
    <>
      <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setShowDetails(true)}>
        <CardHeader className="p-0">
          <div className="relative w-full h-48">
            <Image
              src={service.image || "/placeholder.svg"}
              alt={service.name}
              fill
              className="object-cover rounded-t-xl "
            />
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <CardTitle className="mb-2">{service.name}</CardTitle>
          <div className="flex items-center gap-2 mb-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.round(averageRating) ? "fill-primary text-primary" : "fill-muted text-muted-foreground"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">({service.reviews.length} reviews)</span>
          </div>
          <p className="text-xl font-bold">${service.price}</p>
        </CardContent>
      </Card>

      <Dialog open={showDetails} onOpenChange={setShowDetails}>
        <DialogContent className="max-w-2xl bg-white">
          <DialogHeader>
            <DialogTitle className="text-2xl">{service.name}</DialogTitle>
          </DialogHeader>
          <div className="relative w-full h-64 mt-4">
            <Image
              src={service.image || "/placeholder.svg"}
              alt={service.name}
              fill
              className="object-cover rounded-lg"
            />
          </div>
          <div className="mt-4">
            <p className="text-lg mb-4">{service.description}</p>
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.round(averageRating) ? "fill-primary text-primary" : "fill-muted text-muted-foreground"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-muted-foreground">({service.reviews.length} reviews)</span>
              </div>
              <p className="text-2xl font-bold">${service.price}</p>
            </div>
            <Button
              className="w-full"
              size="lg"
              onClick={() => {
                setShowDetails(false)
                setShowBooking(true)
              }}
            >
              Book Now
            </Button>
          </div>
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-4">Reviews</h3>
            <div className="space-y-4">
              {service.reviews.map((review) => (
                <div key={review.id} className="border-b pb-4">
                  <div className="flex justify-between mb-2">
                    <p className="font-medium">{review.name}</p>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < review.rating ? "fill-primary text-primary" : "fill-muted text-muted-foreground"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-muted-foreground">{review.comment}</p>
                  <p className="text-sm text-muted-foreground mt-1">{new Date(review.date).toLocaleDateString()}</p>
                </div>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showBooking} onOpenChange={setShowBooking}>
        <DialogContent className="bg-white">
          <DialogHeader>
            <DialogTitle>Book {service.name}</DialogTitle>
          </DialogHeader>
          <BookingCalendar
            onDateSelect={(date) => {
              console.log("Selected date:", date)
              setShowBooking(false)
            }}
          />
        </DialogContent>
      </Dialog>
    </>
  )
}

