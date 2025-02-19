import { prisma } from "@palash/db-client";
import { SignInDTO, SignUpDTO, VerifyOtpDTO } from "../../@types/interfaces.js";
import Logger from "../../config/logger.config.js";
import { generateOtp } from "../../utils/generate-otp.js";
import { deleteOtp, getOtpData, storeSignUpOtp, storeSignInOtp } from "../../utils/redis.utils.js";
import { sendMail } from "../../adapters/mailer.adapter.js";
import JWTService from "./jwt/jwt.service.js";

const loggerInstance = new Logger();
const logger = loggerInstance.getLogger();

class AuthServices {
    static async signUp(user: SignUpDTO) {
        try {
            const { name, username, phoneOrEmail, dob } = user;

            const isUserExists = await prisma.user.findFirst({
                where: { OR: [{ username }, { "phone_or_email": phoneOrEmail }] },
            });

            if (isUserExists) {
                throw new Error("Username or Phone/Email already taken.");
            }

            const otp: string = generateOtp();

            const tempUser = {
                otp,
                name,
                username,
                phoneOrEmail,
                dob
            }

            await storeSignUpOtp(tempUser);

            // await sendMail();

            return { message: "OTP sent for signin.", otp: otp };
        }
        catch (err: any) {
            throw new Error(`${err.message}`);
        }
    }
    static async verifySignUpOtp(data: VerifyOtpDTO) {
        try {

            const { phoneOrEmail, otp } = data;

            const savedUser = await getOtpData(phoneOrEmail, "signup");
            if (!savedUser) throw new Error("OTP expired");

            if (savedUser.otp !== otp) throw new Error("Invalid Otp");

            await deleteOtp(phoneOrEmail, "signup");

            await prisma.user.create({
                data: {
                    phone_or_email: phoneOrEmail,
                    name: savedUser.name,
                    username: savedUser.username,
                    date_of_birth: new Date(savedUser.dob)
                },
            });


            const jwtServiceInstance = new JWTService();
            const token = await jwtServiceInstance.generateToken(phoneOrEmail, 'USER');

            return { message: "Signup successful.", token };
        }
        catch (err: any) {
            throw new Error(`${err.message}`);
        }
    }

    static async signIn(data: SignInDTO) {
        try {
            const { phoneOrEmail } = data;

            const user = await prisma.user.findUnique({ where: { phone_or_email: phoneOrEmail } });
            if (!user) throw new Error("User not found. Please sign up.");

            const otp: string = generateOtp();
            // await sendMail();

            await storeSignInOtp({otp, phoneOrEmail});

            return { message: "OTP sent for signin.", otp };
        }
        catch (err: any) {
            throw new Error(`${err.message}`);
        }
    }

    static async verifySignInOtp(data: VerifyOtpDTO) {
        try {

            const { phoneOrEmail, otp } = data;

            const savedUser = await getOtpData(phoneOrEmail, "signin");
            if (!savedUser) throw new Error("OTP expired");

            if (savedUser.otp !== otp) throw new Error("Invalid Otp");

            await deleteOtp(phoneOrEmail, "signin");

            const user = await prisma.user.findUnique({ where: { phone_or_email: phoneOrEmail } });
            if (!user) throw new Error("User not found. Please sign up.");

            const jwtServiceInstance = new JWTService();
            const token = await jwtServiceInstance.generateToken(phoneOrEmail, user.role);

            return { message: "Signup successful.", token };
        }
        catch (err: any) {
            throw new Error(`${err.message}`);
        }
    }
}

export default AuthServices;