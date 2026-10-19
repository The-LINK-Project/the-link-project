import { Schema, model, models } from "mongoose";

// Clerk IDs of deleted accounts, kept so nothing can bring one back. A
// request that read the user from Clerk just before the deletion can land its
// write just after it, and a live session outlasts its account by up to a
// minute; both write through upsertUserByClerkId, which checks this list
// before and after writing. Holds the ID alone: no personal data. Clerk never
// reuses an ID, so an entry never needs to expire.
const DeletedUserSchema = new Schema(
    {
        _id: { type: String, required: true },
        deletedAt: { type: Date, default: Date.now },
    },
    { versionKey: false },
);

const DeletedUser =
    models.DeletedUser || model("DeletedUser", DeletedUserSchema);

export default DeletedUser;
