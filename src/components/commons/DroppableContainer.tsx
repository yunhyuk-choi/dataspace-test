import { useDroppable } from "@dnd-kit/core";
import { ReactNode } from "react";

export default function DroppableContainer({
  id,
  children,
  className,
}: {
  id: string;
  className?: string;
  children?: ReactNode;
}) {
  const { setNodeRef } = useDroppable({ id });
  return (
    <div ref={setNodeRef} className={className}>
      {children}
    </div>
  );
}
