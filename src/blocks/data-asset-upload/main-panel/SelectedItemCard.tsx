import {
  CardFlip,
  CardFlipBack,
  CardFlipContent,
  CardFlipFront,
  CardFlipHeader,
  CardFlipTitle,
} from "@/components/ui/card-flip";
import { PolicyBlockProps } from "@/feature/data-asset-upload/main-panel/types/apiInterfaces";
import { Fragment, memo } from "react";

function SelectedItemCard({
  data,
  onClick,
}: {
  data: PolicyBlockProps;
  onClick: (id: string, type: string) => void;
}) {
  return (
    <CardFlip onClick={() => onClick(data.id, data.type)}>
      <CardFlipFront>
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
  );
}

export default memo(SelectedItemCard);
