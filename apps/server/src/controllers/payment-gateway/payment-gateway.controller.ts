import {Request, Response, NextFunction} from "express";
import { ICreateCustomerParams, IVerifyPaymentParams } from "../../@types/interfaces.js";
import PaymentGateway from "../../services/payment-gateway/payment.service.js";
import { razorpayConfig } from "../../config/razorpay.config.js";

class PaymentGatewayController {
    private paymentGatewayInstance;
    constructor() {
        this.paymentGatewayInstance = new PaymentGateway(razorpayConfig);
    }
    async verifyPayment(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const params: IVerifyPaymentParams = req.body;
            const verifiedPayment = this.paymentGatewayInstance.verifyPaymentSignature(params); 
            if(!verifiedPayment) {
                return res.status(401).json({message: "UnVerified transaction"}); 
            }
            return res.json({message: "Verified transaction"}); 
        }
        catch(err: any) {
            console.log(err);
            return res.status(500).json(err);
        }
    }

    async newRazorpayCustomer(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const params: ICreateCustomerParams = req.body;
            const customer = await this.paymentGatewayInstance.createRazorpayCustomer(params); 
            res.json({message: "New customer created!"})
        }
        catch(err: any) {
            console.log(err);
            return res.status(500).json(err);
        }
    }

    async fetchPaymentDetails(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const {paymentId} = req.body;
            const details = await this.paymentGatewayInstance.getPaymentDetails(paymentId); 
            res.json(details)
        }
        catch(err: any) {
            console.log(err);
            return res.status(500).json(err);
        }
    }


    async processRefund(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const {paymentId, amount}: {paymentId: string; amount: string} = req.body;
            await this.paymentGatewayInstance.processRefund(paymentId, amount); 
            res.json({message: "Refund Issued"})
        }
        catch(err: any) {
            console.log(err);
            return res.status(500).json(err);
        }
    }
}

export default  PaymentGatewayController;