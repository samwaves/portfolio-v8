// src/types/project.ts

export type ProjectImage = string | { src: string; caption?: string };

export interface Project {
  id: string;
  title: string;
  technologies: string[];
  description: string;
  thumbnail?: string;
  images: ProjectImage[];
  linkUrl?: string;
  githubUrl?: string;
}

export interface ProjectCategory {
  title: string;
  projects: Project[];
}
