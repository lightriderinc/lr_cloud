"use client";

import { useEffect } from "react";
import LRButton from "@/components/ui/LRButton";

export default function Error({
  error,
  retry,
}: {
  error: unknown;
  retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex mt-5 flex-col items-center justify-center gap-4">
      <div className="flex flex-col items-center justify-center gap-1">
        <h1 style={{ fontSize: "10rem" }} className="text-brand-gradient">
          500
        </h1>
        <h1>Something went wrong</h1>
      </div>

      <p className="text-center mb-3">
        An unexpected error occurred. Please try again.
      </p>
      <LRButton
        type="button"
        variant="secondary"
        className="min-w-[110px]"
        onClick={() => retry()}
      >
        Try again
      </LRButton>
    </div>
  );
}
