import { Router, Request, Response, NextFunction } from "express";
import BookingController from "../../controllers/bookings/bookings.controller.js";
const BookingRouter =  Router();

const bookingInstance = new BookingController();

BookingRouter.get('/fetch-bookings', bookingInstance.fetchBookings);
BookingRouter.get('/fetch-booking/:id', bookingInstance.fetchBookingById);
BookingRouter.get("/availability/:serviceId", bookingInstance.checkAvailableDatesForService);
BookingRouter.post("/create-booking", bookingInstance.createBooking);

export default BookingRouter;