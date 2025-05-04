import Razorpay from "razorpay";
import { createHmac } from "crypto";
import { ICreateCustomerParams, IOrderParams, IPaymentConfig, IPaymentDetails, IVerifyPaymentParams } from "../../@types/interfaces.js";
import { prisma } from "@palash/db-client";
import { v4 as uuidv4 } from 'uuid';

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
  async createOrder(order: IOrderParams): Promise<any> {
    try {
      const { userId, serviceId } = order;
      
      const service = await prisma.service.findUnique({
        where: { id: serviceId }
      });

      
      if (!service) {
        throw new Error(`Service with ID ${serviceId} not found`);
      }
      
      const user = await prisma.user.findUnique({
        where: { id: userId }
      });

      
      if (!user) {
        throw new Error(`User with ID ${userId} not found`);
      }
      
      const receiptId = `receipt_${uuidv4().replace(/-/g, '')}`;

      return await this.razorpay.orders.create({
        amount: service.price * 100,
        currency: 'INR',
        receipt: receiptId,
        notes: {
          title: service.name,
          description: service.description.slice(0, 250),
          access: service.access || "QUARTERLY",
          category: service.category,
          price: service.price.toString(),
          userId: user.id,
          serviceId: service.id
        }
      });
    }
    catch (err: any) {
      // Consider more specific error handling
      throw new Error(`Failed to create order: ${err}`);
    }
  }
  async verifyPaymentSignature(params: IVerifyPaymentParams): Promise<boolean> {
    try {
      const generatedSig = createHmac('sha256', this.keySecret)
        .update(`${params.orderId}|${params.paymentId}`)
        .digest('hex');

      const isValid = generatedSig === params.signature;

      /**
       *  booking_id String?
  service_id String
  user_id String  
  email String
  order_id String
  payment_id String
  signature String
  date DateTime @db.Date
  time_slot String
       */

      await prisma.payment.create({
        data: {
          order_id: params.orderId,
          payment_id: params.paymentId,
          signature: params.signature,
          user_id: params.userId,
          service_id: params.serviceId,
          date: params.date,
          time_slot: params.timeSlot,
          email: params.email
        }
      })

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