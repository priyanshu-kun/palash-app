import crypto from "crypto";
export const generateOtp = (): string => {
    const bytes = crypto.randomBytes(3);
    return parseInt(bytes.toString("hex"), 16).toString().substring(0, 4);
}