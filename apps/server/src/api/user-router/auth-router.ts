import { Router } from "express";
import AuthController from "../../controllers/users/auth.controller.js";

const router = Router();

router.post("/sign-up", AuthController.signUp)
router.post("/verify-signup-otp", AuthController.verifySignUpOTP)
router.post("/sign-in", AuthController.signIn)
router.post("/verify-signin-otp", AuthController.verifySignInOTP)

export default router;