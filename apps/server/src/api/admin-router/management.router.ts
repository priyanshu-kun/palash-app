import { Router } from "express";
import AdminServiceManagementController from "../../controllers/admin/admin-services-management.controller.js"
import BookingManagementController from "../../controllers/admin/booking-management.controller.js";
import {handleUploadErrors, upload} from "../../middlewares/upload.middleware.js";
import UserManagementController from "../../controllers/admin/user-management.controller.js";
const ManagementRouter = Router();

const bookingManagementControllerInstance = new BookingManagementController();
const userManagementControllerInstance = new UserManagementController();

ManagementRouter.post('/services/create-service', upload.array("media", 10), handleUploadErrors, AdminServiceManagementController.createService);
ManagementRouter.put('/services/update-service-images/:serviceId',upload.array("media", 10), AdminServiceManagementController.updateServiceImages)
ManagementRouter.put('/services/update-service-data/:serviceId', AdminServiceManagementController.updateServiceData)
ManagementRouter.delete('/services/delete-service', AdminServiceManagementController.deleteService);
ManagementRouter.post('/bookings/availability/bulk/:serviceId', bookingManagementControllerInstance.createAvailablityDatesInBulk);
ManagementRouter.put('/bookings/availability/:serviceId/:date', bookingManagementControllerInstance.updateAvailablityForSpecificDate);
ManagementRouter.delete('/users/delete-user/:userId', userManagementControllerInstance.deleteUser);
ManagementRouter.get('/users/fetch-users', userManagementControllerInstance.fetchUsers);

export default ManagementRouter;