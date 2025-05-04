import { Request, Response, NextFunction } from "express";
import { RefreshTokenDTO, SignInDTO, SignUpDTO, VerifyOtpDTO } from "../../@types/interfaces.js";
import AuthServices from "../../services/user/auth.services.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { ValidationError, UnauthorizedError } from "../../utils/errors.js";

class AuthController {
    signUp = asyncHandler(async (req: Request, res: Response) => {
        const user: SignUpDTO = req.body;
        if (!user.name || !user.username || !user.phoneOrEmail || !user.dob) {
            throw new ValidationError('Name, username, phone/email and date of birth are required');
        }
        
        const result = await AuthServices.signUp(user);
        res.json({
            message: result
        });
    });

    verifySignUpOTP = asyncHandler(async (req: Request, res: Response) => {
        const user: VerifyOtpDTO = req.body;
        if (!user.otp || !user.phoneOrEmail) {
            throw new ValidationError('OTP and phone/email are required');
        }
        
        const result = await AuthServices.verifySignUpOtp(user);
        res.json({
            message: result
        });
    });

    signIn = asyncHandler(async (req: Request, res: Response) => {
        const user: SignInDTO = req.body;
        
        if (!user.phoneOrEmail) {
            throw new ValidationError('Phone number or email is required');
        }
        
        const result = await AuthServices.signIn(user);
        res.json({
            message: result
        });
    });


    refreshToken = asyncHandler(async (req: Request, res: Response) => {
        const token: RefreshTokenDTO = req.body;
        
        if (!token.refreshToken) {
            throw new ValidationError('Token not found');
        }
        
        const result = await AuthServices.refreshToken(token);
        res.json({
            message: result
        });
    });

    verifySignInOTP = asyncHandler(async (req: Request, res: Response) => {
        const user: VerifyOtpDTO = req.body;
        
        if (!user.otp || !user.phoneOrEmail) {
            throw new ValidationError('OTP and phone/email are required');
        }
        
        const result = await AuthServices.verifySignInOtp(user);
        res.json({
            message: result
        });
    });

    createNewAdmin = asyncHandler(async (req: Request, res: Response) => {
        const user: SignUpDTO = req.body;
        
        if (!user.name || !user.username || !user.phoneOrEmail || !user.dob) {
            throw new ValidationError('Name, username, phone/email and date of birth are required');
        }
        
        const result = await AuthServices.createNewAdmin(user);
        res.json({
            message: result
        });
    });

    verifyAdminSignUpOTP = asyncHandler(async (req: Request, res: Response) => {
        const user: VerifyOtpDTO = req.body;
        
        if (!user.otp || !user.phoneOrEmail) {
            throw new ValidationError('OTP and phone/email are required');
        }
        
        const result = await AuthServices.verifyAdminSignUpOtp(user);
        res.json({
            message: result
        });
    });

    adminSignIn = asyncHandler(async (req: Request, res: Response) => {
        const user: SignInDTO = req.body;
        
        if (!user.phoneOrEmail) {
            throw new ValidationError('Phone number or email is required');
        }
        
        const result = await AuthServices.adminSignIn(user);
        res.json({
            message: result
        });
    });

    verifyAdminSignInOTP = asyncHandler(async (req: Request, res: Response) => {
        const user: VerifyOtpDTO = req.body;
        
        if (!user.otp || !user.phoneOrEmail) {
            throw new ValidationError('OTP and phone/email are required');
        }
        
        const result = await AuthServices.verifyAdminSignInOtp(user);
        res.json({
            message: result
        });
    });

    logOut = asyncHandler(async (req: Request, res: Response) => {
        const { userId } = req.body;
        
        if (!userId) {
            throw new ValidationError('User ID is required');
        }
        
        // Add your logout logic here
        res.json({
            message: "Successfully logged out"
        });
    });
}

export default AuthController;