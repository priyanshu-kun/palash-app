
"use client"
// pages/dashboard/bookings/index.tsx
import React, { useState } from 'react';
// import { BookingTable, Booking } from '../../../components/bookings/BookingTable';
import { SecondaryButton as Button } from '@/app/components/ui/buttons/index';
import { BookingManagement } from '@/app/components/admin-dashboard/bookings/ManageBookings';


export type Booking = {
  id: string;
  customerName: string;
  serviceName: string;
  date: string;
  time: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  amount: number;
};

// Sample data
const sampleBookings: Booking[] = [
  {
    id: '1001',
    customerName: 'John Doe',
    serviceName: 'Website Development',
    date: '2025-02-20',
    time: '10:00 AM',
    status: 'confirmed',
    amount: 1500,
  },
  {
    id: '1002',
    customerName: 'Jane Smith',
    serviceName: 'Mobile App Development',
    date: '2025-02-22',
    time: '2:30 PM',
    status: 'pending',
    amount: 3000,
  },
  {
    id: '1003',
    customerName: 'Bob Johnson',
    serviceName: 'UI/UX Design',
    date: '2025-02-18',
    time: '9:15 AM',
    status: 'completed',
    amount: 800,
  },
  {
    id: '1004',
    customerName: 'Alice Williams',
    serviceName: 'Website Development',
    date: '2025-02-25',
    time: '3:00 PM',
    status: 'cancelled',
    amount: 1500,
  },
];

const BookingsPage: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>(sampleBookings);

  const handleEditBooking = (id: string) => {
    // In a real app, you'd implement the edit functionality
    console.log(`Edit booking with id: ${id}`);
  };

  const handleCancelBooking = (id: string) => {
    setBookings(
      bookings.map((booking) =>
        booking.id === id ? { ...booking, status: 'cancelled' as const } : booking
      )
    );
  };

  return (
    <div className='p-12'>
        <BookingManagement />
    </div>
  );
};

export default BookingsPage;