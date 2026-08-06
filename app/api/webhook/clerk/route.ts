import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent, clerkClient } from "@clerk/nextjs/server";
import { createUser, updateUser, deleteUser } from "@/lib/userSync";
import { NextResponse } from "next/server";
export async function POST(req: Request) {
    // You can find this in the Clerk Dashboard -> Webhooks -> choose the endpoint
    const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

    if (!WEBHOOK_SECRET) {
        throw new Error(
            "Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local",
        );
    }

    // Get the headers
    const headerPayload = await headers();
    const svix_id = headerPayload.get("svix-id");
    const svix_timestamp = headerPayload.get("svix-timestamp");
    const svix_signature = headerPayload.get("svix-signature");

    // If there are no headers, error out
    if (!svix_id || !svix_timestamp || !svix_signature) {
        return new Response("Error occured -- no svix headers", {
            status: 400,
        });
    }

    // Get the raw body. Svix signs the exact bytes Clerk sent — re-serializing
    // parsed JSON can differ in key order/whitespace and fail verification
    const body = await req.text();

    // Create a new Svix instance with your secret.
    const wh = new Webhook(WEBHOOK_SECRET);

    let evt: WebhookEvent;

    // Verify the payload with the headers
    try {
        evt = wh.verify(body, {
            "svix-id": svix_id,
            "svix-timestamp": svix_timestamp,
            "svix-signature": svix_signature,
        }) as WebhookEvent;
    } catch (err) {
        console.error("Error verifying webhook:", err);
        return new Response("Error occured", {
            status: 400,
        });
    }

    const { id } = evt.data;
    const eventType = evt.type;

    console.log(`Webhook with and ID of ${id} and type of ${eventType}`);

    if (eventType === "user.created") {
        const {
            id,
            email_addresses,
            primary_email_address_id,
            image_url,
            first_name,
            last_name,
            username,
        } = evt.data;

        const primaryEmail =
            email_addresses.find(
                (email) => email.id === primary_email_address_id,
            ) ?? email_addresses[0];

        if (!primaryEmail) {
            // Without an email the User schema can't be satisfied. Acknowledge
            // the event — retrying the same payload can never succeed
            console.error(`user.created ${id} has no email address, skipping`);
            return NextResponse.json({ message: "Skipped: no email address" });
        }

        // OAuth sign-ups (e.g. Google) often have no username. Derive one
        // from the email and suffix it with part of the Clerk ID so it stays
        // unique even when two users share an email local part
        const fallbackUsername = `${primaryEmail.email_address
            .split("@")[0]
            .replace(/[^a-zA-Z0-9._-]/g, "")}-${id.slice(-6)}`;

        const user = {
            clerkId: id,
            email: primaryEmail.email_address,
            username: username || fallbackUsername,
            firstName: first_name ?? "",
            lastName: last_name ?? "",
            photo: image_url,
        };
        const newUser = await createUser(user);

        if (newUser) {
            const client = await clerkClient();
            await client.users.updateUserMetadata(id, {
                publicMetadata: {
                    userId: newUser._id, // link the Clerk user to the user in mongodb
                },
            });
        }

        // Note: redirect() in webhook context - client will handle navigation
        // Cannot use redirect() here as it would prevent the response from being sent

        return NextResponse.json({ message: "OK", user: newUser });
    }

    if (eventType === "user.updated") {
        const { id, image_url, first_name, last_name, username } = evt.data;

        // Only overwrite the stored username when Clerk actually has one, so
        // an OAuth user's derived username isn't wiped to null
        const user = {
            firstName: first_name ?? "",
            lastName: last_name ?? "",
            photo: image_url,
            ...(username ? { username } : {}),
        };

        const updatedUser = await updateUser(id, user);

        return NextResponse.json({ message: "OK", user: updatedUser });
    }

    if (eventType === "user.deleted") {
        const { id } = evt.data;

        const deletedUser = await deleteUser(id!);

        return NextResponse.json({ message: "OK", user: deletedUser });
    }

    return new Response("", { status: 200 });
}
