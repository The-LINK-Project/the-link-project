import mongoose from "mongoose";

/**
 * Finished lessons, one document per learner, keyed by Clerk id.
 *
 * Holds only what was finished and how well: no answers, no recordings, no
 * transcript, and not the half-finished run, which stays in the browser. The
 * shape of `lessons` is checked in `learnerProgress.actions.ts` before it is
 * ever written, so it is stored as a plain object.
 */
const learnerProgressSchema = new mongoose.Schema(
    {
        clerkId: { type: String, required: true, unique: true },
        lessons: { type: mongoose.Schema.Types.Mixed, required: true, default: {} },
        /** Counts writes, so a save can tell whether another landed since it read. */
        version: { type: Number },
    },
    {
        timestamps: true,
        collection: "learnerprogress",
        minimize: false,
    },
);

const LearnerProgress =
    mongoose.models.LearnerProgress || mongoose.model("LearnerProgress", learnerProgressSchema);

export default LearnerProgress;
