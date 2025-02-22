import { Router } from "express";
import AdminServiceManagementController from "../../controllers/admin/admin-services-management.controller.js"
import BookingManagementController from "../../controllers/admin/booking-management.controller.js";
import {handleUploadErrors, upload} from "../../middlewares/upload.middleware.js";
const ManagementRouter = Router();

const bookingManagementControllerInstance = new BookingManagementController();

ManagementRouter.post('/services/create-service', upload.array("media", 10), handleUploadErrors, AdminServiceManagementController.createService);
ManagementRouter.put('/services/update-service-images/:serviceId',upload.array("media", 10), AdminServiceManagementController.updateServiceImages)
ManagementRouter.put('/services/update-service-data/:serviceId', AdminServiceManagementController.updateServiceData)
ManagementRouter.delete('/services/delete-service', AdminServiceManagementController.deleteService);
ManagementRouter.post('/bookings/availability/bulk/:serviceId', bookingManagementControllerInstance.createAvailablityDatesInBulk);
ManagementRouter.put('/bookings/availability/:serviceId/:date', bookingManagementControllerInstance.updateAvailablityForSpecificDate);

export default ManagementRouter;