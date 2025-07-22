import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "../ui/button";
import { Mic, MicOff, Play, Loader2 } from "lucide-react";
import { Badge } from "../ui/badge";

type LessonInputBarProps = {
  recording: boolean;
  isLoading: boolean;
  audioURL: string;
  handleStopRecording: () => void;
  handleStartRecording: () => void;
  playAudioSafely: (audio: HTMLAudioElement) => void;
};
const LessonInputBar = ({
  recording,
  isLoading,
  audioURL,
  handleStopRecording,
  handleStartRecording,
  playAudioSafely,
}: LessonInputBarProps) => {
  return (
    <div className="border-t border-gray-100 p-4 bg-gray-50/50">
      <div className="flex items-center gap-3">
        {/* Record Button */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              onClick={recording ? handleStopRecording : handleStartRecording}
              size="lg"
              className={`w-12 h-12 rounded-full transition-all duration-300 shadow-lg ${
                recording
                  ? "bg-red-500 hover:bg-red-600 animate-pulse"
                  : "bg-[rgb(90,199,219)] hover:bg-[rgb(90,199,219)]/90"
              }`}
              disabled={isLoading}
            >
              {recording ? (
                <MicOff className="h-5 w-5" />
              ) : (
                <Mic className="h-5 w-5" />
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{recording ? "Stop recording" : "Click this to speak"}</p>
          </TooltipContent>
        </Tooltip>

        {/* Status Area */}
        <div className="flex-1 flex justify-center">
          {recording && (
            <Badge
              variant="secondary"
              className="bg-red-50 text-red-700 border-red-200 px-4 py-2 text-sm font-medium"
            >
              Recording...
            </Badge>
          )}
          {isLoading && !recording && (
            <Badge
              variant="secondary"
              className="bg-blue-50 text-blue-700 border-blue-200 px-4 py-2 text-sm font-medium flex items-center gap-2"
            >
              <Loader2 className="h-3 w-3 animate-spin" />
              Loading...
            </Badge>
          )}
          {!recording && !isLoading && (
            <Badge
              variant="secondary"
              className="bg-green-50 text-green-700 border-green-200 px-4 py-2 text-sm font-medium"
            >
              Ready to record
            </Badge>
          )}
        </div>

        {/* Play Button */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              onClick={() => {
                if (audioURL) {
                  const audio = new Audio(audioURL);
                  playAudioSafely(audio);
                }
              }}
              disabled={!audioURL || isLoading}
              variant="outline"
              size="lg"
              className="w-12 h-12 rounded-full border-[rgb(90,199,219)] text-[rgb(90,199,219)] hover:bg-[rgb(90,199,219)] hover:text-white disabled:opacity-30 shadow-lg"
            >
              <Play className="h-5 w-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Hear your recording</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
};

export default LessonInputBar;
