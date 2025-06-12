import type { Tag } from "./experience";


export interface Project {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  imageUrl: string;
  thumbnailUrl?: string | null; 
  images?: string[];            
  githubUrl?: string | null;
  liveUrl?: string | null;
  featured: boolean;
  order: number;
  tags: string[] | Tag[];
  createdAt?: string | Date;
  updatedAt?: string | Date;
}

export interface ProjectWithTags extends Project {
  tags: Tag[];
}
