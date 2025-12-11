import { AutocompleteItem } from "prosekit/react/autocomplete";
import { KeyboardEventHandler, useCallback } from "react";

export default function SlashMenuItem(props: {
  label: string;
  kbd?: string;
  onSelect: () => void;
}) {
  const handleEnterDown: KeyboardEventHandler = useCallback(
    (key) => {
      if (key.key === "Enter") props.onSelect();
    },
    [props]
  );
  return (
    <AutocompleteItem
      onSelect={props.onSelect}
      onKeyDown={handleEnterDown}
      className="relative box-border flex min-w-32 cursor-default scroll-my-1 items-center justify-between rounded-sm px-3 py-1.5 whitespace-nowrap outline-hidden select-none data-focused:bg-gray-100 dark:data-focused:bg-gray-800"
    >
      <span>{props.label}</span>
      {props.kbd && (
        <kbd className="font-mono text-xs text-gray-400 dark:text-gray-500">{props.kbd}</kbd>
      )}
    </AutocompleteItem>
  );
}
