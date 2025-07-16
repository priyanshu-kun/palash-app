-- CreateEnum
CREATE TYPE "PaymentType" AS ENUM ('SERVICE', 'MEMBERSHIP');

-- DropForeignKey
ALTER TABLE "Payment" DROP CONSTRAINT "Payment_service_id_fkey";

-- AlterTable
ALTER TABLE "Payment" ADD COLUMN     "membership_id" TEXT,
ADD COLUMN     "payment_type" "PaymentType" NOT NULL DEFAULT 'SERVICE',
ALTER COLUMN "service_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "Service"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_membership_id_fkey" FOREIGN KEY ("membership_id") REFERENCES "UserMembership"("id") ON DELETE SET NULL ON UPDATE CASCADE;
