import { IPaymentConfig } from "../@types/interfaces.js";

import dotenv from "dotenv"

dotenv.config();

export const razorpayConfig: IPaymentConfig = {
    keyId: process.env.RAZORPAY_KEY_ID as string,
    keySecret: process.env.RAZORPAY_KEY_SECRET as string
}