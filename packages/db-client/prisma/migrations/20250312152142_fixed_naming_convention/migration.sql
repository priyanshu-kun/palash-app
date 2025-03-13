/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Availability` table. All the data in the column will be lost.
  - You are about to drop the column `isBookable` on the `Availability` table. All the data in the column will be lost.
  - You are about to drop the column `serviceId` on the `Availability` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Availability` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[service_id,date]` on the table `Availability` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `service_id` to the `Availability` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `Availability` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Availability" DROP CONSTRAINT "Availability_serviceId_fkey";

-- DropIndex
DROP INDEX "Availability_serviceId_date_key";

-- AlterTable
ALTER TABLE "Availability" DROP COLUMN "createdAt",
DROP COLUMN "isBookable",
DROP COLUMN "serviceId",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "is_bookable" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "service_id" TEXT NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Availability_service_id_date_key" ON "Availability"("service_id", "date");

-- AddForeignKey
ALTER TABLE "Availability" ADD CONSTRAINT "Availability_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "Service"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
