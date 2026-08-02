import { Schema, model, models } from "mongoose";

const UserSchema = new Schema(
    {
        clerkId: { type: String, required: true, unique: true },
        email: { type: String, required: true, unique: true },
        username: { type: String, required: true, unique: true },
        firstName: { type: String, required: false, unique: false },
        lastName: { type: String, required: false, unique: false },
        photo: { type: String, required: false, unique: false },
    },
    {
        timestamps: true, // This adds createdAt and updatedAt automatically
    },
);

// Admin user list sorts newest-first and counts recent signups
UserSchema.index({ createdAt: -1 });

const User = models.User || model("User", UserSchema);

export default User;
