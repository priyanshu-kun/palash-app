import { Router } from "express";
import {ManagementRouter} from './admin-router/index.js';
import ServiceListingRouter from "./service-listing-router/index.js";
import UserRouter from "./user-router/index.js";
import { BookingRouter } from "./booking-router/index.js";
import { authMiddleware, authorizeRoles } from "../middlewares/auth.middleware.js";

const router = Router();

router.use('/admin', authMiddleware, authorizeRoles(['ADMIN']),  ManagementRouter);
router.use('/services', authMiddleware, authorizeRoles(['ADMIN']), ServiceListingRouter)
router.use('/booking', BookingRouter)
router.use('/users', UserRouter);

export default router;