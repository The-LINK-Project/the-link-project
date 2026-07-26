"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getSurveyCsv } from "@/lib/actions/survey.actions";
import {
    getSurveyById,
    getSurveyQuestions,
} from "@/constants/survey/feedbackSurvey";
import { Download, MessageSquareText } from "lucide-react";

// Admin-only results browser for the feedback survey. Two views per survey:
//   - "By question": option/scale distributions as bars, written answers as
//     a readable list.
//   - "Each response": every submitted response, numbered in submission
//     order. Deliberately anonymous — the server never sends user ids and
//     nothing here tries to identify anyone.
// The CSV download stays for spreadsheet analysis.

type SurveyResultsClientProps = {
    results: SurveyResults[];
};

const BAR_COLOR = "bg-[rgb(90,199,219)]";

/** Human-readable answer, mirroring the survey's review screen. */
function answerText(
    question: SurveyQuestion,
    answer: SurveyAnswer | undefined,
): string | null {
    if (!answer) return null;
    switch (question.kind) {
        case "single": {
            if (answer.kind !== "single") return null;
            const option = question.options.find(
                (item) => item.value === answer.value,
            );
            if (!option) return null;
            return option.isOther && answer.otherText
                ? `${option.label}: ${answer.otherText}`
                : option.label;
        }
        case "scale": {
            if (answer.kind !== "scale") return null;
            return question.labels[answer.value - 1] ?? null;
        }
        case "multi": {
            if (answer.kind !== "multi" || answer.values.length === 0)
                return null;
            return answer.values
                .map((value) => {
                    const option = question.options.find(
                        (item) => item.value === value,
                    );
                    if (!option) return value;
                    return option.isOther && answer.otherText
                        ? `${option.label}: ${answer.otherText}`
                        : option.label;
                })
                .join(", ");
        }
        case "split": {
            if (answer.kind !== "split") return null;
            return `${question.leftLabel}: ${answer.left} ${question.unit} · ${question.rightLabel}: ${answer.right} ${question.unit}`;
        }
        case "text": {
            if (answer.kind !== "text" || !answer.text.trim()) return null;
            return answer.text;
        }
    }
}

function DistributionBar({
    label,
    count,
    total,
}: {
    label: string;
    count: number;
    total: number;
}) {
    const percent = total ? Math.round((count / total) * 100) : 0;
    return (
        <div className="flex items-center gap-3">
            <div className="w-44 shrink-0 text-sm text-slate-700">{label}</div>
            <div className="h-5 flex-1 overflow-hidden rounded bg-slate-100">
                <div
                    className={`h-full rounded ${BAR_COLOR}`}
                    style={{ width: `${percent}%` }}
                />
            </div>
            <div className="w-16 shrink-0 text-right text-sm font-semibold text-slate-900">
                {count}
                <span className="ml-1 font-normal text-slate-400">
                    {percent}%
                </span>
            </div>
        </div>
    );
}

function QuestionBreakdown({
    question,
    responses,
}: {
    question: SurveyQuestion;
    responses: SurveyResponseRow[];
}) {
    const answers = responses
        .map((row) => row.answers[question.id])
        .filter(Boolean) as SurveyAnswer[];
    const total = responses.length;
    const answered = answers.filter((answer) =>
        answer.kind === "text"
            ? answer.text.trim().length > 0
            : answer.kind === "multi"
              ? answer.values.length > 0
              : true,
    ).length;

    let body: React.ReactNode = null;

    switch (question.kind) {
        case "single": {
            const counts = new Map<string, number>();
            const otherTexts: string[] = [];
            for (const answer of answers) {
                if (answer.kind !== "single") continue;
                counts.set(answer.value, (counts.get(answer.value) ?? 0) + 1);
                if (answer.otherText?.trim()) {
                    otherTexts.push(answer.otherText.trim());
                }
            }
            body = (
                <div className="space-y-2">
                    {question.options.map((option) => (
                        <DistributionBar
                            key={option.value}
                            label={option.label}
                            count={counts.get(option.value) ?? 0}
                            total={answered}
                        />
                    ))}
                    {otherTexts.length > 0 && (
                        <p className="pt-1 text-sm text-slate-600">
                            Other, in their words:{" "}
                            <span className="italic">
                                {otherTexts.join(" · ")}
                            </span>
                        </p>
                    )}
                </div>
            );
            break;
        }
        case "scale": {
            const counts = question.labels.map(
                (_, index) =>
                    answers.filter(
                        (answer) =>
                            answer.kind === "scale" &&
                            answer.value === index + 1,
                    ).length,
            );
            body = (
                <div className="space-y-2">
                    {question.labels.map((label, index) => (
                        <DistributionBar
                            key={label}
                            label={`${index + 1} — ${label}`}
                            count={counts[index]}
                            total={answered}
                        />
                    ))}
                    {answered > 0 && (
                        <p className="pt-1 text-sm text-slate-600">
                            Average:{" "}
                            <span className="font-semibold text-slate-900">
                                {(
                                    answers.reduce(
                                        (sum, answer) =>
                                            answer.kind === "scale"
                                                ? sum + answer.value
                                                : sum,
                                        0,
                                    ) / answered
                                ).toFixed(1)}
                            </span>{" "}
                            of {question.labels.length}
                        </p>
                    )}
                </div>
            );
            break;
        }
        case "multi": {
            const counts = new Map<string, number>();
            const otherTexts: string[] = [];
            for (const answer of answers) {
                if (answer.kind !== "multi") continue;
                for (const value of answer.values) {
                    counts.set(value, (counts.get(value) ?? 0) + 1);
                }
                if (answer.otherText?.trim()) {
                    otherTexts.push(answer.otherText.trim());
                }
            }
            body = (
                <div className="space-y-2">
                    {question.options.map((option) => (
                        <DistributionBar
                            key={option.value}
                            label={option.label}
                            count={counts.get(option.value) ?? 0}
                            total={answered}
                        />
                    ))}
                    {otherTexts.length > 0 && (
                        <p className="pt-1 text-sm text-slate-600">
                            Other, in their words:{" "}
                            <span className="italic">
                                {otherTexts.join(" · ")}
                            </span>
                        </p>
                    )}
                </div>
            );
            break;
        }
        case "split": {
            const splits = answers.filter(
                (answer) => answer.kind === "split",
            ) as Extract<SurveyAnswer, { kind: "split" }>[];
            body = splits.length ? (
                <p className="text-sm text-slate-700">
                    Average:{" "}
                    <span className="font-semibold text-slate-900">
                        {question.leftLabel}{" "}
                        {Math.round(
                            splits.reduce((sum, s) => sum + s.left, 0) /
                                splits.length,
                        )}{" "}
                        {question.unit}
                    </span>{" "}
                    ·{" "}
                    <span className="font-semibold text-slate-900">
                        {question.rightLabel}{" "}
                        {Math.round(
                            splits.reduce((sum, s) => sum + s.right, 0) /
                                splits.length,
                        )}{" "}
                        {question.unit}
                    </span>
                </p>
            ) : null;
            break;
        }
        case "text": {
            const texts = answers
                .filter(
                    (answer) =>
                        answer.kind === "text" && answer.text.trim().length > 0,
                )
                .map((answer) =>
                    answer.kind === "text" ? answer.text.trim() : "",
                );
            body = texts.length ? (
                <ul className="space-y-2">
                    {texts.map((text, index) => (
                        <li
                            key={index}
                            className="whitespace-pre-wrap rounded-lg bg-slate-50 p-3 text-sm text-slate-800"
                        >
                            “{text}”
                        </li>
                    ))}
                </ul>
            ) : null;
            break;
        }
    }

    return (
        <div className="border-b border-slate-100 py-5 last:border-b-0">
            <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="font-medium text-slate-900">
                    <span className="mr-2 font-mono text-xs text-slate-400">
                        {question.exportKey}
                    </span>
                    {question.prompt}
                </h3>
                <span className="text-sm text-slate-500">
                    {answered} of {total} answered
                </span>
            </div>
            {answered === 0 ? (
                <p className="text-sm italic text-slate-400">
                    No answers to this one yet.
                </p>
            ) : (
                body
            )}
        </div>
    );
}

function ResponseCard({
    row,
    questions,
}: {
    row: SurveyResponseRow;
    questions: SurveyQuestion[];
}) {
    return (
        <div className="rounded-lg border border-slate-200 bg-white p-5">
            <div className="mb-3 flex items-baseline justify-between gap-2">
                <h3 className="font-semibold text-slate-900">
                    Response #{row.number}
                </h3>
                <span className="text-xs text-slate-400">
                    {row.submittedAt
                        ? new Date(row.submittedAt).toLocaleString()
                        : ""}
                </span>
            </div>
            <dl className="space-y-2">
                {questions.map((question) => {
                    const text = answerText(question, row.answers[question.id]);
                    return (
                        <div key={question.id} className="text-sm">
                            <dt className="text-slate-500">
                                {question.prompt}
                            </dt>
                            <dd
                                className={
                                    text
                                        ? "whitespace-pre-wrap font-medium text-slate-900"
                                        : "italic text-slate-400"
                                }
                            >
                                {text ?? "Skipped"}
                            </dd>
                        </div>
                    );
                })}
            </dl>
        </div>
    );
}

export default function SurveyResultsClient({
    results,
}: SurveyResultsClientProps) {
    const [downloading, setDownloading] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleDownload = async (surveyId: string) => {
        setDownloading(surveyId);
        setError(null);
        try {
            const csv = await getSurveyCsv(surveyId);
            if (!csv) throw new Error("No CSV returned");
            const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = `${surveyId}-responses.csv`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
        } catch (err) {
            console.error("CSV download failed:", err);
            setError("Download failed. Check the console and try again.");
        } finally {
            setDownloading(null);
        }
    };

    if (results.length === 0) {
        return (
            <p className="text-slate-600">
                No surveys defined yet. Add one in
                constants/survey/feedbackSurvey.ts.
            </p>
        );
    }

    return (
        <div className="space-y-8">
            {error && <p className="font-medium text-red-600">{error}</p>}

            {results.map((survey) => {
                const definition = getSurveyById(survey.surveyId);
                if (!definition) return null;
                const questions = getSurveyQuestions(definition);

                return (
                    <Card
                        key={survey.surveyId}
                        className="bg-white border-slate-200"
                    >
                        <CardHeader>
                            <div className="flex flex-wrap items-center justify-between gap-4">
                                <div>
                                    <CardTitle className="text-xl text-slate-900">
                                        {definition.title}
                                        <span className="ml-2 font-mono text-sm font-normal text-slate-400">
                                            {survey.surveyId}
                                        </span>
                                    </CardTitle>
                                    <CardDescription>
                                        {survey.started} started ·{" "}
                                        {survey.submitted} submitted ·{" "}
                                        {survey.completionRate}% finished
                                    </CardDescription>
                                </div>
                                <Button
                                    onClick={() =>
                                        handleDownload(survey.surveyId)
                                    }
                                    disabled={downloading === survey.surveyId}
                                >
                                    <Download
                                        className="h-4 w-4"
                                        aria-hidden="true"
                                    />
                                    {downloading === survey.surveyId
                                        ? "Preparing…"
                                        : "Download CSV"}
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent>
                            {survey.submitted === 0 ? (
                                <div className="flex items-center gap-3 rounded-lg bg-slate-50 p-6 text-slate-500">
                                    <MessageSquareText className="h-5 w-5" />
                                    No submitted responses yet. Results appear
                                    here as people finish the survey.
                                </div>
                            ) : (
                                <Tabs defaultValue="questions">
                                    <TabsList className="mb-4">
                                        <TabsTrigger value="questions">
                                            By question
                                        </TabsTrigger>
                                        <TabsTrigger value="responses">
                                            Each response ({survey.submitted})
                                        </TabsTrigger>
                                    </TabsList>

                                    <TabsContent value="questions">
                                        <div>
                                            {questions.map((question) => (
                                                <QuestionBreakdown
                                                    key={question.id}
                                                    question={question}
                                                    responses={survey.responses}
                                                />
                                            ))}
                                        </div>
                                    </TabsContent>

                                    <TabsContent value="responses">
                                        <div className="grid gap-4 lg:grid-cols-2">
                                            {survey.responses.map((row) => (
                                                <ResponseCard
                                                    key={row.number}
                                                    row={row}
                                                    questions={questions}
                                                />
                                            ))}
                                        </div>
                                    </TabsContent>
                                </Tabs>
                            )}
                        </CardContent>
                    </Card>
                );
            })}
        </div>
    );
}
