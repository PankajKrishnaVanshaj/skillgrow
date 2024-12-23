import mongoose, { Schema, models } from "mongoose";

const CourseOutlineSchema = new Schema(
  {
    topic: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      required: true,
    },
    language: {
      type: String,
      required: true,
      trim: true,
    },
    level: {
      type: String,
      required: true,
    },
    layout: {
      type: Schema.Types.Mixed,
      required: true,
    },

    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Export the model, handling potential re-registration issues
export default models.CourseOutline ||
  mongoose.model("CourseOutline", CourseOutlineSchema);
