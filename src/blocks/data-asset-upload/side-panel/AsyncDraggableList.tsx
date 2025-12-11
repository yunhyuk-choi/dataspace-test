import DraggableListPanel from "@/blocks/data-asset-upload/side-panel/DraggablePanel";
import {
  ConstraintBlockProps,
  PermissionBlockProps,
} from "@/feature/data-asset-upload/main-panel/types/apiInterfaces";
import { getItems } from "@/feature/data-asset-upload/side-panel/services/items";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ReactNode } from "react";

export default function AsyncDraggableList({
  type,
  renderItem,
  handleTabChange,
}: {
  type: string;
  renderItem: (item: ConstraintBlockProps | PermissionBlockProps) => ReactNode;
  handleTabChange?: (target: string) => void;
}) {
  const { data } = useSuspenseQuery({
    queryKey: [`${type}List`],
    queryFn: () => getItems<ConstraintBlockProps | PermissionBlockProps>(type),
  });

  return (
    <DraggableListPanel
      items={data?.data}
      idKey={"name"}
      addNewLabel={`add new ${type}`}
      onAddNewClick={() => handleTabChange?.(type)}
      renderItem={renderItem}
    />
  );
}
