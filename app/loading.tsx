import React from "react";

const LoadingScreen = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-white">
      <div className="w-10 h-10 border-4 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
      <p className="mt-4 text-gray-700 text-lg">Loading...</p>
    </div>
  );
};

export default LoadingScreen;
