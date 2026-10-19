"use server";

import { connectToDatabase } from "@/lib/database";

import User from "@/lib/database/models/user.model";
import { auth } from "@clerk/nextjs/server";
import { cache } from "react";
import { unstable_rethrow } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import {
    fetchClerkProfile,
    upsertUserByClerkId,
    type UserProfile,
} from "@/lib/userSync";

// Webhook-driven create/update/delete live in lib/userSync.ts — they must not
// be server actions, since actions are public endpoints and the webhook has
// its own svix-signature auth.

// Memoized per request via React cache(): repeated ensureUser()/getCurrentUser()
// calls within a single render or server action resolve the user only once.
const resolveUser = cache(async () => {
    const { userId: clerkUserId } = await auth();

    if (!clerkUserId) {
        throw new Error("Not authenticated");
    }

    await connectToDatabase();

    // Fast path: existing user — a single indexed Mongo query, no Clerk REST
    // calls. A row without a username was made while Clerk couldn't be
    // reached, so until it's filled in, each visit asks Clerk again
    const knownUser = await User.findOne({ clerkId: clerkUserId });

    if (knownUser?.username) {
        return JSON.parse(JSON.stringify(knownUser));
    }

    // First visit, and the webhook hasn't made the row yet (or its delivery
    // failed). The profile is nice to have, not needed — every caller only
    // uses the row's _id — so a Clerk API hiccup makes a bare row, not an
    // error page
    let profile: Partial<UserProfile> | null;
    let fromClerk = true;
    try {
        profile = await fetchClerkProfile(clerkUserId);
    } catch (error) {
        unstable_rethrow(error);
        console.error(`Couldn't load Clerk profile for ${clerkUserId}:`, error);
        if (knownUser) return JSON.parse(JSON.stringify(knownUser));
        profile = {};
        fromClerk = false;
    }

    // Deleted in Clerk while its session token is still good (up to a
    // minute): a row now would bring back data user.deleted removed
    const user = profile
        ? await upsertUserByClerkId(clerkUserId, profile, {
              overwrite: fromClerk,
          })
        : null;

    if (!user) {
        throw new Error("Not authenticated");
    }

    return user;
});

export async function ensureUser() {
    return resolveUser();
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
