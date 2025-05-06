import { prisma } from "@palash/db-client";
import { ValidationError, NotFoundError, DatabaseError } from "../../utils/errors.js";

class ReviewService {
    /**
     * Create a new review
     */
    async createReview(data: {
        userId: string;
        serviceId: string;
        rating: number;
        comment: string;
        bookingId?: string;
    }) {
        try {
            // Validate rating range
            if (data.rating < 1 || data.rating > 5) {
                throw new ValidationError('Rating must be between 1 and 5');
            }

            // Check if service exists
            const service = await prisma.service.findUnique({
                where: { id: data.serviceId }
            });

            if (!service) {
                throw new NotFoundError('Service not found');
            }

            // Check if user exists
            const user = await prisma.user.findUnique({
                where: { id: data.userId }
            });

            if (!user) {
                throw new NotFoundError('User not found');
            }

            // Check if user has already reviewed this service
            const existingReview = await prisma.review.findFirst({
                where: {
                    user_id: data.userId,
                    service_id: data.serviceId
                }
            });

            if (existingReview) {
                throw new ValidationError('User has already reviewed this service');
            }

            // If bookingId is provided, verify it exists and belongs to the user
            if (data.bookingId) {
                const booking = await prisma.booking.findFirst({
                    where: {
                        id: data.bookingId,
                        user_id: data.userId,
                        service_id: data.serviceId
                    }
                });

                if (!booking) {
                    throw new ValidationError('Invalid booking reference');
                }
            }

            // Create the review
            const review = await prisma.review.create({
                data: {
                    user_id: data.userId,
                    service_id: data.serviceId,
                    rating: data.rating,
                    comment: data.comment,
                    booking_id: data.bookingId
                }
            });

            // Update service average rating
            const serviceReviews = await prisma.review.findMany({
                where: { service_id: data.serviceId }
            });

            const averageRating = serviceReviews.reduce((acc: number, review: { rating: number }) => acc + review.rating, 0) / serviceReviews.length;

            await prisma.service.update({
                where: { id: data.serviceId },
                data: { average_rating: averageRating, total_reviews: serviceReviews.length }
            });

            return review;
        } catch (error) {
            if (error instanceof ValidationError || error instanceof NotFoundError) {
                throw error;
            }
            throw new DatabaseError('Failed to create review');
        }
    }

    /**
     * Get a review by ID
     */
    async getReviewById(reviewId: string) {
        try {
            const review = await prisma.review.findUnique({
                where: { id: reviewId },
                include: {
                    user: {
                        select: {
                            id: true,
                            name: true,
                            username: true
                        }
                    },
                    service: {
                        select: {
                            id: true,
                            name: true
                        }
                    }
                }
            });

            if (!review) {
                throw new NotFoundError('Review not found');
            }

            return review;
        } catch (error) {
            if (error instanceof NotFoundError) {
                throw error;
            }
            throw new DatabaseError('Failed to fetch review');
        }
    }

    /**
     * Get reviews for a service
     */
    async getServiceReviews(serviceId: string, {
        page = 1,
        limit = 10,
        sortBy = 'created_at',
        order = 'desc'
    } = {}) {
        try {
            const skip = (page - 1) * limit;

            const [reviews, total] = await Promise.all([
                prisma.review.findMany({
                    where: { service_id: serviceId },
                    include: {
                        user: {
                            select: {
                                id: true,
                                name: true,
                                username: true
                            }
                        }
                    },
                    orderBy: { [sortBy]: order },
                    skip,
                    take: limit
                }),
                prisma.review.count({
                    where: { service_id: serviceId }
                })
            ]);

            return {
                reviews,
                pagination: {
                    total,
                    page,
                    limit,
                    totalPages: Math.ceil(total / limit)
                }
            };
        } catch (error) {
            throw new DatabaseError('Failed to fetch service reviews');
        }
    }

    /**
     * Get reviews by a user
     */
    async getUserReviews(userId: string) {
        try {
            const reviews = await prisma.review.findMany({
                where: { user_id: userId },
                include: {
                    service: {
                        select: {
                            id: true,
                            name: true
                        }
                    }
                },
                orderBy: { created_at: 'desc' }
            });

            return reviews;
        } catch (error) {
            throw new DatabaseError('Failed to fetch user reviews');
        }
    }

    /**
     * Update a review
     */
    async updateReview(reviewId: string, userId: string, data: {
        rating?: number;
        comment?: string;
    }) {
        try {
            // Validate rating if provided
            if (data.rating && (data.rating < 1 || data.rating > 5)) {
                throw new ValidationError('Rating must be between 1 and 5');
            }

            // Check if review exists and belongs to user
            const existingReview = await prisma.review.findFirst({
                where: {
                    id: reviewId,
                    user_id: userId
                }
            });

            if (!existingReview) {
                throw new NotFoundError('Review not found or unauthorized');
            }

            // Update the review
            const updatedReview = await prisma.review.update({
                where: { id: reviewId },
                data: {
                    rating: data.rating,
                    comment: data.comment,
                    updated_at: new Date()
                }
            });

            // If rating was updated, update service average rating
            if (data.rating) {
                const serviceReviews = await prisma.review.findMany({
                    where: { service_id: existingReview.service_id }
                });

                const averageRating = serviceReviews.reduce((acc: number, review: { rating: number }) => acc + review.rating, 0) / serviceReviews.length;

                await prisma.service.update({
                    where: { id: existingReview.service_id },
                    data: { average_rating: averageRating, total_reviews: serviceReviews.length }
                });
            }

            return updatedReview;
        } catch (error) {
            if (error instanceof ValidationError || error instanceof NotFoundError) {
                throw error;
            }
            throw new DatabaseError('Failed to update review');
        }
    }

    /**
     * Delete a review
     */
    async deleteReview(reviewId: string, userId: string) {
        try {
            const review = await prisma.review.findFirst({
                where: {
                    id: reviewId,
                    user_id: userId
                }
            });

            if (!review) {
                throw new NotFoundError('Review not found or unauthorized');
            }

            // Delete the review
            await prisma.review.delete({
                where: { id: reviewId }
            });

            // Update service average rating
            const serviceReviews = await prisma.review.findMany({
                where: { service_id: review.service_id }
            });

            if (serviceReviews.length > 0) {
                const averageRating = serviceReviews.reduce((acc: number, review: { rating: number }) => acc + review.rating, 0) / serviceReviews.length;

                await prisma.service.update({
                    where: { id: review.service_id },
                    data: { average_rating: averageRating, total_reviews: serviceReviews.length }
                });
            }

            return { message: 'Review deleted successfully' };
        } catch (error) {
            if (error instanceof NotFoundError) {
                throw error;
            }
            throw new DatabaseError('Failed to delete review');
        }
    }
}

export default ReviewService; 