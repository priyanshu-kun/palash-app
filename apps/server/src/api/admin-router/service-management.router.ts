import { Router } from "express";
import AdminServiceManagementController from "../../controllers/admin/admin-services-management.controller.js"
import {handleUploadErrors, upload} from "../../middlewares/upload.middleware.js";
const router = Router();

router.post('/create-service', upload.array("media", 10), handleUploadErrors, AdminServiceManagementController.createService);
router.put('/update-service-images/:serviceId',upload.array("media", 10), AdminServiceManagementController.updateServiceImages)
router.put('/update-service-data/:serviceId', AdminServiceManagementController.updateServiceData)
router.delete('/delete-service', AdminServiceManagementController.deleteService);

export default router;