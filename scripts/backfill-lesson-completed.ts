import { connectToDatabase } from "@/lib/database";
import LessonProgress from "@/lib/database/models/lessonProgress.model";
import QuizResult from "@/lib/database/models/quizResult.model";

const SCORE_THRESHOLD = 80;

async function backfillLessonCompletion() {
    await connectToDatabase();

    const candidates = await LessonProgress.find({
        $or: [{ completed: { $exists: false } }, { completed: false }],
    });

    let updatedCount = 0;

    for (const progress of candidates) {
        // [].every() is true, so a progress document with no objectives
        // recorded would otherwise be marked complete without anyone doing
        // anything. No objectives means nothing has been met.
        const objectivesMet: boolean[] = Array.isArray(progress.objectivesMet)
            ? progress.objectivesMet
            : [];
        const objectivesCompleted =
            objectivesMet.length > 0 && objectivesMet.every((met: boolean) => met);

        let quizPassed = false;
        if (!objectivesCompleted) {
            quizPassed = !!(await QuizResult.exists({
                userId: progress.userId,
                lessonId: progress.lessonIndex,
                score: { $gte: SCORE_THRESHOLD },
            }));
        }

        if (objectivesCompleted || quizPassed) {
            await LessonProgress.updateOne(
                { _id: progress._id },
                { $set: { completed: true } },
            );
            updatedCount += 1;
        }
    }

    console.log(
        `Backfill complete. Updated ${updatedCount} of ${candidates.length} lessons.`,
    );
}

backfillLessonCompletion()
    .then(() => {
        process.exit(0);
    })
    .catch((error) => {
        console.error("Backfill failed:", error);
        process.exit(1);
    });
