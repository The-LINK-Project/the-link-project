"use server"; 

import { connectToDatabase } from "@/lib/database";
import { revalidatePath } from "next/cache";

import User from "@/lib/database/models/user.model";
import { auth } from "@clerk/nextjs/server";

export async function createUser(user: { 
    clerkId: string; 
    firstName: string; 
    lastName: string; 
    username: string; 
    email: string;
    photo: string; 
}) {
    try 
    {
        await connectToDatabase();

        const newUser = await User.create(user);

        return JSON.parse(JSON.stringify(newUser));
    } catch (error) {
        console.log (error);
        throw error; 
    }
}

export async function getUserById(userId: string)
{
    try {
        await connectToDatabase();

        const user = await User.findById(userId);

        if (!user) throw new Error("User not found");

        return JSON.parse(JSON.stringify(user));
    } catch (error) {
        console.log (error);
        throw error; 
    }
}

export async function updateUser(clerkId: string, user: {
    firstName: string; 
    lastName: string; 
    username: string; 
    photo: string; 
}) {
    try {
        await connectToDatabase();

        const updatedUser = await User.findOneAndUpdate({ clerkId }, user, {
            new: true,
        });

        if (!updatedUser) throw new Error("User update failed");
        return JSON.parse(JSON.stringify(updatedUser));
    } catch (error) {
        console.log (error);
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
        revalidatePath("/"); 

        return deletedUser ? JSON.parse(JSON.stringify(deletedUser)) : null;
    } catch (error) {
        console.log (error);
        throw error;
    }
}

export async function getCurrentUser() {
    const { sessionClaims } = await auth();

    const userId = sessionClaims?.userId as string;

    if (!userId) {
        throw new Error("User not found");
    }

    return getUserById(userId);
}



                      