import AsyncDraggableList from "@/blocks/data-asset-upload/side-panel/AsyncDraggableList";
import { ConstraintItem } from "@/blocks/data-asset-upload/side-panel/DraggableItem";
import DroppablePanel from "@/blocks/data-asset-upload/side-panel/DroppablePanel";
import EditorContainer from "@/blocks/data-asset-upload/side-panel/EditorContainer";
import { TabContentProps } from "@/components/commons/TabContainer";
import { SkeletonList } from "@/components/skeletons/SkeletonList";
import usePermissionLogic from "@/feature/data-asset-upload/side-panel/hooks/usePermissionLogic";
import { memo, Suspense } from "react";
import { ConstraintBlockProps } from "../../main-panel/types/apiInterfaces";

function PermissionEditor({ handleTabChange }: TabContentProps) {
  const { constraint, handleAddItem, handleRemoveItem, onDragEnd, permissionName, status } =
    usePermissionLogic();

  return (
    <EditorContainer
      label="Permission Name"
      nameRef={permissionName}
      onDragEnd={onDragEnd}
      onAdd={handleAddItem}
      addButtonLabel={status.isSubmitting ? "Saving..." : "Add Item"}
    >
      <div className="flex w-full space-x-4">
        <div className="w-1/2">
          <DroppablePanel
            id="new_permission"
            items={constraint}
            className="border-error-400"
            emptyLabel="Drag Constraints here"
            renderItem={(item) => (
              <ConstraintItem item={item} onClick={() => handleRemoveItem(item.name)} />
            )}
          />
        </div>

        <div className="w-1/2 self-baseline">
          <Suspense fallback={<SkeletonList count={4} className="h-20" />}>
            <AsyncDraggableList
              type="constraint"
              handleTabChange={handleTabChange}
              renderItem={(item) => <ConstraintItem item={item as ConstraintBlockProps} />}
            />
          </Suspense>
        </div>
      </div>
    </EditorContainer>
  );
}

export default memo(PermissionEditor);
