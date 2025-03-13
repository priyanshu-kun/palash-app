import { CreateBookingInput } from "../../@types/interfaces.js";
import { withTransaction, prisma } from "@palash/db-client";

class BookingService {
    async createBooking(bookingData: CreateBookingInput): Promise<any> {
        try {
            return await withTransaction(async (tx: any) => {
                const { serviceId, userId, date }: CreateBookingInput = bookingData;

                const service = await tx.service.findUnique({
                    where: {
                        id: serviceId
                    }
                })

                const availability = await tx.availability.findUnique({
                    where: {
                        serviceId_date: {
                            service_id: serviceId,
                            date: new Date(date),
                        },
                    },
                });

                if (!availability || !availability.isBookable) {
                    throw new Error('This day is not available for booking');
                }

                const booking = await tx.booking.create({
                    data: {
                        user_id: userId,
                        service_id: serviceId,
                        date: new Date(date),
                        total_amount: service.price,
                    },
                });

                const updatedBooking = await tx.booking.update({
                    where: { id: booking.id },
                    data: {
                        payment_status: true ? 'PAID' : 'FAILED',
                        status: true ? 'CONFIRMED' : 'PENDING',
                        payment_intentId: 'paymentResult.paymentIntentId',
                    },
                });

                // >> Send confirmation email

                return updatedBooking;

            })
        }
        catch (err: any) {
            console.log(err);
            throw new Error(err);
        }
    }

    async fetchBookings(serviceId: string, userId: string): Promise<any> {
        try {
            return await prisma.booking.findMany({
                where: {
                    user_id: userId,
                    service_id: serviceId
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

    async fetchAvailableDates(data: {serviceId: string; startDate: string; endDate: string;}): Promise<any> {
        try {
            const { serviceId, startDate, endDate } = data;

            return await prisma.availability.findMany({
                where: {
                    service_id: serviceId,
                    date: {
                        gte: new Date(startDate as string),
                        lte: new Date(endDate as string),
                    },
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
}

export default BookingService;