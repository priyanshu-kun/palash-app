import { Request, Response, NextFunction } from "express"
import JWTService from "../services/user/jwt/jwt.service.js";
export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }

    const token = authHeader.split(" ")[1];

    const jwtServiceInstance = new JWTService();
    const result = await jwtServiceInstance.verifyToken(token);

    if (!result) {
        res.status(401).json({ message: "Unauthorized: please authenticate first." });
        return;
    }

    req.user = result;
    next();
};

export const authorizeRoles = (roles: Array<"USER" | "ADMIN">) => {
  return (req: Request, res: Response, next: NextFunction) => {
      if (!req.user) {
           res.status(401).json({ message: "Unauthorized: No User Found" });
           return;
      }

      if (!roles.includes(req.user.role)) {
           res.status(403).json({ message: "Forbidden: Insufficient Permissions" });
           return;
      }

      next();
  };
};