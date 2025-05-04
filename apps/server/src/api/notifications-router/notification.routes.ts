import { Router } from 'express';
import NotificationController from '../../controllers/notification/notification.controller.js';
import { authMiddleware, authorizeRoles } from '../../middlewares/auth.middleware.js';

const router = Router();
const notificationController = new NotificationController();

// Public routes (require authentication)
router.use(authMiddleware);

// Get user's notifications with pagination
router.get('/', notificationController.getNotifications);

// Mark notification as read
router.patch('/:notificationId/read', notificationController.markAsRead);

// Mark all notifications as read
router.patch('/read-all', notificationController.markAllAsRead);

// Delete notification
router.delete('/:notificationId', notificationController.deleteNotification);

// Get unread notification count
router.get('/unread-count', notificationController.getUnreadCount);

// Admin only routes
// Create targeted announcement to specific user
router.post('/announcement/user', authMiddleware, authorizeRoles(['ADMIN']), notificationController.createAnnouncement);

// Broadcast announcement to all users
router.post('/announcement/broadcast', authMiddleware, authorizeRoles(['ADMIN']), (req, res, next) => {
    req.body.broadcast = true;
    notificationController.createAnnouncement(req, res, next);
});

export default router; 