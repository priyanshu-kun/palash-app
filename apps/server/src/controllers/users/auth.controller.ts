import { Request, Response, NextFunction } from "express";
import { SignInDTO, SignUpDTO, VerifyOtpDTO } from "../../@types/interfaces.js";
import AuthServices from "../../services/user/auth.services.js";

class AuthController {
    async signUp(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const user: SignUpDTO = req.body;
            const result = await AuthServices.signUp(user);
             res.json({
                message: result
            })
            return
        }
        catch (err: any) {
             res.status(400).json({ success: false, message: err.message });
             return
        }
    }

    async verifySignUpOTP(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const user: VerifyOtpDTO = req.body;
            const result = await AuthServices.verifySignUpOtp(user);
            res.json({
                message: result
            })
            return
        }
        catch (err: any) {
             res.status(400).json({ success: false, message: err.message });
             return
        }
    }

    async signIn(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const user: SignInDTO = req.body;
            const result = await AuthServices.signIn(user);
            res.json({
                message: result
            })
        }
        catch (err: any) {
             res.status(400).json({ success: false, message: err.message });
             return
        }
    }

    async verifySignInOTP(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const user: VerifyOtpDTO = req.body;
            const result = await AuthServices.verifySignInOtp(user);
            res.json({
                message: result
            })
        }
        catch (err: any) {
             res.status(400).json({ success: false, message: err.message });
             return
        }
    }

    async logOut(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
        }
        catch (err: any) {
             res.status(400).json({ success: false, message: err.message });
             return
        }
    }
}

export default AuthController;