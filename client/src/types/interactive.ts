// Interactive scenario types for the LMS

export type ScenarioType = 'emergency' | 'communication' | 'careplan' | 'dailycare' | 'clientneeds';

export interface ScenarioStep {
  _id: string;
  content: string;
  options: ScenarioOption[];
  feedback?: {
    positive?: string;
    negative?: string;
  };
  mediaUrl?: string;
  mediaType?: 'image' | 'video' | 'audio';
}

export interface ScenarioOption {
  _id: string;
  text: string;
  isCorrect: boolean;
  nextStepId?: string;
  explanation: string;
}

export interface InteractiveScenario {
  _id: string;
  title: string;
  description: string;
  type: ScenarioType;
  section: string;
  initialStep: string;
  steps: ScenarioStep[];
  passingScore: number;
  createdAt: string;
  updatedAt: string;
}

export interface ScenarioAttempt {
  scenarioId: string;
  stepResponses: {
    stepId: string;
    optionSelected: string;
    isCorrect: boolean;
  }[];
  score: number;
  passed: boolean;
  completedAt: string;
}

export interface DragDropItem {
  _id: string;
  text: string;
  category: string;
  correctZone: string;
}

export interface DragDropExercise {
  _id: string;
  title: string;
  description: string;
  section: string;
  items: DragDropItem[];
  zones: {
    _id: string;
    name: string;
    description: string;
  }[];
  passingScore: number;
  createdAt: string;
  updatedAt: string;
}

export interface RolePlayExercise {
  _id: string;
  title: string;
  description: string;
  section: string;
  scenario: string;
  roles: {
    _id: string;
    name: string;
    description: string;
    keyPoints: string[];
  }[];
  evaluationCriteria: {
    _id: string;
    criterion: string;
    weight: number;
  }[];
  createdAt: string;
  updatedAt: string;
}
