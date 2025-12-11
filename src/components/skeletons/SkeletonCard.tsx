"use client";

import { memo } from "react";

function SkeletonCard() {
  return (
    <div className="animate-pulse">
      <div className="relative h-auto w-auto rounded-xl border border-black/10 bg-gray-100 p-6 sm:w-100 dark:border-white/20 dark:bg-zinc-800">
        {/* title placeholder */}
        <div className="h-6 w-3/5 rounded bg-gray-300 dark:bg-zinc-700" />

        {/* description placeholder */}
        <div className="mt-2 h-4 w-4/5 rounded bg-gray-300 dark:bg-zinc-700" />

        {/* image placeholder */}
        <div className="mt-4 h-60 w-full rounded-xl bg-gray-300 dark:bg-zinc-700" />

        {/* buttons placeholder */}
        <div className="mt-20 flex items-center justify-between">
          <div className="h-8 w-20 rounded bg-gray-300 dark:bg-zinc-700" />
          <div className="h-8 w-20 rounded bg-gray-300 dark:bg-zinc-700" />
        </div>
      </div>
    </div>
  );
}

export default memo(SkeletonCard);
