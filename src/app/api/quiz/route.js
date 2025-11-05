import connectToDatabase from "@/DataBase/connectdb";
import QuizModel from "@/DataBase/models/Quiz";
import UserModel from "@/DataBase/models/user";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

async function connectDB() {
  try {
    await connectToDatabase();
  } catch (error) {
    console.error("Database connection error:", error.message);
    throw new Error("Database connection failed");
  }
}

// GET: Fetch quiz by ID or all quizzes by user
export async function GET(req) {
  try {
    await connectDB();
    const session = await getServerSession({ req });
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (id) {
      // Fetch single quiz
      const quiz = await QuizModel.findById(id).lean();
      if (!quiz) {
        return NextResponse.json(
          { success: false, error: "Quiz not found" },
          { status: 404 }
        );
      }
      return NextResponse.json({ success: true, data: quiz }, { status: 200 });
    }

    // Fetch all quizzes for logged-in user
    const email = session?.user?.email;
    if (!email) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const user = await UserModel.findOne({ email }).select("_id");
    if (!user) {
      return NextResponse.json(
        { success: false, error: "User not found" },
        { status: 404 }
      );
    }

    const quizzes = await QuizModel.find({ createdBy: user._id })
      .sort({ createdAt: -1 })
      .select("-questions") // Optional: reduce payload
      .lean();

    return NextResponse.json({ success: true, data: quizzes }, { status: 200 });
  } catch (error) {
    console.error("GET /api/quiz error:", error);
    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}

// POST: Create new quiz
export async function POST(req) {
  try {
    await connectDB();
    const session = await getServerSession({ req });

    const email = session?.user?.email;
    if (!email) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const user = await UserModel.findOne({ email }).select("_id");
    if (!user) {
      return NextResponse.json(
        { success: false, error: "User not found" },
        { status: 404 }
      );
    }

    const body = await req.json();
    const {
      questions: questionsJson,
      title: providedTitle,
      examOrClass,
      subject,
      chapter,
      difficulty,
      language = "English",
      number,
    } = body;

    // Validate required fields
    if (!examOrClass || !subject || !chapter || !difficulty || !number || !questionsJson) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Parse and validate questions
    let parsedQuestions;
    try {
      parsedQuestions = JSON.parse(questionsJson);
      if (!Array.isArray(parsedQuestions) || parsedQuestions.length === 0) {
        throw new Error("Questions must be a non-empty array");
      }
      if (parsedQuestions.length !== Number(number)) {
        console.warn(`Warning: Expected ${number} questions, got ${parsedQuestions.length}`);
      }
    } catch (err) {
      return NextResponse.json(
        { success: false, error: "Invalid JSON in questions" },
        { status: 400 }
      );
    }

    // Auto-generate title if not provided
    const title = providedTitle?.trim() || `${subject} - ${chapter} (Class ${examOrClass})`;

    const quizData = {
      title,
      examOrClass: examOrClass.trim(),
      subject: subject.trim(),
      chapter: chapter.trim(),
      difficulty,
      language,
      number: Number(number),
      questions: parsedQuestions,
      createdBy: user._id,
    };

    const newQuiz = new QuizModel(quizData);
    const savedQuiz = await newQuiz.save();

    return NextResponse.json(
      { success: true, data: savedQuiz },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/quiz error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to create quiz" },
      { status: 500 }
    );
  }
}