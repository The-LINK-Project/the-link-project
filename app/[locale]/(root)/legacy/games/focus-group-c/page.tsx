import React from "react";
import { notFound } from "next/navigation";
import FocusGroupRun from "@/components/games/FocusGroupRun";
import { getFocusGroupSet } from "@/constants/games/focusGroup";

const FocusGroupSetCPage = () => {
    const set = getFocusGroupSet("c");
    if (!set) notFound();

    return (
        <div className="min-h-screen flex flex-col items-center">
            <div className="w-full max-w-3xl px-4 py-8 sm:px-6 sm:py-12">
                <div className="mb-6 text-center">
                    <div className="mb-4 inline-flex items-center rounded-full bg-green-50 px-4 py-2 text-sm font-medium text-primary">
                        Time trial · harder
                    </div>
                    <h1 className="mb-2 text-3xl font-bold text-primary sm:text-4xl">
                        {set.title}
                    </h1>
                    <p className="text-lg text-slate-600">
                        {set.stages.length} stages. Finish as fast as you can.
                    </p>
                </div>

                <FocusGroupRun stages={set.stages} />
            </div>
        </div>
    );
};

export default FocusGroupSetCPage;
