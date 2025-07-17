import { Request, Response, NextFunction } from "express";
import { CreateBookingInput } from "../../@types/interfaces.js";
import BookingService from "../../services/bookings/bookings.service.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { ValidationError, NotFoundError } from "../../utils/errors.js";

class BookingController {
    private bookingServiceInstance: BookingService;

    constructor() {
        this.bookingServiceInstance = new BookingService();
    }

    createBooking = asyncHandler(async (req: Request, res: Response) => {
        const bookingData: CreateBookingInput = req.body;

        if (!bookingData.userId || !bookingData.serviceId || !bookingData.date || !bookingData.timeSlot || !bookingData.paymentId || !bookingData.email) {
            throw new ValidationError('User ID, service ID, date, time slot, payment ID and email are required');
        }


        const result = await this.bookingServiceInstance.createBooking(bookingData);

        return res.status(201).json(result);
    });

    fetchBookings = asyncHandler(async (req: Request, res: Response) => {
        const bookings = await this.bookingServiceInstance.fetchBookings();
        
        if (!bookings || bookings.length === 0) {
            throw new NotFoundError('No bookings found for this user and service');
        }

        return res.json(bookings);
    });

    fetchBookingById = asyncHandler(async (req: Request, res: Response) => {
        const { id } = req.params;
        
        if (!id) {
            throw new ValidationError('Booking ID is required');
        }

        const booking = await this.bookingServiceInstance.fetchBookingById(id);
        
        if (!booking) {
            throw new NotFoundError(`Booking with ID ${id} not found`);
        }

        return res.json(booking);
    });

    /**
     * Fetch available dates and their time slots for a service
     * @returns Array of dates with their available time slots
     */
    fetchAvailableDatesForService = asyncHandler(async (req: Request, res: Response) => {
        const { serviceId } = req.params;
        const { startDate, endDate }: {startDate: string; endDate: string;} = req.body;
        
        if (!serviceId || !startDate || !endDate) {
            throw new ValidationError('Service ID, start date and end date are required');
        }

        if (startDate > endDate) {
            throw new ValidationError('Start date must be before end date');
        }

        const availabilityWithTimeSlots = await this.bookingServiceInstance.fetchAvailableDates({
            serviceId,
            startDate,
            endDate
        });

        // Transform the response to a more client-friendly format
        const formattedResponse = availabilityWithTimeSlots.map((availability: any) => ({
            date: availability.date,
            isBookable: availability.is_bookable,
            timeSlots: availability.time_slots.map((slot: any) => ({
                id: slot.id,
                startTime: slot.start_time,
                endTime: slot.end_time,
                status: slot.status
            }))
        }));

        return res.json(formattedResponse);
    });

    fetchBookingsByUserId = asyncHandler(async (req: Request, res: Response) => {
        const { userId } = req.params;
        
        if (!userId) {
            throw new ValidationError('User ID is required');
        }   

        const bookings = await this.bookingServiceInstance.fetchBookingsByUserId(userId);
        return res.json(bookings);
    }); 
    

    cancelBooking = asyncHandler(async (req: Request, res: Response) => {
        const { id, userId } = req.params;
        
        if (!id || !userId) {
            throw new ValidationError('Booking ID and user ID are required');
        }

        const result = await this.bookingServiceInstance.cancelBooking(id, userId);
        return res.status(200).json(result);
    });     
}

export default BookingController;