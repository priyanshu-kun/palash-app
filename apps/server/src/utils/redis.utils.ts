import { prisma } from "@palash/db-client";
import { redisClient } from "../adapters/redis.adapter.js";

export async function storeSignUpOtp(data: { otp: string; name: string; username: string; phoneOrEmail: string; dob: string; }) {
    const key: string = `otp:signup:${data.phoneOrEmail}`;
    await redisClient.setEx(key, 30000, JSON.stringify(data));
}

export async function storeSignInOtp(data: {otp: string; phoneOrEmail: string;}) {
    const key: string = `otp:signin:${data.phoneOrEmail}`;
    await redisClient.setEx(key, 30000, JSON.stringify(data));
}


export async function getOtpData(phoneOrEmail: string, method: string) {
    const key: string = `otp:${method}:${phoneOrEmail}`;
    const data = await redisClient.get(key);
    return data ? JSON.parse(data) : null;
}

export async function deleteOtp(phoneOrEmail: string, method: string) {
    const key: string = `otp:${method}:${phoneOrEmail}`;
    await redisClient.del(key);
}