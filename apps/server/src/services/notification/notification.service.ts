import { prisma, NotificationType, NotificationStatus } from "@palash/db-client";
import { WebSocketServer } from "../../adapters/websocket.adapter.js";

class NotificationService {
    private static instance: NotificationService;
    private wsServer: WebSocketServer | null = null;

    private constructor() {
        try {
            this.wsServer = WebSocketServer.getInstance();
            console.log("WebSocketServer initialized in NotificationService");
        } catch (error) {
            console.error("Failed to initialize WebSocketServer:", error);
            console.error("Failed to initialize WebSocketServer:", error);
            // Continue without WebSocket - fallback to database-only notifications
        }
    }

    public static getInstance(): NotificationService {
        if (!NotificationService.instance) {
            NotificationService.instance = new NotificationService();
        }
        return NotificationService.instance;
    }

    async createNotification({
        userId,
        type,
        title,
        message,
        data = {},
        createdBy = null
    }: {
        userId: string;
        type: NotificationType;
        title: string;
        message: string;
        data?: any;
        createdBy?: string | null;
    }) {
        try {
            const notification = await prisma.notification.create({
                data: {
                    user_id: userId,
                    type,
                    title,
                    message,
                    data,
                    created_by: createdBy,
                    status: NotificationStatus.UNREAD
                }
            });

            console.log("Notification created:", notification);

            // Send real-time notification if WebSocket is available
            if (this.wsServer) {
                try {
                    this.wsServer.sendToUser(userId, {
                        type: 'NOTIFICATION',
                        data: notification
                    });
                    console.log("Real-time notification sent to user:", userId);
                } catch (wsError) {
                    console.error("Error sending real-time notification:", wsError);
                    console.error("Error sending real-time notification:", wsError);
                    // Continue even if WebSocket fails - notification is already in DB
                }
            } else {
                console.log("WebSocket server not available, skipping real-time notification");
            }

            return notification;
        } catch (error) {
            console.error("Error creating notification:", error);
            console.error('Error creating notification:', error);
            throw error;
        }
    }

    async getUserNotifications(userId: string, page = 1, limit = 20) {
        try {
            const skip = (page - 1) * limit;
            const [notifications, total] = await Promise.all([
                prisma.notification.findMany({
                    where: { user_id: userId },
                    orderBy: { created_at: 'desc' },
                    skip,
                    take: limit,
                    include: {
                        created_by_user: {
                            select: {
                                id: true,
                                name: true,
                                username: true
                            }
                        }
                    }
                }),
                prisma.notification.count({
                    where: { user_id: userId }
                })
            ]);

            return {
                notifications,
                pagination: {
                    total,
                    page,
                    limit,
                    totalPages: Math.ceil(total / limit)
                }
            };
        } catch (error) {
            console.error('Error fetching user notifications:', error);
            throw error;
        }
    }

    async markAsRead(notificationId: string, userId: string) {
        try {
            const notification = await prisma.notification.update({
                where: {
                    id: notificationId,
                    user_id: userId
                },
                data: {
                    status: NotificationStatus.READ
                }
            });

            return notification;
        } catch (error) {
            console.error('Error marking notification as read:', error);
            throw error;
        }
    }

    async markAllAsRead(userId: string) {
        try {
            await prisma.notification.updateMany({
                where: {
                    user_id: userId,
                    status: NotificationStatus.UNREAD
                },
                data: {
                    status: NotificationStatus.READ
                }
            });

            return { message: 'All notifications marked as read' };
        } catch (error) {
            console.error('Error marking all notifications as read:', error);
            throw error;
        }
    }

    async deleteNotification(notificationId: string, userId: string) {
        try {
            await prisma.notification.delete({
                where: {
                    id: notificationId,
                    user_id: userId
                }
            });

            return { message: 'Notification deleted successfully' };
        } catch (error) {
            console.error('Error deleting notification:', error);
            throw error;
        }
    }

    async getUnreadCount(userId: string) {
        try {
            const count = await prisma.notification.count({
                where: {
                    user_id: userId,
                    status: NotificationStatus.UNREAD
                }
            });

            return count;
        } catch (error) {
            console.error('Error getting unread notification count:', error);
            throw error;
        }
    }

    // Helper method to create booking-related notifications
    async createBookingNotification(booking: any, type: NotificationType) {
        const notificationData = {
            bookingId: booking.id,
            serviceId: booking.service_id,
            date: booking.date
        };

        let title = '';
        let message = '';

        switch (type) {
            case NotificationType.BOOKING_CREATED:
                title = 'New Booking Created';
                message = `Your booking for ${booking.service.name} has been created successfully.`;
                break;
            case NotificationType.BOOKING_CONFIRMED:
                title = 'Booking Confirmed';
                message = `Your booking for ${booking.service.name} has been confirmed.`;
                break;
            case NotificationType.BOOKING_CANCELLED:
                title = 'Booking Cancelled';
                message = `Your booking for ${booking.service.name} has been cancelled.`;
                break;
        }

        await this.createNotification({
            userId: booking.user_id,
            type,
            title,
            message,
            data: notificationData
        });
    }

    // Helper method to create payment-related notifications
    async createPaymentNotification(booking: any, type: NotificationType) {
        const notificationData = {
            bookingId: booking.id,
            serviceId: booking.service_id,
            amount: booking.total_amount
        };

        let title = '';
        let message = '';

        switch (type) {
            case NotificationType.PAYMENT_SUCCESS:
                title = 'Payment Successful';
                message = `Payment of ₹${booking.total_amount} for ${booking.service.name} has been processed successfully.`;
                break;
            case NotificationType.PAYMENT_FAILED:
                title = 'Payment Failed';
                message = `Payment for ${booking.service.name} has failed. Please try again.`;
                break;
        }

        await this.createNotification({
            userId: booking.user_id,
            type,
            title,
            message,
            data: notificationData
        });
    }

    // Helper method to create admin announcements for a specific user
    async createAdminAnnouncement(userId: string, title: string, message: string, createdBy: string) {
        await this.createNotification({
            userId,
            type: NotificationType.ADMIN_ANNOUNCEMENT,
            title,
            message,
            createdBy
        });
    }

    // Helper method to broadcast admin announcements to all users
    async broadcastAnnouncement(title: string, message: string, createdBy: string) {
        try {
            // First, get all users
            const users = await prisma.user.findMany({
                select: { id: true }
            });
            
            console.log(`Broadcasting announcement to ${users.length} users`);

            // Create notification for each user
            const notifications = [];
            for (const user of users) {
                const notification = await this.createNotification({
                    userId: user.id,
                    type: NotificationType.ADMIN_ANNOUNCEMENT,
                    title,
                    message,
                    createdBy
                });
                notifications.push(notification);
            }

            // If WebSocket is available, also send a broadcast
            if (this.wsServer) {
                try {
                    this.wsServer.broadcast({
                        type: 'NOTIFICATION',
                        data: {
                            type: NotificationType.ADMIN_ANNOUNCEMENT,
                            title,
                            message
                        }
                    });
                    console.log("Broadcast notification sent to all connected users");
                } catch (wsError) {
                    console.error("Error broadcasting notification:", wsError);
                    console.error("Error broadcasting notification:", wsError);
                }
            }

            return { message: `Announcement broadcast to ${users.length} users`, count: users.length };
        } catch (error) {
            console.error("Error broadcasting announcement:", error);
            console.error('Error broadcasting announcement:', error);
            throw error;
        }
    }
}

export default NotificationService; 