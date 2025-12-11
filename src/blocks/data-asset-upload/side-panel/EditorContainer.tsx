import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DndContext, DragEndEvent, rectIntersection } from "@dnd-kit/core";
import { PropsWithChildren, RefObject } from "react";

interface EditorContainerProps {
  label: string;
  nameRef: RefObject<HTMLInputElement | null>;
  onDragEnd: (event: DragEndEvent) => void;
  onAdd: () => void;
  addButtonLabel?: string;
}

export default function EditorContainer({
  label,
  nameRef,
  onAdd,
  onDragEnd,
  addButtonLabel,
  children,
}: PropsWithChildren<EditorContainerProps>) {
  return (
    <>
      <DndContext collisionDetection={rectIntersection} onDragEnd={onDragEnd}>
        <div className="flex flex-col space-y-4">
          {/* Header: 이름 입력 영역 */}
          <div className="flex w-full space-x-2">
            <Label htmlFor="editor-name-input">{label}</Label>
            <Input ref={nameRef} id="editor-name-input" />
          </div>

          {/* Body: 드래그 앤 드롭 영역 */}
          <div className="flex w-full space-x-1">{children}</div>
        </div>
      </DndContext>

      {/* Footer: 추가 버튼 */}
      <Button
        style={"filled"}
        color="primary"
        size={"large"}
        className="mt-4 w-full"
        onClick={onAdd}
      >
        {addButtonLabel}
      </Button>
    </>
  );
}
