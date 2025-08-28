import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-xl w-full bg-white rounded-3xl shadow-lg border-5 border-red-400 p-10 text-center">
        <h1 className="text-7xl font-extrabold mb-4 text-red-400">404</h1>
        <h2 className="text-3xl font-bold mb-4 text-gray-900">
          Page Not Found
        </h2>
        <p className="text-gray-600 mb-8 text-lg">
          Sorry, the page you're looking for doesn't exist. It might have been
          removed or moved to a new location.
        </p>
        <Link href="/">
          <Button className="px-6 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition duration-300 cursor-pointer bg-red-400 hover:bg-red-500 text-white">
            Back to Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
