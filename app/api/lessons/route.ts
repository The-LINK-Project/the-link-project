import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/database";
import Lesson from "@/lib/database/models/lesson.model";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, description, objectives, lessonIndex, difficulty } = body;

    // Validate required fields
    if (!title || !description || !objectives || !difficulty || lessonIndex === undefined) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Validate difficulty
    if (!["beginner", "intermediate", "advanced"].includes(difficulty)) {
      return NextResponse.json(
        { error: "Invalid difficulty level" },
        { status: 400 }
      );
    }

    await connectToDatabase();

    // Check if lesson with this index already exists
    const existingLesson = await Lesson.findOne({ lessonIndex });
    if (existingLesson) {
      return NextResponse.json(
        { error: "Lesson with this index already exists" },
        { status: 409 }
      );
    }

    // Create new lesson
    const newLesson = new Lesson({
      title,
      description,
      objectives: objectives.filter((obj: string) => obj.trim() !== ""),
      lessonIndex,
      difficulty,
    });

    await newLesson.save();

    return NextResponse.json(
      { message: "Lesson created successfully", lesson: newLesson },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating lesson:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectToDatabase();
    
    const lessons = await Lesson.find({}).sort({ lessonIndex: 1 });
    
    return NextResponse.json({ lessons }, { status: 200 });
  } catch (error) {
    console.error("Error fetching lessons:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}