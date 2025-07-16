import { PrismaClient } from "../generated/client";

const prisma = new PrismaClient();

async function main() {

    await prisma.membershipPlan.createMany({
        data: [
            {
                name: "Silver",
                durationYears: 25,
                maxMembers: 4,
                renewalPeriodYears: 5,
                discountClubActivities: 25,
                discountDining: 25,
                discountAccommodations: 25,
                discountSpaActivities: 25,
                discountMedicalWellness: 10,
                referenceBenefits: 5,
                guestDiscount: 0,
                includesYogaGuidance: true,
                includesDietChartFor: 0,
                includesDoctorConsultation: true,
                panchkarmaWorth: 0,
                cost: 198000,
            },
            {
                name: "Gold",
                durationYears: 25,
                maxMembers: 4,
                renewalPeriodYears: 7,
                discountClubActivities: 25,
                discountDining: 25,
                discountAccommodations: 25,
                discountSpaActivities: 25,
                discountMedicalWellness: 15,
                referenceBenefits: 5,
                guestDiscount: 10,
                includesYogaGuidance: true,
                includesDietChartFor: 2,
                includesDoctorConsultation: true,
                panchkarmaWorth: 125000,
                cost: 298000,
            },
            {
                name: "Platinum",
                durationYears: 25,
                maxMembers: 6,
                renewalPeriodYears: 7,
                discountClubActivities: 25,
                discountDining: 25,
                discountAccommodations: 25,
                discountSpaActivities: 25,
                discountMedicalWellness: 15,
                referenceBenefits: 5,
                guestDiscount: 10,
                includesYogaGuidance: true,
                includesDietChartFor: 6,
                includesDoctorConsultation: true,
                panchkarmaWorth: 250000,
                cost: 395000,
            },
        ],
    });
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
