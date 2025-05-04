import { Router } from "express";
import AuthController from "../../controllers/users/auth.controller.js";

const router = Router();

const authControllerInstance = new AuthController();

router.post("/sign-up", authControllerInstance.signUp)
router.post("/verify-signup-otp", authControllerInstance.verifySignUpOTP)
router.post("/sign-in", authControllerInstance.signIn)
router.post("/verify-signin-otp", authControllerInstance.verifySignInOTP)
router.post("/create-new-admin", authControllerInstance.createNewAdmin)
router.post("/admin/verify-signup-otp", authControllerInstance.verifyAdminSignUpOTP)
router.post("/admin/sign-in", authControllerInstance.adminSignIn)
router.post("/admin/verify-signin-otp", authControllerInstance.verifyAdminSignInOTP)
router.post("/refresh-token", authControllerInstance.refreshToken)
router.post("/log-out", authControllerInstance.logOut)

export default router;