import { Router, Request, Response, NextFunction } from "express";
import BookingController from "../../controllers/bookings/bookings.controller.js";
import { authMiddleware, authorizeRoles } from "../../middlewares/auth.middleware.js";
const BookingRouter =  Router();

const bookingInstance = new BookingController();

BookingRouter.get('/fetch-booking/:id', bookingInstance.fetchBookingById);
BookingRouter.get('/fetch-booking-by-user/:userId', bookingInstance.fetchBookingsByUserId); 
BookingRouter.post("/availability/:serviceId", bookingInstance.fetchAvailableDatesForService);
BookingRouter.post("/create-booking", bookingInstance.createBooking);
BookingRouter.get("/cancel-booking/:id/:userId", bookingInstance.cancelBooking);

BookingRouter.use(authorizeRoles(['ADMIN']));
BookingRouter.get('/fetch-bookings', bookingInstance.fetchBookings);

export default BookingRouter;