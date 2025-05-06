import { Request, Response, NextFunction } from "express";
import { prisma, withTransaction } from "@palash/db-client";
import { ICreateInBulkAvailablityInput, ITimeSlot } from "../../@types/interfaces.js";

class BookingManagementController {
    async createAvailablityDatesInBulk(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const { serviceId } = req.params;
            const { dates, isBookable, timeSlots }: ICreateInBulkAvailablityInput = req.body;

            await withTransaction(async (tx: any) => {
                const results = await Promise.all(
                    dates.map(async date => {
                        // Create or update availability
                        const availability = await tx.availability.upsert({
                            where: {
                                service_id_date: {
                                    service_id: serviceId,
                                    date: new Date(date),
                                },
                            },
                            update: {
                                isBookable,
                            },
                            create: {
                                serviceId,
                                date: new Date(date),
                                isBookable,
                            },
                        });

                        // Create time slots for this availability
                        const timeSlotPromises = timeSlots.map((slot: ITimeSlot) => {
                            const [startHour, startMinute] = slot.startTime.split(':');
                            const [endHour, endMinute] = slot.endTime.split(':');
                            
                            // Convert IST to UTC by subtracting 5 hours and 30 minutes
                            const startTime = new Date();
                            startTime.setHours(parseInt(startHour) - 5, parseInt(startMinute) - 30, 0);
                            
                            const endTime = new Date();
                            endTime.setHours(parseInt(endHour) - 5, parseInt(endMinute) - 30, 0);

                            return tx.timeSlot.create({
                                data: {
                                    availability_id: availability.id,
                                    start_time: startTime,
                                    end_time: endTime,
                                    status: 'AVAILABLE'
                                }
                            });
                        });

                        const createdTimeSlots = await Promise.all(timeSlotPromises);
                        return {
                            ...availability,
                            timeSlots: createdTimeSlots
                        };
                    })
                );
                return res.json(results);
            });
        }
        catch (err) {
            console.error('Error creating availability:', err);
            return res.status(500).json({ error: 'Failed to update availability' });
        }
    }
    async updateAvailablityForSpecificDate(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const { serviceId, date } = req.params;
            const { isBookable } = req.body;

            const availability = await prisma.availability.upsert({
                where: {
                    service_id_date: {
                        service_id: serviceId,
                        date: new Date(date),
                    },
                },
                update: {
                    is_bookable: isBookable,
                },
                create: {
                    service_id: serviceId,
                    date: new Date(date),
                    is_bookable: isBookable,
                },
            });

            return res.json(availability);

        }
        catch (err) {
            return res.status(500).json({ error: 'Failed to update availability' });
        }
    }
}

export default BookingManagementController;