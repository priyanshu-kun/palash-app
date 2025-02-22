// Transaction Management Utility (transaction.ts)
import { PrismaClient } from '../generated/client';

export const prisma = new PrismaClient();

export async function withTransaction<T>(
  callback: (tx: PrismaClient) => Promise<T>
): Promise<T> {
  return prisma.$transaction(async (tx: any) => {
    return await callback(tx);
  });
}