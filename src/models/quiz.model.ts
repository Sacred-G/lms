import mongoose, { Document, Schema } from 'mongoose';

export interface IQuestion {
  text: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface IQuiz extends Document {
  title: string;
  description: string;
  section: mongoose.Types.ObjectId;
  questions: IQuestion[];
  passingScore: number;
  createdAt: Date;
  updatedAt: Date;
}

const quizSchema = new Schema<IQuiz>(
  {
    title: {
      type: String,
      required: [true, 'Quiz title is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Quiz description is required'],
      trim: true,
    },
    section: {
      type: Schema.Types.ObjectId,
      ref: 'Section',
      required: true,
    },
    questions: [
      {
        text: {
          type: String,
          required: [true, 'Question text is required'],
        },
        options: {
          type: [String],
          required: [true, 'Options are required'],
          validate: {
            validator: function(v: string[]) {
              return v.length >= 2; // At least 2 options
            },
            message: 'Quiz must have at least 2 options',
          },
        },
        correctAnswer: {
          type: Number,
          required: [true, 'Correct answer is required'],
        },
        explanation: {
          type: String,
          required: [true, 'Explanation is required'],
        },
      },
    ],
    passingScore: {
      type: Number,
      required: [true, 'Passing score is required'],
      min: [0, 'Passing score must be at least 0'],
      max: [100, 'Passing score cannot exceed 100'],
      default: 70,
    },
  },
  {
    timestamps: true,
  }
);

const Quiz = mongoose.model<IQuiz>('Quiz', quizSchema);

export default Quiz;
