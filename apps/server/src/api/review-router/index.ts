import { Router } from 'express';
import ReviewController from '../../controllers/reviews/review.controller.js';
import { authMiddleware } from '../../middlewares/auth.middleware.js';

const router = Router();
const reviewController = new ReviewController();

// Public routes - Anyone can view reviews
router.get('/service/:serviceId', reviewController.getServiceReviews);
router.get('/review/:reviewId', reviewController.getReviewById);


router.use(authMiddleware);
// Protected routes - Require authentication
router.post('/create-review', reviewController.createReview);
router.get('/user/me', reviewController.getUserReviews);
router.patch('/:reviewId', reviewController.updateReview);
router.delete('/:reviewId', reviewController.deleteReview);

export const ReviewRouter = router; 