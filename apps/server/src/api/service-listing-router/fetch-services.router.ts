import { Router } from "express";
import ServiceListingController from "../../controllers/service-listing/service-listing.controller.js"
import {cacheMiddleware} from "../../middlewares/cache-services.middleware.js";
import { authMiddleware } from "../../middlewares/auth.middleware.js";

const router = Router();

router.get('/fetch-services-by-serviceId/:serviceId',  ServiceListingController.fetchServiceByServiceID);
router.get('/fetch-services', cacheMiddleware,  ServiceListingController.listServices);

export default router;