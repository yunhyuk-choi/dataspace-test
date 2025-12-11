import { memo, useCallback, useMemo } from "react";
import { useMouseEnter } from "../ui/3d-card";
import { Badge } from "../ui/badge";
import { BadgeOverflow } from "../ui/badge-overflow";

function CollapsibleBadge({ items }: { items: string[] }) {
  const [isMouseEntered] = useMouseEnter();
  const lines = useMemo(() => (isMouseEntered ? 99 : 1), [isMouseEntered]);

  const render = useCallback(
    (_: string, label: string) => (
      <Badge variant={"default"} className="max-w-2/3 overflow-clip text-ellipsis">
        {label}
      </Badge>
    ),
    []
  );

  return (
    <BadgeOverflow
      className="absolute top-0 w-full"
      items={items}
      lineCount={lines}
      renderBadge={render}
    />
  );
}

export default memo(CollapsibleBadge);
