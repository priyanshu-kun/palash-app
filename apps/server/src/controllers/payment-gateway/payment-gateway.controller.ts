import {Request, Response, NextFunction} from "express";
import { ICreateCustomerParams, IVerifyPaymentParams, IOrderParams, CreateBookingInput } from "../../@types/interfaces.js";
import PaymentGateway from "../../services/payment-gateway/payment.service.js";
import { razorpayConfig } from "../../config/razorpay.config.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { ValidationError, UnauthorizedError, NotFoundError } from "../../utils/errors.js";

class PaymentGatewayController {
    private paymentGatewayInstance: PaymentGateway;

    constructor() {
        this.paymentGatewayInstance = new PaymentGateway(razorpayConfig);
    }

    createOrder = asyncHandler(async (req: Request, res: Response) => {
        const params: IOrderParams = req.body;
        
        if (!params.userId || !params.serviceId) {
            throw new ValidationError('Send, User ID, Service ID are required');
        }
        const order = await this.paymentGatewayInstance.createOrder(params);
        return res.json(order);
    }); 
    

    verifyPayment = asyncHandler(async (req: Request, res: Response) => {
        const params: IVerifyPaymentParams = req.body;
        
        if (!params.orderId || !params.paymentId || !params.signature) {
            throw new ValidationError('Order ID, payment ID and signature are required');
        }

        const verifiedPayment = this.paymentGatewayInstance.verifyPaymentSignature(params);
        
        if (!verifiedPayment) {
            throw new UnauthorizedError('Payment verification failed');
        }

        return res.json({ message: "Verified transaction" });
    });

    newRazorpayCustomer = asyncHandler(async (req: Request, res: Response) => {
        const params: ICreateCustomerParams = req.body;
        
        if (!params.name || !params.email_or_phone) {
            throw new ValidationError('Name and email/phone are required');
        }

        const customer = await this.paymentGatewayInstance.createRazorpayCustomer(params);
        return res.json({ message: "New customer created!", customer });
    });

    fetchPaymentDetails = asyncHandler(async (req: Request, res: Response) => {
        const { paymentId } = req.body;
        
        if (!paymentId) {
            throw new ValidationError('Payment ID is required');
        }

        const details = await this.paymentGatewayInstance.getPaymentDetails(paymentId);
        
        if (!details) {
            throw new NotFoundError(`Payment details not found for ID ${paymentId}`);
        }

        return res.json(details);
    });

    processRefund = asyncHandler(async (req: Request, res: Response) => {
        const { paymentId, amount }: { paymentId: string; amount: string } = req.body;
        
        if (!paymentId || !amount) {
            throw new ValidationError('Payment ID and amount are required');
        }

        await this.paymentGatewayInstance.processRefund(paymentId, amount);
        return res.json({ message: "Refund Issued" });
    });
}

export default  PaymentGatewayController;