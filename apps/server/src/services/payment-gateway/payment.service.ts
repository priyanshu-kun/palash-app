import Razorpay from "razorpay";
import { createHmac } from "crypto";
import { ICreateCustomerParams, IOrderParams, IPaymentConfig, IPaymentDetails, IVerifyPaymentParams } from "../../@types/interfaces.js";

class PaymentGateway {
  private razorpay: Razorpay;
  private keyId: string;
  private keySecret: string;

  constructor(config: IPaymentConfig) {
    this.keyId = config.keyId;
    this.keySecret = config.keySecret;

    this.razorpay = new Razorpay({
      key_id: this.keyId,
      key_secret: this.keySecret,
    });

    console.info('Payment gateway initialized');
  }
  async createOrder(Order: IOrderParams): Promise<any> {
    try {
      return await this.razorpay.orders.create({
        amount: Order.amount * 100,
        currency: Order.currency || 'INR',
        receipt: Order.receiptId,
        notes: Order.notes
      })
    }
    catch (err: any) {
      throw new Error(`Failed to create order: ${err.message}`);
    }
  }
  verifyPaymentSignature(params: IVerifyPaymentParams): boolean {
    try {
      const generatedSig = createHmac('sha256', this.keySecret)
        .update(`${params.orderId}|${params.paymentId}`)
        .digest('hex');

      const isValid = generatedSig === params.signature;

      if (isValid) {
        console.info(`Payment verified successfully: ${params.paymentId}`);
      } else {
        console.warn(`Invalid payment signature: ${params.paymentId}`);
      }
      return isValid;
    }
    catch (err: any) {
      throw new Error(`Failed to verify order: ${err.message}`);
    }
  }
  async createRazorpayCustomer(params: ICreateCustomerParams): Promise<any> {
    try {
      return await this.razorpay.customers.create({
        name: params.name,
        contact: params.email_or_phone,
        notes: params.notes
      })
    }
    catch(err: any) {
      throw new Error(`Razorpay customer created: ${err.message}`);
    }
  }
  async getPaymentDetails(paymentId: string): Promise<IPaymentDetails> {
    try {
      return await this.razorpay.payments.fetch(paymentId);
    }
    catch(err: any) {
      throw new Error(`Failed to get payment details: ${err.message}`);
    }
  }
  async processRefund(paymentId: string, amount: string): Promise<any> {
    const refundOption: any = {}
    try {
      if(amount) {
        refundOption.amount = parseInt(amount) * 100;
      }
      return await this.razorpay.payments.refund(paymentId, refundOption);
    }
    catch(err: any) {
      throw new Error(`Failed to process refund: ${err.message}`);
    }
  }
}

export default PaymentGateway;