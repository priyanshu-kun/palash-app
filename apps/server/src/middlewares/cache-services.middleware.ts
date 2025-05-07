import {Request, Response, NextFunction} from "express";
import {redisClient} from "../adapters/redis.adapter.js";

export async function cacheMiddleware(req: Request, res: Response, next: NextFunction) {
    try {
        const cacheKey = req.originalUrl.replace("?", ":");
        const cacheData = await redisClient.get(cacheKey);
        console.log(cacheData)

        if(cacheData) {
            console.info("Cache Hit");
            res.status(200).json({
                message: "Services retrieved successfully",
                createResponse: JSON.parse(cacheData)
            });
            return;
        }

        console.info("Cache Miss");
        next();
    }
    catch(err) {
        if(err instanceof Error) {
            console.error(err.message);
        }
        else {
            console.error("Unknown error occur while reading cache");
        }
        next(err);
    }

}