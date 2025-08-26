import React from "react";

const LoadingScreen = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-[--color-background]">
      <div className="w-10 h-10 border-4 border-muted border-t-foreground rounded-full animate-spin" />
      <p className="mt-4 text-foreground text-lg">Loading...</p>
    </div>
  );
};

export default LoadingScreen;
