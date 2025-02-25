"use client"

import { useEffect, useState } from "react"
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react"
import type { AvailableDate } from "@/app/@types/interface"
import { SecondaryButton as Button } from "@/app/components/ui/buttons/index";

interface BookingCalendarProps {
  onDateSelect: (date: string) => void
}

export function BookingCalendar({ onDateSelect }: BookingCalendarProps) {
  const [availability, setAvailability] = useState<any>([])




  const [loading, setLoading] = useState(true)
  const [currentMonth, setCurrentMonth] = useState(new Date())

const getRandomBool = () => Math.random() < 0.5;

const generateMonthData = (year: any, month: any) => {
  const totalDays = new Date(year, month + 1, 0).getDate();
  const data = [];

  for (let day = 1; day <= totalDays; day++) {
    const dateObj = new Date(year, month, day);
    data.push({
      date: dateObj.toISOString().split("T")[0],
      available: getRandomBool(),
    });
  }

  return data;
};




  useEffect(() => {
    const fetchAvailability = async () => {
      try {
            const today = new Date();
            const currentMonthData = generateMonthData(today.getFullYear(), today.getMonth());
            setAvailability(currentMonthData)
      } catch (error) {
        console.error("Failed to fetch availability:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchAvailability()
  }, [])

  const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate()

  const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay()

  const monthName = currentMonth.toLocaleString("default", { month: "long" })
  const year = currentMonth.getFullYear()

  const previousMonth = () => {
    setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() - 1)))
  }

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() + 1)))
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    )
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <Button variant="ghost" size="icon" onClick={previousMonth} className="border-gray-200">
          <ChevronLeft className="w-4 h-4" />
        </Button>
        <h2 className="text-xl font-semibold">
          {monthName} {year}
        </h2>
        <Button variant="ghost" size="icon" onClick={nextMonth} className="border-gray-200">
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>

      <div className="grid grid-cols-7 gap-2 mb-2">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="text-center text-sm font-medium">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2">
        {Array.from({ length: firstDayOfMonth }).map((_, index) => (
          <div key={`empty-${index}`} />
        ))}

        {Array.from({ length: daysInMonth }).map((_, index) => {
          const day = index + 1
          const dateStr = `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(
            2,
            "0",
          )}-${String(day).padStart(2, "0")}`
          const dateAvailability = availability.find((a: any) => a.date === dateStr)
          const isAvailable = dateAvailability?.available

          return (
            <Button
              key={day}
              variant={isAvailable ? "outline" : "ghost"}
              className={`h-12 ${
                isAvailable ? "hover:bg-primary hover:text-primary-foreground" : "opacity-50 cursor-not-allowed border-none"
              } border-gray-300 rounded-lg`}
              disabled={!isAvailable}
              onClick={() => isAvailable && onDateSelect(dateStr)}
            >
              {day}
            </Button>
          )
        })}
      </div>
    </div>
  )
}

