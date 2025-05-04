import { Request, Response } from "express";
import NotificationService from "../../services/notification/notification.service.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { ValidationError } from "../../utils/errors.js";

class NotificationController {
    private notificationService: NotificationService;

    constructor() {
        this.notificationService = NotificationService.getInstance();
    }

    getNotifications = asyncHandler(async (req: Request, res: Response) => {
        const userId = req.user?.userId;
        if (!userId) throw new ValidationError('User ID is required');

        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 20;

        const result = await this.notificationService.getUserNotifications(userId, page, limit);
        res.json(result);
    });

    markAsRead = asyncHandler(async (req: Request, res: Response) => {
        const userId = req.user?.userId;
        if (!userId) throw new ValidationError('User ID is required');

        const { notificationId } = req.params;
        if (!notificationId) throw new ValidationError('Notification ID is required');

        const result = await this.notificationService.markAsRead(notificationId, userId);
        res.json(result);
    });

    markAllAsRead = asyncHandler(async (req: Request, res: Response) => {
        const userId = req.user?.userId;
        if (!userId) throw new ValidationError('User ID is required');

        const result = await this.notificationService.markAllAsRead(userId);
        res.json(result);
    });

    deleteNotification = asyncHandler(async (req: Request, res: Response) => {
        const userId = req.user?.userId;
        if (!userId) throw new ValidationError('User ID is required');

        const { notificationId } = req.params;
        if (!notificationId) throw new ValidationError('Notification ID is required');

        const result = await this.notificationService.deleteNotification(notificationId, userId);
        res.json(result);
    });

    getUnreadCount = asyncHandler(async (req: Request, res: Response) => {
        const userId = req.user?.userId;
        if (!userId) throw new ValidationError('User ID is required');

        const count = await this.notificationService.getUnreadCount(userId);
        res.json({ count });
    });

    // Admin only endpoints
    createAnnouncement = asyncHandler(async (req: Request, res: Response) => {
        const adminId = req.user?.userId;
        if (!adminId) throw new ValidationError('Admin ID is required');

        const { userId, title, message, broadcast = false } = req.body;
        
        // If broadcast is true, send to all users
        if (broadcast) {
            if (!title || !message) {
                throw new ValidationError('Title and message are required');
            }
            
            await this.notificationService.broadcastAnnouncement(title, message, adminId);
            res.json({ message: 'Announcement broadcast to all users successfully' });
        } 
        // Otherwise, send to specific user
        else {
            if (!userId || !title || !message) {
                throw new ValidationError('User ID, title, and message are required for targeted announcements');
            }
            
            await this.notificationService.createAdminAnnouncement(userId, title, message, adminId);
            res.json({ message: 'Announcement sent to user successfully' });
        }
    });
}

export default NotificationController; 