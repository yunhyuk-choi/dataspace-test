import DroppableContainer from "@/components/commons/DroppableContainer";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface DroppablePanelProps<T> {
  id: string;
  items: T[];
  renderItem: (item: T) => ReactNode;
  emptyLabel?: string;
  className?: string;
}

export default function DroppablePanel<T>({
  id,
  items,
  renderItem,
  className,
  emptyLabel,
}: DroppablePanelProps<T>) {
  return (
    <DroppableContainer
      id={id}
      className={cn(
        "flex min-h-[200px] w-full flex-col items-center justify-start space-y-2 rounded-2xl border-4 border-dashed p-4 transition-colors",
        items.length === 0 && "justify-center", // 비어있을 땐 중앙 정렬
        className
      )}
    >
      {items.map((item, index) => (
        <div key={`${id}_item_${index}`} className="w-full">
          {renderItem(item)}
        </div>
      ))}

      {items.length === 0 && <p className="title-ld text-neutral-400 select-none">{emptyLabel}</p>}
    </DroppableContainer>
  );
}
