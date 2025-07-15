import { Prisma } from "@prisma/client";
import { PrismaClient } from "../generated/client/index.js";

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