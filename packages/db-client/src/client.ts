import { Prisma } from "@prisma/client";
import { PrismaClient } from "../generated/client";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma || new PrismaClient({
    log: [
      {
        emit: 'stdout',
        level: 'query',
      },
      {
        emit: 'stdout',
        level: 'error',
      },
      {
        emit: 'stdout',
        level: 'info',
      },
      {
        emit: 'stdout',
        level: 'warn',
      },
    ],
  });


prisma.$on("query", (e: any) => {
  console.log("🛠 Executing Query:", e.query);
});

prisma.$on("info", (e: any) => {
  console.log("\nℹ️ Info:", e.message);
});

prisma.$on("warn", (e: any) => {
  console.warn("⚠️ Warning:", e.message);
});

prisma.$on("error", (e: any) => {
  console.error("❌ Error:", e.message);
});

export async function checkDatabaseConnection() {
  try {
    await prisma.$connect();
    console.log("\n\n✅ Database connected successfully!\n\n");
  } catch (error) {
    console.error("❌ Database connection failed:", error);
    process.exit(1); 
  }
}


if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;