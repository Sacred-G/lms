import { Section } from './section';

// Basic course information
export interface Course {
  _id: string;
  title: string;
  description: string;
  coverImage: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

// Course with sections included
export interface CourseDetails extends Course {
  sections: Section[];
}
