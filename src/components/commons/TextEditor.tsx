import "prosekit/basic/style.css";
import "prosekit/basic/typography.css";

import { htmlFromMarkdown, markdownFromHTML } from "@/lib/markdown";
import { AnyFieldApi } from "@tanstack/react-form";
import { defineBasicExtension } from "prosekit/basic";
import { createEditor, jsonFromHTML, union } from "prosekit/core";
import { definePlaceholder } from "prosekit/extensions/placeholder";
import { ProseKit, useDocChange } from "prosekit/react";
import { useEffect, useMemo, useRef } from "react";
import SlashMenu from "../ui/slash-menu";

interface TextEditorProps {
  field: AnyFieldApi;
}

function defineExtension() {
  return union(
    defineBasicExtension(),
    definePlaceholder({ placeholder: "Press / for commands..." })
  );
}

export default function TextEditor({ field }: TextEditorProps) {
  const editor = useMemo(() => {
    const extension = defineExtension();
    const editor = createEditor({ extension });
    if (field.state.value) {
      const html = htmlFromMarkdown(field.state.value);
      const json = jsonFromHTML(html, { schema: editor.schema });
      editor.setContent(json);
    }

    return editor;
  }, [field]);

  const editorRef = useRef<HTMLDivElement>(null);
  const mountedRef = useRef(false);

  useEffect(() => {
    if (!mountedRef.current && editorRef.current) {
      editor.mount(editorRef.current);
      mountedRef.current = true;
    }
  }, [editor]);

  useDocChange(
    () => {
      const html = editor.getDocHTML();
      const markdown = markdownFromHTML(html);
      if (field) field.handleChange(markdown);
    },
    { editor }
  );

  return (
    <ProseKit editor={editor}>
      <div className="box-border flex h-full min-h-36 w-full flex-col overflow-x-hidden overflow-y-hidden rounded-md border border-solid border-gray-200 bg-white text-black shadow-sm dark:border-gray-700 dark:bg-gray-950 dark:text-white">
        <div className="relative box-border w-full flex-1 overflow-y-auto">
          <div
            ref={editorRef}
            className="ProseMirror box-border min-h-full px-[max(4rem,calc(50%-20rem))] py-8 outline-hidden outline-0 [&_span[data-mention=tag]]:text-violet-500 [&_span[data-mention=user]]:text-blue-500"
          ></div>
          <SlashMenu />
        </div>
      </div>
    </ProseKit>
  );
}
