import mongoose, { Document, Schema } from 'mongoose';

// Scenario Models
export interface IScenarioOption extends Document {
  text: string;
  isCorrect: boolean;
  nextStepId?: string;
  explanation: string;
}

export interface IScenarioStep extends Document {
  content: string;
  options: IScenarioOption[];
  feedback?: {
    positive?: string;
    negative?: string;
  };
  mediaUrl?: string;
  mediaType?: 'image' | 'video' | 'audio';
}

export interface IScenario extends Document {
  title: string;
  description: string;
  type: 'emergency' | 'communication' | 'careplan' | 'dailycare' | 'clientneeds';
  section: mongoose.Types.ObjectId;
  initialStep: string;
  steps: IScenarioStep[];
  passingScore: number;
  createdAt: Date;
  updatedAt: Date;
}

// Drag & Drop Models
export interface IDragDropItem extends Document {
  text: string;
  category: string;
  correctZone: string;
}

export interface IDragDropZone extends Document {
  name: string;
  description: string;
}

export interface IDragDropExercise extends Document {
  title: string;
  description: string;
  section: mongoose.Types.ObjectId;
  items: IDragDropItem[];
  zones: IDragDropZone[];
  passingScore: number;
  createdAt: Date;
  updatedAt: Date;
}

// Role Play Models
export interface IRole extends Document {
  name: string;
  description: string;
  keyPoints: string[];
}

export interface IEvaluationCriterion extends Document {
  criterion: string;
  weight: number;
}

export interface IRolePlayExercise extends Document {
  title: string;
  description: string;
  section: mongoose.Types.ObjectId;
  scenario: string;
  roles: IRole[];
  evaluationCriteria: IEvaluationCriterion[];
  createdAt: Date;
  updatedAt: Date;
}

// Schema Definitions
const scenarioOptionSchema = new Schema<IScenarioOption>({
  text: { type: String, required: true },
  isCorrect: { type: Boolean, required: true },
  nextStepId: { type: String },
  explanation: { type: String, required: true }
});

const scenarioStepSchema = new Schema<IScenarioStep>({
  content: { type: String, required: true },
  options: [scenarioOptionSchema],
  feedback: {
    positive: { type: String },
    negative: { type: String }
  },
  mediaUrl: { type: String },
  mediaType: { type: String, enum: ['image', 'video', 'audio'] }
});

const scenarioSchema = new Schema<IScenario>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    type: { 
      type: String, 
      enum: ['emergency', 'communication', 'careplan', 'dailycare', 'clientneeds'],
      required: true 
    },
    section: { type: Schema.Types.ObjectId, ref: 'Section', required: true },
    initialStep: { type: String, required: true },
    steps: [scenarioStepSchema],
    passingScore: { type: Number, required: true, default: 70 }
  },
  { timestamps: true }
);

const dragDropItemSchema = new Schema<IDragDropItem>({
  text: { type: String, required: true },
  category: { type: String, required: true },
  correctZone: { type: String, required: true }
});

const dragDropZoneSchema = new Schema<IDragDropZone>({
  name: { type: String, required: true },
  description: { type: String, required: true }
});

const dragDropExerciseSchema = new Schema<IDragDropExercise>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    section: { type: Schema.Types.ObjectId, ref: 'Section', required: true },
    items: [dragDropItemSchema],
    zones: [dragDropZoneSchema],
    passingScore: { type: Number, required: true, default: 70 }
  },
  { timestamps: true }
);

const roleSchema = new Schema<IRole>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  keyPoints: [{ type: String }]
});

const evaluationCriterionSchema = new Schema<IEvaluationCriterion>({
  criterion: { type: String, required: true },
  weight: { type: Number, required: true }
});

const rolePlayExerciseSchema = new Schema<IRolePlayExercise>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    section: { type: Schema.Types.ObjectId, ref: 'Section', required: true },
    scenario: { type: String, required: true },
    roles: [roleSchema],
    evaluationCriteria: [evaluationCriterionSchema]
  },
  { timestamps: true }
);

// Create and export models
export const Scenario = mongoose.model<IScenario>('Scenario', scenarioSchema);
export const DragDropExercise = mongoose.model<IDragDropExercise>('DragDropExercise', dragDropExerciseSchema);
export const RolePlayExercise = mongoose.model<IRolePlayExercise>('RolePlayExercise', rolePlayExerciseSchema);
