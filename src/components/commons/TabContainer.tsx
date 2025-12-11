import { memo, ReactNode } from "react";
import { Tabs, TabsList, TabsPanel, TabsPanels, TabsTab } from "../animate-ui/components/base/tabs";

interface TabsType {
  title: string;
  value: string;
  content: ReactNode;
}

interface TabsProps extends TabContentProps {
  defaultValue?: string;
  className?: string;
  value?: string;
  tabs: TabsType[];
}

export interface TabContentProps {
  handleTabChange?: (moveTo: string) => void;
}

function TabContainer({ defaultValue, tabs, className, value, handleTabChange }: TabsProps) {
  return (
    <Tabs defaultValue={defaultValue} className={className} value={value}>
      <TabsList>
        {tabs.map((item) => (
          <TabsTab
            key={`${item.value}_list`}
            value={item.value}
            className={"cursor-pointer"}
            onClick={(e) => {
              if (handleTabChange && e.currentTarget.dataset.value)
                handleTabChange(e.currentTarget.dataset.value);
            }}
          >
            {item.title}
          </TabsTab>
        ))}
      </TabsList>
      <TabsPanels>
        {tabs.map((item) => (
          <TabsPanel key={`${item.value}_panel`} value={item.value}>
            {item.content}
          </TabsPanel>
        ))}
      </TabsPanels>
    </Tabs>
  );
}

export default memo(TabContainer);
