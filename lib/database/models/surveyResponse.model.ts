import mongoose from "mongoose";

// One document per user per survey. Answers are a plain map keyed by question
// id (see constants/survey/feedbackSurvey.ts) so the question set can change
// between sessions without a schema migration.
//
// Anonymity note: userId exists ONLY to enforce one-response-per-person and to
// let a person resume their own draft. The admin export (survey.actions.ts)
// never reads it out, and nothing user-facing displays it.
const surveyResponseSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        surveyId: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            enum: ["in_progress", "submitted"],
            default: "in_progress",
        },
        // Question id -> SurveyAnswer (shape depends on the question kind).
        answers: {
            type: mongoose.Schema.Types.Mixed,
            default: {},
        },
        // Where the person was, so a reopened phone lands on the same screen.
        lastQuestionId: {
            type: String,
            default: null,
        },
        // Consent screen "No thank you" — suppresses the dashboard banner.
        // Stored server-side so it holds across devices.
        declinedAt: {
            type: Date,
            default: null,
        },
        submittedAt: {
            type: Date,
            default: null,
        },
    },
    {
        timestamps: true,
        collection: "surveyresponses",
        minimize: false, // keep `answers: {}` instead of dropping the field
    },
);

surveyResponseSchema.index({ userId: 1, surveyId: 1 }, { unique: true });
// Admin stats/results/CSV filter by surveyId (+ status) and sort by
// submittedAt — the unique index above can't serve those (wrong prefix)
surveyResponseSchema.index({ surveyId: 1, status: 1, submittedAt: 1 });

const SurveyResponse =
    mongoose.models.SurveyResponse ||
    mongoose.model("SurveyResponse", surveyResponseSchema);

export default SurveyResponse;
