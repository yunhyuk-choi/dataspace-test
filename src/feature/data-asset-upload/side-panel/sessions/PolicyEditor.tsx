import AsyncDraggableList from "@/blocks/data-asset-upload/side-panel/AsyncDraggableList";
import { PermissionItem } from "@/blocks/data-asset-upload/side-panel/DraggableItem";
import DroppablePanel from "@/blocks/data-asset-upload/side-panel/DroppablePanel";
import EditorContainer from "@/blocks/data-asset-upload/side-panel/EditorContainer";
import { TabContentProps } from "@/components/commons/TabContainer";
import { SkeletonList } from "@/components/skeletons/SkeletonList";
import usePolicyLogic from "@/feature/data-asset-upload/side-panel/hooks/usePolicyLogic";
import { memo, Suspense } from "react";
import { PermissionBlockProps } from "../../main-panel/types/apiInterfaces";

function PolicyEditor({ handleTabChange }: TabContentProps) {
  const { refs, actions, state, status } = usePolicyLogic();

  return (
    <EditorContainer
      label="Policy Name"
      nameRef={refs.policyName}
      onDragEnd={actions.onDragEnd}
      onAdd={actions.handleAddItem}
      addButtonLabel={status.isSubmitting ? "Saving..." : "Add Item"}
    >
      <div className="flex w-full space-x-4">
        <div className="flex w-1/2 flex-col gap-4 rounded-2xl border-4 border-dashed border-neutral-300 p-4">
          <DroppablePanel
            id="new_permission"
            items={state.permission}
            className="border-success-400 bg-success-50"
            emptyLabel="Drag Permission (Required)"
            renderItem={(item) => (
              <PermissionItem
                item={item}
                onClick={actions.handleRemoveItem}
                listType="permission"
              />
            )}
          />

          <DroppablePanel
            id="new_prohibition"
            items={state.prohibition}
            className="border-info-400 bg-info-50"
            emptyLabel="Drag Prohibition"
            renderItem={(item) => (
              <PermissionItem
                item={item}
                onClick={actions.handleRemoveItem}
                listType="prohibition"
              />
            )}
          />

          <DroppablePanel
            id="new_obligation"
            items={state.obligation}
            className="border-fuchsia-400 bg-fuchsia-50"
            emptyLabel="Drag Obligation"
            renderItem={(item) => (
              <PermissionItem
                item={item}
                onClick={actions.handleRemoveItem}
                listType="obligation"
              />
            )}
          />
        </div>

        <div className="w-1/2 self-baseline">
          <Suspense fallback={<SkeletonList count={4} className="h-20" />}>
            <AsyncDraggableList
              type="permission"
              handleTabChange={handleTabChange}
              renderItem={(item) => <PermissionItem item={item as PermissionBlockProps} />}
            />
          </Suspense>
        </div>
      </div>
    </EditorContainer>
  );
}

export default memo(PolicyEditor);
