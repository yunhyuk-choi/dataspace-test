import { ConstraintBlockProps } from "@/feature/data-asset-upload/main-panel/types/apiInterfaces";
import { postItem } from "@/feature/data-asset-upload/side-panel/services/items";
import { DragEndEvent } from "@dnd-kit/core";
import { useMutation } from "@tanstack/react-query";
import { useCallback, useRef, useState } from "react";
import { ConditionType } from "../types/dataAssetUploadInterfaces";

const mockOperandList = [
  { type: "leftOperand", value: "MembershipCredential", label: "Membership Credential" },
  { type: "leftOperand", value: "event", label: "Event" },
  { type: "operator", value: "odrl:eq", label: "is" },
  { type: "operator", value: "odrl:neq", label: "is not" },
  { type: "rightOperand", value: "active", label: "active" },
  { type: "rightOperand", value: "inactive", label: "inactive" },
];

export default function useConstraintLogic() {
  const addItemMutation = useMutation({
    mutationFn: postItem<ConstraintBlockProps>,
    mutationKey: ["addItemMutation"],
    onSuccess: (result) => {
      console.log("addItem", result);
      setCondition({});
      if (constraintName.current) constraintName.current.value = "";
    },
  });
  const [condition, setCondition] = useState<ConditionType>({});
  const constraintName = useRef<HTMLInputElement>(null);

  const onDragEnd = useCallback(
    (result: DragEndEvent) => {
      const { active, over } = result;
      const operandItem = mockOperandList.find((item) => item.value === active.id);
      if (!operandItem || !over?.id) return;
      setCondition((prev) => {
        return {
          ...prev,
          [operandItem.type]: { value: operandItem.value, label: operandItem.label },
        };
      });
    },
    [setCondition]
  );

  const handleRemoveItem = useCallback(
    (type: keyof ConditionType) => {
      setCondition((prev) => {
        const newCondition = { ...prev };
        delete newCondition[type];
        return newCondition;
      });
    },
    [setCondition]
  );

  const handleAddItem = useCallback(() => {
    if (
      !constraintName.current?.value ||
      !condition.leftOperand ||
      !condition.operator ||
      !condition.rightOperand
    )
      return;
    addItemMutation.mutate({
      target: "constraint",
      data: {
        name: constraintName.current.value,
        line: `${condition.leftOperand.label} ${condition.operator.label} ${condition.rightOperand.label}`,
        type: "odrl:LogicalConstraint",
        leftOperand: { id: condition.leftOperand.value },
        operator: { id: condition.operator.value },
        rightOperand: condition.rightOperand.value,
      },
    });
  }, [addItemMutation, condition.leftOperand, condition.operator, condition.rightOperand]);

  return {
    mockOperandList,
    condition,
    constraintName,
    onDragEnd,
    handleAddItem,
    handleRemoveItem,
    status: { isSubmitting: addItemMutation.isPending },
  };
}
