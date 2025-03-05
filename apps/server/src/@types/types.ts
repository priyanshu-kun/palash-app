export type HttpCodes = 200 | 201 | 202 | 401 | 400 | 403 | 404 | 500 | 501 | 502;


export type WebhookEventType =
    | 'payment.authorized'
    | 'payment.captured'
    | 'payment.failed'
    | 'refund.created'
    | 'refund.processed'
    | 'order.paid';



export type UserData = {
    name: string;
    phone_or_email: string;
    username: string;
    dob: string;
};