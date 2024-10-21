import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import UserModel from "@/DataBase/models/user";
import QuizModel from "@/DataBase/models/Quiz";
import connectToDatabase from "@/DataBase/connectdb";
import { authOptions } from "../../auth/[...nextauth]/options";

async function connectDB() {
  try {
    await connectToDatabase();
  } catch (error) {
    console.error("Database connection error:", error.message);
    throw new Error("Database connection error");
  }
}

export async function DELETE(req, { params }) {
  try {
    await connectDB();
    const session = await getServerSession({ req, authOptions });
    const { id } = params;

    const createdBy = session?.user?.email;
    if (!createdBy) {
      return NextResponse.json(
        { success: false, error: "Missing createdBy parameter" },
        { status: 400 }
      );
    }

    // Find the user by email
    const user = await UserModel.findOne({ email: createdBy });
    if (!user) {
      return NextResponse.json(
        { success: false, error: "User not found" },
        { status: 404 }
      );
    }

    // Find the quiz by ID
    const quiz = await QuizModel.findById(id);
    if (!quiz) {
      return NextResponse.json(
        { success: false, error: "Quiz not found" },
        { status: 404 }
      );
    }

    // Check if the user is the creator of the quiz
    if (quiz.createdBy.toString() !== user._id.toString()) {
      return NextResponse.json(
        { success: false, error: "Not authorized to delete this quiz" },
        { status: 403 }
      );
    }

    // Delete the quiz
    await QuizModel.findByIdAndDelete(id);

    return NextResponse.json(
      { success: true, message: "Quiz deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error occurred:", error.message);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
