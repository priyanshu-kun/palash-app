import { Request, Response, NextFunction } from "express";
import { withTransaction } from "@palash/db-client";
import { ICreateInBulkAvailablityInput } from "../../@types/interfaces.js";

class BookingManagementController {
    async createAvailablityDatesInBulk(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const { serviceId } = req.params;
            const { dates, isBookable }: ICreateInBulkAvailablityInput = req.body;

            await withTransaction(async (tx: any) => {
                const results = await Promise.all(
                    dates.map(date =>
                        tx.availability.upsert({
                            where: {
                                serviceId_date: {
                                    serviceId,
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
                        })
                    )
                )
                return res.json(results);
            });

        }
        catch (err) {
            return res.status(500).json({ error: 'Failed to update availability' });
        }
    }
    async updateAvailablityForSpecificDate(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {


        }
        catch (err) {
            return res.status(500).json({ error: 'Failed to update availability' });
        }
    }
}

export default BookingManagementController;