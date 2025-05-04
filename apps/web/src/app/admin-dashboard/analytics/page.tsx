'use client';

import { Card } from "@/app/components/ui/card/Card";
import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
} from "chart.js";
import { CalendarDays, DollarSign, Users, XCircle } from "lucide-react";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  PointElement
);

// Sample data - Replace with actual data from your backend
const bookingData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      label: "Bookings",
      data: [65, 78, 90, 85, 95, 100],
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};

const revenueData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      label: "Revenue",
      data: [4500, 5200, 6000, 5800, 6500, 7000],
      borderColor: "rgb(75, 192, 192)",
      tension: 0.1,
    },
  ],
};

export default function Analytics() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold mb-8">Analytics Dashboard</h1>
      
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-blue-100 rounded-full">
              <CalendarDays className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Bookings</p>
              <h3 className="text-2xl font-bold">513</h3>
              <p className="text-sm text-green-500">+12% from last month</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-green-100 rounded-full">
              <DollarSign className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Revenue</p>
              <h3 className="text-2xl font-bold">$35,000</h3>
              <p className="text-sm text-green-500">+8% from last month</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-purple-100 rounded-full">
              <Users className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Active Users</p>
              <h3 className="text-2xl font-bold">1,234</h3>
              <p className="text-sm text-green-500">+15% from last month</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-red-100 rounded-full">
              <XCircle className="h-6 w-6 text-red-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Cancellations</p>
              <h3 className="text-2xl font-bold">23</h3>
              <p className="text-sm text-red-500">-5% from last month</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-4">Booking Trends</h3>
          <Bar
            data={bookingData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: "top" as const,
                },
                title: {
                  display: false,
                },
              },
            }}
          />
        </Card>

        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-4">Revenue Trends</h3>
          <Line
            data={revenueData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: "top" as const,
                },
                title: {
                  display: false,
                },
              },
            }}
          />
        </Card>
      </div>

      {/* Additional Statistics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-4">Popular Services</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span>Massage Therapy</span>
              <span className="font-semibold">32%</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Yoga Sessions</span>
              <span className="font-semibold">28%</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Meditation</span>
              <span className="font-semibold">25%</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Wellness Consultation</span>
              <span className="font-semibold">15%</span>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-4">Customer Satisfaction</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span>5 Stars</span>
              <span className="font-semibold">65%</span>
            </div>
            <div className="flex justify-between items-center">
              <span>4 Stars</span>
              <span className="font-semibold">25%</span>
            </div>
            <div className="flex justify-between items-center">
              <span>3 Stars</span>
              <span className="font-semibold">8%</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Below 3 Stars</span>
              <span className="font-semibold">2%</span>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-4">Peak Hours</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span>Morning (6-10 AM)</span>
              <span className="font-semibold">35%</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Afternoon (11-3 PM)</span>
              <span className="font-semibold">25%</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Evening (4-8 PM)</span>
              <span className="font-semibold">30%</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Night (After 8 PM)</span>
              <span className="font-semibold">10%</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
