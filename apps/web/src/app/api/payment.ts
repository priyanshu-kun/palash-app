import axios from 'axios';
import api from './config';

export interface CreateOrderParams {
  userId: string;
  serviceId: string;
}

export const createOrder = async (params: CreateOrderParams) => {
  const response = await api.post('/payment/create-order', params);
  return response.data;
};

export const verifyPayment = async (params: {
  orderId: string;
  paymentId: string;
  signature: string;
  userId: string;
  serviceId: string;
  date: string;
  timeSlot: string;
  email: string;
}) => {
  const response = await api.post('/payment/verify-payment', params);
  return response.data;
};

