"use client"
import { getBookings } from "@/app/api/booking";
import { DropdownMenuItem } from "@/app/components/ui/dropdown/dropdown-menu";
import { DropdownMenuContent } from "@/app/components/ui/dropdown/dropdown-menu";
import { DropdownMenu, DropdownMenuTrigger } from "@/app/components/ui/dropdown/dropdown-menu";
import { Input } from "@/app/components/ui/input/input";
import { ToastProvider } from "@/app/components/ui/toast/toast";
import { Loader2, Search, SlidersHorizontal, Eye, Clock, Calendar, CircleCheck, X, Currency, CreditCardIcon } from "lucide-react";
import { Badge } from "@/app/components/badge/badge";
import { useToast } from "@/app/components/ui/toast/use-toast";
import { useAuth } from "@/app/hooks/useAuth";
import { useEffect, useState } from "react";
import { SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select/select";
import { Select } from "@/app/components/ui/select/select";
import { BookingDetailModal } from "@/app/components/admin-dashboard/booking-modal/booking";
import {
  Table,
  TableRow,
  TableHeader,
  TableHead,
  TableBody,
  TableCell
} from "@/app/components/ui/table/table";
import { PrimaryButton as Button } from "@/app/components/ui/buttons/PrimaryButton";
import { formatDate } from "date-fns";
export default function Page() {
  const { user, loading } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [paymentFilter, setPaymentFilter] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<any>(null);


  const { toast } = useToast();
  useEffect(() => {
    if (user) {
      toast({
        variant: "default",
        title: "Manage Bookings",
        description: "Manage all bookings in the system",
      });
    }
  }, [user]);

  const [bookings, setBookings] = useState<any[]>([]);
  const [bookingsLoading, setBookingsLoading] = useState(false);

  const getServiceName = (serviceId: string) => {
    const service = bookings.find((booking) => booking.service_id === serviceId);
    return service?.name || "N/A";
  }

  useEffect(() => {
    setBookingsLoading(true);
    getBookings().then((data) => {
      setBookings(data);
      setBookingsLoading(false);
    });
  }, []);

  console.log(bookings);

  return (
    <div className="container mx-auto py-10 space-y-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Booking Management</h1>
        <p className="text-muted-foreground mt-2">
          Manage and monitor all bookings in the system.
        </p>
      </div>
      <ToastProvider />

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Search users..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex flex-wrap gap-2">

          <Select value={statusFilter || ""} onValueChange={(value) => setStatusFilter(value || null)}>
            <SelectTrigger className="w-[140px] bg-white">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="CONFIRMED">Confirmed</SelectItem>
              <SelectItem value="PENDING">Pending</SelectItem>
              <SelectItem value="CANCELLED">Cancelled</SelectItem>
              <SelectItem value="COMPLETED">Completed</SelectItem>
            </SelectContent>
          </Select>

          <Select value={paymentFilter || ""} onValueChange={(value) => setPaymentFilter(value || null)}>
            <SelectTrigger className="w-[140px] bg-white">
              <SelectValue placeholder="Payment" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Payments</SelectItem>
              <SelectItem value="PAID">Paid</SelectItem>
              <SelectItem value="FAILED">Failed</SelectItem>
            </SelectContent>
          </Select>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="rounded-lg bg-white flex items-center justify-center border border-solid border-gray-300  p-2">
                <SlidersHorizontal className="h-4 w-4" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setSearchQuery("")}>
                Clear all filters
              </DropdownMenuItem>
              <DropdownMenuItem>Export to CSV</DropdownMenuItem>
              <DropdownMenuItem>Bulk actions</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        
      </div>

<div className="rounded-xl border bg-white shadow-sm">
          <div className="overflow-x-auto">
            <div className="w-full">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Booking ID</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>Service</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Payment</TableHead>
                    <TableHead>Total Amount</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {bookingsLoading ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center">
                        <Loader2 className="h-4 w-4 animate-spin" />
                      </TableCell>
                    </TableRow>
                  ) : bookings.length > 0 ? bookings.map((booking) => (
                    <TableRow key={booking.id}>
                      <TableCell>{booking.id.slice(0, 8)}...</TableCell>
                      <TableCell className="text-gray-500">{booking.user?.name || "N/A"}</TableCell>
                      <TableCell className="text-gray-500">{booking.service?.name.length > 20 ? booking.service?.name.slice(0, 20)+"..." : booking.service?.name || "N/A"}</TableCell>
                      <td className="px-6 py-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5 text-gray-400" />
                        {formatDate(booking.date, "dd MMM yyyy")}
                      </div>
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <Clock className="h-3 w-3 text-gray-400" />
                        {booking.time_slot}
                      </div>
                    </td>
                      <TableCell>
                        <Badge className="px-3" variant={booking.status === "CONFIRMED" ? "default" : booking.status === "PENDING" ? "secondary" : booking.status === "CANCELLED" ? "destructive" : "outline"}>
                          {
                            booking.status === "CONFIRMED" ? <CircleCheck className="h-3 w-3 text-black" /> : booking.status === "PENDING" ? <Clock className="h-3 w-3 text-gray-400" /> : booking.status === "CANCELLED" ? <X className="h-3 w-3 text-gray-400" /> : null
                          }
                          {booking.status}
                          </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className="px-3" variant={booking.payment_status === "PAID" ? "default" : booking.payment_status === "FAILED" ? "destructive" : "outline"}>
                          {
                            booking.payment_status === "PAID" ? <CircleCheck className="h-3 w-3 text-black" /> : booking.payment_status === "FAILED" ? <X className="h-3 w-3 text-gray-400" /> : null
                          }
                          {booking.payment_status}
                          </Badge>
                      </TableCell>
                      <TableCell className="flex  items-center gap-1">
                        <CreditCardIcon className="h-3 w-3 mt-2 text-gray-400" />
                        <span className="text-gray-500 mt-2">₹{booking.total_amount}</span>
                      </TableCell>
                      <TableCell>
                        <Button className="bg-transparent rounded-xl hover:bg-gray-100 border border-solid border-gray-300 text-gray-500" onClick={() => {
                          setSelectedBooking(booking);
                          setIsModalOpen(true);
                        }}>
                          <Eye className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  )) : (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center">No bookings found</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>

        <BookingDetailModal
        isOpen={isModalOpen}
        booking={selectedBooking}
        onClose={() => setIsModalOpen(false)}
        getServiceName={getServiceName}
      />
    </div>
  )
}

/**
 * [
    {
        "id": "4e4f06f5-7255-4725-aa85-89ffe08e7378",
        "user_id": "c8a36f59-12d1-424e-8816-041c6981efda",
        "service_id": "44bdeb03-e3f4-4d7a-99ab-08c9e6dbaa85",
        "date": "2025-04-21T00:00:00.000Z",
        "time_slot": "11:00 AM",
        "invoice_id": null,
        "status": "CONFIRMED",
        "payment_status": "PAID",
        "payment_intent_id": "pay_QLi0jo4rKolsKn",
        "total_amount": "1000",
        "created_at": "2025-04-22T13:07:08.189Z",
        "updated_at": "2025-04-22T13:07:08.189Z"
    }
]
 */