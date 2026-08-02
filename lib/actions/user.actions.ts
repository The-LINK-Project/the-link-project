"use server";

import { connectToDatabase } from "@/lib/database";
import { revalidatePath } from "next/cache";

import User from "@/lib/database/models/user.model";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { cache } from "react";

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

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

export async function getUserById(userId: string) {
    try {
        await connectToDatabase();

        const user = await User.findById(userId);

        if (!user) throw new Error("User not found");

        return JSON.parse(JSON.stringify(user));
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function getUserByClerkId(clerkId: string) {
    try {
        await connectToDatabase();

        const user = await User.findOne({ clerkId });

        if (!user) throw new Error("User not found");

        return JSON.parse(JSON.stringify(user));
    } catch (error) {
        console.log(error);
        throw error;
    }
}

type EnsureUserOptions = {
    maxRetries?: number;
    retryDelayMs?: number;
};

// Memoized per request via React cache(): repeated ensureUser()/getCurrentUser()
// calls within a single render or server action resolve the user only once.
const resolveUser = cache(async (maxRetries: number, retryDelayMs: number) => {
    await connectToDatabase();

    const { userId: clerkUserId } = await auth();

    if (!clerkUserId) {
        throw new Error("Not authenticated");
    }

    // Fast path: existing user — a single indexed Mongo query, no Clerk REST calls.
    const knownUser = await User.findOne({ clerkId: clerkUserId });

    if (knownUser) {
        return JSON.parse(JSON.stringify(knownUser));
    }

    // Slow path: first login (or a create race) — fetch the Clerk profile and upsert.
    const client = await clerkClient();
    const clerkUserData = await client.users.getUser(clerkUserId);

    for (let attempt = 0; attempt <= maxRetries; attempt += 1) {
        const existingUser = await User.findOne({ clerkId: clerkUserId });

        if (existingUser) {
            const userObject = JSON.parse(JSON.stringify(existingUser));

            const mongoUserId = existingUser._id.toString();
            const existingMetadataUserId = clerkUserData.publicMetadata?.userId;

            if (existingMetadataUserId !== mongoUserId) {
                await client.users.updateUserMetadata(clerkUserId, {
                    publicMetadata: { userId: mongoUserId },
                });
            }

            return userObject;
        }

        const primaryEmail = clerkUserData.emailAddresses?.[0]?.emailAddress;

        if (!primaryEmail) {
            throw new Error("User email is missing from Clerk profile");
        }

        try {
            const newUser = await User.create({
                clerkId: clerkUserId,
                email: primaryEmail,
                username:
                    clerkUserData.username ||
                    primaryEmail ||
                    `${clerkUserId.slice(0, 8)}-user`,
                firstName: clerkUserData.firstName || "",
                lastName: clerkUserData.lastName || "",
                photo: clerkUserData.imageUrl,
            });

            const userObject = JSON.parse(JSON.stringify(newUser));

            await client.users.updateUserMetadata(clerkUserId, {
                publicMetadata: { userId: newUser._id.toString() },
            });

            return userObject;
        } catch (error: any) {
            if (error?.code !== 11000) {
                console.log(error);
                throw error;
            }
        }

        if (attempt < maxRetries) {
            await wait(retryDelayMs * Math.pow(2, attempt));
        }
    }

    throw new Error("Timed out ensuring user exists in database");
});

// 2 retries × 250ms base = at most ~750ms of backoff. The old default (5
// retries, exponential from 300ms) could hold a request for ~9s of pure sleep
export async function ensureUser({
    maxRetries = 2,
    retryDelayMs = 250,
}: EnsureUserOptions = {}) {
    return resolveUser(maxRetries, retryDelayMs);
}

export async function updateUser(
    clerkId: string,
    user: {
        firstName: string;
        lastName: string;
        username: string;
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

        if (!userToDelete) {
            throw new Error("User not found");
        }

        // TODO: DELETE ALL THEIRS OR MAKE IT SAY DELETED USER

        // Delete user
        const deletedUser = await User.findByIdAndDelete(userToDelete._id);
        // Only the admin user list renders this data — revalidating "/"
        // would purge the cache of every route in the app
        revalidatePath("/admin/users");

        return deletedUser ? JSON.parse(JSON.stringify(deletedUser)) : null;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function getCurrentUser() {
    return ensureUser();
}

export async function getAllUsers() {
    try {
        await connectToDatabase();

        const users = await User.find({}).sort({ createdAt: -1 });
        return JSON.parse(JSON.stringify(users));
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function getUserStats() {
    try {
        await connectToDatabase();

        const totalUsers = await User.countDocuments();
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

        const newUsersThisWeek = await User.countDocuments({
            createdAt: { $gte: oneWeekAgo },
        });

        return {
            totalUsers,
            newUsersThisWeek,
        };
    } catch (error) {
        console.log(error);
        return {
            totalUsers: 0,
            newUsersThisWeek: 0,
        };
    }
}
