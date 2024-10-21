import connectToDatabase from "@/DataBase/connectdb";
import QuizModel from "@/DataBase/models/Quiz";
import UserModel from "@/DataBase/models/user";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

async function connectDB() {
  try {
    await connectToDatabase();
    console.log("Database connection successful");
  } catch (error) {
    console.error("Database connection error:", error.message);
    throw new Error("Database connection error");
  }
}

export async function GET(req) {
  try {
    const session = await getServerSession({ req });
    await connectDB();

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (id) {
      try {
        const quiz = await QuizModel.findById(id);
        if (!quiz) {
          return NextResponse.json(
            { success: false, error: "quiz not found" },
            { status: 404 }
          );
        }
        return NextResponse.json(
          { success: true, data: quiz },
          { status: 200 }
        );
      } catch (error) {
        console.error("Error fetching quiz details:", error);
        return NextResponse.json(
          { success: false, error: "Server Error" },
          { status: 500 }
        );
      }
    } else {
      const createdBy = session?.user?.email;
      if (!createdBy) {
        return NextResponse.json(
          { success: false, error: "Missing createdBy parameter" },
          { status: 400 }
        );
      }

      const user = await UserModel.findOne({ email: createdBy });

      if (!user) {
        return NextResponse.json(
          { success: false, error: "User not found" },
          { status: 404 }
        );
      }

      const quizData = await QuizModel.find({
        createdBy: user._id,
      });

      return NextResponse.json(
        { success: true, data: quizData },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error("Error occurred:", error.message);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    await connectDB();
    const session = await getServerSession({ req });

    // Ensure a valid session and retrieve the user's email
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

    // Extract quiz data from the request body
    const { title, topic, difficulty, number, questions } = await req.json();

    // Parse the questions to ensure they are in the correct format
    let parsedQuestions;
    try {
      parsedQuestions = JSON.parse(questions);
      if (!Array.isArray(parsedQuestions)) {
        throw new Error("Questions must be provided as an array");
      }
    } catch (error) {
      return NextResponse.json(
        { success: false, error: "Invalid questions format" },
        { status: 400 }
      );
    }

    // Construct the QuizData object
    const quizData = {
      title,
      topic,
      difficulty,
      number,
      questions: parsedQuestions,
      createdBy: user._id, // Assign the user's ObjectId to createdBy
    };

    // Create a new QuizModel instance
    const newQuiz = new QuizModel(quizData);

    // Save the quiz to the database
    const savedQuiz = await newQuiz.save();

    // Return success response with the saved quiz data
    return NextResponse.json(
      { success: true, data: savedQuiz },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error occurred:", error.message);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
