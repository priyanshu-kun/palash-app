import { CreateBookingInput } from "../../@types/interfaces.js";
import { withTransaction } from "@palash/db-client";

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
                            serviceId: serviceId,
                            date: new Date(date),
                        },
                    },
                });

                if (!availability || !availability.isBookable) {
                    throw new Error('This day is not available for booking');
                }

                const booking = await tx.booking.create({
                    data: {
                        userId: userId,
                        serviceId: serviceId,
                        date: new Date(date),
                        totalAmount: service.price,
                    },
                });

                // 5. Process payment (dummy implementation)

                // 6. Update booking with payment info
                const updatedBooking = await tx.booking.update({
                    where: { id: booking.id },
                    data: {
                        paymentStatus: true ? 'PAID' : 'FAILED',
                        status: true ? 'CONFIRMED' : 'PENDING',
                        paymentIntentId: 'paymentResult.paymentIntentId',
                    },
                });

                // 7. Send confirmation email

                return updatedBooking;

            })
        }
        catch (err: any) {
            console.log(err);
            throw new Error(err);
        }
    }
}

export default BookingService;