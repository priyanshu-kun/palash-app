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
        
        if (!bookingData.userId || !bookingData.serviceId || !bookingData.date) {
            throw new ValidationError('User ID, service ID and date are required');
        }

        const result = await this.bookingServiceInstance.createBooking(bookingData);
        return res.status(201).json(result);
    });

    fetchBookings = asyncHandler(async (req: Request, res: Response) => {
        const { userId, serviceId } = req.params;
        
        if (!userId || !serviceId) {
            throw new ValidationError('User ID and service ID are required');
        }

        const bookings = await this.bookingServiceInstance.fetchBookings(userId, serviceId);
        
        if (!bookings || bookings.length === 0) {
            throw new NotFoundError('No bookings found for this user and service');
        }

        return res.json(bookings);
    });

    fetchBookingById = asyncHandler(async (req: Request, res: Response) => {
        const { bookingId } = req.params;
        
        if (!bookingId) {
            throw new ValidationError('Booking ID is required');
        }

        const booking = await this.bookingServiceInstance.fetchBookingById(bookingId);
        
        if (!booking) {
            throw new NotFoundError(`Booking with ID ${bookingId} not found`);
        }

        return res.json(booking);
    });

    fetchAvailableDatesForService = asyncHandler(async (req: Request, res: Response) => {
        const { serviceId } = req.params;
        const { startDate, endDate }: {startDate: string; endDate: string;} = req.body;
        
        if (!serviceId || !startDate || !endDate) {
            throw new ValidationError('Service ID, start date and end date are required');
        }

        const dates = await this.bookingServiceInstance.fetchAvailableDates({
            serviceId,
            startDate,
            endDate
        });

        return res.json(dates);
    });
}

export default BookingController;