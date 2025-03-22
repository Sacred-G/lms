import mongoose, { Document, Schema } from 'mongoose';

export interface ISection extends Document {
  title: string;
  description: string;
  content: string;
  videoUrl: string;
  audioUrl: string;
  order: number;
  course: mongoose.Types.ObjectId;
  quiz: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const sectionSchema = new Schema<ISection>(
  {
    title: {
      type: String,
      required: [true, 'Section title is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Section description is required'],
      trim: true,
    },
    content: {
      type: String,
      required: [true, 'Section content is required'],
    },
    videoUrl: {
      type: String,
      required: [true, 'Video URL is required'],
    },
    audioUrl: {
      type: String,
      required: [true, 'Audio URL is required'],
    },
    order: {
      type: Number,
      required: true,
    },
    course: {
      type: Schema.Types.ObjectId,
      ref: 'Course',
      required: true,
    },
    quiz: {
      type: Schema.Types.ObjectId,
      ref: 'Quiz',
    },
  },
  {
    timestamps: true,
  }
);

const Section = mongoose.model<ISection>('Section', sectionSchema);

export default Section;
