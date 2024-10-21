import mongoose, { Schema, models } from "mongoose";

// Define enums for Difficulty and Format
const Difficulty = {
  EASY: "Easy",
  MEDIUM: "Medium",
  HARD: "Hard",
};

// const Format = {
//   MULTIPLE_CHOICE: "Multiple Choice",
//   OPEN_ENDED: "Open-Ended",
// };

// Define the Question Schema
const questionSchema = new Schema({
  question: {
    type: String,
    required: true,
  },
  answer: {
    type: String,
    required: true,
  },
  options: {
    type: [String],
    required: true,
    // required: function () {
    //   return this.format === Format.MULTIPLE_CHOICE;
    // },
  },
});

// Define the Quiz Schema
const QuizSchema = new Schema(
  {
    title: { type: String, required: true },
    topic: { type: String, required: true },
    difficulty: {
      type: String,
      enum: Object.values(Difficulty),
      required: true,
    },
    // format: { type: String, enum: Object.values(Format), required: true },
    number: { type: Number, required: true, min: 1, max: 20 },
    questions: {
      type: [questionSchema],
      required: true,
    },
    createdBy: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Check if the model already exists, otherwise define it
const QuizModel = models.Quiz || mongoose.model("Quiz", QuizSchema);

export default QuizModel;
