import { memo } from "react";

function EmptyList() {
  return (
    <div className="flex min-h-[70dvh] w-full items-center justify-center text-center">
      List is Empty
    </div>
  );
}

export default memo(EmptyList);
