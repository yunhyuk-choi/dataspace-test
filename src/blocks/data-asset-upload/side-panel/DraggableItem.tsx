import {
  ConstraintItemProps,
  OperandItemProps,
  PermissionItemProps,
} from "@/feature/data-asset-upload/side-panel/types/dataAssetUploadInterfaces";
import { cn } from "@/lib/utils";
import { useCallback } from "react";

export function OperandItem({ item, type, onClick }: OperandItemProps) {
  const handleClick = useCallback(() => onClick && onClick(type), [onClick, type]);
  if (!item) return;
  return (
    <div
      className={cn(
        "font-pretendard cursor-grab rounded-xl p-2",
        type === "leftOperand"
          ? "bg-indigo-300"
          : type === "operator"
            ? "bg-lime-200"
            : "bg-orange-200"
      )}
      onClick={handleClick}
    >
      {item.label}
    </div>
  );
}

export function ConstraintItem({ item, onClick }: ConstraintItemProps) {
  const handleRemoveItem = useCallback(() => onClick && onClick(item.name), [item.name, onClick]);
  return (
    <div
      className={
        "font-pretendard cursor-grab overflow-clip rounded-xl bg-info-300 p-4 text-ellipsis"
      }
      onClick={handleRemoveItem}
    >
      <p className="title-lb overflow-clip text-ellipsis" title={item.name}>
        {item.name}
      </p>
      <p className="body-mm overflow-y-clip text-ellipsis text-gray-600" title={item.line}>
        {item.line}
      </p>
    </div>
  );
}

export function PermissionItem({ item, listType, onClick }: PermissionItemProps) {
  const handleRemoveItem = useCallback(
    () => {
      
      onClick && listType && onClick(item.name, listType)},
    [item.name, listType, onClick]
  );
  return (
    <div
      className={
        "font-pretendard bg-error-300 flex w-full cursor-grab flex-col justify-center space-y-2 overflow-clip rounded-xl p-4 text-ellipsis"
      }
      onClick={handleRemoveItem}
    >
      <h3 className="overflow-clip text-ellipsis" title={item.name}>
        {item.name}
      </h3>
      {item.constraint.map((constraint) => (
        <ConstraintItem key={`${item.name}_${constraint.name}`} item={constraint} />
      ))}
    </div>
  );
}
