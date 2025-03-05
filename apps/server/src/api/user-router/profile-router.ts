import { Router } from "express";
import UserProfileController from "../../controllers/users/user-profile.controller.js";

const router = Router();

const profileRouterControllerInstance = new UserProfileController();

router.get("/me/:userId", profileRouterControllerInstance.fetchProfile)
router.put("/update-profile/:userId", profileRouterControllerInstance.updateProfile)

export default router;