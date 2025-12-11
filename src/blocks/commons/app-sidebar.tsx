"use client";

import { Settings2, SquareTerminal } from "lucide-react";
import * as React from "react";

import { NavMain } from "@/blocks/commons/nav-main";
import { NavUser } from "@/blocks/commons/nav-user";
import { AppTitle } from "@/blocks/commons/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { useTranslations } from "next-intl";

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcns.jpg",
  },
  navMain: [
    {
      title: "consumer",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "list",
          url: "/list",
        },
        {
          title: "purchase-list",
          url: "#",
        },
      ],
    },
    {
      title: "provider",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "data-asset-list",
          url: "/data-asset-list",
        },
        {
          title: "data-asset-upload",
          url: "/data-asset-upload",
        },
      ],
    },
    {
      title: "settings",
      url: "/settings",
      icon: Settings2,
      items: [
        {
          title: "general",
          url: "/settings?sub=general",
        },
        {
          title: "team",
          url: "#",
        },
        {
          title: "billing",
          url: "#",
        },
        {
          title: "limits",
          url: "#",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const t = useTranslations("menubar");

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <AppTitle />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} t={t} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
