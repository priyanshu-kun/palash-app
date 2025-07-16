-- AlterTable
ALTER TABLE "UserMembership" ADD COLUMN     "parentMembershipId" TEXT;

-- AddForeignKey
ALTER TABLE "UserMembership" ADD CONSTRAINT "UserMembership_parentMembershipId_fkey" FOREIGN KEY ("parentMembershipId") REFERENCES "UserMembership"("id") ON DELETE SET NULL ON UPDATE CASCADE;
