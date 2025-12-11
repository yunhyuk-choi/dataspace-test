import {
  PermissionBlockProps,
  PolicyBlockProps,
} from "@/feature/data-asset-upload/main-panel/types/apiInterfaces";
import { postItem } from "@/feature/data-asset-upload/side-panel/services/items";
import { DragEndEvent } from "@dnd-kit/core";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCallback, useRef, useState } from "react";

export default function usePolicyLogic() {
  const queryClient = useQueryClient();
  const addItemMutation = useMutation({
    mutationFn: postItem<PolicyBlockProps>,
    mutationKey: ["addItemMutation"],
    onSuccess: (result) => {
      console.log("addItem", result);
      setPermission([]);
      setProhibition([]);
      setObligation([]);
      if (policyName.current) policyName.current.value = "";
      queryClient.fetchQuery({ queryKey: ["policyList"] });
    },
  });
  const [permission, setPermission] = useState<PermissionBlockProps[]>([]);
  const [prohibition, setProhibition] = useState<PermissionBlockProps[]>([]);
  const [obligation, setObligation] = useState<PermissionBlockProps[]>([]);
  const policyName = useRef<HTMLInputElement>(null);

  const onDragEnd = useCallback(
    (result: DragEndEvent) => {
      const { active, over } = result;
      const cachedSource = queryClient.getQueryData<{ data: PermissionBlockProps[] }>([
        "permissionList",
      ]);
      if (!cachedSource) return;
      const operandItem = cachedSource.data.find((item) => item.name === active.id);
      if (!operandItem || !over?.id) return;
      console.log(operandItem, over?.id, "PER", permission, "PRO", prohibition, "OBL", obligation);
      switch (over.id) {
        case "new_permission":
          return setPermission((prev) =>
            prev.find((item) => item.name === operandItem.name) ? prev : [...prev, operandItem]
          );
        case "new_prohibition":
          return setProhibition((prev) =>
            prev.find((item) => item.name === operandItem.name) ? prev : [...prev, operandItem]
          );
        case "new_obligation":
          return setObligation((prev) =>
            prev.find((item) => item.name === operandItem.name) ? prev : [...prev, operandItem]
          );
      }
    },
    [queryClient, setPermission, setProhibition, setObligation, permission, prohibition, obligation]
  );

  const handleRemoveItem = useCallback(
    (target: string, listType: string) => {
      console.log("EVENT<RENMOVE", target, listType);
      switch (listType) {
        case "permission":
          return setPermission((prev) => prev.filter((item) => item.name !== target));
        case "prohibition":
          return setProhibition((prev) => prev.filter((item) => item.name !== target));
        case "obligation":
          return setObligation((prev) => prev.filter((item) => item.name !== target));
      }
    },
    [setPermission, setProhibition, setObligation]
  );

  const handleAddItem = useCallback(() => {
    if (!policyName.current?.value || !permission) return;
    addItemMutation.mutate({
      target: "policy",
      data: {
        name: policyName.current.value,
        id: policyName.current.value,
        type: "odrl:Set",
        permission,
        prohibition,
        obligation,
      },
    });
  }, [addItemMutation, obligation, permission, prohibition]);

  return {
    refs: { policyName },
    state: { permission, prohibition, obligation },
    actions: { onDragEnd, handleRemoveItem, handleAddItem },
    status: { isSubmitting: addItemMutation.isPending },
  };
}
