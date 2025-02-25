"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/app/components/ui/card/Card"
import { PrimaryButton as Button } from "@/app/components/ui/buttons/index"
import Link from "next/link"
import { Edit, Trash2, Plus, Clock } from "lucide-react"

// Define the Service interface
interface Service {
  id: string
  name: string
  price: number
  description: string
  images: string[]
  duration?: string
  createdAt: string
}

export function ServiceList() {
  const [services, setServices] = useState<Service[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch services (using dummy data for now)
  useEffect(() => {
    const fetchServices = async () => {
      setIsLoading(true)
      
      try {
        // In a real app, this would be a fetch request
        // const response = await fetch('/api/services')
        // const data = await response.json()
        
        // Simulating API delay
        await new Promise(resolve => setTimeout(resolve, 800))
        
        // Dummy wellness services data with Pexels images
        const dummyServices: Service[] = [
          {
            id: "1",
            name: "Yoga for Beginners",
            price: 45,
            duration: "60 min",
            description: "A gentle introduction to basic yoga poses and breathing techniques, perfect for newcomers seeking balance and flexibility.",
            images: [
              "https://images.pexels.com/photos/3822864/pexels-photo-3822864.jpeg?auto=compress&cs=tinysrgb&w=600",
              "https://images.pexels.com/photos/4056723/pexels-photo-4056723.jpeg?auto=compress&cs=tinysrgb&w=600"
            ],
            createdAt: "2025-02-15T10:30:00Z"
          },
          {
            id: "2",
            name: "Guided Meditation",
            price: 35,
            duration: "45 min",
            description: "Calm your mind and reduce stress with our guided meditation sessions, designed to help you find inner peace and mental clarity.",
            images: [
              "https://images.pexels.com/photos/3759657/pexels-photo-3759657.jpeg?auto=compress&cs=tinysrgb&w=600"
            ],
            createdAt: "2025-02-10T14:20:00Z"
          },
          {
            id: "3",
            name: "Deep Tissue Massage",
            price: 85,
            duration: "90 min",
            description: "Relieve chronic muscle tension with this therapeutic massage that focuses on the deepest layers of muscle tissue, tendons, and fascia.",
            images: [
              "https://images.pexels.com/photos/3865548/pexels-photo-3865548.jpeg?auto=compress&cs=tinysrgb&w=600",
              "https://images.pexels.com/photos/5240677/pexels-photo-5240677.jpeg?auto=compress&cs=tinysrgb&w=600",
              "https://images.pexels.com/photos/6663358/pexels-photo-6663358.jpeg?auto=compress&cs=tinysrgb&w=600"
            ],
            createdAt: "2025-02-05T09:15:00Z"
          },
          {
            id: "4",
            name: "Sound Bath Healing",
            price: 55,
            duration: "60 min",
            description: "Experience deep relaxation through resonant sounds of crystal bowls and gongs, helping to reduce anxiety and promote wellness.",
            images: [
              "https://images.pexels.com/photos/8964915/pexels-photo-8964915.jpeg?auto=compress&cs=tinysrgb&w=600"
            ],
            createdAt: "2025-01-28T16:45:00Z"
          },
          {
            id: "5",
            name: "Pilates Core Strengthening",
            price: 50,
            duration: "55 min",
            description: "Build core stability, improve posture, and enhance body awareness through controlled movements and breathing techniques.",
            images: [
              "https://images.pexels.com/photos/4057840/pexels-photo-4057840.jpeg?auto=compress&cs=tinysrgb&w=600",
              "https://images.pexels.com/photos/6111616/pexels-photo-6111616.jpeg?auto=compress&cs=tinysrgb&w=600"
            ],
            createdAt: "2025-02-01T11:20:00Z"
          },
          {
            id: "6",
            name: "Ayurvedic Consultation",
            price: 120,
            duration: "75 min",
            description: "Personalized wellness assessment based on ancient Ayurvedic principles, with customized recommendations for diet, lifestyle, and herbs.",
            images: [
              "https://images.pexels.com/photos/3735810/pexels-photo-3735810.jpeg?auto=compress&cs=tinysrgb&w=600"
            ],
            createdAt: "2025-01-15T10:00:00Z"
          }
        ]
        
        setServices(dummyServices)
      } catch (err) {
        setError("Failed to fetch wellness services. Please try again later.")
        console.error("Error fetching services:", err)
      } finally {
        setIsLoading(false)
      }
    }
    
    fetchServices()
  }, [])

  // Function to delete a service (would connect to API in a real app)
  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this service?")) {
      // In a real app, this would be a DELETE request
      // await fetch(`/api/services/${id}`, { method: 'DELETE' })
      
      // Optimistically update UI
      setServices(services.filter(service => service.id !== id))
    }
  }

  // Format price as currency
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price)
  }

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric', 
      month: 'long', 
      day: 'numeric'
    })
  }

  return (
    <div className="space-y-6">
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map(i => (
            <Card key={i} className="opacity-70">
              <div className="h-48 bg-gray-200 animate-pulse rounded-t-lg"></div>
              <CardContent className="p-4 space-y-4">
                <div className="h-6 bg-gray-200 animate-pulse rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 animate-pulse rounded w-1/4"></div>
                <div className="h-16 bg-gray-200 animate-pulse rounded"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : error ? (
        <Card>
          <CardContent className="p-6 text-center">
            <p className="text-red-500">{error}</p>
            <Button 
              className="mt-4"
              onClick={() => window.location.reload()}
            >
              Try Again
            </Button>
          </CardContent>
        </Card>
      ) : services.length === 0 ? (
        <Card>
          <CardContent className="p-6 text-center">
            <p className="text-gray-500 mb-4">No wellness services found. Create your first service to get started.</p>
            <Link href="/services/new" passHref>
              <Button className="flex items-center gap-2">
                <Plus size={16} />
                <span>Add Service</span>
              </Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map(service => (
            <Card key={service.id} className="overflow-hidden flex flex-col h-full hover:shadow-lg transition-shadow duration-300">
              {/* Image Gallery (showing only first image for simplicity) */}
              {service.images.length > 0 && (
                <div className="relative h-52 bg-gray-100">
                  <img 
                    src={service.images[0]} 
                    alt={service.name} 
                    className="w-full h-full object-cover"
                  />
                  {service.images.length > 1 && (
                    <span className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded-full">
                      +{service.images.length - 1} more
                    </span>
                  )}
                </div>
              )}
              
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-xl">{service.name}</CardTitle>
                  <span className="font-bold text-green-600">{formatPrice(service.price)}</span>
                </div>
                {service.duration && (
                  <div className="flex items-center text-gray-500 mt-1 text-sm">
                    <Clock size={14} className="mr-1" />
                    <span>{service.duration}</span>
                  </div>
                )}
              </CardHeader>
              
              <CardContent className="pb-2 flex-grow">
                <p className="text-gray-600 text-sm line-clamp-3">{service.description}</p>
                <p className="text-gray-400 text-xs mt-2">Added on {formatDate(service.createdAt)}</p>
              </CardContent>
              
              <CardFooter className="flex justify-between pt-2 mt-auto">
                <Link 
                  href={`/services/${service.id}`} 
                  className="text-blue-500 hover:text-blue-700 text-sm"
                >
                  View Details
                </Link>
                {/* <div className="flex gap-2">
                  <Link href={`/services/${service.id}/edit`} passHref>
                    <Button 
                      className="p-2 h-8 w-8 flex items-center justify-center"
                      aria-label={`Edit ${service.name}`}
                    >
                      <Edit size={16} />
                    </Button>
                  </Link>
                  <Button 
                    className="p-2 h-8 w-8 flex items-center justify-center bg-red-500 hover:bg-red-600"
                    onClick={() => handleDelete(service.id)}
                    aria-label={`Delete ${service.name}`}
                  >
                    <Trash2 size={16} />
                  </Button>
                </div> */}
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}