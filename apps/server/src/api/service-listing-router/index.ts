import {Router} from "express"
import FeatchServicesRouter from "./fetch-services.router.js";

const router = Router();

router.use("/services-listing", FeatchServicesRouter);

export default router;