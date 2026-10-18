import { Loader2 } from "lucide-react";

const Loading = () => {
    return (
        <div className="flex min-h-screen items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-gray-600" />
        </div>
    );
};

export default Loading;
