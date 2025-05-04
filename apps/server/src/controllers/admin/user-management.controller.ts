import {Request, Response, NextFunction} from "express";
import UserManagementServices from "../../services/admin/user-management.services.js";

const userManagementServiceInstance = new UserManagementServices();

class UserProfileManagement {
    async deleteUser(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const userId = req.params.userId;
            const currentUser = req.user;
            if(currentUser?.role !== "ADMIN") {
                return res.status(403).json({message: "You are not authorized to delete this user"});
            }
            if(currentUser?.userId === userId) {
                return res.status(403).json({message: "You are not authorized to delete yourself"});
            }
            await userManagementServiceInstance.deleteUser(userId); 
            return res.json({message: "User is deleted"});
        }
        catch(err) {
            return res.status(500).json(err);
        }
    }
    async fetchUsers(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const users = await userManagementServiceInstance.fetchUsers();
            return res.json(users);
        }
        catch(err) {
            return res.status(500).json(err);
        }
    }
}

export default UserProfileManagement;