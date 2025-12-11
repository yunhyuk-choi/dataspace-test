import {
  ConstraintBlockProps,
  PermissionBlockProps,
} from "@/feature/data-asset-upload/main-panel/types/apiInterfaces";
import { postItem } from "@/feature/data-asset-upload/side-panel/services/items";
import { DragEndEvent } from "@dnd-kit/core";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCallback, useRef, useState } from "react";

export default function usePermissionLogic() {
  const queryClient = useQueryClient();
  const addItemMutation = useMutation({
    mutationFn: postItem<PermissionBlockProps>,
    mutationKey: ["addItemMutation"],
    onSuccess: (result) => {
      console.log("addItem", result);
      setConstraint([]);
      if (permissionName.current) permissionName.current.value = "";
    },
  });
  const [constraint, setConstraint] = useState<ConstraintBlockProps[]>([]);
  const permissionName = useRef<HTMLInputElement>(null);

  const onDragEnd = useCallback(
    (result: DragEndEvent) => {
      const { active, over } = result;
      const cachedSource = queryClient.getQueryData<{ data: ConstraintBlockProps[] }>([
        "constraintList",
      ]);
      if (!cachedSource) return;
      const operandItem = cachedSource.data.find((item) => item.name === active.id);
      if (!operandItem || !over?.id) return;
      setConstraint((prev) => [...prev.filter((item) => item.name !== active.id), operandItem]);
    },
    [queryClient, setConstraint]
  );

  const handleRemoveItem = useCallback(
    (target: string) => {
      setConstraint((prev) => prev.filter((item) => item.name !== target));
    },
    [setConstraint]
  );

  const handleAddItem = useCallback(() => {
    if (!permissionName.current?.value || !constraint) return;
    addItemMutation.mutate({
      target: "permission",
      data: {
        name: permissionName.current.value,
        action: { id: "" },
        constraint: constraint,
      },
    });
  }, [addItemMutation, constraint]);

  return {
    constraint,
    permissionName,
    onDragEnd,
    handleRemoveItem,
    handleAddItem,
    status: {
      isSubmitting: addItemMutation.isPending,
    },
  };
}
