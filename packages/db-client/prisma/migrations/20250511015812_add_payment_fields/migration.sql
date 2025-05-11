-- AlterTable
ALTER TABLE "Payment" ADD COLUMN     "amount" DECIMAL(10,2),
ADD COLUMN     "currency" TEXT,
ADD COLUMN     "status" "PaymentStatus" DEFAULT 'PENDING';
