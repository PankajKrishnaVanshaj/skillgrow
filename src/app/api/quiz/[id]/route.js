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
    throw new Error("Database connection failed");
  }
}

export async function DELETE(req, { params }) {
  try {
    await connectDB();

    // Get session with authOptions
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { id } = params;
    if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
      return NextResponse.json(
        { success: false, error: "Invalid quiz ID" },
        { status: 400 }
      );
    }

    // Find user by email
    const user = await UserModel.findOne({ email: session.user.email }).select("_id");
    if (!user) {
      return NextResponse.json(
        { success: false, error: "User not found" },
        { status: 404 }
      );
    }

    // Find quiz
    const quiz = await QuizModel.findOne({
      _id: id,
      createdBy: user._id,
    });

    if (!quiz) {
      return NextResponse.json(
        { success: false, error: "Quiz not found or not authorized" },
        { status: 404 }
      );
    }

    // Delete the quiz
    await QuizModel.findByIdAndDelete(id);

    return NextResponse.json(
      { success: true, message: "Quiz deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("DELETE /api/quiz/[id] error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete quiz" },
      { status: 500 }
    );
  }
}