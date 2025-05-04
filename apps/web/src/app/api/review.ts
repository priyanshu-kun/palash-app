import { Review } from "../@types/interface";
import api from "./config";

export const createReview = async (review: Review) => {
  const response = await api.post("/reviews/create-review", review);
  return response.data;
};

export const getReviews = async (serviceId: string) => {
  const response = await api.get(`/reviews/service/${serviceId}`);
  return response.data;
};


export const getUserReviews = async () => {
  const response = await api.get("/reviews/user/me");
  return response.data;
};

export const updateReview = async (reviewId: string, review: Review) => {
  const response = await api.patch(`/reviews/${reviewId}`, review);
  return response.data;
};  

export const deleteReview = async (reviewId: string) => {
  const response = await api.delete(`/reviews/${reviewId}`);
  return response.data;
};  








