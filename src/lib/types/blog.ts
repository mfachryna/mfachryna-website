import type { Tag } from '@prisma/client';

export interface Blog {
	id: number;
	title: string;
	slug: string;
	description: string;
	content: string;
	excerpt?: string | null;
	imageUrl?: string | null;
	images?: string[];
	published: boolean;
	publishedAt: string | Date | null;
	featured?: boolean;
	readingTime?: number | null;
	views?: number;
	tags: string[] | Tag[];
	createdAt?: string | Date;
	updatedAt?: string | Date;
}

export interface BlogWithTags extends Blog {
	tags: Tag[];
}
