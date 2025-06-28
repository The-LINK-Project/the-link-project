'use server'
import { revalidatePath } from "next/cache"
import { connectToDatabase } from "@/lib/database"
import Quiz from "@/lib/database/models/quiz.model"
import mongoose from "mongoose"


export async function getQuizByLessonId(lessonId:string){
  try{
    await connectToDatabase()
    if (!mongoose.Types.ObjectId.isValid(lessonId)) {
      throw new Error("Invalid Lesson ID format")
    }
    const quiz = await Quiz.findOne({lessonId: new mongoose.Types.ObjectId(lessonId) })
    if (!quiz) {
      throw new Error("Quiz not found for this lesson")
    }
    // Alternative quick fix with JSON serialization
    const safeQuiz = JSON.parse(JSON.stringify(quiz));

    return safeQuiz;

  }catch (error) {
    console.error("Error fetching quiz:", error);
    throw error;
  }
}

export async function createTestQuiz(){
  try{
    await connectToDatabase();
    const lessonId = "60f8a8d5287f1e00203b5f9b"; // the fake lesson ID  I made

    // check if quiz exists 
    const existingQuiz = await Quiz.findOne({ lessonId: new mongoose.Types.ObjectId(lessonId) });
    if (existingQuiz) {
      await Quiz.findByIdAndDelete(existingQuiz._id);
    }
    const testQuiz = {
      lessonId: new mongoose.Types.ObjectId(lessonId),
      title: "Simple Present Tense Quiz",
      questions: [
        {
          questionText: "What is the correct form of the verb in: She ___ to work at 8 AM?",
          options: ["go", "goes", "going", "gone"],
          correctAnswerIndex: 1
        },
        {
          questionText: "Which sentence is correct?",
          options: [
            "He play football",
            "He plays football", 
            "He playing football", 
            "He played football"
          ],
          correctAnswerIndex: 1
        },
        {
          questionText: "Choose the correct sentence:",
          options: [
            "They doesn't work here", 
            "They don't works here", 
            "They don't working here", 
            "They don't work here"
          ],
          correctAnswerIndex: 3
        }
      ]
    };
    Quiz.create(testQuiz);
    revalidatePath(`/quiz/${lessonId}`);
    revalidatePath(`/results`)

} catch (error) {
    console.error("Error creating test quiz:", error );
    throw error;
  }
}
