import DraggableItem from "@/components/commons/DraggableItem";
import { ReactNode } from "react";

interface DraggableListPanelProps<T> {
  items: T[];
  idKey: keyof T;
  renderItem: (item: T) => ReactNode;
  onAddNewClick?: () => void;
  addNewLabel?: string;
}

export default function DraggableListPanel<T>({
  items,
  idKey,
  renderItem,
  onAddNewClick,
  addNewLabel,
}: DraggableListPanelProps<T>) {
  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center space-y-4">
      {onAddNewClick && (
        <div
          className="sticky top-0 flex h-20 w-full cursor-pointer justify-center justify-self-start rounded-2xl border-4 border-dotted align-middle"
          onClick={onAddNewClick}
        >
          <p className="my-auto">{addNewLabel?.toLocaleUpperCase()}</p>
        </div>
      )}
      <div className="w-full space-y-2 pb-4">
        {items.map((item) => {
          const id = String(item[idKey]);
          return (
            <DraggableItem key={`drag_source_${id}`} id={id}>
              {renderItem(item)}
            </DraggableItem>
          );
        })}
      </div>
    </div>
  );
}
