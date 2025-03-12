import { transporter } from "../config/mail.config.js";

export async function sendMail(mailObj: {phoneOrEmail: string; otp: string;}) {

    const {phoneOrEmail, otp} = mailObj;

    const emailTemplate = `
        <div style="font-family: Arial, sans-serif; max-width: 500px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px; background: #f9f9f9;">
            <h2 style="color: #4CAF50; text-align: center;">Palash Wellness App</h2>
            <p style="font-size: 16px; color: #333;">Hello,</p>
            <p style="font-size: 16px; color: #333;">Here is your OTP to verify your account:</p>
            <div style="text-align: center; font-size: 24px; font-weight: bold; color: #4CAF50; padding: 10px; border: 2px dashed #4CAF50; display: inline-block; margin: 10px auto;">
                ${otp}
            </div>
            <p style="font-size: 14px; color: #777;">This OTP is valid for 10 minutes. Do not share it with anyone.</p>
            <p style="font-size: 14px; color: #777;">If you didn’t request this, you can ignore this email.</p>
            <hr style="border: none; border-top: 1px solid #ddd;">
            <p style="font-size: 12px; color: #999; text-align: center;">© ${new Date().getFullYear()} Palash Wellness App. All rights reserved.</p>
        </div>
    `;

    const info = await transporter.sendMail({
        from: `"Palash Wellness App" <priyanshu-kun101@outlook.com>`,
        to: phoneOrEmail,
        subject: "Your OTP Code",
        html: emailTemplate,
    });
}
