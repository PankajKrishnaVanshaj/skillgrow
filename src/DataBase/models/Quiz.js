// @/DataBase/models/Quiz.js
import mongoose, { Schema, models } from "mongoose";

const Difficulty = {
  EASY: "Easy",
  MEDIUM: "Medium",
  HARD: "Hard",
};

const questionSchema = new Schema({
  question: { type: String, required: true },
  options: { type: [String], required: true, validate: [arrayMin4, "Must have 4 options"] },
  answer: { type: String, required: true },
});

function arrayMin4(val) {
  return val.length === 4;
}

const QuizSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    examOrClass: { type: String, required: true, trim: true }, // e.g., "10th"
    subject: { type: String, required: true, trim: true },   // e.g., "Physics"
    chapter: { type: String, required: true, trim: true },   // e.g., "Laws of Motion"
    difficulty: {
      type: String,
      enum: Object.values(Difficulty),
      required: true,
    },
    language: { type: String, required: true, default: "English" },
    number: { type: Number, required: true, min: 1, max: 20 },
    questions: { type: [questionSchema], required: true },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);



const QuizModel = models.Quiz || mongoose.model("Quiz", QuizSchema);
export default QuizModel;