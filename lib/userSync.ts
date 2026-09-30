// User create/update/delete driven by the Clerk webhook. Deliberately NOT a
// "use server" file: these run with no session (the caller is Clerk, verified
// by svix signature in the route), so exposing them as server actions would
// make them public unauthenticated endpoints.
import mongoose from "mongoose";
import { connectToDatabase } from "@/lib/database";
import { revalidatePath } from "next/cache";

import User from "@/lib/database/models/user.model";
import LessonProgress from "@/lib/database/models/lessonProgress.model";
import QuizResult from "@/lib/database/models/quizResult.model";
import WordMatchResult from "@/lib/database/models/wordMatchResult.model";
import PictureStoryResult from "@/lib/database/models/pictureStoryResult.model";
import SurveyResponse from "@/lib/database/models/surveyResponse.model";

export async function createUser(user: {
    clerkId: string;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    photo: string;
}) {
    try {
        await connectToDatabase();

        const newUser = await User.create(user);

        return JSON.parse(JSON.stringify(newUser));
    } catch (error: any) {
        if (error?.code === 11000) {
            const existingUser = await User.findOne({
                $or: [{ clerkId: user.clerkId }, { email: user.email }],
            });

            if (existingUser) {
                return JSON.parse(JSON.stringify(existingUser));
            }
        }

        console.log(error);
        throw error;
    }
}

export async function updateUser(
    clerkId: string,
    user: {
        firstName: string;
        lastName: string;
        username?: string;
        photo: string;
    },
) {
    try {
        await connectToDatabase();

        const updatedUser = await User.findOneAndUpdate({ clerkId }, user, {
            new: true,
        });

        if (!updatedUser) throw new Error("User update failed");
        return JSON.parse(JSON.stringify(updatedUser));
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function deleteUser(clerkId: string) {
    try {
        await connectToDatabase();

        // Find user to delete
        const userToDelete = await User.findOne({ clerkId });

        // No row means there is nothing left to remove: either a Clerk retry
        // after an earlier run finished, or a user who never had a web User
        // row. Everything below is keyed by the row's _id, so without it
        // there is nothing to find. Throwing here would make the webhook 500
        // and Clerk would retry forever
        if (!userToDelete) {
            return null;
        }

        const userId = userToDelete._id;

        // Submitted survey responses were given as anonymous (see the note in
        // surveyResponse.model.ts), so they stay in the results and only lose
        // the link to the person. Each gets its own random id: unsetting
        // userId would collide on the unique {userId, surveyId} index once two
        // deleted users have answered the same survey, and one shared id
        // would still tie this person's responses to each other
        const submittedResponses = await SurveyResponse.find({
            userId,
            status: "submitted",
        })
            .select("_id")
            .lean<{ _id: mongoose.Types.ObjectId }[]>();

        if (submittedResponses.length > 0) {
            await SurveyResponse.bulkWrite(
                submittedResponses.map((response) => ({
                    updateOne: {
                        filter: { _id: response._id },
                        update: {
                            $set: { userId: new mongoose.Types.ObjectId() },
                        },
                    },
                })),
            );
        }

        // Everything still linked to the user is theirs, unsent survey drafts
        // and declines included: only submitting hands answers over
        await Promise.all([
            LessonProgress.deleteMany({ userId }),
            QuizResult.deleteMany({ userId }),
            WordMatchResult.deleteMany({ userId }),
            PictureStoryResult.deleteMany({ userId }),
            SurveyResponse.deleteMany({ userId }),
        ]);

        // The User row goes last. If anything above throws, Clerk retries and
        // the row is still here to find the rest of the data by
        const deletedUser = await User.findByIdAndDelete(userId);
        // Only the admin pages that list users or aggregate their results —
        // revalidating "/" would purge the cache of every route in the app
        revalidatePath("/admin");
        revalidatePath("/admin/users");
        revalidatePath("/admin/quiz");
        revalidatePath("/admin/surveys");

        return deletedUser ? JSON.parse(JSON.stringify(deletedUser)) : null;
    } catch (error) {
        console.log(error);
        throw error;
    }
}
