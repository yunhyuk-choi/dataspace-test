"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // 여기서 에러 로깅을 하거나, 특정 에러일 경우 리다이렉트 처리도 가능
    console.error(error);
  }, [error]);

  return (
    <div className="flex h-[50vh] flex-col items-center justify-center gap-4">
      <h2 className="text-xl font-bold">목록을 불러오는데 실패했습니다.</h2>
      <button className="rounded bg-blue-500 px-4 py-2 text-white" onClick={() => reset()}>
        다시 시도
      </button>
    </div>
  );
}
