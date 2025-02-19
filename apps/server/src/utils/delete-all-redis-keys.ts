import { loggers } from "winston";
import { redisClient } from "../adapters/redis.adapter.js";

export async function deleteServicesRedisKeys() {
    try {
        const rawKey = `\\api\\v1\\services\\services-listing\\fetch-services`;
        const key = rawKey.replace(/\\/g, "/");
        let cursor = 0;
        do {
            const { cursor: nextCursor, keys } = await redisClient.scan(cursor, {
                MATCH: `${key}:*`,
                COUNT: 100,
            });
            cursor = nextCursor;
            if (keys.length) {
                await redisClient.del(keys);
                console.log("Deleted:", keys);
            }
        } while (cursor !== 0);
    }
    catch (err) {
        return;
    }
}