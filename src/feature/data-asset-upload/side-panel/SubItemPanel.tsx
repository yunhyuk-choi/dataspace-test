"use client";
import TabContainer from "@/components/commons/TabContainer";
import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Minimize } from "lucide-react";
import dynamic from "next/dynamic";
import { useRouter, useSearchParams } from "next/navigation";
import { memo, useCallback, useMemo, useState } from "react";

const ConditionEditor = dynamic(
  () =>
    import("./sessions/ConstraintEditor"),
  { ssr: false }
);
const PermissionEditor = dynamic(() => import("./sessions/PermissionEditor"), { ssr: false });
const PolicyEditor = dynamic(() => import("./sessions/PolicyEditor"), { ssr: false });

function SubItemPanel() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [currentTab, setCurrentTab] = useState("policy");

  const handleTabChange = useCallback((moveTo: string) => setCurrentTab(moveTo), []);

  const handlePanelClose = useCallback(() => {
    const params = new URLSearchParams(searchParams);
    params.delete("side");
    router.replace(`?${params.toString()}`);
  }, [router, searchParams]);

  const tabs = useMemo(
    () => [
      {
        title: "Policy",
        value: "policy",
        content: <PolicyEditor handleTabChange={handleTabChange} />,
      },
      {
        title: "Permission",
        value: "permission",
        content: <PermissionEditor handleTabChange={handleTabChange} />,
      },
      {
        title: "Constraint",
        value: "constraint",
        content: <ConditionEditor />,
      },
    ],
    [handleTabChange]
  );

  return (
    <Card className="h-full w-full">
      <CardHeader className="auto-cols-min">
        <CardTitle className="my-auto">SubItemPanel</CardTitle>
        <CardAction className="row-span-1">
          <Button
            size={"small"}
            className="cursor-pointer bg-white text-neutral-900 hover:bg-gray-100"
            onClick={handlePanelClose}
            title="Close side panel"
          >
            <Minimize />
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <TabContainer
          tabs={tabs}
          value={currentTab}
          defaultValue="policy"
          handleTabChange={handleTabChange}
        />
      </CardContent>
    </Card>
  );
}

export default memo(SubItemPanel);
