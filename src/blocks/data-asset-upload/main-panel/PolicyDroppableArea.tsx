import DroppableContainer from "@/components/commons/DroppableContainer";
import { PolicyBlockProps } from "@/feature/data-asset-upload/main-panel/types/apiInterfaces";
import { cn } from "@/lib/utils";
import { memo } from "react";
import SelectedItemCard from "./SelectedItemCard";

function PolicyDroppableArea({
  list,
  removePolicy,
  className,
  label,
}: {
  list?: PolicyBlockProps[];
  removePolicy: (id: string, type: string) => void;
  className?: string;
  label: string;
}) {
  return (
    <DroppableContainer
      id={label}
      className={cn(
        "flex min-h-70 w-50 flex-col space-y-1 rounded-2xl border-2 p-2 align-middle",
        className
      )}
    >
      {label}
      {list &&
        list
          .filter((item) => item.type === `odrl:${label}`)
          ?.map((item, index) => (
            <SelectedItemCard
              data={item}
              key={`${label}_${item.id}_${index}`}
              onClick={removePolicy}
            />
          ))}
    </DroppableContainer>
  );
}

export default memo(PolicyDroppableArea);
