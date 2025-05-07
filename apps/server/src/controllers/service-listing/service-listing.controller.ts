import { Request, Response, NextFunction } from "express"
import { prisma } from "@palash/db-client";
import winston from "winston";
import { redisClient } from "../../adapters/redis.adapter.js";


const EXPIRATION_TIME = 3 * 24 * 60 * 60;

class ServiceListingController {
    static async fetchServiceByServiceID(req: Request, res: Response, next: NextFunction) {
        try {
            const { serviceId } = req.params;

            if (!serviceId) {
                res.status(400).json({ message: "Service ID is required" });
                return;
            }

            const [service] = await Promise.all([
                prisma.service.findUnique({
                    where: { id: serviceId },
                })
            ]);

            res.status(200).json({
                message: "Services retrieved successfully",
                service,
            });
        }
        catch (err) {
            next(err);
        }
    }

    static async listServices(req: Request, res: Response, next: NextFunction) {
        try {
            const { page = "1", limit = "10" } = req.query;

            const cacheKey = req.originalUrl.replace('?', ':');

            const pageNumber = parseInt(page as string, 10);
            const limitNumber = parseInt(limit as string, 10);

            console.debug(`${pageNumber}, ${limitNumber}`)

            if (isNaN(pageNumber) || pageNumber < 1 || isNaN(limitNumber) || limitNumber < 1) {
                res.status(400).json({ message: "Invalid pagination parameters" });
                return;
            }

            const skip = (pageNumber - 1) * limitNumber;

            const [services, totalServices] = await Promise.all([
                prisma.service.findMany({
                    where: {},
                    skip,
                    take: limitNumber,
                    orderBy: { created_at: "desc" },
                }),
                prisma.service.count({ where: {} }),
            ]);

            const totalPages = Math.ceil(totalServices / limitNumber);
            const hasNextPage = pageNumber < totalPages;
            const hasPrevPage = pageNumber > 1;

            const createResponse = {
                pagination: {
                    currentPage: pageNumber,
                    totalPages,
                    totalServices,
                    hasNextPage,
                    hasPrevPage,
                },
                services,
            }

            if(services.length > 0) {
                await redisClient.setEx(cacheKey, EXPIRATION_TIME, JSON.stringify(createResponse));
            }


            res.status(200).json({
                message: "Services retrieved successfully",
                createResponse
            });
        }
        catch (err) {
            next(err);
        }
    }
}

export default ServiceListingController;