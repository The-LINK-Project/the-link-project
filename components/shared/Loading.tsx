import React from "react";
import { Loader2 } from "lucide-react";

const Loading = () => {
    return (
        <div className="flex flex-row items-center gap-1">
            <p>loading ...</p>
            <Loader2 className="w-4 h-4 animate-spin" />
        </div>
    );
};

export default Loading;
