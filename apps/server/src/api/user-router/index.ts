import { Router } from "express";
import AuthRouterRouter from "./auth-router.js";
import ProfileRouter from "./profile-router.js";
import { authMiddleware } from "../../middlewares/auth.middleware.js";

const router = Router();

router.use("/auth", AuthRouterRouter)

router.use(authMiddleware);
router.use("/profile", ProfileRouter)

export default router;