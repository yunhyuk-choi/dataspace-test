import { PermissionItem } from "@/blocks/data-asset-upload/side-panel/DraggableItem";
import {
  CardFlip,
  CardFlipBack,
  CardFlipContent,
  CardFlipFront,
  CardFlipHeader,
  CardFlipTitle,
} from "@/components/ui/card-flip";
import { PolicyBlockProps } from "@/feature/data-asset-upload/main-panel/types/apiInterfaces";
import { cn } from "@/lib/utils";
import { useDraggable } from "@dnd-kit/core";
import { Fragment, memo, useMemo } from "react";

function PolicyItemCard({ data, selectedIn }: { data: PolicyBlockProps; selectedIn?: string }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: data.id,
  });

  const style = useMemo(
    () =>
      transform
        ? {
            transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
          }
        : undefined,
    [transform]
  );

  return (
    <div ref={setNodeRef} {...attributes} {...listeners}>
      <CardFlip
        className={cn(
          selectedIn?.includes("Set") && "border-error-400/50 rounded-2xl border-2",
          selectedIn?.includes("Offer") &&
            "before:border-warning-400/50 before:absolute before:-inset-1 before:rounded-2xl before:border-2 before:content-['']",
          selectedIn?.includes("Agreement") &&
            "after:border-info-400/50 after:absolute after:-inset-1.5 after:rounded-2xl after:border-2 after:content-['']"
        )}
        style={style}
      >
        <CardFlipFront>
          <CardFlipHeader>
            <CardFlipTitle className="max-w-30 overflow-x-clip text-ellipsis" title={data.name}>
              {data.name}
            </CardFlipTitle>
          </CardFlipHeader>
          <CardFlipContent className="flex flex-col space-y-1">
            {data.permission.length && (
              <div className="bg-success-200 flex flex-col space-y-1 rounded-xl p-1">
                {data.permission.map((permission) => {
                  return (
                    <PermissionItem
                      item={permission}
                      key={`${data.name}_${permission.name}_permission`}
                    />
                  );
                })}
              </div>
            )}
            {data.prohibition && data.prohibition?.length > 0 && (
              <div className="bg-info-200 flex flex-col space-y-1 rounded-xl p-1">
                {data.prohibition.map((prohibition) => {
                  return (
                    <PermissionItem
                      item={prohibition}
                      key={`prohibition${data.name}_${prohibition.name}_prohibition`}
                    />
                  );
                })}
              </div>
            )}
            {data.obligation && data.obligation?.length > 0 && (
              <div className="flex flex-col space-y-1 rounded-xl bg-fuchsia-200 p-1">
                {data.obligation.map((obligation) => {
                  return (
                    <PermissionItem
                      item={obligation}
                      key={`${data.name}_${obligation.name}_obligation`}
                    />
                  );
                })}
              </div>
            )}
          </CardFlipContent>
        </CardFlipFront>

        <CardFlipBack>
          <CardFlipHeader>
            <CardFlipTitle>{data.id}</CardFlipTitle>
          </CardFlipHeader>
          <CardFlipContent>
            {data.permission &&
              data.permission.map((permission) => {
                return (
                  <Fragment key={`${permission.name}_${permission.action.id}`}>
                    <h3>{permission.action.id}</h3>
                    {permission.constraint &&
                      permission.constraint.map((constraint, index) => (
                        <p
                          key={`${permission.action}_${constraint.type}_${index}`}
                        >{`${constraint.leftOperand.id} ${constraint.operator.id} ${constraint.rightOperand}`}</p>
                      ))}
                  </Fragment>
                );
              })}
          </CardFlipContent>
        </CardFlipBack>
      </CardFlip>
    </div>
  );
}

export default memo(PolicyItemCard);
