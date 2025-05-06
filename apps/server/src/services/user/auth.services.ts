import { prisma } from "@palash/db-client";
import { SignInDTO, SignUpDTO, VerifyOtpDTO, RefreshTokenDTO } from "../../@types/interfaces.js";
import Logger from "../../config/logger.config.js";
import { generateOtp } from "../../utils/generate-otp.js";
import { deleteOtp, getOtpData, storeSignUpOtp, storeSignInOtp } from "../../utils/redis.utils.js";
import { sendMail } from "../../adapters/mailer.adapter.js";
import JWTService from "./jwt/jwt.service.js";
import { ValidationError } from "../../utils/errors.js";

const loggerInstance = new Logger();
const logger = loggerInstance.getLogger();

class AuthServices {
    static async signUp(user: SignUpDTO) {

        const { name, username, phoneOrEmail, dob } = user;

        const isUserExists = await prisma.user.findFirst({
            where: { OR: [{ username }, { "phone_or_email": phoneOrEmail }] },
        });

        if (isUserExists) {
            throw new ValidationError('Username or Phone/Email already taken.');
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
        await sendMail({ phoneOrEmail, otp });
        return { message: "OTP sent for signin." };
    }

    static async verifySignUpOtp(data: VerifyOtpDTO) {
        const { phoneOrEmail, otp } = data;

        const savedUser = await getOtpData(phoneOrEmail, "signup");
        if (!savedUser) throw new ValidationError("OTP expired");

        if (savedUser.otp !== otp) throw new ValidationError("Invalid Otp");

        await deleteOtp(phoneOrEmail, "signup");

        const user = await prisma.user.create({
            data: {
                phone_or_email: phoneOrEmail,
                name: savedUser.name,
                username: savedUser.username,
                date_of_birth: new Date(savedUser.dob)
            },
        });

        const jwtServiceInstance = new JWTService();
        const { accessToken, refreshToken } = await jwtServiceInstance.generateTokenPair(
            user.id, 
            user.phone_or_email || '', 
            'USER'
        );

        // Store refresh token in database
        await prisma.refreshToken.create({
            data: {
                token: refreshToken,
                user_id: user.id,
                expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days
            }
        });

        return {
            message: "Signup successful.",
            accessToken,
            refreshToken,
            user: user
        };
    }

    static async signIn(data: SignInDTO) {
        const { phoneOrEmail } = data;

        const user = await prisma.user.findUnique({ where: { phone_or_email: phoneOrEmail } });
        if (!user) throw new ValidationError("User not found. Please sign up.");

        const otp: string = generateOtp();

        await sendMail({ phoneOrEmail, otp });

        await storeSignInOtp({ otp, phoneOrEmail });

        return { message: "OTP sent for signin." };
    }

    static async verifySignInOtp(data: VerifyOtpDTO) {
        const { phoneOrEmail, otp } = data;

        const savedUser = await getOtpData(phoneOrEmail, "signin");
        if (!savedUser) throw new ValidationError("OTP expired");

        if (savedUser.otp !== otp) throw new ValidationError("Invalid Otp");

        await deleteOtp(phoneOrEmail, "signin");

        const user = await prisma.user.findUnique({ where: { phone_or_email: phoneOrEmail } });
        if (!user) throw new ValidationError("User not found. Please sign up.");

        // Invalidate any existing refresh tokens for this user
        await prisma.refreshToken.updateMany({
            where: { user_id: user.id, is_revoked: false },
            data: { is_revoked: true }
        });

        const jwtServiceInstance = new JWTService();
        const { accessToken, refreshToken } = await jwtServiceInstance.generateTokenPair(
            user.id, 
            user.phone_or_email || '', 
            user.role
        );

        // Store refresh token in database
        await prisma.refreshToken.create({
            data: {
                token: refreshToken,
                user_id: user.id,
                expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days
            }
        });

        return {
            message: "Login successful.",
            accessToken,
            refreshToken,
            user: user
        };
    }

    static async refreshToken(data: RefreshTokenDTO) {
        const { refreshToken } = data;

        // Verify the refresh token exists and is valid
        const storedToken = await prisma.refreshToken.findFirst({
            where: {
                token: refreshToken,
                is_revoked: false,
                expires_at: { gt: new Date() }
            },
            include: { user: true }
        });

        if (!storedToken) {
            throw new ValidationError("Invalid or expired refresh token");
        }

        const user = storedToken.user;

        // Generate new token pair
        const jwtServiceInstance = new JWTService();
        const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
            await jwtServiceInstance.generateTokenPair(user.id, user.phone_or_email || '', user.role);

        // Revoke the old refresh token
        await prisma.refreshToken.update({
            where: { id: storedToken.id },
            data: { is_revoked: true }
        });

        // Store the new refresh token
        await prisma.refreshToken.create({
            data: {
                token: newRefreshToken,
                user_id: user.id,
                expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days
            }
        });

        return {
            message: "Token refreshed successfully",
            accessToken: newAccessToken,
            refreshToken: newRefreshToken
        };
    }

    static async logout(userId: string, refreshToken: string) {
        try {
            // Revoke the refresh token
            await prisma.refreshToken.updateMany({
                where: {
                    user_id: userId,
                    token: refreshToken,
                    is_revoked: false
                },
                data: { is_revoked: true }
            });

            return { message: "Logged out successfully" };
        } catch (err: any) {
            throw new Error(`${err.message}`);
        }
    }

    static async logoutAll(userId: string) {
        try {
            // Revoke all refresh tokens for this user
            await prisma.refreshToken.updateMany({
                where: {
                    user_id: userId,
                    is_revoked: false
                },
                data: { is_revoked: true }
            });

            return { message: "Logged out from all devices successfully" };
        } catch (err: any) {
            throw new Error(`${err.message}`);
        }
    }

    static async createNewAdmin(user: SignUpDTO) {
        const { name, username, phoneOrEmail, dob } = user;

        const isUserExists = await prisma.user.findFirst({
            where: { OR: [{ username }, { "phone_or_email": phoneOrEmail }] },
        });

        if (isUserExists) {
            throw new ValidationError("Username or Phone/Email already taken.");
        }

        const otp: string = generateOtp();

        const tempUser = {
            otp,
            name,
            username,
            phoneOrEmail,
            dob,
            role: 'ADMIN'
        }

        await storeSignUpOtp(tempUser);

        await sendMail({ phoneOrEmail, otp });

        return { message: "OTP sent for admin registration." };
    }

    static async verifyAdminSignUpOtp(data: VerifyOtpDTO) {
        const { phoneOrEmail, otp } = data;

        const savedUser = await getOtpData(phoneOrEmail, "signup");
        if (!savedUser) throw new ValidationError("OTP expired");

        if (savedUser.otp !== otp) throw new ValidationError("Invalid OTP");

        await deleteOtp(phoneOrEmail, "signup");

        const user = await prisma.user.create({
            data: {
                phone_or_email: phoneOrEmail,
                name: savedUser.name,
                username: savedUser.username,
                date_of_birth: new Date(savedUser.dob),
                role: 'ADMIN'
            },
        });

        const jwtServiceInstance = new JWTService();
        const { accessToken, refreshToken } = await jwtServiceInstance.generateTokenPair(user.id, phoneOrEmail, 'ADMIN');

        // Store refresh token in database
        await prisma.refreshToken.create({
            data: {
                token: refreshToken,
                user_id: user.id,
                expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days
            }
        });

        return {
            message: "Admin registration successful.",
            accessToken,
            refreshToken,
            user: user
        };
    }

    static async adminSignIn(data: SignInDTO) {
        const { phoneOrEmail } = data;

        const user = await prisma.user.findUnique({
            where: {
                phone_or_email: phoneOrEmail,
                role: 'ADMIN'
            }
        });

        if (!user) throw new ValidationError("Admin not found. Please register as admin.");

        const otp: string = generateOtp();

        await sendMail({ phoneOrEmail, otp });
        await storeSignInOtp({ otp, phoneOrEmail });

        return { message: "OTP sent for admin login." };
    }

    static async verifyAdminSignInOtp(data: VerifyOtpDTO) {
        const { phoneOrEmail, otp } = data;

        const savedUser = await getOtpData(phoneOrEmail, "signin");
        if (!savedUser) throw new ValidationError("OTP expired");

        if (savedUser.otp !== otp) throw new ValidationError("Invalid OTP");

        await deleteOtp(phoneOrEmail, "signin");

        const user = await prisma.user.findUnique({
            where: {
                phone_or_email: phoneOrEmail,
                role: 'ADMIN'
            }
        });

        if (!user) throw new ValidationError("Admin not found. Please register as admin.");

        // Invalidate any existing refresh tokens for this admin
        await prisma.refreshToken.updateMany({
            where: { user_id: user.id, is_revoked: false },
            data: { is_revoked: true }
        });

        const jwtServiceInstance = new JWTService();
        const { accessToken, refreshToken } = await jwtServiceInstance.generateTokenPair(user.id, phoneOrEmail, 'ADMIN');

        // Store refresh token in database
        await prisma.refreshToken.create({
            data: {
                token: refreshToken,
                user_id: user.id,
                expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days
            }
        });

        return {
            message: "Admin login successful.",
            accessToken,
            refreshToken,
            user: user
        };
    }
}

export default AuthServices;