import { getAllLessons } from "@/lib/actions/Lesson.actions";
import ManageLessonsClient from "@/components/admin/ManageLessonsClient";

interface LessonData {
  _id: string;
  title: string;
  description: string;
  objectives: string[];
  lessonIndex: number;
  difficulty: string;
}

export default async function ManageLessonsPage() {
  let lessons: LessonData[] = [];

  try {
    const fetchedLessons = await getAllLessons();
    lessons = fetchedLessons as LessonData[];
  } catch (error) {
    console.error("Error fetching lessons:", error);
    // Return empty array if there's an error - the component will handle this
  }

  return <ManageLessonsClient initialLessons={lessons} />;
}
