"use client"

import { useState } from 'react'
import { format, addDays, isSameDay, parseISO } from 'date-fns'

interface TimeSlot {
  id: string
  startTime: string
  endTime: string
  status: 'AVAILABLE' | 'BOOKED' | 'BLOCKED'
}

interface AvailabilityDate {
  date: string
  isBookable: boolean
  timeSlots: TimeSlot[]
}

interface BookingCalendarProps {
  availability: AvailabilityDate[]
  onSelectTimeSlot: (date: Date, timeSlot: string) => void
  selectedDate: Date | null
  selectedTimeSlot: string | null
}

export function BookingCalendar({
  availability,
  onSelectTimeSlot,
  selectedDate,
  selectedTimeSlot,
}: BookingCalendarProps) {
  const [currentWeekStart, setCurrentWeekStart] = useState<Date>(new Date())

  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(currentWeekStart, i))

  const getAvailableTimeSlotsForDate = (date: Date): TimeSlot[] => {
    const availabilityForDate = availability?.find((d) => isSameDay(parseISO(d.date), date))
    return availabilityForDate?.isBookable ? availabilityForDate.timeSlots.filter(slot => slot.status === 'AVAILABLE') : []
  }

  const formatTimeSlot = (timeSlot: TimeSlot): string => {
    // Extract hours and minutes from the time string (assuming format "1970-01-01THH:mm:00.003Z")
    const startTime = new Date(timeSlot.startTime)
    const hours = startTime.getUTCHours()
    const minutes = startTime.getUTCMinutes()
    
    // Format in 12-hour format
    const period = hours >= 12 ? 'PM' : 'AM'
    const formattedHours = hours % 12 || 12
    const formattedMinutes = minutes.toString().padStart(2, '0')
    
    return `${formattedHours}:${formattedMinutes} ${period}`
  }

  return (
    <div className="space-y-4">
      {/* Calendar Navigation */}
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={() => setCurrentWeekStart(addDays(currentWeekStart, -7))}
          className="p-2 hover:bg-gray-100 rounded-lg text-sm"
        >
          Previous Week
        </button>
        <span className="font-medium text-xs text-gray-500">
          {format(currentWeekStart, 'MMM d')} - {format(addDays(currentWeekStart, 6), 'MMM d, yyyy')}
        </span>
        <button
          onClick={() => setCurrentWeekStart(addDays(currentWeekStart, 7))}
          className="p-2 hover:bg-gray-100 rounded-lg text-sm"
        >
          Next Week
        </button>
      </div>

      {/* Calendar Days */}
      <div className="grid grid-cols-7 gap-2">
        {weekDays.map((date) => {
          const availableSlots = getAvailableTimeSlotsForDate(date)
          const isAvailable = availableSlots.length > 0
          
          return (
            <button
              key={date.toISOString()}
              onClick={() => {
                if (isAvailable) {
                  onSelectTimeSlot(date, '')
                }
              }}
              disabled={!isAvailable}
              className={`p-3 rounded-lg text-center flex flex-col items-center justify-center ${
                selectedDate && isSameDay(date, selectedDate)
                  ? 'bg-[#517d64] text-white'
                  : isAvailable
                  ? 'hover:bg-gray-100 border border-solid border-[#517d64]/20'
                  : 'bg-gray-50 text-gray-400 cursor-not-allowed pointer-events-none border border-dashed border-[#517d64]/20'
              }`}
            >
              <div className="text-sm">{format(date, 'EEE')}</div>
              <div className="font-medium text-sm">{format(date, 'd')}</div>
            </button>
          )
        })}
      </div>

      {/* Time Slots */}
      {selectedDate && (
        <div className="">
          <h3 className="font-sm text-sm mb-2 mt-8 text-[#517d64]">Available Time Slots</h3>
          <div className="grid grid-cols-3 gap-2">
            {getAvailableTimeSlotsForDate(selectedDate).map((timeSlot) => {
              const formattedTime = formatTimeSlot(timeSlot)
              return (
                <button
                  key={timeSlot.id}
                  onClick={() => onSelectTimeSlot(selectedDate, formattedTime)}
                  className={`p-2 rounded-lg text-center text-sm border border-solid border-[#517d64]/20 ${
                    selectedTimeSlot === formattedTime
                      ? 'bg-[#517d64] text-white'
                      : 'hover:bg-gray-100'
                  }`}
                >
                  {formattedTime}
                </button>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
} 