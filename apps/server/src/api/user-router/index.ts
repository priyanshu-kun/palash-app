import { Router } from "express";
import AuthRouterRouter from "./auth-router.js";
import ProfileRouter from "./profile-router.js";

const router = Router();

router.use("/auth", AuthRouterRouter)
router.use("/profile", ProfileRouter)

export default router;