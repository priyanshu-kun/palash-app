import { Router } from "express";
import UserProfileController from "../../controllers/users/user-profile.controller.js";

const router = Router();

const profileRouterControllerInstance = new UserProfileController();

router.get("/me", profileRouterControllerInstance.fetchProfile)
router.put("/update-profile", profileRouterControllerInstance.updateProfile)

export default router;