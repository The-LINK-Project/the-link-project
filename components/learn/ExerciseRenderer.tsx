"use client";

import type {
    Answer,
    ArrangeWordsExercise,
    DialogueChoiceExercise,
    Exercise,
    FillBlankExercise,
    GradeResult,
    Lesson,
    ListenArrangeWordsExercise,
    ListenChooseMeaningExercise,
    MatchPairsExercise,
    PictureToWordExercise,
    SelectPictureExercise,
    TranslateWordBankExercise,
} from "@/lib/lessons/types";

import type { ExerciseProps } from "./exercises/shared";

import { ArrangeWords } from "./exercises/ArrangeWords";
import { DialogueChoice } from "./exercises/DialogueChoice";
import { SelectPicture } from "./exercises/SelectPicture";
import { FillBlank } from "./exercises/FillBlank";
import { ListenArrangeWords } from "./exercises/ListenArrangeWords";
import { ListenChooseMeaning } from "./exercises/ListenChooseMeaning";
import { PictureToWord } from "./exercises/PictureToWord";
import { TapThePairs } from "./exercises/TapThePairs";
import { TranslateWordBank } from "./exercises/TranslateWordBank";

/**
 * The one place that maps an exercise type to a component.
 *
 * Adding an exercise type means adding a branch here, a variant to `Exercise`,
 * and a grading branch. The switch has no default case on purpose: TypeScript
 * fails the build if a new variant is left unhandled, so a half-added exercise
 * type cannot reach a learner as a blank screen.
 */
type Props = {
    exercise: Exercise;
    /** Passed to every exercise so vocabulary references can be resolved. */
    lesson: Lesson;
    draft: Answer | null;
    onDraftChange: (answer: Answer | null) => void;
    onSelfSubmit: (answer: Answer) => void;
    result: GradeResult | null;
    locked: boolean;
    again?: boolean;
};

/**
 * The seam between the session's wide answer union and one exercise's precise
 * answer type.
 *
 * The session stores whatever answer is on screen, so its handlers speak in
 * `Answer`. A component may only produce its own shape. The switch below has
 * already established which exercise this is, so re-typing the handlers to
 * match is sound — and doing it here, once, is what lets every exercise
 * component be strictly typed.
 */
function forExercise<E extends Exercise>(rest: Omit<Props, "exercise">) {
    return rest as unknown as Omit<ExerciseProps<E>, "exercise">;
}

export function ExerciseRenderer({ exercise, ...rest }: Props) {
    switch (exercise.type) {
        case "selectPicture":
            return (
                <SelectPicture exercise={exercise} {...forExercise<SelectPictureExercise>(rest)} />
            );
        case "matchPairs":
            return <TapThePairs exercise={exercise} {...forExercise<MatchPairsExercise>(rest)} />;
        case "listenChooseMeaning":
            return (
                <ListenChooseMeaning
                    exercise={exercise}
                    {...forExercise<ListenChooseMeaningExercise>(rest)}
                />
            );
        case "arrangeWords":
            return (
                <ArrangeWords exercise={exercise} {...forExercise<ArrangeWordsExercise>(rest)} />
            );
        case "translateWordBank":
            return (
                <TranslateWordBank
                    exercise={exercise}
                    {...forExercise<TranslateWordBankExercise>(rest)}
                />
            );
        case "fillBlank":
            return <FillBlank exercise={exercise} {...forExercise<FillBlankExercise>(rest)} />;
        case "pictureToWord":
            return (
                <PictureToWord exercise={exercise} {...forExercise<PictureToWordExercise>(rest)} />
            );
        case "listenArrangeWords":
            return (
                <ListenArrangeWords
                    exercise={exercise}
                    {...forExercise<ListenArrangeWordsExercise>(rest)}
                />
            );
        case "dialogueChoice":
            return (
                <DialogueChoice
                    exercise={exercise}
                    {...forExercise<DialogueChoiceExercise>(rest)}
                />
            );
    }
}
