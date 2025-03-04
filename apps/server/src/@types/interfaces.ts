import {WebhookEventType} from "./types.js";

export interface RequestBody_Create {
   name: string;
   media: File;
   description: string;
   price: string;
}

export interface RequestBody_Update {
   id?: string;
   name?: string;
   media?: File;
   description?: string;
   price?: string;
}


export interface SignUpDTO {
   name: string;
   username: string;
   phoneOrEmail: string;
   dob: string;
}


export interface SignInDTO {
   phoneOrEmail: string;
}


export interface VerifyOtpDTO {
   phoneOrEmail: string;
   otp: string;
}

export interface JWTKeysConfig {
   privateKeyFile: string;
   privateKeyPassphrase: string;
   publicKeyFile: string;
}


export interface CreateBookingInput {
  userId: string;
  serviceId: string;
  date: Date;
}

export interface ICreateInBulkAvailablityInput {
   isBookable: Boolean
   dates: []
}


export interface IPaymentConfig {
    keyId: string;
    keySecret: string;
    webhookSecret?: string;
}

export interface IOrderParams {
    amount: number;     
    currency?: string;  
    receiptId: string;  
    notes?: Record<string, string>; 
}

// Razorpay (orderID, paymentID, client Signature)
export interface IVerifyPaymentParams {
    orderId: string;    
    paymentId: string;  
    signature: string;  
}

export interface ICreateCustomerParams {
    name: string;
    email_or_phone: string;
    notes?: Record<string, string>;
}

export interface IPaymentDetails {
    id: string;
    entity: string;
    amount: number | string;
    currency: string;
    status: string;
    order_id: string;
    method: string;
    created_at: number;
}

export interface IWebhookEvent {
    entity: string;
    account_id: string;
    event: WebhookEventType;
    contains: string[];
    payload: {
        payment?: any;
        order?: any;
        refund?: any;
    };
    created_at: number;
}