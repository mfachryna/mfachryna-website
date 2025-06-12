import { PrismaClient } from '@prisma/client';

import { DATABASE_URL } from '$env/static/private';

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
	globalForPrisma.prisma ??
	new PrismaClient({
		log: ['query', 'info', 'warn', 'error'],
		datasources: {
			db: {
				url: DATABASE_URL
			}
		}
	});

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
