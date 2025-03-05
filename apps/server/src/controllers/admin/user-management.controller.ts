import {Request, Response, NextFunction} from "express";
import UserManagementServices from "../../services/admin/user-management.services.js";

const userManagementServiceInstance = new UserManagementServices();

class UserProfileManagement {
    async deleteUser(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const userId = req.params.userId;
            await userManagementServiceInstance.deleteUser(userId); 
            return res.json({message: "User is deleted"});
        }
        catch(err) {
            return res.status(500).json(err);
        }
    }
}

export default UserProfileManagement;