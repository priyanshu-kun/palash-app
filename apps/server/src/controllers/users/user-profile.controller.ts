import { Request, Response, NextFunction } from "express";
import { prisma } from "@palash/db-client";
import ProfileServices from "../../services/user/profile.services.js";
import { UserData } from "../../@types/types.js";

const userProfileServicesInstance = new ProfileServices();

class UserProfileController {
    async fetchProfile(req: Request, res: Response, next: NextFunction): Promise<any> {
        const userId = req.params.userId;
        try {
            if (!userId) {
                return res.status(500).json({ message: "Invalid user Id" });
            }
            const profile = await userProfileServicesInstance.fetchProfile(userId);
            if(!profile) {
                return res.status(404).json({ message: "User not found" });
            }
            return res.json(profile);
        }
        catch (err) {
            return res.status(500).json(err);
        }
    }
    async updateProfile(req: Request, res: Response, next: NextFunction): Promise<any> {
        const userId = req.params.userId;
        const userData: Partial<UserData> = req.body;
        try {
            if (!userId) {
                return res.status(500).json({ message: "Invalid user Id" });
            }
            const isUser = await prisma.user.findUnique({where: {id: userId}});

            if(!isUser) {
                return res.status(404).json({ message: "User not found" });
            }

            const updatedProfile = await userProfileServicesInstance.updateProfile(userId, userData);
            return res.json(updatedProfile);
        }
        catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    }
}

export default UserProfileController;