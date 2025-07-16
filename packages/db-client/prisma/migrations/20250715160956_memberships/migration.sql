-- CreateTable
CREATE TABLE "MembershipPlan" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "durationYears" INTEGER NOT NULL,
    "maxMembers" INTEGER NOT NULL,
    "renewalPeriodYears" INTEGER NOT NULL,
    "discountClubActivities" DOUBLE PRECISION NOT NULL,
    "discountDining" DOUBLE PRECISION NOT NULL,
    "discountAccommodations" DOUBLE PRECISION NOT NULL,
    "discountSpaActivities" DOUBLE PRECISION NOT NULL,
    "discountMedicalWellness" DOUBLE PRECISION NOT NULL,
    "referenceBenefits" DOUBLE PRECISION NOT NULL,
    "guestDiscount" DOUBLE PRECISION NOT NULL,
    "includesYogaGuidance" BOOLEAN NOT NULL,
    "includesDietChartFor" INTEGER NOT NULL,
    "includesDoctorConsultation" BOOLEAN NOT NULL,
    "panchkarmaWorth" INTEGER NOT NULL,
    "cost" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MembershipPlan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserMembership" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "planId" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserMembership_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "MembershipPlan_name_key" ON "MembershipPlan"("name");

-- AddForeignKey
ALTER TABLE "UserMembership" ADD CONSTRAINT "UserMembership_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserMembership" ADD CONSTRAINT "UserMembership_planId_fkey" FOREIGN KEY ("planId") REFERENCES "MembershipPlan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
