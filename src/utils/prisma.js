import { PrismaClient } from '@prisma/client';

const globalForPrisma = global;

if (!globalForPrisma.prisma) {
  globalForPrisma.prisma = new PrismaClient({
    log: ['error'],
  });
}

const prisma = globalForPrisma.prisma;

export default prisma;

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}