import {Request, Response, NextFunction} from "express";
import {redisClient} from "../adapters/redis.adapter.js";
import Logger from "../config/logger.config.js";

const loggerInstance = new Logger();
const logger = loggerInstance.getLogger();

export async function cacheMiddleware(req: Request, res: Response, next: NextFunction) {
    try {
        const cacheKey = req.originalUrl.replace("?", ":");
        const cacheData = await redisClient.get(cacheKey);
        console.log(cacheData)

        if(cacheData) {
            logger?.info("Cache Hit");
            res.status(200).json({
                message: "Services retrieved successfully",
                createResponse: JSON.parse(cacheData)
            });
            return;
        }

        logger?.info("Cache Miss");
        next();
    }
    catch(err) {
        if(err instanceof Error) {
            logger?.error(err.message);
        }
        else {
            logger?.error("Unknown error occur while reading cache");
        }
        next(err);
    }

}