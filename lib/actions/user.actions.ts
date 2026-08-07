"use server";

import { connectToDatabase } from "@/lib/database";

import User from "@/lib/database/models/user.model";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { cache } from "react";
import { requireAdmin } from "@/lib/auth";

// Webhook-driven create/update/delete live in lib/userSync.ts — they must not
// be server actions, since actions are public endpoints and the webhook has
// its own svix-signature auth.

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

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

export async function getCurrentUser() {
    return ensureUser();
}

export async function getAllUsers() {
    await requireAdmin();
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
    // Admin-only read (the admin dashboard's user counts). Guarded outside the
    // try so the auth failure isn't swallowed into the default zero stats.
    await requireAdmin();
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
