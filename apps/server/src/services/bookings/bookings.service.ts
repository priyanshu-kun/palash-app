import { CreateBookingInput } from "../../@types/interfaces.js";
import { withTransaction, prisma, NotificationType } from "@palash/db-client";
import NotificationService from "../notification/notification.service.js";
import { ValidationError } from "../../utils/errors.js";
import { sendBookingConfirmationAndInvoice } from "../../adapters/mailer.adapter.js";

class BookingService {
    async createBooking(bookingData: CreateBookingInput): Promise<any> {
        return await withTransaction(async (tx: any) => {
            const { serviceId, userId, date, timeSlot, paymentId, email }: CreateBookingInput = bookingData;

            const service = await tx.service.findUnique({
                where: {
                    id: serviceId
                }
            })

            if (!service) {
                throw new ValidationError('Service not found');
            }

            const user = await tx.user.findUnique({
                where: {
                    id: userId
                }
            })

            if (!user) {
                throw new ValidationError('User not found');
            }

            const isAlreadyBooked = await tx.booking.findFirst({
                where: {
                    service_id: serviceId,
                    user_id: userId,
                }
            })

            if (isAlreadyBooked) {
                throw new ValidationError('You have already booked this service');
            }

            const booking = await tx.booking.create({
                data: {
                    user_id: userId,
                    service_id: serviceId,
                    total_amount: service.price,
                    date: new Date(date),
                    time_slot: timeSlot,
                    payment_status: 'PAID',
                    status: 'CONFIRMED',
                    payment_intent_id: paymentId
                },
            });

            const payment = await tx.payment.findFirst({
                where: {
                    payment_id: paymentId,
                    user_id: userId,
                }
            })

            if (!payment) {
                throw new ValidationError('Payment not found');
            }

            await tx.payment.update({
                where: {
                    id: payment.id
                },
                data: {
                    booking_id: booking.id
                }
            })
            // >> Send confirmation email
            await sendBookingConfirmationAndInvoice({
                phoneOrEmail: email,
                booking: { ...booking, service: service, user: user, payment: payment, time_slot: timeSlot, date: new Date(date) }
            });

            await NotificationService.getInstance().createNotification({
                userId: userId,
                type: NotificationType.BOOKING_CREATED,
                title: "Booking Created",
                message: "A new booking has been created",
                data: { bookingId: booking.id }
            });

            return booking;

        })

    }

    async fetchBookings(): Promise<any> {
        try {
            // The include option tells Prisma to fetch the related user and service records
            // for each booking. Setting them to true means include all fields from those relations.
            // This is similar to a JOIN in SQL
            return await prisma.booking.findMany({
                include: {
                    user: true, // Includes all fields from the related user record
                    service: true // Includes all fields from the related service record
                }
            });
        }
        catch (err: any) {
            throw new Error(err);
        }
    }


    async fetchBookingById(bookingId: string): Promise<any> {
        try {
            return await prisma.booking.findUnique({
                where: {
                    id: bookingId
                }
            })
        }
        catch (err: any) {
            throw new Error(err);
        }
    }

    async fetchAvailableDates(data: { serviceId: string; startDate: string; endDate: string; }): Promise<any> {
        try {
            const { serviceId, startDate, endDate } = data;

            return await prisma.availability.findMany({
                where: {
                    service_id: serviceId,
                    date: {
                        gte: new Date(startDate as string),
                        lte: new Date(endDate as string),
                    },
                    is_bookable: true, // Only fetch bookable dates
                },
                include: {
                    time_slots: {
                        where: {
                            status: 'AVAILABLE' // Only fetch available time slots
                        },
                        orderBy: {
                            start_time: 'asc'
                        }
                    }
                },
                orderBy: {
                    date: 'asc',
                },
            });
        }
        catch (err: any) {
            throw new Error(err);
        }
    }

    async fetchBookingsByUserId(userId: string): Promise<any> {
        try {
            return await prisma.booking.findMany({
                where: { user_id: userId }
            });
        }
        catch (err: any) {
            throw new Error(err);
        }
    }

    async cancelBooking(bookingId: string, userId: string): Promise<any> {
        try {
            return await prisma.booking.update({
                where: { id: bookingId, user_id: userId },
                data: {
                    status: 'CANCELLED',
                },
            });
        }
        catch (err: any) {
            throw new Error(err);
        }
    }
}

export default BookingService;