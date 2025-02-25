import { Request, Response, NextFunction } from "express";
import { CreateBookingInput } from "../../@types/interfaces.js";
import BookingService from "../../services/bookings/bookings.service.js";


class BookingController {
    async createBooking(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const bookingServiceInstance = new BookingService();
            const result = await bookingServiceInstance.createBooking(req.body);
            return res.status(201).json(result);
        }
        catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    }
    async fetchBookings(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const { userId, serviceId } = req.params;
            const bookingServiceInstance = new BookingService();
            const bookings = await bookingServiceInstance.fetchBookings(userId, serviceId);
            return res.status(201).json(bookings);
        }
        catch (err) {
            return res.status(500).json(err);
        }
    }
    async fetchBookingById(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const { bookingId } = req.params;
            const bookingServiceInstance = new BookingService();
            const booking = await bookingServiceInstance.fetchBookingById(bookingId);
            return res.status(201).json(booking);
        }
        catch (err) {
            return res.status(500).json(err);
        }
    }
    async fetchAvailableDatesForService(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const { serviceId } = req.params;
            let { startDate, endDate }: {startDate: string; endDate: string;} = req.body;
            const bookingServiceInstance = new BookingService();
            const dates = await bookingServiceInstance.fetchAvailableDates({serviceId, startDate, endDate});
            return res.status(201).json(dates);
        }
        catch (err) {
            return res.status(500).json(err);
        }
    }
}

export default BookingController;