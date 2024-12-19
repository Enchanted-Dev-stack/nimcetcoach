import mongoose from 'mongoose';

const progressSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
    default: Date.now
  },
  tasks: {
    mathematics: { type: Boolean, default: false },
    logicalReasoning: { type: Boolean, default: false },
    computerAwareness: { type: Boolean, default: false },
    english: { type: Boolean, default: false },
    mockTests: { type: Boolean, default: false }
  },
  studyTime: {
    mathematics: { type: Number, default: 0 }, // time in seconds
    logicalReasoning: { type: Number, default: 0 },
    computerAwareness: { type: Number, default: 0 },
    english: { type: Number, default: 0 },
    mockTests: { type: Number, default: 0 }
  },
  notes: {
    type: String,
    default: ''
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export const Progress = mongoose.models.Progress || mongoose.model('Progress', progressSchema);
