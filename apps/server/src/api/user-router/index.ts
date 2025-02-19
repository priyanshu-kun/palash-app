import { Router } from "express";
import AuthRouterController from "./auth-router.js";

const router = Router();

router.use("/auth", AuthRouterController)

export default router;