import { Markdown } from "@/components/ui/markdown";
import { Skeleton } from "@/components/ui/skeleton";
import { memo } from "react";

function DetailSection({ data }: { data?: string }) {
  const markdownContent = `
# Markdown Example


This is a **bold text** and this is an *italic text*.




## Lists

### Unordered List
- Item 1
- Item 2
- Item 3

### Ordered List
1. First item
2. Second item
3. Third item

## Links and Images

[Visit Prompt Kit](https://prompt-kit.com)

## Code

Inline \`code\` example.

\`\`\`javascript
// Code block example
function greet(name) {
  return \`Hello, \${name}!\`;
}
\`\`\`
`;
  return (
    <div className="font-pretendard items-baseline">
      {data ? (
        <Markdown className="markdown dark:prose-invert">{data}</Markdown>
      ) : (
        <Skeleton className="h-50 min-w-3xl" />
      )}
    </div>
  );
}

export default memo(DetailSection);
