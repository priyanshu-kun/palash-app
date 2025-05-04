import { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler.js";
import ReviewService from "../../services/reviews/review.service.js";
import { ValidationError } from "../../utils/errors.js";

class ReviewController {
    private reviewService: ReviewService;

    constructor() {
        this.reviewService = new ReviewService();
    }

    createReview = asyncHandler(async (req: Request, res: Response) => {
        const { serviceId, rating, comment, bookingId } = req.body;
        const userId = req.user?.userId; // Assuming we have user info from auth middleware

        if (!userId) {
            throw new ValidationError('User must be authenticated');
        }

        const review = await this.reviewService.createReview({
            userId,
            serviceId,
            rating,
            comment,
            bookingId
        });

        res.status(201).json({
            status: 'success',
            data: review
        });
    });

    getReviewById = asyncHandler(async (req: Request, res: Response) => {
        const { reviewId } = req.params;

        const review = await this.reviewService.getReviewById(reviewId);

        res.json({
            status: 'success',
            data: review
        });
    });

    getServiceReviews = asyncHandler(async (req: Request, res: Response) => {
        const { serviceId } = req.params;
        const { page, limit, sortBy, order } = req.query;

        const reviews = await this.reviewService.getServiceReviews(serviceId, {
            page: page ? parseInt(page as string) : undefined,
            limit: limit ? parseInt(limit as string) : undefined,
            sortBy: sortBy as string,
            order: order as 'asc' | 'desc'
        });

        res.json({
            status: 'success',
            data: reviews
        });
    });

    getUserReviews = asyncHandler(async (req: Request, res: Response) => {
        const userId = req.user?.userId; // From auth middleware

        if (!userId) {
            throw new ValidationError('User must be authenticated');
        }

        const reviews = await this.reviewService.getUserReviews(userId);

        res.json({
            status: 'success',
            data: reviews
        });
    });

    updateReview = asyncHandler(async (req: Request, res: Response) => {
        const { reviewId } = req.params;
        const { rating, comment } = req.body;
        const userId = req.user?.userId;

        if (!userId) {
            throw new ValidationError('User must be authenticated');
        }

        const review = await this.reviewService.updateReview(reviewId, userId, {
            rating,
            comment
        });

        res.json({
            status: 'success',
            data: review
        });
    });

    deleteReview = asyncHandler(async (req: Request, res: Response) => {
        const { reviewId } = req.params;
        const userId = req.user?.userId;

        if (!userId) {
            throw new ValidationError('User must be authenticated');
        }

        const result = await this.reviewService.deleteReview(reviewId, userId);

        res.json({
            status: 'success',
            message: 'Review deleted successfully'
        });
    });
}

export default ReviewController; 