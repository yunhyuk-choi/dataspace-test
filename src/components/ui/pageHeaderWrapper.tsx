import { memo } from "react";

function PageHeaderWrapper({ children }: { children?: React.ReactNode }) {
  if (!children) return null;

  return (
    <div className="border-[rgba(0, 0, 0, 0.1)] sticky top-15 z-10 flex w-full flex-row border-b border-solid bg-neutral-200 px-4 py-2">
      {children}
    </div>
  );
}

export default memo(PageHeaderWrapper);
