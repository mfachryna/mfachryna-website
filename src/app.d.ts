// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface Platform {}
	}
	
	// Extend the global namespace for Prisma
	// eslint-disable-next-line no-var
	var __prisma: import('@prisma/client').PrismaClient;
}

export {};
