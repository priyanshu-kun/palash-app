import { Router } from "express";
import ServiceManagementRouter from "./service-management.router.js";
import { authMiddleware, authorizeRoles } from "../../middlewares/auth.middleware.js";

const router = Router();

router.use('/service-management', ServiceManagementRouter);

export default router;