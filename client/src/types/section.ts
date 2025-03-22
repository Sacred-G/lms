import { Quiz } from './quiz';

export interface Section {
  _id: string;
  title: string;
  description: string;
  content: string;
  textContent?: string; // Added for text content display
  videoUrl: string;
  audioUrl: string;
  order: number;
  course: string;
  quiz?: string | Quiz;
  createdAt: string;
  updatedAt: string;
}
