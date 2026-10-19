// User create/update/delete driven by the Clerk webhook. Deliberately NOT a
// "use server" file: these run with no session (the caller is Clerk, verified
// by svix signature in the route), so exposing them as server actions would
// make them public unauthenticated endpoints.
import mongoose from "mongoose";
import { connectToDatabase } from "@/lib/database";
import { revalidatePath } from "next/cache";
import { clerkClient } from "@clerk/nextjs/server";
import { isClerkAPIResponseError } from "@clerk/nextjs/errors";

import User from "@/lib/database/models/user.model";
import DeletedUser from "@/lib/database/models/deletedUser.model";
import LessonProgress from "@/lib/database/models/lessonProgress.model";
import LearnerProgress from "@/lib/database/models/learnerProgress.model";
import QuizResult from "@/lib/database/models/quizResult.model";
import WordMatchResult from "@/lib/database/models/wordMatchResult.model";
import PictureStoryResult from "@/lib/database/models/pictureStoryResult.model";
import SurveyResponse from "@/lib/database/models/surveyResponse.model";

export type UserProfile = {
    email?: string;
    username?: string;
    firstName: string;
    lastName: string;
    photo?: string;
    clerkUpdatedAt?: number;
};

// Profile fields Clerk can take away. When Clerk's copy lacks one, the row's
// copy goes too, or a removed email would stay here for good
const REMOVABLE_FIELDS = ["email", "photo"] as const;

/**
 * The User row's copy of a Clerk profile. Takes the fields both Clerk shapes
 * have (the Backend API's camelCase user and the webhook's snake_case payload)
 * so the two can't drift apart.
 */
export function profileFromClerk(clerkUser: {
    id: string;
    emails: { id: string; emailAddress: string }[];
    primaryEmailId?: string | null;
    username?: string | null;
    firstName?: string | null;
    lastName?: string | null;
    imageUrl?: string | null;
    updatedAt?: number | null;
}): UserProfile {
    const email = (
        clerkUser.emails.find(
            (entry) => entry.id === clerkUser.primaryEmailId,
        ) ?? clerkUser.emails[0]
    )?.emailAddress;

    // OAuth and phone sign-ups often have no username. Derive a readable one
    // for the admin pages, suffixed with part of the Clerk ID
    const localPart = email?.split("@")[0].replace(/[^a-zA-Z0-9._-]/g, "");
    const username =
        clerkUser.username ||
        `${localPart || "user"}-${clerkUser.id.slice(-6)}`;

    return {
        ...(email ? { email } : {}),
        username,
        firstName: clerkUser.firstName ?? "",
        lastName: clerkUser.lastName ?? "",
        ...(clerkUser.imageUrl ? { photo: clerkUser.imageUrl } : {}),
        ...(clerkUser.updatedAt ? { clerkUpdatedAt: clerkUser.updatedAt } : {}),
    };
}

export async function isDeletedUser(clerkId: string) {
    await connectToDatabase();
    return Boolean(await DeletedUser.exists({ _id: clerkId }));
}

/**
 * Reads the user from Clerk itself. null means Clerk has no such user, which
 * is the only answer that isn't a passing failure: the account was deleted.
 */
export async function fetchClerkProfile(
    clerkId: string,
): Promise<UserProfile | null> {
    const client = await clerkClient();

    try {
        const clerkUser = await client.users.getUser(clerkId);
        return profileFromClerk({
            id: clerkUser.id,
            emails: clerkUser.emailAddresses,
            primaryEmailId: clerkUser.primaryEmailAddressId,
            username: clerkUser.username,
            firstName: clerkUser.firstName,
            lastName: clerkUser.lastName,
            imageUrl: clerkUser.imageUrl,
            updatedAt: clerkUser.updatedAt,
        });
    } catch (error) {
        if (isClerkAPIResponseError(error) && error.status === 404) {
            return null;
        }
        throw error;
    }
}

/**
 * Finds or creates the User row for a Clerk user, in one atomic upsert keyed
 * by clerkId alone, so it can't collide with any other row whatever email or
 * username that row has. `overwrite` is for a profile read from Clerk just
 * now: it replaces the row's copy, unless the row already holds a newer read.
 * Without it the profile only fills in a row being made.
 *
 * Returns null for a deleted user, and never leaves a row behind for one.
 */
export async function upsertUserByClerkId(
    clerkId: string,
    profile: Partial<UserProfile>,
    { overwrite }: { overwrite: boolean },
) {
    if (await isDeletedUser(clerkId)) return null;

    let update: Record<string, unknown> = {
        $setOnInsert: { clerkId, ...profile },
    };
    let filter: Record<string, unknown> = { clerkId };

    if (overwrite) {
        const removed = REMOVABLE_FIELDS.filter((field) => !profile[field]);
        update = {
            $set: profile,
            $setOnInsert: { clerkId },
            ...(removed.length > 0
                ? {
                      $unset: Object.fromEntries(
                          removed.map((field) => [field, ""]),
                      ),
                  }
                : {}),
        };
        // Two reads of Clerk can finish in either order; only a read at least
        // as new as the stored one may write
        if (profile.clerkUpdatedAt !== undefined) {
            filter = {
                clerkId,
                $or: [
                    { clerkUpdatedAt: { $exists: false } },
                    { clerkUpdatedAt: { $lte: profile.clerkUpdatedAt } },
                ],
            };
        }
    }

    let user;
    for (let attempt = 0; !user; attempt += 1) {
        try {
            user = await User.findOneAndUpdate(filter, update, {
                upsert: true,
                new: true,
            });
        } catch (error: any) {
            // E11000 on clerkId: another first request made the row, or the
            // row holds a newer read than this one. Either way, that row is it
            if (error?.code !== 11000) throw error;
            user = await User.findOne({ clerkId });
            if (!user && attempt >= 2) throw error;
        }
    }

    // A deletion that finished while this was writing. deleteUser records the
    // ID before removing anything, so one of the two always sees the other
    if (await isDeletedUser(clerkId)) {
        await User.deleteOne({ clerkId });
        return null;
    }

    return JSON.parse(JSON.stringify(user));
}

export async function createUser(clerkId: string, profile: UserProfile) {
    return upsertUserByClerkId(clerkId, profile, { overwrite: true });
}

// Upserts rather than updates: user.updated can arrive before user.created
// (Svix doesn't promise order), or for a user whose create was never
// delivered. Failing would 500 and Clerk would retry it for days
export async function updateUser(clerkId: string, profile: UserProfile) {
    return upsertUserByClerkId(clerkId, profile, { overwrite: true });
}

export async function deleteUser(clerkId: string) {
    try {
        await connectToDatabase();

        // First, so a write already on its way can't bring the user back
        // (see upsertUserByClerkId)
        await DeletedUser.updateOne(
            { _id: clerkId },
            { $setOnInsert: { deletedAt: new Date() } },
            { upsert: true },
        );

        // Lesson progress is keyed by Clerk id, not by the User row, so it is
        // removed even for an account that never got one
        await LearnerProgress.deleteOne({ clerkId });

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
