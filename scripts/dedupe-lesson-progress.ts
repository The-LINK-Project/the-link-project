import { config } from "dotenv";
import mongoose from "mongoose";

// Load .env.local before reading process.env
config({ path: ".env.local" });
config();

// Merges duplicate (userId, lessonIndex) LessonProgress documents so the
// unique index declared in lessonProgress.model.ts can actually build:
// MongoDB refuses to create a unique index over existing duplicates, and
// mongoose only logs that failure, so the schema's index has silently never
// existed in the live database.
//
// Per duplicate group, the copy with the longest conversation history
// survives (ties broken by most objectives met). objectivesMet is merged
// element-wise OR, completed is OR, quizResult refs are unioned. Histories
// are deliberately NOT concatenated — parallel copies are alternate sessions,
// and stitching them together would fabricate a transcript nobody had.
//
// Talks to the collections directly (no app model imports) so it runs under
// plain tsx without the Next.js module graph.
//
// DRY RUN by default: prints the full plan and writes nothing.
// Run with --apply to merge, delete, and then build the unique indexes.
// Also reports duplicate lesson numbers in the lessons collection, which
// block that model's unique index the same way but need a human to decide
// which lesson document to keep.

type ProgressDoc = {
    _id: mongoose.mongo.ObjectId;
    convoHistory?: unknown[];
    objectivesMet?: boolean[];
    completed?: boolean;
    quizResult?: { toString(): string }[];
};

async function run() {
    const apply = process.argv.includes("--apply");

    const uri = process.env.MONGODB_URI;
    if (!uri) throw new Error("MONGODB_URI is missing");

    // Same dbName the app uses in lib/database/index.ts
    await mongoose.connect(uri, { dbName: "Users" });
    const db = mongoose.connection.db!;
    const progressCollection = db.collection("lessonprogresses");
    const lessonCollection = db.collection("lessons");

    const groups = (await progressCollection
        .aggregate([
            {
                $group: {
                    _id: { userId: "$userId", lessonIndex: "$lessonIndex" },
                    ids: { $push: "$_id" },
                    count: { $sum: 1 },
                },
            },
            { $match: { count: { $gt: 1 } } },
        ])
        .toArray()) as {
        _id: { userId: unknown; lessonIndex: number };
        ids: mongoose.mongo.ObjectId[];
    }[];

    console.log(
        `${groups.length} duplicate (userId, lessonIndex) group(s) in lessonprogresses.`,
    );

    let removed = 0;
    for (const group of groups) {
        const docs = (await progressCollection
            .find({ _id: { $in: group.ids } })
            .toArray()) as unknown as ProgressDoc[];

        const rank = (doc: ProgressDoc): [number, number] => [
            doc.convoHistory?.length ?? 0,
            (doc.objectivesMet ?? []).filter(Boolean).length,
        ];
        docs.sort((a, b) => {
            const [aMessages, aObjectives] = rank(a);
            const [bMessages, bObjectives] = rank(b);
            return bMessages - aMessages || bObjectives - aObjectives;
        });

        const survivor = docs[0];
        const losers = docs.slice(1);

        const width = Math.max(
            ...docs.map((doc) => doc.objectivesMet?.length ?? 0),
        );
        const mergedObjectives = Array.from({ length: width }, (_, i) =>
            docs.some((doc) => doc.objectivesMet?.[i] === true),
        );
        const mergedCompleted = docs.some((doc) => doc.completed === true);
        const mergedQuizRefs = [
            ...new Map(
                docs
                    .flatMap((doc) => doc.quizResult ?? [])
                    .map((ref) => [ref.toString(), ref]),
            ).values(),
        ];

        console.log(
            `- user ${group._id.userId} lesson ${group._id.lessonIndex}: ` +
                `keep ${survivor._id} (${survivor.convoHistory?.length ?? 0} messages), ` +
                `remove ${losers.map((doc) => `${doc._id} (${doc.convoHistory?.length ?? 0} messages)`).join(", ")}; ` +
                `merged completed=${mergedCompleted}, objectives=[${mergedObjectives.join(",")}], ` +
                `${mergedQuizRefs.length} quiz ref(s)`,
        );

        if (apply) {
            await progressCollection.updateOne(
                { _id: survivor._id },
                {
                    $set: {
                        objectivesMet: mergedObjectives,
                        completed: mergedCompleted,
                        quizResult: mergedQuizRefs,
                    },
                },
            );
            const result = await progressCollection.deleteMany({
                _id: { $in: losers.map((doc) => doc._id) },
            });
            removed += result.deletedCount ?? 0;
        }
    }

    if (apply) {
        // Same spec (and default name) the schema declares, so the app's
        // autoIndex sees it as already present
        await progressCollection.createIndex(
            { userId: 1, lessonIndex: 1 },
            { unique: true },
        );
        const indexNames = (await progressCollection.indexes()).map(
            (index) => index.name,
        );
        console.log(`lessonprogresses indexes now: ${indexNames.join(", ")}`);
    }

    // Duplicate lesson numbers block lesson.model.ts's unique lessonIndex
    // index the same way, but merging lessons is a judgment call (which
    // title/description/objectives to keep, and deleting one via the admin
    // UI now cascades to learner data) — report only.
    const lessonDupes = (await lessonCollection
        .aggregate([
            {
                $group: {
                    _id: "$lessonIndex",
                    docs: { $push: { id: "$_id", title: "$title" } },
                    count: { $sum: 1 },
                },
            },
            { $match: { count: { $gt: 1 } } },
        ])
        .toArray()) as {
        _id: number;
        docs: { id: unknown; title: string }[];
    }[];

    if (lessonDupes.length > 0) {
        console.warn(
            `WARNING: ${lessonDupes.length} duplicate lessonIndex group(s) in lessons — ` +
                "resolve these by hand (delete or renumber) or the unique " +
                "lessonIndex index cannot build:",
        );
        for (const dupe of lessonDupes) {
            console.warn(
                `  lessonIndex ${dupe._id}: ${dupe.docs
                    .map((doc) => `${doc.id} "${doc.title}"`)
                    .join(" | ")}`,
            );
        }
    } else if (apply) {
        await lessonCollection.createIndex({ lessonIndex: 1 }, { unique: true });
        const indexNames = (await lessonCollection.indexes()).map(
            (index) => index.name,
        );
        console.log(`lessons indexes now: ${indexNames.join(", ")}`);
    }

    console.log(
        apply
            ? `Done. Removed ${removed} duplicate progress document(s).`
            : "Dry run — nothing written. Re-run with `npm run migration:dedupe-lesson-progress -- --apply` to merge and build indexes.",
    );
}

run()
    .then(() => {
        process.exit(0);
    })
    .catch((error) => {
        console.error("Dedupe failed:", error);
        process.exit(1);
    });
