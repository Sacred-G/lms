export interface QuizAttempt {
  quiz: string;
  score: number;
  passed: boolean;
  attemptedAt: string;
}

export interface SectionProgress {
  section: string;
  completed: boolean;
  videoWatched: boolean;
  audioListened: boolean;
  contentRead: boolean;
  quizAttempts: QuizAttempt[];
  completedAt?: string;
}

export interface Progress {
  _id: string;
  user: string;
  course: {
    _id: string;
    title: string;
    description: string;
  };
  sectionsProgress: SectionProgress[];
  completed: boolean;
  completedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CourseProgress {
  _id: string;
  user: string;
  course: string;
  sectionsProgress: SectionProgress[];
  completed: boolean;
  completedAt?: string;
  createdAt: string;
  updatedAt: string;
}
