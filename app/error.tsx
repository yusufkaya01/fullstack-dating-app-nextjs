"use client"; // Error components must be Client Components

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className=" flex items-center justify-center h-screen">
      <div className=" dark-blue-mesh px-40 py-20 rounded-lg">
        <h2 className="text-xl ">Something went wrong</h2>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded-lg mt-5"
          onClick={
            // Attempt to recover by trying to re-render the segment
            () => reset()
          }
        >
          Try again
        </button>
      </div>
    </div>
  );
}
