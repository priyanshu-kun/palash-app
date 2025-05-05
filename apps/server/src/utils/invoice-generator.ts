import puppeteer from 'puppeteer';
import { format } from 'date-fns';
import type { CreateBookingInput } from "../@types/interfaces.js";

export async function generateInvoicePDF(booking: any): Promise<Buffer> {
  try {
    // Format date for invoice
    const invoiceDate = format(new Date(), 'MMM dd, yyyy');
    const bookingDate = format(new Date(booking.date), 'MMM dd, yyyy');
    
    // Get service and payment details
    const { service, user, payment, total_amount } = booking;
    const invoiceNumber = `INV-${payment.payment_id.substring(4, 12)}`;
    const currency = service.currency || 'INR';

    // Generate HTML content
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
       
      </head>
      <body>
    <h1>Hello World</h1> 
      </body>
      </html>
    `;

    // Launch Puppeteer
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    
    // Set content and generate PDF
    await page.setContent(htmlContent);
    const pdfBuffer = await page.pdf({
      format: 'A4',
      margin: { top: '20mm', right: '20mm', bottom: '20mm', left: '20mm' },
      printBackground: true
    });

    // Close browser
    await browser.close();

    return Buffer.from(pdfBuffer);
  } catch (error) {
    console.error('Error generating invoice PDF:', error);
    throw error;
  }
}

function formatDuration(minutes: number): string {
  if (minutes < 60) {
    return `${minutes} minutes`;
  }
  
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  
  if (remainingMinutes === 0) {
    return `${hours} hour${hours > 1 ? 's' : ''}`;
  }
  
  return `${hours} hour${hours > 1 ? 's' : ''} ${remainingMinutes} minute${remainingMinutes > 1 ? 's' : ''}`;
}

function formatLocation(location: any): string {
  const parts = [];
  
  if (location.address) parts.push(location.address);
  if (location.city) parts.push(location.city);
  if (location.state) parts.push(location.state);
  if (location.postalCode) parts.push(location.postalCode);
  if (location.country) parts.push(location.country);
  
  return parts.join(', ');
}