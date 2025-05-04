/*
  Warnings:

  - Added the required column `date` to the `Payment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `Payment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `order_id` to the `Payment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `payment_id` to the `Payment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `signature` to the `Payment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `time_slot` to the `Payment` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Payment" DROP CONSTRAINT "Payment_booking_id_fkey";

-- AlterTable
ALTER TABLE "Payment" ADD COLUMN     "date" DATE NOT NULL,
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "order_id" TEXT NOT NULL,
ADD COLUMN     "payment_id" TEXT NOT NULL,
ADD COLUMN     "signature" TEXT NOT NULL,
ADD COLUMN     "time_slot" TEXT NOT NULL,
ALTER COLUMN "booking_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "Service"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_booking_id_fkey" FOREIGN KEY ("booking_id") REFERENCES "Booking"("id") ON DELETE SET NULL ON UPDATE CASCADE;
