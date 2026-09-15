import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { dev } from '$app/environment';

import { DATABASE_URL } from '$env/static/private';

/**
 * Prisma 7 removed `url` from the datasource block in schema.prisma. The
 * connection string is now supplied at runtime through a driver adapter
 * (here node-postgres), and to the CLI separately via prisma.config.ts.
 *
 * The adapter also owns the connection pool, which matters on serverless:
 * `max` caps how many connections a single instance can hold, so a burst of
 * cold starts cannot exhaust the database's connection limit.
 */
const globalForPrisma = global as unknown as {
	prisma: PrismaClient;
};

function createClient() {
	const adapter = new PrismaPg({
		connectionString: DATABASE_URL,
		max: dev ? 10 : 3,
		connectionTimeoutMillis: 5000,
		idleTimeoutMillis: 10000
	});

	return new PrismaClient({
		adapter,
		// Full query logging writes every statement and its parameters to the
		// hosting provider's logs. Keep it to dev only.
		log: dev ? ['query', 'info', 'warn', 'error'] : ['warn', 'error']
	});
}

export const prisma = globalForPrisma.prisma ?? createClient();

if (dev) globalForPrisma.prisma = prisma;
