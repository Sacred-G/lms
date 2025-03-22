import mongoose, { Document, Schema } from 'mongoose';

export interface IQuizAttempt {
  quiz: mongoose.Types.ObjectId;
  score: number;
  passed: boolean;
  attemptedAt: Date;
}

export interface ISectionProgress {
  section: mongoose.Types.ObjectId;
  completed: boolean;
  videoWatched: boolean;
  audioListened: boolean;
  contentRead: boolean;
  quizAttempts: IQuizAttempt[];
  completedAt?: Date;
}

export interface IProgress extends Document {
  user: mongoose.Types.ObjectId;
  course: mongoose.Types.ObjectId;
  sectionsProgress: ISectionProgress[];
  completed: boolean;
  completedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const progressSchema = new Schema<IProgress>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    course: {
      type: Schema.Types.ObjectId,
      ref: 'Course',
      required: true,
    },
    sectionsProgress: [
      {
        section: {
          type: Schema.Types.ObjectId,
          ref: 'Section',
          required: true,
        },
        completed: {
          type: Boolean,
          default: false,
        },
        videoWatched: {
          type: Boolean,
          default: false,
        },
        audioListened: {
          type: Boolean,
          default: false,
        },
        contentRead: {
          type: Boolean,
          default: false,
        },
        quizAttempts: [
          {
            quiz: {
              type: Schema.Types.ObjectId,
              ref: 'Quiz',
              required: true,
            },
            score: {
              type: Number,
              required: true,
            },
            passed: {
              type: Boolean,
              required: true,
            },
            attemptedAt: {
              type: Date,
              default: Date.now,
            },
          },
        ],
        completedAt: {
          type: Date,
        },
      },
    ],
    completed: {
      type: Boolean,
      default: false,
    },
    completedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const Progress = mongoose.model<IProgress>('Progress', progressSchema);

export default Progress;
