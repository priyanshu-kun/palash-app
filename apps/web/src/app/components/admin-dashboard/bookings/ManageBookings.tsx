"use client"

import { useRef, useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card/Card"
import { SecondaryButton as Button } from "@/app/components/ui/buttons/index"
import { Input } from "@/app/components/ui/input/input"
import { Calendar, Clock, User, Filter, CheckCircle, XCircle, AlertCircle, Search, ChevronLeft, ChevronRight } from "lucide-react"


// Define the Booking interface
interface Booking {
  id: string
  serviceId: string
  serviceName: string
  clientName: string
  clientEmail: string
  clientPhone: string
  date: string
  time: string
  duration: string
  status: "confirmed" | "cancelled" | "pending" | "completed" | "no-show"
  notes?: string
  createdAt: string
}

export function BookingManagement() {
      const bottomRef = useRef<HTMLDivElement>(null);
  

  const [bookings, setBookings] = useState<Booking[]>([])
  const [filteredBookings, setFilteredBookings] = useState<Booking[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [dateFilter, setDateFilter] = useState<string>("")
  const [currentPage, setCurrentPage] = useState(1)
  const [detailsOpen, setDetailsOpen] = useState<string | null>(null)
  const itemsPerPage = 10

  // Fetch bookings (using dummy data for now)
  useEffect(() => {
    const fetchBookings = async () => {
      setIsLoading(true)
      
      try {
        // In a real app, this would be a fetch request
        // const response = await fetch('/api/admin/bookings')
        // const data = await response.json()
        
        // Simulating API delay
        await new Promise(resolve => setTimeout(resolve, 800))
        
        // Dummy booking data
        const dummyBookings: Booking[] = [
          {
            id: "b001",
            serviceId: "1",
            serviceName: "Yoga for Beginners",
            clientName: "Alex Johnson",
            clientEmail: "alex@example.com",
            clientPhone: "555-123-4567",
            date: "2025-02-26",
            time: "09:00",
            duration: "60 min",
            status: "confirmed",
            createdAt: "2025-02-24T14:30:00Z"
          },
          {
            id: "b002",
            serviceId: "3",
            serviceName: "Deep Tissue Massage",
            clientName: "Sarah Williams",
            clientEmail: "sarah@example.com",
            clientPhone: "555-222-3333",
            date: "2025-02-26",
            time: "11:00",
            duration: "90 min",
            status: "confirmed",
            notes: "Client mentioned shoulder pain, focus on upper back area",
            createdAt: "2025-02-23T10:15:00Z"
          },
          {
            id: "b003",
            serviceId: "2",
            serviceName: "Guided Meditation",
            clientName: "Michael Lee",
            clientEmail: "michael@example.com",
            clientPhone: "555-444-5555",
            date: "2025-02-25",
            time: "14:00",
            duration: "45 min",
            status: "completed",
            createdAt: "2025-02-20T09:45:00Z"
          },
          {
            id: "b004",
            serviceId: "5",
            serviceName: "Pilates Core Strengthening",
            clientName: "Emma Chen",
            clientEmail: "emma@example.com",
            clientPhone: "555-666-7777",
            date: "2025-02-27",
            time: "16:30",
            duration: "55 min",
            status: "pending",
            createdAt: "2025-02-24T16:20:00Z"
          },
          {
            id: "b005",
            serviceId: "4",
            serviceName: "Sound Bath Healing",
            clientName: "David Smith",
            clientEmail: "david@example.com",
            clientPhone: "555-888-9999",
            date: "2025-02-25",
            time: "18:00",
            duration: "60 min",
            status: "cancelled",
            notes: "Client cancelled due to illness",
            createdAt: "2025-02-22T11:30:00Z"
          },
          {
            id: "b006",
            serviceId: "6",
            serviceName: "Ayurvedic Consultation",
            clientName: "Jessica Roberts",
            clientEmail: "jessica@example.com",
            clientPhone: "555-111-2222",
            date: "2025-02-28",
            time: "10:00",
            duration: "75 min",
            status: "confirmed",
            createdAt: "2025-02-24T08:15:00Z"
          },
          {
            id: "b007",
            serviceId: "1",
            serviceName: "Yoga for Beginners",
            clientName: "Robert Garcia",
            clientEmail: "robert@example.com",
            clientPhone: "555-333-4444",
            date: "2025-02-24",
            time: "08:00",
            duration: "60 min",
            status: "no-show",
            notes: "Client did not show up for appointment",
            createdAt: "2025-02-20T13:40:00Z"
          },
          {
            id: "b008",
            serviceId: "3",
            serviceName: "Deep Tissue Massage",
            clientName: "Laura Martinez",
            clientEmail: "laura@example.com",
            clientPhone: "555-555-6666",
            date: "2025-02-27",
            time: "14:00",
            duration: "90 min",
            status: "confirmed",
            createdAt: "2025-02-23T15:10:00Z"
          },
          {
            id: "b009",
            serviceId: "2",
            serviceName: "Guided Meditation",
            clientName: "Thomas Wilson",
            clientEmail: "thomas@example.com",
            clientPhone: "555-777-8888",
            date: "2025-02-26",
            time: "16:00",
            duration: "45 min",
            status: "pending",
            createdAt: "2025-02-24T09:30:00Z"
          },
          {
            id: "b010",
            serviceId: "4",
            serviceName: "Sound Bath Healing",
            clientName: "Olivia Anderson",
            clientEmail: "olivia@example.com",
            clientPhone: "555-999-0000",
            date: "2025-02-28",
            time: "17:30",
            duration: "60 min",
            status: "confirmed",
            createdAt: "2025-02-24T11:20:00Z"
          },
          {
            id: "b011",
            serviceId: "5",
            serviceName: "Pilates Core Strengthening",
            clientName: "Nathan Brown",
            clientEmail: "nathan@example.com",
            clientPhone: "555-123-7890",
            date: "2025-02-25",
            time: "10:30",
            duration: "55 min",
            status: "completed",
            createdAt: "2025-02-21T14:15:00Z"
          },
          {
            id: "b012",
            serviceId: "6",
            serviceName: "Ayurvedic Consultation",
            clientName: "Sophia Kim",
            clientEmail: "sophia@example.com",
            clientPhone: "555-456-7890",
            date: "2025-02-29",
            time: "13:00",
            duration: "75 min",
            status: "confirmed",
            createdAt: "2025-02-24T10:05:00Z"
          }
        ]
        
        setBookings(dummyBookings)
        setFilteredBookings(dummyBookings)
      } catch (err) {
        setError("Failed to fetch bookings. Please try again later.")
        console.error("Error fetching bookings:", err)
      } finally {
        setIsLoading(false)
      }
    }
    
    fetchBookings()
  }, [])

  // Filter bookings when search term, status filter, or date filter changes
  useEffect(() => {
    let filtered = [...bookings]
    
    // Apply search term filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      filtered = filtered.filter(booking => 
        booking.clientName.toLowerCase().includes(term) ||
        booking.clientEmail.toLowerCase().includes(term) ||
        booking.clientPhone.includes(term) ||
        booking.serviceName.toLowerCase().includes(term) ||
        booking.id.toLowerCase().includes(term)
      )
    }
    
    // Apply status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter(booking => booking.status === statusFilter)
    }
    
    // Apply date filter
    if (dateFilter) {
      filtered = filtered.filter(booking => booking.date === dateFilter)
    }
    
    setFilteredBookings(filtered)
    setCurrentPage(1) // Reset to first page when filters change
  }, [searchTerm, statusFilter, dateFilter, bookings])

  // Get status badge styling and icon
  const getStatusBadge = (status: Booking["status"]) => {
    switch (status) {
      case "confirmed":
        return {
          icon: <CheckCircle size={16} className="mr-1" />,
          className: "bg-green-100 text-green-800 px-4 py-1 w-fit rounded-full text-xs font-medium flex items-center"
        }
      case "cancelled":
        return {
          icon: <XCircle size={16} className="mr-1" />,
          className: "bg-red-100 text-red-800 px-4 w-fit py-1 rounded-full text-xs font-medium flex items-center"
        }
      case "pending":
        return {
          icon: <AlertCircle size={16} className="mr-1" />,
          className: "bg-yellow-100 text-yellow-800 px-4 w-fit py-1 rounded-full text-xs font-medium flex items-center"
        }
      case "completed":
        return {
          icon: <CheckCircle size={16} className="mr-1" />,
          className: "bg-blue-100 text-blue-800 px-4 w-fit py-1 rounded-full text-xs font-medium flex items-center"
        }
      case "no-show":
        return {
          icon: <XCircle size={16} className="mr-1" />,
          className: "bg-gray-100 text-gray-800 px-4 w-fit py-1 rounded-full text-xs font-medium flex items-center"
        }
      default:
        return {
          icon: <AlertCircle size={16} className="mr-1" />,
          className: "bg-gray-100 text-gray-800 px-4 w-fit py-1 rounded-full text-xs font-medium flex items-center"
        }
    }
  }

  // Function to update booking status
  const updateBookingStatus = (id: string, newStatus: Booking["status"]) => {
    // In a real app, this would be an API call
    // await fetch(`/api/admin/bookings/${id}`, {
    //   method: 'PATCH',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ status: newStatus })
    // })
    
    // Update local state
    const updatedBookings = bookings.map(booking => 
      booking.id === id ? { ...booking, status: newStatus } : booking
    )
    
    setBookings(updatedBookings)
  }

  // Function to format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  // Pagination
  const totalPages = Math.ceil(filteredBookings.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedBookings = filteredBookings.slice(startIndex, startIndex + itemsPerPage)

  return (
    <div className="space-y-6" ref={bottomRef}>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Booking Management</h1>
        <div className="text-sm text-gray-500">
          Total: {filteredBookings.length} bookings
        </div>
      </div>

      {/* Filters and Search */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="relative">
          <Input
            type="text"
            placeholder="Search by name, email, phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-white"
          />
          <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
        
        <div className="relative">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full h-10 pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Statuses</option>
            <option value="confirmed">Confirmed</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
            <option value="no-show">No-show</option>
          </select>
          <Filter size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
        
        <div className="relative">
          <Input
            type="date"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="pl-10 bg-white"
          />
          <Calendar size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
      </div>

      {isLoading ? (
        <Card>
          <CardContent className="p-4">
            <div className="space-y-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="bg-gray-100 h-16 animate-pulse rounded"></div>
              ))}
            </div>
          </CardContent>
        </Card>
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
      ) : filteredBookings.length === 0 ? (
        <Card>
          <CardContent className="p-6 text-center">
            <p className="text-gray-500">No bookings found matching your criteria.</p>
          </CardContent>
        </Card>
      ) : (
        <>
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50 border-b">
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Booking ID</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {paginatedBookings.map(booking => (
                      <tr key={booking.id} 
                          className={`hover:bg-gray-50 ${detailsOpen === booking.id ? 'bg-blue-50' : ''}`}
                          onClick={() => setDetailsOpen(detailsOpen === booking.id ? null : booking.id)}>
                        <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {booking.id}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                          <div className="font-medium">{booking.clientName}</div>
                          <div className="text-xs">{booking.clientEmail}</div>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                          <div>{booking.serviceName}</div>
                          <div className="text-xs flex items-center">
                            <Clock size={12} className="mr-1" />
                            {booking.duration}
                          </div>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                          <div>{formatDate(booking.date)}</div>
                          <div className="text-xs">{booking.time}</div>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <span className={getStatusBadge(booking.status).className}>
                            {getStatusBadge(booking.status).icon}
                            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                          </span>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex justify-end space-x-2">
                            <Button 
                              className="px-4 border-gray-200 h-8 text-xs" 
                              onClick={(e) => {
                                e.stopPropagation();
                                setDetailsOpen(booking.id);
                                    window.scrollTo(0, document.body.scrollHeight);
                              }}
                            >
                              View
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <div  className="border border-gray-100 bg-gray-50  h-80 rounded-xl ">
 <Card className={`${detailsOpen ? 'opacity-100 pointer-events-auto': 'opacity-0 pointer-events-none'}`} >
              <CardHeader>
                <CardTitle className="text-lg">
                  Booking Details: {detailsOpen}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {(() => {
                  const booking = bookings.find(b => b.id === detailsOpen)
                  if (!booking) return <p>Booking not found</p>
                  
                  return (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <h3 className="text-sm font-medium text-gray-500">Client Information</h3>
                          <div className="mt-2 space-y-2">
                            <div className="flex items-start">
                              <User size={16} className="mt-0.5 mr-2 text-gray-400" />
                              <div>
                                <div className="font-medium">{booking.clientName}</div>
                                <div className="text-sm text-gray-500">{booking.clientEmail}</div>
                                <div className="text-sm text-gray-500">{booking.clientPhone}</div>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <h3 className="text-sm font-medium text-gray-500">Booking Notes</h3>
                          <p className="mt-1 text-sm text-gray-600">
                            {booking.notes || "No notes provided"}
                          </p>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div>
                          <h3 className="text-sm font-medium text-gray-500">Service Details</h3>
                          <div className="mt-2">
                            <div className="font-medium">{booking.serviceName}</div>
                            <div className="text-sm text-gray-500">Duration: {booking.duration}</div>
                            <div className="text-sm text-gray-500">
                              {formatDate(booking.date)} at {booking.time}
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <h3 className="text-sm font-medium text-gray-500">Booking Status</h3>
                          <div className="mt-2">
                            <span className={getStatusBadge(booking.status).className}>
                              {getStatusBadge(booking.status).icon}
                              {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                            </span>
                          </div>
                          
                          <div className="mt-4 grid grid-cols-2 gap-2">
                            {booking.status !== "confirmed" && (
                              <Button 
                                className="text-xs border-gray-200"
                                onClick={() => updateBookingStatus(booking.id, "confirmed")}
                              >
                                Mark as Confirmed
                              </Button>
                            )}
                            {booking.status !== "completed" && (
                              <Button 
                                className="text-xs border-gray-200 bg-blue-100 hover:bg-blue-200"
                                onClick={() => updateBookingStatus(booking.id, "completed")}
                              >
                                Mark as Completed
                              </Button>
                            )}
                            {booking.status !== "cancelled" && (
                              <Button 
                                className="text-xs border-gray-200 bg-red-100 hover:bg-red-200"
                                onClick={() => updateBookingStatus(booking.id, "cancelled")}
                              >
                                Cancel Booking
                              </Button>
                            )}
                            {booking.status !== "no-show" && booking.status !== "cancelled" && (
                              <Button 
                                className="text-xs border-gray-200 bg-gray-100 hover:bg-gray-200"
                                onClick={() => updateBookingStatus(booking.id, "no-show")}
                              >
                                Mark as No-Show
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })()}
              </CardContent>
            </Card>
          </div> 

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-between items-center mt-32">
              <div className="text-sm text-gray-500">
                Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredBookings.length)} of {filteredBookings.length} bookings
              </div>
              <div className="flex space-x-2">
                <Button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  className="p-2 h-8 w-8 flex items-center justify-center disabled:opacity-50"
                >
                  <ChevronLeft size={16} />
                </Button>
                <span className="flex items-center text-sm">
                  {currentPage} of {totalPages}
                </span>
                <Button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  className="p-2 h-8 w-8 flex items-center justify-center disabled:opacity-50"
                >
                  <ChevronRight size={16} />
                </Button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}