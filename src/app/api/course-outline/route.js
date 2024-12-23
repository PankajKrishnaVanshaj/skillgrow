import connectToDatabase from "@/DataBase/connectdb";
import UserModel from "@/DataBase/models/user";
import { courseOutline } from "@/utils/CourseGeminiAIModal";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import CourseOutlineModel from "@/DataBase/models/CourseOutline";

async function connectDB() {
  try {
    await connectToDatabase();
    console.log("Database connection successful");
  } catch (error) {
    console.error("Database connection error:", error.message);
    throw new Error("Database connection error");
  }
}

// POST: Create a new course outline
export async function POST(req) {
  try {
    await connectDB();

    const session = await getServerSession({ req });
    const createdBy = session?.user?.email;

    if (!createdBy) {
      return NextResponse.json(
        { success: false, error: "Unauthorized: Missing user session" },
        { status: 401 }
      );
    }

    const user = await UserModel.findOne({ email: createdBy });
    if (!user) {
      return NextResponse.json(
        { success: false, error: "User not found" },
        { status: 404 }
      );
    }

    const { topic, type, difficulty, language } = await req.json();
    if (!topic || !type || !difficulty || !language) {
      return NextResponse.json(
        { success: false, error: "Missing required parameters" },
        { status: 400 }
      );
    }

    const PROMPT = `Generate a study material for the topic "${topic}" of type "${type}" with a difficulty level of "${difficulty}". 
    Provide the following in JSON format:
    1. A summary of the course.
    2. A list of chapters, with each chapter containing:
       - Title
       - Summary
       - List of topics covered in the chapter.
    The study material should be written in "${language}".`;

    const aiRes = await courseOutline.sendMessage(PROMPT);
    const aiResult = JSON.parse(await aiRes.response.text());

    if (!aiResult) {
      throw new Error("AI failed to generate course outline");
    }

    const newCourseOutline = await CourseOutlineModel.create({
      topic,
      type,
      level: difficulty,
      language,
      layout: aiResult,
      createdBy: user._id,
    });

    return NextResponse.json(
      { success: true, data: newCourseOutline },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error in POST:", error.message);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// GET: Retrieve course outlines
export async function GET(req) {
  try {
    await connectDB();

    const session = await getServerSession({ req });
    const createdBy = session?.user?.email;

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (id) {
      const courseOutline = await CourseOutlineModel.findById(id);
      if (!courseOutline) {
        return NextResponse.json(
          { success: false, error: "Course outline not found" },
          { status: 404 }
        );
      }
      return NextResponse.json(
        { success: true, data: courseOutline },
        { status: 200 }
      );
    }

    if (!createdBy) {
      return NextResponse.json(
        { success: false, error: "Unauthorized: Missing user session" },
        { status: 401 }
      );
    }

    const user = await UserModel.findOne({ email: createdBy });
    if (!user) {
      return NextResponse.json(
        { success: false, error: "User not found" },
        { status: 404 }
      );
    }

    const courseOutlines = await CourseOutlineModel.find({
      createdBy: user._id,
    });

    return NextResponse.json(
      { success: true, data: courseOutlines },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in GET:", error.message);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
