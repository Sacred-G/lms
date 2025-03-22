import api from './api';
import { 
  InteractiveScenario, 
  ScenarioAttempt, 
  DragDropExercise, 
  RolePlayExercise 
} from '../types/interactive';

// Interactive service object with all methods
export const interactiveService = {
  // Get all scenarios for a section
  getSectionScenarios: async (sectionId: string): Promise<InteractiveScenario[]> => {
    const response = await api.get(`/interactive/scenarios/section/${sectionId}`);
    return response.data as InteractiveScenario[];
  },

  // Get a specific scenario
  getScenarioById: async (scenarioId: string): Promise<InteractiveScenario> => {
    const response = await api.get(`/interactive/scenarios/${scenarioId}`);
    return response.data as InteractiveScenario;
  },

  // Submit a scenario attempt
  submitScenarioAttempt: async (
    scenarioId: string, 
    attempt: Omit<ScenarioAttempt, 'scenarioId' | 'score' | 'passed' | 'completedAt'>
  ): Promise<ScenarioAttempt> => {
    const response = await api.post(`/interactive/scenarios/${scenarioId}/attempt`, attempt);
    return response.data as ScenarioAttempt;
  },

  // Get all drag-drop exercises for a section
  getSectionDragDropExercises: async (sectionId: string): Promise<DragDropExercise[]> => {
    const response = await api.get(`/interactive/dragdrop/section/${sectionId}`);
    return response.data as DragDropExercise[];
  },

  // Get a specific drag-drop exercise
  getDragDropExerciseById: async (exerciseId: string): Promise<DragDropExercise> => {
    const response = await api.get(`/interactive/dragdrop/${exerciseId}`);
    return response.data as DragDropExercise;
  },

  // Submit a drag-drop exercise attempt
  submitDragDropAttempt: async (
    exerciseId: string, 
    itemPlacements: { itemId: string, zoneId: string }[]
  ): Promise<{ score: number; passed: boolean; feedback: { itemId: string, correct: boolean, explanation: string }[] }> => {
    const response = await api.post(`/interactive/dragdrop/${exerciseId}/attempt`, { itemPlacements });
    return response.data;
  },

  // Get all role-play exercises for a section
  getSectionRolePlayExercises: async (sectionId: string): Promise<RolePlayExercise[]> => {
    const response = await api.get(`/interactive/roleplay/section/${sectionId}`);
    return response.data as RolePlayExercise[];
  },

  // Get a specific role-play exercise
  getRolePlayExerciseById: async (exerciseId: string): Promise<RolePlayExercise> => {
    const response = await api.get(`/interactive/roleplay/${exerciseId}`);
    return response.data as RolePlayExercise;
  },

  // Submit a role-play evaluation
  submitRolePlayEvaluation: async (
    exerciseId: string,
    evaluation: { 
      participantId: string, 
      criteriaScores: { criterionId: string, score: number }[],
      notes: string
    }
  ): Promise<{ overallScore: number; passed: boolean; feedback: string }> => {
    const response = await api.post(`/interactive/roleplay/${exerciseId}/evaluation`, evaluation);
    return response.data;
  }
};
