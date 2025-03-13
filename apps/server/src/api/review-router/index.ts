import { Router } from 'express';
import ReviewController from '../../controllers/reviews/review.controller.js';
import { authMiddleware } from '../../middlewares/auth.middleware.js';

const router = Router();
const reviewController = new ReviewController();

// Public routes - Anyone can view reviews
router.get('/public/service/:serviceId', reviewController.getServiceReviews);
router.get('/public/:reviewId', reviewController.getReviewById);

// Protected routes - Require authentication
router.use('/protected', authMiddleware);
router.post('/protected', reviewController.createReview);
router.get('/protected/user/me', reviewController.getUserReviews);
router.patch('/protected/:reviewId', reviewController.updateReview);
router.delete('/protected/:reviewId', reviewController.deleteReview);

export const ReviewRouter = router; 