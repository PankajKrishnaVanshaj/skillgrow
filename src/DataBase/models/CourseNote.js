import mongoose from "mongoose";

// Define the schema for course notes
const CourseNotesSchema = new mongoose.Schema(
  {
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CourseOutline", // Reference to the CourseOutline model
      required: true,
    },
    notes: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
  }
);

// Export the model, ensuring no duplicate registration
export default mongoose.models.CourseNotes ||
  mongoose.model("CourseNotes", CourseNotesSchema);
