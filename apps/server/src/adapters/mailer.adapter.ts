import { transporter } from "../config/mail.config.js";
import type { CreateBookingInput } from "../@types/interfaces.js";
import { Buffer } from 'buffer';
import PDFDocument from 'pdfkit';

// Remove the dynamic import initialization
// let PDFDocument: any;

// Initialize PDFKit
// const initializePDFKit = async () => {
//   PDFDocument = (await import('pdfkit')).default;
// };

// Initialize PDFKit when this module loads
// await initializePDFKit();

interface BookingConfirmationMailData {
  phoneOrEmail: string;
  booking: CreateBookingInput & {
    service: any;
    user: any;
  };
}

// function generateInvoicePDF(booking: any): Promise<Buffer> {
//   return new Promise((resolve) => {
//     const doc = new PDFDocument();
//     const chunks: Buffer[] = [];

//     doc.on('data', (chunk: Buffer) => chunks.push(chunk));
//     doc.on('end', () => resolve(Buffer.concat(chunks)));

//     // Add header
//     doc.fontSize(20)
//        .text('Palash Wellness', { align: 'center' })
//        .moveDown();

//     // Add invoice details
//     doc.fontSize(12)
//        .text(`Invoice Date: ${new Date().toLocaleDateString()}`)
//        .text(`Booking ID: ${booking.id}`)
//        .moveDown();

//     // Add customer details
//     doc.text(`Customer Name: ${booking.user.name}`)
//        .text(`Email/Phone: ${booking.user.email || booking.user.phone}`)
//        .moveDown();

//     // Add service details
//     doc.fontSize(14)
//        .text('Service Details', { underline: true })
//        .moveDown()
//        .fontSize(12)
//        .text(`Service: ${booking.service.name}`)
//        .text(`Date: ${booking.date.toLocaleDateString()}`)
//        .text(`Time: ${booking.time_slot}`)
//        .text(`Duration: ${booking.service.duration} minutes`)
//        .moveDown();

//     // Add payment details
//     doc.fontSize(14)
//        .text('Payment Details', { underline: true })
//        .moveDown()
//        .fontSize(10)
//        .text(`Subtotal: ${booking.service.currency || '₹'}${booking.service.price}`)
//        .text(`Discount: ${booking.service.discountPrice ? `${booking.service.currency || '₹'}${booking.service.discountPrice}` : 'N/A'}`)
//        .text(`Total Amount: ${booking.service.currency || '₹'}${booking.total_amount}`)
//        .moveDown();

//     // Add footer
//     doc.fontSize(8)
//        .text('Thank you for choosing Palash Wellness!', { align: 'center' })
//        .text('For any queries, please contact us at support@palashwellness.com', { align: 'center' });

//     doc.end();
//   });
// }

export async function sendBookingConfirmationAndInvoice(mailObj: any) {
    const { phoneOrEmail, booking } = mailObj;
    console.log("====== booking =======: ", phoneOrEmail);

    const emailTemplate = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px; background: #ffffff;">
            <div style="text-align: center; padding: 20px; background: #517d64; border-radius: 8px 8px 0 0;">
                <h1 style="color: #ffffff; margin: 0;">Booking Confirmation</h1>
            </div>
            
            <div style="padding: 30px; background: #f9f9f9; border-radius: 0 0 8px 8px;">
                <p style="font-size: 16px; color: #333;">Dear ${booking.user.name},</p>
                
                <p style="font-size: 16px; color: #333;">Your booking has been confirmed! Here are the details:</p>
                
                <div style="background: #ffffff; padding: 20px; border-radius: 8px; margin: 20px 0; border: 1px solid #eee;">
                    <h3 style="color: #517d64; margin-top: 0;">Service Details</h3>
                    <p style="margin: 5px 0;"><strong>Service:</strong> ${booking.service.name}</p>
                    <p style="margin: 5px 0;"><strong>Date:</strong> ${booking.date.toLocaleDateString()}</p>
                    <p style="margin: 5px 0;"><strong>Time:</strong> ${booking.time_slot}</p>
                    <p style="margin: 5px 0;"><strong>Duration:</strong> ${booking.service.duration} minutes</p>
                    <p style="margin: 5px 0;"><strong>Location:</strong> ${booking.service.isOnline ? 'Online Session' : 'In-Person'}</p>
                </div>

                ${booking.service.isOnline ? `
                <div style="background: #fff3cd; padding: 15px; border-radius: 8px; margin: 20px 0;">
                    <h3 style="color: #856404; margin-top: 0;">Online Session Details</h3>
                    <p style="margin: 5px 0;">Platform: ${booking.service.virtualMeetingDetails?.platform}</p>
                    <p style="margin: 5px 0;">Join Link: ${booking.service.virtualMeetingDetails?.joinLink}</p>
                    ${booking.service.virtualMeetingDetails?.password ? 
                      `<p style="margin: 5px 0;">Password: ${booking.service.virtualMeetingDetails.password}</p>` : ''}
                </div>
                ` : ''}

                <div style="background: #ffffff; padding: 20px; border-radius: 8px; margin: 20px 0; border: 1px solid #eee;">
                    <h3 style="color: #517d64; margin-top: 0;">Payment Details</h3>
                    <p style="margin: 5px 0;"><strong>Amount:</strong> ${booking.service.currency || '₹'}${booking.total_amount}</p>
                    <p style="margin: 5px 0;"><strong>Status:</strong> <span style="color: #28a745;">Paid</span></p>
                </div>

                ${booking.service.cancellationPolicy ? `
                <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin: 20px 0; font-size: 14px;">
                    <h4 style="color: #517d64; margin-top: 0;">Cancellation Policy</h4>
                    <p style="margin: 5px 0;">${booking.service.cancellationPolicy}</p>
                </div>
                ` : ''}

                <p style="font-size: 14px; color: #666; margin-top: 30px;">
                    Please find your invoice attached to this email. If you have any questions or need to make changes to your booking, 
                    please don't hesitate to contact us.
                </p>
            </div>
            
            <div style="text-align: center; padding: 20px; color: #666; font-size: 12px;">
                <p>© ${new Date().getFullYear()} Palash Wellness. All rights reserved.</p>
            </div>
        </div>
    `;

    // const pdfBuffer = await generateInvoicePDF(booking);

    await transporter.sendMail({
        from: `"Palash Wellness" <priyanshu-kun101@outlook.com>`,
        to: phoneOrEmail,
        subject: "Booking Confirmation - Palash Wellness",
        html: emailTemplate,
        attachments: [
            {
                filename: `invoice-${booking.id}.pdf`,
                // content: pdfBuffer,
                contentType: 'application/pdf'
            }
        ]
    });
}

export async function sendMail(mailObj: {phoneOrEmail: string; otp: string;}) {

    const {phoneOrEmail, otp} = mailObj;

    const emailTemplate = `
        <div style="font-family: Arial, sans-serif; max-width: 500px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px; background: #f9f9f9;">
            <h2 style="color: #4CAF50; text-align: center;">Palash Wellness App</h2>
            <p style="font-size: 16px; color: #333;">Hello,</p>
            <p style="font-size: 16px; color: #333;">Here is your OTP to verify your account:</p>
            <div style="text-align: center; font-size: 24px; font-weight: bold; color: #4CAF50; padding: 10px; border: 2px dashed #4CAF50; display: inline-block; margin: 10px auto;">
                ${otp}
            </div>
            <p style="font-size: 14px; color: #777;">This OTP is valid for 10 minutes. Do not share it with anyone.</p>
            <p style="font-size: 14px; color: #777;">If you didn't request this, you can ignore this email.</p>
            <hr style="border: none; border-top: 1px solid #ddd;">
            <p style="font-size: 12px; color: #999; text-align: center;">© ${new Date().getFullYear()} Palash Wellness App. All rights reserved.</p>
        </div>
    `;

    const info = await transporter.sendMail({
        from: `"Palash Wellness App" <priyanshu-kun101@outlook.com>`,
        to: phoneOrEmail,
        subject: "Your OTP Code",
        html: emailTemplate,
    });
}