import { Request, Response, NextFunction } from 'express';
import { UnauthorizedError } from '../utils/errors.js';

// Middleware to check if user has admin role
export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;
    
    if (!user) {
        return next(new UnauthorizedError('Not authenticated'));
    }
    
    if (user.role !== 'ADMIN') {
        return next(new UnauthorizedError('Admin access required'));
    }
    
    next();
};

// Middleware to check for specific role
export const hasRole = (role: string) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const user = req.user;
        
        if (!user) {
            return next(new UnauthorizedError('Not authenticated'));
        }
        
        if (user.role !== role) {
            return next(new UnauthorizedError(`${role} access required`));
        }
        
        next();
    };
}; 