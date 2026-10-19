import { Schema, model, models } from "mongoose";

// A web user IS a Clerk user: clerkId is the only identity and the only unique
// key. Email and username are copies of the Clerk profile and must never be
// unique here. Clerk already keeps them unique within an instance, but this
// database also holds rows that Clerk has forgotten (accounts deleted from the
// app or the Clerk dashboard) and rows from the dev Clerk instance (local dev
// shares this database). A unique email here turned every one of those into a
// permanent "Something went wrong" page for whoever signed up with the same
// address next. tests/user-identity.test.ts guards this.
const UserSchema = new Schema(
    {
        clerkId: { type: String, required: true, unique: true },
        // Optional: phone-only and some OAuth sign-ups have no email or username
        email: { type: String, required: false },
        username: { type: String, required: false },
        firstName: { type: String, required: false, unique: false },
        lastName: { type: String, required: false, unique: false },
        photo: { type: String, required: false, unique: false },
        // Clerk's updatedAt for the profile copied here, so a slower, older
        // read of Clerk can't overwrite a newer one (see upsertUserByClerkId)
        clerkUpdatedAt: { type: Number, required: false },
    },
    {
        timestamps: true, // This adds createdAt and updatedAt automatically
    },
);

// Admin user list sorts newest-first and counts recent signups
UserSchema.index({ createdAt: -1 });

const User = models.User || model("User", UserSchema);

export default User;
