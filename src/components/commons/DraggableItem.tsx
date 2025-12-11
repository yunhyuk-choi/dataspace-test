"use client";
import { useDraggable } from "@dnd-kit/core";
import { memo, ReactNode, useMemo } from "react";

interface DraggableItemProps {
  id: string;
  children: ReactNode;
}

function DraggableItem({ id, children }: DraggableItemProps) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: id,
  });
  const style = useMemo(
    () =>
      transform
        ? {
            transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
          }
        : undefined,
    [transform]
  );

  return (
    <div ref={setNodeRef} {...attributes} {...listeners} style={style}>
      {children}
    </div>
  );
}

export default memo(DraggableItem);
