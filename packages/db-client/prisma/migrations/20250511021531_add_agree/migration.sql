-- AlterTable
ALTER TABLE "User" ADD COLUMN     "is_agreed_to_terms" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "is_verified" BOOLEAN NOT NULL DEFAULT false;
