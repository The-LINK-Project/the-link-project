// User create/update/delete driven by the Clerk webhook. Deliberately NOT a
// "use server" file: these run with no session (the caller is Clerk, verified
// by svix signature in the route), so exposing them as server actions would
// make them public unauthenticated endpoints.
import { connectToDatabase } from "@/lib/database";
import { revalidatePath } from "next/cache";

import User from "@/lib/database/models/user.model";

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
