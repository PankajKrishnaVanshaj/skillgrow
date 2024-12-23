import connectToDatabase from "@/DataBase/connectdb";
import { NextResponse } from "next/server";
import CourseNotes from "@/DataBase/models/CourseNote";
import { generateNotes } from "@/utils/CourseGeminiAIModal";

async function connectDB() {
  try {
    await connectToDatabase();
    console.log("Database connection successful");
  } catch (error) {
    console.error("Database connection error:", error.message);
    throw new Error("Database connection error");
  }
}

export async function POST(req) {
  try {
    // Connect to the database
    await connectDB();

    // Parse the request body
    const { courseId, layout } = await req.json();

    // Validate required parameters
    if (!courseId || !layout || !layout.chapters) {
      return NextResponse.json(
        { success: false, error: "Missing required parameters" },
        { status: 400 }
      );
    }

    const sanitizeString = (str) => {
      // Replace all occurrences of backslashes with double backslashes
      return str.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
    };

    const sanitizedChapters = layout.chapters.map((chapter) => {
      return {
        title: sanitizeString(chapter.title),
        summary: sanitizeString(chapter.summary),
        topics: chapter.topics.map(sanitizeString),
      };
    });

    const PROMPT = `Generate detailed exam material content for each chapter in HTML format. Do not include HTML, head, body, or title tags. Chapters: ${JSON.stringify(
      sanitizedChapters
    )}`;

    // Call the AI utility to generate notes
    const aiRes = await generateNotes.sendMessage(PROMPT);
    let aiResult = await aiRes.response.text();
    console.log("AI Response:", aiResult);

    // Ensure aiResult is not null or undefined
    if (!aiResult) {
      throw new Error("AI failed to generate course outline.");
    }

    // Save the notes to the database
    const newCourseNotes = await CourseNotes.create({
      courseId,
      notes: aiResult,
    });

    // Respond with success
    return NextResponse.json(
      { success: true, data: newCourseNotes },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating course notes:", error.message);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function GET(req) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (id) {
      // Fetch course notes by courseId
      const courseNotes = await CourseNotes.findOne({ courseId: id }); // Use findOne to query by courseId
      if (!courseNotes) {
        return NextResponse.json(
          { success: false, error: "Course notes not found" },
          { status: 404 }
        );
      }

      return NextResponse.json(
        { success: true, data: courseNotes },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error("Error in GET:", error.message);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
