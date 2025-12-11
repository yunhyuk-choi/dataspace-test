import { OperandItem } from "@/blocks/data-asset-upload/side-panel/DraggableItem";
import DraggableListPanel from "@/blocks/data-asset-upload/side-panel/DraggablePanel";
import DroppablePanel from "@/blocks/data-asset-upload/side-panel/DroppablePanel";
import EditorContainer from "@/blocks/data-asset-upload/side-panel/EditorContainer";
import useConstraintLogic from "@/feature/data-asset-upload/side-panel/hooks/useConstraintLogic";
import { memo } from "react";

type OperandType = {
  value: string;
  label: string;
};

interface ConditionType {
  leftOperand?: OperandType;
  operator?: OperandType;
  rightOperand?: OperandType;
}

function ConstraintEditor() {
  const {
    mockOperandList,
    condition,
    constraintName,
    status,
    handleAddItem,
    handleRemoveItem,
    onDragEnd,
  } = useConstraintLogic();

  return (
    <EditorContainer
      label="Constraint Name"
      nameRef={constraintName}
      onDragEnd={onDragEnd}
      onAdd={handleAddItem}
      addButtonLabel={status.isSubmitting ? "Saving..." : "Add Item"}
    >
      <div className="flex w-full space-x-4">
        <div className="w-1/2">
          <DroppablePanel
            id="new_permission"
            items={Object.values(condition).length !== 0 ? [condition] : []}
            className="border-info-400"
            emptyLabel="Drag Constraints here"
            renderItem={(item) => (
              <div className="flex w-full justify-center space-x-1 self-center">
                <OperandItem
                  item={item.leftOperand}
                  onClick={handleRemoveItem}
                  type="leftOperand"
                />
                <OperandItem item={item.operator} onClick={handleRemoveItem} type="operator" />
                <OperandItem
                  item={item.rightOperand}
                  onClick={handleRemoveItem}
                  type="rightOperand"
                />
              </div>
            )}
          />
        </div>

        <div className="w-1/2 self-baseline">
          <DraggableListPanel
            items={mockOperandList}
            idKey="value"
            renderItem={(item) => (
              <OperandItem item={item} type={item.type as keyof ConditionType} />
            )}
          />
        </div>
      </div>
    </EditorContainer>
  );
}

export default memo(ConstraintEditor);
