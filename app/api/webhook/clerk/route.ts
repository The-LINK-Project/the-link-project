import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import {
    createUser,
    updateUser,
    deleteUser,
    fetchClerkProfile,
} from "@/lib/userSync";
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

    // Created and updated are the same write: an upsert keyed by clerkId,
    // which can't collide with another row's email or username (see
    // user.model.ts). The profile comes from Clerk itself, not the payload:
    // Svix doesn't promise order, so a late or retried event would otherwise
    // write stale data, or bring back a user that user.deleted already removed
    if (eventType === "user.created" || eventType === "user.updated") {
        const { id } = evt.data;
        const profile = await fetchClerkProfile(id);

        if (!profile) {
            return NextResponse.json({ message: "Skipped: user was deleted" });
        }

        const user =
            eventType === "user.created"
                ? await createUser(id, profile)
                : await updateUser(id, profile);

        return NextResponse.json({ message: "OK", user });
    }

    if (eventType === "user.deleted") {
        const { id } = evt.data;

        if (!id) {
            // Without the Clerk ID there is no way to tell whose data to
            // remove. Acknowledge the event — retrying the same payload can
            // never succeed
            console.error("user.deleted event has no user ID, skipping");
            return NextResponse.json({ message: "Skipped: no user ID" });
        }

        // null means the user was already gone, which is still a success
        const deletedUser = await deleteUser(id);

        return NextResponse.json({
            message: deletedUser ? "OK" : "Already deleted",
            user: deletedUser,
        });
    }

    return new Response("", { status: 200 });
}
