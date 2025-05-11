import { Router } from "express";
import PaymentGatewayController from "../../controllers/payment-gateway/payment-gateway.controller.js"; 

const router = Router();
const paymentInstance = new PaymentGatewayController();

router.post('/create-order', paymentInstance.createOrder);
router.post('/verify-payment', paymentInstance.verifyPayment);
router.post('/create-new-customer', paymentInstance.newRazorpayCustomer);
router.get('/fetch-payment-details/:userId', paymentInstance.fetchPaymentDetails);
router.post('/process-refund', paymentInstance.processRefund);

export default router;