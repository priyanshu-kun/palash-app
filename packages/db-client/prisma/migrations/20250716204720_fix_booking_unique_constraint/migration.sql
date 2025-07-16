/*
  Warnings:

  - A unique constraint covering the columns `[service_id,date,time_slot]` on the table `Booking` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Booking_service_id_date_key";

-- CreateIndex
CREATE UNIQUE INDEX "Booking_service_id_date_time_slot_key" ON "Booking"("service_id", "date", "time_slot");
