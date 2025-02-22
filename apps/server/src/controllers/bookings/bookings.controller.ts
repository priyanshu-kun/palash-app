import {Request, Response, NextFunction} from "express";
import { CreateBookingInput } from "../../@types/interfaces.js";
import BookingService from "../../services/bookings/bookings.service.js";


class BookingController {
    async createBooking(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const bookingServiceInstance = new BookingService();
            const booking = await bookingServiceInstance.createBooking(req.body);
            return res.status(201).json(booking);
        }
        catch(err) {
            console.log(err);
            return res.status(500).json(err);
        }
    }
    async fetchBookings(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {

        }
        catch(err) {
            return res.status(500).json(err);
        }
    }
    async fetchBookingById(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {

        }
        catch(err) {
            return res.status(500).json(err);
        }
    }
    async checkAvailableDatesForService(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {

        }
        catch(err) {
            return res.status(500).json(err);
        }
    }
}

export default BookingController;