export interface Tag {
	id: number;
	name: string;
	iconUrl?: string | null;
	createdAt?: Date;
	updatedAt?: Date;
}

export interface Experience {
	id: number;
	title: string;
	company: string;
	role: string;
	location: string;
	highlights: string[];
	startDate: Date | string;
	endDate?: Date | string | null;
	content: string;
	createdAt?: Date | string;
	updatedAt?: Date | string;
}

export interface ExperienceWithTags extends Experience {
	tags: Tag[];
}

export interface PaginatedResponse<T> {
	data: T[];
	pagination: {
		page: number;
		limit: number;
		totalItems: number;
		totalPages: number;
	};
}
